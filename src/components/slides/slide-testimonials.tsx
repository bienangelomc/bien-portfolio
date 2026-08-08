"use client";

import { motion } from "framer-motion";
import { useRef, useEffect } from "react";
import { Quote, Star, Play } from "lucide-react";

interface SlideProps {
  isActive: boolean;
  onOpenVideo?: (index: number) => void;
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

export default function SlideTestimonials({ isActive, onOpenVideo }: SlideProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-play videos when slide is active
  useEffect(() => {
    if (isActive) {
      const videos = document.querySelectorAll(".testimonial-video");
      videos.forEach((v, i) => {
        const el = v as HTMLVideoElement;
        setTimeout(() => {
          el.muted = true;
          el.playsInline = true;
          el.play().catch(() => {});
        }, i * 300);
      });
    }
  }, [isActive]);

  return (
    <div
      ref={containerRef}
      className="relative flex h-full w-full items-center justify-center overflow-hidden bg-zinc-950 p-1.5 sm:p-3 md:p-5"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(74, 222, 128, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(74, 222, 128, 0.5) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Scan lines overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08] z-20"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(74, 222, 128, 0.4) 2px, rgba(74, 222, 128, 0.4) 3px)",
        }}
      />

      {/* Ambient glows */}
      <motion.div
        className="absolute top-1/4 left-0 h-20 w-20 rounded-full bg-accent/15 blur-3xl sm:h-32 sm:w-32 md:h-48 md:w-48"
        animate={{ x: [0, 10, 0], y: [0, -5, 0], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-0 h-16 w-16 rounded-full bg-sky-500/10 blur-3xl sm:h-24 sm:w-24 md:h-40 md:w-40"
        animate={{ x: [0, -8, 0], y: [0, 5, 0], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <div className="relative z-10 w-full max-w-lg flex flex-col h-full justify-center">
        {/* Header */}
        <motion.div
          className="mb-2 text-center sm:mb-3 md:mb-4"
          initial={{ opacity: 0, y: -10 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <p className="text-[6px] font-medium uppercase tracking-[0.25em] text-accent sm:text-[8px] md:text-xs">
            ◆ Client Reviews ◆
          </p>
          <h2 className="mt-0.5 font-display text-[11px] font-medium leading-tight tracking-tight sm:text-base md:text-2xl">
            Real people, real results
          </h2>
        </motion.div>

        {/* Testimonial cards — hologram style */}
        <div className="flex-1 flex flex-col justify-center space-y-1.5 sm:space-y-2 md:space-y-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              className="relative group cursor-pointer"
              onClick={() => onOpenVideo?.(i)}
              initial={{ opacity: 0, x: i === 0 ? -30 : 30, scale: 0.9 }}
              animate={
                isActive
                  ? { opacity: 1, x: 0, scale: 1 }
                  : { opacity: 0, x: i === 0 ? -30 : 30, scale: 0.9 }
              }
              transition={{ duration: 0.6, delay: 0.2 + i * 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Hologram frame glow */}
              <div
                className="absolute -inset-px rounded-lg blur-md opacity-40 group-hover:opacity-70 transition-opacity"
                style={{
                  background: `linear-gradient(135deg, ${t.accent}, transparent 50%, ${t.accent}40)`,
                }}
              />

              <div className="relative overflow-hidden rounded-lg border border-white/10 bg-zinc-900/60 backdrop-blur-sm">
                {/* Corner brackets — hologram style */}
                <div
                  className="absolute left-0 top-0 h-2 w-2 border-l-2 border-t-2 z-10 sm:h-3 sm:w-3 md:h-4 md:w-4"
                  style={{ borderColor: t.accent }}
                />
                <div
                  className="absolute right-0 top-0 h-2 w-2 border-r-2 border-t-2 z-10 sm:h-3 sm:w-3 md:h-4 md:w-4"
                  style={{ borderColor: t.accent }}
                />
                <div
                  className="absolute bottom-0 left-0 h-2 w-2 border-b-2 border-l-2 z-10 sm:h-3 sm:w-3 md:h-4 md:w-4"
                  style={{ borderColor: t.accent }}
                />
                <div
                  className="absolute bottom-0 right-0 h-2 w-2 border-b-2 border-r-2 z-10 sm:h-3 sm:w-3 md:h-4 md:w-4"
                  style={{ borderColor: t.accent }}
                />

                {/* Horizontal scan line moving */}
                <motion.div
                  className="absolute left-0 right-0 h-[2px] z-10 pointer-events-none"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${t.accent}80, transparent)`,
                  }}
                  animate={{ top: ["0%", "100%"] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * 1.5,
                  }}
                />

                <div className="flex flex-row items-stretch gap-1.5 p-1.5 sm:gap-2 sm:p-2.5 md:gap-3 md:p-3">
                  {/* Video thumbnail with hologram frame */}
                  <div className="relative shrink-0 w-[32%]">
                    <div className="relative overflow-hidden rounded-md border border-white/10 sm:rounded-lg">
                      <video
                        className="testimonial-video w-full aspect-video object-cover pointer-events-none"
                        src={t.video}
                        muted
                        loop
                        playsInline
                      />

                      {/* Hologram overlay on video */}
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent" />

                      {/* Clickable overlay with play indicator */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div
                          className="flex h-7 w-7 items-center justify-center rounded-full transition-transform group-hover:scale-110 sm:h-9 sm:w-9 md:h-10 md:w-10"
                          style={{ backgroundColor: `${t.accent}30`, border: `1.5px solid ${t.accent}80`, boxShadow: `0 0 12px ${t.accent}40` }}
                        >
                          <Play size={10} fill={t.accent} style={{ color: t.accent }} className="ml-0.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                        </div>
                      </div>

                      {/* Scan line on video */}
                      <motion.div
                        className="absolute inset-x-0 h-[1px] pointer-events-none"
                        style={{ background: `${t.accent}60` }}
                        animate={{ top: ["0%", "100%"] }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "linear",
                          delay: i * 0.8,
                        }}
                      />
                    </div>
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                    {/* Stars */}
                    <div className="flex gap-0.5 mb-0.5 sm:mb-1">
                      {[...Array(5)].map((_, j) => (
                        <Star
                          key={j}
                          size={6}
                          style={{ color: t.accent, fill: t.accent }}
                          className="sm:w-[8px] sm:h-[8px] md:w-3 md:h-3"
                        />
                      ))}
                    </div>

                    <Quote size={8} style={{ color: `${t.accent}60` }} className="mb-0.5 sm:w-3 sm:h-3 md:w-4 md:h-4" />
                    <p className="text-[6px] leading-relaxed text-foreground/90 sm:text-[8px] md:text-xs line-clamp-3">
                      "{t.quote}"
                    </p>

                    <div className="mt-0.5 sm:mt-1">
                      <p className="text-[6px] font-semibold sm:text-[8px] md:text-sm" style={{ color: t.accent }}>
                        {t.name}
                      </p>
                      <p className="text-[5px] text-muted-foreground sm:text-[7px] md:text-[11px]">
                        {t.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom hologram note */}
        <motion.div
          className="mt-2 text-center sm:mt-3"
          initial={{ opacity: 0 }}
          animate={isActive ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <p className="text-[5px] font-mono text-muted-foreground/50 sm:text-[7px] md:text-[10px]">
            // click to watch full video
          </p>
        </motion.div>
      </div>
    </div>
  );
}
