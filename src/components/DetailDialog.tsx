"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { X } from "lucide-react";

export type DialogAccent = "amber" | "emerald" | "cyan";

const accentRing: Record<DialogAccent, string> = {
  amber: "focus-visible:ring-amber-400/60",
  emerald: "focus-visible:ring-emerald-400/60",
  cyan: "focus-visible:ring-cyan-400/60",
};

const accentEyebrow: Record<DialogAccent, string> = {
  amber: "text-amber-800 dark:text-amber-200",
  emerald: "text-emerald-800 dark:text-emerald-200",
  cyan: "text-cyan-800 dark:text-cyan-200",
};

const accentTop: Record<DialogAccent, string> = {
  amber: "from-amber-400/70",
  emerald: "from-emerald-400/70",
  cyan: "from-cyan-400/70",
};

// A card that opens a modal with the detail behind it. The native <dialog>
// gives focus trapping, Escape to close and the top layer for free; a click on
// the backdrop closes it too, and the page behind stops scrolling while open.
export function DetailDialog({
  trigger,
  triggerLabel,
  triggerClassName = "",
  eyebrow,
  title,
  accent = "amber",
  size = "md",
  overlay = false,
  children,
}: {
  trigger: ReactNode;
  triggerLabel: string;
  triggerClassName?: string;
  eyebrow?: ReactNode;
  title: ReactNode;
  accent?: DialogAccent;
  size?: "md" | "lg";
  // Renders `trigger` as plain content with a transparent button stretched
  // over it, for cards whose content is not valid inside a <button>.
  overlay?: boolean;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const titleId = useId();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
    const root = document.documentElement;
    if (open) {
      const previous = root.style.overflow;
      root.style.overflow = "hidden";
      return () => {
        root.style.overflow = previous;
      };
    }
  }, [open]);

  return (
    <>
      {overlay ? (
        <div className={`relative ${triggerClassName}`}>
          {trigger}
          <button
            type="button"
            aria-haspopup="dialog"
            aria-label={triggerLabel}
            onClick={() => setOpen(true)}
            className={`absolute inset-0 z-20 cursor-pointer rounded-[inherit] focus:outline-none focus-visible:ring-2 ${accentRing[accent]}`}
          />
        </div>
      ) : (
        <button
          type="button"
          aria-haspopup="dialog"
          aria-label={triggerLabel}
          onClick={() => setOpen(true)}
          className={`cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent ${accentRing[accent]} ${triggerClassName}`}
        >
          {trigger}
        </button>
      )}
      <dialog
        ref={ref}
        aria-labelledby={titleId}
        onClose={() => setOpen(false)}
        onClick={(e) => {
          if (e.target === e.currentTarget) setOpen(false);
        }}
        className={`m-auto max-h-[min(88dvh,46rem)] w-[calc(100%-2rem)] ${
          size === "lg" ? "max-w-3xl" : "max-w-xl"
        } overflow-hidden rounded-xl border border-black/10 bg-[#fbf9f4] p-0 text-neutral-950 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.6)] backdrop:bg-black/55 backdrop:backdrop-blur-[3px] open:animate-[dialog-in_220ms_cubic-bezier(0.21,0.47,0.32,0.98)] dark:border-white/12 dark:bg-[#0c0c0d] dark:text-white`}
      >
        {open ? (
          <div className="relative flex max-h-[min(88dvh,46rem)] flex-col">
            <span
              aria-hidden
              className={`pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r ${accentTop[accent]} via-transparent to-transparent`}
            />
            <div className="flex items-start justify-between gap-4 border-b border-black/10 px-5 py-4 sm:px-6 dark:border-white/10">
              <div className="min-w-0">
                {eyebrow ? (
                  <p
                    className={`font-mono text-[11px] uppercase tracking-[0.18em] ${accentEyebrow[accent]}`}
                  >
                    {eyebrow}
                  </p>
                ) : null}
                <h2
                  id={titleId}
                  className="mt-1 text-xl font-semibold leading-tight tracking-tight sm:text-2xl"
                >
                  {title}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-md border border-black/10 text-neutral-600 transition hover:bg-black/5 hover:text-neutral-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:border-white/12 dark:text-neutral-300 dark:hover:bg-white/10 dark:hover:text-white"
              >
                <X size={16} />
              </button>
            </div>
            <div className="overflow-y-auto px-5 py-5 text-sm leading-relaxed text-neutral-700 sm:px-6 dark:text-neutral-300">
              {children}
            </div>
          </div>
        ) : null}
      </dialog>
    </>
  );
}
