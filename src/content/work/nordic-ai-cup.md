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
  their frames and pasted them onto thousands of backgrounds to build a
  training set, then trained YOLO11 detectors on Kaggle and rented GPUs.
- **Finding the real problem.** The first models scored 0.79 locally and 0.01
  on validation. Measuring why showed the detector had memorised the one city
  it was trained on. Rebuilding the whole validation flight from recorded
  frames and training on that terrain is what moved the score, not model size
  or camera tricks.
- **A service built for the deadline.** FastAPI in Docker, five detector passes
  per frame, a tracker that refits the ground motion during the flight, and a
  fixed camera sweep, all answering inside the frame budget.
- **Only settings that generalise.** Anything tuned per class was measured on
  the real grader and thrown out, because the evaluation is a different flight.

## Result

Across the three challenges the team scored **45 points: 1st in Denmark and
2nd in the Nordic region**, which qualifies us for the final in Iceland.

| Challenge | Graded score | Denmark rank |
|---|---|---|
| Medical Appointment | 0.822 | 1st |
| Survival Simulator | 1405.3 | 4th |
| Drone Flyby | 0.263 | 6th |

Drone Flyby averaged 0.584 on validation and 0.263 on the unseen evaluation
flight, with all 249 frames answered. That gap is the lesson I am taking to
Iceland: a validation score you tune against is not a score you have earned.
The repository documents exactly what was graded for each challenge, including
what we tried and rejected.
