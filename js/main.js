// GRELLWERK — orchestrator. Initializes modules in order with graceful fallbacks.
import { loadEnhancements } from "./cdn.js";
import { initCursor } from "./cursor.js";
import { initScramble, initMarquee, initForm } from "./effects.js";
import { initScroll } from "./scroll.js";
import { initGuide } from "./guide.js";
import { COPY } from "./config.js";

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

async function boot() {
  // Pure-vanilla effects first — these never depend on a CDN.
  initMarquee();
  initScramble({ reducedMotion });

  // Load optional CDN enhancements (GSAP / Lenis). Failures are swallowed.
  const { gsap, ScrollTrigger, Lenis } = await loadEnhancements();

  initScroll({ reducedMotion, gsap, ScrollTrigger, Lenis });
  initCursor({ reducedMotion, gsap });

  const guide = initGuide({ reducedMotion });

  initForm({
    COPY,
    onSuccess: () => guide?.replay?.(),
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}
