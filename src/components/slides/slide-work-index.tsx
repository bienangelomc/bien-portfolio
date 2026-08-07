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
    <div className="flex h-full w-full items-center justify-center overflow-y-auto bg-white p-5 md:p-6 dark:bg-zinc-950">
      <motion.div
        className="w-full max-w-lg"
        initial={{ opacity: 0, y: 16 }}
        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-accent md:text-xs">
          Selected Work
        </p>
        <h2 className="mt-2 font-display text-2xl font-medium leading-tight tracking-tight md:text-3xl">
          Three recent projects.
        </h2>

        <div className="mt-4 space-y-2.5">
          {projects.map((p, i) => (
            <motion.a
              key={p.title}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex w-full items-center gap-3 rounded-lg border border-border/50 bg-card/30 p-2.5 text-left transition-all hover:border-accent/30 hover:bg-card/60"
              initial={{ opacity: 0, x: -8 }}
              animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
              transition={{
                duration: 0.4,
                delay: 0.08 + i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div
                className="relative h-10 w-14 shrink-0 overflow-hidden rounded-md"
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
                <p className="text-sm font-medium leading-tight">
                  {p.title}
                </p>
                <p className="text-xs text-muted-foreground">{p.tag}</p>
              </div>
              <ArrowUpRight
                size={14}
                className="shrink-0 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
              />
            </motion.a>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
