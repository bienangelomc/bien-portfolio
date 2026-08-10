"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Maximize2 } from "lucide-react";
import type { ProjectData } from "../hologram-modal";

interface SlideProps {
  isActive: boolean;
  onOpenHologram?: (project: ProjectData) => void;
}

/** The deep detail, shown on demand rather than crammed into the slide. */
export const AQ_PROJECT: ProjectData = {
  title: "AQ Cleaning Services",
  tag: "Quote-to-booking system",
  color: "#10b981",
  accent: "#10b981",
  image: "/mockup-aq-cleaning.png",
  url: "https://aq-cleaning-services.higgsfield.app/",
  description:
    "An owner-operated cleaning business was quoting by hand after a full day on the tools. Replies landed hours late, the price advertised online rarely matched the price charged, and with no shared calendar a slot could be promised twice. This is the system that quotes, schedules and books for her — she approves each one from her phone.",
  features: [
    "Live price as the customer types, from the owner's own rate card",
    "AI reads the free-text note for anything the form didn't ask",
    "Checks real availability before promising a slot",
    "Telegram approval with signed, expiring links — two taps",
    "A customer can never accept a quote the owner hasn't approved",
    "Accepted quotes become bookings and sync to her business toolkit",
  ],
  stack: ["TanStack Start", "Cloudflare Workers", "D1", "Telegram Bot API", "Claude", "Resend"],
  stats: [
    { label: "To approve", value: "2 taps" },
    { label: "Quotes answered", value: "24/7" },
    { label: "Rate card", value: "1" },
  ],
};

const SHIFTS = [
  { before: "Quoted at 9pm, by hand", after: "Quoted in seconds, automatically" },
  { before: "Two prices, site vs invoice", after: "One rate card drives both" },
  { before: "Slots promised twice", after: "Checked before it's offered" },
];

export default function SlideAQImpact({ isActive, onOpenHologram }: SlideProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="flex h-full w-full items-center justify-center overflow-hidden bg-zinc-950 p-1.5 sm:p-3 md:p-5">
      <motion.div
        // No h-full — see slide-project-aq: a 100%-height child sits 6px low
        // inside the padded, centred parent and clips at the bezel.
        className="flex w-full max-w-lg flex-col justify-center"
        initial={{ opacity: 0, y: 12 }}
        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center gap-1 sm:gap-2">
          <span className="text-[6px] font-medium uppercase tracking-[0.15em] text-accent sm:text-[10px] md:text-xs">
            Case study
          </span>
          <span className="text-[6px] text-muted-foreground sm:text-[10px] md:text-xs">·</span>
          <span className="text-[6px] text-muted-foreground sm:text-[10px] md:text-xs">
            04 — What changed
          </span>
        </div>

        <h2 className="mt-0.5 font-display text-[11px] font-medium leading-tight tracking-tight sm:text-lg md:text-xl">
          The business runs while she sleeps
        </h2>

        <div className="mt-1 flex flex-col gap-1 sm:mt-3 sm:gap-2">
          {SHIFTS.map((s, i) => (
            <motion.div
              key={s.before}
              className="grid grid-cols-[1fr_auto_1fr] items-center gap-1 rounded border border-border/40 bg-card/20 p-1 sm:gap-2 sm:p-2"
              initial={{ opacity: 0, y: 8 }}
              animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={{
                duration: reduceMotion ? 0 : 0.45,
                delay: reduceMotion ? 0 : 0.15 + i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <p className="text-[4.5px] leading-tight text-muted-foreground line-through sm:text-[8.5px] md:text-[10px]">
                {s.before}
              </p>
              <ArrowRight className="h-1.5 w-1.5 shrink-0 text-accent sm:h-3 sm:w-3" />
              <p className="text-[4.5px] font-medium leading-tight text-foreground/90 sm:text-[8.5px] md:text-[10px]">
                {s.after}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-1 flex items-center justify-between gap-1 sm:mt-3">
          <p className="text-[4.5px] leading-tight text-foreground/70 sm:text-[9px] md:text-[11px]">
            Built on Cloudflare&apos;s edge — Workers, D1, signed approval
            links, and a state machine that keeps the order honest.
          </p>
          {onOpenHologram && (
            <button
              type="button"
              onClick={() => onOpenHologram(AQ_PROJECT)}
              className="inline-flex shrink-0 items-center gap-0.5 rounded-full border border-accent/40 px-1.5 py-0.5 text-[5px] font-medium text-accent transition-colors hover:bg-accent/10 sm:gap-1 sm:px-3 sm:py-1 sm:text-[10px]"
            >
              Full breakdown
              <Maximize2 className="h-1 w-1 sm:h-2.5 sm:w-2.5" />
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
