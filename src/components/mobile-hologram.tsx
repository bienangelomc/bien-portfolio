"use client";

import { motion, AnimatePresence } from "framer-motion";

interface MobileHologramProps {
  isOpen: boolean;
  slideNumber: number;
  totalSlides: number;
  children: React.ReactNode;
}

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
            className="absolute inset-0 z-40 bg-black/70 backdrop-blur-sm pointer-events-none"
          />

          {/* Projection beam from laptop */}
          <motion.div
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 0.3, scaleY: 1 }}
            exit={{ opacity: 0, scaleY: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="pointer-events-none absolute left-1/2 top-[55%] z-40 h-12 w-24 -translate-x-1/2"
            style={{
              background:
                "linear-gradient(to top, rgba(74, 222, 128, 0.15), transparent)",
              clipPath: "polygon(35% 100%, 65% 100%, 58% 0%, 42% 0%)",
              transformOrigin: "bottom center",
            }}
          />

          {/* Hologram panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 60, rotateX: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 40, rotateX: 15 }}
            transition={{
              type: "spring",
              stiffness: 180,
              damping: 26,
              mass: 0.8,
            }}
            style={{
              transformStyle: "preserve-3d",
              perspective: "800px",
            }}
            className="absolute left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2"
          >
            {/* Glow behind */}
            <div className="absolute -inset-2 rounded-2xl blur-2xl opacity-20 bg-accent" />

            <div
              className="relative overflow-hidden rounded-xl border border-accent/40 bg-zinc-950/97"
              style={{
                width: "95vw",
                height: "78vh",
                boxShadow:
                  "0 0 40px rgba(74, 222, 128, 0.1), inset 0 1px 0 rgba(74, 222, 128, 0.1)",
              }}
            >
              {/* Scan lines */}
              <div
                className="pointer-events-none absolute inset-0 z-10 opacity-[0.03]"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 3px)",
                }}
              />

              {/* Corner brackets */}
              <div className="pointer-events-none absolute inset-0 z-30">
                <div className="absolute left-1.5 top-1.5 h-3 w-3 border-l-2 border-t-2 border-accent/60" />
                <div className="absolute right-1.5 top-1.5 h-3 w-3 border-r-2 border-t-2 border-accent/60" />
                <div className="absolute bottom-1.5 left-1.5 h-3 w-3 border-b-2 border-l-2 border-accent/60" />
                <div className="absolute bottom-1.5 right-1.5 h-3 w-3 border-b-2 border-r-2 border-accent/60" />
              </div>

              {/* Top HUD bar */}
              <div className="absolute left-0 right-0 top-0 z-30 flex items-center justify-between border-b border-accent/15 bg-zinc-950/80 px-3 py-1.5 backdrop-blur-sm">
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
                        i === slideNumber ? "w-4 bg-accent" : "w-1 bg-white/15"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Content area — below HUD bar, fills rest of panel */}
              <div className="absolute left-0 right-0 top-[32px] bottom-0 overflow-hidden">
                {children}
              </div>

              {/* Moving scan line */}
              <motion.div
                className="pointer-events-none absolute inset-x-0 h-[2px] z-20"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(74, 222, 128, 0.4), transparent)",
                }}
                animate={{ top: ["0%", "100%"] }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              />
            </div>

            {/* Bottom reflection */}
            <div className="mx-auto mt-0.5 h-1.5 w-[70%] rounded-full bg-accent opacity-10 blur-md" />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
