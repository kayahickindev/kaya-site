import Image from "next/image";
import { travel } from "@/data/assets";

function Strip({ hidden = false }: { hidden?: boolean }) {
  return (
    <>
      {travel.map((p) => (
        <figure
          className={`film-item${hidden ? " film-copy" : ""}`}
          key={`${p.src}${hidden ? "-copy" : ""}`}
          aria-hidden={hidden || undefined}
        >
          <Image
            src={p.src}
            alt={hidden ? "" : p.alt}
            fill
            sizes="(max-width: 760px) 210px, 21vw"
          />
          <figcaption>{p.place}</figcaption>
        </figure>
      ))}
    </>
  );
}

// A slowly revolving strip of travel photos. Pure CSS: it loops without
// JavaScript, pauses on hover or with the checkbox control, and becomes a
// plain scrollable row when the visitor prefers reduced motion.
export function TravelFilm() {
  if (travel.length === 0) return null;
  return (
    <div className="film" aria-label="Travel photos">
      <div className="film-track">
        <Strip />
        <Strip hidden />
      </div>
      <div className="film-controls">
        <input
          type="checkbox"
          id="film-pause"
          className="film-pause"
          aria-label="Pause the photo strip"
        />
        <label htmlFor="film-pause">
          <span className="when-playing">Pause</span>
          <span className="when-paused">Play</span>
        </label>
      </div>
    </div>
  );
}
