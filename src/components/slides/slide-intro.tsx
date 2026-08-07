"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";

interface SlideProps {
  isActive: boolean;
  onNavigate: (slide: number) => void;
}

export default function SlideIntro({ isActive, onNavigate }: SlideProps) {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br from-zinc-50 to-zinc-100 p-2 sm:p-4 md:p-6 dark:from-zinc-900 dark:to-zinc-950">
      {/* Background accent */}
      <div
        className="absolute right-[-10%] top-[-10%] h-24 w-24 rounded-full bg-accent/10 blur-xl sm:h-32 sm:w-32 sm:blur-2xl md:h-48 md:w-48 md:blur-3xl"
        aria-hidden="true"
      />

      <motion.div
        className="relative z-10 flex w-full max-w-xl flex-col items-center gap-2 text-center sm:flex-row sm:items-center sm:gap-4 sm:text-left md:gap-8"
        initial={{ opacity: 0, y: 8 }}
        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Text — left side */}
        <div className="flex-1 min-w-0 order-2 sm:order-1">
          <p className="text-[8px] font-medium text-accent sm:text-[10px] md:text-sm">Hi, I'm</p>
          <h1 className="mt-0.5 font-display text-base font-medium leading-tight tracking-tight sm:text-lg md:text-2xl lg:text-3xl">
            Bien Casimiro
          </h1>
          <p className="mt-0.5 text-[8px] text-muted-foreground sm:text-[10px] md:text-sm">
            Web &amp; Mobile App Developer
          </p>
          <p className="mt-1.5 max-w-none text-[8px] leading-relaxed text-muted-foreground/80 sm:max-w-sm sm:text-[10px] md:text-xs">
            I build websites and apps for real businesses and real users.
          </p>

          {/* CTAs */}
          <div className="mt-2 flex flex-wrap justify-center gap-1.5 sm:justify-start sm:gap-2 md:gap-3">
            <button
              onClick={() => onNavigate(3)}
              className="inline-flex items-center gap-1 rounded-full bg-foreground px-2.5 py-1 text-[8px] font-medium text-background transition-colors hover:bg-accent sm:px-3 sm:py-1.5 sm:text-[10px] md:px-4 md:py-2 md:text-xs"
            >
              See my work
              <ArrowRight size={9} className="sm:size-[11px] md:size-3" />
            </button>
            <button
              onClick={() => onNavigate(8)}
              className="inline-flex items-center gap-1 rounded-full border border-border/60 px-2.5 py-1 text-[8px] font-medium transition-colors hover:border-accent/50 hover:bg-accent/5 hover:text-accent sm:px-3 sm:py-1.5 sm:text-[10px] md:px-4 md:py-2 md:text-xs"
            >
              Contact
              <Mail size={9} className="sm:size-[11px] md:size-3" />
            </button>
          </div>
        </div>

        {/* Portrait — right side */}
        <div className="relative shrink-0 order-1 sm:order-2">
          <motion.div
            className="absolute inset-0 rounded-full bg-accent/30 blur-md sm:blur-lg md:blur-xl"
            animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.7, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <img
            src="/bien-portrait.png"
            alt="Bien Casimiro"
            className="relative h-12 w-12 rounded-full object-cover ring-1 ring-white/10 sm:h-16 sm:w-16 sm:ring-2 md:h-24 md:w-24 lg:h-28 lg:w-28"
          />
        </div>
      </motion.div>
    </div>
  );
}
