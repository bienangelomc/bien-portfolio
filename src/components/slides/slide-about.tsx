"use client";

import { motion } from "framer-motion";

interface SlideProps {
  isActive: boolean;
}

export default function SlideAbout({ isActive }: SlideProps) {
  return (
    <div className="flex h-full w-full items-center justify-center overflow-y-auto bg-white p-3 sm:p-5 md:p-8 dark:bg-zinc-950">
      <motion.div
        className="max-w-md"
        initial={{ opacity: 0, y: 12 }}
        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-accent sm:text-[10px] md:text-xs">
          About
        </p>
        <h2 className="mt-1 font-display text-lg font-medium leading-tight tracking-tight sm:text-xl md:text-2xl lg:text-3xl">
          Design and build,
          <br />
          in one pair of hands.
        </h2>
        <div className="mt-3 space-y-2.5 text-[11px] leading-relaxed text-muted-foreground sm:mt-4 sm:space-y-3 sm:text-xs md:mt-5 md:text-sm">
          <p>
            I'm a developer who works end-to-end — from the first sketch to the
            live site. I started out building landing pages for local
            businesses, and over time that grew into full websites, web apps,
            and mobile apps for startups and growing teams.
          </p>
          <p>
            What I care about: sites that load fast, read clearly, and
            actually convert for the business paying for them. I'd rather ship
            one thing that works than ten things that don't.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
