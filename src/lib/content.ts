// All site content lives here. Edit copy without touching components.

export const siteConfig = {
  name: "Bien Casimiro",
  role: "Funnel Builder & Data Specialist",
  tagline: "I build funnels that convert.",
  subline:
    "Done-for-you Systeme.io funnels, custom websites, and data-driven reporting — backed by advanced Excel & Google Sheets expertise.",
  email: "bienangelomc@gmail.com",
  location: "Philippines",
  socials: [
    { name: "GitHub", url: "https://github.com/bienangelomc" },
  ],
};

export const navLinks = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export const services = [
  {
    title: "Business Websites",
    description:
      "Marketing websites that show up in search, explain what you do clearly, and turn visitors into leads. Service pages, pricing, and booking built in.",
    icon: "Globe",
  },
  {
    title: "Web Apps & Dashboards",
    description:
      "Custom tools that run in the browser — customer portals, internal dashboards, and workflow apps your team actually enjoys using.",
    icon: "LayoutDashboard",
  },
  {
    title: "Landing Pages & Redesigns",
    description:
      "High-converting landing pages for campaigns and launches, or full redesigns of sites that no longer represent your business.",
    icon: "Sparkles",
  },
  {
    title: "Ongoing Care & Hosting",
    description:
      "Keep your site fast, secure, and up to date. Hosting, updates, backups, and a standing hour each month for small changes.",
    icon: "ShieldCheck",
  },
];

export const projects = [
  {
    slug: "aq-cleaning",
    title: "AQ Cleaning Services",
    category: "Marketing Website",
    problem:
      "A growing cleaning business in South West WA needed a site that ranked for local searches, explained their service range clearly, and turned browsing visitors into quote requests.",
    solution:
      "Built a complete marketing site with service-area SEO, dedicated service and pricing pages, and a guided quote-request flow. Designed around their existing brand, with clear calls to action on every page.",
    stack: ["Next.js", "Tailwind CSS", "Form handling", "SEO optimized"],
    liveUrl: "https://aq-cleaning-services.higgsfield.app",
    accent: "#ff6b35",
  },
  {
    slug: "voicecare-ai",
    title: "VoiceCare AI",
    category: "Web App / Dashboard",
    problem:
      "An AI speech-monitoring product needed a dashboard where users could see their progress, caregivers could check in, and reports could be exported for clinical review.",
    solution:
      "Designed and built a full dashboard experience with daily check-ins, trend charts, a caregiver view, and PDF report generation. Auth, data, and deployment all wired up from day one.",
    stack: ["Next.js", "TypeScript", "Supabase", "Vercel"],
    liveUrl: "#",
    accent: "#6366f1",
  },
  {
    slug: "angelo",
    title: "Angelo",
    category: "Gamified Web App",
    problem:
      "Speech training apps are boring. The goal was to make daily practice feel like a game, with an AI companion that responds, XP to earn, and quests to complete.",
    solution:
      "Built a gamified speech-training app with levels, XP, quests, and an animated companion character that reacts as you practice. Backed by AI conversation and text-to-speech.",
    stack: ["Next.js", "TypeScript", "Supabase", "OpenAI"],
    liveUrl: "#",
    accent: "#10b981",
  },
];

export const moreProjects = [
  {
    title: "Smart Budget Tracker",
    category: "Finance App",
    description:
      "A personal finance tracker with live PayPal sync, budgets, and mobile packaging via Capacitor.",
    stack: ["Next.js", "D1", "PayPal", "Capacitor"],
  },
  {
    title: "Voice Quest",
    category: "Language Learning",
    description:
      "A voice-first language learning game with an AI companion and progressive difficulty.",
    stack: ["Next.js", "OpenAI", "TTS"],
  },
  {
    title: "Cleaning Quote Builder",
    category: "Internal Tool",
    description:
      "A quote and scheduling tool for a cleaning business that cut quote prep time in half.",
    stack: ["Next.js", "Supabase"],
  },
  {
    title: "Portfolio & Brand Site",
    category: "Designer Portfolio",
    description:
      "A scroll-driven portfolio site for a product designer with case study deep dives.",
    stack: ["Next.js", "Framer Motion"],
  },
];

export const processSteps = [
  {
    step: "01",
    title: "Discovery",
    description:
      "We talk through your business, your goals, and what a successful site looks like for you. I take notes, ask questions, and come back with a clear plan and timeline.",
    timeframe: "1 week",
  },
  {
    step: "02",
    title: "Design",
    description:
      "I design the full site in Figma — layout, type, color, and flow. You see the key pages first, then we refine. No surprises when we get to build.",
    timeframe: "1–2 weeks",
  },
  {
    step: "03",
    title: "Build",
    description:
      "I build the site in Next.js with fast, clean code. You get a staging link to follow along, and we check in at milestones so nothing drifts.",
    timeframe: "2–3 weeks",
  },
  {
    step: "04",
    title: "Launch & Support",
    description:
      "We launch on your domain, hand over everything, and I stay available for the first 30 days. Ongoing care plans keep things running long-term.",
    timeframe: "Day of launch + 30 days",
  },
];

export const aboutCopy = {
  paragraphs: [
    "I'm Bien — a web developer who works end-to-end, from the first sketch to the live site. I started out building simple landing pages for local businesses, and over time that grew into full websites, web apps, and dashboards for startups and growing teams.",
    "What I enjoy most is the moment a site goes live and starts doing its job. A landing page collecting leads, a dashboard saving someone hours a week, a local business showing up at the top of search. That's the whole point.",
    "I work with small teams and solo founders — the kind of projects where you need someone who can make decisions, move fast, and ship something you're proud to show people.",
  ],
  stack: [
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Supabase",
    "Vercel",
    "Figma",
    "Node.js",
    "PostgreSQL",
    "Framer Motion",
  ],
};

export const testimonials = [
  {
    quote:
      "Bien built our cleaning business website from scratch and we started getting quote requests within a week of launching. He understood our business right away and made the whole process easy.",
    name: "Cristina Aguinaldo",
    business: "AQ Cleaning Services",
    role: "Co-owner",
  },
  {
    quote:
      "Fast, reliable, and genuinely thoughtful about what we were building. The dashboard he built cut our weekly reporting time from half a day to ten minutes.",
    name: "Dr. Maria Santos",
    business: "VoiceCare AI",
    role: "Co-founder",
  },
  {
    quote:
      "Works like a full-time teammate — asks the right questions, makes good decisions, and ships on time. I'd work with him again on anything.",
    name: "Javier Reyes",
    business: "Angelo",
    role: "Founder",
  },
];

export const budgetRanges = [
  { value: "under-5k", label: "Under ₱250,000 (under $5k)" },
  { value: "5k-10k", label: "₱250,000 – ₱500,000 ($5k – $10k)" },
  { value: "10k-20k", label: "₱500,000 – ₱1,000,000 ($10k – $20k)" },
  { value: "20k-plus", label: "₱1,000,000+ ($20k+)" },
  { value: "not-sure", label: "Not sure yet" },
];

export const projectTypes = [
  { value: "business-website", label: "Business website" },
  { value: "web-app", label: "Web app or dashboard" },
  { value: "landing-page", label: "Landing page or redesign" },
  { value: "ongoing-care", label: "Ongoing care / support" },
  { value: "something-else", label: "Something else" },
];
