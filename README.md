# Konark Soft

Marketing site for Konark Soft — website development, mobile app development,
web & mobile app design, and Meta & Google Ads. Built with the Next.js App
Router, TypeScript and Tailwind CSS v4.

## Tech stack

| Concern        | Choice                                          |
| -------------- | ----------------------------------------------- |
| Framework      | Next.js 16 (App Router, Turbopack, typed routes) |
| Language       | TypeScript (strict)                             |
| Styling        | Tailwind CSS v4 with design tokens in `@theme`   |
| Fonts          | `next/font` — Plus Jakarta Sans, Playfair Display |
| Smooth scroll  | Lenis, behind a provider in `components/providers` |
| Animation      | GSAP for entrance reveals, CSS for state changes |

## Getting started

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Commands

```bash
npm run dev        # dev server
npm run build      # production build
npm run start      # serve the production build
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
```

## Environment variables

| Variable               | Required | Purpose                                                     |
| ---------------------- | -------- | ----------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | Optional | Absolute URL for canonical tags, Open Graph, sitemap, robots. Defaults to `http://localhost:3000`. |

Set it to the deployed origin in production. See `.env.example`.

## Architecture

```text
src/
├── app/                  routing only
│   ├── (marketing)/      public pages, share the header/footer shell
│   ├── error.tsx         route error boundary
│   ├── global-error.tsx  root layout failure fallback
│   ├── loading.tsx       route skeleton
│   ├── not-found.tsx     404
│   ├── robots.ts         derived from config
│   └── sitemap.ts        derived from config
├── components/
│   ├── layout/           page shell pieces (footer, page header)
│   ├── navigation/       header pill, desktop nav, dropdown, mobile nav
│   ├── providers/        client providers (smooth scroll)
│   └── ui/               domain-independent primitives (button, icons)
├── config/               site metadata, navigation, fonts
├── content/              all page copy, one file per page
├── features/
│   └── marketing/        page sections for the marketing route group
├── hooks/                shared client hooks
├── lib/{utils,seo}/      dependency-free helpers
└── types/                shared type definitions
```

Dependencies flow one way: `app` → `features` → `components` → `lib`/`config`.
Shared code never imports from a feature.

Server Components are the default. `"use client"` appears only where scroll
position, disclosure state or an animation library genuinely requires it —
currently the header, its menus, the smooth-scroll provider and the hero.

### Content

**No copy lives in components.** Every headline, description, card and meta tag
comes from `src/content/<page>.ts`, typed by `src/types/content.ts`. Components
receive content as props and only decide how it looks.

To reword the site, edit `src/content/` — nothing else. To add a hero card,
append to `cards` in `src/content/home.ts`; the fan geometry recalculates from
the card count, so any number of cards stays symmetric.

Page metadata is generated from the same file via `createPageMetadata()`, so a
title can never drift between the page and its `<head>`.

### Adding a page

1. Add the route to `src/config/navigation.ts`. Navigation, the "All Pages"
   dropdown, the mobile menu, the footer and `sitemap.xml` all read from it.
2. Create `src/content/<route>.ts` exporting a `PageContent`.
3. Create `src/app/(marketing)/<route>/page.tsx`:

```tsx
export const metadata: Metadata = createPageMetadata(routeContent);

export default function RoutePage() {
  return <PageHeader {...routeContent.header} />;
}
```

Typed routes are enabled, so an `href` that does not resolve to a real route
fails the build.

## Design system

Colour, typography, shadow and easing tokens live in the `@theme` block of
`src/app/globals.css`. Use the generated utilities (`text-ink`, `bg-brand`,
`shadow-float`, `ease-out-expo`) instead of hardcoded values.

The site is intentionally light-only; there is no dark theme.

### The frosted header

`SiteHeader` sets `data-scrolled` on the `<header>`, and `.nav-shell` in
`globals.css` reacts by animating its tint, blur, saturation and elevation
together — the Apple-style frost.

Two constraints worth knowing before changing it:

- An element with `backdrop-filter` becomes a **backdrop root**, so nothing
  nested inside the pill can blur the page behind it. The dropdown and mobile
  panels are therefore opaque by design.
- Panels stay mounted and use `inert` when closed, so they animate in both
  directions while staying out of the focus order and accessibility tree.

## Accessibility

- Skip link, semantic landmarks, one `<h1>` per page.
- Menus follow the WAI-ARIA disclosure pattern: `aria-expanded`,
  `aria-controls`, Escape to close, outside-press to dismiss, `ArrowDown` to
  enter the desktop dropdown.
- `aria-current="page"` marks the active route.
- All motion is gated on `prefers-reduced-motion`: Lenis is never created,
  GSAP reveals are skipped, and CSS transitions collapse.
- Entrance animations start hidden in CSS, with a `<noscript>` override so
  content is never invisible when JavaScript fails.

## Testing

No test runner is configured yet. When one is added, put unit tests beside the
code they cover and end-to-end journeys in `tests/e2e`.

## Conventions

- kebab-case files, PascalCase components, camelCase functions.
- Absolute imports via `@/*`.
- Import order: framework → third-party → internal → types.
- Comments explain *why*, not *what*.

Full engineering standards: [`docs/Nextjs_application_best_practices.md`](docs/Nextjs_application_best_practices.md).
