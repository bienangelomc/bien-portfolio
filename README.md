# Bien Casimiro — Portfolio

A scroll-driven portfolio where the entire site is presented inside a laptop that opens as you scroll. The laptop is the interface, not decoration.

## The Concept

The homepage is a single large laptop centered on screen. As you scroll:

1. **Closed** — laptop sits closed, three-quarter view
2. **Opening** — lid rotates open on its hinge (scroll-linked, reverses cleanly)
3. **Settling** — camera moves to straight-on, laptop scales up
4. **Presentation** — laptop stays pinned, 9 slides advance inside the screen
5. **Release** — laptop scales down, contact info escapes the screen

## Tech Stack

- **Next.js 16** (App Router)
- **React 19** + **TypeScript**
- **Tailwind CSS v4**
- **Framer Motion** — all scroll-linked animation
- **Lenis** — smooth scrolling
- **Fraunces** (display) + **Inter** (body) — via next/font
- **lucide-react** — icons

## Slides (all live inside the laptop screen)

1. **Intro** — name, role, two CTAs
2. **About** — short first-person bio
3. **What I do** — 4 capabilities
4. **Work index** — 3 project previews with links
5. **AQ Cleaning Services** — featured case study
6. **VoiceCare AI** — case study
7. **Angelo** — gamified speech training case study
8. **How I work** — 4-step process
9. **Contact** — form + email + socials

## Project Structure

```
src/
├── app/
│   ├── layout.tsx       # Root layout, metadata, fonts
│   ├── page.tsx         # Home page
│   ├── globals.css      # Global styles + Tailwind theme
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── portfolio.tsx         # Main scroll choreography orchestrator
│   ├── laptop-stage.tsx      # 3D laptop with lid, screen, hinge, base, glow
│   ├── lenis-provider.tsx    # Smooth scroll provider
│   └── slides/               # All 9 slide components
│       ├── slide-intro.tsx
│       ├── slide-about.tsx
│       ├── slide-services.tsx
│       ├── slide-work-index.tsx
│       ├── slide-project-aq.tsx
│       ├── slide-project-voicecare.tsx
│       ├── slide-project-angelo.tsx
│       ├── slide-process.tsx
│       └── slide-contact.tsx
├── lib/
│   ├── content.ts     # All site copy (edit here)
│   └── utils.ts       # cn() utility
public/
├── mockup-aq-cleaning.png
├── mockup-voicecare.png
├── mockup-angelo.png
└── bien-portrait.png
```

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scroll Phases (mapping)

Scroll progress `p` (0 → 1) through the 500vh container:

| Phase       | p range  | What happens                          |
|-------------|----------|---------------------------------------|
| Closed      | 0.00–0.12 | Laptop closed, 3/4 view               |
| Opening     | 0.12–0.35 | Lid 0° → 105°, screen wakes           |
| Settling    | 0.35–0.42 | Scales up, camera straight-on         |
| Presentation| 0.42–0.92 | 9 slides advance inside screen        |
| Release     | 0.92–1.00 | Laptop scales down, release section  |

## Customizing

**Edit copy:** All text lives in `src/lib/content.ts` and in individual slide components under `src/components/slides/`.

**Change accent color:** Update the `accent` CSS variable in `src/app/globals.css` (both `:root` and `.dark`).

**Add a slide:**
1. Create a new component in `src/components/slides/`
2. Import it in `src/components/portfolio.tsx`
3. Add it inside the `<LaptopStage>` children
4. Increment `TOTAL_SLIDES`

**Replace mockups:** Drop new images in `public/` and update the `<Image>` src in each project slide.

## Deploy to Vercel

1. Push to GitHub
2. [vercel.com/new](https://vercel.com/new) → import repo
3. Click Deploy (auto-detects Next.js)

Or via CLI:
```bash
npm i -g vercel
vercel
```

## Accessibility

- Screen content is real DOM (selectable, focusable, screen-reader friendly)
- All animations use `transform` and `opacity` only (GPU-friendly)
- Keyboard-navigable
- `prefers-reduced-motion`: Lenis disabled in the provider (add CSS fallback for the choreography if needed)

## Performance

- Static generation — all pages prerendered
- Next.js Image optimization for mockups
- Smooth 60fps target on mid-range devices
