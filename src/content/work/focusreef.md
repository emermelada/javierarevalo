---
title: FocusReef
tagline: A productivity app where 25-minute focus blocks become tokens, and tokens buy fish for an aquarium that only grows if you actually work.
year: '2026'
role: Personal project · Android app
stack: [Kotlin, Android, NAS-hosted database, Time-series data]
summary: The application half of the desk system. It reads the focus blocks the ESP32 controller publishes and turns them into an aquarium you spend them on.
order: 3
sub: true
status: shipped
statusNote: App complete; running on sample data until the desk firmware publishes real blocks
related:
  slug: smart-desk
  prefix: Reads the focus blocks published by
  name: the ESP32 desk
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

Gamified focus apps rely on you being honest with them. You press start, you
press stop, and nothing checks whether you were at the desk in between, so the
score only means whatever you decide it means.

The desk already knows. It runs the Pomodoro cadence, it moves at the start and
end of a block, and it publishes what happened. Taking the reward from that
record instead of from a button is what makes the score worth anything.

## Solution

An Android app in the Forest lineage, with the loop moved off the phone:

- A completed focus block is worth a number of tokens, and tokens buy fish and
  aquariums. The aquarium ends up being a picture of how much work has
  accumulated.
- The blocks are read from a time-series database hosted on a NAS, which the
  ESP32 controller writes to over MQTT. The app is the frontend of a system it
  doesn't control.
- The split is deliberate: the desk owns what happened and the app owns what
  it's worth, so either side can be replaced without touching the other.

## Where it stands

The app is finished: the token economy, the shop and the aquarium all work.
What it doesn't have yet is real input, because the desk firmware is still in
progress, so for now it runs against sample data.

The art is not final either. Every fish, background and icon in the screenshots
above is a placeholder, enough to get the mechanics working and nothing more.
The visual design is the last thing I plan to settle.

## What's next

A standalone mode with a built-in timer, for anyone who wants the aquarium
without wiring an ESP32 to their desk. The app counts the block itself and
feeds the same token economy, which makes FocusReef usable on its own instead
of as one half of a system. It also improves the design, because it forces the
block source to be an interface rather than an assumption.
