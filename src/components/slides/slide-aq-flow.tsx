"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check, X } from "lucide-react";

interface SlideProps {
  isActive: boolean;
}

/**
 * Act three — one real quote, start to finish, so the automation stops being
 * abstract. The Telegram card is the beat that sells it: this is the entire
 * amount of work the owner does per job.
 */
const BEATS = [
  { t: "0s", who: "Customer", text: "3 bed, 2 bath, fortnightly — “we have two cats”" },
  { t: "0s", who: "System", text: "Prices it from her rate card, live on screen" },
  { t: "1s", who: "System", text: "Reads the note, checks the calendar, holds a slot" },
  { t: "2s", who: "Owner", text: "Telegram buzzes — Approve or Decline" },
  { t: "1 tap", who: "Owner", text: "Approves from the driveway" },
  { t: "Instant", who: "Customer", text: "Gets the quote, accepts, job is booked" },
];

export default function SlideAQFlow({ isActive }: SlideProps) {
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
            03 — One quote, end to end
          </span>
        </div>

        <h2 className="mt-0.5 font-display text-[11px] font-medium leading-tight tracking-tight sm:text-lg md:text-xl">
          Her whole job is one tap
        </h2>

        <div className="mt-1 grid grid-cols-[1fr_auto] gap-1 sm:mt-3 sm:gap-2">
          {/* Timeline */}
          <div className="flex flex-col justify-center gap-[3px] sm:gap-1.5">
            {BEATS.map((b, i) => (
              <motion.div
                key={b.text}
                className="flex items-start gap-1"
                initial={{ opacity: 0, x: -6 }}
                animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -6 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.4,
                  delay: reduceMotion ? 0 : 0.2 + i * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <span className="mt-[1px] w-[14px] shrink-0 text-right text-[4px] font-medium text-accent sm:w-6 sm:text-[8px] md:text-[9px]">
                  {b.t}
                </span>
                <span className="mt-[2px] h-1 w-1 shrink-0 rounded-full bg-accent/70 sm:mt-[5px]" />
                <p className="text-[4.5px] leading-tight text-foreground/85 sm:text-[8.5px] md:text-[10px]">
                  <span className="text-muted-foreground">{b.who}: </span>
                  {b.text}
                </p>
              </motion.div>
            ))}
          </div>

          {/* The Telegram card she actually sees */}
          <motion.div
            className="w-[68px] shrink-0 self-center rounded border border-accent/30 bg-[#0e1116] p-1 sm:w-[120px] sm:p-2"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.94 }}
            transition={{
              duration: reduceMotion ? 0 : 0.5,
              delay: reduceMotion ? 0 : 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <p className="text-[4px] font-semibold text-foreground/90 sm:text-[9px]">
              New quote to approve
            </p>
            <p className="mt-0.5 text-[3.5px] leading-tight text-muted-foreground sm:text-[7.5px]">
              Bunbury · 3 bed / 2 bath
              <br />
              Wed 20 Aug, 9:00am
            </p>
            <p className="mt-0.5 text-[6px] font-bold text-accent sm:text-[12px]">$225.50</p>

            <div className="mt-0.5 flex gap-0.5 sm:mt-1.5 sm:gap-1">
              <motion.span
                className="flex flex-1 items-center justify-center gap-0.5 rounded bg-accent/90 py-[1px] text-[3.5px] font-semibold text-black sm:py-0.5 sm:text-[7.5px]"
                animate={
                  isActive && !reduceMotion
                    ? { boxShadow: ["0 0 0 0 rgba(255,107,53,0)", "0 0 0 3px rgba(255,107,53,0.25)", "0 0 0 0 rgba(255,107,53,0)"] }
                    : {}
                }
                transition={{ duration: 1.6, repeat: Infinity, delay: 1.4, ease: "easeInOut" }}
              >
                <Check className="h-1 w-1 sm:h-2 sm:w-2" strokeWidth={3} /> Approve
              </motion.span>
              <span className="flex flex-1 items-center justify-center gap-0.5 rounded border border-border/50 py-[1px] text-[3.5px] text-muted-foreground sm:py-0.5 sm:text-[7.5px]">
                <X className="h-1 w-1 sm:h-2 sm:w-2" strokeWidth={3} /> No
              </span>
            </div>
          </motion.div>
        </div>

        <p className="mt-1 text-[5px] leading-tight text-foreground/70 sm:mt-3 sm:text-[10px] md:text-xs">
          <span className="text-accent">The rule:</span> nothing reaches the
          customer until she approves it. The state machine enforces it, not
          the UI.
        </p>
      </motion.div>
    </div>
  );
}
