import Image from "next/image";
import { readFile } from "fs/promises";
import { join } from "path";

type Pin = { name: string; x: number; y: number };
type MapData = { viewBox: string; pins: Pin[] };

// Pin thumbnails are 200px crops of the same GPS-confirmed originals.
const photoPins: Record<string, { src: string; label: string; up?: boolean }> = {
  "Lake Tekapo": { src: "/pins/tekapo.webp", label: "Lake Tekapo" },
  Merzouga: { src: "/pins/merzouga.webp", label: "Merzouga" },
  Kilauea: { src: "/pins/kilauea.webp", label: "Kīlauea" },
  Stockholm: { src: "/pins/stockholm.webp", label: "Stockholm", up: true },
};
const dotPins: Record<string, string> = {
  "Luxembourg City": "Luxembourg, one semester",
  Cleveland: "Cleveland, home",
};

async function load(): Promise<{ svg: string; data: MapData } | null> {
  try {
    const dir = join(process.cwd(), "src", "generated");
    const [svg, json] = await Promise.all([
      readFile(join(dir, "world-map.svg"), "utf8"),
      readFile(join(dir, "world-map.json"), "utf8"),
    ]);
    return { svg, data: JSON.parse(json) as MapData };
  } catch {
    return null;
  }
}

// A generated world map with the visited countries lit and a few photo pins,
// placed with the same projection the map was drawn with.
export async function WorldMap() {
  const map = await load();
  if (!map) return null;
  const [, , w, h] = map.data.viewBox.split(/\s+/).map(Number);
  const pos = (p: Pin) => ({
    left: `${(p.x / w) * 100}%`,
    top: `${(p.y / h) * 100}%`,
  });
  return (
    <div className="world" style={{ aspectRatio: `${w} / ${h}` }}>
      <div className="world-svg" dangerouslySetInnerHTML={{ __html: map.svg }} />
      {map.data.pins.map((p) => {
        const photo = photoPins[p.name];
        const dot = dotPins[p.name];
        if (photo)
          return (
            <span className={`pin pin-photo${photo.up ? " pin-up" : ""}`} key={p.name} style={pos(p)}>
              <Image src={photo.src} alt="" width={64} height={64} sizes="64px" />
              <em>{photo.label}</em>
            </span>
          );
        if (dot)
          return (
            <span className="pin pin-dot" key={p.name} style={pos(p)}>
              <em>{dot}</em>
            </span>
          );
        return null;
      })}
    </div>
  );
}
