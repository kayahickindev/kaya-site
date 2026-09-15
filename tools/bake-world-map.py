#!/usr/bin/env python3
"""Bake src/generated/world-map.svg into two themed files for <img> use.

An inline SVG costs the home page its paths twice (HTML plus the hydration
payload), so the map ships as lazy images with the site's colours baked in.
"""
import pathlib, re
root = pathlib.Path(__file__).resolve().parents[1]
svg = (root / "src/generated/world-map.svg").read_text()
svg = re.sub(r' data-name="[^"]*"', "", svg)
themes = {
    "light": dict(land="#ebeae3", stroke="#f6f5f1", visited="#0b7580", home="#4d514c"),
    "dark": dict(land="#171a18", stroke="#0e100f", visited="#74d0d8", home="#a9aea6"),
}
for name, c in themes.items():
    style = (f"<style>.land{{fill:{c['land']};stroke:{c['stroke']};stroke-width:.6}}"
             f".land.visited{{fill:{c['visited']}}}.land.home{{fill:{c['home']}}}.visited-dot{{fill:{c['visited']}}}</style>")
    out = svg.replace("<title", style + "<title", 1)
    (root / f"public/world/map-{name}.svg").write_text(out)
    print(name, len(out), "bytes")
