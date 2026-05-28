type Company = "MyFutureSelf" | "Appointra" | "LeadBoost Pro";

function MyFutureSelfMark({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <defs>
        <radialGradient id="mfs-bg" cx="50%" cy="55%" r="65%">
          <stop offset="0%" stopColor="#78350f" />
          <stop offset="100%" stopColor="#0f0a04" />
        </radialGradient>
        <radialGradient id="mfs-glow" cx="50%" cy="55%" r="55%">
          <stop offset="0%" stopColor="#fde68a" stopOpacity="1" />
          <stop offset="55%" stopColor="#f59e0b" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#b45309" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="24" height="24" rx="5" fill="url(#mfs-bg)" />
      <circle cx="12" cy="13" r="7.5" fill="url(#mfs-glow)" />
      <path
        d="M12 7.5 c-1.6 0-2.8 1.2-2.8 2.8 0 1 .6 1.9 1.5 2.4 -1.4 .5-2.5 1.8-2.5 3.5 v.8 h7.6 v-.8 c0-1.7-1.1-3-2.5-3.5 .9-.5 1.5-1.4 1.5-2.4 0-1.6-1.2-2.8-2.8-2.8z"
        fill="#fef3c7"
        opacity="0.95"
      />
    </svg>
  );
}

function AppointraMark({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <defs>
        <linearGradient id="ap-bg" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#1e3a8a" />
          <stop offset="100%" stopColor="#0c1840" />
        </linearGradient>
      </defs>
      <rect width="24" height="24" rx="5" fill="url(#ap-bg)" />
      <rect x="5" y="8.5" width="14" height="9.5" rx="1.2" fill="#3b82f6" />
      <path
        d="M5.6 9.2 L12 13.4 L18.4 9.2"
        stroke="#ffffff"
        strokeWidth="1.4"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="18" cy="7" r="2.6" fill="#fbbf24" />
    </svg>
  );
}

function LeadBoostProMark({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <defs>
        <linearGradient id="lbp-bg" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#064e3b" />
          <stop offset="100%" stopColor="#022c22" />
        </linearGradient>
      </defs>
      <rect width="24" height="24" rx="5" fill="url(#lbp-bg)" />
      <path
        d="M5 17.5 L9 12.5 L13 15 L18.5 7"
        stroke="#34d399"
        strokeWidth="2.2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="18.5" cy="7" r="2.1" fill="#34d399" />
      <circle cx="18.5" cy="7" r="0.9" fill="#022c22" />
    </svg>
  );
}

export function CompanyMark({ company, size = 24 }: { company: Company | string; size?: number }) {
  if (company === "MyFutureSelf") return <MyFutureSelfMark size={size} />;
  if (company === "Appointra") return <AppointraMark size={size} />;
  if (company === "LeadBoost Pro") return <LeadBoostProMark size={size} />;
  return null;
}

export function hasCompanyMark(company: string) {
  return company === "MyFutureSelf" || company === "Appointra" || company === "LeadBoost Pro";
}
