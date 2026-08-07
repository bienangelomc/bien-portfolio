"use client";

import { motion } from "framer-motion";

interface SlideProps {
  isActive: boolean;
}

export default function SlideAbout({ isActive }: SlideProps) {
  return (
    <div className="flex h-full w-full items-center justify-center overflow-y-auto bg-white p-2 sm:p-4 md:p-8 dark:bg-zinc-950">
      <motion.div
        className="max-w-md"
        initial={{ opacity: 0, y: 8 }}
        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="text-[8px] font-medium uppercase tracking-[0.18em] text-accent sm:text-[10px] md:text-xs">
          About
        </p>
        <h2 className="mt-0.5 font-display text-base font-medium leading-tight tracking-tight sm:text-lg md:text-2xl lg:text-3xl">
          Design and build,
          <br />
          in one pair of hands.
        </h2>
        <div className="mt-2 space-y-1.5 text-[9px] leading-relaxed text-muted-foreground sm:mt-3 sm:space-y-2 sm:text-[11px] md:mt-5 md:space-y-3 md:text-sm">
          <p>
            I'm a developer who works end-to-end — from the first sketch to the
            live site. I started building landing pages for local businesses,
            and over time that grew into full websites, web apps, and mobile
            apps.
          </p>
          <p>
            What I care about: sites that load fast, read clearly, and
            actually convert for the business paying for them.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
