// GRELLWERK — smooth scroll (Lenis if available) + reveal animations.
// Falls back to IntersectionObserver + CSS transitions when GSAP is absent.

let lenisInstance = null;

export function initScroll({ reducedMotion, gsap, ScrollTrigger, Lenis }) {
  // Smooth scroll (Lenis) is disabled on purpose — native scrolling feels
  // snappier. `lenisInstance` stays null, so scrollToEl() below uses the
  // native window.scrollTo fallback.

  // --- Reveal on scroll ---
  const revealEls = document.querySelectorAll("[data-reveal]");
  if (reducedMotion) {
    revealEls.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  if (gsap && ScrollTrigger) {
    revealEls.forEach((el) => {
      ScrollTrigger.create({
        trigger: el,
        start: "top 88%",
        once: true,
        onEnter: () => el.classList.add("is-visible"),
      });
    });
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  }
}

// Shared smooth-scroll helper used by the guide.
// reducedMotion=true springt ohne Animation (respektiert prefers-reduced-motion).
export function scrollToEl(el, reducedMotion = false) {
  if (!el) return;
  if (lenisInstance) {
    lenisInstance.scrollTo(el, { offset: -80, duration: reducedMotion ? 0 : 1.0 });
  } else {
    const y = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top: y, behavior: reducedMotion ? "auto" : "smooth" });
  }
}
