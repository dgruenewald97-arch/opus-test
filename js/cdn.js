// GRELLWERK — optional CDN library loader with graceful degradation.
// Everything here is enhancement-only; the site fully works if all imports fail.
import { FLAGS } from "./config.js";

export async function loadEnhancements() {
  let gsap = null;
  let ScrollTrigger = null;
  let Lenis = null;

  try {
    const mod = await import("gsap");
    gsap = mod.gsap || mod.default;
    try {
      const stMod = await import("gsap/ScrollTrigger");
      ScrollTrigger = stMod.ScrollTrigger || stMod.default;
      if (gsap && ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
    } catch (_) { /* ScrollTrigger optional */ }
    FLAGS.gsap = !!gsap;
  } catch (_) {
    FLAGS.gsap = false;
  }

  // Lenis smooth-scroll is intentionally NOT loaded: smoothWheel interpolates
  // every wheel/trackpad event over ~1s, which makes scrolling feel laggy.
  // We use native scrolling instead (snappy, 1:1). GSAP/ScrollTrigger reveals
  // and the guide's scrollTo still work fine on native scroll.
  FLAGS.lenis = false;

  // expose for debugging / verification
  window.__FLAGS = { ...FLAGS };
  return { gsap, ScrollTrigger, Lenis };
}
