"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

interface SlideProps {
  isActive: boolean;
}

const tags = ["Gamification", "Character design", "Speech therapy", "Mobile-first"];

export default function SlideProjectAngelo({ isActive }: SlideProps) {
  return (
    <div className="h-full w-full overflow-y-auto bg-white dark:bg-zinc-950">
      <motion.div
        className="p-6 md:p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium uppercase tracking-[0.15em] text-accent">
            Case Study
          </span>
          <span className="text-xs text-muted-foreground">·</span>
          <span className="text-xs text-muted-foreground">Gamified App</span>
        </div>

        <h2 className="mt-2 font-display text-2xl font-medium leading-tight tracking-tight md:text-3xl">
          Angelo
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          A gamified speech-training companion app with an animated AI guide.
        </p>

        <div className="mt-5 overflow-hidden rounded-xl border border-border/50">
          <div className="relative aspect-video">
            <Image
              src="/mockup-angelo.png"
              alt="Angelo speech training app"
              fill
              className="object-cover object-top"
            />
          </div>
        </div>

        <div className="mt-5 space-y-3">
          <div>
            <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Why a game
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-foreground/80">
              Levels, XP, a world map, daily quests, streaks, mini-games and a
              friendship system — so daily speech practice feels like an
              adventure rather than a clinical exercise. Think Duolingo meets
              Finch meets Pokémon.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              The companion
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-foreground/80">
              Angelo is an animated character with idle motion, blinking and
              lip sync who walks the user through their practice. Multi-language
              from the first screen.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Safety
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-foreground/80">
              Same constraint as VoiceCare — never diagnostic, compares only
              against the user's own past recordings.
            </p>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border/50 px-2.5 py-0.5 text-[11px] text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
