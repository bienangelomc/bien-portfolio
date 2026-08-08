"use client";

import { motion } from "framer-motion";

interface SlideProps {
  isActive: boolean;
}

export default function SlideAbout({ isActive }: SlideProps) {
  return (
    <div className="flex h-full w-full items-center justify-center overflow-hidden bg-zinc-950 p-1.5 sm:p-3 md:p-6">
      <motion.div
        className="w-full max-w-full flex flex-col items-center gap-2 md:flex-row md:max-w-none md:gap-5"
        initial={{ opacity: 0, y: 6 }}
        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Photo — left on desktop, top on mobile */}
        <div className="relative flex-shrink-0 md:w-[42%] md:max-w-[220px]">
          <div className="relative overflow-hidden rounded-lg ring-1 ring-white/10">
            <img
              src="/bien-about.jpg"
              alt="Bien Casimiro"
              className="h-16 w-full object-cover object-top md:h-auto md:min-h-[260px] md:w-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent" />
          </div>
          {/* Accent corner accents */}
          <div className="absolute -left-1 -top-1 h-2 w-2 border-l border-t border-accent/40" />
          <div className="absolute -right-1 -bottom-1 h-2 w-2 border-r border-b border-accent/40" />
        </div>

        {/* Text content */}
        <div className="flex-1 text-center md:text-left">
          <p className="text-[6px] font-medium uppercase tracking-[0.2em] text-accent sm:text-[9px] md:text-xs">
            About
          </p>
          <h2 className="mt-0.5 font-display text-[10px] font-medium leading-tight tracking-tight sm:text-base md:text-2xl">
            Bien Casimiro
            <br />
            <span className="text-muted-foreground text-[8px] sm:text-sm md:text-lg">Funnel Builder &amp; Web Developer</span>
          </h2>
          <div className="mt-1 space-y-1 text-[6px] leading-relaxed text-muted-foreground sm:mt-2 sm:space-y-1.5 sm:text-[9px] md:mt-4 md:space-y-3 md:text-sm">
            <p>
              I'm <strong className="text-foreground">Bien Casimiro</strong>, a
              funnel builder and web developer based in the Philippines. I
              specialize in building sales funnels on Systeme.io and custom
              websites that convert visitors into customers.
            </p>
            <p>
              I started out building simple landing pages, and over time that
              grew into full sales funnels, email automations, e-commerce
              stores, and custom web apps for clients.
            </p>
            <p>
              What I care about: funnels that make money. I don't build pretty
              pages that don't work — I build systems that get you leads and
              sales. Fast delivery, clean design, real results.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}