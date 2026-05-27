import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/data/content";

type PageAction = {
  label: string;
  href: string;
  external?: boolean;
  variant?: "primary" | "secondary";
};

type PageFrameProps = {
  eyebrow: string;
  title: ReactNode;
  description: string;
  activePath?: string;
  actions?: PageAction[];
  children: ReactNode;
};

const navItems = [
  { label: "About", href: "/about" },
  { label: "Work", href: "/work" },
  { label: "Proof", href: "/proof" },
  { label: "Stack", href: "/stack" },
  { label: "Contact", href: "/contact" },
];

function actionClass(variant: PageAction["variant"] = "secondary") {
  if (variant === "primary") {
    return "bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-100";
  }

  return "border border-neutral-300 text-neutral-700 hover:border-accent-400/70 hover:text-accent-600 dark:border-neutral-700 dark:text-neutral-300 dark:hover:border-accent-300/70 dark:hover:text-accent-300";
}

function PageActionLink({ action }: { action: PageAction }) {
  const className = `inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${actionClass(
    action.variant
  )}`;

  if (action.external) {
    return (
      <a
        href={action.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {action.label}
        <ArrowUpRight size={15} />
      </a>
    );
  }

  return (
    <Link href={action.href} className={className}>
      {action.label}
      <ArrowUpRight size={15} />
    </Link>
  );
}

export function PageFrame({
  eyebrow,
  title,
  description,
  activePath,
  actions = [],
  children,
}: PageFrameProps) {
  return (
    <div className="min-h-dvh bg-white text-neutral-900 dark:bg-[#070605] dark:text-neutral-100">
      <header className="sticky top-0 z-50 border-b border-neutral-200/70 bg-white/85 backdrop-blur-xl dark:border-neutral-800/50 dark:bg-[#070605]/85">
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-5 px-6">
          <Link
            href="/"
            className="flex items-center gap-1 text-base font-semibold tracking-tight text-neutral-900 transition-colors hover:text-accent-600 dark:text-white dark:hover:text-accent-300"
          >
            {siteConfig.name}
            <span className="text-accent-500 dark:text-accent-300">.</span>
          </Link>

          <div className="hidden items-center gap-7 md:flex">
            {navItems.map((item) => {
              const active = item.href === activePath;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm transition-colors ${
                    active
                      ? "text-neutral-900 dark:text-white"
                      : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="border-t border-neutral-200/70 px-6 md:hidden dark:border-neutral-800/50">
          <div className="mx-auto flex max-w-6xl gap-5 overflow-x-auto py-3">
            {navItems.map((item) => {
              const active = item.href === activePath;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`whitespace-nowrap text-sm transition-colors ${
                    active
                      ? "text-neutral-900 dark:text-white"
                      : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </header>

      <main>
        <section className="border-b border-neutral-200/70 bg-neutral-50/70 dark:border-neutral-800/50 dark:bg-[#0a0807]/70">
          <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20 md:py-24">
            <Link
              href="/"
              className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-neutral-500 transition-colors hover:text-accent-600 dark:text-neutral-400 dark:hover:text-accent-300"
            >
              <ArrowLeft size={16} />
              Back to home
            </Link>

            <div className="max-w-4xl">
              <span className="mb-4 block text-xs font-semibold uppercase tracking-widest text-accent-500 dark:text-accent-300">
                {eyebrow}
              </span>
              <h1 className="text-5xl font-semibold leading-[1.02] tracking-tight text-neutral-950 sm:text-6xl md:text-7xl dark:text-white">
                {title}
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-relaxed text-neutral-600 sm:text-xl dark:text-neutral-400">
                {description}
              </p>

              {actions.length > 0 && (
                <div className="mt-9 flex flex-wrap gap-3">
                  {actions.map((action) => (
                    <PageActionLink key={`${action.label}-${action.href}`} action={action} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {children}
      </main>

      <footer className="border-t border-neutral-200 py-10 dark:border-neutral-800/50">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-neutral-500 dark:text-neutral-500">
            &copy; {new Date().getFullYear()} {siteConfig.name}
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-neutral-500 dark:text-neutral-500">
            <Link
              href="/"
              className="transition-colors hover:text-accent-600 dark:hover:text-accent-300"
            >
              Home
            </Link>
            <Link
              href="/contact"
              className="transition-colors hover:text-accent-600 dark:hover:text-accent-300"
            >
              Contact
            </Link>
            <a
              href={siteConfig.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-accent-600 dark:hover:text-accent-300"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
