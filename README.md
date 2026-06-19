# Portfolio — Javier Arévalo

Personal portfolio / CV for **Javier Arévalo**, a Software Developer focused on
**Cloud & DevOps**. Live at **[cv.javierarevalo.dev](https://cv.javierarevalo.dev/)**.

---

## Design

A deliberately restrained **Swiss / International Typographic Style** CV:
grid-driven, typographic, on warm paper. The personality comes from typography,
hierarchy and structure rather than decoration. Each section is numbered like a
technical dossier and built on a two-column editorial grid — a sticky
label/number rail beside the content body.

Visual rhythm comes from two restrained devices:

- **Per-section accent colour** — each section carries its own hue (Profile
  blue · Experience teal · Selected work indigo · AI violet · Skills green ·
  Education amber), used only in small details (numbers, icon tiles, key tags,
  links) so the page stays serious.
- **Alternating background bands** — every other section sits on a soft,
  full-bleed neutral band, giving the page cadence as you scroll.

Layout per section: Experience reads as a clean list; AI-assisted as a card;
**Selected work as full-width, stacked horizontal cards** (media panel beside
the text).

Interactions are minimal and professional: a reading-progress bar and scroll-spy
navigation that both adopt the colour of the section in view, subtle on-scroll
reveals, a mobile menu, a clipboard-aware contact link, and lazy-loaded project
videos. No decorative background animation.

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
- **Showcases** — Selected work cards stack as full-width horizontal rows
  (media beside text) that collapse to media-on-top on small screens; the
  AI-assisted card uses an `auto-fit` grid that reflows as more are added.
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
`entry__index` number, and edit the title, summary, bullet points and tags. It
stacks automatically as the next full-width horizontal row.

### Change a section's colour or band

Each section element in `index.html` carries an accent class and a
`data-accent` (the deep variant used to tint the progress bar / nav marker while
that section is in view) — e.g. `class="block accent-teal" data-accent="#0b5d61"`.
Swap the `accent-*` class (and matching `data-accent`) to recolour a section; the
six palettes live at the bottom of `assets/css/styles.css`. Add or remove the
`block--band` class to toggle a section's background band.

### Edit the facts / status

The hero facts strip (Based in / Languages / Focus / Status) is plain markup in
the `<dl class="facts">` block near the top of `index.html`.

### Edit skills

The Skills section (`#skills`) is a list of category groups (`.skillset`): each
has a display-font heading with an accent icon (`.skillset__icon`) and a list of
tools as tags. Add or remove `<li class="tag">…</li>` items, or duplicate a
whole `.skillset` to add a category. Use `tag--key` to highlight a headline
skill.

### Theme

Colour, type scale and spacing are all CSS custom properties in the `tokens`
`@layer` at the top of `assets/css/styles.css`. Change a value there and it
propagates across the whole page.

### After editing CSS or JS — bump the cache-buster

The stylesheet and script are linked with a version query
(`styles.css?v=N`, `main.js?v=N`) in the `<head>` of `index.html`. Browsers and
the GitHub Pages CDN cache these files aggressively, so **increment `N` whenever
you change `styles.css` or `main.js`** to make returning visitors (especially on
mobile) fetch the new version instead of a stale copy.

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
