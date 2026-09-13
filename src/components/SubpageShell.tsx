import type { ReactNode } from "react";
import { Footer } from "./Footer";
import { TopNav } from "./TopNav";
import { ChapterNav } from "./ChapterNav";

const pages = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Stack", href: "/stack" },
  { label: "Credentials", href: "/proof" },
  { label: "Contact", href: "/contact" },
];

export function SubpageShell({
  children,
  current,
}: {
  children: ReactNode;
  current?: string;
}) {
  return (
    <div className="wrap">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <TopNav />
      <main id="main-content">{children}</main>
      <Footer />
      <ChapterNav items={pages} current={current} />
    </div>
  );
}
