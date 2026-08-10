// Key facts projected out of the laptop screen as floating holographic
// panels — one set per slide, keyed by slide index. Order MUST match the
// `slides` array in portfolio.tsx (10 entries).
//
// Positions are percentages of the stage box (the laptop's bounding
// area), so they scale with the machine. `z` is translateZ in px:
// higher = closer to the viewer = reads as further off the screen.
//
// Tuned against LaptopStage's 1400px perspective — a panel's projected
// size is roughly 1400 / (1400 - z), so 170px is already ~1.14x. Push
// much past that and they balloon over the screen.
//
// Keep each set to 3–4 panels. More and they stop reading as "the key
// info" and start reading as a second, worse layout.

export interface HoloPanel {
  label: string;
  value: string;
  /** % from the left of the stage */
  x: number;
  /** % from the top of the stage */
  y: number;
  /** translateZ in px — depth off the screen plane */
  z: number;
  /** brand-accent variant instead of cyan */
  tone?: "cool" | "warm";
}

/** Four repeatable anchor points around the open lid. */
const SLOT = {
  topLeft: { x: -24, y: 6, z: 130 },
  topRight: { x: 89, y: -4, z: 168 },
  midLeft: { x: -19, y: 40, z: 96 },
  midRight: { x: 92, y: 33, z: 126 },
} as const;

export const holoSlides: HoloPanel[][] = [
  // 0 — Intro
  [
    { label: "Role", value: "Funnel Builder", ...SLOT.topLeft, tone: "warm" },
    { label: "Also", value: "Data Specialist", ...SLOT.topRight },
    { label: "Based", value: "Philippines", ...SLOT.midRight },
  ],

  // 1 — About
  [
    { label: "Built", value: "20+ funnels", ...SLOT.topLeft, tone: "warm" },
    { label: "Satisfaction", value: "100%", ...SLOT.topRight },
    { label: "Response", value: "1–2 days", ...SLOT.midLeft },
  ],

  // 2 — Services
  [
    { label: "Service", value: "Sales Funnels", ...SLOT.topLeft },
    { label: "Service", value: "Business Websites", ...SLOT.topRight },
    { label: "Service", value: "Apps & Dashboards", ...SLOT.midLeft },
    { label: "Service", value: "Data & Reporting", ...SLOT.midRight },
  ],

  // 3 — Excel / Data
  [
    { label: "Lookups", value: "XLOOKUP · VLOOKUP", ...SLOT.topLeft },
    { label: "Analysis", value: "Pivot Tables", ...SLOT.topRight },
    { label: "Automation", value: "Macros · VBA", ...SLOT.midLeft },
    { label: "Scale", value: "Big Data Reporting", ...SLOT.midRight, tone: "warm" },
  ],

  // 4 — AQ: the problem
  [
    { label: "Case study", value: "AQ Cleaning", ...SLOT.topLeft, tone: "warm" },
    { label: "Before", value: "Quoted by hand", ...SLOT.topRight },
    { label: "Cost", value: "Hours-late replies", ...SLOT.midLeft },
    { label: "Coverage", value: "12 towns, 1 owner", ...SLOT.midRight },
  ],

  // 5 — AQ Cleaning
  [
    { label: "Project", value: "AQ Cleaning", ...SLOT.topLeft, tone: "warm" },
    { label: "Type", value: "Quote Automation", ...SLOT.topRight },
    { label: "Built with", value: "Workers · D1 · Claude", ...SLOT.midLeft },
    { label: "Focus", value: "Quote → Booking", ...SLOT.midRight },
  ],

  // 6 — AQ: one quote, end to end
  [
    { label: "Owner effort", value: "One tap", ...SLOT.topLeft, tone: "warm" },
    { label: "Channel", value: "Telegram approval", ...SLOT.topRight },
    { label: "Guarantee", value: "Approve before send", ...SLOT.midLeft },
    { label: "Links", value: "Signed · 7-day expiry", ...SLOT.midRight },
  ],

  // 7 — AQ: what changed
  [
    { label: "Now", value: "Quotes 24/7", ...SLOT.topLeft, tone: "warm" },
    { label: "Pricing", value: "One rate card", ...SLOT.topRight },
    { label: "Booking", value: "Writes itself", ...SLOT.midLeft },
    { label: "Runs on", value: "Cloudflare edge", ...SLOT.midRight },
  ],

  // 8 — Process
  [
    { label: "01", value: "Discovery", ...SLOT.topLeft },
    { label: "02", value: "Design", ...SLOT.topRight },
    { label: "03", value: "Build", ...SLOT.midLeft },
    { label: "04", value: "Launch & Support", ...SLOT.midRight, tone: "warm" },
  ],

  // 9 — Testimonials
  [
    { label: "Clients", value: "100% satisfaction", ...SLOT.topLeft, tone: "warm" },
    { label: "Sectors", value: "Local · Health · AI", ...SLOT.topRight },
    { label: "Reply within", value: "1–2 days", ...SLOT.midRight },
  ],
];
