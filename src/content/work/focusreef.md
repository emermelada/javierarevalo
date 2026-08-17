---
title: FocusReef
tagline: A productivity app where 25-minute focus blocks become tokens, and tokens buy fish for an aquarium that only grows if you actually work.
year: '2025'
role: Personal project — Android app
stack: [Kotlin, Android, NAS-hosted database, Time-series data]
summary: The application half of the desk system — it reads the focus blocks the ESP32 controller publishes and turns them into an aquarium you spend them on.
order: 3
sub: true
status: shipped
statusNote: App complete; running on sample data until the desk firmware publishes real blocks
related:
  slug: smart-desk
  prefix: Reads the focus blocks published by
  name: the ESP32 desk
links:
  - label: Repository
    url: https://github.com/emermelada/FocusReef
---

## Problem

Gamified focus apps ask you to be honest with them. You press start, you press
stop, and nothing checks whether you were at the desk in between — which is
exactly the moment the game stops meaning anything.

The desk already knows. It runs the Pomodoro cadence, it moves at the start and
end of a block, and it publishes what happened. If the reward comes from that
record rather than from a button, the score is something you earned rather than
something you claimed.

## Solution

An Android app in the Forest lineage, with the loop moved off the phone:

- **Blocks become tokens.** A completed focus block is worth tokens; tokens buy
  fish and aquariums. The aquarium is a readout of accumulated work, so
  progress you can see is progress that actually happened.
- **The data comes from the desk.** Blocks are read from a time-series database
  hosted on a NAS, which the ESP32 controller writes to over MQTT. The app is
  the frontend of a system it doesn't control.
- **Separation on purpose.** The desk owns the truth about what happened; the
  app owns what that's worth. Neither has to know how the other works, and
  either can be replaced without touching the other.

## Where it stands

The app is finished — the token economy, the shop and the aquarium all work.
What it doesn't have yet is real input: the desk firmware is still in progress,
so it currently runs against sample data.

## What's next

A standalone mode with a built-in timer, for anyone who wants the aquarium
without wiring an ESP32 to their desk. The app counts the block itself and
feeds the same token economy. It's the version that makes FocusReef usable on
its own rather than as one half of a system — and it's a useful constraint on
the design, because it forces the block source to be an interface rather than
an assumption.
