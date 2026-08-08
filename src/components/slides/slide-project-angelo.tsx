"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink } from "lucide-react";

interface SlideProps {
  isActive: boolean;
}

export default function SlideProjectAngelo({ isActive }: SlideProps) {
  return (
    <div className="flex h-full w-full items-center justify-center overflow-hidden bg-zinc-950 p-1.5 sm:p-3 md:p-5">
      <motion.div
        className="w-full max-w-lg flex flex-col h-full justify-center"
        initial={{ opacity: 0, y: 12 }}
        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center gap-1 sm:gap-2">
          <span className="text-[6px] font-medium uppercase tracking-[0.15em] text-accent sm:text-[10px] md:text-xs">
            Case Study
          </span>
          <span className="text-[6px] text-muted-foreground sm:text-[10px] md:text-xs">·</span>
          <span className="text-[6px] text-muted-foreground sm:text-[10px] md:text-xs">Game</span>
        </div>

        <h2 className="mt-0.5 font-display text-[11px] font-medium leading-tight tracking-tight sm:text-lg md:text-xl">
          Angelo
        </h2>

        <p className="mt-0.5 text-[6px] text-muted-foreground sm:text-xs md:text-sm line-clamp-2">
          AI-powered voice and language learning game with a friendly companion for natural conversation practice.
        </p>

        {/* Mockup */}
        <div className="mt-1 overflow-hidden rounded-lg border border-border/50 sm:mt-3">
          <div className="relative aspect-[16/7] sm:aspect-video">
            <Image
              src="/mockup-angelo.png"
              alt="Angelo game"
              fill
              className="object-cover object-top"
            />
          </div>
        </div>

        {/* Stats row */}
        <div className="mt-1 grid grid-cols-3 gap-1 sm:mt-3 sm:gap-2">
          <div className="rounded border border-border/40 bg-card/20 px-1 py-0.5 text-center sm:p-2">
            <p className="text-[8px] font-bold text-accent sm:text-sm md:text-lg">Live</p>
            <p className="text-[4.5px] text-muted-foreground sm:text-[8px] md:text-[10px]">AI Voice</p>
          </div>
          <div className="rounded border border-border/40 bg-card/20 px-1 py-0.5 text-center sm:p-2">
            <p className="text-[8px] font-bold text-accent sm:text-sm md:text-lg">GPT-4o</p>
            <p className="text-[4.5px] text-muted-foreground sm:text-[8px] md:text-[10px]">Powered</p>
          </div>
          <div className="rounded border border-border/40 bg-card/20 px-1 py-0.5 text-center sm:p-2">
            <p className="text-[8px] font-bold text-accent sm:text-sm md:text-lg">10/10</p>
            <p className="text-[4.5px] text-muted-foreground sm:text-[8px] md:text-[10px]">Fun factor</p>
          </div>
        </div>

        {/* Tags + link */}
        <div className="mt-1 flex items-center justify-between sm:mt-3">
          <div className="flex flex-wrap gap-0.5 sm:gap-1.5">
            {["Gamification", "AI Voice", "Mobile-first"].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border/50 px-1 py-0.5 text-[5px] text-muted-foreground sm:text-[10px] sm:px-2"
              >
                {tag}
              </span>
            ))}
          </div>
          <a
            href="https://voice-quest.higgsfield.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 ml-1 inline-flex items-center gap-0.5 text-[6px] font-medium text-accent hover:underline sm:text-xs sm:gap-1.5"
          >
            Visit <ExternalLink size={6} className="sm:size-3" />
          </a>
        </div>
      </motion.div>
    </div>
  );
}
