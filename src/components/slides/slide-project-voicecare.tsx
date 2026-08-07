"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CheckCircle2, ExternalLink } from "lucide-react";

interface SlideProps {
  isActive: boolean;
}

const tags = ["Finance", "SaaS", "Next.js", "D1 SQL", "Payments"];

export default function SlideProjectVoiceCare({ isActive }: SlideProps) {
  return (
    <div className="h-full w-full overflow-y-auto bg-white dark:bg-zinc-950">
      <motion.div
        className="p-5 md:p-6"
        initial={{ opacity: 0, y: 16 }}
        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-accent md:text-xs">
            Case Study
          </span>
          <span className="text-[11px] text-muted-foreground md:text-xs">·</span>
          <span className="text-[11px] text-muted-foreground md:text-xs">Web App</span>
        </div>

        <h2 className="mt-2 font-display text-xl font-medium leading-tight tracking-tight md:text-2xl">
          Smart Budget Tracker
        </h2>

        <p className="mt-1 text-[11px] text-muted-foreground md:text-sm">
          A modern budgeting app with AI-powered insights, live PayPal payments,
          and native mobile via Capacitor.
        </p>

        <div className="mt-4 overflow-hidden rounded-lg border border-border/50">
          <div className="relative aspect-video">
            <Image
              src="/mockup-smart-budget.png"
              alt="Smart Budget Tracker"
              fill
              className="object-cover object-top"
            />
          </div>
        </div>

        <div className="mt-4 space-y-3">
          <div>
            <h3 className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground md:text-xs">
              What it does
            </h3>
            <p className="mt-1 text-[11px] leading-relaxed text-foreground/80 md:text-sm">
              Categorized budgets, visual reports, savings goals, and bill
              reminders — all in a fast, clean interface. AI spending insights
              help users understand their habits.
            </p>
          </div>

          <div>
            <h3 className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground md:text-xs">
              Key features
            </h3>
            <p className="mt-1 text-[11px] leading-relaxed text-foreground/80 md:text-sm">
              Real transaction import, PayPal payments for Pro subscriptions,
              bank-level encryption, Lightning-fast dashboard, fully responsive
              with native iOS and Android builds.
            </p>
          </div>

          <div>
            <h3 className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground md:text-xs">
              Stack
            </h3>
            <p className="mt-1 text-[11px] leading-relaxed text-foreground/80 md:text-sm">
              Next.js 16, React 19, TypeScript, Tailwind CSS, D1 SQL database,
              Cloudflare Workers, PayPal REST API, Capacitor (iOS + Android).
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border/50 px-2 py-0.5 text-[10px] text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        <a
          href="https://smart-budget-tracker.higgsfield.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-medium text-accent hover:underline md:text-sm"
        >
          Visit the site <ExternalLink size={11} />
        </a>
      </motion.div>
    </div>
  );
}
