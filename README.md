# Portfolio — Javier Arévalo

Personal portfolio / CV for **Javier Arévalo**, a Software Developer focused on
**Cloud & DevOps**. Live at **[cv.javierarevalo.dev](https://cv.javierarevalo.dev/)**.

---

## Design

**Editorial Bold** — a light, typographic, magazine-style personal site. Warm
paper ground (`#f4f1ea`), huge Archivo Black display type, an asymmetric
editorial grid, hairlines and one electric cobalt accent (`#2b3ff2`). Motion is
deliberately minimal: hover states and a subtle scroll fade-in, all gated behind
`prefers-reduced-motion`.

Content is structured as a home page (hero → about → selected work → experience
→ skills → education & certifications → contact) plus a **case-study page per
project** (Problem → Solution → Result), each with an editorial SVG cover.

## Tech stack

- **[Astro](https://astro.build)** — static output, zero client-side framework.
  Project case studies live as markdown in a content collection.
- **Hand-written CSS** — one token-driven design system in
  `src/styles/global.css`, organised with `@layer`. Fluid type via `clamp()`.
- **~30 lines of vanilla JS** — copy-email button and scroll reveal, inlined in
  the base layout.
- **Google Fonts** — Archivo Black (display), Archivo (body), JetBrains Mono
  (labels).

## Project structure

```
.
├── astro.config.mjs            # site: https://cv.javierarevalo.dev
├── src/
│   ├── styles/global.css       # the whole design system (tokens + @layer)
│   ├── layouts/Base.astro      # head, header, contact footer, JS
│   ├── components/Cover.astro  # editorial SVG covers per project
│   ├── content.config.ts       # `work` collection schema
│   ├── content/work/*.md       # one case study per project
│   └── pages/
│       ├── index.astro         # home
│       └── work/[slug].astro   # case-study template
├── public/                     # CNAME, picture.jpeg, cv.pdf
└── .github/workflows/deploy.yml
```

## Developing

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # output in dist/
npm run preview
```

## Deploying

Push to `main`. The GitHub Actions workflow builds the site with
`withastro/action` and deploys `dist/` to GitHub Pages (Pages source must be
set to **GitHub Actions** in the repo settings). The custom domain is kept by
`public/CNAME`; TLS via Cloudflare.

## Editing content

- **Case studies** — edit or add markdown files in `src/content/work/`
  (frontmatter drives the card + case header; the body is Problem/Solution/
  Result). New files appear automatically on the home page ordered by `order`.
- **Everything else** — experience, skills, education and certifications are
  plain markup in `src/pages/index.astro`.
- **Colours & type** — tokens in the `:root` block of `src/styles/global.css`.
  Swap `--accent` for `#ff4d00` for the orange variant.
- **CV PDF** — replace `public/cv.pdf` (the current one is generated from the
  page's print stylesheet).
- **3D models** — each case page has a documented media slot ready for
  `<model-viewer>`; see the comment in `src/pages/work/[slug].astro`.

## Contact & links

- **LinkedIn:** [Javier Arévalo](https://www.linkedin.com/in/javier-arevalo-hernandez)
- **GitHub:** [@emermelada](https://github.com/emermelada)
- **Email:** javier.arevalo.11111@gmail.com
