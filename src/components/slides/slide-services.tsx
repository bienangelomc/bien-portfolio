"use client";

import { motion } from "framer-motion";
import { Globe, LayoutDashboard, Smartphone, Palette } from "lucide-react";

interface SlideProps {
  isActive: boolean;
}

const services = [
  {
    icon: Globe,
    title: "Business websites",
    desc: "Marketing sites for local service businesses.",
  },
  {
    icon: LayoutDashboard,
    title: "Web applications",
    desc: "Full-stack products with auth & databases.",
  },
  {
    icon: Smartphone,
    title: "Mobile apps",
    desc: "Cross-platform apps for iOS & Android.",
  },
  {
    icon: Palette,
    title: "UI design",
    desc: "Interface and brand direction with purpose.",
  },
];

export default function SlideServices({ isActive }: SlideProps) {
  return (
    <div className="flex h-full w-full items-start justify-start overflow-y-auto bg-white p-3 sm:p-4 md:p-6 dark:bg-zinc-950 sm:items-center sm:justify-center">
      <motion.div
        className="w-full max-w-lg"
        initial={{ opacity: 0, y: 6 }}
        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="text-[7px] font-medium uppercase tracking-[0.18em] text-accent sm:text-[10px] md:text-xs">
          What I do
        </p>
        <h2 className="mt-px font-display text-sm font-medium leading-tight tracking-tight sm:text-base md:text-2xl lg:text-3xl">
          Four things, done well.
        </h2>

        <div className="mt-1.5 grid grid-cols-2 gap-1 sm:mt-3 sm:gap-2 md:mt-4 md:gap-2.5">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.title}
                className="rounded-md border border-border/50 bg-card/30 p-1.5 sm:rounded-lg sm:p-2 md:p-3"
                initial={{ opacity: 0, y: 3 }}
                animate={
                  isActive
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 3 }
                }
                transition={{
                  duration: 0.25,
                  delay: 0.04 + i * 0.03,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="mb-1 inline-flex h-4 w-4 items-center justify-center rounded bg-accent/10 text-accent sm:h-5 sm:w-5 sm:rounded-md md:h-8 md:w-8 md:rounded-lg">
                  <Icon size={7} className="sm:size-[9px] md:size-4" />
                </div>
                <h3 className="text-[8px] font-medium sm:text-[10px] md:text-sm">{s.title}</h3>
                <p className="mt-0.5 text-[6.5px] leading-relaxed text-muted-foreground sm:text-[9px] md:text-xs">
                  {s.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
