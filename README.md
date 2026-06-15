# Portfolio - Javier Arévalo

Personal portfolio website showcasing my professional background, projects, and skills as a Software Developer with a focus on Cloud & DevOps. 

You can view the live site here: (https://emermelada.github.io/javierarevalo)

## Overview
This is a single-page static application designed to be fast, responsive, and easy to navigate. It details my trajectory from Android development (Kotlin) to Cloud infrastructure (Microsoft Azure, Dynamics 365, Serverless) and embedded hardware (IoT / C++). 

## Tech Stack
The site is built with modern, lightweight web technologies without relying on heavy frameworks:

* **HTML5 / CSS3**
* **Vanilla JavaScript:** For DOM manipulation, scroll animations, the carousel, and the interactive canvas.
* **Pretext.js:** High-performance, DOM-free text layout engine used to handle text/label rendering mathematically inside the canvas without triggering browser reflows.
* **Tailwind CSS (via CDN):** For rapid and responsive UI styling.
* **HTML5 Canvas API:** Custom interactive node network graphic on the hero section.
* **FontAwesome:** Scalable vector icons.
* **Google Fonts:** Typography (`Plus Jakarta Sans`).

## Project Structure
The entire application logic is contained within a single `index.html` file to keep the deployment simple.
* **`<style>` block:** Contains custom scrollbar overrides, animations, and the cursor tracking logic.
* **`<main>` content:** Organized logically into sections (`#about`, `#experience`, `#projects`, `#ai-builds`, `#skills`).
* **`<script>` block:** Contains modular Vanilla JS handling the mobile menu, email clipboard interaction, project carousel logic, scroll observers, and the interactive particle canvas integrated with Pretext.js.

## Features
* **Interactive Canvas:** A custom node network animation that reacts to mouse movement on desktop, simulating tech stack connections. Uses Pretext.js to mathematically compute text metrics, ensuring the background animation and text rendering stay fluid at 60+ FPS with zero layout thrashing.
* **Responsive Design:** Fully tailored for mobile and large screens (up to `2xl` breakpoints).
* **A11y Considerations:** Respects system-level `prefers-reduced-motion` settings to disable heavy animations and glow effects.
* **Custom Scroll Animations:** Uses `IntersectionObserver` to reveal content smoothly as the user scrolls.

## Running Locally
Since it consists of pure HTML/CSS/JS, no build steps or package managers are required.
1. Clone the repository: `git clone https://github.com/emermelada/portfolio.git`
2. Open `index.html` in your preferred browser. 
*(Alternatively, use an extension like Live Server in VSCode for auto-reloading).*

## Contact & Links
* **LinkedIn:** [Javier Arévalo](https://www.linkedin.com/in/javier-arevalo-hernandez)
* **Email:** javier.arevalo.11111@gmail.com
