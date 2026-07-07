# Portfolio — Javier Arévalo

Personal portfolio / CV for **Javier Arévalo**, a Software Developer focused on
**Cloud & DevOps**. Live at **[cv.javierarevalo.dev](https://cv.javierarevalo.dev/)**.

---

## Design

**Editorial Bold** — a light, typographic, magazine-style personal site. Warm
paper ground (`#f4f1ea`), huge Archivo Black display type, numbered sections,
hairline rules and one electric cobalt accent (`#2b3ff2`). Facts are presented
as editorial columns (label over bold value); skills as sober, CV-style text
groups. Motion is deliberately minimal — hover states and a subtle scroll
fade-in, all gated behind `prefers-reduced-motion`.

Content is a single home page (hero → about → work → experience → skills →
education & certifications → contact) plus a **case-study page per project**
(Problem → Solution → Result), each with an editorial SVG cover or an embedded
video.

## Tech stack

- **[Astro](https://astro.build)** — fully static output, zero client-side
  framework. Case studies are markdown files in a content collection.
- **Hand-written CSS** — one token-driven design system in
  `src/styles/global.css`, organised with `@layer`; fluid type via `clamp()`.
- **Vanilla JS (~30 lines)** — copy-email button and scroll reveal, inlined in
  the base layout as progressive enhancement.
- **Google Fonts** — Archivo Black (display), Archivo (body), JetBrains Mono
  (small labels).

## Project structure

```
.
├── astro.config.mjs            # site: https://cv.javierarevalo.dev
├── src/
│   ├── styles/global.css       # the whole design system (tokens + @layer)
│   ├── layouts/Base.astro      # head, header, contact footer, the only JS
│   ├── components/Cover.astro  # editorial SVG cover per project
│   ├── content.config.ts       # `work` collection schema
│   ├── content/work/*.md       # one case study per project
│   └── pages/
│       ├── index.astro         # home (all CV content lives here)
│       └── work/[slug].astro   # case-study template
├── public/                     # CNAME, picture.jpeg, cv.pdf
└── .github/workflows/deploy.yml
```

## Developing

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # static site in dist/ (dist/index.html is the entry point)
npm run preview   # serve dist/ locally
```

## Deploying

Push to `main`. The GitHub Actions workflow builds the site and publishes
`dist/` to GitHub Pages — the build output contains `index.html` at its root,
which Pages serves at the domain. Requirements, both one-time:

1. **Settings → Pages → Source** must be **GitHub Actions** (not "Deploy from
   a branch").
2. The custom domain stays configured via `public/CNAME` (Astro copies it into
   `dist/`); TLS is handled through Cloudflare.

## Editing content

- **Case studies** — edit or add markdown in `src/content/work/`. Frontmatter
  drives the home card and case header; the body is the Problem/Solution/
  Result narrative. New files appear automatically, ordered by `order`.
- **Project video** — set `youtube: <video id>` in a case study's frontmatter
  (the ID is the part after `watch?v=`) and the case page embeds the video
  (privacy-friendly `youtube-nocookie` host) instead of the SVG cover.
- **Everything else** — experience, skills, education and certifications are
  plain markup in `src/pages/index.astro`.
- **Colours & type** — tokens in the `:root` block of `src/styles/global.css`.
  Swap `--accent` to `#ff4d00` for the orange variant.
- **CV PDF** — replace `public/cv.pdf` (the current one is generated from the
  page's print stylesheet).
- **3D models** — the case media slot is ready for `<model-viewer>`; see the
  documented example in `src/pages/work/[slug].astro`.

## Contact & links

- **LinkedIn:** [Javier Arévalo](https://www.linkedin.com/in/javier-arevalo-hernandez)
- **GitHub:** [@emermelada](https://github.com/emermelada)
- **Email:** javier.arevalo.11111@gmail.com
