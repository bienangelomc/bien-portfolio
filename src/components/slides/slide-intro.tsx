"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail, Zap } from "lucide-react";

interface SlideProps {
  isActive: boolean;
  onNavigate: (slide: number) => void;
}

export default function SlideIntro({ isActive, onNavigate }: SlideProps) {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-950 to-black p-1.5 sm:p-3 md:p-6">
      {/* Tech grid background */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(74, 222, 128, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(74, 222, 128, 0.5) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
        aria-hidden="true"
      />

      {/* Glowing orbs */}
      <motion.div
        className="absolute -left-10 top-1/4 h-24 w-24 rounded-full bg-accent/20 blur-3xl sm:h-40 sm:w-40 md:h-56 md:w-56"
        animate={{ x: [0, 10, 0], y: [0, -8, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute -right-8 bottom-1/4 h-20 w-20 rounded-full bg-sky-500/15 blur-3xl sm:h-32 sm:w-32 md:h-48 md:w-48"
        animate={{ x: [0, -12, 0], y: [0, 10, 0] }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        aria-hidden="true"
      />

      <motion.div
        className="relative z-10 flex w-full h-full max-w-full flex-row items-center gap-0 text-left sm:gap-2 md:gap-6"
        initial={{ opacity: 0, y: 8 }}
        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Text — left side */}
        <div className="flex-1 min-w-0 flex flex-col justify-center">
          {/* Badge */}
          <motion.div
            className="mb-1 inline-flex w-fit items-center gap-1 rounded-full bg-accent/10 px-1.5 py-0.5 text-[5px] font-medium text-accent ring-1 ring-inset ring-accent/20 sm:mb-2 sm:gap-1.5 sm:px-2 sm:py-1 sm:text-[8px] md:mb-3 md:px-2.5 md:text-xs"
            initial={{ opacity: 0, y: -6 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: -6 }}
            transition={{ duration: 0.4, delay: 0.05 }}
          >
            <Zap size={7} className="sm:w-[9px] sm:h-[9px] md:w-3 md:h-3" />
            Funnel Builder & Web Developer
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="font-display text-[12px] font-medium leading-tight tracking-tight sm:text-lg md:text-3xl lg:text-4xl"
            initial={{ opacity: 0, x: -10 }}
            animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            I build funnels
            <br />
            <span className="text-accent">that convert.</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            className="mt-1 max-w-none text-[7px] leading-relaxed text-muted-foreground/80 sm:max-w-sm sm:text-[9px] md:mt-2 md:text-sm"
            initial={{ opacity: 0, x: -6 }}
            animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -6 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            Done-for-you Systeme.io sales funnels and custom websites that turn
            visitors into customers. Fast delivery, clean design, real results.
          </motion.p>

          {/* Stats row */}
          <motion.div
            className="mt-1.5 grid grid-cols-3 gap-1 sm:mt-3 sm:gap-2 md:mt-4 md:gap-4"
            initial={{ opacity: 0, y: 6 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <div>
              <p className="font-display text-[9px] font-bold text-foreground sm:text-[11px] md:text-lg">
                2+
              </p>
              <p className="text-[6px] text-muted-foreground sm:text-[8px] md:text-xs">
                Years exp.
              </p>
            </div>
            <div>
              <p className="font-display text-[9px] font-bold text-foreground sm:text-[11px] md:text-lg">
                20+
              </p>
              <p className="text-[6px] text-muted-foreground sm:text-[8px] md:text-xs">
                Funnels built
              </p>
            </div>
            <div>
              <p className="font-display text-[9px] font-bold text-foreground sm:text-[11px] md:text-lg">
                100%
              </p>
              <p className="text-[6px] text-muted-foreground sm:text-[8px] md:text-xs">
                Satisfaction
              </p>
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            className="mt-1.5 flex flex-wrap gap-1 sm:gap-2 md:mt-4 md:gap-3"
            initial={{ opacity: 0, y: 6 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            <button
              onClick={() => onNavigate(2)}
              className="group inline-flex items-center gap-1 rounded-full bg-accent px-2 py-0.5 text-[7px] font-medium text-zinc-950 transition-all hover:bg-accent/90 hover:shadow-[0_0_16px_rgba(74,222,128,0.4)] sm:px-2.5 sm:py-1 sm:text-[9px] md:px-5 md:py-2 md:text-sm"
            >
              See my work
              <ArrowRight
                size={7}
                className="transition-transform group-hover:translate-x-0.5 sm:size-[9px] md:size-4"
              />
            </button>
            <button
              onClick={() => onNavigate(8)}
              className="inline-flex items-center gap-1 rounded-full border border-border/60 px-2 py-0.5 text-[7px] font-medium transition-colors hover:border-accent/50 hover:bg-accent/10 hover:text-accent sm:px-2.5 sm:py-1 sm:text-[9px] md:px-5 md:py-2 md:text-sm"
            >
              Get a quote
              <Mail size={7} className="sm:size-[9px] md:size-4" />
            </button>
          </motion.div>
        </div>

        {/* Portrait — right side, big with animations */}
        <div className="relative shrink-0 flex-[0 0 42%] sm:flex-[0 0 44%] md:flex-[0 0 45%] h-full flex items-center justify-center overflow-hidden">
          {/* Glow rings */}
          <motion.div
            className="absolute h-[95%] w-[95%] rounded-full bg-accent/25 blur-md sm:blur-lg md:blur-xl"
            animate={{
              scale: [1, 1.08, 1],
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute h-[88%] w-[88%] rounded-full border border-accent/25"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute -top-0.5 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-accent shadow-[0_0_10px_3px_rgba(74,222,128,0.7)]" />
          </motion.div>
          <motion.div
            className="absolute h-[76%] w-[76%] rounded-full border border-accent/15"
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute bottom-1 left-0 h-1 w-1 rounded-full bg-sky-400/70 shadow-[0_0_8px_2px_rgba(56,189,248,0.5)]" />
          </motion.div>

          {/* Portrait image with float */}
          <motion.div
            className="relative z-10 overflow-hidden rounded-full ring-2 ring-accent/30 ring-offset-2 ring-offset-zinc-950"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <img
              src="/bien-portrait.png"
              alt="Bien Casimiro"
              className="h-auto w-full rounded-full object-cover max-h-[90%] aspect-square"
            />
            {/* Scan line effect */}
            <motion.div
              className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-accent/15 to-transparent"
              animate={{ y: ["-100%", "100%"] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
            />
            {/* Bottom glow reflection */}
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-accent/25 to-transparent" />
          </motion.div>

          {/* Floating tech badges */}
          <motion.div
            className="absolute top-[12%] right-[0%] z-20 rounded-full bg-zinc-900/90 px-1.5 py-0.5 text-[5px] font-medium text-accent ring-1 ring-accent/40 backdrop-blur shadow-lg sm:text-[8px] md:px-2 md:py-1 md:text-xs"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
          >
            ◆ Systeme.io
          </motion.div>
          <motion.div
            className="absolute bottom-[28%] left-[-4%] z-20 rounded-full bg-zinc-900/90 px-1.5 py-0.5 text-[5px] font-medium text-sky-400 ring-1 ring-sky-400/40 backdrop-blur shadow-lg sm:text-[8px] md:px-2 md:py-1 md:text-xs"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
          >
            ◆ Funnel Builder
          </motion.div>
          <motion.div
            className="absolute top-[50%] left-[-6%] z-20 rounded-full bg-zinc-900/90 px-1.5 py-0.5 text-[5px] font-medium text-purple-400 ring-1 ring-purple-400/40 backdrop-blur shadow-lg sm:text-[8px] md:px-2 md:py-1 md:text-xs"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
          >
            ◆ Next.js
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
