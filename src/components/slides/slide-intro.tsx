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
    <div className="relative flex h-full w-full flex-col justify-center overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-950 to-black p-1.5 sm:p-2 md:p-5 lg:p-6">
      {/* Tech grid background */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255, 107, 53, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 107, 53, 0.5) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
        aria-hidden="true"
      />

      {/* Glowing orbs */}
      <motion.div
        className="absolute -left-4 top-1/4 h-12 w-12 rounded-full bg-accent/15 blur-xl md:h-32 md:w-32"
        animate={{ x: [0, 8, 0], y: [0, -6, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute -right-2 bottom-1/5 h-10 w-10 rounded-full bg-sky-500/10 blur-xl md:h-28 md:w-28"
        animate={{ x: [0, -10, 0], y: [0, 8, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        aria-hidden="true"
      />

      {/* Main content */}
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-start gap-1 pt-1 text-center md:flex-row md:items-center md:justify-between md:gap-5 md:text-left">
        {/* Left column — portrait with name below (desktop), stacked (mobile) */}
        <div className="relative flex flex-col items-center justify-center gap-1 md:flex md:flex-[0_0_44%] md:flex-col md:items-center md:justify-center md:gap-2">
          {/* Portrait with rings */}
          <div className="relative flex h-16 w-16 items-center justify-center md:h-auto md:w-full md:max-w-[220px]">
            {/* Glow pulse */}
            <motion.div
              className="absolute h-[85%] w-[85%] rounded-full bg-accent/20 blur-md md:h-[85%] md:w-[85%] md:blur-xl"
              animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Rotating ring 1 */}
            <motion.div
              className="absolute h-[80%] w-[80%] rounded-full border border-accent/25 md:h-[80%] md:w-[80%]"
              animate={{ rotate: 360 }}
              transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            >
              <div className="absolute -top-0.5 left-1/2 h-0.5 w-0.5 -translate-x-1/2 rounded-full bg-accent shadow-[0_0_6px_2px_rgba(255,107,53,0.6)] md:h-1 md:w-1 md:shadow-[0_0_10px_3px_rgba(255,107,53,0.7)]" />
            </motion.div>
            {/* Rotating ring 2 */}
            <motion.div
              className="absolute h-[65%] w-[65%] rounded-full border border-accent/15 md:h-[65%] md:w-[65%]"
              animate={{ rotate: -360 }}
              transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
            >
              <div className="absolute bottom-1 left-0 h-0.5 w-0.5 rounded-full bg-sky-400/60" />
            </motion.div>

            {/* Portrait image */}
            <motion.div
              className="relative z-10 h-14 w-14 overflow-hidden rounded-full ring-1.5 ring-accent/30 ring-offset-1 ring-offset-zinc-950 md:h-auto md:w-[75%]"
              animate={{ y: [0, -1.5, 0] }}
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

          {/* Name — below the picture */}
          <motion.h2
            className="font-display text-base font-bold tracking-tight text-foreground md:text-2xl lg:text-3xl"
            initial={{ opacity: 0, y: 4 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            BIEN CASIMIRO
          </motion.h2>

          {/* Badge — below name */}
          <motion.div
            className="inline-flex w-fit items-center gap-1 rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-medium text-accent ring-1 ring-inset ring-accent/20 md:px-3 md:py-1 md:text-sm"
            initial={{ opacity: 0, y: -4 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: -4 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <Zap size={9} className="md:size-3.5" />
            Funnel Builder
          </motion.div>
        </div>

        {/* Right column — text content (desktop), all together below on mobile */}
        <div className="flex w-full flex-col items-center gap-1 md:flex-[1_1_56%] md:items-start md:gap-2">
          {/* Headline */}
          <motion.h1
            className="font-display text-[13px] font-medium leading-tight tracking-tight md:text-2xl lg:text-3xl"
            initial={{ opacity: 0, x: -6 }}
            animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -6 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            I build funnels that convert.
          </motion.h1>

          {/* Description */}
          <motion.p
            className="max-w-none text-[9px] leading-relaxed text-muted-foreground/80 md:mt-0.5 md:max-w-md md:text-base"
            initial={{ opacity: 0, x: -4 }}
            animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -4 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            Done-for-you Systeme.io funnels &amp; custom websites.
          </motion.p>

          {/* Stats row */}
          <motion.div
            className="grid w-full max-w-[220px] grid-cols-3 gap-1.5 md:mt-1 md:max-w-sm md:gap-4"
            initial={{ opacity: 0, y: 3 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 3 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <div className="text-center md:text-left">
              <p className="font-display text-[13px] font-bold text-foreground md:text-3xl lg:text-4xl">
                2+
              </p>
              <p className="text-[8px] text-muted-foreground md:text-sm">
                Years exp.
              </p>
            </div>
            <div className="text-center md:text-left">
              <p className="font-display text-[13px] font-bold text-foreground md:text-3xl lg:text-4xl">
                20+
              </p>
              <p className="text-[8px] text-muted-foreground md:text-sm">
                Funnels
              </p>
            </div>
            <div className="text-center md:text-left">
              <p className="font-display text-[13px] font-bold text-foreground md:text-3xl lg:text-4xl">
                100%
              </p>
              <p className="text-[8px] text-muted-foreground md:text-sm">
                Satisfied
              </p>
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap justify-center gap-1 md:mt-1 md:justify-start md:gap-2"
            initial={{ opacity: 0, y: 3 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 3 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            <button
              onClick={() => onNavigate(3)}
              className="group inline-flex items-center gap-0.5 rounded-full bg-accent px-2 py-0.5 text-[9px] font-medium text-zinc-950 transition-all hover:bg-accent/90 hover:shadow-[0_0_12px_rgba(255,107,53,0.4)] md:px-5 md:py-2 md:text-base md:gap-1.5"
            >
              See work
              <ArrowRight size={8} className="transition-transform group-hover:translate-x-0.5 md:size-4" />
            </button>
            <button
              onClick={() => onNavigate(9)}
              className="inline-flex items-center gap-0.5 rounded-full border border-border/60 px-2 py-0.5 text-[9px] font-medium transition-colors hover:border-accent/50 hover:bg-accent/10 hover:text-accent md:px-5 md:py-2 md:text-base md:gap-1.5"
            >
              Quote
              <Mail size={8} className="md:size-4" />
            </button>
          </motion.div>

          {/* Skills row */}
          <motion.div
            className="w-full border-t border-white/5 pt-0.5 mt-0.5 md:mt-2 md:pt-2"
            initial={{ opacity: 0, y: 4 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
            transition={{ duration: 0.4, delay: 0.6 }}
          >
            <p className="mb-0.5 text-center text-[7px] font-medium uppercase tracking-[0.15em] text-muted-foreground/60 md:mb-1.5 md:text-left md:text-xs">
              Tools I work with
            </p>
            <div className="flex flex-wrap justify-center gap-0.5 md:justify-start md:gap-1.5">
              {skills.map((skill, i) => (
                <motion.span
                  key={skill.name}
                  className={`rounded-full bg-white/[0.03] px-1 py-[2px] text-[6.5px] font-medium ring-1 ring-white/5 ${skill.color} md:px-2.5 md:py-1 md:text-xs`}
                  initial={{ opacity: 0, y: 3 }}
                  animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 3 }}
                  transition={{ duration: 0.3, delay: 0.6 + i * 0.03 }}
                >
                  {skill.name}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}