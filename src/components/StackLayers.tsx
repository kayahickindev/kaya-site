import { BrandLogo } from "./BrandLogo";

const layers = [
  { name: "Voice AI", tech: ["OpenAI Realtime", "WebRTC"] },
  { name: "iOS", tech: ["Swift", "SwiftUI"] },
  { name: "Android", tech: ["React Native", "Expo"] },
  { name: "Web", tech: ["Next.js", "TypeScript"] },
  { name: "Backend", tech: ["Firebase", "Node.js"] },
];

// Every layer of the product as an exploded isometric stack. The logos lie on
// each plate; a flat tag at the plate's front corner names the layer and its
// tech. Plates are rendered bottom first so each one paints over the plate
// beneath it, and they rise into place as the block scrolls into view. The
// list at the end carries the same facts for assistive tech.
export function StackLayers() {
  return (
    <div className="layers-wrap">
      <div className="layers" aria-hidden>
        {[...layers].reverse().map((l, i) => (
          <div className="layer" key={l.name} style={{ "--i": i } as React.CSSProperties}>
            <span className="layer-logos">
              {l.tech.map((t) => (
                <BrandLogo key={t} name={t} size={22} />
              ))}
            </span>
            <span className="layer-tag">
              <strong>{l.name}</strong>
              <span>{l.tech.join(" · ")}</span>
            </span>
          </div>
        ))}
      </div>
      <ol className="sr-only" aria-label="Layers I build">
        {layers.map((l) => (
          <li key={l.name}>
            {l.name}: {l.tech.join(", ")}
          </li>
        ))}
      </ol>
    </div>
  );
}
