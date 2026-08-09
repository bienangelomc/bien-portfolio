"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";

interface HoloAtmosphereProps {
  scrollProgress: MotionValue<number>;
}

/**
 * Ambient projection environment behind and beneath the laptop:
 * a perspective floor grid, volumetric haze off the screen, and motes
 * drifting up through the light.
 *
 * Sits behind the machine and fades in with the lid (which opens over
 * p 0.03 → 0.15), so the closed state stays clean and the effect reads
 * as the screen switching on rather than decoration that was always
 * there.
 *
 * Mote positions are hardcoded rather than random — Math.random() here
 * produces different values on server and client and trips hydration.
 */
const MOTES = [
  { left: 18, bottom: 6, size: 2, delay: 0, duration: 9 },
  { left: 27, bottom: 2, size: 3, delay: 1.6, duration: 11 },
  { left: 35, bottom: 9, size: 2, delay: 3.1, duration: 8.5 },
  { left: 44, bottom: 1, size: 2, delay: 0.7, duration: 12 },
  { left: 52, bottom: 7, size: 3, delay: 4.2, duration: 9.5 },
  { left: 59, bottom: 3, size: 2, delay: 2.3, duration: 10.5 },
  { left: 67, bottom: 8, size: 2, delay: 5.4, duration: 8 },
  { left: 74, bottom: 2, size: 3, delay: 1.1, duration: 11.5 },
  { left: 82, bottom: 6, size: 2, delay: 3.8, duration: 9 },
  { left: 12, bottom: 4, size: 2, delay: 6.1, duration: 10 },
  { left: 89, bottom: 5, size: 2, delay: 2.9, duration: 12.5 },
  { left: 48, bottom: 10, size: 2, delay: 7.3, duration: 8.8 },
];

export default function HoloAtmosphere({
  scrollProgress,
}: HoloAtmosphereProps) {
  const fade = useTransform(
    scrollProgress,
    [0.06, 0.20, 0.95, 0.99],
    [0, 1, 1, 0],
    { clamp: true }
  );

  const gridOpacity = useTransform(fade, (v) => v * 0.42);
  const beamOpacity = useTransform(fade, (v) => v * 0.55);

  // The stage camera is fixed at 14°, so the grid gets its own small
  // settle as the lid opens rather than tracking a camera move.
  const gridRotate = useTransform(scrollProgress, [0.03, 0.15], [80, 71], {
    clamp: true,
  });

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ perspective: "1200px" }}
      aria-hidden="true"
    >
      {/* Floor grid */}
      <motion.div
        className="holo-grid absolute left-1/2 top-[64%] h-[900px] w-[2200px] -translate-x-1/2"
        style={{
          opacity: gridOpacity,
          rotateX: gridRotate,
          transformOrigin: "center top",
          willChange: "opacity, transform",
        }}
      />

      {/* Volumetric haze above the screen */}
      <motion.div
        className="holo-beam absolute left-1/2 top-[8%] h-[34%] w-[560px] -translate-x-1/2"
        style={{ opacity: beamOpacity, willChange: "opacity" }}
      />

      {/* Drifting motes */}
      <motion.div
        className="absolute inset-0"
        style={{ opacity: fade, willChange: "opacity" }}
      >
        {MOTES.map((m, i) => (
          <span
            key={i}
            className="holo-mote"
            style={{
              left: `${m.left}%`,
              bottom: `${m.bottom}%`,
              width: m.size,
              height: m.size,
              animationDelay: `${m.delay}s`,
              animationDuration: `${m.duration}s`,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}
