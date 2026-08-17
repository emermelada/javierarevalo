---
title: Height-Adjustable Desk — ESP32 Controller
tagline: An ESP32 wired into a Flexispot desk so it changes height on a schedule, stops if something is in the way, and reports what it did.
year: '2025'
role: Personal project — hardware & firmware
stack: [C++, ESP32, FSM & ISR, PC817 Optocouplers, VL53L0X ToF, MQTT]
summary: An ESP32 between the desk's keypad and its motor controller, so posture changes happen on a schedule instead of when I remember to press a button — and every block it runs becomes data.
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

Sitting for hours is the default, and a standing desk doesn't fix it — you
still have to remember to press the button. I wanted the desk itself to own the
routine: change posture on a schedule, without my intervention, and without
ever moving into something (or someone) in its path.

The second half of the problem is that a desk that runs a routine knows things
worth keeping. How long I actually stood. Whether a focus block finished or got
cut short. That data has nowhere to go unless the desk publishes it.

## Solution

An ESP32-based controller wired between the desk's original keypad and its
motor controller:

- **Control without replacement.** The desk's physical control lines are
  intercepted through PC817 optocouplers, so height changes can be driven in
  software while the original keypad keeps working exactly as it did. Nothing
  about the desk becomes dependent on my firmware being up.
- **Two modes on one state machine.** An ergonomic mode alternates sitting and
  standing on a fixed cadence; a Pomodoro mode ties the height change to the
  start and end of a 25-minute focus block. Both run on the same
  interrupt-driven finite-state machine, non-blocking and with no `delay()`,
  so sensor polling, motion control and the schedule cooperate on a single
  core.
- **Anticipatory safety, not reactive.** An array of three VL53L0X
  Time-of-Flight sensors is read *before* any movement starts, and the
  manoeuvre aborts if the path is blocked. The safety check has priority over
  every state transition — a desk that stops after hitting something has
  already failed.
- **Telemetry over MQTT.** Completed blocks are published to a time-series
  database on a NAS, which is what turns a desk routine into something a second
  application can read.

## Where it stands

The hardware design is settled: components chosen, optocoupler interface to the
keypad worked out, sensor array positioned, and the MQTT topic layout and
database schema defined. The firmware is the part still being written — the
state machine and the safety layer are the pieces I'm building now.

I'm publishing it at this stage on purpose. The interesting decisions in a
project like this are made before the code compiles: whether to replace the
controller or sit beside it, whether safety is checked before or during motion,
and what a "block" is once it has to survive a reboot.
