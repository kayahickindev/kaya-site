import Link from "next/link";
import { siteConfig } from "@/data/content";
export function Footer() {
  return (
    <footer className="site-footer">
      <p>
        <Link href="/">Kaya Hickin</Link> · Cincinnati, Ohio
      </p>
      <nav aria-label="Social links">
        <a href={siteConfig.social.github} rel="me">
          GitHub
        </a>
        <a href={siteConfig.social.linkedin} rel="me">
          LinkedIn
        </a>
        <a href={siteConfig.social.twitter} rel="me">
          X
        </a>
        <a href={siteConfig.social.instagram} rel="me">
          Instagram
        </a>
      </nav>
    </footer>
  );
}
