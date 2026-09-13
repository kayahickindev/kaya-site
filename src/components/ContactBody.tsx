"use client";
import { useState } from "react";
import { ArrowUpRight, Copy, Mail } from "lucide-react";
import { siteConfig } from "@/data/content";
export function ContactPanel() {
  const [status, setStatus] = useState("");
  const address = `${siteConfig.emailParts.user}@${siteConfig.emailParts.domain}`;
  async function copy() {
    try {
      await navigator.clipboard.writeText(address);
      setStatus("Email address copied.");
    } catch {
      setStatus("Copy unavailable. Select the address above to copy it.");
    }
  }
  return (
    <section className="contact-grid">
      <div>
        <p className="label">Contact</p>
        <h1 className="h-page">Good things start with a conversation.</h1>
        <p className="lead muted" style={{ marginTop: 24 }}>
          AI engineers, founders, investors, and people building something
          ambitious. Cincinnati, Ohio, and wherever the work is.
        </p>
      </div>
      <div>
        <p className="label">Email</p>
        <a className="contact-email" href={`mailto:${address}`}>
          {siteConfig.emailParts.user}@
          <wbr />
          {siteConfig.emailParts.domain}
        </a>
        <div className="action-row">
          <a className="btn" href={`mailto:${address}`}>
            <Mail size={17} aria-hidden />
            Email me
          </a>
          <button className="btn btn-ghost" type="button" onClick={copy}>
            <Copy size={16} aria-hidden />
            Copy address
          </button>
        </div>
        <p className="copy-status" role="status">
          {status}
        </p>
        <div className="social-row">
          {[
            { label: "LinkedIn", href: siteConfig.social.linkedin },
            { label: "GitHub", href: siteConfig.social.github },
            { label: "X", href: siteConfig.social.twitter },
            { label: "Instagram", href: siteConfig.social.instagram },
          ].map((s) => (
            <a key={s.label} href={s.href} rel="me">
              {s.label}
              <ArrowUpRight size={16} aria-hidden />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
