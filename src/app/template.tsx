import type { CSSProperties, ReactNode } from "react";

// The page intro runs in CSS so the server and client render the same markup
// whether or not the visitor prefers reduced motion; globals.css turns it off
// for them, and the page is visible at first paint.
export default function Template({ children }: { children: ReactNode }) {
  return (
    <div
      className="intro-rise"
      style={
        {
          "--intro-y": "6px",
          "--intro-duration": "0.28s",
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}
