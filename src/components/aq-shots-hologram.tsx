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

export const AQ_SHOTS: Shot[] = [
  { src: "", label: "Home", caption: "Six services, twelve towns, one owner." },
  { src: "", label: "Get a quote", caption: "The price builds as they type." },
  { src: "", label: "Your quote", caption: "$225.50 on screen — before anyone is called." },
  { src: "", label: "Pricing", caption: "How pricing works, without a public price list." },
  { src: "", label: "Service page", caption: "One per service, built for local search." },
  { src: "", label: "Toolkit — Quote", caption: "The same rate card that prices the website." },
  { src: "", label: "Toolkit — Schedule", caption: "Accepted jobs arrive on their own." },
  { src: "", label: "Telegram", caption: "Approve or decline. That's the whole job." },
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
        <div className="relative aspect-video">
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
