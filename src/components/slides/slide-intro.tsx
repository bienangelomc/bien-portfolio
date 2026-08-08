"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail, Zap } from "lucide-react";

interface SlideProps {
  isActive: boolean;
  onNavigate: (slide: number) => void;
}

const skills = [
  { name: "Systeme.io", color: "text-accent" },
  { name: "Next.js", color: "text-sky-400" },
  { name: "React", color: "text-cyan-400" },
  { name: "HTML/CSS", color: "text-orange-400" },
  { name: "JavaScript", color: "text-yellow-400" },
  { name: "TypeScript", color: "text-blue-400" },
  { name: "Canva", color: "text-cyan-300" },
  { name: "Photoshop", color: "text-blue-300" },
  { name: "AI Tools", color: "text-violet-400" },
  { name: "Google Sheets", color: "text-green-400" },
  { name: "Excel", color: "text-emerald-400" },
  { name: "Microsoft", color: "text-sky-500" },
];

export default function SlideIntro({ isActive, onNavigate }: SlideProps) {
  return (
    <div className="relative flex h-full w-full flex-col justify-center overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-950 to-black p-3 sm:p-2 md:p-4 lg:p-5">
      {/* Tech grid background */}
      <div
        className="absolute inset-0 opacity-[0.06]"
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
        className="absolute -left-4 top-1/4 h-12 w-12 rounded-full bg-accent/15 blur-xl sm:h-10 sm:w-10 md:h-40 md:w-40"
        animate={{ x: [0, 8, 0], y: [0, -6, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute -right-2 bottom-1/5 h-10 w-10 rounded-full bg-sky-500/10 blur-xl sm:h-8 sm:w-8 md:h-32 md:w-32"
        animate={{ x: [0, -10, 0], y: [0, 8, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        aria-hidden="true"
      />

      {/* Main content — flex column, centered */}
      <div className="relative z-10 flex w-full flex-col items-center justify-center gap-2 text-center sm:text-left sm:items-start sm:gap-1.5 md:gap-3">
        {/* Top: badge + portrait */}
        <div className="flex w-full flex-col items-center gap-3 sm:flex-row sm:gap-2 md:gap-4">
          {/* Portrait — top on mobile, right on desktop */}
          <div className="relative shrink-0 flex h-20 w-20 items-center justify-center sm:h-auto sm:w-auto sm:flex-[0_0_28%] md:flex-[0_0_42%] lg:flex-[0_0_44%]">
            {/* Glow pulse */}
            <motion.div
              className="absolute h-[85%] w-[85%] rounded-full bg-accent/20 blur-md sm:blur-lg md:blur-xl"
              animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Rotating ring 1 */}
            <motion.div
              className="absolute h-[78%] w-[78%] rounded-full border border-accent/25"
              animate={{ rotate: 360 }}
              transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            >
              <div className="absolute -top-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-accent shadow-[0_0_8px_2px_rgba(74,222,128,0.6)]" />
            </motion.div>
            {/* Rotating ring 2 */}
            <motion.div
              className="absolute h-[65%] w-[65%] rounded-full border border-accent/15"
              animate={{ rotate: -360 }}
              transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
            >
              <div className="absolute bottom-1 left-0 h-0.5 w-0.5 rounded-full bg-sky-400/60" />
            </motion.div>

            {/* Portrait image */}
            <motion.div
              className="relative z-10 h-14 w-14 overflow-hidden rounded-full ring-2 ring-accent/30 ring-offset-2 ring-offset-zinc-950 sm:h-auto sm:w-[72%] md:w-[72%]"
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <img
                src="/bien-portrait.png"
                alt="Bien Casimiro"
                className="h-full w-full rounded-full object-cover aspect-square"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-accent/20 to-transparent" />
            </motion.div>
          </div>

          {/* Text section */}
          <div className="flex-1 min-w-0 flex flex-col items-center sm:items-start justify-center">
            {/* Badge */}
            <motion.div
              className="mb-1.5 inline-flex w-fit items-center gap-1 rounded-full bg-accent/10 px-2 py-1 text-[10px] font-medium text-accent ring-1 ring-inset ring-accent/20 sm:mb-1 sm:gap-1 sm:px-1.5 sm:py-0.5 sm:text-[7px] md:mb-2 md:px-2 md:py-1 md:text-xs"
              initial={{ opacity: 0, y: -4 }}
              animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: -4 }}
              transition={{ duration: 0.4, delay: 0.05 }}
            >
              <Zap size={10} className="sm:w-[8px] sm:h-[8px] md:w-3 md:h-3" />
              Funnel Builder
            </motion.div>

            {/* Headline */}
            <motion.h1
              className="font-display text-lg font-medium leading-tight tracking-tight sm:text-sm md:text-2xl lg:text-3xl"
              initial={{ opacity: 0, x: -8 }}
              animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              I build funnels
              <br />
              <span className="text-accent">that convert.</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              className="mt-1.5 max-w-none text-[11px] leading-relaxed text-muted-foreground/80 sm:max-w-xs sm:text-[8px] md:mt-1.5 md:text-xs lg:text-sm"
              initial={{ opacity: 0, x: -4 }}
              animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -4 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              Done-for-you Systeme.io funnels &amp; custom websites.
            </motion.p>

            {/* Stats row */}
            <motion.div
              className="mt-2 grid grid-cols-3 gap-2 sm:mt-2 sm:gap-2 md:mt-3 md:gap-3"
              initial={{ opacity: 0, y: 4 }}
              animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <div className="text-center sm:text-left">
                <p className="font-display text-base font-bold text-foreground sm:text-[10px] md:text-base lg:text-lg">
                  2+
                </p>
                <p className="text-[10px] text-muted-foreground sm:text-[7px] md:text-[10px] lg:text-xs">
                  Years exp.
                </p>
              </div>
              <div className="text-center sm:text-left">
                <p className="font-display text-base font-bold text-foreground sm:text-[10px] md:text-base lg:text-lg">
                  20+
                </p>
                <p className="text-[10px] text-muted-foreground sm:text-[7px] md:text-[10px] lg:text-xs">
                  Funnels
                </p>
              </div>
              <div className="text-center sm:text-left">
                <p className="font-display text-base font-bold text-foreground sm:text-[10px] md:text-base lg:text-lg">
                  100%
                </p>
                <p className="text-[10px] text-muted-foreground sm:text-[7px] md:text-[10px] lg:text-xs">
                  Satisfied
                </p>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              className="mt-2.5 flex flex-wrap gap-2 sm:mt-2 sm:gap-2 md:mt-3 md:gap-2"
              initial={{ opacity: 0, y: 4 }}
              animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              <button
                onClick={() => onNavigate(3)}
                className="group inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1.5 text-[11px] font-medium text-zinc-950 transition-all hover:bg-accent/90 hover:shadow-[0_0_12px_rgba(74,222,128,0.4)] sm:px-2 sm:py-0.5 sm:text-[8px] md:px-4 md:py-1.5 md:text-sm"
              >
                See work
                <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5 sm:size-[7px] md:size-3" />
              </button>
              <button
                onClick={() => onNavigate(9)}
                className="inline-flex items-center gap-1 rounded-full border border-border/60 px-3 py-1.5 text-[11px] font-medium transition-colors hover:border-accent/50 hover:bg-accent/10 hover:text-accent sm:px-2 sm:py-0.5 sm:text-[8px] md:px-4 md:py-1.5 md:text-sm"
              >
                Quote
                <Mail size={12} className="sm:size-[7px] md:size-3" />
              </button>
            </motion.div>
          </div>
        </div>

        {/* Skills row at bottom */}
        <motion.div
          className="mt-1 w-full border-t border-white/5 pt-2 sm:mt-0.5 sm:pt-0.5 md:mt-3 md:pt-3"
          initial={{ opacity: 0, y: 6 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
          transition={{ duration: 0.4, delay: 0.6 }}
        >
          <p className="mb-1.5 text-center text-[9px] font-medium uppercase tracking-[0.15em] text-muted-foreground/60 sm:mb-0.5 sm:text-left sm:text-[7px] md:mb-1.5 md:text-[10px]">
            Tools I work with
          </p>
          <div className="flex flex-wrap justify-center gap-1 sm:justify-start sm:gap-0.5 md:gap-1.5">
            {skills.map((skill, i) => (
              <motion.span
                key={skill.name}
                className={`rounded-full bg-white/[0.03] px-2 py-0.5 text-[9px] font-medium ring-1 ring-white/5 ${skill.color} sm:px-1 sm:py-0.5 sm:text-[7px] md:px-2 md:py-1 md:text-xs`}
                initial={{ opacity: 0, y: 4 }}
                animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
                transition={{ duration: 0.3, delay: 0.6 + i * 0.03 }}
              >
                {skill.name}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
