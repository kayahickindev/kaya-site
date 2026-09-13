"use client";
import { useState } from "react";
import { Copy, Mail, MapPin } from "lucide-react";
import { siteConfig } from "@/data/content";
import { profile } from "@/data/profile";
import { SocialTiles } from "./SocialIcons";
export function ContactPanel() {
  const [status, setStatus] = useState("");
  const address = `${siteConfig.emailParts.user}@${siteConfig.emailParts.domain}`;
  async function copy() {
    try {
      await navigator.clipboard.writeText(address);
      setStatus("Copied.");
    } catch {
      setStatus("Select the address to copy it.");
    }
  }
  return (
    <section className="contact-page">
      <p className="label">Contact</p>
      <h1 className="h-page">Let’s talk.</h1>
      <a className="contact-email" href={`mailto:${address}`}>
        {siteConfig.emailParts.user}@
        <wbr />
        {siteConfig.emailParts.domain}
      </a>
      <div className="action-row" style={{ justifyContent: "center" }}>
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
      <p className="contact-place">
        <MapPin size={15} aria-hidden /> {profile.location}
      </p>
      <SocialTiles />
    </section>
  );
}
