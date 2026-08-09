"use client";

import { AnimatePresence, motion, useReducedMotion, useTransform, type MotionValue } from "framer-motion";
import { holoSlides, type HoloPanel } from "@/lib/holo-content";

interface HologramFieldProps {
  activeSlide: number;
  scrollProgress: MotionValue<number>;
}

/**
 * HologramField — the key facts for the active slide, projected off the
 * screen as floating panels.
 *
 * Mounted inside LaptopStage's `preserve-3d` subtree as a SIBLING of the
 * lid, not a child. That matters: the lid swings 100° as it opens, and
 * panels parented to it would rotate with the hinge. As a sibling they
 * inherit only the stage's fixed 14° tilt, so they hang in the air in
 * front of the machine and stay upright.
 *
 * Depth is real translateZ against the stage's 1400px perspective, so
 * the tilt parallaxes them off the screen plane for free.
 *
 * Hidden below lg: panels anchor outside the laptop's left and right
 * edges, and on a phone there is no "outside".
 */
export default function HologramField({
  activeSlide,
  scrollProgress,
}: HologramFieldProps) {
  const reduceMotion = useReducedMotion();

  // Keyed to the stage timeline: boot ends ~0.22, slides run 0.22 → 0.97.
  const fieldOpacity = useTransform(
    scrollProgress,
    [0.19, 0.25, 0.95, 0.99],
    [0, 1, 1, 0],
    { clamp: true }
  );

  const panels = holoSlides[activeSlide] ?? [];

  return (
    <motion.div
      className="pointer-events-none absolute inset-0 z-30 hidden lg:block"
      style={{
        opacity: fieldOpacity,
        transformStyle: "preserve-3d",
        willChange: "opacity",
      }}
      aria-hidden="true"
    >
      <AnimatePresence>
        {panels.map((panel, i) => (
          <HoloCard
            // Keyed by slide so a slide change re-runs the materialise
            // animation rather than cross-fading text inside a panel.
            key={`${activeSlide}-${panel.label}-${i}`}
            panel={panel}
            index={i}
            reduceMotion={!!reduceMotion}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}

function HoloCard({
  panel,
  index,
  reduceMotion,
}: {
  panel: HoloPanel;
  index: number;
  reduceMotion: boolean;
}) {
  const { label, value, x, y, z, tone = "cool" } = panel;

  return (
    <motion.div
      className="absolute"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        z,
        transformStyle: "preserve-3d",
        willChange: "transform, opacity",
      }}
      initial={{ opacity: 0, scale: 0.82, y: 18, rotateY: -14 }}
      animate={{ opacity: 1, scale: 1, y: 0, rotateY: 0 }}
      exit={{ opacity: 0, scale: 0.92, y: -14, rotateY: 10 }}
      transition={{
        duration: 0.5,
        delay: reduceMotion ? 0 : index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* Idle drift, nested so it composes with the entrance transform
          instead of fighting it. */}
      <motion.div
        animate={reduceMotion ? undefined : { y: [0, -9, 0] }}
        transition={{
          duration: 4.5 + index * 0.7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div
          className="holo-panel animate-[var(--animate-holo-flicker)]"
          data-tone={tone}
        >
          <span className="holo-label">{label}</span>
          <span className="holo-value">{value}</span>
          <span className="holo-scanline" />
          <span className="holo-sheen" />
        </div>
      </motion.div>
    </motion.div>
  );
}
