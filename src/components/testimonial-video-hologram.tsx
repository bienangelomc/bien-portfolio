"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface TestimonialVideoHologramProps {
  selectedIndex: number | null;
  onClose: () => void;
}

const testimonials = [
  {
    name: "Tracey",
    role: "Digital Product Marketer",
    quote:
      "You saved me a lot of time and started my online business quickly. I cannot thank you enough.",
    video:
      "https://d2ol7oe51mr4n9.cloudfront.net/user_3HWb5DRLDrXcSCum0mDA7fFLQjg/42299dd6-aead-442b-950c-f1fe7a91bfb9.mp4",
    accent: "rgb(74, 222, 128)",
  },
  {
    name: "Meg",
    role: "Digital Product Marketer",
    quote:
      "I would still be lost and in the weeds if it wasn't for you. Everything went very seamlessly.",
    video:
      "https://d2ol7oe51mr4n9.cloudfront.net/user_3HWb5DRLDrXcSCum0mDA7fFLQjg/7bef120e-32a7-4c75-8804-523341fe5973.mp4",
    accent: "rgb(56, 189, 248)",
  },
];

export default function TestimonialVideoHologram({
  selectedIndex,
  onClose,
}: TestimonialVideoHologramProps) {
  const isOpen = selectedIndex !== null;
  const t = selectedIndex !== null ? testimonials[selectedIndex] : null;

  return (
    <div className="pointer-events-none absolute inset-0 z-[60] flex items-center justify-center">
      <AnimatePresence mode="wait">
        {isOpen && t && (
          <motion.div
            className="absolute inset-0 pointer-events-auto cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

            {/* Hologram content — bigger than screen, floating above */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-xl pointer-events-auto"
              initial={{ opacity: 0, scale: 0.8, y: "20%" }}
              animate={{ opacity: 1, scale: 1, y: "-50%" }}
              exit={{ opacity: 0, scale: 0.8, y: "20%" }}
              transition={{ type: "spring", damping: 22, stiffness: 280 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Outer glow */}
              <div
                className="absolute -inset-2 rounded-2xl blur-2xl opacity-40"
                style={{ background: t.accent }}
              />

              {/* Projection beam from screen */}
              <div
                className="absolute left-1/2 -bottom-8 h-12 w-32 -translate-x-1/2 opacity-30"
                style={{
                  background: `linear-gradient(to top, transparent, ${t.accent})`,
                  clipPath: "polygon(30% 100%, 70% 100%, 60% 0%, 40% 0%)",
                }}
              />

              {/* Corner brackets */}
              <div
                className="absolute -left-2 -top-2 h-4 w-4 border-l-2 border-t-2 sm:h-6 sm:w-6"
                style={{ borderColor: t.accent }}
              />
              <div
                className="absolute -right-2 -top-2 h-4 w-4 border-r-2 border-t-2 sm:h-6 sm:w-6"
                style={{ borderColor: t.accent }}
              />
              <div
                className="absolute -bottom-2 -left-2 h-4 w-4 border-b-2 border-l-2 sm:h-6 sm:w-6"
                style={{ borderColor: t.accent }}
              />
              <div
                className="absolute -bottom-2 -right-2 h-4 w-4 border-b-2 border-r-2 sm:h-6 sm:w-6"
                style={{ borderColor: t.accent }}
              />

              {/* Video frame */}
              <div className="relative overflow-hidden rounded-xl border border-white/10 bg-black shadow-2xl">
                <video
                  className="w-full"
                  src={t.video}
                  controls
                  autoPlay
                  playsInline
                  controlsList="nodownload"
                />

                {/* Hologram scan line */}
                <motion.div
                  className="pointer-events-none absolute inset-x-0 h-[2px]"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${t.accent}80, transparent)`,
                  }}
                  animate={{ top: ["0%", "100%"] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
                />

                {/* Hologram vignette */}
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    boxShadow: `inset 0 0 60px ${t.accent}20`,
                  }}
                />
              </div>

              {/* Info */}
              <div className="mt-3 text-center sm:mt-4">
                <motion.p
                  className="text-sm font-bold sm:text-base md:text-lg"
                  style={{ color: t.accent }}
                >
                  {t.name}
                </motion.p>
                <p className="text-xs text-muted-foreground sm:text-sm">
                  {t.role}
                </p>
                <p className="mt-1.5 text-xs text-foreground/80 italic sm:text-sm md:text-base">
                  "{t.quote}"
                </p>
              </div>

              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute -top-3 -right-3 flex h-7 w-7 items-center justify-center rounded-full bg-zinc-800 text-white ring-1 ring-white/20 transition hover:bg-zinc-700 sm:h-8 sm:w-8"
              >
                <X size={14} className="sm:w-4 sm:h-4" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
