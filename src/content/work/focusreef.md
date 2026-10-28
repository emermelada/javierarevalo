---
title: FocusReef
tagline: A productivity app where 25-minute focus blocks become tokens, and tokens buy fish for an aquarium that only grows if you actually work.
year: '2026'
role: Personal project · Android app
stack: [Kotlin, Android, NAS-hosted database, Time-series data]
summary: An Android app that reads completed focus blocks from a time-series database on my home NAS and turns them into tokens you spend on an aquarium.
order: 5
cv: false
status: shipped
statusNote: App complete; running on sample data for now
gallery:
  - src: /work/focusreef-aquarium.jpg
    alt: The FocusReef aquarium screen, showing Tank 1 with 18 of its 24 slots filled by clownfish, a jellyfish and two larger fish over a sandy floor.
    caption: The first tank, with 18 of its 24 slots filled
    width: 560
    height: 1245
  - src: /work/focusreef-shop.jpg
    alt: The FocusReef fish shop, listing species with their slot cost and token price against a balance of 749 tokens.
    caption: The shop, where every species costs tokens and takes up tank slots
    width: 560
    height: 1245
  - src: /work/focusreef-progress.jpg
    alt: The FocusReef progress screen, showing level 15, a 26-day streak at a 2x multiplier, 356 hours across 855 focus blocks and a bar chart by month.
    caption: Level, streak multiplier and focus hours broken down by month
    width: 560
    height: 1245
links:
  - label: Repository
    url: https://github.com/emermelada/FocusReef
---

## Problem

Gamified focus apps usually keep everything on the phone: the timer, the record
of what you did and the reward for it. The game and the evidence live in the
same place, so the score only means whatever the app was told.

I wanted the record kept outside the game. FocusReef reads focus blocks that
are already stored somewhere else and only decides what they are worth.

## Solution

An Android app in the Forest lineage, built on a read-only record:

- A completed focus block is worth a number of tokens, and tokens buy fish and
  aquariums. The aquarium ends up being a picture of how much work has
  accumulated.
- The blocks are read from a time-series database hosted on my NAS. The app
  only reads it, so it can't inflate its own score.
- The split is deliberate: the database owns what happened and the app owns
  what it's worth, so whatever records the blocks can change without touching
  the game.

## Where it stands

The app is finished: the token economy, the shop and the aquarium all work.
What it doesn't have yet is real input, so for now it runs against sample data.

The art is not final either. Every fish, background and icon in the screenshots
above is a placeholder, enough to get the mechanics working and nothing more.
The visual design is the last thing I plan to settle.

## What's next

A standalone mode with a built-in timer, for anyone with nothing else
recording their blocks. The app counts the block itself and feeds the same
token economy, which gives FocusReef real input of its own. It also improves
the design, because it forces the block source to be an interface rather than
an assumption.
