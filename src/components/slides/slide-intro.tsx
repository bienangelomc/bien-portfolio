"use client";

import { motion } from "framer-motion";
import { ArrowDown, Mail } from "lucide-react";

interface SlideProps {
  isActive: boolean;
  onNavigate: (slide: number) => void;
}

export default function SlideIntro({ isActive, onNavigate }: SlideProps) {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br from-zinc-50 to-zinc-100 p-6 dark:from-zinc-900 dark:to-zinc-950">
      {/* Background accent */}
      <div
        className="absolute right-[-10%] top-[-10%] h-48 w-48 rounded-full bg-accent/10 blur-3xl"
        aria-hidden="true"
      />

      <motion.div
        className="relative z-10 flex w-full max-w-xl items-center gap-6 md:gap-8"
        initial={{ opacity: 0, y: 20 }}
        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Text — left side */}
        <div className="flex-1 text-left">
          <p className="text-sm font-medium text-accent md:text-base">Hi, I'm</p>
          <h1 className="mt-1 font-display text-2xl font-medium leading-tight tracking-tight md:text-3xl">
            Bien Casimiro
          </h1>
          <p className="mt-2 text-sm text-muted-foreground md:text-base">
            Web & Mobile App Developer
          </p>
          <p className="mt-4 max-w-sm text-xs leading-relaxed text-muted-foreground/80 md:text-sm">
            I build websites and apps for real businesses and real users — from
            local service businesses to health and accessibility tools.
          </p>

          {/* CTAs */}
          <div className="mt-5 flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate(3)}
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-xs font-medium text-background transition-colors hover:bg-accent"
            >
              See my work
              <ArrowDown size={13} className="-rotate-90" />
            </button>
            <button
              onClick={() => onNavigate(8)}
              className="inline-flex items-center gap-2 rounded-full border border-border/60 px-4 py-2 text-xs font-medium transition-colors hover:border-accent/50 hover:bg-accent/5 hover:text-accent"
            >
              Contact
              <Mail size={13} />
            </button>
          </div>
        </div>

        {/* Portrait — right side */}
        <div className="relative shrink-0">
          <motion.div
            className="absolute inset-0 rounded-full bg-accent/30 blur-xl"
            animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.7, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <img
            src="/bien-portrait.png"
            alt="Bien Casimiro"
            className="relative h-24 w-24 rounded-full object-cover ring-2 ring-white/10 md:h-28 md:w-28"
          />
        </div>
      </motion.div>
    </div>
  );
}
