#!/usr/bin/env python3
"""Build the static world map used on the site.

Generates:
  src/generated/world-map.svg   one <path class="land ..."> per country
  src/generated/world-map.json  the viewBox plus projected pin positions

Source data: Natural Earth 1:110m admin-0 countries (public domain).
Projection:  Natural Earth (Patterson / Savric polynomial), no dependencies.

Usage:
    python3 tools/build-world-map.py [--source PATH] [--cache-dir DIR]

The source GeoJSON is downloaded into a cache directory outside the repo
(default: a temp dir) and is never written into the repo tree.
"""

from __future__ import annotations

import argparse
import json
import math
import os
import subprocess
import sys
import tempfile

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_DIR = os.path.join(REPO_ROOT, "src", "generated")

SOURCE_URLS = [
    "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson",
]

# Countries Kaya has visited.
VISITED = [
    "Australia",
    "Belgium",
    "Canada",
    "Croatia",
    "France",
    "Germany",
    "Italy",
    "Luxembourg",
    "Mexico",
    "Morocco",
    "Netherlands",
    "New Zealand",
    "Portugal",
    "Sweden",
    "Switzerland",
]
HOME = "United States of America"

# Places to pin, as (label, latitude, longitude).
PINS = [
    ("Lake Tekapo", -44.0157, 170.5056),
    ("Merzouga", 31.0871, -3.9902),
    ("Kilauea", 19.4231, -155.2841),
    ("Munich", 48.1349, 11.5489),
    ("Luxembourg City", 49.6116, 6.1319),
    ("Stockholm", 59.3293, 18.0686),
    ("Sydney", -33.9002, 151.2706),
    ("Cleveland", 41.4993, -81.6944),
    ("Cincinnati", 39.1031, -84.5120),
    ("Matosinhos", 41.1752, -8.6924),
]

# Luxembourg's 110m polygon is a couple of pixels across. If it renders
# smaller than this in either axis, also emit an explicit dot for it.
LUX_MIN_PX = 3.0
LUX_LAT, LUX_LON = 49.8153, 6.1296

VIEW_WIDTH = 1000.0
MARGIN = 8.0
DECIMALS = 1

DROP_ADMIN = {"Antarctica"}


# --------------------------------------------------------------------------
# Projection: Natural Earth (Bojan Savric et al.), radians in, unit-ish out.
# --------------------------------------------------------------------------
def natural_earth(lon_deg: float, lat_deg: float) -> tuple[float, float]:
    lam = math.radians(lon_deg)
    phi = math.radians(lat_deg)
    p2 = phi * phi
    p4 = p2 * p2
    p6 = p4 * p2
    p8 = p4 * p4
    p10 = p8 * p2
    p12 = p10 * p2
    x = lam * (0.8707 - 0.131979 * p2 - 0.013791 * p4 + 0.003971 * p10 - 0.001529 * p12)
    y = phi * (1.007226 + 0.015085 * p2 - 0.044475 * p6 + 0.028874 * p8 - 0.005916 * p10)
    return x, y


# --------------------------------------------------------------------------
# Source data
# --------------------------------------------------------------------------
def fetch_source(cache_dir: str, explicit: str | None) -> str:
    if explicit:
        return explicit
    os.makedirs(cache_dir, exist_ok=True)
    dest = os.path.join(cache_dir, "ne_110m_admin_0_countries.geojson")
    if os.path.exists(dest) and os.path.getsize(dest) > 100_000:
        return dest
    for url in SOURCE_URLS:
        rc = subprocess.call(["curl", "-sSL", "--fail", "--max-time", "180", "-o", dest, url])
        if rc == 0 and os.path.exists(dest) and os.path.getsize(dest) > 100_000:
            return dest
    raise SystemExit("could not download Natural Earth source data")


# Only these keys are used for highlight matching. SOVEREIGNT / NAME_LONG are
# deliberately excluded: they would drag dependencies in with their sovereign
# (New Caledonia and Fr. S. Antarctic Lands under France, Puerto Rico under the
# United States of America).
MATCH_KEYS = ("NAME", "ADMIN", "name")


def feature_names(props: dict) -> list[str]:
    out = []
    for key in MATCH_KEYS:
        val = props.get(key)
        if isinstance(val, str) and val and val not in out:
            out.append(val)
    return out


def rings(geometry: dict) -> list[list]:
    kind = geometry.get("type")
    coords = geometry.get("coordinates") or []
    if kind == "Polygon":
        return list(coords)
    if kind == "MultiPolygon":
        return [ring for poly in coords for ring in poly]
    return []


# --------------------------------------------------------------------------
# Number / path formatting
# --------------------------------------------------------------------------
def fmt(value: float) -> str:
    text = f"{value:.{DECIMALS}f}"
    if text in ("-0.0", "-0"):
        text = "0.0" if DECIMALS else "0"
    if "." in text:
        text = text.rstrip("0").rstrip(".")
    return text or "0"


def ring_to_path(points: list[tuple[float, float]]) -> str:
    # Drop points that collapse onto their neighbour once rounded.
    kept: list[tuple[str, str]] = []
    for x, y in points:
        pair = (fmt(x), fmt(y))
        if not kept or kept[-1] != pair:
            kept.append(pair)
    if len(kept) > 1 and kept[0] == kept[-1]:
        kept.pop()
    if len(kept) < 3:
        return ""
    head = f"M{kept[0][0]} {kept[0][1]}"
    tail = " ".join(f"{sx} {sy}" for sx, sy in kept[1:])
    # Implicit lineto: after the moveto, bare coordinate pairs are line segments.
    return f"{head} {tail}Z"


def build() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--source", default=None, help="local GeoJSON to use instead of downloading")
    parser.add_argument(
        "--cache-dir",
        default=os.path.join(tempfile.gettempdir(), "kaya-world-map"),
        help="where to cache the downloaded source (never inside the repo)",
    )
    args = parser.parse_args()

    path = fetch_source(args.cache_dir, args.source)
    with open(path, "r", encoding="utf-8") as handle:
        data = json.load(handle)

    wanted = {name.lower(): name for name in VISITED}
    wanted[HOME.lower()] = HOME
    matched: dict[str, str] = {}

    # Pass 1: project everything, collect the bounding box.
    countries = []
    min_x = min_y = float("inf")
    max_x = max_y = float("-inf")

    for feature in data.get("features", []):
        props = feature.get("properties") or {}
        names = feature_names(props)
        if not names:
            continue
        display = names[0]
        if props.get("ADMIN") in DROP_ADMIN or display in DROP_ADMIN:
            continue

        label = None
        for candidate in names:
            hit = wanted.get(candidate.lower())
            if hit:
                label = hit
                matched[hit] = display
                break

        projected_rings = []
        for ring in rings(feature.get("geometry") or {}):
            pts = []
            for point in ring:
                if not isinstance(point, (list, tuple)) or len(point) < 2:
                    continue
                lon, lat = float(point[0]), float(point[1])
                x, y = natural_earth(lon, lat)
                pts.append((x, y))
                if x < min_x:
                    min_x = x
                if x > max_x:
                    max_x = x
                if y < min_y:
                    min_y = y
                if y > max_y:
                    max_y = y
            if len(pts) >= 3:
                projected_rings.append(pts)

        if projected_rings:
            countries.append({"name": display, "match": label, "rings": projected_rings})

    if not countries:
        raise SystemExit("no countries survived projection")

    # Pass 2: fit the projected world into the viewBox.
    span_x = max_x - min_x
    span_y = max_y - min_y
    scale = (VIEW_WIDTH - 2 * MARGIN) / span_x
    view_height = round(span_y * scale + 2 * MARGIN)

    def to_px(x: float, y: float) -> tuple[float, float]:
        return (
            MARGIN + (x - min_x) * scale,
            MARGIN + (max_y - y) * scale,  # SVG y grows downward
        )

    def project_px(lat: float, lon: float) -> tuple[float, float]:
        return to_px(*natural_earth(lon, lat))

    view_box = f"0 0 {int(VIEW_WIDTH)} {view_height}"

    # Pass 3: emit the paths.
    body = []
    lux_bbox = None
    for country in sorted(countries, key=lambda c: c["name"]):
        segments = []
        xs: list[float] = []
        ys: list[float] = []
        for ring in country["rings"]:
            pixels = [to_px(x, y) for x, y in ring]
            segment = ring_to_path(pixels)
            if segment:
                segments.append(segment)
                xs.extend(px for px, _ in pixels)
                ys.extend(py for _, py in pixels)
        if not segments:
            if country["match"]:
                print(f"  note: {country['name']} produced no drawable path", file=sys.stderr)
            continue
        if country["match"] == "Luxembourg":
            lux_bbox = (max(xs) - min(xs), max(ys) - min(ys))
        classes = "land"
        if country["match"] == HOME:
            classes = "land home"
        elif country["match"]:
            classes = "land visited"
        name_attr = (
            country["name"].replace("&", "&amp;").replace('"', "&quot;").replace("<", "&lt;")
        )
        body.append(f'<path class="{classes}" data-name="{name_attr}" d="{"".join(segments)}"/>')

    # Luxembourg is about two pixels wide at 110m; back it with a dot if so.
    lux_dot = False
    if "Luxembourg" in wanted.values():
        if lux_bbox is None or min(lux_bbox) < LUX_MIN_PX:
            lux_dot = True
            lx, ly = project_px(LUX_LAT, LUX_LON)
            body.append(
                f'<circle class="visited-dot" data-name="Luxembourg" '
                f'cx="{fmt(lx)}" cy="{fmt(ly)}" r="4"/>'
            )

    title = "World map with the 15 countries Kaya has visited highlighted"
    svg = (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{view_box}" role="img" '
        f'aria-labelledby="world-map-title">'
        f'<title id="world-map-title">{title}</title>'
        + "".join(body)
        + "</svg>\n"
    )

    os.makedirs(OUT_DIR, exist_ok=True)
    svg_path = os.path.join(OUT_DIR, "world-map.svg")
    with open(svg_path, "w", encoding="utf-8") as handle:
        handle.write(svg)

    pins = []
    for label, lat, lon in PINS:
        px, py = project_px(lat, lon)
        pins.append({"name": label, "x": round(px, 1), "y": round(py, 1)})

    json_path = os.path.join(OUT_DIR, "world-map.json")
    with open(json_path, "w", encoding="utf-8") as handle:
        json.dump({"viewBox": view_box, "pins": pins}, handle, indent=2)
        handle.write("\n")

    missing = [name for name in list(VISITED) + [HOME] if name not in matched]
    print(f"source        {path}")
    print(f"viewBox       {view_box}")
    print(f"countries     {len(body) - (1 if lux_dot else 0)} paths (Antarctica dropped)")
    print(f"svg           {svg_path} ({os.path.getsize(svg_path)} bytes)")
    print(f"json          {json_path} ({os.path.getsize(json_path)} bytes)")
    print(f"matched       {len(matched)} / {len(VISITED) + 1}")
    if lux_bbox:
        print(f"luxembourg    polygon {lux_bbox[0]:.2f} x {lux_bbox[1]:.2f} px; dot={lux_dot}")
    else:
        print(f"luxembourg    no polygon; dot={lux_dot}")
    print(f"unmatched     {missing if missing else 'none'}")


if __name__ == "__main__":
    build()
