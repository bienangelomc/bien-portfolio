"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink, MapPin } from "lucide-react";

interface SlideProps {
  isActive: boolean;
}

const tags = ["Marketing site", "Local SEO", "Lead capture", "Brand-led design"];

export default function SlideProjectAQ({ isActive }: SlideProps) {
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
            Featured
          </span>
          <span className="text-[11px] text-muted-foreground md:text-xs">·</span>
          <span className="text-[11px] text-muted-foreground md:text-xs">
            Marketing Website
          </span>
        </div>

        <h2 className="mt-2 font-display text-xl font-medium leading-tight tracking-tight md:text-2xl">
          AQ Cleaning Services
        </h2>

        <p className="mt-1 text-[11px] text-muted-foreground md:text-sm">
          An owner-operated cleaning business in South West Western Australia.
        </p>

        {/* Mockup */}
        <div className="mt-4 overflow-hidden rounded-lg border border-border/50">
          <div className="relative aspect-video">
            <Image
              src="/mockup-aq-cleaning.png"
              alt="AQ Cleaning Services website"
              fill
              className="object-cover object-top"
            />
          </div>
        </div>

        <div className="mt-4 space-y-3">
          <div className="flex items-start gap-2">
            <MapPin size={13} className="mt-0.5 shrink-0 text-accent" />
            <div>
              <h3 className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground md:text-xs">
                Service area
              </h3>
              <p className="mt-0.5 text-[11px] leading-relaxed text-foreground/80 md:text-sm">
                12 towns across South West WA — Bunbury, Busselton,
                Dunsborough, Margaret River, and more.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground md:text-xs">
              Results
            </h3>
            <p className="mt-0.5 text-[11px] leading-relaxed text-foreground/80 md:text-sm">
              Six service pages optimized for local SEO, instant online quote
              form, reviews section, full pricing page — built to convert
              visitors into booked jobs.
            </p>
          </div>

          <div>
            <h3 className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground md:text-xs">
              Stack
            </h3>
            <p className="mt-0.5 text-[11px] leading-relaxed text-foreground/80 md:text-sm">
              Next.js, React, TypeScript, Tailwind CSS, TanStack Start,
              Cloudflare Workers, Resend for form notifications.
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
          href="https://aq-cleaning-services.higgsfield.app/"
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
