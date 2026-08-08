"use client";

import { motion } from "framer-motion";

interface SlideProps {
  isActive: boolean;
}

export default function SlideAbout({ isActive }: SlideProps) {
  return (
    <div className="flex h-full w-full items-center justify-center overflow-hidden bg-zinc-950 p-1.5 sm:p-3 md:p-6">
      <motion.div
        className="max-w-md w-full"
        initial={{ opacity: 0, y: 6 }}
        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="text-[6px] font-medium uppercase tracking-[0.2em] text-accent sm:text-[9px] md:text-xs">
          About
        </p>
        <h2 className="mt-0.5 font-display text-[10px] font-medium leading-tight tracking-tight sm:text-base md:text-2xl">
          Bien Casimiro
          <br />
          <span className="text-muted-foreground text-[8px] sm:text-sm md:text-lg">Funnel Builder &amp; Web Developer</span>
        </h2>
        <div className="mt-1 space-y-1 text-[6px] leading-relaxed text-muted-foreground sm:mt-3 sm:space-y-2 sm:text-[9px] md:mt-5 md:space-y-3 md:text-sm">
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
      </motion.div>
    </div>
  );
}
