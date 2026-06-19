/* =============================================================================
   Javier Arévalo — Portfolio
   main.js

   Plain ES module, no framework, no build step — runs straight off GitHub Pages.
   Behaviour is split into small, independent modules; each owns one concern and
   fails quietly if its DOM hooks are absent. They're wired up at the bottom once
   the DOM is ready. The interactions are deliberately restrained: a reading
   progress bar, scroll-spy navigation, on-scroll reveals, the mobile menu, and a
   clipboard-aware contact link. No decorative animation.

   Author: Javier Arévalo
============================================================================= */

"use strict";

const PREFERS_REDUCED_MOTION = window.matchMedia(
	"(prefers-reduced-motion: reduce)"
).matches;

/* -----------------------------------------------------------------------------
   Reading-progress bar
   Drives the width of the top bar from the document's scroll position. Throttled
   to one update per animation frame so scrolling stays smooth.
----------------------------------------------------------------------------- */
function initProgress() {
	const bar = document.querySelector("[data-progress]");
	if (!bar) return;

	let ticking = false;
	const update = () => {
		const doc = document.documentElement;
		const scrollable = doc.scrollHeight - doc.clientHeight;
		const ratio = scrollable > 0 ? doc.scrollTop / scrollable : 0;
		bar.style.width = `${Math.min(1, Math.max(0, ratio)) * 100}%`;
		ticking = false;
	};

	window.addEventListener(
		"scroll",
		() => {
			if (ticking) return;
			ticking = true;
			requestAnimationFrame(update);
		},
		{ passive: true }
	);
	update();
}

/* -----------------------------------------------------------------------------
   Mobile navigation
   Toggles the slide-down menu and keeps aria-expanded honest. Selecting a link
   closes the menu.
----------------------------------------------------------------------------- */
function initMobileNav() {
	const toggle = document.querySelector("[data-nav-toggle]");
	const menu = document.querySelector("[data-mobile-nav]");
	if (!toggle || !menu) return;

	const setOpen = (open) => {
		menu.toggleAttribute("data-open", open);
		toggle.setAttribute("aria-expanded", String(open));
		toggle.textContent = open ? "Close" : "Menu";
	};

	toggle.addEventListener("click", () => setOpen(!menu.hasAttribute("data-open")));
	menu.querySelectorAll("a").forEach((link) =>
		link.addEventListener("click", () => setOpen(false))
	);
}

/* -----------------------------------------------------------------------------
   Copy-email interaction
   [data-copy-email] copies the address and flashes confirmation, then still
   opens the mail client. Degrades to a plain mailto: where the Clipboard API is
   unavailable (e.g. non-HTTPS origins) or denied.
----------------------------------------------------------------------------- */
function initCopyEmail() {
	const EMAIL = "javier.arevalo.11111@gmail.com";

	document.querySelectorAll("[data-copy-email]").forEach((btn) => {
		const label = btn.querySelector("[data-label]") || btn;

		btn.addEventListener("click", (event) => {
			event.preventDefault();
			const open = () => {
				window.location.href = `mailto:${EMAIL}`;
			};

			if (!navigator.clipboard) {
				open();
				return;
			}
			navigator.clipboard
				.writeText(EMAIL)
				.then(() => {
					const original = label.textContent;
					label.textContent = "Copied to clipboard";
					setTimeout(() => {
						label.textContent = original;
					}, 2000);
					open();
				})
				.catch(open);
		});
	});
}

/* -----------------------------------------------------------------------------
   Scroll-reveal
   Plays the entrance transition (defined in CSS) the first time an element
   enters view, then unobserves it. With reduced motion the CSS already shows
   everything, so we just mark it revealed.
----------------------------------------------------------------------------- */
function initScrollReveal() {
	const targets = document.querySelectorAll("[data-reveal]");
	if (PREFERS_REDUCED_MOTION || !("IntersectionObserver" in window)) {
		targets.forEach((el) => el.classList.add("is-revealed"));
		return;
	}

	const observer = new IntersectionObserver(
		(entries, obs) => {
			entries.forEach((entry) => {
				if (!entry.isIntersecting) return;
				entry.target.classList.add("is-revealed");
				obs.unobserve(entry.target);
			});
		},
		{ threshold: 0.1 }
	);
	targets.forEach((el) => observer.observe(el));
}

/* -----------------------------------------------------------------------------
   Scroll-spy
   Highlights the nav link whose section is centred in the viewport. The
   asymmetric rootMargin focuses the observer on a band across the middle of the
   screen, so a link activates as its section crosses the centre.
----------------------------------------------------------------------------- */
function initScrollSpy() {
	const links = Array.from(document.querySelectorAll('.nav__link[href^="#"]'));
	if (!links.length || !("IntersectionObserver" in window)) return;

	const linkFor = new Map();
	links.forEach((link) => {
		const section = document.getElementById(link.getAttribute("href").slice(1));
		if (section) linkFor.set(section, link);
	});
	if (!linkFor.size) return;

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (!entry.isIntersecting) return;
				links.forEach((l) => l.classList.remove("is-active"));
				linkFor.get(entry.target)?.classList.add("is-active");
			});
		},
		{ rootMargin: "-45% 0px -50% 0px", threshold: 0 }
	);
	linkFor.forEach((_link, section) => observer.observe(section));
}

/* -----------------------------------------------------------------------------
   Project videos — YouTube "facade"
   For each media slot marked [data-youtube="<id>"], we render the video's
   thumbnail with a play button and load nothing else. The heavy YouTube player
   is only injected when the visitor actually clicks play — keeping the page fast
   and avoiding YouTube's tracking until it's wanted. Slots without a video id
   (the [data-soon] placeholders) are styled in CSS and left untouched here, so
   adding a real video later is a one-attribute change in the HTML.
----------------------------------------------------------------------------- */
function initVideos() {
	document.querySelectorAll(".entry__media[data-youtube]").forEach((slot) => {
		const id = slot.getAttribute("data-youtube");
		if (!id) return;
		const title = slot.getAttribute("data-title") || "Project video";

		// Thumbnail. `maxresdefault` is the sharpest but isn't generated for
		// every video, so fall back to `hqdefault` (always present) on error.
		const img = document.createElement("img");
		img.alt = "";
		img.loading = "lazy";
		img.src = `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
		img.addEventListener(
			"error",
			() => {
				img.src = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
			},
			{ once: true }
		);

		// Accessible play control sitting over the thumbnail.
		const button = document.createElement("button");
		button.type = "button";
		button.className = "entry__play";
		button.setAttribute("aria-label", `Play video: ${title}`);

		slot.append(img, button);

		// On click, swap the facade for the real player and autoplay. We use the
		// privacy-friendly nocookie host.
		button.addEventListener("click", () => {
			const iframe = document.createElement("iframe");
			iframe.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
			iframe.title = title;
			iframe.loading = "lazy";
			iframe.allow =
				"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
			iframe.allowFullscreen = true;
			slot.replaceChildren(iframe);
		});
	});
}

/* -----------------------------------------------------------------------------
   Boot
----------------------------------------------------------------------------- */
function boot() {
	initProgress();
	initMobileNav();
	initCopyEmail();
	initScrollReveal();
	initScrollSpy();
	initVideos();
}

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", boot);
} else {
	boot();
}
