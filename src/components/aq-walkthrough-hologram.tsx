"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { X, Globe, LayoutGrid, Send } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * The three surfaces of the AQ system, as a projected walkthrough.
 *
 * `src` is intentionally empty until the real recordings exist. Nothing in the
 * UI offers a walkthrough while they are — see `hasWalkthrough` — because a
 * portfolio that promises a demo and plays nothing is worse than one that
 * never promised it. Drop the URLs in and the button appears on its own.
 */
export const AQ_CHAPTERS = [
  {
    id: "website",
    icon: Globe,
    label: "The website",
    blurb:
      "A customer picks their service, beds and baths, and watches the price build line by line — from the owner's own rate card.",
    src: "",
    poster: "/mockup-aq-cleaning.png",
  },
  {
    id: "telegram",
    icon: Send,
    label: "The Telegram bot",
    blurb:
      "The quote lands on her phone with the price, the held slot and two buttons. Approve sends it; nothing reaches the customer before that.",
    src: "",
    poster: "",
  },
  {
    id: "toolkit",
    icon: LayoutGrid,
    label: "The toolkit",
    blurb:
      "Accepted jobs arrive in her calendar on their own, priced by the same rate card that quoted them.",
    src: "",
    poster: "",
  },
] as const;

/** True once at least one chapter has footage. Gates the trigger button. */
export const hasWalkthrough = AQ_CHAPTERS.some((c) => c.src.length > 0);

export default function AQWalkthroughHologram({ isOpen, onClose }: Props) {
  const [active, setActive] = useState(0);

  // Always reopen on chapter one — resuming mid-story confuses more than it saves.
  useEffect(() => {
    if (isOpen) setActive(0);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  const chapter = AQ_CHAPTERS[active];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 z-[60] cursor-pointer bg-black/80 backdrop-blur-md"
            onClick={onClose}
          />

          <div className="pointer-events-none absolute inset-0 z-[70] flex items-center justify-center p-2 sm:p-3 md:p-5">
            <motion.div
              initial={{ opacity: 0, y: 80, scale: 0.8, rotateX: 20 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
              exit={{ opacity: 0, y: 60, scale: 0.85, rotateX: 15 }}
              transition={{ type: "spring", stiffness: 260, damping: 25, mass: 0.8 }}
              style={{ transformStyle: "preserve-3d", perspective: "800px" }}
              data-modal-open="true"
              className="pointer-events-auto relative w-[92%] max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl"
            >
              <div className="overflow-hidden rounded-xl border border-cyan-400/30 bg-[#06080c]/95 shadow-[0_0_60px_-12px_rgba(56,189,248,0.45)]">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-cyan-400/20 px-3 py-2">
                  <div>
                    <p className="text-[8px] font-medium uppercase tracking-[0.2em] text-cyan-300 sm:text-[10px]">
                      Walkthrough
                    </p>
                    <p className="text-xs font-semibold text-white sm:text-sm">
                      AQ Cleaning Services
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close walkthrough"
                    className="rounded-full p-1 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>

                {/* Chapter tabs */}
                <div className="flex gap-1 px-3 pt-2">
                  {AQ_CHAPTERS.map((c, i) => {
                    const Icon = c.icon;
                    const on = i === active;
                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setActive(i)}
                        className={`flex flex-1 items-center justify-center gap-1 rounded-md border px-1.5 py-1 text-[8px] font-medium transition-colors sm:text-[10px] ${
                          on
                            ? "border-cyan-400/60 bg-cyan-400/10 text-cyan-200"
                            : "border-white/10 text-white/50 hover:text-white/80"
                        }`}
                      >
                        <Icon className="h-2.5 w-2.5 shrink-0" />
                        {c.label}
                      </button>
                    );
                  })}
                </div>

                {/* Stage */}
                <div className="px-3 py-2">
                  <div className="relative aspect-video overflow-hidden rounded-lg border border-white/10 bg-black">
                    {chapter.src ? (
                      <video
                        key={chapter.id}
                        className="h-full w-full object-cover"
                        src={chapter.src}
                        poster={chapter.poster || undefined}
                        autoPlay
                        muted
                        loop
                        playsInline
                        controls
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center px-4 text-center">
                        <p className="text-[9px] text-white/40 sm:text-[11px]">
                          Recording not added yet.
                        </p>
                      </div>
                    )}

                    {/* Scanlines — the projected look, not a real CRT */}
                    <div
                      className="pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-screen"
                      style={{
                        backgroundImage:
                          "repeating-linear-gradient(to bottom, rgba(56,189,248,0.6) 0px, rgba(56,189,248,0.6) 1px, transparent 1px, transparent 3px)",
                      }}
                    />
                  </div>

                  <motion.p
                    key={chapter.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    className="mt-2 text-[9px] leading-relaxed text-white/70 sm:text-[11px]"
                  >
                    {chapter.blurb}
                  </motion.p>
                </div>
              </div>

              {/* Projection glow beneath the panel */}
              <div
                className="pointer-events-none absolute -bottom-6 left-1/2 h-10 w-3/4 -translate-x-1/2 rounded-full bg-cyan-400/25 blur-2xl"
                aria-hidden
              />
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
