# Portfolio — Javier Arévalo

Personal portfolio / CV for **Javier Arévalo**, a Software Developer focused on
**Cloud & DevOps**. Live at **[cv.javierarevalo.dev](https://cv.javierarevalo.dev/)**.

---

## Design

A deliberately restrained **Swiss / International Typographic Style** CV:
grid-driven, typographic, near-monochrome on warm paper with a single accent
(ETH blue). The personality comes from typography, hierarchy and structure
rather than decoration. Each section is numbered like a technical dossier and
built on a two-column editorial grid — a sticky label/number rail beside the
content body. Experience reads as a clean list; the showcases (Selected work,
AI-assisted) read as cards.

Interactions are minimal and professional: a reading-progress bar, scroll-spy
navigation, subtle on-scroll reveals, a mobile menu, a clipboard-aware contact
link, and lazy-loaded project videos. No decorative background animation.

## Tech stack

No framework, no build step, no dependencies to install — it runs straight off
GitHub Pages.

- **HTML5** — semantic, accessible, single page.
- **CSS3** — hand-written and token-driven, organised with `@layer`
  (`tokens → base → layout → components → utilities`) for a flat, predictable
  cascade. The whole system (colour, type scale, spacing) retunes from one
  `:root` block. Fully fluid typography and grids via `clamp()` and
  `auto-fit`.
- **Vanilla JavaScript (ES module)** — small, independent modules: reading
  progress, mobile nav, clipboard contact, scroll-reveal, scroll-spy, and the
  YouTube video facade.
- **Google Fonts** — Space Grotesk (display), Inter (body), JetBrains Mono (labels).
- **Font Awesome** — icons.

## Project structure

```
.
├── index.html              # Structure & content (semantic, documented)
├── assets/
│   ├── css/styles.css      # Design system (tokens + @layer components)
│   └── js/main.js          # progress · nav · copy · reveal · scroll-spy · video
├── picture.jpeg            # Portrait
├── CNAME                   # Custom domain for GitHub Pages
└── README.md
```

## Responsive & cross-device

Designed mobile-first-friendly and verified from small phones to ultrawide:

- **Fluid everything** — type, spacing and section rhythm scale with the
  viewport via `clamp()`, so there are very few hard breakpoints to maintain.
- **Breakpoints** — `60rem` (collapse nav to a menu, stack the editorial grid),
  `48rem` (stack the hero, entries and tables), `30rem` (single-column facts).
- **Showcase grid** — cards use `auto-fit`, so they reflow from 1 → 2 → 3
  columns as the screen widens and as more projects are added.
- **Touch** — ≥44px tap targets; no hover-only functionality.
- **Print** — a dedicated `@media print` stylesheet produces a clean, ink-saving
  CV when the page is printed or saved as PDF.

## Accessibility

Semantic landmarks and headings, a skip link, visible keyboard focus, `aria`
labels on icon-only controls, alt text on the portrait, and full
`prefers-reduced-motion` support.

---

## Maintaining the site

The page is intentionally simple to edit by hand — all content lives in
`index.html`.

### Add a project video

Each project card has a media slot at the top. By default it shows a placeholder:

```html
<div class="entry__media" data-soon>
    <i class="fa-solid fa-film" aria-hidden="true"></i>
    Demo coming soon
</div>
```

To attach a YouTube video, replace that block with a single line — the video ID
is the part after `watch?v=` in the URL:

```html
<div class="entry__media" data-youtube="dQw4w9WgXcQ" data-title="Smart desk demo"></div>
```

The card then loads the video's **thumbnail automatically** (no image upload
needed) and shows a play button. The YouTube player itself is only loaded when a
visitor clicks play — so the page stays fast and no third-party tracking runs
otherwise (a "facade" loading pattern, via the privacy-friendly `nocookie` host).

### Add a new project

Duplicate an existing `<article class="entry">` inside `#projects`, bump the
`entry__index` number, and edit the title, summary, bullet points and tags. The
`auto-fit` grid lays the new card out automatically.

### Edit the facts / status

The hero facts strip (Based in / Languages / Focus / Status) is plain markup in
the `<dl class="facts">` block near the top of `index.html`.

### Theme

Colour, type scale and spacing are all CSS custom properties in the `tokens`
`@layer` at the top of `assets/css/styles.css`. Change a value there and it
propagates across the whole page.

## Running locally

No build step required.

```bash
git clone https://github.com/emermelada/javierarevalo.git
cd javierarevalo
python -m http.server 8000   # then open http://localhost:8000
```

Serving over HTTP (rather than `file://`) lets the clipboard contact link, fonts
and video thumbnails behave exactly as in production. The Live Server VS Code
extension works too.

## Contact & links

- **LinkedIn:** [Javier Arévalo](https://www.linkedin.com/in/javier-arevalo-hernandez)
- **GitHub:** [@emermelada](https://github.com/emermelada)
- **Email:** javier.arevalo.11111@gmail.com
