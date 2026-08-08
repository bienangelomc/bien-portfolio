"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Star, Quote } from "lucide-react";

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
    <AnimatePresence>
      {isOpen && t && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 z-40 bg-black/70 backdrop-blur-sm cursor-pointer"
            onClick={onClose}
          />

          {/* Hologram container — matches work hologram sizing */}
          <div className="absolute inset-0 z-50 flex items-center justify-center p-2 sm:p-3 md:p-5 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 80, scale: 0.8, rotateX: 20 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
              exit={{ opacity: 0, y: 60, scale: 0.85, rotateX: 15 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 25,
                mass: 0.8,
              }}
              style={{
                transformStyle: "preserve-3d",
                perspective: "800px",
              }}
              data-modal-open="true"
              className="pointer-events-auto relative w-[90%] max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Glow behind */}
              <div
                className="absolute -inset-4 rounded-2xl blur-2xl opacity-40"
                style={{ background: `radial-gradient(ellipse, ${t.accent}40, transparent 70%)` }}
              />

              {/* Floating animation wrapper */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {/* Hologram card */}
                <div
                  className="relative overflow-hidden rounded-xl border bg-zinc-950/90"
                  style={{
                    borderColor: `${t.accent}50`,
                    boxShadow: `0 0 40px ${t.accent}20, inset 0 1px 0 ${t.accent}20`,
                  }}
                >
                  {/* Scan lines */}
                  <div
                    className="pointer-events-none absolute inset-0 z-10 opacity-[0.06]"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.4) 2px, rgba(255,255,255,0.4) 3px)",
                    }}
                  />

                  {/* Top bar */}
                  <div
                    className="flex items-center justify-between border-b px-3 py-1.5 sm:px-4 sm:py-2"
                    style={{ borderColor: `${t.accent}20`, background: `${t.accent}08` }}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="h-2 w-2 rounded-full"
                        style={{ background: t.accent, boxShadow: `0 0 8px ${t.accent}` }}
                      />
                      <span className="text-[10px] font-mono tracking-wider sm:text-xs" style={{ color: `${t.accent}cc` }}>
                        CLIENT TESTIMONIAL
                      </span>
                    </div>
                    <button
                      onClick={onClose}
                      className="flex h-5 w-5 items-center justify-center rounded-sm transition hover:bg-white/10 sm:h-6 sm:w-6"
                    >
                      <X size={12} className="text-zinc-400 sm:w-3.5 sm:h-3.5" />
                    </button>
                  </div>

                  {/* Video */}
                  <div className="relative">
                    <video
                      className="w-full aspect-video"
                      src={t.video}
                      controls
                      autoPlay
                      playsInline
                      controlsList="nodownload"
                    />

                    {/* Moving scan line */}
                    <motion.div
                      className="pointer-events-none absolute inset-x-0 h-[2px] z-10"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${t.accent}80, transparent)`,
                      }}
                      animate={{ top: ["0%", "100%"] }}
                      transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
                    />

                    {/* Corner brackets */}
                    <div className="pointer-events-none absolute inset-0 z-10">
                      <div
                        className="absolute left-1 top-1 h-2.5 w-2.5 border-l-2 border-t-2 sm:h-3 sm:w-3"
                        style={{ borderColor: `${t.accent}80` }}
                      />
                      <div
                        className="absolute right-1 top-1 h-2.5 w-2.5 border-r-2 border-t-2 sm:h-3 sm:w-3"
                        style={{ borderColor: `${t.accent}80` }}
                      />
                      <div
                        className="absolute bottom-1 left-1 h-2.5 w-2.5 border-b-2 border-l-2 sm:h-3 sm:w-3"
                        style={{ borderColor: `${t.accent}80` }}
                      />
                      <div
                        className="absolute bottom-1 right-1 h-2.5 w-2.5 border-b-2 border-r-2 sm:h-3 sm:w-3"
                        style={{ borderColor: `${t.accent}80` }}
                      />
                    </div>
                  </div>

                  {/* Info section */}
                  <div
                    className="border-t px-3 py-2.5 sm:px-4 sm:py-3"
                    style={{ borderColor: `${t.accent}20` }}
                  >
                    {/* Stars */}
                    <div className="flex gap-0.5 mb-1.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          style={{ color: t.accent, fill: t.accent }}
                          className="sm:w-3.5 sm:h-3.5"
                        />
                      ))}
                    </div>

                    {/* Quote */}
                    <Quote size={14} style={{ color: `${t.accent}50` }} className="mb-1 sm:w-4 sm:h-4" />
                    <p className="text-xs italic text-zinc-300 leading-relaxed sm:text-sm">
                      "{t.quote}"
                    </p>

                    {/* Name */}
                    <div className="mt-2 flex items-center justify-between">
                      <div>
                        <p
                          className="text-sm font-bold sm:text-base"
                          style={{ color: t.accent }}
                        >
                          {t.name}
                        </p>
                        <p className="text-[10px] text-zinc-400 sm:text-xs">
                          {t.role}
                        </p>
                      </div>
                      <div
                        className="rounded-full border px-2 py-0.5 text-[9px] font-mono sm:text-[10px]"
                        style={{ borderColor: `${t.accent}40`, color: `${t.accent}cc` }}
                      >
                        VERIFIED
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom reflection */}
                <div
                  className="mx-auto mt-1 h-4 w-[80%] blur-xl opacity-30 sm:mt-2 sm:h-6"
                  style={{ background: t.accent }}
                />
              </motion.div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
