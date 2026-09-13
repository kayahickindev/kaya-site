import type { ReactNode } from "react";
import { Footer } from "./Footer";
import { TopNav } from "./TopNav";
export function SubpageShell({ children }: { children: ReactNode }) {
  return (
    <div className="wrap">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <TopNav />
      <main id="main-content">{children}</main>
      <Footer />
    </div>
  );
}
