"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { CheckCircle2, Loader2, ArrowRight } from "lucide-react";
import { motion, useMotionValue, useTransform, AnimatePresence, type MotionValue } from "framer-motion";
import LaptopStage from "./laptop-stage";
import SlideIntro from "./slides/slide-intro";
import SlideAbout from "./slides/slide-about";
import SlideServices from "./slides/slide-services";
import SlideWorkIndex from "./slides/slide-work-index";
import SlideProjectAQ from "./slides/slide-project-aq";
import SlideProjectVoiceCare from "./slides/slide-project-voicecare";
import SlideProjectAngelo from "./slides/slide-project-angelo";
import SlideProcess from "./slides/slide-process";
import SlideTestimonials from "./slides/slide-testimonials";
import HologramModal, { type ProjectData } from "./hologram-modal";
import TestimonialVideoHologram from "./testimonial-video-hologram";

const TOTAL_SLIDES = 9;

// Timeline:
// 0.00 → 0.10   Laptop closed
// 0.10 → 0.45   Lid opens
// 0.45 → 0.55   Boot animation
// 0.55 → 0.92   Portfolio slides (8 slides)
// 0.92 → 1.00   Hold / slight shrink
const PRESENT_START = 0.55;
const PRESENT_END = 0.92;
const PRESENT_RANGE = PRESENT_END - PRESENT_START;

export default function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [hologramProject, setHologramProject] = useState<ProjectData | null>(null);
  const [isHologramOpen, setIsHologramOpen] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState<number | null>(null);

  const openHologram = useCallback((project: ProjectData) => {
    setHologramProject(project);
    setIsHologramOpen(true);
  }, []);

  const closeHologram = useCallback(() => {
    setIsHologramOpen(false);
    setTimeout(() => setHologramProject(null), 300);
  }, []);

  const openTestimonialVideo = useCallback((index: number) => {
    setSelectedTestimonial(index);
  }, []);

  const closeTestimonialVideo = useCallback(() => {
    setSelectedTestimonial(null);
  }, []);
  const scrollProgress = useMotionValue(0);

  // Manual scroll tracking
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const el = containerRef.current;
        if (el) {
          const total = el.offsetHeight - window.innerHeight;
          if (total > 0) {
            const scrolled = Math.max(0, -el.getBoundingClientRect().top);
            const progress = Math.min(1, Math.max(0, scrolled / total));
            scrollProgress.set(progress);
          }
        }
        ticking = false;
      });
    };

    // When pointer is inside the laptop screen, wheel = scroll the screen content,
    // NOT the page. This lets users interact with forms and scroll within slides.
    const handleWheel = (e: WheelEvent) => {
      const target = e.target as HTMLElement;
      if (!target?.closest?.(".laptop-screen")) return;
      // Don't hijack wheel inside modals/holograms — let them scroll naturally
      if (target?.closest?.("[data-modal-open]")) return;
      e.preventDefault();
      const screenEl = target.closest(".laptop-screen") as HTMLElement;
      if (screenEl) {
        screenEl.scrollTop += e.deltaY;
      }
    };

    // Also prevent touch events from hijacking form inputs
    const handleTouch = (e: TouchEvent) => {
      const target = e.target as HTMLElement;
      if (target?.tagName === "INPUT" || target?.tagName === "TEXTAREA" || target?.tagName === "SELECT") {
        e.stopPropagation();
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    window.addEventListener("wheel", handleWheel, { passive: false, capture: true });
    window.addEventListener("touchmove", handleTouch, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      window.removeEventListener("wheel", handleWheel, { capture: true });
      window.removeEventListener("touchmove", handleTouch);
    };
  }, [scrollProgress]);

  // Calculate active slide
  useEffect(() => {
    const unsubscribe = scrollProgress.on("change", (p) => {
      if (p < PRESENT_START) {
        setActiveSlide(0);
        return;
      }
      if (p >= PRESENT_END) {
        setActiveSlide(TOTAL_SLIDES - 1);
        return;
      }
      const slideFloat = ((p - PRESENT_START) / PRESENT_RANGE) * (TOTAL_SLIDES - 1);
      const slide = Math.min(TOTAL_SLIDES - 1, Math.max(0, Math.round(slideFloat)));
      setActiveSlide(slide);
    });
    return () => unsubscribe();
  }, [scrollProgress]);

  const navigateToSlide = useCallback((slide: number) => {
    const el = containerRef.current;
    if (!el) return;
    // "Contact" (slide 8) = scroll to the release/contact section below the laptop
    if (slide >= TOTAL_SLIDES) {
      const releaseEl = document.getElementById("get-in-touch");
      if (releaseEl) {
        releaseEl.scrollIntoView({ behavior: "smooth" });
      }
      return;
    }
    const targetP = PRESENT_START + (slide / (TOTAL_SLIDES - 1)) * PRESENT_RANGE;
    const scrollDistance = el.offsetHeight - window.innerHeight;
    const targetScroll = el.offsetTop + targetP * scrollDistance;
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  }, []);

  const slides = [
    { key: "intro", component: SlideIntro, props: { onNavigate: navigateToSlide } },
    { key: "about", component: SlideAbout, props: {} },
    { key: "services", component: SlideServices, props: {} },
    { key: "work", component: SlideWorkIndex, props: { onNavigate: navigateToSlide, onOpenHologram: openHologram } },
    { key: "aq", component: SlideProjectAQ, props: {} },
    { key: "voicecare", component: SlideProjectVoiceCare, props: {} },
    { key: "angelo", component: SlideProjectAngelo, props: {} },
    { key: "process", component: SlideProcess, props: {} },
    { key: "testimonials", component: SlideTestimonials, props: { onOpenVideo: openTestimonialVideo } },
  ];

  const ActiveSlide = slides[activeSlide].component;
  const activeKey = slides[activeSlide].key;
  const activeProps = slides[activeSlide].props;

  return (
    <div className="relative min-h-screen bg-[#0a0a0c] text-foreground">
      <div
        ref={containerRef}
        className="relative"
        style={{ height: "800vh" }}
      >
        <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden">
          {/* Ambient glow */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 50% 50%, rgba(255, 107, 53, 0.05) 0%, transparent 55%)",
            }}
            aria-hidden="true"
          />

          {/* Top name label */}
          <TopLabel scrollProgress={scrollProgress} />

          <LaptopStage
            slideCount={TOTAL_SLIDES}
            activeSlide={activeSlide}
            containerRef={containerRef}
            scrollProgress={scrollProgress}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeKey}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <ActiveSlide isActive={true} {...(activeProps as any)} />
              </motion.div>
            </AnimatePresence>
          </LaptopStage>

          {/* Hologram modal — renders outside the laptop screen, floating above */}
          <div className="pointer-events-none absolute inset-0 z-50 flex items-center justify-center">
            <HologramModal
              project={hologramProject}
              isOpen={isHologramOpen}
              onClose={closeHologram}
            />
          </div>

          {/* Testimonial video hologram — renders outside the laptop screen */}
          <TestimonialVideoHologram
            selectedIndex={selectedTestimonial}
            onClose={closeTestimonialVideo}
          />

          {/* Bottom scroll cue */}
          <BottomCue scrollProgress={scrollProgress} />
        </div>
      </div>

      {/* Release section */}
      <ReleaseSection />
    </div>
  );
}

function TopLabel({
  scrollProgress,
}: {
  scrollProgress: MotionValue<number>;
}) {
  const opacity = useTransform(scrollProgress, [0, 0.2], [1, 0]);
  const y = useTransform(scrollProgress, [0, 0.2], [0, -20]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="pointer-events-none absolute top-16 z-10 w-full text-center"
    >
      <p className="text-xs font-medium uppercase tracking-[0.3em] text-zinc-400">
        My Portfolio
      </p>
    </motion.div>
  );
}

function BottomCue({
  scrollProgress,
}: {
  scrollProgress: MotionValue<number>;
}) {
  const opacity = useTransform(scrollProgress, [0, 0.15], [1, 0]);

  return (
    <motion.div
      style={{ opacity }}
      className="pointer-events-none absolute bottom-10 z-10 flex flex-col items-center gap-2 text-xs text-zinc-500"
    >
      <span>Scroll to open</span>
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 5v14" />
          <path d="m19 12-7 7-7-7" />
        </svg>
      </motion.div>
    </motion.div>
  );
}

function ReleaseSection() {
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [errorMessage, setErrorMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newErrors: Record<string, string> = {};
    if (!formData.get("name")) newErrors.name = "Required";
    if (!formData.get("email")) newErrors.email = "Required";
    if (formData.get("email") && !/[^\s@]+@[^\s@]+\.[^\s@]+/.test(String(formData.get("email"))))
      newErrors.email = "Invalid email";
    if (!formData.get("message")) newErrors.message = "Required";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    setErrorMessage("");
    setState("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        setState("success");
        e.currentTarget.reset();
        // Scroll so the success message is visible
        setTimeout(() => {
          const section = document.getElementById("get-in-touch");
          section?.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 100);
      } else {
        const data = await res.json().catch(() => ({}));
        setErrorMessage(data?.error || "Something went wrong. Please try again.");
        setState("error");
      }
    } catch {
      setErrorMessage("Network error. Please check your connection and try again.");
      setState("error");
    }
  }

  return (
    <section id="get-in-touch" className="relative border-t border-zinc-800/50 bg-[#0a0a0c] py-24">
      <div className="mx-auto max-w-2xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
            Get in touch
          </p>
          <h2 className="mt-4 font-display text-3xl font-medium leading-tight md:text-5xl">
            Have a project?
            <br />
            Let's build it.
          </h2>
          <p className="mx-auto mt-5 max-w-md text-sm text-zinc-400 md:text-base">
            Whether it's a website, a web app, or something you haven't quite
            figured out yet — send me a note and I'll get back within 1-2 days.
          </p>
        </motion.div>

        {state === "success" ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mx-auto mt-8 max-w-md rounded-xl border border-accent/30 bg-accent/5 p-8 text-center"
          >
            <CheckCircle2 size={32} className="mx-auto mb-3 text-accent" />
            <p className="text-base font-medium">Message sent!</p>
            <p className="mt-2 text-sm text-zinc-400">
              Thanks for reaching out. I'll get back to you within 1-2 days.
            </p>
            <button
              onClick={() => setState("idle")}
              className="mt-4 text-sm text-accent underline-offset-2 hover:underline"
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mx-auto mt-8 max-w-md space-y-4"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium">Name</label>
                <input
                  name="name"
                  className="w-full rounded-lg border border-zinc-700/50 bg-zinc-900/40 px-3 py-2.5 text-sm outline-none transition-all focus:border-accent/60 focus:ring-2 focus:ring-accent/20"
                  placeholder="Your name"
                />
                {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">Email</label>
                <input
                  name="email"
                  type="email"
                  className="w-full rounded-lg border border-zinc-700/50 bg-zinc-900/40 px-3 py-2.5 text-sm outline-none transition-all focus:border-accent/60 focus:ring-2 focus:ring-accent/20"
                  placeholder="you@email.com"
                />
                {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium">Project type</label>
              <select
                name="projectType"
                defaultValue=""
                className="w-full rounded-lg border border-zinc-700/50 bg-zinc-900/40 px-3 py-2.5 text-sm outline-none transition-all focus:border-accent/60 focus:ring-2 focus:ring-accent/20"
              >
                <option value="" disabled>Select...</option>
                <option value="website">Website</option>
                <option value="web-app">Web app</option>
                <option value="mobile-app">Mobile app</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium">Message</label>
              <textarea
                name="message"
                rows={4}
                className="w-full resize-none rounded-lg border border-zinc-700/50 bg-zinc-900/40 px-3 py-2.5 text-sm outline-none transition-all focus:border-accent/60 focus:ring-2 focus:ring-accent/20"
                placeholder="Tell me about your project..."
              />
              {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
            </div>

            {state === "error" && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <span>{errorMessage}</span>
              </motion.div>
            )}

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={state === "loading"}
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-accent disabled:opacity-60"
              >
                {state === "loading" ? (
                  <><Loader2 size={14} className="animate-spin" /> Sending...</>
                ) : (
                  <>Send message <ArrowRight size={14} /></>
                )}
              </button>
            </div>
          </motion.form>
        )}

        <p className="mt-12 text-center text-xs text-zinc-600">
          © {new Date().getFullYear()} Bien Casimiro. All rights reserved.
        </p>
      </div>
    </section>
  );
}
