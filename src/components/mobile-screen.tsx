"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { holoSlides } from "@/lib/holo-content";

interface MobileScreenProps {
  isOpen: boolean;
  slideNumber: number;
  totalSlides: number;
  children: React.ReactNode;
}

/**
 * MobileScreen — the laptop's screen, flown forward to fill the phone,
 * with the same floating holo panels desktop gets.
 *
 * WHY THIS EXISTS (do not "simplify" it back into the laptop):
 * The lid is locked to 16:10. On a 375px-wide phone that caps the screen
 * at ~205px tall — 23% of the viewport — which forces slide text to
 * 7–9px. No scale fixes it: a readable ~450px-tall screen would need a
 * 770px-wide laptop, double the phone, clipping every slide on both
 * sides. The aspect ratio is the constraint, not the sizing.
 *
 * VERTICAL BUDGET (the thing to preserve when editing):
 *   holo row (top)     ~48px
 *   bezel              72vh
 *   holo row (bottom)  ~48px
 *   ------------------------------------
 *   375x812 → 693px used of 812  (85%)
 *   375x667 → 588px used of 667  (88%)   ← iPhone SE, the tight case
 * Growing the bezel past 72vh or adding a third holo row overflows SE.
 *
 * SCALE compensates for slides whose mobile styles were authored against
 * a small box. It is chosen so the content box stays 408px tall — the
 * height those styles were tuned for — while getting wider, which is
 * pure gain. Changing the bezel height means recomputing SCALE:
 *   SCALE = (bezelHeightPx - HEADER_H) / 408
 */
const SCALE = 1.35;
const PANEL_W = "94vw";
const PANEL_H = "72vh";
const HEADER_H = 34;

export default function MobileScreen({
  isOpen,
  slideNumber,
  totalSlides,
  children,
}: MobileScreenProps) {
  const reduceMotion = useReducedMotion();
  const panels = holoSlides[slideNumber] ?? [];
  const topPanels = panels.slice(0, 2);
  const bottomPanels = panels.slice(2, 3);

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

          {/* The screen, flying forward from the laptop below */}
          <motion.div
            initial={{ opacity: 0, scale: 0.55, y: 90, rotateX: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 60, rotateX: 12 }}
            transition={{ type: "spring", stiffness: 170, damping: 24, mass: 0.85 }}
            style={{ transformStyle: "preserve-3d", perspective: "900px" }}
            className="pointer-events-none absolute left-1/2 top-1/2 z-50 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2"
          >
            {/* ---- Floating holo panels, above ---- */}
            <HoloRow
              panels={topPanels}
              slideNumber={slideNumber}
              reduceMotion={!!reduceMotion}
              startIndex={0}
            />

            {/* ---- BEZEL — same treatment as the laptop lid ---- */}
            <div className="relative">
              {/* Ambient glow behind, matching the desktop stage glow */}
              <div className="absolute -inset-5 -z-10 rounded-[2rem] bg-accent/20 blur-[60px]" />

              <div
                className="pointer-events-auto relative overflow-hidden rounded-2xl bg-[#0a0a0c] p-2 shadow-2xl ring-1 ring-white/[0.06]"
                style={{ width: PANEL_W, height: PANEL_H }}
              >
                {/* Camera dot */}
                <div className="absolute left-1/2 top-[5px] z-20 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-zinc-700 ring-1 ring-zinc-600" />

                {/* SCREEN PANEL */}
                <div
                  className="laptop-screen relative overflow-hidden rounded-lg bg-zinc-950"
                  style={{ height: `calc(100% - ${HEADER_H}px)`, marginTop: 14 }}
                >
                  {/* Slide content, scaled to suit the larger panel.
                      Centred with absolute + translate, NOT percentage
                      margins — a percentage margin-top resolves against
                      the container's WIDTH, which pushed every slide
                      28px too high. */}
                  <div className="absolute inset-0 overflow-hidden">
                    <div
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        width: `calc(100% / ${SCALE})`,
                        height: `calc(100% / ${SCALE})`,
                        transform: `translate(-50%, -50%) scale(${SCALE})`,
                        transformOrigin: "center center",
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
                        width: slideNumber === i ? 16 : 5,
                        backgroundColor:
                          slideNumber === i
                            ? "#ff6b35"
                            : "rgba(255,255,255,0.12)",
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* ---- Floating holo panels, below ---- */}
            <HoloRow
              panels={bottomPanels}
              slideNumber={slideNumber}
              reduceMotion={!!reduceMotion}
              startIndex={2}
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function HoloRow({
  panels,
  slideNumber,
  reduceMotion,
  startIndex,
}: {
  panels: { label: string; value: string; tone?: "cool" | "warm" }[];
  slideNumber: number;
  reduceMotion: boolean;
  startIndex: number;
}) {
  if (!panels.length) return null;

  return (
    <div className="flex w-full items-center justify-center gap-2 px-2">
      <AnimatePresence mode="popLayout">
        {panels.map((panel, i) => (
          <motion.div
            key={`${slideNumber}-${panel.label}-${i}`}
            initial={{ opacity: 0, scale: 0.85, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -8 }}
            transition={{
              duration: 0.42,
              delay: reduceMotion ? 0 : (startIndex + i) * 0.07,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <motion.div
              animate={reduceMotion ? undefined : { y: [0, -5, 0] }}
              transition={{
                duration: 4.5 + i * 0.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div
                className="holo-panel animate-[var(--animate-holo-flicker)]"
                data-tone={panel.tone ?? "cool"}
                data-size="sm"
              >
                <span className="holo-label">{panel.label}</span>
                <span className="holo-value">{panel.value}</span>
                <span className="holo-scanline" />
                <span className="holo-sheen" />
              </div>
            </motion.div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
