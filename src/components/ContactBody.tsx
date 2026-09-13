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
    <section className="contact-main">
      <div>
        <p className="eyebrow">Say hello</p>
        <h1>
          Good things
          <br />
          start with
          <br />
          <em>a conversation.</em>
        </h1>
        <p className="lead">
          AI engineers, founders, investors, and people building something
          ambitious. Let’s talk.
        </p>
      </div>
      <div className="self-center">
        <p className="eyebrow mb-5">Cincinnati, Ohio</p>
        <p className="contact-address">
          kaya@
          <wbr />
          successai.app
        </p>
        <div className="action-row">
          <a className="button-link" href={`mailto:${address}`}>
            <Mail size={16} aria-hidden />
            Email me
          </a>
          <button className="text-link" type="button" onClick={copy}>
            <Copy size={15} aria-hidden />
            Copy address
          </button>
        </div>
        <p className="copy-status" role="status">
          {status}
        </p>
        <div className="contact-links">
          {[
            { label: "GitHub", href: siteConfig.social.github },
            { label: "LinkedIn", href: siteConfig.social.linkedin },
            { label: "X", href: siteConfig.social.twitter },
            { label: "Instagram", href: siteConfig.social.instagram },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {s.label}
              <ArrowUpRight size={18} aria-hidden />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
