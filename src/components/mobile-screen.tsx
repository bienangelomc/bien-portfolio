"use client";

import { motion, AnimatePresence } from "framer-motion";

interface MobileScreenProps {
  isOpen: boolean;
  slideNumber: number;
  totalSlides: number;
  children: React.ReactNode;
}

/**
 * MobileScreen — the laptop's screen, flown forward to fill the phone.
 *
 * WHY THIS EXISTS (do not "simplify" it back into the laptop):
 * The lid is locked to 16:10. On a 375px-wide phone that caps the screen
 * at ~205px tall — 23% of the viewport — which forces slide text down to
 * 7–9px. There is no scale that fixes it: reaching a readable ~450px tall
 * would need a 770px-wide laptop, double the phone, clipping every slide
 * on both sides. The aspect ratio is the constraint, not the sizing.
 *
 * So on mobile the laptop still opens — it's the intro beat — and then
 * the screen detaches and fills the viewport at a portrait aspect the
 * slides can actually use.
 *
 * This is deliberately styled as the SAME screen as desktop: the
 * #0a0a0c bezel, the camera dot, the zinc-950 panel, the cyan top bloom,
 * the CRT scanlines, the corner glare, the accent progress dots. It is
 * not a separate visual mode — it is the laptop screen, closer.
 *
 * SCALE compensates for slides whose mobile styles were authored against
 * a small box; the panel is far bigger now, so the content is scaled up
 * and its container divided by the same factor to keep the layout box
 * identical. Changing SCALE alone is safe; changing the panel dimensions
 * means re-checking every slide for overflow.
 */
const SCALE = 1.55;
const PANEL_W = "96vw";
const PANEL_H = "82vh";
const HEADER_H = 34;

export default function MobileScreen({
  isOpen,
  slideNumber,
  totalSlides,
  children,
}: MobileScreenProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Dim the room behind. pointer-events-none so page scroll,
              which drives the whole timeline, still passes through. */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="pointer-events-none absolute inset-0 z-40 bg-[#0a0a0c]/85 backdrop-blur-sm"
          />

          {/* The screen itself, flying forward from the laptop below */}
          <motion.div
            initial={{ opacity: 0, scale: 0.55, y: 90, rotateX: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 60, rotateX: 12 }}
            transition={{ type: "spring", stiffness: 170, damping: 24, mass: 0.85 }}
            style={{ transformStyle: "preserve-3d", perspective: "900px" }}
            className="absolute left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2"
          >
            {/* Ambient glow, matching the desktop stage glow */}
            <div className="absolute -inset-6 -z-10 rounded-full bg-accent/25 blur-[70px]" />

            {/* BEZEL — same treatment as the laptop lid */}
            <div
              className="relative overflow-hidden rounded-2xl bg-[#0a0a0c] p-2 shadow-2xl ring-1 ring-white/[0.06]"
              style={{ width: PANEL_W, height: PANEL_H }}
            >
              {/* Camera dot */}
              <div className="absolute left-1/2 top-[5px] z-20 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-zinc-700 ring-1 ring-zinc-600" />

              {/* SCREEN PANEL */}
              <div
                className="laptop-screen relative overflow-hidden rounded-lg bg-zinc-950"
                style={{ height: `calc(100% - ${HEADER_H}px)`, marginTop: 14 }}
              >
                {/* Slide content, scaled to suit the larger panel */}
                <div className="absolute inset-0 overflow-hidden">
                  <div
                    style={{
                      transform: `scale(${SCALE})`,
                      transformOrigin: "center center",
                      width: `calc(100% / ${SCALE})`,
                      height: `calc(100% / ${SCALE})`,
                      marginLeft: `calc((100% - (100% / ${SCALE})) / 2)`,
                      marginTop: `calc((100% - (100% / ${SCALE})) / 2)`,
                      position: "relative",
                    }}
                  >
                    {children}
                  </div>
                </div>

                {/* CRT scanlines — identical to the laptop screen */}
                <div
                  className="pointer-events-none absolute inset-0 z-30 opacity-[0.14] mix-blend-overlay"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(to bottom, rgba(255,255,255,0.5) 0px, rgba(255,255,255,0.5) 1px, transparent 1px, transparent 3px)",
                  }}
                  aria-hidden="true"
                />

                {/* Cyan top-edge bloom — identical to the laptop screen */}
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 z-30 h-1/4 mix-blend-screen"
                  style={{
                    background:
                      "linear-gradient(to bottom, hsl(var(--holo) / 0.20), transparent)",
                  }}
                  aria-hidden="true"
                />

                {/* Corner glare */}
                <div
                  className="pointer-events-none absolute inset-0 z-30 bg-gradient-to-br from-white/[0.06] via-transparent to-transparent"
                  aria-hidden="true"
                />
              </div>

              {/* Bottom bezel — progress dots, same as the laptop */}
              <div className="absolute bottom-0 left-0 right-0 flex h-5 items-center justify-center gap-1">
                {Array.from({ length: totalSlides }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="h-1 rounded-full"
                    animate={{
                      width: slideNumber === i ? 18 : 6,
                      backgroundColor:
                        slideNumber === i ? "#ff6b35" : "rgba(255,255,255,0.12)",
                    }}
                    transition={{ duration: 0.3 }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
