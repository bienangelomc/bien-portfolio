"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import { Globe } from "lucide-react";
import { AQ_LIVE_URL } from "@/lib/content";

/**
 * The system's surfaces, projected out of the laptop one at a time as you
 * scroll the AQ case study.
 *
 * `src` is empty until the real captures exist, and `hasShots` gates the whole
 * component — an empty frame floating over the machine looks broken, and a
 * portfolio should never show a placeholder where a product shot belongs. Drop
 * the files into /public/shots and it starts working with no other change.
 */
export interface Shot {
  src: string;
  /** The surface being shown. */
  label: string;
  /** What it proves, in one line. */
  caption: string;
  /** Why it matters to the business — the part a client is actually buying. */
  detail: string;
}

/**
 * Frames pulled from the recording of the working system.
 *
 * The Telegram card is deliberately absent: the only capture of it shows real
 * customers' names, emails and phone numbers, and a portfolio is a public
 * page. It needs a staged test quote before it can go in — see
 * public/shots/README.txt.
 */
export const AQ_SHOTS: Shot[] = [
  {
    src: "/shots/01-home.png",
    label: "01 — The website",
    caption: "The shopfront: six services, twelve towns, one owner-operator.",
    detail:
      "Built for how people actually find a cleaner — a page per service and per town, so the business shows up for “bond clean Bunbury”, not just its own name.",
  },
  {
    src: "/shots/02-quote.png",
    label: "02 — Quote and book",
    caption: "One page. A live price and the real calendar, no callback.",
    detail:
      "Most cleaning sites end at a contact form and a promise. This one prices the job as the customer answers and only offers days the owner can genuinely take, so a booking is never double-sold.",
  },
  {
    // Waiting on the frequency-discount capture — see public/shots/README.txt.
    src: "",
    label: "03 — Pricing that sells",
    caption: "Frequency discounts, priced automatically: −5%, −10%, −15%.",
    detail:
      "Regular work is worth more than one-off work, so the system prices for it. The discount is applied by the engine, not by hand, which quietly moves customers onto recurring bookings.",
  },
  {
    src: "/shots/04-telegram.png",
    label: "04 — The approval bot",
    caption: "The full quote on her phone. Approve, or decline. That's the job.",
    detail:
      "The owner is on the tools, not at a desk. The bot sends the breakdown, the held slot and the total, and nothing reaches the customer until she taps approve — a person still signs off every price.",
  },
  {
    src: "/shots/05-toolkit.png",
    label: "05 — The business toolkit",
    caption: "Revenue, expenses, profit, unpaid — the whole picture.",
    detail:
      "Accepted quotes land here on their own. No spreadsheet, no re-typing, and the numbers a small business usually finds out at tax time are visible today.",
  },
  {
    src: "/shots/06-schedule.png",
    label: "06 — The schedule",
    caption: "Today, this week, this month — with hours and booked value.",
    detail:
      "The same calendar the website checks before offering a slot. One source of truth means the site can never sell a time that is already gone.",
  },
  {
    src: "/shots/07-manual-quote.png",
    label: "07 — Manual quoting",
    caption: "Anything the engine won't auto-price, priced by hand — same rates.",
    detail:
      "Commercial jobs and odd properties still need a human. She prices them on the same rate card, so a hand-written quote and an automatic one never disagree.",
  },
];

export const hasShots = AQ_SHOTS.some((s) => s.src.length > 0);

interface Props {
  scrollProgress: MotionValue<number>;
  /** The scroll band the AQ case study occupies, as [start, end] in 0–1. */
  range: [number, number];
}

export default function AQShotsHologram({ scrollProgress, range }: Props) {
  const [start, end] = range;
  // Only shots with a capture take a beat, so a missing image closes the gap
  // instead of leaving a blank pane floating over the laptop.
  const shots = AQ_SHOTS.filter((s) => s.src.length > 0);
  const span = (end - start) / shots.length;

  if (!shots.length) return null;

  return (
    <>
      <div
        // Offset right: the laptop slides left over the same band, so the two
        // sit side by side instead of the panels covering the machine.
        className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center pl-[26%]"
        // Deeper than the laptop's own 1400px: the panels are large and pushed
        // well forward, and a tighter perspective bends the edges.
        style={{ perspective: "1700px", perspectiveOrigin: "45% 50%" }}
        aria-hidden
      >
        {shots.map((shot, i) => (
          <ShotPanel
            key={shot.label}
            shot={shot}
            scrollProgress={scrollProgress}
            from={start + i * span}
            span={span}
          />
        ))}
      </div>

      <VisitLive scrollProgress={scrollProgress} range={range} />
    </>
  );
}

/**
 * A standing "visit the live site" link for the whole hologram sequence.
 *
 * Deliberately a sibling of the panels rather than a child of them. The panel
 * container is `pointer-events-none` and `aria-hidden` — a link inside it would
 * be unclickable, and a focusable element inside an aria-hidden subtree is
 * unreachable for anyone using a screen reader. Anchoring it here also keeps it
 * still: the panels are travelling and fading the whole time, so a link riding
 * one would be a moving target that vanishes as you reach for it.
 */
function VisitLive({
  scrollProgress,
  range,
}: {
  scrollProgress: MotionValue<number>;
  range: [number, number];
}) {
  const [start, end] = range;
  const fade = (end - start) * 0.08;
  // Present for the case study, gone either side of it — a link floating over
  // an unrelated slide reads as a stray element.
  const opacity = useTransform(
    scrollProgress,
    [start, start + fade, end - fade, end],
    [0, 1, 1, 0],
  );

  return (
    <motion.div
      className="pointer-events-none absolute inset-x-0 bottom-6 z-40 flex justify-center pl-[26%] sm:bottom-9"
      style={{ opacity }}
    >
      <a
        href={AQ_LIVE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-auto inline-flex items-center gap-1.5 rounded-full border border-cyan-400/40 bg-[#06080c]/85 px-3 py-1.5 text-[10px] font-medium text-cyan-200 shadow-[0_0_30px_-8px_rgba(56,189,248,0.6)] backdrop-blur-sm transition-colors hover:border-cyan-300 hover:text-white focus-visible:border-cyan-300 focus-visible:text-white focus-visible:outline-none sm:gap-2 sm:px-4 sm:py-2 sm:text-xs"
      >
        <Globe className="h-2.5 w-2.5 sm:h-3 sm:w-3" aria-hidden="true" />
        Visit the live site
      </a>
    </motion.div>
  );
}

function ShotPanel({
  shot,
  scrollProgress,
  from,
  span,
}: {
  shot: Shot;
  scrollProgress: MotionValue<number>;
  from: number;
  span: number;
}) {
  // Slides out of the screen rather than rising off it: starts small, deep
  // behind the lid and turned away, travels forward and sideways into a
  // three-quarter view, holds while it is readable, then carries on past the
  // viewer. The hold is the middle 60% so it is legible, not permanently moving.
  const points = [from, from + span * 0.2, from + span * 0.8, from + span];

  const opacity = useTransform(scrollProgress, points, [0, 1, 1, 0]);
  const z = useTransform(scrollProgress, points, [-260, 150, 200, 420]);
  const x = useTransform(scrollProgress, points, [-70, 0, 14, 90]);
  const y = useTransform(scrollProgress, points, [26, 0, -6, -44]);
  // Held off-square so it reads as a projected pane with depth, not a flat card.
  const rotateY = useTransform(scrollProgress, points, [-38, -19, -17, -6]);
  const rotateX = useTransform(scrollProgress, points, [13, 6, 6, -7]);
  const scale = useTransform(scrollProgress, points, [0.82, 1, 1.03, 0.95]);

  return (
    <motion.figure
      className="absolute w-[62%] max-w-xl"
      style={{
        opacity,
        x,
        y,
        rotateX,
        rotateY,
        scale,
        translateZ: z,
        transformStyle: "preserve-3d",
      }}
    >
      <div className="overflow-hidden rounded-lg border border-cyan-400/35 bg-[#06080c] shadow-[0_0_50px_-10px_rgba(56,189,248,0.55)]">
        {/* The captures are 1900x910, so the panel matches rather than cropping
            the top and bottom off a browser window. */}
        <div className="relative aspect-[190/91]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={shot.src} alt={shot.label} className="h-full w-full object-cover object-top" />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.14] mix-blend-screen"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to bottom, rgba(56,189,248,0.65) 0px, rgba(56,189,248,0.65) 1px, transparent 1px, transparent 3px)",
            }}
          />
        </div>
      </div>

      <figcaption className="mx-auto mt-2 max-w-[92%] text-center">
        <p className="text-[8px] font-medium uppercase tracking-[0.2em] text-cyan-300 sm:text-[10px]">
          {shot.label}
        </p>
        <p className="mt-0.5 text-[11px] font-semibold text-white sm:text-[13px]">
          {shot.caption}
        </p>
        {/* The "why it matters" line, kept off the smallest screens where it
            would compete with the screenshot for the same few pixels. */}
        <p className="mt-1 hidden text-[10px] leading-relaxed text-white/60 md:block">
          {shot.detail}
        </p>
      </figcaption>

      <div
        className="pointer-events-none absolute -bottom-5 left-1/2 h-8 w-2/3 -translate-x-1/2 rounded-full bg-cyan-400/25 blur-2xl"
        aria-hidden
      />
    </motion.figure>
  );
}
