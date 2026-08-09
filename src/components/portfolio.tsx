"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { CheckCircle2, Loader2, ArrowRight } from "lucide-react";
import { motion, useMotionValue, useTransform, AnimatePresence, type MotionValue } from "framer-motion";
import LaptopStage from "./laptop-stage";
import SlideIntro from "./slides/slide-intro";
import SlideAbout from "./slides/slide-about";
import SlideServices from "./slides/slide-services";
import SlideExcel from "./slides/slide-excel";
import SlideWorkIndex from "./slides/slide-work-index";
import SlideProjectAQ from "./slides/slide-project-aq";
import SlideProjectVoiceCare from "./slides/slide-project-voicecare";
import SlideProjectAngelo from "./slides/slide-project-angelo";
import SlideProcess from "./slides/slide-process";
import SlideTestimonials from "./slides/slide-testimonials";
import HologramModal, { type ProjectData } from "./hologram-modal";
import TestimonialVideoHologram from "./testimonial-video-hologram";
import HoloAtmosphere from "./holo-atmosphere";
import MobileScreen from "./mobile-screen";

const TOTAL_SLIDES = 10;

// Timeline:
// 0.00 → 0.03   Laptop closed
// 0.03 → 0.15   Lid opens (fast — 1-2 scrolls)
// 0.15 → 0.22   Boot animation (short)
// 0.22 → 0.97   Portfolio slides (9 slides, ~8.3% each = lots of scroll room)
// 0.97 → 1.00   Hold
const PRESENT_START = 0.22;
const PRESENT_END = 0.97;
const PRESENT_RANGE = PRESENT_END - PRESENT_START;

export default function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [hologramProject, setHologramProject] = useState<ProjectData | null>(null);
  const [isHologramOpen, setIsHologramOpen] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState<number | null>(null);
  const [slideDirection, setSlideDirection] = useState(1); // 1 = forward, -1 = backward
  const [isMobile, setIsMobile] = useState(false);
  const [mobileScreenOpen, setMobileScreenOpen] = useState(false);

  // The lid is 16:10, which caps the screen at ~205px tall on a 375px
  // phone and forces slide text to 7–9px. Below this width the screen
  // flies forward and fills the viewport instead. See mobile-screen.tsx.
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

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

    // Prevent touch events from hijacking form inputs
    const handleTouch = (e: TouchEvent) => {
      const target = e.target as HTMLElement;
      if (target?.tagName === "INPUT" || target?.tagName === "TEXTAREA" || target?.tagName === "SELECT") {
        e.stopPropagation();
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    window.addEventListener("touchmove", handleTouch, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      window.removeEventListener("touchmove", handleTouch);
    };
  }, [scrollProgress]);

  // Calculate active slide + mobile hologram visibility
  useEffect(() => {
    let lastSlide = 0;
    const unsubscribe = scrollProgress.on("change", (p) => {
      if (p < PRESENT_START) {
        setSlideDirection(lastSlide > 0 ? -1 : 1);
        lastSlide = 0;
        setActiveSlide(0);
        setMobileScreenOpen(false);
        return;
      }
      if (p >= PRESENT_END) {
        setSlideDirection(lastSlide < TOTAL_SLIDES - 1 ? 1 : -1);
        lastSlide = TOTAL_SLIDES - 1;
        setActiveSlide(TOTAL_SLIDES - 1);
        setMobileScreenOpen(false);
        return;
      }
      // Use floor with per-slide bands so each slide gets equal scroll room
      const slideFloat = ((p - PRESENT_START) / PRESENT_RANGE) * TOTAL_SLIDES;
      const slide = Math.min(TOTAL_SLIDES - 1, Math.max(0, Math.floor(slideFloat)));
      if (slide !== lastSlide) {
        setSlideDirection(slide > lastSlide ? 1 : -1);
        lastSlide = slide;
      }
      setActiveSlide(slide);
      setMobileScreenOpen(isMobile && p >= PRESENT_START && p < 0.98);
    });
    return () => unsubscribe();
  }, [scrollProgress, isMobile]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target?.tagName === "INPUT" || target?.tagName === "TEXTAREA" || target?.tagName === "SELECT") return;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        navigateToSlide(Math.min(activeSlide + 1, TOTAL_SLIDES));
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        navigateToSlide(Math.max(activeSlide - 1, 0));
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeSlide]);

  const navigateToSlide = useCallback((slide: number) => {
    const el = containerRef.current;
    if (!el) return;
    if (slide >= TOTAL_SLIDES) {
      const releaseEl = document.getElementById("get-in-touch");
      if (releaseEl) {
        releaseEl.scrollIntoView({ behavior: "smooth" });
      }
      return;
    }
    // Match the floor-based slide calculation: center of each slide's band
    const targetP = PRESENT_START + ((slide + 0.5) / TOTAL_SLIDES) * PRESENT_RANGE;
    const scrollDistance = el.offsetHeight - window.innerHeight;
    const targetScroll = el.offsetTop + targetP * scrollDistance;
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  }, []);

  const slides = [
    { key: "intro", component: SlideIntro, props: { onNavigate: navigateToSlide } },
    { key: "about", component: SlideAbout, props: {} },
    { key: "services", component: SlideServices, props: {} },
    { key: "excel", component: SlideExcel, props: {} },
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

  // One slide renderer, mounted into whichever screen is in play — the
  // laptop's on desktop, the flown-forward panel on mobile. Identical
  // markup and transitions either way.
  const slideNode = (
    <AnimatePresence mode="wait" custom={slideDirection}>
      <motion.div
        key={activeKey}
        className="absolute inset-0"
        custom={slideDirection}
        variants={{
          enter: () => ({
            opacity: 1,
            x: 0,
            scale: 1,
            transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
          }),
          exit: (dir: number) => ({
            opacity: 0,
            x: dir > 0 ? -40 : 40,
            scale: 0.96,
            transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
          }),
        }}
        initial={{
          opacity: 0,
          x: slideDirection > 0 ? 40 : -40,
          scale: 0.96,
        }}
        animate="enter"
        exit="exit"
      >
        <ActiveSlide isActive={true} {...(activeProps as any)} />
      </motion.div>
    </AnimatePresence>
  );

  return (
    <div className="relative min-h-screen bg-[#0a0a0c] text-foreground">
      <div
        ref={containerRef}
        className="relative"
        style={{ height: "1500vh" }}
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

          {/* Projection environment — floor grid, haze, drifting motes.
              Behind the machine; fades in as the lid opens. */}
          <HoloAtmosphere scrollProgress={scrollProgress} />

          {/* Top name label */}
          <TopLabel scrollProgress={scrollProgress} />

          <LaptopStage
            slideCount={TOTAL_SLIDES}
            activeSlide={activeSlide}
            containerRef={containerRef}
            scrollProgress={scrollProgress}
            isMobile={isMobile}
          >
            {/* On mobile the slides live in MobileScreen instead — the
                laptop still opens, then hands off. */}
            {!isMobile && slideNode}
          </LaptopStage>

          {/* Mobile: the screen, flown forward to fill the viewport */}
          {isMobile && (
            <MobileScreen
              isOpen={mobileScreenOpen}
              slideNumber={activeSlide}
              totalSlides={TOTAL_SLIDES}
            >
              {slideNode}
            </MobileScreen>
          )}

          {/* Hologram modal — renders outside the laptop screen, floating above */}
          <div className="pointer-events-none absolute inset-0 z-[80] flex items-center justify-center">
            <HologramModal
              project={hologramProject}
              isOpen={isHologramOpen}
              onClose={closeHologram}
            />
          </div>

          {/* Testimonial video hologram — renders above everything */}
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
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(255, 107, 53, 0.08) 0%, transparent 50%)",
        }}
        aria-hidden="true"
      />
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
            <span className="text-accent">Let's build it.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-md text-sm text-zinc-400 md:text-base">
            Whether it's a funnel, a website, or something you haven't quite
            figured out yet — send me a note and I'll get back within 1-2 days.
          </p>

          {/* Trust signals */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-zinc-500"
          >
            <span className="inline-flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              20+ funnels built
            </span>
            <span className="inline-flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              100% satisfaction
            </span>
            <span className="inline-flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
              </svg>
              1-2 day response
            </span>
          </motion.div>

          {/* Direct email link */}
          <motion.a
            href="mailto:bienangelomc@gmail.com"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-accent/80"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
            </svg>
            bienangelomc@gmail.com
          </motion.a>
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
                <option value="funnel">Sales funnel (Systeme.io)</option>
                <option value="website">Business website</option>
                <option value="web-app">Custom web app</option>
                <option value="landing-page">Landing page</option>
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
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-white shadow-lg shadow-accent/20 transition-all hover:bg-accent/90 hover:shadow-accent/30 disabled:opacity-60"
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

        {/* Social links */}
        <div className="mt-4 flex items-center justify-center gap-4">
          <a
            href="https://github.com/bienangelomc"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 transition-colors hover:text-accent"
            aria-label="GitHub"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
          </a>
          <a
            href="mailto:bienangelomc@gmail.com"
            className="text-zinc-500 transition-colors hover:text-accent"
            aria-label="Email"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
