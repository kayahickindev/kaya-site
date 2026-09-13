import Image from "next/image";
import type { CSSProperties } from "react";
import { heroSlides } from "@/data/assets";

// A slow crossfade through Kaya's travel photos. Pure CSS: it runs without
// JavaScript, and under reduced motion only the first photo shows.
export function HeroSlides() {
  return (
    <div
      className="hero-photo"
      style={{ "--n": heroSlides.length } as CSSProperties}
    >
      {heroSlides.map((s, i) => (
        <figure
          key={s.src}
          className="hero-slide"
          aria-hidden={i > 0 || undefined}
          style={
            {
              "--i": i,
              "--zoom": s.zoom ?? 1,
              "--pos": s.position,
              "--pos-m": s.positionMobile ?? s.position,
            } as CSSProperties
          }
        >
          <Image
            src={s.src}
            alt={i === 0 ? s.alt : ""}
            fill
            preload={i === 0}
            quality={85}
            sizes="(max-width: 900px) 100vw, 56vw"
          />
        </figure>
      ))}
    </div>
  );
}
