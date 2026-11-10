---
title: Pharos
tagline: A swarm brain for five uncrewed boats that guard undersea cables, built in one weekend at EDTH Copenhagen 2026. When a boat fails, the others take over its work, and the shore sees what is still uncovered.
year: '2026'
role: Team Elysa's Secret · swarm brain and message contract
stack: [Python, Deterministic simulation, Auctions, pydantic, Hypothesis, TypeScript]
summary: Five boats with no leader share a task table over a modelled radio and auction the work among themselves. I wrote that swarm brain, the shore's picture of the fleet and the message contract between the Python simulator and the TypeScript console.
order: 1
status: shipped
gallery:
  - src: /work/pharos-contact.jpg
    alt: The operator console over a chart of the Great Belt. Five boats sit on cable and lane stations; a contact with no AIS match is circled on the HVDC cable, and a held decision on the right asks the operator to approve a closer look.
    caption: A contact with no AIS match, kept in view while a closer look waits for the operator
    width: 1500
    height: 844
  - src: /work/pharos-relay-loss.jpg
    alt: The same console after the relay boat is switched off. Boats the shore cannot hear show how long ago they last reported, and a panel lists what changed since the operator last looked.
    caption: The relay boat switched off. Boats the shore cannot hear show the age of their last report
    width: 1500
    height: 844
---

## Problem

Challenge 07 at EDTH Copenhagen, the European Defence Tech Hackathon, asked for
swarm coordination on a real mission. Ours: three power and data cables run
under the Great Belt, one of the busiest shipping lanes in Danish waters. Five
small uncrewed boats patrol a 25 × 10 km box around them, and one watch officer
on shore is responsible for all of it.

Small boats fail in ordinary ways. A battery runs low, a radio link drops, a
boat goes home to charge. Someone has to reassign its work, or nobody does,
and one person cannot steer five boats by hand. We were four people with one
weekend. I owned the code that runs on every boat and the contract every other
part was built against.

## Solution

- **No leader.** Every boat runs the same code. Each holds a table of tasks
  (cable segments, lane pickets, a radio relay, contacts to keep in view) and
  merges it with what it hears. A heartbeat every 5 s is passed on for up to
  four hops, so a boat out of shore range is still heard.
- **Work is auctioned, and the bid is a time.** If an owner goes silent its
  tasks reopen, and every 12 s free boats bid on them: travel time, plus the
  patrol loop with the task added, plus penalties for low battery or working
  outside the boat's role. The relay and a contact also get a named backup,
  which takes over without a new auction.
- **A cut-off group cannot take over.** Claiming a silent boat's cables needs
  a majority of the whole fleet, not of the boats a group can still hear. I
  found and fixed the version that counted only the boats in range.
- **Every boat knows when to go home.** It times the trip back along the water
  route, against the current it measures, with a 1.2× margin and a 30-minute
  reserve, and never bids on a task it could not finish and still get back.
- **Deterministic by construction.** The boat code has no clock, no global
  randomness and no unordered iteration; time arrives as integer
  milliseconds. The same seed gives the same run byte for byte, so a run log
  replays exactly and three coordination modes can be compared on identical
  inputs.
- **The shore sees only what the radio delivered.** I wrote the shore's
  picture of the fleet: data the radio did not bring is shown with its age,
  never as live. Every assignment carries a plain-words reason (travel time,
  battery left after the task, the role it gives up). Keeping a contact in
  view is pre-approved; closing to 500 m waits for the operator.
- **A contract that let four people work at once.** The messages are pydantic
  models, exported to JSON Schema and then to TypeScript types for the
  console, and frozen on Friday night. After that, the simulator, the console
  and the evaluation were built in parallel against the same shapes.

## Result

The evaluation scenario: after a three-hour warm-up, one boat runs low on
battery and heads home, a radio link is cut and an unidentified contact
appears on a cable. Each of 30 seeds runs twice from the same warm state, once
with repair off and once with Pharos, and the two runs differ in one setting.
Every number is the evaluator's ground truth, not what the shore believed.

| Median over 30 seeds (min to max) | Repair off | Pharos | Seeds |
|---|---|---|---|
| Cable overdue at the end | 6.8 km (0.0 to 10.7) | **2.5 km** (0.0 to 6.3) | 28 better, 2 equal |
| Cable overdue on average, failure to end | 2.2 km | **0.4 km** | 28 better, 2 equal |
| Every cable segment owned by a live boat again | never | **60 s** after the failure | 29 of 30 |
| Worst time since a cable sample was seen | 16,726 s | **13,566 s** | 22 better, 8 equal |
| A boat sent to keep the contact in view | never | **10 of 30** seeds | |
| Real ship crossings within camera range (of 9) | **9** | 6 (3 to 8) | 28 worse, 2 equal |

The last row is the price. To keep the cables fresh, repair pulls a boat off
its picket on the shipping lane, so fewer real crossings happen in view. The
contact is spotted in only 12 of the 30 seeds, depending on where a patrolling
boat is in its loop when it appears. Five boats cannot cover everything. What
a swarm can do is choose where the gap lands and show the person in charge
exactly where it is.

Measured on the final build. Every seed passed the evaluator's fairness
checks.
