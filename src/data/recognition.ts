// Backing, awards, programs, and invitations shown on the home page. Logos are
// official marks fetched from each organization's own site (see
// public/logos/recognition/SOURCES.md); when a logo is missing the name is set
// as a wordmark instead.
export type Recognition = {
  name: string;
  line: string;
  logo?: string;
  href?: string;
};

export const recognition: Recognition[] = [
  { name: "Cintrifuse Capital", line: "Investor in MyFutureSelf", logo: "/logos/recognition/cintrifuse.svg" },
  {
    name: "Miami University",
    line: "Startup Catalyst Award, 2026",
    logo: "/logos/recognition/miami-university.svg",
    href: "https://www.linkedin.com/posts/miami-university-institute-for-entrepreneurship_the-future-of-entrepreneurship-is-in-good-activity-7455620311288541184-qsdO",
  },
  { name: "Y Combinator", line: "Startup School invitation, 2026", logo: "/logos/recognition/y-combinator.svg" },
  { name: "Founders Inc", line: "Off Season II, San Francisco", logo: "/logos/recognition/founders-inc.png" },
  { name: "Series Build", line: "Inaugural cohort, New York City" },
];
