import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/data/content";
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <p>Have something in mind?</p>
        <Link href="/contact">
          Let’s build it.
          <ArrowUpRight aria-hidden />
        </Link>
      </div>
      <div className="footer-bottom">
        <Link href="/">Kaya Hickin</Link>
        <p>Cincinnati, Ohio · Building everywhere.</p>
        <div>
          <a href={siteConfig.social.github}>GitHub ↗</a>
          <a href={siteConfig.social.linkedin}>LinkedIn ↗</a>
          <a href={siteConfig.social.twitter}>X ↗</a>
          <a href={siteConfig.social.instagram}>Instagram ↗</a>
        </div>
      </div>
    </footer>
  );
}
