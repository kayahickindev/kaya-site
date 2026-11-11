import Link from "next/link";
import { ArrowRight, ArrowUpRight, GraduationCap } from "lucide-react";
import { CompanyMark } from "./CompanyMark";
import { DetailDialog } from "./DetailDialog";
import { siteConfig } from "@/data/content";
import { cardSurface } from "@/lib/surfaces";

type Entry = (typeof siteConfig.timeline)[number];

// LinkedIn counts both the first and the last month: Jun 2024 to Feb 2025 is
// 9 mos. An open role runs to the month the page renders.
export function tenure(start: string, end: string | null, now = new Date()) {
  const [sy, sm] = start.split("-").map(Number);
  const [ey, em] = end
    ? end.split("-").map(Number)
    : [now.getFullYear(), now.getMonth() + 1];
  const months = (ey - sy) * 12 + (em - sm) + 1;
  const years = Math.floor(months / 12);
  const rest = months % 12;
  const parts = [];
  if (years) parts.push(`${years} yr${years > 1 ? "s" : ""}`);
  if (rest) parts.push(`${rest} mo${rest > 1 ? "s" : ""}`);
  return parts.join(" ");
}

function projectFor(entry: Entry) {
  return siteConfig.projects.find((p) => p.slug === entry.slug);
}

function EntryRow({ entry, isLast }: { entry: Entry; isLast: boolean }) {
  return (
    <span className="relative flex gap-3.5 rounded-md px-2 py-2.5 transition group-hover:bg-black/[0.035] dark:group-hover:bg-white/[0.04]">
      {!isLast ? (
        <span
          aria-hidden
          className="absolute bottom-[-0.75rem] left-[1.9rem] top-[3.4rem] w-px bg-gradient-to-b from-amber-400/60 to-amber-400/15"
        />
      ) : null}
      <span className="relative shrink-0">
        <span className="grid h-11 w-11 place-items-center overflow-hidden rounded-lg border border-black/10 bg-white shadow-sm dark:border-white/15 dark:bg-white/[0.06]">
          <CompanyMark company={entry.company} size={30} />
        </span>
        {entry.active ? (
          <span
            aria-hidden
            className="accent-pulse absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-[#f4f1ea] bg-amber-400 shadow-[0_0_10px_rgba(212,155,90,0.6)] dark:border-[#0b0b0b]"
          />
        ) : null}
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center justify-between gap-2">
          <span className="truncate text-[15px] font-semibold text-neutral-950 dark:text-white">
            {entry.company}
          </span>
          <ArrowUpRight
            size={14}
            className="shrink-0 text-neutral-400 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-amber-600 dark:group-hover:text-amber-300"
          />
        </span>
        <span className="block text-[13px] text-neutral-700 dark:text-neutral-300">
          {entry.role}
        </span>
        <span className="block text-xs text-neutral-500 dark:text-neutral-400">
          {entry.period.replace(" to ", " – ")} · {tenure(entry.start, entry.end)}
        </span>
        <span className="mt-1 line-clamp-2 text-[13px] leading-snug text-neutral-600 dark:text-neutral-300">
          {entry.description}
        </span>
      </span>
    </span>
  );
}

// The about page's experience section, laid out like LinkedIn's: newest first,
// a logo per company, role, dates and tenure, and a thread joining them. Each
// role opens its detail in a dialog.
export function ExperienceTimeline({
  highlights,
}: {
  highlights: Record<string, string[]>;
}) {
  const entries = siteConfig.timeline;
  const education = siteConfig.about.sidebar[0];

  return (
    <section
      aria-labelledby="experience-heading"
      className={`${cardSurface} flex flex-col p-3 sm:p-4`}
    >
      <h2
        id="experience-heading"
        className="px-2 font-mono text-[11px] uppercase tracking-[0.18em] text-amber-800/90 dark:text-amber-200/80"
      >
        Experience
      </h2>
      <ol className="mt-1.5 flex flex-col gap-1">
        {entries.map((entry, idx) => {
          const project = projectFor(entry);
          const links = project?.links as
            | { website?: string; appStore?: string }
            | undefined;
          return (
            <li key={entry.company}>
              <DetailDialog
                accent="amber"
                triggerLabel={`${entry.company}, ${entry.role}, ${entry.period}. Open details`}
                triggerClassName="group block w-full rounded-md"
                trigger={
                  <EntryRow entry={entry} isLast={idx === entries.length - 1} />
                }
                eyebrow={`${entry.role} · ${entry.period}`}
                title={
                  <span className="flex items-center gap-3">
                    <CompanyMark company={entry.company} size={32} />
                    {entry.company}
                  </span>
                }
              >
                <p className="text-[15px] leading-relaxed text-neutral-800 dark:text-neutral-200">
                  {entry.description}
                </p>
                {project ? (
                  <p className="mt-3">{project.description}</p>
                ) : null}
                {highlights[entry.slug]?.length ? (
                  <ul className="mt-4 grid gap-1.5">
                    {highlights[entry.slug].map((h) => (
                      <li key={h} className="flex items-start gap-2">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-amber-500 dark:bg-amber-300" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
                <p className="mt-4 text-xs text-neutral-500 dark:text-neutral-400">
                  {tenure(entry.start, entry.end)}
                  {entry.active ? " · current" : ""}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project ? (
                    <Link
                      href={`/work/${project.slug}`}
                      className="inline-flex h-9 items-center gap-1.5 rounded-md border border-amber-400/40 bg-amber-400/15 px-3 text-sm font-medium text-amber-800 transition hover:bg-amber-400/25 dark:text-amber-200"
                    >
                      Read the case study <ArrowRight size={14} />
                    </Link>
                  ) : null}
                  {links?.website ? (
                    <a
                      href={links.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-9 items-center gap-1.5 rounded-md border border-black/10 px-3 text-sm font-medium text-neutral-700 transition hover:bg-black/5 dark:border-white/15 dark:text-neutral-200 dark:hover:bg-white/10"
                    >
                      Website <ArrowUpRight size={14} />
                    </a>
                  ) : null}
                </div>
              </DetailDialog>
            </li>
          );
        })}
      </ol>

      {education ? (
        <>
          <h2 className="mt-3 border-t border-black/10 px-2 pt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-amber-800/90 dark:border-white/10 dark:text-amber-200/80">
            Education
          </h2>
          <div className="mt-1.5 flex gap-3.5 px-2 py-2">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-black/10 bg-white text-[#b61e2e] shadow-sm dark:border-white/15 dark:bg-white/[0.06] dark:text-red-300">
              <GraduationCap size={20} />
            </span>
            <span className="min-w-0">
              <span className="block text-[15px] font-semibold text-neutral-950 dark:text-white">
                Miami University
              </span>
              <span className="block text-[13px] text-neutral-700 dark:text-neutral-300">
                B.S. Business · Marketing, Entrepreneurship minor
              </span>
              <span className="block text-xs text-neutral-500 dark:text-neutral-400">
                Cum laude · May 2026
              </span>
            </span>
          </div>
        </>
      ) : null}
    </section>
  );
}
