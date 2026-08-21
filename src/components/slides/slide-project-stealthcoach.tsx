"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ExternalLink, Mic, AudioLines, HelpCircle, Sparkles, Type, RefreshCw } from "lucide-react";
import { STEALTHCOACH_LIVE_URL } from "@/lib/content";

interface SlideProps {
  isActive: boolean;
}

/**
 * What happens between someone finishing a question and an answer appearing.
 *
 * Same shape as the AQ pipeline slide on purpose: both projects are a chain of
 * steps that runs without anyone driving it, and showing them the same way
 * makes the second one legible in a glance.
 */
const STAGES = [
  { icon: Mic, label: "Listen", detail: "Desktop app hears the room" },
  { icon: AudioLines, label: "Transcribe", detail: "Silence is never sent" },
  { icon: HelpCircle, label: "Detect", detail: "Notices the speaker stop" },
  { icon: Sparkles, label: "Answer", detail: "Written from your resume" },
  { icon: Type, label: "Stream", detail: "First words in ~2s" },
  { icon: RefreshCw, label: "Update", detail: "Ships itself" },
];

export default function SlideProjectStealthCoach({ isActive }: SlideProps) {
  const reduceMotion = useReducedMotion();

  const CYCLE = STAGES.length * 0.55 + 1.2;

  return (
    <div className="flex h-full w-full items-center justify-center overflow-hidden bg-zinc-950 p-1.5 sm:p-3 md:p-5">
      <motion.div
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
            Real-time AI desktop app
          </span>
        </div>

        <h2 className="mt-0.5 font-display text-[11px] font-medium leading-tight tracking-tight sm:text-lg md:text-xl">
          {/* The title is the link, same as the AQ slide — clicking the name is
              the first thing anyone tries. */}
          <a
            href={STEALTHCOACH_LIVE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-baseline gap-1 decoration-accent/50 underline-offset-4 transition-colors hover:text-accent hover:underline focus-visible:text-accent focus-visible:underline focus-visible:outline-none sm:gap-1.5"
          >
            StealthCoach
            <ExternalLink
              size={6}
              className="shrink-0 self-center text-accent opacity-60 transition-opacity group-hover:opacity-100 sm:size-3.5"
              aria-hidden="true"
            />
            <span className="sr-only">(opens the live site in a new tab)</span>
          </a>
        </h2>

        <p className="mt-0.5 line-clamp-2 text-[6px] text-muted-foreground sm:text-xs md:text-sm">
          A desktop app that listens to an interview, works out when the question
          has actually ended, and streams an answer written from your own resume.
        </p>

        <div className="mt-1 overflow-hidden rounded-lg border border-border/50 bg-[#0c0c10] sm:mt-3">
          <div className="relative flex h-[58px] items-center justify-center px-1.5 sm:h-[104px] sm:px-4 md:h-[124px]">
            <div className="absolute left-3 right-3 top-1/2 h-px -translate-y-1/2 bg-border/40 sm:left-7 sm:right-7" />

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
                    <p className="hidden text-center text-[8px] leading-tight text-muted-foreground md:block">
                      {stage.detail}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Measured, not rounded up. */}
        <div className="mt-1 grid grid-cols-3 gap-1 sm:mt-3 sm:gap-2">
          {[
            // One word or two, like the AQ slide. A three-word label wraps at
            // 4.5px on a 360px phone and pushes the slide past the bezel.
            { value: "1.8s", label: "First words" },
            { value: "600ms", label: "To react" },
            { value: "Auto", label: "Updates" },
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
            {["Electron", "Live speech", "Streaming AI"].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border/50 px-1 py-0.5 text-[5px] text-muted-foreground sm:px-2 sm:text-[10px]"
              >
                {tag}
              </span>
            ))}
          </div>
          <a
            href={STEALTHCOACH_LIVE_URL}
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
