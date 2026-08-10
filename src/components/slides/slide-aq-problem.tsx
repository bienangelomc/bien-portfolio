"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Clock, PencilLine, Tag, CalendarX } from "lucide-react";

interface SlideProps {
  isActive: boolean;
}

/**
 * Act one. Before any screenshot or stack list, the visitor should feel the
 * bottleneck — a cleaner doing quotes at 9pm after a full day on the tools.
 * The system only looks impressive once this is real to them.
 */
const FRICTIONS = [
  {
    icon: PencilLine,
    title: "Quoted by hand, at night",
    body: "Every enquiry written out after a full day cleaning houses.",
  },
  {
    icon: Clock,
    title: "Hours-late replies",
    body: "The first cleaner to answer usually won the job.",
  },
  {
    icon: Tag,
    title: "Prices that disagreed",
    body: "The website said one number, the invoice said another.",
  },
  {
    icon: CalendarX,
    title: "Slots promised twice",
    body: "No shared calendar between the phone and the diary.",
  },
];

export default function SlideAQProblem({ isActive }: SlideProps) {
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
            01 — The problem
          </span>
        </div>

        <h2 className="mt-0.5 font-display text-[11px] font-medium leading-tight tracking-tight sm:text-lg md:text-xl">
          Quoting was the bottleneck
        </h2>

        <p className="mt-0.5 line-clamp-2 text-[6px] text-muted-foreground sm:text-xs md:text-sm">
          AQ Cleaning is owner-operated across twelve towns in South West WA.
          The cleaning was never the constraint — answering people was.
        </p>

        <div className="mt-1 grid grid-cols-2 gap-1 sm:mt-3 sm:gap-2">
          {FRICTIONS.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                className="rounded border border-border/40 bg-card/20 p-1 sm:p-2"
                initial={{ opacity: 0, y: 8 }}
                animate={
                  isActive
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 8 }
                }
                transition={{
                  duration: reduceMotion ? 0 : 0.45,
                  delay: reduceMotion ? 0 : 0.15 + i * 0.09,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="flex items-center gap-0.5 sm:gap-1.5">
                  <Icon className="h-1.5 w-1.5 shrink-0 text-accent sm:h-3 sm:w-3" />
                  <p className="text-[5px] font-semibold leading-none text-foreground/90 sm:text-[10px] md:text-[11px]">
                    {f.title}
                  </p>
                </div>
                <p className="mt-0.5 text-[4.5px] leading-tight text-muted-foreground sm:text-[8px] md:text-[10px]">
                  {f.body}
                </p>
              </motion.div>
            );
          })}
        </div>

        <p className="mt-1 text-[5px] leading-tight text-foreground/70 sm:mt-3 sm:text-[10px] md:text-xs">
          <span className="text-accent">The brief:</span> stop her writing
          quotes. Don&apos;t let the site promise anything she wouldn&apos;t.
        </p>
      </motion.div>
    </div>
  );
}
