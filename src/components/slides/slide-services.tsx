"use client";

import { motion } from "framer-motion";
import {
  Zap,
  Layout,
  Mail,
  ShoppingCart,
  GraduationCap,
  Code2,
} from "lucide-react";

interface SlideProps {
  isActive: boolean;
}

const services = [
  {
    icon: Zap,
    title: "Systeme.io Funnels",
    description:
      "Done-for-you sales funnels — landing pages, email, payments.",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    icon: ShoppingCart,
    title: "E-commerce",
    description:
      "Product pages & checkout that convert visitors to customers.",
    color: "text-sky-400",
    bgColor: "bg-sky-400/10",
  },
  {
    icon: Mail,
    title: "Email Automation",
    description:
      "Automated sequences that nurture leads & make sales on autopilot.",
    color: "text-purple-400",
    bgColor: "bg-purple-400/10",
  },
  {
    icon: Layout,
    title: "Business Websites",
    description:
      "Professional websites for local businesses that get you leads.",
    color: "text-amber-400",
    bgColor: "bg-amber-400/10",
  },
  {
    icon: GraduationCap,
    title: "Courses & Memberships",
    description:
      "Course areas with drip content & member management on Systeme.io.",
    color: "text-pink-400",
    bgColor: "bg-pink-400/10",
  },
  {
    icon: Code2,
    title: "Custom Web Apps",
    description:
      "Fully custom web apps with Next.js when you need more than a page builder.",
    color: "text-emerald-400",
    bgColor: "bg-emerald-400/10",
  },
];

export default function SlideServices({ isActive }: SlideProps) {
  return (
    <div className="flex h-full w-full items-center justify-center overflow-hidden bg-zinc-950 p-1.5 sm:p-3 md:p-5">
      <motion.div
        className="w-full max-w-lg"
        initial={{ opacity: 0, y: 6 }}
        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="text-[6px] font-medium uppercase tracking-[0.2em] text-accent sm:text-[9px] md:text-xs">
          What I do
        </p>
        <h2 className="mt-0.5 font-display text-[10px] font-medium leading-tight tracking-tight sm:text-base md:text-2xl">
          Funnels that make you money
        </h2>
        <p className="mt-0.5 text-[5.5px] text-muted-foreground sm:mt-2 sm:text-[9px] md:text-sm">
          From simple landing pages to full sales systems.
        </p>

        <div className="mt-1 grid grid-cols-2 gap-1 sm:mt-3 sm:gap-2 md:mt-5 md:grid-cols-3 md:gap-4">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={i}
                className="group relative overflow-hidden rounded-lg border border-white/5 bg-white/[0.02] p-1 transition-all hover:border-accent/30 hover:bg-white/[0.04] sm:rounded-xl sm:p-2.5 md:p-4"
                initial={{ opacity: 0, y: 10 }}
                animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.4, delay: 0.05 + i * 0.06 }}
              >
                <div
                  className={`mb-0.5 inline-flex items-center justify-center rounded-md ${service.bgColor} p-0.5 sm:mb-2 sm:p-2 md:mb-3 md:p-2.5`}
                >
                  <Icon
                    size={8}
                    className={`${service.color} sm:w-4 sm:h-4 md:w-5 md:h-5`}
                  />
                </div>
                <h3 className="text-[6px] font-medium text-foreground sm:text-[9px] md:text-sm">
                  {service.title}
                </h3>
                <p className="mt-0.5 text-[5px] leading-relaxed text-muted-foreground sm:mt-1 sm:text-[8px] md:mt-2 md:text-xs line-clamp-2">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
