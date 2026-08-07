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
    <div className="flex h-full w-full items-center justify-center overflow-y-auto bg-white p-2 sm:p-4 md:p-6 dark:bg-zinc-950">
      <motion.div
        className="w-full max-w-lg"
        initial={{ opacity: 0, y: 8 }}
        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="text-[8px] font-medium uppercase tracking-[0.18em] text-accent sm:text-[10px] md:text-xs">
          How I work
        </p>
        <h2 className="mt-0.5 font-display text-base font-medium leading-tight tracking-tight sm:text-lg md:text-2xl lg:text-3xl">
          Four real steps.
        </h2>

        <div className="mt-2 space-y-1 sm:mt-3 sm:space-y-1.5 md:mt-4 md:space-y-2">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.num}
                className="flex gap-1.5 rounded-md border border-border/40 bg-card/20 p-1.5 sm:gap-2 sm:rounded-lg sm:p-2 md:gap-2.5 md:p-2.5"
                initial={{ opacity: 0, x: -6 }}
                animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -6 }}
                transition={{
                  duration: 0.3,
                  delay: 0.05 + i * 0.04,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-accent/10 text-accent sm:h-6 sm:w-6 sm:rounded-md md:h-7 md:w-7">
                  <Icon size={9} className="sm:size-[11px] md:size-[13px]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-1.5 sm:gap-2">
                    <p className="text-[7px] text-muted-foreground sm:text-[8px] md:text-[10px]">
                      {step.num}
                    </p>
                    <h3 className="text-[9px] font-medium sm:text-[11px] md:text-sm">
                      {step.title}
                    </h3>
                  </div>
                  <p className="mt-0.5 text-[7px] leading-relaxed text-muted-foreground sm:text-[9px] md:text-xs">
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
