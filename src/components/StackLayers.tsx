import { BrandLogo } from "./BrandLogo";

const layers = [
  { name: "Voice AI", tech: ["OpenAI Realtime", "WebRTC"] },
  { name: "iOS", tech: ["Swift", "SwiftUI"] },
  { name: "Android", tech: ["React Native", "Expo"] },
  { name: "Web", tech: ["Next.js", "TypeScript"] },
  { name: "Backend", tech: ["Firebase", "Node.js"] },
];

// Every layer of the product as a stack of plates. Plates rise into place as
// the block scrolls into view.
export function StackLayers() {
  return (
    <div className="layers-wrap">
      <div className="layers" aria-hidden>
        {layers.map((l, i) => (
          <div
            className="layer"
            key={l.name}
            style={{ "--i": layers.length - 1 - i } as React.CSSProperties}
          >
            <span className="layer-logos">
              {l.tech.map((t) => (
                <BrandLogo key={t} name={t} size={26} />
              ))}
            </span>
            <span className="layer-name">{l.name}</span>
          </div>
        ))}
      </div>
      <ol className="layers-legend" aria-label="Layers I build">
        {layers.map((l) => (
          <li key={l.name}>
            <strong>{l.name}</strong>
            <span>{l.tech.join(" · ")}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
