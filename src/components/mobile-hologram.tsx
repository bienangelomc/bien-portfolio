"use client";

import { motion, AnimatePresence } from "framer-motion";

interface MobileHologramProps {
  isOpen: boolean;
  slideNumber: number;
  totalSlides: number;
  children: React.ReactNode;
}

const SCALE = 1.7;

export default function MobileHologram({
  isOpen,
  slideNumber,
  totalSlides,
  children,
}: MobileHologramProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop — pointer-events-none so scroll passes through */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0 z-40 bg-black/65 backdrop-blur-sm pointer-events-none"
          />

          {/* Projection beam from laptop */}
          <motion.div
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 0.4, scaleY: 1 }}
            exit={{ opacity: 0, scaleY: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="pointer-events-none absolute left-1/2 top-[58%] z-40 h-16 w-28 -translate-x-1/2"
            style={{
              background:
                "linear-gradient(to top, rgba(74, 222, 128, 0.2), transparent)",
              clipPath: "polygon(35% 100%, 65% 100%, 58% 0%, 42% 0%)",
              transformOrigin: "bottom center",
            }}
          />

          {/* Hologram panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.75, y: 80, rotateX: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 50, rotateX: 20 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 28,
              mass: 0.8,
            }}
            style={{
              transformStyle: "preserve-3d",
              perspective: "800px",
            }}
            className="absolute left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
          >
            {/* Glow behind */}
            <div className="absolute -inset-3 rounded-2xl blur-2xl opacity-25 bg-accent" />

            <div
              className="relative overflow-hidden rounded-xl border border-accent/40 bg-zinc-950/95"
              style={{
                width: "92vw",
                height: "66vh",
                boxShadow:
                  "0 0 50px rgba(74, 222, 128, 0.12), inset 0 1px 0 rgba(74, 222, 128, 0.1)",
              }}
            >
              {/* Scan lines */}
              <div
                className="pointer-events-none absolute inset-0 z-10 opacity-[0.04]"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 3px)",
                }}
              />

              {/* Corner brackets */}
              <div className="pointer-events-none absolute inset-0 z-30">
                <div className="absolute left-1.5 top-1.5 h-3 w-3 border-l-2 border-t-2 border-accent/70" />
                <div className="absolute right-1.5 top-1.5 h-3 w-3 border-r-2 border-t-2 border-accent/70" />
                <div className="absolute bottom-1.5 left-1.5 h-3 w-3 border-b-2 border-l-2 border-accent/70" />
                <div className="absolute bottom-1.5 right-1.5 h-3 w-3 border-b-2 border-r-2 border-accent/70" />
              </div>

              {/* Top HUD bar */}
              <div className="absolute left-0 right-0 top-0 z-30 flex items-center justify-between border-b border-accent/15 bg-zinc-950/70 px-3 py-2 backdrop-blur-sm">
                <div className="flex items-center gap-1.5">
                  <div
                    className="h-1.5 w-1.5 rounded-full bg-accent"
                    style={{ boxShadow: "0 0 6px rgba(74, 222, 128, 0.8)" }}
                  />
                  <span className="text-[10px] font-mono tracking-wider text-accent/80">
                    {String(slideNumber + 1).padStart(2, "0")} /{" "}
                    {String(totalSlides).padStart(2, "0")}
                  </span>
                </div>
                {/* Progress dots */}
                <div className="flex gap-1">
                  {Array.from({ length: totalSlides }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 rounded-full transition-all duration-300 ${
                        i === slideNumber ? "w-4 bg-accent" : "w-1 bg-white/20"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Scaled content — fills entire hologram */}
              <div className="absolute inset-0 overflow-hidden">
                <div
                  style={{
                    transform: `scale(${SCALE})`,
                    transformOrigin: "top left",
                    width: `calc(92vw / ${SCALE})`,
                    height: `calc(66vh / ${SCALE})`,
                    position: "absolute",
                    top: 0,
                    left: 0,
                  }}
                >
                  {children}
                </div>
              </div>

              {/* Moving scan line */}
              <motion.div
                className="pointer-events-none absolute inset-x-0 h-[2px] z-20"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(74, 222, 128, 0.5), transparent)",
                }}
                animate={{ top: ["0%", "100%"] }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              />

              {/* Bottom glow gradient */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-accent/8 to-transparent z-10" />
            </div>

            {/* Bottom reflection on desk */}
            <div className="mx-auto mt-0.5 h-2 w-[75%] rounded-full bg-accent opacity-15 blur-md" />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
