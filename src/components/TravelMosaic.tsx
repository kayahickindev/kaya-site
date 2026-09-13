import Image from "next/image";
import { travel } from "@/data/assets";

export function TravelMosaic() {
  if (travel.length === 0) return null;
  return (
    <div className="mosaic">
      {travel.slice(0, 4).map((p) => (
        <figure key={p.src}>
          <Image
            src={p.src}
            alt={p.alt}
            fill
            sizes="(max-width: 760px) 50vw, 24vw"
          />
          {p.place && <figcaption>{p.place}</figcaption>}
        </figure>
      ))}
    </div>
  );
}
