"use client";

import { motion } from "framer-motion";
import { ArrowDown, Mail } from "lucide-react";

interface SlideProps {
  isActive: boolean;
  onNavigate: (slide: number) => void;
}

export default function SlideIntro({ isActive, onNavigate }: SlideProps) {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br from-zinc-50 to-zinc-100 p-3 sm:p-5 md:p-6 dark:from-zinc-900 dark:to-zinc-950">
      {/* Background accent */}
      <div
        className="absolute right-[-10%] top-[-10%] h-32 w-32 rounded-full bg-accent/10 blur-2xl sm:h-48 sm:w-48 sm:blur-3xl"
        aria-hidden="true"
      />

      <motion.div
        className="relative z-10 flex w-full max-w-xl flex-col-reverse items-center gap-3 text-center sm:flex-row sm:items-center sm:gap-5 sm:text-left md:gap-8"
        initial={{ opacity: 0, y: 16 }}
        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Text — left side */}
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-medium text-accent sm:text-xs md:text-sm">Hi, I'm</p>
          <h1 className="mt-0.5 font-display text-lg font-medium leading-tight tracking-tight sm:text-xl md:text-2xl lg:text-3xl">
            Bien Casimiro
          </h1>
          <p className="mt-1 text-[10px] text-muted-foreground sm:text-xs md:text-sm">
            Web &amp; Mobile App Developer
          </p>
          <p className="mt-2 max-w-none text-[9px] leading-relaxed text-muted-foreground/80 sm:max-w-sm sm:text-[11px md:text-xs">
            I build websites and apps for real businesses and real users — from
            local service businesses to health and accessibility tools.
          </p>

          {/* CTAs */}
          <div className="mt-3 flex flex-wrap justify-center gap-2 sm:justify-start sm:gap-3">
            <button
              onClick={() => onNavigate(3)}
              className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-3 py-1.5 text-[10px] font-medium text-background transition-colors hover:bg-accent sm:px-4 sm:py-2 sm:text-xs"
            >
              See my work
              <ArrowDown size={11} className="-rotate-90 sm:size-3" />
            </button>
            <button
              onClick={() => onNavigate(8)}
              className="inline-flex items-center gap-1.5 rounded-full border border-border/60 px-3 py-1.5 text-[10px] font-medium transition-colors hover:border-accent/50 hover:bg-accent/5 hover:text-accent sm:px-4 sm:py-2 sm:text-xs"
            >
              Contact
              <Mail size={11} className="sm:size-3" />
            </button>
          </div>
        </div>

        {/* Portrait — right side */}
        <div className="relative shrink-0">
          <motion.div
            className="absolute inset-0 rounded-full bg-accent/30 blur-lg sm:blur-xl"
            animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.7, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <img
            src="/bien-portrait.png"
            alt="Bien Casimiro"
            className="relative h-16 w-16 rounded-full object-cover ring-2 ring-white/10 sm:h-20 sm:w-20 md:h-24 md:w-24 lg:h-28 lg:w-28"
          />
        </div>
      </motion.div>
    </div>
  );
}
