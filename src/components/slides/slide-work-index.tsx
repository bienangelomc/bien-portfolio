"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

interface SlideProps {
  isActive: boolean;
  onNavigate: (slide: number) => void;
}

const projects = [
  {
    title: "AQ Cleaning Services",
    tag: "Marketing site",
    color: "#10b981",
    image: "/mockup-aq-cleaning.png",
    url: "https://aq-cleaning-services.higgsfield.app/",
  },
  {
    title: "Smart Budget Tracker",
    tag: "Finance web app",
    color: "#6366f1",
    image: "/mockup-smart-budget.png",
    url: "https://smart-budget-tracker.higgsfield.app/",
  },
  {
    title: "Angelo",
    tag: "Speech-training game",
    color: "#ff6b35",
    image: "/mockup-angelo.png",
    url: "https://voice-quest.higgsfield.app/",
  },
];

export default function SlideWorkIndex({ isActive }: SlideProps) {
  return (
    <div className="flex h-full w-full items-center justify-center overflow-y-auto bg-white p-2 sm:p-4 md:p-6 dark:bg-zinc-950">
      <motion.div
        className="w-full max-w-lg"
        initial={{ opacity: 0, y: 8 }}
        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="text-[8px] font-medium uppercase tracking-[0.18em] text-accent sm:text-[10px] md:text-xs">
          Selected Work
        </p>
        <h2 className="mt-0.5 font-display text-base font-medium leading-tight tracking-tight sm:text-lg md:text-2xl lg:text-3xl">
          Three recent projects.
        </h2>

        <div className="mt-2 space-y-1.5 sm:mt-3 sm:space-y-2 md:mt-4 md:space-y-2.5">
          {projects.map((p, i) => (
            <motion.a
              key={p.title}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex w-full items-center gap-2 rounded-md border border-border/50 bg-card/30 p-1.5 text-left transition-all hover:border-accent/30 hover:bg-card/60 sm:gap-2.5 sm:rounded-lg sm:p-2 md:gap-4 md:p-3"
              initial={{ opacity: 0, x: -6 }}
              animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -6 }}
              transition={{
                duration: 0.3,
                delay: 0.05 + i * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div
                className="relative h-6 w-9 shrink-0 overflow-hidden rounded-[3px] sm:h-8 sm:w-12 md:h-10 md:w-16"
                style={{ background: `${p.color}15` }}
              >
                <Image
                  src={p.image}
                  alt=""
                  fill
                  className="object-cover object-top opacity-80"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[9px] font-medium leading-tight sm:text-[11px] md:text-sm">
                  {p.title}
                </p>
                <p className="mt-0.5 text-[7px] text-muted-foreground sm:text-[9px] md:text-xs">
                  {p.tag}
                </p>
              </div>
              <ArrowUpRight
                size={10}
                className="shrink-0 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent sm:size-3 md:size-4"
              />
            </motion.a>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
