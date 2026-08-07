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
    desc: "Marketing sites for local and service businesses.",
  },
  {
    icon: LayoutDashboard,
    title: "Web applications",
    desc: "Full-stack products with auth and databases.",
  },
  {
    icon: Smartphone,
    title: "Mobile apps",
    desc: "Cross-platform apps packaged for iOS & Android.",
  },
  {
    icon: Palette,
    title: "UI design",
    desc: "Interface and brand direction with purpose.",
  },
];

export default function SlideServices({ isActive }: SlideProps) {
  return (
    <div className="flex h-full w-full items-center justify-center overflow-y-auto bg-white p-2 sm:p-4 md:p-6 dark:bg-zinc-950">
      <motion.div
        className="w-full max-w-lg"
        initial={{ opacity: 0, y: 8 }}
        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="text-[8px] font-medium uppercase tracking-[0.18em] text-accent sm:text-[10px] md:text-xs">
          What I do
        </p>
        <h2 className="mt-0.5 font-display text-base font-medium leading-tight tracking-tight sm:text-lg md:text-2xl lg:text-3xl">
          Four things, done well.
        </h2>

        <div className="mt-2 grid gap-1.5 sm:mt-3 sm:gap-2 sm:grid-cols-2 md:mt-4 md:gap-2.5">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.title}
                className="rounded-md border border-border/50 bg-card/30 p-2 sm:rounded-lg sm:p-2.5 md:p-3"
                initial={{ opacity: 0, y: 4 }}
                animate={
                  isActive
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 4 }
                }
                transition={{
                  duration: 0.3,
                  delay: 0.05 + i * 0.04,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="mb-1 inline-flex h-5 w-5 items-center justify-center rounded bg-accent/10 text-accent sm:h-6 sm:w-6 sm:rounded-md md:h-8 md:w-8 md:rounded-lg">
                  <Icon size={9} className="sm:size-[11px] md:size-4" />
                </div>
                <h3 className="text-[9px] font-medium sm:text-[11px] md:text-sm">{s.title}</h3>
                <p className="mt-0.5 text-[7px] leading-relaxed text-muted-foreground sm:text-[9px] md:text-xs">
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
