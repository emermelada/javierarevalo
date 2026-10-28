---
title: Make-a-Ring
tagline: 'A ring studio in the browser for people who aren''t jewellers: pick or draw a pattern, see it on a hand, and leave with a print-ready file.'
year: '2026'
role: Hackathon entry · co-built with Franciszek Kossut
stack: [Preact, htm, three.js, No build step, Deployxa]
summary: A browser studio where anyone can design a ring, try it on at true scale and download a real STL or OBJ. Built with Franciszek Kossut for HyperBloom October 2026, a UI/UX and web design hackathon.
order: 3
status: shipped
statusNote: Live; hackathon results pending
links:
  - label: make-a-ring.deployxa.online
    url: https://make-a-ring.deployxa.online
  - label: Repository
    url: https://github.com/FearedLynx/make-a-ring
gallery:
  - src: /work/make-a-ring-landing.jpg
    alt: The Make-a-Ring landing page, with the words MAKE A RING in large type behind a live 3D gold ring and a title block listing its layout, material, size and estimated price.
    caption: The landing page, with a live 3D ring and its spec sheet
    width: 1500
    height: 1000
  - src: /work/make-a-ring-studio.jpg
    alt: The Make-a-Ring studio, with a silver ring at the centre of a cross carousel of pattern cards, the pattern library on the left, the ring's properties on the right and the unrolled band underneath.
    caption: 'The studio: up and down change the middle pattern, left and right the sides'
    width: 1500
    height: 1000
  - src: /work/make-a-ring-editor.jpg
    alt: The pattern editor with one tile drawn under mirror symmetry, its repeats shown faded on each side, a 0.35 mm line weight checked against sterling silver, and the ring updating on the right.
    caption: The pattern editor, where one mirrored tile repeats around the band
    width: 1500
    height: 1000
  - src: /work/make-a-ring-try-on.jpg
    alt: The try-on screen, with the silver ring on the ring finger of a 3D hand and controls for skin tone, hand build, finger and material.
    caption: Try-on on a 3D hand, with the ring at true scale
    width: 1500
    height: 1000
credit: © 2026 Franciszek Kossut and Javier Arévalo
---

## Problem

Custom rings are designed in CAD tools made for professionals, or picked from
a short list of presets. Someone with an idea for a ring has no way to try it,
see it at their real size, or hand a maker a file they can use.

Franciszek Kossut and I built Make-a-Ring for HyperBloom October 2026, a UI/UX
and web design hackathon: a ring studio for people who aren't jewellers, where
the whole journey from idea to file happens in the browser.

## Solution

- **A cross carousel around a live 3D ring.** Up and down change the middle
  pattern, left and right the sides, and the arrow keys do the same. The
  unrolled band underneath shows the whole design flat.
- **Draw one tile.** The pattern editor draws a single tile with mirror,
  rotate or kaleidoscope symmetry, and it repeats seamlessly around the band.
  Line weights are checked against the material while you draw.
- **Try it on.** A 3D hand, or a photo of your own hand, uploaded or taken
  with the camera. The ring is drawn at true scale.
- **Printability checks per material.** Wall thickness, detail size and the
  seamless wrap are checked against each material's real limits, with
  one-click fixes.
- **Real files.** The STL and OBJ downloads are real meshes, ready for a
  printer or a caster.
- **No build step.** Preact with htm and three.js load through an import map,
  so the repository is the site: it deploys as static files on Deployxa.

## Result

The studio is live at
[make-a-ring.deployxa.online](https://make-a-ring.deployxa.online) and was
submitted to HyperBloom. The results are still pending.

Accessibility was measured rather than assumed:

- Everything works by keyboard: the arrows drive the carousel, the size
  drawing is a slider, and the pattern editor draws with arrows and Enter.
- Pattern changes and modes are announced to screen readers.
- `prefers-reduced-motion` turns off transitions, the turntable and the
  animated tours.
- axe-core 4.10 reports **0 WCAG 2.2 AA violations** on all five screens in
  all four colour themes, and on a phone-sized screen.

It is a frontend-only prototype: no backend, no accounts, and the prices are
estimates. The code is source-available under the PolyForm Noncommercial
License 1.0.0.
