import { siteConfig } from "@/data/content";
import {
  profile,
  programs,
  awards,
  scholarships,
  publicTools,
} from "@/data/profile";
import { credentials } from "@/data/credentials";
import {
  metricsCaption,
  tractionLines,
  type MarketingMetricsSnapshot,
} from "./marketing-metrics";

export const personId = `${siteConfig.url}/#person`;
const organizationId = "https://myfutureselfapp.com/#organization";

export const identityGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": personId,
      name: siteConfig.name,
      url: siteConfig.url,
      image: [`${siteConfig.url}/portraits/kaya-lake.jpg`, `${siteConfig.url}/portraits/kaya.jpg`],
      jobTitle: profile.role,
      description: profile.biography,
      workLocation: { "@type": "City", name: "Cincinnati, Ohio" },
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "Miami University",
        url: "https://miamioh.edu/",
      },
      worksFor: { "@id": organizationId },
      sameAs: [
        siteConfig.social.github,
        siteConfig.social.linkedin,
        siteConfig.social.twitter,
        siteConfig.social.instagram,
      ],
      knowsAbout: [
        "Full-stack development",
        "Swift",
        "SwiftUI",
        "React Native",
        "TypeScript",
        "Next.js",
        "Firebase",
        "Consumer AI",
        "Real-time voice AI",
        "Multimodal models",
        "Web accessibility",
      ],
    },
    {
      "@type": "Organization",
      "@id": organizationId,
      name: "MyFutureSelf",
      url: "https://myfutureselfapp.com/",
      description:
        "Consumer AI for personalized future-self mentorship, 90-day roadmaps, and daily action.",
      founder: { "@id": personId },
      funder: { "@type": "Organization", name: "Cintrifuse Capital" },
    },
  ],
};

// Detailed credentials are attached to the page where visitors can read them.
export const recognitionPerson = {
  "@type": "Person",
  "@id": personId,
  award: [
    ...awards.map((a) => `${a.name}, ${a.issuer}`),
    ...scholarships.map((s) => `${s.name}, ${s.issuer}`),
    "Cum laude, Miami University, 2026",
    "Valedictorian, Crestwood High School, 2022",
    "Dean's List honors, Miami University",
  ],
  hasCredential: credentials.map((c) => ({
    "@type": "EducationalOccupationalCredential",
    name: c.name,
    credentialCategory: c.kind,
    recognizedBy: { "@type": "Organization", name: c.issuer },
    ...(c.public_url ? { url: c.public_url } : {}),
  })),
};

export function profilePageJsonLd(path: string, name: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${siteConfig.url}${path}#webpage`,
    url: `${siteConfig.url}${path}`,
    name,
    dateModified: profile.updatedAt,
    mainEntity: { "@id": personId },
  };
}

export function profileText(metrics: MarketingMetricsSnapshot, full: boolean) {
  const intro = `# Kaya Hickin\n\n> ${profile.biography}\n\nLocation: ${profile.location}.\n\n## Pages\n\n- [About](${siteConfig.url}/about)\n- [Work](${siteConfig.url}/work)\n- [Stack](${siteConfig.url}/stack)\n- [Awards and credentials](${siteConfig.url}/proof)\n- [Contact](${siteConfig.url}/contact)\n\n## MyFutureSelf traction\n\n${metricsCaption(metrics)}.\n${tractionLines(
    metrics,
  )
    .map((l) => `- ${l}`)
    .join(
      "\n",
    )}\n\nAnnual run rate means the last completed calendar month's gross sales multiplied by 12. Paid subscribers means active paid subscribers. Rating figures come from the company's combined app metrics.\n`;
  if (!full) return intro;
  return (
    intro +
    `\n## Engineering\n\n${profile.about.join("\n\n")}\n\nGitHub: ${profile.github.count.toLocaleString("en-US")} contributions from ${profile.github.period}. Contributions are broader than commits.\n\n${profile.tokens.display} tokens: ${profile.tokens.description}\n\n${publicTools.map((t) => `- [${t.name}](${t.url}): ${t.description}`).join("\n")}\n\n## Programs and backing\n\n${programs.map((p) => `- ${p.name}: ${p.detail}`).join("\n")}\n\n## Education\n\n${profile.education}\n\n${profile.academicHonors}\n\n## Awards\n\n${awards.map((a) => `- ${a.name}, ${a.issuer}. ${a.detail}${a.url ? ` [Source](${a.url})` : ""}`).join("\n")}\n\n## Scholarships\n\n${scholarships.map((s) => `- ${s.name}, ${s.issuer}${s.url ? ` [Recipient record](${s.url})` : ""}`).join("\n")}\n\n## Credentials and training\n\n${credentials.map((c) => `- ${c.name}. ${c.issuer}. ${c.kind}. Earned ${c.earned}.${c.public_url ? ` [Credential](${c.public_url})` : ""}`).join("\n")}\n\n## Travel\n\n${profile.travel.description}\n\nCountries visited, excluding the United States: ${profile.travel.countries.join(", ")}.\n`
  );
}
