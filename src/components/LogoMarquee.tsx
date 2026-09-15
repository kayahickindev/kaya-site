import Image from "next/image";
import type { CSSProperties } from "react";
import { recognition } from "@/data/recognition";

// The official marks as one endless marquee, edges faded, paused under the
// cursor. The second set only exists to make the loop seamless: it is hidden
// from assistive technology and carries no links, so nothing is announced or
// focused twice. On touch and with reduced motion the track falls back to the
// static logo wall, which is also what a printout and a no-CSS reader get.
export function LogoMarquee() {
  const face = (name: string, line: string, logo?: string) => (
    <>
      <span className="logo-box">
        {logo ? <Image src={logo} alt={`${name} logo`} width={200} height={72} sizes="200px" /> : <strong>{name}</strong>}
      </span>
      <span className="logo-line">{line}</span>
    </>
  );
  return (
    <div className="logo-marquee">
      <ul
        className="logo-wall logo-marquee-track"
        aria-label="Backers, awards and programs"
        style={{ "--n": recognition.length } as CSSProperties}
      >
        {recognition.map((r) => (
          <li key={r.name}>
            {r.href ? (
              <a href={r.href} target="_blank" rel="noopener noreferrer">
                {face(r.name, r.line, r.logo)}
              </a>
            ) : (
              face(r.name, r.line, r.logo)
            )}
          </li>
        ))}
        {recognition.map((r) => (
          <li className="marquee-dup" key={`dup-${r.name}`} aria-hidden>
            {face(r.name, r.line, r.logo)}
          </li>
        ))}
      </ul>
    </div>
  );
}
