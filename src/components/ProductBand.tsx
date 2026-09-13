import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import type { Screen } from "@/data/assets";

export function Screens({
  screens,
  eager = false,
  sizes = "(max-width: 760px) 64vw, (max-width: 1100px) 30vw, 18vw",
}: {
  screens: Screen[];
  eager?: boolean;
  sizes?: string;
}) {
  return (
    <div
      className={`screens${screens.length === 2 ? " two" : ""}`}
      tabIndex={0}
      aria-label="Product screens"
    >
      {screens.map((s, i) => (
        <figure className="screen" key={s.src}>
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
    </div>
  );
}

export function ProductBand({
  variant,
  id,
  icon,
  name,
  label,
  title,
  lead,
  screens,
  links,
  detailHref,
  detailLabel,
  flip = false,
  eager = false,
  children,
}: {
  variant: "mfs" | "dog";
  id?: string;
  icon: string;
  name: string;
  label: string;
  title: ReactNode;
  lead: ReactNode;
  screens: Screen[];
  links: { label: string; href: string }[];
  detailHref?: string;
  detailLabel?: string;
  flip?: boolean;
  eager?: boolean;
  children?: ReactNode;
}) {
  return (
    <section
      className={`band band-${variant}`}
      id={id}
      aria-labelledby={`${id ?? variant}-title`}
    >
      <div className="wrap">
        <div className={`product-grid${flip ? " flip" : ""}`}>
          <div className="product-copy">
            <p className="product-mark">
              <Image src={icon} alt="" width={36} height={36} />
              {name}
            </p>
            <p className="label" style={{ marginTop: 22 }}>
              {label}
            </p>
            <h2 className="h-section" id={`${id ?? variant}-title`}>
              {title}
            </h2>
            <p className="lead muted">{lead}</p>
            <div className="action-row">
              {links.map((l, i) => (
                <a
                  key={l.href}
                  className={i === 0 ? "btn" : "btn btn-ghost"}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {l.label} <ArrowUpRight size={17} aria-hidden />
                </a>
              ))}
              {detailHref && (
                <Link className="arrow-link" href={detailHref}>
                  {detailLabel ?? "How I built it"}{" "}
                  <ArrowUpRight size={18} aria-hidden />
                </Link>
              )}
            </div>
          </div>
          <div>
            <Screens screens={screens} eager={eager} />
            <p className="snap-hint">Swipe to see more screens.</p>
          </div>
        </div>
        {children}
      </div>
    </section>
  );
}
