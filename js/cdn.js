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

  try {
    const mod = await import("lenis");
    Lenis = mod.default || mod.Lenis;
    FLAGS.lenis = !!Lenis;
  } catch (_) {
    FLAGS.lenis = false;
  }

  // expose for debugging / verification
  window.__FLAGS = { ...FLAGS };
  return { gsap, ScrollTrigger, Lenis };
}
