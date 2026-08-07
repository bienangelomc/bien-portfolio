"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";

interface SlideProps {
  isActive: boolean;
}

const projectTypes = [
  { value: "website", label: "Website" },
  { value: "web-app", label: "Web app" },
  { value: "mobile-app", label: "Mobile app" },
  { value: "other", label: "Other" },
];

export default function SlideContact({ isActive }: SlideProps) {
  const [state, setState] = useState<"idle" | "loading" | "success">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newErrors: Record<string, string> = {};
    if (!formData.get("name")) newErrors.name = "Required";
    if (!formData.get("email")) newErrors.email = "Required";
    if (formData.get("email") && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(formData.get("email"))))
      newErrors.email = "Invalid email";
    if (!formData.get("message")) newErrors.message = "Required";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    setState("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        setState("success");
        e.currentTarget.reset();
      } else {
        setState("idle");
      }
    } catch {
      setState("idle");
    }
  }

  return (
    <div className="flex h-full w-full items-center justify-center overflow-hidden bg-zinc-950 p-5 md:p-6">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 16 }}
        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-accent md:text-xs">
          Contact
        </p>
        <h2 className="mt-2 font-display text-xl font-medium leading-tight tracking-tight md:text-2xl">
          Have a project?
          <br />
          Tell me about it.
        </h2>

        {state === "success" ? (
          <div className="mt-5 rounded-xl border border-accent/30 bg-accent/5 p-5 text-center">
            <CheckCircle2 size={24} className="mx-auto mb-2 text-accent" />
            <p className="text-sm font-medium">Message sent!</p>
            <p className="mt-1 text-xs text-muted-foreground">
              I'll get back to you within 1-2 days.
            </p>
            <button
              onClick={() => setState("idle")}
              className="mt-3 text-xs text-accent underline-offset-2 hover:underline"
            >
              Send another
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-4 space-y-2.5" data-contact-form>
            <div className="grid gap-2.5 sm:grid-cols-2">
              <div>
                <label className="mb-0.5 block text-[11px] font-medium">Name</label>
                <input
                  name="name"
                  className="w-full rounded-lg border border-border/50 bg-background/40 px-2.5 py-1.5 text-xs outline-none transition-all focus:border-accent/60 focus:ring-1 focus:ring-accent/20"
                  placeholder="Your name"
                />
                {errors.name && <p className="mt-0.5 text-[10px] text-red-500">{errors.name}</p>}
              </div>
              <div>
                <label className="mb-0.5 block text-[11px] font-medium">Email</label>
                <input
                  name="email"
                  type="email"
                  className="w-full rounded-lg border border-border/50 bg-background/40 px-2.5 py-1.5 text-xs outline-none transition-all focus:border-accent/60 focus:ring-1 focus:ring-accent/20"
                  placeholder="you@email.com"
                />
                {errors.email && <p className="mt-0.5 text-[10px] text-red-500">{errors.email}</p>}
              </div>
            </div>

            <div>
              <label className="mb-0.5 block text-[11px] font-medium">Project type</label>
              <select
                name="projectType"
                defaultValue=""
                className="w-full rounded-lg border border-border/50 bg-background/40 px-2.5 py-1.5 text-xs outline-none transition-all focus:border-accent/60 focus:ring-1 focus:ring-accent/20"
              >
                <option value="" disabled>Select...</option>
                {projectTypes.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-0.5 block text-[11px] font-medium">Message</label>
              <textarea
                name="message"
                rows={2}
                className="w-full resize-none rounded-lg border border-border/50 bg-background/40 px-2.5 py-1.5 text-xs outline-none transition-all focus:border-accent/60 focus:ring-1 focus:ring-accent/20"
                placeholder="Tell me about your project..."
              />
              {errors.message && <p className="mt-0.5 text-[10px] text-red-500">{errors.message}</p>}
            </div>

            <button
              type="submit"
              disabled={state === "loading"}
              className="group inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-xs font-medium text-background transition-all hover:bg-accent disabled:opacity-60"
            >
              {state === "loading" ? (
                <><Loader2 size={12} className="animate-spin" /> Sending...</>
              ) : (
                <>Send message <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" /></>
              )}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
}
