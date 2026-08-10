"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ExternalLink, FileText, Calculator, CalendarCheck, Send, CheckCircle2, LayoutGrid } from "lucide-react";

interface SlideProps {
  isActive: boolean;
}

/**
 * The six hops a job makes on its own, from the customer's form to a row in
 * the owner's toolkit. This is the whole point of the project, so it replaces
 * the screenshot that used to sit here — a still image of a website said
 * "marketing site" when the work was the automation behind it.
 */
const STAGES = [
  { icon: FileText, label: "Quote", detail: "Customer fills the form" },
  { icon: Calculator, label: "Price", detail: "Priced from her own rate card" },
  { icon: CalendarCheck, label: "Schedule", detail: "Checked against real openings" },
  { icon: Send, label: "Approve", detail: "Telegram, two taps" },
  { icon: CheckCircle2, label: "Book", detail: "Customer accepts, job is set" },
  { icon: LayoutGrid, label: "Toolkit", detail: "Lands in her calendar" },
];

export default function SlideProjectAQ({ isActive }: SlideProps) {
  const reduceMotion = useReducedMotion();

  // One cycle lights each stage in turn, then rests — the pulse reads as a job
  // travelling the pipeline rather than six things blinking at once.
  const CYCLE = STAGES.length * 0.55 + 1.2;

  return (
    <div className="flex h-full w-full items-center justify-center overflow-hidden bg-zinc-950 p-1.5 sm:p-3 md:p-5">
      <motion.div
        // No h-full: the parent already centres it, and a 100%-height child
        // sat 6px low here and pushed its own base past the bezel.
        className="flex w-full max-w-lg flex-col justify-center"
        initial={{ opacity: 0, y: 12 }}
        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center gap-1 sm:gap-2">
          <span className="text-[6px] font-medium uppercase tracking-[0.15em] text-accent sm:text-[10px] md:text-xs">
            Featured
          </span>
          <span className="text-[6px] text-muted-foreground sm:text-[10px] md:text-xs">·</span>
          <span className="text-[6px] text-muted-foreground sm:text-[10px] md:text-xs">
            Quote-to-booking system
          </span>
        </div>

        <h2 className="mt-0.5 font-display text-[11px] font-medium leading-tight tracking-tight sm:text-lg md:text-xl">
          AQ Cleaning Services
        </h2>

        <p className="mt-0.5 line-clamp-2 text-[6px] text-muted-foreground sm:text-xs md:text-sm">
          She was quoting by hand at 9pm and losing jobs to whoever replied first.
          Now quotes price, schedule and book themselves — she just approves.
        </p>

        {/* The pipeline. Same box the screenshot used, so the mobile vertical
            budget is untouched. */}
        <div className="mt-1 overflow-hidden rounded-lg border border-border/50 bg-[#0c0c10] sm:mt-3">
          <div className="relative flex aspect-[16/7] items-center justify-center px-1.5 sm:aspect-video sm:px-4">
            {/* Rail */}
            <div className="absolute left-3 right-3 top-1/2 h-px -translate-y-1/2 bg-border/40 sm:left-7 sm:right-7" />

            {/* The job travelling it */}
            {!reduceMotion && (
              <motion.div
                className="absolute top-1/2 h-1 w-1 -translate-y-1/2 rounded-full bg-accent sm:h-1.5 sm:w-1.5"
                style={{ boxShadow: "0 0 8px 2px rgba(255,107,53,0.7)" }}
                initial={{ left: "6%", opacity: 0 }}
                animate={
                  isActive
                    ? { left: ["6%", "94%"], opacity: [0, 1, 1, 0] }
                    : { left: "6%", opacity: 0 }
                }
                transition={{
                  duration: CYCLE * 0.75,
                  times: [0, 0.08, 0.92, 1],
                  repeat: Infinity,
                  repeatDelay: 0.5,
                  ease: "linear",
                }}
              />
            )}

            <div className="relative flex w-full items-start justify-between">
              {STAGES.map((stage, i) => {
                const Icon = stage.icon;
                const at = i * 0.55;
                return (
                  <div key={stage.label} className="flex flex-1 flex-col items-center gap-0.5 sm:gap-1.5">
                    <motion.div
                      className="flex items-center justify-center rounded-full border bg-[#0c0c10]"
                      style={{ width: "1.35em", height: "1.35em", fontSize: "inherit" }}
                      initial={{ borderColor: "rgba(255,255,255,0.14)", scale: 1 }}
                      animate={
                        isActive && !reduceMotion
                          ? {
                              borderColor: [
                                "rgba(255,255,255,0.14)",
                                "rgba(255,107,53,0.9)",
                                "rgba(255,255,255,0.14)",
                              ],
                              scale: [1, 1.18, 1],
                            }
                          : { borderColor: "rgba(255,255,255,0.14)", scale: 1 }
                      }
                      transition={{
                        duration: 1.1,
                        delay: at,
                        repeat: Infinity,
                        repeatDelay: CYCLE - 1.1,
                        ease: "easeInOut",
                      }}
                    >
                      <Icon className="h-1.5 w-1.5 text-accent sm:h-3 sm:w-3" strokeWidth={2.4} />
                    </motion.div>

                    <p className="text-center text-[4px] font-medium leading-none text-foreground/85 sm:text-[9px] md:text-[10px]">
                      {stage.label}
                    </p>
                    {/* Detail is desktop-only — at 4px it would be unreadable. */}
                    <p className="hidden text-center text-[8px] leading-tight text-muted-foreground md:block">
                      {stage.detail}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* What actually changed for the business. */}
        <div className="mt-1 grid grid-cols-3 gap-1 sm:mt-3 sm:gap-2">
          {[
            // Kept to one line — two-line labels pushed the slide 8px past the
            // bezel at 360x640, the tightest phone this has to survive.
            { value: "2 taps", label: "To approve" },
            { value: "24/7", label: "Answered" },
            { value: "1", label: "Rate card" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded border border-border/40 bg-card/20 px-1 py-0.5 text-center sm:p-2"
            >
              <p className="text-[8px] font-bold text-accent sm:text-sm md:text-lg">{stat.value}</p>
              <p className="text-[4.5px] leading-tight text-muted-foreground sm:text-[8px] md:text-[10px]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-1 flex items-center justify-between sm:mt-3">
          <div className="flex flex-wrap gap-0.5 sm:gap-1.5">
            {["AI intake", "Telegram bot", "Edge + D1"].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border/50 px-1 py-0.5 text-[5px] text-muted-foreground sm:px-2 sm:text-[10px]"
              >
                {tag}
              </span>
            ))}
          </div>
          <a
            href="https://aq-cleaning-services.higgsfield.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 inline-flex shrink-0 items-center gap-0.5 text-[6px] font-medium text-accent hover:underline sm:gap-1.5 sm:text-xs"
          >
            Visit <ExternalLink size={6} className="sm:size-3" />
          </a>
        </div>
      </motion.div>
    </div>
  );
}
