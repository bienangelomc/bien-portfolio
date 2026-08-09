"use client";

import { motion, MotionValue, useTransform, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";
import HologramField from "./hologram-field";

interface LaptopStageProps {
  children: React.ReactNode;
  slideCount: number;
  activeSlide: number;
  className?: string;
  containerRef: React.RefObject<HTMLDivElement | null>;
  scrollProgress: MotionValue<number>;
}

/**
 * LaptopStage — classic CSS 3D laptop (proven card-fold pattern).
 *
 * GEOMETRY (side view):
 *
 *        lid (open = vertical, rotateX 0)
 *        |
 *        |____ hinge line (lid bottom = deck top)
 *       /
 *      /  deck (fixed rotateX 75°, lies flat toward viewer)
 *
 * - The whole scene has a FIXED gentle downward view (rotateX 16°).
 *   No camera animation — the laptop just sits there.
 * - DECK: transform-origin top, fixed rotateX(75deg) → keyboard lying flat,
 *   extending toward the viewer. Hinge at its top edge (back of laptop). ✓ real laptop
 * - LID: transform-origin bottom (the same hinge line).
 *     closed  = rotateX(-105deg)  → lies flat ON the deck, pointing toward viewer,
 *               screen face down (hidden), back cover (logo) up. ✓ real closed laptop
 *     open    = rotateX(0deg)     → upright, screen faces the viewer.
 * - SCREEN FACE: a plain, untransformed div with backface-visibility:hidden.
 *   When open it has NO 3D transform → text is 100% readable, right-side-up.
 * - BACK COVER: rotateX(180deg) card-back. Standard pattern — content reads
 *   correctly when viewed from behind (no mirroring).
 *
// Scroll phases (p 0 → 1):
//   0.00 → 0.10   Laptop closed, sitting there
//   0.10 → 0.45   Lid opens: -105° → 0°
//   0.45 → 0.55   Screen boot animation
//   0.55 → 0.92   Portfolio slides
//   0.92 → 1.00   Hold
 */

const LID_CLOSED = -100;
const LID_OPEN = 0;
const DECK_ANGLE = 75;

export default function LaptopStage({
  children,
  slideCount,
  activeSlide,
  className,
  scrollProgress,
}: LaptopStageProps) {
  const p = useSpring(scrollProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  // Every phase below is now viewport-independent. Mobile used to branch
  // here because slides rendered in a separate full-screen hologram
  // overlay instead of the laptop screen; that overlay is gone, so mobile
  // and desktop run the identical timeline.

  // LID rotation: closed → open (fast — 1-2 scrolls)
  const lidRotation = useTransform(
    p,
    [0.03, 0.15],
    [LID_CLOSED, LID_OPEN],
    { clamp: true }
  );

  // Gentle scale-up as it opens
  const stageScale = useTransform(
    p,
    [0, 0.5, 0.9, 1],
    [0.82, 0.95, 0.95, 0.9],
    { clamp: true }
  );

  // Screen wake
  const screenOpacity = useTransform(
    p,
    [0.08, 0.13, 0.16],
    [0.15, 0.6, 1],
    { clamp: true }
  );
  const screenBrightness = useTransform(
    p,
    [0.08, 0.16],
    [0.4, 1],
    { clamp: true }
  );

  // Boot overlay
  const bootOpacity = useTransform(
    p,
    [0.13, 0.16, 0.19, 0.22],
    [0, 1, 1, 0],
    { clamp: true }
  );

  // Slides after boot
  const slidesOpacity = useTransform(
    p,
    [0.18, 0.22],
    [0, 1],
    { clamp: true }
  );

  // Glow behind the laptop once open
  const glowOpacity = useTransform(
    p,
    [0.3, 0.5, 0.9],
    [0, 0.45, 0.2],
    { clamp: true }
  );

  return (
    <div
      className={cn("relative w-full", className)}
      style={{ perspective: "1400px" }}
    >
        <motion.div
        className="relative mx-auto"
        style={{
          scale: stageScale,
          rotateX: 14,
          y: useTransform(p, [0, 1], ["0%", "10%"]),
          transformStyle: "preserve-3d",
          width: "min(760px, 92vw)",
          willChange: "transform",
        }}
      >
        {/* Ambient glow */}
        <motion.div
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[420px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/40 blur-[130px]"
          style={{ opacity: glowOpacity }}
          aria-hidden="true"
        />

        {/* ===== LID — hinged at its BOTTOM edge (= back of the laptop) ===== */}
        <motion.div
          className="relative w-full"
          style={{
            transformOrigin: "center bottom",
            rotateX: lidRotation,
            transformStyle: "preserve-3d",
            willChange: "transform",
          }}
        >
          {/* ---- SCREEN FACE (front). NO transform → 100% readable when open ---- */}
          <div
            className="relative aspect-[16/10] w-full overflow-hidden rounded-t-xl bg-[#0a0a0c] p-1.5 shadow-2xl sm:p-2 md:p-2.5 lg:p-3"
            style={{ backfaceVisibility: "hidden" }}
          >
            {/* Camera dot */}
            <div className="absolute left-1/2 top-1 z-10 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-zinc-700 ring-1 ring-zinc-600" />

            {/* Screen panel — scrollable, hidden scrollbar */}
            <motion.div
              className="laptop-screen relative mt-1 h-[calc(100%-1rem)] overflow-hidden rounded-md bg-zinc-950 sm:mt-1.5 sm:h-[calc(100%-1.25rem)] md:mt-2 md:h-[calc(100%-1.75rem)]"
              style={{
                opacity: screenOpacity,
                filter: useTransform(screenBrightness, (v) => `brightness(${v})`),
                willChange: "opacity, filter",
              }}
            >
              {/* Boot overlay */}
              <motion.div
                className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-zinc-950"
                style={{
                  opacity: bootOpacity,
                  pointerEvents: useTransform(bootOpacity, (v) => (v > 0.1 ? "auto" : "none")),
                }}
              >
                <p className="text-xs font-medium uppercase tracking-[0.3em] text-accent">
                  Bien Casimiro
                </p>
                <div className="mx-auto mt-4 h-0.5 w-24 overflow-hidden rounded-full bg-zinc-800">
                  <motion.div
                    className="h-full bg-accent"
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{
                      duration: 0.8,
                      ease: "easeInOut",
                      repeat: Infinity,
                    }}
                  />
                </div>
              </motion.div>

              {/* Slides */}
              <motion.div
                className="absolute inset-0"
                style={{ opacity: slidesOpacity }}
              >
                {children}
              </motion.div>

              {/* CRT scanlines — very low contrast; enough to read as
                  "emitting light" without hurting slide legibility. */}
              <div
                className="pointer-events-none absolute inset-0 z-30 opacity-[0.14] mix-blend-overlay"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(to bottom, rgba(255,255,255,0.5) 0px, rgba(255,255,255,0.5) 1px, transparent 1px, transparent 3px)",
                }}
                aria-hidden="true"
              />

              {/* Cyan bloom at the top edge, where the projection
                  originates. Sells the haze as coming FROM the panel. */}
              <div
                className="pointer-events-none absolute inset-x-0 top-0 z-30 h-1/3 mix-blend-screen"
                style={{
                  background:
                    "linear-gradient(to bottom, hsl(var(--holo) / 0.20), transparent)",
                }}
                aria-hidden="true"
              />

              {/* Glare */}
              <div
                className="pointer-events-none absolute inset-0 z-30 bg-gradient-to-br from-white/[0.06] via-transparent to-transparent"
                aria-hidden="true"
              />
            </motion.div>

            {/* Bottom bezel — progress dots */}
            <div className="absolute bottom-0 left-0 right-0 flex h-4 items-center justify-center gap-1 sm:h-5 sm:gap-1 sm:md:h-6 md:gap-1.5">
              {Array.from({ length: slideCount }).map((_, i) => (
                <motion.div
                  key={i}
                  className="h-[3px] rounded-full sm:h-1"
                  animate={{
                    width: activeSlide === i ? 18 : 6,
                    backgroundColor:
                      activeSlide === i ? "#ff6b35" : "rgba(255,255,255,0.12)",
                  }}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </div>
          </div>

          {/* ---- BACK COVER (logo side; visible when closed) ---- */}
          <div
            className="absolute inset-0 rounded-t-xl bg-gradient-to-b from-[#2b2b2f] to-[#1b1b1f]"
            style={{
              transform: "rotateX(180deg)",
              backfaceVisibility: "hidden",
            }}
          >
            {/* Logo */}
            <div className="absolute left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2 text-zinc-500/60">
              <svg
                width="38"
                height="38"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
            </div>
            {/* Subtle sheen */}
            <div className="absolute inset-x-4 top-3 h-px bg-white/[0.05]" />
          </div>
        </motion.div>

        {/* ===== DECK / KEYBOARD — fixed, lying flat toward the viewer ===== */}
        <div
          className="relative w-full rounded-b-lg bg-gradient-to-b from-[#26262a] to-[#151518] shadow-2xl"
          style={{
            aspectRatio: "16/7.5",
            transformOrigin: "center top",
            transform: `rotateX(${DECK_ANGLE}deg)`,
            willChange: "transform",
          }}
        >
          {/* Keyboard */}
          <div className="absolute inset-x-[8%] top-[8%] flex h-[52%] flex-col justify-between opacity-70">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex h-[16%] gap-[0.6%]">
                {[...Array(i === 4 ? 7 : 14)].map((__, j) => (
                  <div
                    key={j}
                    className="flex-1 rounded-[3px] bg-zinc-800/90 ring-1 ring-black/40"
                  />
                ))}
              </div>
            ))}
          </div>

          {/* Trackpad */}
          <div className="absolute bottom-[7%] left-1/2 h-[28%] w-[26%] -translate-x-1/2 rounded-lg border border-zinc-700/50 bg-zinc-800/40" />

          {/* Front edge highlight */}
          <div className="absolute inset-x-0 bottom-0 h-[3px] rounded-b-lg bg-gradient-to-b from-transparent to-white/[0.06]" />
        </div>

        {/* Desk shadow under the deck */}
        <div
          className="mx-auto h-4 w-[70%] rounded-full bg-black/60 blur-lg"
          style={{ transform: "translateY(-6px)" }}
          aria-hidden="true"
        />

        {/* Holographic key-info panels — sibling of the lid, so they
            inherit the stage tilt but not the 100° hinge rotation. Last
            in DOM order and pushed forward on Z to render over the
            machine. */}
        <HologramField
          activeSlide={activeSlide}
          scrollProgress={scrollProgress}
        />
      </motion.div>
    </div>
  );
}
