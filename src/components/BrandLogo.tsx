type BrandKey =
  | "swift"
  | "apple"
  | "webrtc"
  | "typescript"
  | "react"
  | "nextjs"
  | "tailwind"
  | "framer"
  | "vercel"
  | "nodejs"
  | "firebase"
  | "gcp"
  | "openai"
  | "anthropic"
  | "voice"
  | "claudecode"
  | "codex"
  | "cursor"
  | "mixpanel"
  | "superwall"
  | "granola"
  | "wispr"
  | "ghostty"
  | "lovable"
  | "replit"
  | "revenuecat"
  | "testflight"
  | "supabase"
  | "stripe"
  | "whisper"
  | "elevenlabs";

function detect(name: string): BrandKey | null {
  const n = name.toLowerCase();
  if (n.includes("swiftui") || n.startsWith("swift")) return "swift";
  if (n.includes("core data") || n.includes("storekit")) return "apple";
  if (n.includes("webrtc")) return "webrtc";
  if (n.includes("typescript")) return "typescript";
  if (n.includes("react")) return "react";
  if (n.includes("next")) return "nextjs";
  if (n.includes("tailwind")) return "tailwind";
  if (n.includes("framer")) return "framer";
  if (n.includes("vercel")) return "vercel";
  if (n.includes("node")) return "nodejs";
  if (n.includes("firebase") || n.includes("firestore")) return "firebase";
  if (n.includes("cloud function")) return "gcp";
  if (n.includes("openai") || n.includes("responses")) return "openai";
  if (n.includes("claude api")) return "anthropic";
  if (n.includes("realtime") || n.includes("voice")) return "voice";
  if (n.includes("claude code")) return "claudecode";
  if (n.includes("codex")) return "codex";
  if (n.includes("cursor")) return "cursor";
  if (n.includes("mixpanel")) return "mixpanel";
  if (n.includes("superwall")) return "superwall";
  if (n.includes("granola")) return "granola";
  if (n.includes("wispr")) return "wispr";
  if (n.includes("ghostty")) return "ghostty";
  if (n.includes("lovable")) return "lovable";
  if (n.includes("replit")) return "replit";
  if (n.includes("revenuecat")) return "revenuecat";
  if (n.includes("testflight")) return "testflight";
  if (n.includes("supabase")) return "supabase";
  if (n.includes("stripe")) return "stripe";
  if (n.includes("whisper")) return "whisper";
  if (n.includes("elevenlabs")) return "elevenlabs";
  return null;
}

// Brand SVGs — paths sourced from simpleicons.org. Single-color so we tint per-brand.
function Icon({ brand, size = 14 }: { brand: BrandKey; size?: number }) {
  switch (brand) {
    case "swift":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="#F05138" aria-hidden>
          <path d="M20.058 18.512c-.108.082-2.245 1.69-5.918 1.69-3.673 0-7.025-1.84-9.92-4.55C1.327 12.94.107 9.488.107 6.85c0-2.638 1.22-4.78 1.22-4.78s1.83 2.638 4.78 4.78c2.95 2.142 5.918 3.32 5.918 3.32s-1.83-1.83-3.32-3.32C7.215 5.36 5.385 3.53 5.385 3.53s5.36 1.83 8.31 4.78c2.95 2.95 4.78 6.918 4.78 6.918l1.69 1.69s.108-.108-.107.594z" />
        </svg>
      );
    case "apple":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M17.05 12.04c-.03-3.01 2.46-4.46 2.57-4.53-1.4-2.05-3.59-2.33-4.36-2.36-1.85-.19-3.61 1.09-4.55 1.09-.95 0-2.4-1.07-3.94-1.04-2.03.03-3.9 1.18-4.94 3-2.11 3.66-.54 9.07 1.52 12.04 1.01 1.45 2.21 3.08 3.79 3.02 1.52-.06 2.09-.98 3.93-.98 1.83 0 2.35.98 3.96.95 1.63-.03 2.67-1.48 3.67-2.94 1.16-1.68 1.64-3.32 1.66-3.41-.04-.02-3.18-1.22-3.21-4.84zM14.05 3.71c.84-1.02 1.4-2.43 1.25-3.84-1.21.05-2.68.81-3.55 1.82-.78.9-1.46 2.34-1.28 3.72 1.35.1 2.73-.69 3.58-1.7z" />
        </svg>
      );
    case "webrtc":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 1.5a10.5 10.5 0 100 21 10.5 10.5 0 000-21zm0 2a8.5 8.5 0 110 17 8.5 8.5 0 010-17zM12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6z" />
        </svg>
      );
    case "typescript":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
          <rect width="24" height="24" rx="3" fill="#3178C6" />
          <path
            fill="#fff"
            d="M13.06 17.6v1.86c.32.16.7.28 1.14.36.43.08.89.12 1.37.12.47 0 .92-.04 1.34-.13.43-.09.8-.24 1.12-.45.32-.21.57-.5.76-.85.19-.36.28-.8.28-1.32 0-.38-.06-.71-.17-.99-.12-.28-.28-.53-.5-.74-.22-.21-.47-.4-.78-.57-.3-.17-.64-.33-1.01-.49l-.86-.36c-.13-.06-.25-.12-.36-.19a1.49 1.49 0 01-.27-.21.83.83 0 01-.18-.25.74.74 0 01-.06-.31c0-.1.03-.2.08-.29.05-.09.13-.17.23-.23.1-.07.23-.12.38-.16.15-.04.33-.06.52-.06.14 0 .29.01.45.03.16.02.32.05.48.1.16.04.32.1.47.16.15.07.29.14.42.23v-1.73a4.94 4.94 0 00-1.04-.26 8.6 8.6 0 00-1.3-.08c-.46 0-.91.05-1.33.15-.42.1-.79.26-1.11.47a2.36 2.36 0 00-.76.83c-.18.34-.27.74-.27 1.2 0 .63.18 1.17.55 1.62.36.44.92.82 1.66 1.13l.96.4c.18.07.34.15.49.22.15.07.27.16.38.24.1.09.18.18.24.29.06.1.09.22.09.36 0 .1-.02.19-.07.28a.74.74 0 01-.22.24c-.1.07-.22.13-.37.17-.15.04-.33.06-.54.06-.36 0-.71-.06-1.06-.19-.35-.13-.67-.32-.97-.57zM10.6 11.84H13V10H6.14v1.84h2.39v6.86h2.07z"
          />
        </svg>
      );
    case "react":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="#61DAFB" aria-hidden>
          <circle cx="12" cy="12" r="2.05" />
          <g stroke="#61DAFB" strokeWidth="1" fill="none">
            <ellipse cx="12" cy="12" rx="11" ry="4.2" />
            <ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(60 12 12)" />
            <ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(120 12 12)" />
          </g>
        </svg>
      );
    case "nextjs":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <circle cx="12" cy="12" r="12" fill="currentColor" />
          <path d="M7 7h1.6v10H7zm9.4 0H15v6.7L9.6 7H8l7 10h1.4z" fill="#fff" />
        </svg>
      );
    case "tailwind":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="#38BDF8" aria-hidden>
          <path d="M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.36C13.4 10.87 14.55 12 17 12c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.31-.74-1.91-1.36C15.6 7.13 14.45 6 12 6zM7 12c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.36C8.4 16.87 9.55 18 12 18c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.31-.74-1.91-1.36C10.6 13.13 9.45 12 7 12z" />
        </svg>
      );
    case "framer":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="#0055FF" aria-hidden>
          <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" />
        </svg>
      );
    case "vercel":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 2L24 22H0z" />
        </svg>
      );
    case "nodejs":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="#5FA04E" aria-hidden>
          <path d="M12 1L2 6.5v11L12 23l10-5.5v-11zm0 2.3L19.7 7.6 12 12 4.3 7.6zM3.5 9.3L11 13.5v8L3.5 17.3zm17 0v8L13 21.5v-8z" />
        </svg>
      );
    case "firebase":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
          <path d="M3.5 17L7 4l3 5.5L12 6l2 3.5L17 4l3.5 13L12 22z" fill="#FFA000" />
          <path d="M12 6l2 3.5L17 4l3.5 13L12 22z" fill="#F57C00" />
          <path d="M12 22L3.5 17 7 4z" fill="#FFCA28" />
        </svg>
      );
    case "gcp":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
          <path d="M14.5 8.5L18 12l-3.5 3.5h-5L6 12l3.5-3.5z" fill="#4285F4" />
          <path d="M9.5 8.5L6 12l3.5 3.5z" fill="#34A853" />
          <path d="M14.5 8.5L18 12l-3.5 3.5z" fill="#EA4335" />
          <path d="M9.5 8.5l5 0L12 6z" fill="#FBBC04" />
        </svg>
      );
    case "openai":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M22.28 9.82a5.99 5.99 0 00-.52-4.92 6.06 6.06 0 00-6.52-2.9A6 6 0 003.64 4.83a5.99 5.99 0 00-4.02 2.9 6.06 6.06 0 00.74 7.1 5.99 5.99 0 00.52 4.92 6.06 6.06 0 006.52 2.9A6 6 0 0019.36 19.17a5.99 5.99 0 004.02-2.9 6.06 6.06 0 00-.74-7.1zm-9.04 12.7a4.5 4.5 0 01-2.89-1.05l.14-.08 4.83-2.79a.79.79 0 00.4-.69V11l2.04 1.18a.07.07 0 01.04.05v5.64a4.5 4.5 0 01-4.5 4.5zm-9.67-4.13a4.49 4.49 0 01-.54-3.03l.14.08 4.83 2.79c.24.14.55.14.79 0L14.7 14.7v2.36a.07.07 0 01-.03.06l-4.88 2.82a4.5 4.5 0 01-6.13-1.55zM2.34 9.6a4.5 4.5 0 012.35-1.98v5.75c0 .28.15.55.39.69l5.81 3.35-2.04 1.18a.07.07 0 01-.07 0L3.91 15.77a4.5 4.5 0 01-1.57-6.18zm16.83 3.9l-5.81-3.36 2.04-1.17a.07.07 0 01.07 0l4.88 2.81a4.5 4.5 0 01-.68 8.1v-5.74a.79.79 0 00-.4-.69zm2.03-3.05l-.14-.09-4.83-2.81a.79.79 0 00-.79 0L9.3 9.3V6.94a.06.06 0 01.03-.06l4.88-2.81a4.5 4.5 0 016.68 4.65zm-10.5 4.19L8.66 13.4V11.04l2.04-1.18 2.04 1.18v2.36z" />
        </svg>
      );
    case "anthropic":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="#D97706" aria-hidden>
          <path d="M14.5 3L21 21h-3.5l-1.3-3.5H7.8L6.5 21H3l6.5-18zM12 6.8L8.8 14.5h6.4z" />
        </svg>
      );
    case "voice":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 3a3 3 0 00-3 3v6a3 3 0 006 0V6a3 3 0 00-3-3zm6 9a6 6 0 01-12 0H4a8 8 0 007 7.93V22h2v-2.07A8 8 0 0020 12z" />
        </svg>
      );
    case "claudecode":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="#D97706" aria-hidden>
          <rect x="2" y="4" width="20" height="16" rx="2" fill="none" stroke="#D97706" strokeWidth="1.5" />
          <path d="M8 9l-3 3 3 3M16 9l3 3-3 3" stroke="#D97706" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "codex":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <rect x="3" y="3" width="18" height="18" rx="3" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <text x="12" y="16" textAnchor="middle" fontSize="9" fontFamily="ui-monospace, monospace" fontWeight="700" fill="currentColor">{`<>`}</text>
        </svg>
      );
    case "cursor":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M4 3l9 18 2.4-7.6L23 11z" />
        </svg>
      );
    case "mixpanel":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="#7856FF" aria-hidden>
          <circle cx="4" cy="12" r="2" />
          <circle cx="12" cy="12" r="3" />
          <circle cx="20" cy="12" r="1.5" />
        </svg>
      );
    case "superwall":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M4 6h16v3H4zm0 5h16v3H4zm0 5h10v3H4z" />
        </svg>
      );
    case "granola":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="#D97706" aria-hidden>
          <circle cx="7" cy="9" r="2.2" />
          <circle cx="14" cy="6.5" r="2" />
          <circle cx="17" cy="13" r="2.4" />
          <circle cx="9" cy="15.5" r="2.6" />
          <circle cx="15" cy="18" r="1.8" />
        </svg>
      );
    case "wispr":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="1.6" strokeLinecap="round" aria-hidden>
          <path d="M3 12c2-4 4-4 6 0s4 4 6 0 4-4 6 0" />
        </svg>
      );
    case "ghostty":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="#A855F7" aria-hidden>
          <path d="M12 3a7 7 0 00-7 7v10l2.5-2 2.5 2 2-2 2 2 2.5-2 2.5 2V10a7 7 0 00-7-7zm-2 8a1 1 0 110-2 1 1 0 010 2zm4 0a1 1 0 110-2 1 1 0 010 2z" />
        </svg>
      );
    case "lovable":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="#EC4899" aria-hidden>
          <path d="M12 21s-7-4.5-9.5-9C.83 8.5 3 5 6.5 5c2 0 3.5 1 5.5 3 2-2 3.5-3 5.5-3 3.5 0 5.67 3.5 4 7-2.5 4.5-9.5 9-9.5 9z" />
        </svg>
      );
    case "replit":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="#F26207" aria-hidden>
          <path d="M3 3h9v8H3zm0 10h9v8H3zm12-5h6v8h-6z" />
        </svg>
      );
    case "revenuecat":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="#FF6961" aria-hidden>
          <path d="M12 3a4 4 0 014 4v1h2a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V10a2 2 0 012-2h2V7a4 4 0 014-4zm0 2a2 2 0 00-2 2v1h4V7a2 2 0 00-2-2zm-2 8a2 2 0 104 0 2 2 0 00-4 0z" />
        </svg>
      );
    case "testflight":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="#0D7AFF" aria-hidden>
          <path d="M12 2L4 18l8-4 8 4z" />
          <circle cx="12" cy="10" r="2" fill="#fff" />
        </svg>
      );
    case "supabase":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="#3ECF8E" aria-hidden>
          <path d="M13 2L4 14h7v8l9-12h-7z" />
        </svg>
      );
    case "stripe":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="#635BFF" aria-hidden>
          <path d="M13.3 8.6c0-.7.6-1 1.5-1 1.4 0 3.1.4 4.4 1.1V4.5c-1.5-.6-3-.9-4.4-.9-3.6 0-6 1.9-6 5 0 4.9 6.7 4.1 6.7 6.2 0 .8-.7 1.1-1.7 1.1-1.5 0-3.6-.6-5.2-1.5v4.3c1.8.8 3.6 1.1 5.2 1.1 3.7 0 6.2-1.8 6.2-5 0-5.3-6.7-4.4-6.7-6.2z" />
        </svg>
      );
    case "whisper":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#10A37F" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
          <line x1="6" y1="9" x2="6" y2="15" />
          <line x1="10" y1="6" x2="10" y2="18" />
          <line x1="14" y1="8" x2="14" y2="16" />
          <line x1="18" y1="10" x2="18" y2="14" />
        </svg>
      );
    case "elevenlabs":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <rect x="6" y="4" width="4" height="16" rx="0.5" />
          <rect x="14" y="4" width="4" height="16" rx="0.5" />
        </svg>
      );
  }
}

export function BrandLogo({ name, size = 14 }: { name: string; size?: number }) {
  const brand = detect(name);

  if (!brand) {
    // Letter-mark fallback for unknown items.
    const letter = name.replace(/[^a-zA-Z]/g, "").charAt(0).toUpperCase() || "·";
    return (
      <span
        className="grid h-4 w-4 shrink-0 place-items-center rounded-sm bg-neutral-300 text-[11px] font-bold text-neutral-700 dark:bg-white/15 dark:text-neutral-200"
        style={{ height: size, width: size }}
        aria-hidden
      >
        {letter}
      </span>
    );
  }

  return (
    <span className="shrink-0 text-neutral-700 dark:text-neutral-200" aria-hidden>
      <Icon brand={brand} size={size} />
    </span>
  );
}
