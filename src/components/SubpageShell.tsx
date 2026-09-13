import type { ReactNode } from "react";
import { Footer } from "./Footer";
import { TopNav } from "./TopNav";
export type Accent = "amber" | "cyan" | "emerald" | "violet" | "rose";
export function SubpageShell({
  children,
}: {
  children: ReactNode;
  accent?: Accent;
}) {
  return (
    <div className="site-shell">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <TopNav />
      <main id="main-content" className="page-content">
        {children}
      </main>
      <Footer />
    </div>
  );
}
