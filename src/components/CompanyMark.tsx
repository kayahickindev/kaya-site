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
          <stop offset="0%" stopColor="#dbeafe" />
          <stop offset="100%" stopColor="#bae6fd" />
        </linearGradient>
        <linearGradient id="ap-stroke" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#1e40af" />
          <stop offset="100%" stopColor="#0c4a6e" />
        </linearGradient>
      </defs>
      <rect width="24" height="24" rx="5" fill="url(#ap-bg)" />
      <path
        d="M6.5 19 L12 5 L17.5 19"
        stroke="url(#ap-stroke)"
        strokeWidth="2.2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="12"
        y1="5"
        x2="12"
        y2="22"
        stroke="url(#ap-stroke)"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
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
      <polygon
        points="12,1.5 22,7 22,17 12,22.5 2,17 2,7"
        fill="url(#lbp-bg)"
        stroke="#34d399"
        strokeWidth="0.6"
        strokeOpacity="0.4"
      />
      <rect x="7" y="13" width="2.2" height="5" rx="0.4" fill="#34d399" />
      <rect x="10.9" y="10" width="2.2" height="8" rx="0.4" fill="#34d399" />
      <rect x="14.8" y="7" width="2.2" height="11" rx="0.4" fill="#34d399" />
      <path
        d="M6.5 8.5 L11 11 L13 9 L18 6"
        stroke="#a7f3d0"
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 5 L18 6 L17.2 8"
        stroke="#a7f3d0"
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
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
