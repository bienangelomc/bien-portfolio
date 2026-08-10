"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";

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
  label: string;
  caption: string;
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
    label: "The website",
    caption: "Six services, twelve towns, one owner-operator.",
  },
  {
    src: "/shots/02-quote.png",
    label: "Get a quote",
    caption: "One page. No wizard, no callback, no waiting.",
  },
  {
    src: "/shots/03-quote-summary.png",
    label: "The price, live",
    caption: "It builds line by line as they answer — from her own rate card.",
  },
  {
    src: "/shots/04-calendar.png",
    label: "Real availability",
    caption: "Only days she can actually take. Nothing is promised twice.",
  },
  {
    src: "/shots/06-toolkit-dashboard.png",
    label: "The toolkit",
    caption: "Her whole business — jobs, clients, money — in one place.",
  },
  {
    src: "/shots/07-toolkit-quote.png",
    label: "Same engine, her side",
    caption: "The calculator that prices the website prices her quotes.",
  },
  {
    src: "/shots/08-toolkit-settings.png",
    label: "One rate card",
    caption: "Change a price here and the website quotes it instantly.",
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
  // Each shot owns an equal slice of the band, so one scroll beat = one shot.
  const span = (end - start) / AQ_SHOTS.length;

  if (!hasShots) return null;

  return (
    <div
      className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center"
      style={{ perspective: "1200px" }}
      aria-hidden
    >
      {AQ_SHOTS.map((shot, i) => (
        <ShotPanel
          key={shot.label}
          shot={shot}
          scrollProgress={scrollProgress}
          from={start + i * span}
          span={span}
        />
      ))}
    </div>
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
  // Rise, hold, then fall away — the hold is the middle 60% so the shot is
  // legible rather than permanently in motion.
  const points = [from, from + span * 0.2, from + span * 0.8, from + span];

  const opacity = useTransform(scrollProgress, points, [0, 1, 1, 0]);
  const z = useTransform(scrollProgress, points, [-140, 90, 110, 260]);
  const y = useTransform(scrollProgress, points, [40, 0, -6, -60]);
  const rotateX = useTransform(scrollProgress, points, [18, 0, 0, -14]);
  const scale = useTransform(scrollProgress, points, [0.9, 1, 1, 0.94]);

  return (
    <motion.figure
      className="absolute w-[68%] max-w-md"
      style={{
        opacity,
        y,
        rotateX,
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

      <figcaption className="mt-1.5 text-center">
        <p className="text-[8px] font-medium uppercase tracking-[0.2em] text-cyan-300 sm:text-[10px]">
          {shot.label}
        </p>
        <p className="text-[9px] text-white/70 sm:text-[11px]">{shot.caption}</p>
      </figcaption>

      <div
        className="pointer-events-none absolute -bottom-5 left-1/2 h-8 w-2/3 -translate-x-1/2 rounded-full bg-cyan-400/25 blur-2xl"
        aria-hidden
      />
    </motion.figure>
  );
}
