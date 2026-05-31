// GRELLWERK — orchestrator. Initializes modules in order with graceful fallbacks.
import { loadEnhancements } from "./cdn.js";
import { initCursor } from "./cursor.js";
import { initNav, initScramble, initMarquee, initForm, initCounters, initRotator } from "./effects.js";
import { initScroll } from "./scroll.js";
import { initGuide } from "./guide.js";
import { initKonfigurator } from "./konfigurator.js";
import { initGenerator } from "./generator.js";
import { initJournal } from "./journal.js";
import { COPY, KONFIGURATOR, SLOGAN } from "./config.js";

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

async function boot() {
  // Pure-vanilla effects first — these never depend on a CDN.
  initNav();
  initMarquee();
  initScramble({ reducedMotion });
  initCounters({ reducedMotion });
  initRotator({ reducedMotion });
  initKonfigurator({ KONFIGURATOR });
  initGenerator({ SLOGAN, reducedMotion });
  initJournal();

  // BRUMMER + form are pure-vanilla and must NOT wait on the optional CDN load:
  // a slow/blocked CDN would otherwise delay or drop the guide entirely (it was
  // missing on some pages for exactly this reason). The guide uses native scroll.
  const guide = initGuide({ reducedMotion });
  initForm({
    COPY,
    onSuccess: () => guide?.replay?.(),
  });

  // Load optional CDN enhancements (GSAP). Failures/timeouts are swallowed.
  const { gsap, ScrollTrigger, Lenis } = await loadEnhancements();

  initScroll({ reducedMotion, gsap, ScrollTrigger, Lenis });
  initCursor({ reducedMotion, gsap });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}
