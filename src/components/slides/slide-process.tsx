"use client";

import { motion } from "framer-motion";
import { Search, PenTool, Code2, Rocket } from "lucide-react";

interface SlideProps {
  isActive: boolean;
}

const steps = [
  {
    icon: Search,
    num: "01",
    title: "Understand",
    desc: "Goals, customers, success.",
  },
  {
    icon: PenTool,
    num: "02",
    title: "Design",
    desc: "Layout, flow, type, color.",
  },
  {
    icon: Code2,
    num: "03",
    title: "Build",
    desc: "Clean code, fast, reliable.",
  },
  {
    icon: Rocket,
    num: "04",
    title: "Launch",
    desc: "Live + 30 days support.",
  },
];

export default function SlideProcess({ isActive }: SlideProps) {
  return (
    <div className="flex h-full w-full items-start justify-start overflow-y-auto bg-white p-3 sm:p-4 md:p-6 dark:bg-zinc-950 sm:items-center sm:justify-center">
      <motion.div
        className="w-full max-w-lg"
        initial={{ opacity: 0, y: 6 }}
        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="text-[7px] font-medium uppercase tracking-[0.18em] text-accent sm:text-[10px] md:text-xs">
          How I work
        </p>
        <h2 className="mt-px font-display text-sm font-medium leading-tight tracking-tight sm:text-base md:text-2xl lg:text-3xl">
          Four real steps.
        </h2>

        <div className="mt-1.5 space-y-1 sm:mt-3 sm:space-y-1.5 md:mt-4 md:space-y-2">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.num}
                className="flex gap-1.5 rounded-md border border-border/40 bg-card/20 p-1.5 sm:gap-2 sm:rounded-lg sm:p-2 md:gap-2.5 md:p-2.5"
                initial={{ opacity: 0, x: -4 }}
                animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -4 }}
                transition={{
                  duration: 0.25,
                  delay: 0.04 + i * 0.03,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded bg-accent/10 text-accent sm:h-5 sm:w-5 sm:rounded-md md:h-7 md:w-7">
                  <Icon size={7} className="sm:size-[9px] md:size-[13px]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-1.5 sm:gap-2">
                    <p className="text-[6px] text-muted-foreground sm:text-[8px] md:text-[10px]">
                      {step.num}
                    </p>
                    <h3 className="text-[8px] font-medium sm:text-[10px] md:text-sm">
                      {step.title}
                    </h3>
                  </div>
                  <p className="mt-0.5 text-[6.5px] leading-relaxed text-muted-foreground sm:text-[9px] md:text-xs">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
