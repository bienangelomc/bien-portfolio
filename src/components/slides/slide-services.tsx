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
    desc: "Marketing sites for local and service businesses, built to be found and to book jobs.",
  },
  {
    icon: LayoutDashboard,
    title: "Web applications",
    desc: "Full-stack products with auth, databases, and dashboards that people actually use.",
  },
  {
    icon: Smartphone,
    title: "Mobile apps",
    desc: "Cross-platform apps with native feel, packaged for iOS and Android.",
  },
  {
    icon: Palette,
    title: "UI design",
    desc: "Interface and brand direction — not just implementation, but the thinking behind it.",
  },
];

export default function SlideServices({ isActive }: SlideProps) {
  return (
    <div className="flex h-full w-full items-center justify-center overflow-y-auto bg-white p-3 sm:p-5 md:p-6 dark:bg-zinc-950">
      <motion.div
        className="w-full max-w-lg"
        initial={{ opacity: 0, y: 12 }}
        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-accent sm:text-[10px] md:text-xs">
          What I do
        </p>
        <h2 className="mt-1 font-display text-lg font-medium leading-tight tracking-tight sm:text-xl md:text-2xl lg:text-3xl">
          Four things, done well.
        </h2>

        <div className="mt-3 grid gap-2 sm:gap-2.5 sm:grid-cols-2">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.title}
                className="rounded-lg border border-border/50 bg-card/30 p-2.5 sm:p-3 md:p-4"
                initial={{ opacity: 0, y: 6 }}
                animate={
                  isActive
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 6 }
                }
                transition={{
                  duration: 0.35,
                  delay: 0.06 + i * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="mb-1.5 inline-flex h-6 w-6 items-center justify-center rounded-md bg-accent/10 text-accent sm:h-7 sm:w-7 md:h-8 md:w-8">
                  <Icon size={11} className="sm:size-[13px] md:size-4" />
                </div>
                <h3 className="text-[11px] font-medium sm:text-sm md:text-base">{s.title}</h3>
                <p className="mt-0.5 text-[9px] leading-relaxed text-muted-foreground sm:text-[10px] md:text-xs">
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
