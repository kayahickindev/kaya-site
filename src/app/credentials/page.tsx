import type { Metadata } from "next";
import { ArrowUpRight, BadgeCheck, GraduationCap, ShieldCheck } from "lucide-react";
import { DetailDialog } from "@/components/DetailDialog";
import { SubpageShell } from "@/components/SubpageShell";
import { siteConfig } from "@/data/content";
import { credentialGroups, type Credential } from "@/data/credentials";
import { cardSurfaceFeatured, cardSurfaceHover } from "@/lib/surfaces";

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

function CredentialBody({ credential }: { credential: Credential }) {
  return (
    <>
      <p className="text-[15px] font-medium text-neutral-800 dark:text-neutral-200">
        {credential.issuer}
      </p>
      <p className="mt-0.5 text-neutral-500 dark:text-neutral-400">
        Earned {credential.earned}
      </p>
      <p className="mt-4 text-[15px]">{credential.description}</p>
      {credential.credentialId ? (
        <p className="mt-4 break-words font-mono text-xs text-neutral-600 dark:text-neutral-400">
          Credential ID: {credential.credentialId}
        </p>
      ) : null}
      {credential.verificationUrl ? (
        <a
          href={credential.verificationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex h-9 items-center gap-1.5 rounded-md border border-amber-400/40 bg-amber-400/15 px-3 text-sm font-medium text-amber-800 transition hover:bg-amber-400/25 dark:text-amber-200"
          aria-label={`Verify credential: ${credential.name}`}
        >
          Verify credential <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      ) : null}
    </>
  );
}

export default function CredentialsPage() {
  return (
    <SubpageShell accent="amber">
      <div className="mx-auto flex w-full max-w-[88rem] flex-col gap-5">
        <header className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-amber-800 dark:text-amber-200">
              Kaya Hickin · Co-founder &amp; CTO, MyFutureSelf
            </p>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl xl:text-5xl dark:text-white">
              Credentials
            </h1>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
            Certifications and completed training in accessibility, AI
            security, student privacy, and secure software development. Click
            any one for the details.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-x-3 gap-y-5 sm:grid-cols-2 xl:grid-cols-4">
          {credentialGroups.map((group, groupIndex) => {
            const featured = groupIndex === 0;
            const Icon = featured
              ? ShieldCheck
              : group.id === "additional-training"
                ? GraduationCap
                : BadgeCheck;
            return (
              <section
                key={group.id}
                aria-labelledby={group.id}
                className="flex flex-col gap-2"
              >
                <h2
                  id={group.id}
                  className="flex min-h-[2.25rem] items-end gap-1.5 font-mono text-[11px] uppercase leading-snug tracking-[0.16em] text-neutral-700 dark:text-neutral-300"
                >
                  <Icon
                    size={13}
                    className="mb-px shrink-0 text-amber-700 dark:text-amber-300"
                  />
                  {group.title}
                </h2>
                <ul className="flex flex-col gap-2">
                  {group.items.map((credential) => (
                    <li key={credential.id} id={credential.id}>
                      <DetailDialog
                        accent="amber"
                        triggerLabel={`${credential.name}, ${credential.issuer}. Open details`}
                        triggerClassName={`${
                          featured ? cardSurfaceFeatured : cardSurfaceHover
                        } group flex w-full flex-col p-3.5 transition hover:-translate-y-0.5`}
                        eyebrow={credential.kind}
                        title={credential.name}
                        trigger={
                          <>
                            <span className="flex items-center justify-between gap-2">
                              <span className="font-mono text-[10px] uppercase tracking-wider text-amber-800 dark:text-amber-200">
                                {credential.kind}
                              </span>
                              <ArrowUpRight
                                size={13}
                                className="shrink-0 text-neutral-400 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-amber-600 dark:group-hover:text-amber-300"
                              />
                            </span>
                            <span className="mt-1.5 line-clamp-2 text-sm font-semibold leading-snug text-neutral-950 dark:text-white">
                              {credential.name}
                            </span>
                            <span className="mt-1 truncate text-xs text-neutral-600 dark:text-neutral-400">
                              {credential.issuer} · {credential.earned.replace(/ \d{1,2},/, "")}
                            </span>
                          </>
                        }
                      >
                        <CredentialBody credential={credential} />
                      </DetailDialog>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      </div>
    </SubpageShell>
  );
}
