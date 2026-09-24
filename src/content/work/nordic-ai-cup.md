---
title: Nordic AI Cup 2026
tagline: Four days, three AI challenges and one graded attempt at each. Our SDU team finished 1st in Denmark and 2nd across the Nordics, and goes on to the final in Iceland.
year: '2026'
role: Team Elysa's Secret · lead on Drone Flyby
stack: [Python, YOLO11, PyTorch, FastAPI, Docker, Kaggle, Cloudflare Tunnel]
summary: A four-person team from the University of Southern Denmark. Each challenge was a live HTTP service the organisers' grader called in real time. I owned Drone Flyby, a real-time object detector steering its own camera.
order: 1
status: in-progress
statusNote: 1st in Denmark, 2nd in the Nordics. The final in Iceland is next
links:
  - label: Repository
    url: https://github.com/emermelada/nordic-ai-cup
---

## Problem

The Nordic AI Cup gives each team four days and three unrelated problems:
answering questions about a recorded medical consultation, keeping a simulated
colony alive, and spotting objects from a drone. Nothing is submitted as a
file. Each solution is a web service the team hosts itself, the grader calls it
live, and every challenge has exactly **one** graded attempt.

My part was **Drone Flyby**. A drone films a synthetic landscape in 4K, and the
service has to find sixteen kinds of object in each frame (tanks, hangars,
launchers, planes…) while choosing where to point a 960×540 camera, with a
third of a second per frame. The organisers gave us 25 labelled frames, one
example of each class.

## Solution

- **Training data from almost nothing.** I cut the 25 labelled objects out of
  their frames and pasted them onto real aerial photos to build a training
  set, then trained YOLO11 detectors on Kaggle and rented GPUs. The first
  model scored 0.79 locally and 0.01 on validation: it had memorised the one
  city it was trained on.
- **Better detectors stopped paying.** Four attempts at a stronger single
  model all failed. What worked was serving several models that fail on
  different classes, each at its own resolution, and matching the grader's
  box convention, which alone was worth +0.157. Adding a model never lost;
  replacing one never won.
- **Distrusting my own numbers.** A container that looked healthy was serving
  stale code, one rented host cut the score to 0.19 through a congested
  network, and single runs varied by ±0.005 at best. From then on every
  setting ran about three times, and I checked what was actually loaded and
  how many frames were answered.
- **A service built for the deadline.** FastAPI in Docker, five detector
  passes per frame, a tracker that refits the ground motion during the flight,
  and a camera that alternates quadrant views with whole-frame views, all
  inside a third of a second.
- **Only settings that should generalise.** Per-class box sizes, thresholds
  and extra passes looked good offline but lost on the real grader, so they
  were dropped.

## Result

Across the three challenges the team scored **45 points: 1st in Denmark and
2nd in the Nordic region**, which qualifies us for the final in Iceland.

| Challenge | Graded score | Denmark rank |
|---|---|---|
| Medical Appointment | 0.822 | 1st |
| Survival Simulator | 1405.3 | 4th |
| Drone Flyby | 0.263 | 6th |

How the Drone Flyby validation score moved (COCO mAP@0.5, macro over 16
classes):

| Day | Change | Validation |
|---|---|---|
| 17 Sep | Objects pasted onto 25 frames of one city | 0.011–0.035 |
| 17 Sep | Real aerial backgrounds, real cut-outs, blended pasting | 0.1445 |
| 18 Sep | Two models that fail on different classes | 0.2365 |
| 18 Sep | Each model at its own resolution | 0.3048 |
| 19 Sep | The grader's box convention | 0.4618 |
| 19 Sep | Three models, box growth, a 4th pass at 2560 px | 0.5270 (mean of 4) |
| 20 Sep | Whole-frame views in the camera sweep, 5 passes | 0.5841 (mean of 7) |
| 20 Sep | **Graded evaluation, unseen flight** | **0.2630** |

All 249 evaluation frames were answered without errors, yet less than half of
the validation score carried over. The likely cause is visible in the
repository: about 60% of the training backgrounds were cut from the validation
flight itself, so the detectors had learned its terrain. That is the lesson I
am taking to Iceland: a validation score you tune against is not a score you
have earned. The repository documents exactly what was graded for each
challenge, including what we tried and rejected.
