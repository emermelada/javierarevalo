---
title: Autonomous Smart Standing Desk
tagline: An ESP32 controller that turns an ordinary electric desk into an autonomous, safety-aware ergonomic device.
year: '2025'
role: Personal project — hardware & firmware
stack: [C++, ESP32, FSM & ISR, PC817 Optocouplers, VL53L0X ToF]
summary: A cyber-physical system that intercepts a desk's control lines to drive posture changes in software — with a predictive optical safety layer.
order: 1
# To embed the project video once it's on YouTube, uncomment and set the
# video ID (the part after watch?v= in the URL):
# youtube: VIDEO_ID
---

## Problem

Sitting for hours is the default, and standing desks don't fix it — you still
have to remember to press the button. I wanted the desk itself to own the
routine: change my posture on a schedule, without my intervention, and without
ever moving into something (or someone) in its path.

## Solution

An ESP32-based controller wired between the desk's original keypad and its
motor controller:

- Intercepts the desk's physical control lines through PC817 optocouplers, so
  height changes can be driven in software while the original controls keep
  working.
- A non-blocking finite-state machine (interrupt-driven, no `delay()`) runs a
  timed "physical Pomodoro": the desk prompts a sit/stand change on schedule.
- A predictive optical safety layer reads VL53L0X Time-of-Flight sensors
  *before* any movement starts, aborting the manoeuvre if the path is blocked —
  collision avoidance, not collision reaction.

## Result

The desk now runs unattended through the workday, alternating postures on a
schedule I set once. The safety layer has priority over every state
transition, and the firmware never blocks — sensor polling, motion control and
the schedule all cooperate on a single core.
