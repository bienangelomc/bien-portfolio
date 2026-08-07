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
    title: "Understand the business",
    desc: "We talk through your goals, customers, and what success looks like.",
  },
  {
    icon: PenTool,
    num: "02",
    title: "Design the direction",
    desc: "Key pages in Figma — layout, flow, type, color. You see it first.",
  },
  {
    icon: Code2,
    num: "03",
    title: "Build it properly",
    desc: "Clean code, fast performance. You get a staging link to follow along.",
  },
  {
    icon: Rocket,
    num: "04",
    title: "Launch & keep improving",
    desc: "We go live on your domain. 30 days support included.",
  },
];

export default function SlideProcess({ isActive }: SlideProps) {
  return (
    <div className="flex h-full w-full items-center justify-center overflow-y-auto bg-white p-3 sm:p-5 md:p-6 dark:bg-zinc-950">
      <motion.div
        className="w-full max-w-lg"
        initial={{ opacity: 0, y: 12 }}
        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-accent sm:text-[10px] md:text-xs">
          How I work
        </p>
        <h2 className="mt-1 font-display text-lg font-medium leading-tight tracking-tight sm:text-xl md:text-2xl lg:text-3xl">
          Four real steps.
        </h2>

        <div className="mt-3 space-y-1.5 sm:mt-4 sm:space-y-2">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.num}
                className="flex gap-2 rounded-lg border border-border/40 bg-card/20 p-2 sm:gap-2.5 sm:p-2.5"
                initial={{ opacity: 0, x: -8 }}
                animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
                transition={{
                  duration: 0.35,
                  delay: 0.06 + i * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-accent/10 text-accent sm:h-7 sm:w-7">
                  <Icon size={11} className="sm:size-[13px]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2">
                    <p className="text-[8px] text-muted-foreground sm:text-[9px]">
                      Step {step.num}
                    </p>
                    <h3 className="text-[11px] font-medium sm:text-xs md:text-sm">
                      {step.title}
                    </h3>
                  </div>
                  <p className="mt-0.5 text-[9px] leading-relaxed text-muted-foreground sm:text-[10px] md:text-xs">
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
