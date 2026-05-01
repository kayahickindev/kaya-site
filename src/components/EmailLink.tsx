"use client";

import type { ReactNode, MouseEvent } from "react";
import { siteConfig } from "@/data/content";

interface EmailLinkProps {
  subject?: string;
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
}

// Constructs the mailto: URL only on user interaction. The literal address
// never appears in the rendered HTML, so naive scrapers can't pick it up.
export function EmailLink({
  subject,
  className,
  children,
  ariaLabel,
}: EmailLinkProps) {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const { user, domain } = siteConfig.emailParts;
    const addr = `${user}@${domain}`;
    const url = subject
      ? `mailto:${addr}?subject=${encodeURIComponent(subject)}`
      : `mailto:${addr}`;
    window.location.href = url;
  };

  return (
    <a
      href="#"
      onClick={handleClick}
      className={className}
      aria-label={ariaLabel ?? "Send email"}
    >
      {children}
    </a>
  );
}
