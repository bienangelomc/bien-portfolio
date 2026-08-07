"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Sparkles, Zap, Globe, Smartphone } from "lucide-react";
import Image from "next/image";

export interface ProjectData {
  title: string;
  tag: string;
  color: string;
  image: string;
  url: string;
  description: string;
  features: string[];
  stack: string[];
  stats: { label: string; value: string }[];
  accent: string;
}

interface HologramModalProps {
  project: ProjectData | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function HologramModal({ project, isOpen, onClose }: HologramModalProps) {
  return (
    <AnimatePresence>
      {isOpen && project && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 z-40 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Hologram container */}
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
            >
              {/* Glow behind */}
              <div
                className="absolute -inset-4 rounded-2xl blur-2xl opacity-40"
                style={{ background: `radial-gradient(ellipse, ${project.accent}40, transparent 70%)` }}
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
                    borderColor: `${project.accent}50`,
                    boxShadow: `
                      inset 0 1px 0 ${project.accent}20,
                      inset 0 -1px 0 ${project.accent}10,
                      0 0 40px ${project.accent}20,
                      0 0 80px ${project.accent}10
                    `,
                  }}
                >
                  {/* Scan lines */}
                  <div
                    className="pointer-events-none absolute inset-0 z-20 opacity-[0.08]"
                    style={{
                      background:
                        "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 3px)",
                    }}
                  />

                  {/* Moving scan line */}
                  <motion.div
                    className="pointer-events-none absolute inset-x-0 top-0 z-20 h-[2px]"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)`,
                      boxShadow: `0 0 10px ${project.accent}, 0 0 20px ${project.accent}`,
                    }}
                    animate={{ top: ["0%", "100%", "0%"] }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />

                  {/* Close button */}
                  <button
                    onClick={onClose}
                    className="absolute right-2 top-2 z-30 flex h-7 w-7 items-center justify-center rounded-full bg-black/50 text-white/60 backdrop-blur transition-colors hover:bg-black/80 hover:text-white"
                  >
                    <X size={14} />
                  </button>

                  {/* Project mockup */}
                  <div className="relative aspect-video w-full border-b border-white/5">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover object-top opacity-90"
                    />
                    {/* Gradient overlay bottom */}
                    <div
                      className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-zinc-950 to-transparent"
                    />
                    {/* Category badge */}
                    <div
                      className="absolute left-3 top-3 z-10 flex items-center gap-1 rounded-full px-2 py-1 text-[9px] font-medium backdrop-blur"
                      style={{
                        backgroundColor: `${project.accent}20`,
                        color: project.accent,
                        border: `1px solid ${project.accent}30`,
                      }}
                    >
                      <Sparkles size={10} />
                      {project.tag}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-3 sm:p-4">
                    <h3
                      className="font-display text-lg font-medium leading-tight tracking-tight sm:text-xl md:text-2xl"
                      style={{ textShadow: `0 0 20px ${project.accent}40` }}
                    >
                      {project.title}
                    </h3>
                    <p className="mt-1.5 text-[11px] leading-relaxed text-zinc-400 sm:text-xs md:text-sm">
                      {project.description}
                    </p>

                    {/* Stats */}
                    <div className="mt-3 grid grid-cols-3 gap-1.5 sm:gap-2">
                      {project.stats.map((stat) => (
                        <div
                          key={stat.label}
                          className="rounded-md border border-white/5 bg-white/[0.02] p-2 text-center"
                          style={{ boxShadow: `inset 0 1px 0 ${project.accent}10` }}
                        >
                          <p
                            className="text-sm font-bold sm:text-base"
                            style={{ color: project.accent }}
                          >
                            {stat.value}
                          </p>
                          <p className="mt-0.5 text-[9px] text-zinc-500 sm:text-[10px]">
                            {stat.label}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Key features */}
                    <div className="mt-3 space-y-1.5">
                      <p className="text-[9px] font-medium uppercase tracking-wider text-zinc-500">
                        Key features
                      </p>
                      <div className="grid gap-1.5">
                        {project.features.map((feature) => (
                          <div
                            key={feature}
                            className="flex items-start gap-2"
                          >
                            <Zap
                              size={11}
                              className="mt-0.5 shrink-0"
                              style={{ color: project.accent }}
                            />
                            <p className="text-[11px] leading-relaxed text-zinc-300 sm:text-xs">
                              {feature}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tech stack */}
                    <div className="mt-3 flex flex-wrap gap-1">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border px-2 py-0.5 text-[9px]"
                          style={{
                            borderColor: `${project.accent}30`,
                            color: `${project.accent}cc`,
                            backgroundColor: `${project.accent}08`,
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Visit button */}
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all hover:scale-[1.02] active:scale-[0.98]"
                      style={{
                        background: `linear-gradient(135deg, ${project.accent}, ${project.accent}dd)`,
                        boxShadow: `0 4px 20px ${project.accent}40, inset 0 1px 0 rgba(255,255,255,0.2)`,
                        color: project.accent === "#ff6b35" ? "#fff" : "#fff",
                      }}
                    >
                      <Globe size={14} />
                      Visit live site
                      <ExternalLink size={12} />
                    </a>
                  </div>

                  {/* Bottom glow line */}
                  <div
                    className="absolute inset-x-0 bottom-0 h-px"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)`,
                      boxShadow: `0 0 10px ${project.accent}`,
                    }}
                  />
                </div>

                {/* Hologram base / projector glow */}
                <div
                  className="absolute left-1/2 top-full -z-10 h-32 w-1/2 -translate-x-1/2 opacity-60 blur-xl"
                  style={{
                    background: `linear-gradient(to bottom, ${project.accent}80, transparent)`,
                    clipPath: "polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%)",
                  }}
                />
                <div
                  className="mx-auto mt-2 h-[3px] w-2/3 rounded-full opacity-60 blur-[2px]"
                  style={{ background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)` }}
                />
                <div
                  className="mx-auto mt-0.5 h-[1px] w-1/2 rounded-full opacity-40"
                  style={{ background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)` }}
                />
              </motion.div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
