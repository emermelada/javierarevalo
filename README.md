# Portfolio and CV, Javier Arévalo

Personal portfolio and CV for **Javier Arévalo**, a software developer focused
on **Cloud & DevOps**. Live at
**[cv.javierarevalo.dev](https://cv.javierarevalo.dev/)**.

The repository holds three things that stay in sync: the site, the printable
one-page CV at `/cv/`, and `public/cv.pdf`, which is printed from that route.

---

## Design

**Editorial Bold**: a light, typographic, magazine-style personal site. Warm
paper ground (`#f4f1ea`), large Archivo Black display type, numbered sections,
hairline rules and one electric cobalt accent (`#2b3ff2`). Facts are laid out
as editorial columns (uppercase label over a bold value), skills as sober
CV-style text groups. Motion is deliberately minimal, just hover states and a
subtle scroll fade-in, all gated behind `prefers-reduced-motion`.

The site is one home page (hero → about → work → experience → skills →
education and certifications → contact) plus a case-study page per project
(Problem → Solution → Result). A case page shows an embedded video if the
project has one, otherwise real screenshots, otherwise no media at all.

## Tech stack

- **[Astro](https://astro.build)**, fully static output with no client-side
  framework. Case studies are markdown files in a content collection.
- **Hand-written CSS**: one token-driven design system in
  `src/styles/global.css`, organised with `@layer`, fluid type via `clamp()`.
  The printable CV has its own sheet, `src/styles/cv.css`.
- **Vanilla JS, around 30 lines**: the copy-email button and the scroll reveal,
  inlined in the base layout as progressive enhancement.
- **Google Fonts**: Archivo Black (display), Archivo (body), JetBrains Mono
  (small labels).

## Project structure

```
.
├── astro.config.mjs              # site origin (canonical URLs) + trailingSlash
├── scripts/make-pdf.sh           # prints /cv/ to public/cv.pdf with headless Chrome
├── src/
│   ├── data/cv.ts                # CV content: profile, experience, skills, education
│   ├── content.config.ts         # schema of the `work` collection
│   ├── content/work/*.md         # one case study per project
│   ├── layouts/Base.astro        # head, sticky header, contact footer, the only JS
│   ├── styles/
│   │   ├── global.css            # the whole design system (tokens + @layer)
│   │   └── cv.css                # print sheet for /cv/ only
│   └── pages/
│       ├── index.astro           # home
│       ├── cv.astro              # printable one-page CV (no layout, no JS, noindex)
│       └── work/[slug].astro     # case-study template
├── public/                       # CNAME, picture.jpeg, cv.pdf, work/*.jpg
└── .github/workflows/deploy.yml
```

Two rules keep the content honest: every fact that appears on both the home
page and the CV lives in `src/data/cv.ts`, and every project narrative lives in
`src/content/work/`. Nothing factual is written directly into the markup.

## Developing

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # static site in dist/
npm run preview   # serve dist/ locally
```

There are no tests and no linter. The checks that matter are visual: the home
page at a few widths, and the CV at `/cv/` still fitting on one page.

## Deploying

Push to `main`. The GitHub Actions workflow builds the site and publishes
`dist/` to GitHub Pages. Two settings are configured once and then left alone:

1. **Settings → Pages → Source** must be **GitHub Actions**, not "Deploy from a
   branch".
2. The custom domain comes from `public/CNAME`, which Astro copies into
   `dist/`. DNS is on Cloudflare, and the `cv` record has to be DNS-only, or
   GitHub cannot issue the certificate.

## Editing content

- **CV facts** (profile, pitch, about, experience, education, certifications,
  skills): `src/data/cv.ts`. The home page and `/cv/` both read from it, so the
  two can never disagree. Regenerate the PDF afterwards.
- **Case studies**: add or edit a markdown file in `src/content/work/`. The
  frontmatter feeds the home-page row and the case header, the body is the
  narrative. A new file shows up automatically, positioned by its `order`, and
  the previous/next links pick it up.
- **Screenshots**: put the image in `public/work/` and list it under `gallery`
  in the case study's frontmatter, with `alt`, an optional `caption`, and the
  intrinsic `width`/`height` so the page does not jump while it loads. A
  project with nothing to show gets no media block rather than a stand-in.
- **Project video**: set `youtube: <video id>` in the frontmatter (the part
  after `watch?v=`). The video takes precedence over the gallery and is
  embedded from the `youtube-nocookie` host.
- **Colours and type**: the `:root` block of `src/styles/global.css`. Swap
  `--accent` to `#ff4d00` for the documented orange variant.

## The CV PDF

`public/cv.pdf` is a build artifact, never edited by hand:

```bash
bash scripts/make-pdf.sh
```

The script builds the site, serves `dist/` locally, and prints `/cv/` to PDF
with a headless Chromium-family browser. Page size and margins come from
`@page` in `cv.css`, so the browser only has to leave out its own header and
footer. Re-run it after any change to `src/data/cv.ts` or `cv.css`, and check
that the result is still **one A4 page**:

```bash
pdfinfo public/cv.pdf   # expect: 1 page, 595 x 842 pts
```

If it spills onto a second page, the two dials for that are documented at the
top of `src/styles/cv.css`.

## Contact

- **LinkedIn:** [Javier Arévalo](https://www.linkedin.com/in/javier-arevalo-hernandez)
- **GitHub:** [@emermelada](https://github.com/emermelada)
- **Email:** javier.arevalo.11111@gmail.com
