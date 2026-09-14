import Image from "next/image";
import type { CSSProperties } from "react";
import type { Screen } from "@/data/assets";

// The App Store composites as one wide strip. With a pointer that can hover it
// drifts slowly and pauses under the cursor; on touch it is a native snap
// scroller; with reduced motion it stands still. The second copy of the set only
// exists to make the drift seamless and is hidden from assistive technology
// and from the touch and reduced-motion layouts.
export function StoreGallery({
  screens,
  label,
  eager = false,
}: {
  screens: Screen[];
  label: string;
  eager?: boolean;
}) {
  const sizes = "(max-width: 760px) 72vw, 360px";
  return (
    <div
      className="gallery"
      role="region"
      aria-label={label}
      tabIndex={0}
      style={{ "--n": screens.length } as CSSProperties}
    >
      <div className="gallery-track">
        {screens.map((s, i) => (
          <figure className="screen gallery-card" key={s.src}>
            <Image
              src={s.src}
              alt={s.alt}
              width={s.width}
              height={s.height}
              sizes={sizes}
              preload={eager && i === 0}
              loading={eager ? "eager" : "lazy"}
            />
            <figcaption>{s.alt}</figcaption>
          </figure>
        ))}
        {screens.map((s) => (
          <figure className="screen gallery-card gallery-dup" key={`dup-${s.src}`} aria-hidden>
            <Image src={s.src} alt="" width={s.width} height={s.height} sizes={sizes} />
          </figure>
        ))}
      </div>
    </div>
  );
}
