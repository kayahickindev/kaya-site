export type Credential = {
  id: string;
  name: string;
  issuer: string;
  kind: string;
  earned: string;
  description: string;
  credentialId?: string;
  verificationUrl?: string;
};

export const credentialGroups: {
  id: string;
  title: string;
  items: Credential[];
}[] = [
  {
    id: "certifications",
    title: "Certifications and assessed credentials",
    items: [
      {
        id: "dhs-trusted-tester",
        name: "DHS Trusted Tester Certification",
        issuer: "U.S. Department of Homeland Security",
        kind: "Certification",
        earned: "August 21, 2026",
        description:
          "Trusted Tester for Web on Windows. Section 508 web accessibility testing, with a certification exam score of 94/100.",
        credentialId: "TT-2608-09530",
      },
      {
        id: "microsoft-secure-ai",
        name: "Microsoft Applied Skills: Secure AI solutions in the cloud",
        issuer: "Microsoft",
        kind: "Assessed credential",
        earned: "August 24, 2026",
        description:
          "An interactive lab assessment covering security for cloud AI services, model guardrails, and environment controls in Microsoft's cloud tools.",
        credentialId: "398719AF7D2BBDAD",
        verificationUrl:
          "https://learn.microsoft.com/en-us/users/kayahickin-2412/credentials/398719af7d2bbdad",
      },
      {
        id: "fortinet-nse-1",
        name: "Fortinet NSE 1 Certified in Cybersecurity",
        issuer: "Fortinet",
        kind: "Foundational certification",
        earned: "August 2026",
        description:
          "Cybersecurity foundations, including threats, access control, endpoint protection, and cloud security. Includes Cybersecurity and Cloud Fundamentals 1.0 training. Expires August 2028.",
        verificationUrl:
          "https://www.credly.com/badges/1779c8ef-d176-4d7f-beda-096911165fbf",
      },
    ],
  },
  {
    id: "student-privacy",
    title: "Student privacy training",
    items: [
      {
        id: "ferpa-colleges",
        name: "FERPA 101: Colleges and Universities",
        issuer: "U.S. Department of Education",
        kind: "Course completion",
        earned: "August 24, 2026",
        description:
          "FERPA fundamentals for colleges, universities, and other postsecondary institutions.",
      },
      {
        id: "ferpa-data-sharing",
        name: "FERPA 201: Data Sharing Under FERPA",
        issuer: "U.S. Department of Education",
        kind: "Course completion",
        earned: "August 24, 2026",
        description: "Training on sharing education records under FERPA.",
      },
      {
        id: "ferpa-local-agencies",
        name: "FERPA 101: Local Education Agencies",
        issuer: "U.S. Department of Education",
        kind: "Course completion",
        earned: "August 24, 2026",
        description:
          "FERPA fundamentals for local education agencies and K-12 settings.",
      },
    ],
  },
  {
    id: "software-accessibility",
    title: "Secure software and accessibility training",
    items: [
      {
        id: "developing-secure-software",
        name: "Developing Secure Software (LFD121)",
        issuer: "The Linux Foundation / OpenSSF",
        kind: "Course completion",
        earned: "August 24, 2026",
        description: "Secure software development practices and foundations.",
        credentialId: "LF-95kwqx9i0r",
        verificationUrl:
          "https://www.credly.com/badges/414af5fc-e86d-48fd-9f05-2be4b80f6253",
      },
      {
        id: "accessibility-business-case",
        name: "Web Accessibility, the Business Case",
        issuer: "The A11Y Collective",
        kind: "Course completion",
        earned: "August 24, 2026",
        description:
          "The business case for web accessibility. Awarded 0.5 IAAP education credits.",
        credentialId: "192305681",
      },
    ],
  },
  {
    id: "additional-training",
    title: "Additional training",
    items: [
      {
        id: "social-media-simternship",
        name: "Social Media Simternship",
        issuer: "Stukent",
        kind: "Simulation completion",
        earned: "April 22, 2026",
        description:
          "Applied social media strategy, campaign measurement, and advertising simulation.",
      },
      {
        id: "learning-excel",
        name: "Learning Excel 2021",
        issuer: "LinkedIn Learning",
        kind: "Course completion",
        earned: "September 16, 2023",
        description: "Excel fundamentals.",
      },
      {
        id: "excel-formulas",
        name: "Excel Formulas and Functions Quick Tips (2020)",
        issuer: "LinkedIn Learning",
        kind: "Course completion",
        earned: "September 16, 2023",
        description: "Working with Excel formulas and functions.",
      },
    ],
  },
];
