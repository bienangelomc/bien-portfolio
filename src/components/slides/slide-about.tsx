"use client";

import { motion } from "framer-motion";

interface SlideProps {
  isActive: boolean;
}

export default function SlideAbout({ isActive }: SlideProps) {
  return (
    <div className="flex h-full w-full items-start justify-start overflow-y-auto bg-zinc-950 p-3 sm:p-4 md:p-8 sm:items-center sm:justify-center">
      <motion.div
        className="max-w-md"
        initial={{ opacity: 0, y: 6 }}
        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="text-[7px] font-medium uppercase tracking-[0.18em] text-accent sm:text-[10px] md:text-xs">
          About
        </p>
        <h2 className="mt-px font-display text-sm font-medium leading-tight tracking-tight sm:text-base md:text-2xl lg:text-3xl">
          Bien Casimiro
          <br />
          <span className="text-muted-foreground">Full stack developer</span>
        </h2>
        <div className="mt-1.5 space-y-1 text-[7px] leading-relaxed text-muted-foreground sm:mt-3 sm:space-y-2 sm:text-[10px] md:mt-5 md:space-y-3 md:text-sm">
          <p>
            I'm <strong className="text-foreground">Bien Casimiro</strong>, a full
            stack web and mobile app developer based in the Philippines. I work
            end-to-end — from the first sketch to the live site.
          </p>
          <p>
            I started building landing pages for local businesses, and over
            time that grew into full websites, web applications, and mobile
            apps for startups and growing teams.
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
