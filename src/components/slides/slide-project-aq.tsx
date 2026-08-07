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
    <div className="h-full w-full overflow-y-auto bg-zinc-950">
      <motion.div
        className="p-1.5 sm:p-2.5 md:p-5"
        initial={{ opacity: 0, y: 12 }}
        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="text-[9px] font-medium uppercase tracking-[0.15em] text-accent sm:text-[10px] md:text-xs">
            Featured
          </span>
          <span className="text-[9px] text-muted-foreground sm:text-[10px] md:text-xs">·</span>
          <span className="text-[9px] text-muted-foreground sm:text-[10px] md:text-xs">
            Marketing Website
          </span>
        </div>

        <h2 className="mt-1 font-display text-base font-medium leading-tight tracking-tight sm:text-lg md:text-xl">
          AQ Cleaning Services
        </h2>

        <p className="mt-0.5 text-[10px] text-muted-foreground sm:text-xs md:text-sm">
          An owner-operated cleaning business in South West Western Australia.
        </p>

        {/* Mockup */}
        <div className="mt-3 overflow-hidden rounded-lg border border-border/50">
          <div className="relative aspect-video">
            <Image
              src="/mockup-aq-cleaning.png"
              alt="AQ Cleaning Services website"
              fill
              className="object-cover object-top"
            />
          </div>
        </div>

        <div className="mt-3 space-y-2.5 sm:mt-4 sm:space-y-3">
          <div className="flex items-start gap-2">
            <MapPin size={11} className="mt-0.5 shrink-0 text-accent sm:size-[13px]" />
            <div>
              <h3 className="text-[9px] font-medium uppercase tracking-wider text-muted-foreground sm:text-[10px] md:text-xs">
                Service area
              </h3>
              <p className="mt-0.5 text-[10px] leading-relaxed text-foreground/80 sm:text-xs md:text-sm">
                12 towns across South West WA — Bunbury, Busselton,
                Dunsborough, Margaret River, and more.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-[9px] font-medium uppercase tracking-wider text-muted-foreground sm:text-[10px] md:text-xs">
              Results
            </h3>
            <p className="mt-0.5 text-[10px] leading-relaxed text-foreground/80 sm:text-xs md:text-sm">
              Six service pages optimized for local SEO, instant online quote
              form, reviews section, full pricing page — built to convert
              visitors into booked jobs.
            </p>
          </div>

          <div>
            <h3 className="text-[9px] font-medium uppercase tracking-wider text-muted-foreground sm:text-[10px] md:text-xs">
              Stack
            </h3>
            <p className="mt-0.5 text-[10px] leading-relaxed text-foreground/80 sm:text-xs md:text-sm">
              React, TanStack Start, TypeScript, Tailwind CSS, Cloudflare
              Workers, Resend for form notifications.
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
          href="https://aq-cleaning-services.higgsfield.app/"
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
