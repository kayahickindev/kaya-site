import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SubpageShell } from "@/components/SubpageShell";
import { TiltImage } from "@/components/TiltImage";
import { siteConfig } from "@/data/content";
import { cardSurfaceHover, cardSurfaceFeaturedEmerald } from "@/lib/surfaces";
import { projectDetails } from "./_projectDetails";

export const metadata: Metadata = {
  title: `Work | ${siteConfig.name}`,
  description:
    "Selected work by Kaya Hickin, including MyFutureSelf, Dog AI, Appointra, and LeadBoost Pro.",
  alternates: {
    canonical: `${siteConfig.url}/work`,
  },
};

const heroAccent = "from-cyan-500/20 via-transparent to-emerald-500/15";
const cardAccent = "from-emerald-500/15 via-transparent to-emerald-500/5";

const heroMetrics: Record<string, { value: string; label: string }> = {
  myfutureself: { value: "$65K", label: "ARR · 1,718 paid · 4.7★" },
  "viral-loop": { value: "Live", label: "MVP shipped" },
  "dog-ai": { value: "Live", label: "App Store · paying product" },
  appointra: { value: "$20K", label: "MRR in 3 months" },
  "leadboost-pro": { value: "20+", label: "sites built · month-one profitable" },
};

const cardHighlights: Record<string, string[]> = {
  myfutureself: [
    "26K+ downloads · 52% avg monthly growth",
    "Solo-built iOS, backend, and voice-AI stack",
  ],
  "viral-loop": [
    "Done-for-you AI UGC content pipeline",
    "Organic influencer distribution",
  ],
  "dog-ai": [
    "Custom multimodal LLM",
    "Trained on tens of thousands of dog images",
  ],
  appointra: [
    "$2M+ in client pipeline generated",
    "Cold-email infra for 8/9-figure founders",
  ],
  "leadboost-pro": [
    "Marketing, web dev, consulting",
    "Small and underrepresented businesses",
  ],
};

export default function WorkPage() {
  const hero = projectDetails.find((d) => d.slug === "myfutureself");
  const rest = projectDetails.filter((d) => d.slug !== "myfutureself");

  return (
    <SubpageShell accent="emerald">
      <div className="flex flex-col gap-4">
        <header className="relative">
          <div aria-hidden className="aurora" style={{ opacity: 0.55 }} />
          <h1 className="relative text-3xl font-semibold leading-[0.95] tracking-tight text-neutral-950 sm:text-4xl xl:text-5xl dark:text-white">
            Shipped products.
          </h1>
        </header>

        {hero ? (
          <Link
            href={`/work/${hero.slug}`}
            className={`${cardSurfaceFeaturedEmerald} group block p-0 transition hover:-translate-y-0.5 hover:border-emerald-400/50`}
          >
            <div
              aria-hidden
              className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${heroAccent}`}
            />
            <div className="relative grid grid-cols-1 gap-0 md:grid-cols-[1fr_1fr]">
              <div className="flex flex-col gap-3 p-5 md:p-6">
                <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-neutral-500">
                  {hero.role} · {hero.timeframe}
                </p>

                <div>
                  <h2 className="text-3xl font-semibold leading-[0.95] tracking-tight text-neutral-950 sm:text-4xl dark:text-white">
                    {hero.project.name}
                  </h2>
                  <p className="mt-1.5 text-sm text-neutral-700 dark:text-neutral-300">
                    {hero.project.tagline}
                  </p>
                </div>

                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  <span className="text-3xl font-semibold tracking-tight text-emerald-700 sm:text-4xl dark:text-emerald-200">
                    $65K ARR
                  </span>
                  <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    1,718 paid · 4.7★
                  </span>
                </div>

                <ul className="grid gap-1 text-[13px] text-neutral-700 dark:text-neutral-300">
                  {cardHighlights[hero.slug].map((h) => (
                    <li key={h} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-emerald-500 dark:bg-emerald-300" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <TiltImage className="relative min-h-[260px] overflow-hidden md:min-h-0">
                {hero.project.image ? (
                  <Image
                    src={hero.project.image}
                    alt={`${hero.project.name} app screenshots`}
                    width={781}
                    height={1250}
                    unoptimized
                    className="absolute inset-0 m-auto h-full max-h-[320px] w-auto scale-[1.0] object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.45)] transition-transform duration-500 group-hover:scale-[1.05] sm:max-h-[420px] sm:scale-[1.2] sm:group-hover:scale-[1.25]"
                  />
                ) : null}
              </TiltImage>
            </div>
          </Link>
        ) : null}

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {rest.map((detail) => {
            const { project } = detail;
            const highlights = cardHighlights[detail.slug] ?? [];
            const hero = heroMetrics[detail.slug];

            return (
              <Link
                key={detail.slug}
                href={`/work/${detail.slug}`}
                className={`${cardSurfaceHover} group flex min-h-[280px] flex-col p-4`}
              >
                <div
                  aria-hidden
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${cardAccent} opacity-70 transition-opacity duration-300 group-hover:opacity-100`}
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute -inset-px bg-[radial-gradient(circle_at_var(--mx,50%)_var(--my,0%),rgba(16,185,129,0.18),transparent_55%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:bg-[radial-gradient(circle_at_var(--mx,50%)_var(--my,0%),rgba(52,211,153,0.18),transparent_55%)]"
                />

                <div className="relative min-w-0">
                  <p className="truncate text-[10px] font-mono uppercase tracking-[0.18em] text-neutral-500">
                    {detail.role}
                    {detail.timeframe ? ` · ${detail.timeframe}` : ""}
                  </p>
                </div>

                <h2 className="relative mt-2 text-xl font-semibold leading-tight tracking-tight text-neutral-950 sm:text-2xl dark:text-white">
                  {project.name}
                </h2>

                <div className="relative mt-3 flex items-baseline gap-2">
                  <span className="text-2xl font-semibold tracking-tight text-neutral-950 dark:text-white">
                    {hero.value}
                  </span>
                  <span className="text-[10px] uppercase tracking-wide text-neutral-500 dark:text-neutral-500">
                    {hero.label}
                  </span>
                </div>

                <ul className="relative mt-2 grid gap-1 text-xs text-neutral-700 dark:text-neutral-300">
                  {highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2">
                      <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-neutral-400 dark:bg-neutral-500" />
                      <span className="leading-snug">{h}</span>
                    </li>
                  ))}
                </ul>
              </Link>
            );
          })}
        </div>
      </div>
    </SubpageShell>
  );
}
