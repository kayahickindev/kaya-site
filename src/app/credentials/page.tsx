import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { SubpageShell } from "@/components/SubpageShell";
import { siteConfig } from "@/data/content";
import { credentialGroups } from "@/data/credentials";
import { cardSurface } from "@/lib/surfaces";

const title = `Credentials | ${siteConfig.name}`;
const description =
  "Kaya Hickin's certifications and completed training in web accessibility, AI security, student privacy, and secure software development.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${siteConfig.url}/credentials` },
  openGraph: { title, description, url: `${siteConfig.url}/credentials` },
  twitter: { title, description },
};

export default function CredentialsPage() {
  return (
    <SubpageShell accent="amber">
      <div className="mx-auto max-w-6xl space-y-10 sm:space-y-14">
        <header className="max-w-3xl space-y-4 pt-4 sm:pt-8">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-amber-800 dark:text-amber-200">
            Kaya Hickin · Co-founder &amp; CTO, MyFutureSelf
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-neutral-950 sm:text-5xl dark:text-white">
            Credentials
          </h1>
          <p className="text-base leading-relaxed text-neutral-700 sm:text-lg dark:text-neutral-300">
            Certifications and completed training in accessibility, AI security,
            student privacy, and secure software development.
          </p>
        </header>

        {credentialGroups.map((group) => (
          <section
            key={group.id}
            aria-labelledby={group.id}
            className="space-y-4"
          >
            <h2
              id={group.id}
              className="text-xl font-semibold tracking-tight sm:text-2xl"
            >
              {group.title}
            </h2>
            <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {group.items.map((credential) => (
                <li
                  key={credential.id}
                  id={credential.id}
                  className={`${cardSurface} flex scroll-mt-6 flex-col p-5 sm:p-6`}
                >
                  <p className="font-mono text-[11px] uppercase tracking-wider text-amber-800 dark:text-amber-200">
                    {credential.kind}
                  </p>
                  <h3 className="mt-3 text-lg font-semibold leading-snug text-neutral-950 dark:text-white">
                    {credential.name}
                  </h3>
                  <p className="mt-2 text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    {credential.issuer}
                  </p>
                  <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                    Earned {credential.earned}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
                    {credential.description}
                  </p>
                  {credential.credentialId && (
                    <p className="mt-4 break-words font-mono text-xs text-neutral-600 dark:text-neutral-400">
                      Credential ID: {credential.credentialId}
                    </p>
                  )}
                  {credential.verificationUrl && (
                    <a
                      href={credential.verificationUrl}
                      className="mt-5 inline-flex min-h-11 w-fit items-center gap-1.5 rounded-sm text-sm font-medium text-amber-800 underline underline-offset-4 hover:decoration-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-800 dark:text-amber-200 dark:focus-visible:outline-amber-200"
                      aria-label={`Verify credential: ${credential.name}`}
                    >
                      Verify credential{" "}
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </SubpageShell>
  );
}
