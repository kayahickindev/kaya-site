import Image from "next/image";

const logos: Record<string, { src: string; alt: string }> = {
  MyFutureSelf: { src: "/logos/myfutureself.png", alt: "MyFutureSelf logo" },
  Appointra: { src: "/logos/appointra.png", alt: "Appointra logo" },
  "LeadBoost Pro": { src: "/logos/leadboost-pro.png", alt: "LeadBoost Pro logo" },
};

export function CompanyMark({
  company,
  size = 24,
  rounded = true,
}: {
  company: string;
  size?: number;
  rounded?: boolean;
}) {
  const logo = logos[company];
  if (!logo) return null;
  return (
    <Image
      src={logo.src}
      alt={logo.alt}
      width={size}
      height={size}
      unoptimized
      className={`shrink-0 object-contain ${rounded ? "rounded-md" : ""}`}
      style={{ width: size, height: size }}
    />
  );
}

export function hasCompanyMark(company: string) {
  return company in logos;
}
