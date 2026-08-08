"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  FileSpreadsheet,
  Database,
  Filter,
  Table2,
  TrendingUp,
  Code2,
  Bot,
} from "lucide-react";

interface SlideProps {
  isActive: boolean;
}

const excelSkills = [
  { name: "XLOOKUP", icon: Filter },
  { name: "VLOOKUP", icon: Filter },
  { name: "Pivot Tables", icon: Table2 },
  { name: "Conditional Formatting", icon: TrendingUp },
  { name: "Data Cleanup", icon: Database },
  { name: "Macros / VBA", icon: Code2 },
  { name: "Apps Script", icon: Bot },
  { name: "Google Sheets", icon: BarChart3 },
];

const highlights = [
  {
    icon: BarChart3,
    title: "Big Data Reports",
    desc: "Built reports from large datasets as a reports assistant on the data team.",
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
  },
  {
    icon: Filter,
    title: "Advanced Formulas",
    desc: "XLOOKUP, VLOOKUP, INDEX/MATCH, array formulas, nested logic, error handling.",
    color: "text-sky-400",
    bg: "bg-sky-400/10",
  },
  {
    icon: Code2,
    title: "Automation & Scripts",
    desc: "Macros, VBA, and Google Apps Script to automate repetitive tasks and workflows.",
    color: "text-violet-400",
    bg: "bg-violet-400/10",
  },
];

export default function SlideExcel({ isActive }: SlideProps) {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-zinc-950 p-1.5 sm:p-3 md:p-4">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(52, 211, 153, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(52, 211, 153, 0.5) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
        aria-hidden="true"
      />

      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 20% 60%, rgba(52, 211, 153, 0.06) 0%, transparent 55%)",
        }}
        aria-hidden="true"
      />

      <motion.div
        className="relative z-10 w-full max-w-lg"
        initial={{ opacity: 0, y: 8 }}
        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="text-[6px] font-medium uppercase tracking-[0.2em] text-emerald-400 sm:text-[8px] md:text-xs">
          Bonus skill
        </p>
        <h2 className="mt-0.5 font-display text-[10px] font-medium leading-tight tracking-tight sm:text-sm md:text-xl">
          Excel &amp; data specialist
        </h2>
        <p className="mt-0.5 text-[5.5px] text-muted-foreground sm:text-[8px] md:text-sm">
          Ex-reports assistant · Data team background
        </p>

        {/* Three highlights */}
        <div className="mt-1 space-y-0.5 sm:mt-2 sm:space-y-1.5 md:mt-3 md:space-y-2">
          {highlights.map((h, i) => {
            const Icon = h.icon;
            return (
              <motion.div
                key={h.title}
                className="flex gap-1 rounded-md border border-white/5 bg-white/[0.02] p-0.5 transition-all duration-300 hover:border-emerald-400/20 hover:bg-white/[0.04] sm:gap-2 sm:rounded-lg sm:p-2 md:gap-2.5 md:p-2.5"
                initial={{ opacity: 0, x: -6 }}
                animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -6 }}
                transition={{ duration: 0.3, delay: 0.08 + i * 0.08 }}
                whileHover={{ x: 2 }}
              >
                <div className={`flex h-3 w-3 shrink-0 items-center justify-center rounded ${h.bg} sm:h-5 sm:w-5 sm:rounded-md md:h-7 md:w-7`}>
                  <Icon size={6} className={`${h.color} sm:size-[9px] md:size-[13px]`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className={`text-[6px] font-medium sm:text-[8px] md:text-sm ${h.color}`}>
                    {h.title}
                  </h3>
                  <p className="mt-px text-[5px] leading-relaxed text-muted-foreground line-clamp-2 sm:text-[7px] md:text-xs">
                    {h.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Skill tags */}
        <div className="mt-1 sm:mt-2 md:mt-3">
          <p className="mb-0.5 text-[5px] font-medium uppercase tracking-[0.15em] text-muted-foreground/60 sm:mb-1 sm:text-[8px] md:text-[10px]">
            Tools &amp; formulas
          </p>
          <div className="flex flex-wrap gap-0.5 sm:gap-1.5 md:gap-2">
            {excelSkills.map((skill, i) => {
              const Icon = skill.icon;
              return (
                <motion.span
                  key={skill.name}
                  className="inline-flex items-center gap-0.5 rounded-full border border-emerald-400/20 bg-emerald-400/[0.06] px-1 py-0.5 text-[5px] font-medium text-emerald-300 sm:gap-1 sm:px-2 sm:py-1 sm:text-[9px] md:px-2.5 md:text-xs"
                  initial={{ opacity: 0, y: 4 }}
                  animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
                  transition={{ duration: 0.25, delay: 0.3 + i * 0.04 }}
                >
                  <Icon size={4} className="sm:size-[9px] md:size-3" />
                  {skill.name}
                </motion.span>
              );
            })}
          </div>
        </div>

        {/* Bottom tagline */}
        <motion.p
          className="mt-1 text-center text-[5px] text-muted-foreground/50 sm:mt-2 sm:text-[8px] md:text-xs"
          initial={{ opacity: 0 }}
          animate={isActive ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
        >
          I don't just build funnels — I analyze the data to make them better.
        </motion.p>
      </motion.div>
    </div>
  );
}