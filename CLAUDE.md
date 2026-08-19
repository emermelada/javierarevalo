# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Javier Arévalo's portfolio/CV, live at **cv.javierarevalo.dev** (GitHub Pages,
custom domain via `public/CNAME`, TLS through Cloudflare). Built with **Astro**
(static output, no client framework), hand-written CSS and ~30 lines of vanilla JS.

## Commands

```bash
npm run dev       # dev server at http://localhost:4321
npm run build     # static build to dist/
npm run preview   # serve dist/
```

No tests or linting. Deployment: push to `main` → `.github/workflows/deploy.yml`
builds and publishes to GitHub Pages (Pages source = GitHub Actions).

## Architecture

- `src/styles/global.css`: the entire design system, token-driven, organised
  with `@layer tokens, base, layout, components, utilities`. All colour, type
  and spacing come from the `:root` block; prefer changing a custom property
  over adding an override. Design language is **Editorial Bold**: warm paper
  ground, Archivo Black display type, hairlines, one cobalt accent
  (`--accent`; documented orange alternative `#ff4d00`).
- `src/layouts/Base.astro`: `<head>`, sticky header, contact footer, and the
  only JavaScript (copy-email + IntersectionObserver scroll reveal, both
  fail-quiet and reduced-motion-aware).
- `src/content/work/*.md`: one case study per project (`work` collection,
  schema in `src/content.config.ts`). Frontmatter feeds the home card and case
  header; the markdown body is the Problem/Solution/Result narrative.
- `src/data/cv.ts`: **the CV content itself** (profile, pitch, about,
  experience, education, certifications, skills). Read by both the home page
  and `/cv/`, so facts can never drift between the site and the PDF. Edit
  content here, not in the markup.
- `src/pages/index.astro`: home; renders the data module plus the work cards.
- `src/pages/cv.astro` + `src/styles/cv.css`: the printable one-page A4 CV.
  Standalone document (no `Base.astro`, no JS), print-first units, `noindex`.
  This is what `public/cv.pdf` is generated from.
- `src/pages/work/[slug].astro`: case-study template. Its media slot renders,
  in order of precedence, an embedded YouTube video (`youtube` in frontmatter),
  the real screenshots listed under `gallery`, or nothing at all. A project
  with no imagery yet gets an empty space rather than a stand-in drawing.

## Conventions

- **Motion stays minimal and gated.** Any animation must respect
  `prefers-reduced-motion` (the CSS reveal state and the JS observer both
  check it). No decorative cursors, tilts or typing effects; that was the
  previous design and it was deliberately discarded.
- **Accessibility is part of "done"**: semantic landmarks, skip link, visible
  focus, `aria` labels on icon-only controls, alt text.
- **The PDF is a build artifact.** `public/cv.pdf` comes from the `/cv/` route
  via `bash scripts/make-pdf.sh` (headless Chromium). Never hand-edit it, and
  re-run the script after touching `src/data/cv.ts` or `cv.css`. It must stay
  **one A4 page**, verified with `pdfinfo public/cv.pdf`. The `@media print`
  block in `global.css` is only a fallback for printing the site itself.
- New project = new markdown file in `src/content/work/` with the next `order`
  value; the home grid and prev/next case navigation pick it up automatically.
- English only. No cache-buster needed (Astro hashes assets).
