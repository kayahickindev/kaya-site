import Link from "next/link";
import { profile } from "@/data/profile";
import { SocialRow } from "./SocialIcons";
export function Footer() {
  return (
    <footer className="site-footer">
      <p>
        <Link href="/">Kaya Hickin</Link> · {profile.location}
      </p>
      <SocialRow />
    </footer>
  );
}
