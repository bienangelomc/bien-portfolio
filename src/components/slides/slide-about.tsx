"use client";

import { motion } from "framer-motion";

interface SlideProps {
  isActive: boolean;
}

export default function SlideAbout({ isActive }: SlideProps) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-white p-8 dark:bg-zinc-950">
      <motion.div
        className="max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
          About
        </p>
        <h2 className="mt-3 font-display text-3xl font-medium leading-tight tracking-tight md:text-4xl">
          Design and build,
          <br />
          in one pair of hands.
        </h2>
        <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground md:text-[15px]">
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
