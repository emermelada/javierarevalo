---
title: champions2paste
tagline: Turns screenshots of a Pokémon Champions team into a paste that Pokémon Showdown imports directly, without a language model anywhere in the pipeline.
year: '2026'
role: Personal project · web app & self-hosting
stack: [Python, FastAPI, RapidOCR, OpenCV, Docker, Synology NAS, Cloudflare]
summary: A small web app that reads the team screen of Pokémon Champions with OCR and writes out a Showdown pokepaste. It runs on an ARM NAS at home and is public on my own domain.
order: 2
status: shipped
statusNote: Live, self-hosted on a home NAS
links:
  - label: champions2paste.javierarevalo.dev
    url: https://champions2paste.javierarevalo.dev
  - label: Repository
    url: https://github.com/emermelada/champions2paste
gallery:
  - src: /work/champions2paste-convert.jpg
    alt: The champions2paste page with two game screenshots uploaded and the resulting pokepaste, starting with Salamence and Kingambit, shown on the right.
    caption: Two screenshots in, a Showdown paste out
    width: 1400
    height: 900
  - src: /work/champions2paste-correction.jpg
    alt: A review card for Basculegion where the ability read as Adaptabilty is highlighted and a warning says it was corrected to Adaptability.
    caption: Every correction is shown, never applied silently
    width: 910
    height: 350
---

## Problem

Pokémon Champions lets you share a team as a ten-character code, but that code
is only an ID the game resolves on its servers. Ten characters hold about 51
bits, and a full team with items, moves and stat spreads needs several hundred,
so the team simply is not in there. Copying one into Pokémon Showdown meant
typing six Pokémon out by hand.

## Solution

The input is the game's own team screen instead. Upload one or two screenshots
and the page returns a pokepaste.

- **Deterministic OCR, no language model.** RapidOCR reads the text, and colour
  and geometry do the rest: the six cards are found by colour, the stat numbers
  calibrate against each stat bar, and gender and nature are pixel counts.
- **Four checks that correct each other.** Names snap to Showdown's real
  vocabulary, bar length cross-checks each number, every team must add up to
  66 stat points, and recomputing the final stats closes the loop.
- **Nothing hidden.** Every correction shows up in the editor as a warning, so
  the user can see exactly what was changed.

## Result

All 96 fields of the test team read correctly, in about three seconds on a
desktop CPU. It runs in Docker on an ARM Synology NAS at home, with no GPU and
no paid services, and is public at champions2paste.javierarevalo.dev.
