"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import Image from "next/image";
import { type ProjectData } from "../hologram-modal";

interface SlideProps {
  isActive: boolean;
  onNavigate: (slide: number) => void;
  onOpenHologram: (project: ProjectData) => void;
}

const projects: ProjectData[] = [
  {
    title: "AQ Cleaning Services",
    tag: "Quote-to-booking system",
    color: "#10b981",
    accent: "#10b981",
    image: "/mockup-aq-cleaning.png",
    url: "https://aq-cleaning-services.higgsfield.app/",
    description:
      "An owner-operated cleaning business was quoting by hand after work, so replies came hours late and the price on the website rarely matched the price she charged. This is the system that closed that gap: the site quotes, schedules and books on its own, and she approves each one from her phone.",
    features: [
      "Customer sees a real price as they type — from the owner's own rate card, not a guess",
      "AI reads the free-text note for anything the form didn't ask",
      "Checks the live calendar before promising a slot, so nothing double-books",
      "Telegram push with Approve or Decline — two taps, no inbox",
      "Nothing reaches the customer until she has approved it",
      "Accepted quotes become bookings and sync to her business toolkit",
    ],
    stack: ["TanStack Start", "Cloudflare Workers", "D1", "Telegram Bot API", "Claude", "Resend"],
    stats: [
      { label: "To approve", value: "2 taps" },
      { label: "Quotes answered", value: "24/7" },
      { label: "Rate card", value: "1" },
    ],
  },
  {
    title: "Smart Budget Tracker",
    tag: "Finance web app",
    color: "#6366f1",
    accent: "#6366f1",
    image: "/mockup-smart-budget.png",
    url: "https://smart-budget-tracker.higgsfield.app/",
    description:
      "A modern budgeting app with AI-powered spending insights, live PayPal payments, and native mobile via Capacitor.",
    features: [
      "AI-powered spending insights and category suggestions",
      "Live PayPal subscription payments for Pro plan",
      "Visual reports and savings goals with progress tracking",
      "Native iOS & Android builds via Capacitor",
    ],
    stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind", "D1 SQL", "PayPal"],
    stats: [
      { label: "Platforms", value: "4" },
      { label: "AI mode", value: "ON" },
      { label: "Realtime", value: "⚡" },
    ],
  },
  {
    title: "Angelo",
    tag: "Speech-training game",
    color: "#ff6b35",
    accent: "#ff6b35",
    image: "/mockup-angelo.png",
    url: "https://voice-quest.higgsfield.app/",
    description:
      "An AI-powered voice and language learning game with a friendly companion named Angelo. Practice conversation naturally.",
    features: [
      "Real AI voice conversations with GPT-4o-mini",
      "Text-to-speech with natural voice output",
      "Speech recognition and pronunciation feedback",
      "Progress tracking, streaks, and gamified learning",
    ],
    stack: ["React", "TanStack Start", "TypeScript", "Tailwind", "OpenAI", "Cloudflare"],
    stats: [
      { label: "AI Voice", value: "Live" },
      { label: "Levels", value: "∞" },
      { label: "Fun factor", value: "10/10" },
    ],
  },
];

export default function SlideWorkIndex({ isActive, onOpenHologram }: SlideProps) {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-zinc-950 p-1.5 sm:p-3 md:p-6">
      <motion.div
        className="w-full max-w-lg"
        initial={{ opacity: 0, y: 6 }}
        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="text-[6px] font-medium uppercase tracking-[0.18em] text-accent sm:text-[10px] md:text-xs">
          Selected Work
        </p>
        <h2 className="mt-0.5 font-display text-[11px] font-medium leading-tight tracking-tight sm:text-base md:text-2xl lg:text-3xl">
          Three recent projects.
        </h2>

        <div className="mt-1 space-y-0.5 sm:mt-3 sm:space-y-2 md:mt-4 md:space-y-2.5">
          {projects.map((p, i) => (
            <motion.button
              key={p.title}
              onClick={() => onOpenHologram(p)}
              className="group relative flex w-full items-center gap-1 rounded-md border border-border/50 bg-card/30 p-0.5 text-left transition-all duration-300 hover:border-accent/30 hover:bg-card/60 hover:shadow-[0_0_16px_rgba(255,107,53,0.08)] sm:gap-2.5 sm:rounded-lg sm:p-2 md:gap-4 md:p-3"
              initial={{ opacity: 0, x: -4 }}
              animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -4 }}
              transition={{
                duration: 0.25,
                delay: 0.04 + i * 0.04,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ x: 2 }}
            >
              <div className="relative">
                <div
                  className="relative h-4 w-6 shrink-0 overflow-hidden rounded-[2px] sm:h-7 sm:w-11 md:h-10 md:w-16"
                  style={{ background: `${p.color}15` }}
                >
                  <Image
                    src={p.image}
                    alt=""
                    fill
                    className="object-cover object-top opacity-80"
                  />
                </div>
                {/* Hologram sparkle indicator */}
                <div
                  className="absolute -right-0.5 -top-0.5 flex h-2 w-2 items-center justify-center rounded-full"
                  style={{ background: p.accent, boxShadow: `0 0 4px ${p.accent}` }}
                >
                  <Sparkles size={5} className="text-white" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[7px] font-medium leading-tight sm:text-[10px] md:text-sm">
                  {p.title}
                </p>
                <p className="mt-px text-[5px] text-muted-foreground sm:text-[9px] md:text-xs">
                  {p.tag}
                </p>
              </div>
              <ArrowUpRight
                size={7}
                className="shrink-0 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent sm:size-3 md:size-4"
              />
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
