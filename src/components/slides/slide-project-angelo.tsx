"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink } from "lucide-react";

interface SlideProps {
  isActive: boolean;
}

const tags = ["Gamification", "Character design", "Speech therapy", "Mobile-first"];

export default function SlideProjectAngelo({ isActive }: SlideProps) {
  return (
    <div className="h-full w-full overflow-y-auto bg-zinc-950">
      <motion.div
        className="p-1.5 sm:p-2.5 md:p-5"
        initial={{ opacity: 0, y: 12 }}
        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="text-[9px] font-medium uppercase tracking-[0.15em] text-accent sm:text-[10px] md:text-xs">
            Case Study
          </span>
          <span className="text-[9px] text-muted-foreground sm:text-[10px] md:text-xs">·</span>
          <span className="text-[9px] text-muted-foreground sm:text-[10px] md:text-xs">Game</span>
        </div>

        <h2 className="mt-1 font-display text-base font-medium leading-tight tracking-tight sm:text-lg md:text-xl">
          Angelo
        </h2>

        <p className="mt-0.5 text-[10px] text-muted-foreground sm:text-xs md:text-sm">
          A voice-learning game with an AI companion for language practice.
        </p>

        {/* Mockup */}
        <div className="mt-3 overflow-hidden rounded-lg border border-border/50">
          <div className="relative aspect-video">
            <Image
              src="/mockup-angelo.png"
              alt="Angelo game"
              fill
              className="object-cover object-top"
            />
          </div>
        </div>

        <div className="mt-3 space-y-2.5 sm:mt-4 sm:space-y-3">
          <div>
            <h3 className="text-[9px] font-medium uppercase tracking-wider text-muted-foreground sm:text-[10px] md:text-xs">
              What it does
            </h3>
            <p className="mt-0.5 text-[10px] leading-relaxed text-foreground/80 sm:text-xs md:text-sm">
              An AI-powered speech and language game where users practice
              conversational English with Angelo, a friendly companion.
              Real-time feedback, scoring, and progress tracking.
            </p>
          </div>

          <div>
            <h3 className="text-[9px] font-medium uppercase tracking-wider text-muted-foreground sm:text-[10px] md:text-xs">
              Key features
            </h3>
            <p className="mt-0.5 text-[10px] leading-relaxed text-foreground/80 sm:text-xs md:text-sm">
              AI voice conversations with GPT-4o-mini, text-to-speech voices,
              speech recognition, progress dashboard, streaks, and mobile-first
              design.
            </p>
          </div>

          <div>
            <h3 className="text-[9px] font-medium uppercase tracking-wider text-muted-foreground sm:text-[10px] md:text-xs">
              Stack
            </h3>
            <p className="mt-0.5 text-[10px] leading-relaxed text-foreground/80 sm:text-xs md:text-sm">
              React, TanStack Start, TypeScript, Tailwind CSS, OpenAI API
              (conversation + TTS), Cloudflare Workers, D1 database.
            </p>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5 sm:mt-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border/50 px-2 py-0.5 text-[9px] text-muted-foreground sm:text-[10px]"
            >
              {tag}
            </span>
          ))}
        </div>

        <a
          href="https://voice-quest.higgsfield.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-1.5 text-[10px] font-medium text-accent hover:underline sm:mt-4 sm:text-xs"
        >
          Visit the site <ExternalLink size={10} className="sm:size-3" />
        </a>
      </motion.div>
    </div>
  );
}
