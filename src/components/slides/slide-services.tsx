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
    <div className="flex h-full w-full items-center justify-center overflow-hidden bg-zinc-950 p-1.5 sm:p-3 md:p-4">
      <motion.div
        className="w-full max-w-lg"
        initial={{ opacity: 0, y: 6 }}
        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="text-[6px] font-medium uppercase tracking-[0.2em] text-accent sm:text-[8px] md:text-xs">
          What I do
        </p>
        <h2 className="mt-0.5 font-display text-[10px] font-medium leading-tight tracking-tight sm:text-sm md:text-xl">
          Funnels that make you money
        </h2>
        <p className="mt-0.5 text-[5.5px] text-muted-foreground sm:text-[8px] md:text-sm">
          From simple landing pages to full sales systems.
        </p>

        <div className="mt-1 grid grid-cols-2 gap-1 sm:mt-2 sm:gap-1.5 md:mt-3 md:grid-cols-3 md:gap-2">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={i}
                className="group relative overflow-hidden rounded-lg border border-white/5 bg-white/[0.02] p-1 transition-all duration-300 hover:border-accent/30 hover:bg-white/[0.04] hover:shadow-[0_0_20px_rgba(255,107,53,0.1)] sm:p-1.5 md:p-3"
                initial={{ opacity: 0, y: 10 }}
                animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.4, delay: 0.05 + i * 0.06 }}
                whileHover={{ y: -2 }}
              >
                {/* Hover glow gradient */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(ellipse at top, ${service.color.includes("accent") ? "rgba(255,107,53,0.08)" : "rgba(255,255,255,0.04)"}, transparent 70%)`,
                  }}
                />
                <div
                  className={`mb-0.5 inline-flex items-center justify-center rounded-md ${service.bgColor} p-0.5 sm:mb-1 sm:p-1 md:mb-1.5 md:p-2`}
                >
                  <Icon
                    size={7}
                    className={`${service.color} sm:w-3 sm:h-3 md:w-4 md:h-4`}
                  />
                </div>
                <h3 className="text-[6px] font-medium text-foreground sm:text-[8px] md:text-sm">
                  {service.title}
                </h3>
                <p className="mt-0.5 text-[5px] leading-relaxed text-muted-foreground line-clamp-2 sm:text-[7px] md:mt-1 md:text-xs">
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
