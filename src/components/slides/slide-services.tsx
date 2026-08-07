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
    <div className="flex h-full w-full items-center justify-center overflow-y-auto bg-white p-5 md:p-6 dark:bg-zinc-950">
      <motion.div
        className="w-full max-w-lg"
        initial={{ opacity: 0, y: 16 }}
        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-accent md:text-xs">
          What I do
        </p>
        <h2 className="mt-2 font-display text-2xl font-medium leading-tight tracking-tight md:text-3xl">
          Four things, done well.
        </h2>

        <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.title}
                className="rounded-lg border border-border/50 bg-card/30 p-3"
                initial={{ opacity: 0, y: 8 }}
                animate={
                  isActive
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 8 }
                }
                transition={{
                  duration: 0.4,
                  delay: 0.08 + i * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="mb-2 inline-flex h-7 w-7 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <Icon size={13} />
                </div>
                <h3 className="text-sm font-medium">{s.title}</h3>
                <p className="mt-0.5 text-[11px] leading-relaxed text-muted-foreground">
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
