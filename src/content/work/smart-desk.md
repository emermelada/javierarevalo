---
title: Height-Adjustable Desk with an ESP32 Controller
tagline: An ESP32 wired into a Flexispot desk so it changes height on a schedule, stops if something is in the way, and records what it did.
year: '2026'
role: Personal project · hardware & firmware
stack: [ESP32, FSM & ISR, PC817 Optocouplers, VL53L0X ToF, MQTT]
summary: An ESP32 sits between the desk's keypad and its motor controller, so posture changes happen on a schedule instead of when I remember to press a button. Every block it runs gets recorded as well.
order: 2
status: in-progress
statusNote: Architecture and components defined, firmware in progress
related:
  slug: focusreef
  prefix: Publishes its focus blocks to
  name: FocusReef
links: []
# To embed the project video once it's on YouTube, uncomment and set the
# video ID (the part after watch?v= in the URL):
# youtube: VIDEO_ID
---

## Problem

A standing desk only helps if you actually raise it, and I never remembered to
press the button. What I wanted was for the desk to handle the routine itself:
change posture on a schedule, without me, and without ever driving into
something (or someone) in the way.

There is a second part to this. A desk that runs the routine also knows how
long I stood and whether a focus block finished or got cut short, and that
information is lost unless the desk sends it somewhere.

## Solution

An ESP32-based controller wired between the desk's original keypad and its
motor controller:

- The desk's control lines are intercepted through PC817 optocouplers rather
  than replacing the controller, so height changes can be driven in software
  while the original keypad keeps working exactly as it did. Nothing about the
  desk depends on my firmware being up.
- Two modes run on the same interrupt-driven state machine: an ergonomic mode
  that alternates sitting and standing on a fixed cadence, and a Pomodoro mode
  that ties the height change to the start and end of a 25-minute focus block.
  There are no `delay()` calls anywhere, so sensor polling, motion control and
  the schedule share a single core without blocking each other.
- An array of three VL53L0X Time-of-Flight sensors is read *before* any
  movement starts, and the manoeuvre aborts if the path is blocked. The check
  runs ahead of every state transition instead of reacting once the desk is
  already moving.
- Completed blocks are published over MQTT to a time-series database on a NAS,
  which is what lets a second application read them.

## Where it stands

The hardware design is settled: components chosen, optocoupler interface to the
keypad worked out, sensor array positioned, and the MQTT topic layout and
database schema defined. The firmware is the part still being written, starting
with the state machine and the safety layer.

I'm publishing it at this stage on purpose. Most of the decisions in a project
like this are made before the code compiles: whether to replace the controller
or sit beside it, whether safety is checked before or during motion, and what
counts as a "block" once it has to survive a reboot.
