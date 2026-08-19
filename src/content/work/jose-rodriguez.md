---
title: José Rodríguez · Filmmaker Portfolio
tagline: A single-page portfolio for a professional Steadicam operator, built and deployed in under 48 hours.
year: '2026'
role: Client work · build, review & deployment
stack: [AI-assisted build, GitHub Pages, Cloudflare, Code review]
summary: I wrote the brief, generated the UI with an AI assistant, reviewed and fixed the code myself, and handled the domain and deployment.
order: 4
status: shipped
statusNote: Live since 2026
links:
  - label: joserodriguez.mov
    url: https://joserodriguez.mov
gallery:
  - src: /work/jose-rodriguez-video.jpg
    alt: The video section of joserodriguez.mov, showing a grid of stills from the short film Amapolas over a dark background.
    caption: The video section, a grid of stills from the short film Amapolas
    width: 1600
    height: 798
---

## Problem

A working Steadicam operator needed a professional web presence quickly, on a
small budget, and good enough to send to producers. Agency timelines and
pricing didn't fit, and an off-the-shelf template would have looked like one.

## Solution

I used a language model to write most of the UI and kept the parts that decide
whether the result is any good:

- Defined the content structure and the brief, then iterated on the UI with the
  model instead of typing every line myself.
- Read and fixed the generated code before anything shipped: bugs,
  accessibility, semantics, structure.
- Deployed it on GitHub Pages and set up the custom domain with SSL/TLS through
  Cloudflare.

## Result

The site went live at [joserodriguez.mov](https://joserodriguez.mov) in under 48
hours. The client maintains nothing: hosting is free and TLS renews itself. I
have since reused the same process for other small sites.
