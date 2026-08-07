"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink } from "lucide-react";

interface SlideProps {
  isActive: boolean;
}

const tags = ["Finance", "SaaS", "Payments", "Mobile app"];

export default function SlideProjectVoiceCare({ isActive }: SlideProps) {
  return (
    <div className="h-full w-full overflow-y-auto bg-white dark:bg-zinc-950">
      <motion.div
        className="p-2 sm:p-3 md:p-5"
        initial={{ opacity: 0, y: 12 }}
        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="text-[9px] font-medium uppercase tracking-[0.15em] text-accent sm:text-[10px] md:text-xs">
            Case Study
          </span>
          <span className="text-[9px] text-muted-foreground sm:text-[10px] md:text-xs">·</span>
          <span className="text-[9px] text-muted-foreground sm:text-[10px] md:text-xs">Web App</span>
        </div>

        <h2 className="mt-1 font-display text-base font-medium leading-tight tracking-tight sm:text-lg md:text-xl">
          Smart Budget Tracker
        </h2>

        <p className="mt-0.5 text-[10px] text-muted-foreground sm:text-xs md:text-sm">
          A modern budgeting app with AI-powered insights and live PayPal payments.
        </p>

        <div className="mt-3 overflow-hidden rounded-lg border border-border/50">
          <div className="relative aspect-video">
            <Image
              src="/mockup-smart-budget.png"
              alt="Smart Budget Tracker"
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
              Categorized budgets, visual reports, savings goals, and bill
              reminders — all in a fast, clean interface. AI spending insights
              help users understand their habits.
            </p>
          </div>

          <div>
            <h3 className="text-[9px] font-medium uppercase tracking-wider text-muted-foreground sm:text-[10px] md:text-xs">
              Key features
            </h3>
            <p className="mt-0.5 text-[10px] leading-relaxed text-foreground/80 sm:text-xs md:text-sm">
              Transaction import, PayPal payments for Pro subscriptions,
              bank-level encryption, lightning-fast dashboard, native iOS and
              Android via Capacitor.
            </p>
          </div>

          <div>
            <h3 className="text-[9px] font-medium uppercase tracking-wider text-muted-foreground sm:text-[10px] md:text-xs">
              Stack
            </h3>
            <p className="mt-0.5 text-[10px] leading-relaxed text-foreground/80 sm:text-xs md:text-sm">
              Next.js 16, React 19, TypeScript, Tailwind CSS, D1 SQL,
              Cloudflare Workers, PayPal REST API, Capacitor (iOS + Android).
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
          href="https://smart-budget-tracker.higgsfield.app/"
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
