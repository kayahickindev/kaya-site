"use client";

import Image from "next/image";
import { MotionConfig, motion } from "framer-motion";
import type { StoreShot } from "@/data/assets";

const ease = [0.21, 0.47, 0.32, 0.98] as [number, number, number, number];

// A product's App Store composites side by side at a readable size, the outer
// two set slightly lower so the row reads as a gentle arc. Phones scroll
// sideways on small screens and sit in one row from `sm` up. With reduced
// motion the rise is skipped and the fade stays (MotionConfig), with the same
// markup on the server and the client.
export function StoreShotRow({ shots }: { shots: StoreShot[] }) {
  const last = shots.length - 1;

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-[-6%] bg-[radial-gradient(ellipse_60%_55%_at_50%_50%,rgba(251,146,60,0.18),transparent_65%)] dark:bg-[radial-gradient(ellipse_60%_55%_at_50%_50%,rgba(251,146,60,0.14),transparent_65%)]"
        />
        <div className="relative flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:mx-auto sm:grid sm:max-w-[820px] sm:grid-cols-4 sm:gap-4 sm:overflow-visible sm:px-6 sm:pb-6 md:px-0">
          {shots.map((shot, index) => (
            <motion.div
              key={shot.src}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 + index * 0.07, ease }}
              className={`w-[44%] shrink-0 snap-start sm:w-auto ${
                index === 0 || index === last ? "sm:mt-6" : ""
              }`}
            >
              <Image
                src={shot.src}
                alt={shot.alt}
                width={shot.width}
                height={shot.height}
                unoptimized
                className="block h-auto w-full rounded-xl ring-1 ring-black/10 drop-shadow-[0_24px_40px_rgba(0,0,0,0.35)] transition duration-500 group-hover:-translate-y-1 dark:ring-white/10"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </MotionConfig>
  );
}
