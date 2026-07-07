---
title: Mount Stray — Roguelike
tagline: A roguelike whose maps are generated fresh every run from a small set of algorithmic primitives.
year: '2024'
role: Personal project — design & code
stack: [Java, 'Graphs · BFS/DFS', Perlin Noise]
summary: Procedural generation built on dynamic node networks, graph search for guaranteed connectivity, and Perlin noise for organic variation.
order: 2
---

## Problem

Hand-authored levels are finite: once a player has memorised the map, a
roguelike loses its tension. The game needed maps that are different on every
run, yet always *playable* — no unreachable rooms, no dead ends that trap a
player, no layouts that feel machine-stamped.

## Solution

A generation pipeline built from three primitives:

- A dynamic node network is built per run to define the level's topology —
  rooms and corridors as a graph, not a grid of tiles.
- Graph search (BFS/DFS) validates connectivity and traversal before the level
  is accepted: every room reachable, every exit meaningful.
- Perlin noise drives the organic details — terrain variation and layout
  irregularity — so no two runs read as repeats even with the same topology
  rules.

## Result

Every run starts on a map nobody has seen before, including me. The
graph-first approach means correctness (connectivity, traversal guarantees) is
proven structurally, while the noise layer keeps the output feeling
hand-crafted rather than generated.
