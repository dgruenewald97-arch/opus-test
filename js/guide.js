// GRELLWERK — BRUMMER interactive onboarding guide (state machine).
import { GUIDE_STEPS, QUIPS, COPY } from "./config.js";
import { scrollToEl } from "./scroll.js";

export function initGuide({ reducedMotion }) {
  const guide = document.getElementById("guide");
  const tab = document.getElementById("guide-tab");
  const textEl = document.getElementById("guide-text");
  const countEl = document.getElementById("guide-count");
  const nextBtn = document.getElementById("guide-next");
  const skipBtn = document.getElementById("guide-skip");
  const mascot = document.getElementById("guide-mascot");
  if (!guide || !tab) return null;

  const state = {
    index: 0,
    active: false,
    lastHighlight: null,
    quipCooldown: false,
  };

  const seen = () => {
    try { return localStorage.getItem(COPY.storageKey) === "1"; }
    catch (_) { return false; }
  };
  const markSeen = () => { try { localStorage.setItem(COPY.storageKey, "1"); } catch (_) {} };

  function clearHighlight() {
    if (state.lastHighlight) {
      state.lastHighlight.classList.remove("guide-highlight");
      state.lastHighlight = null;
    }
  }

  function showStep(i) {
    const step = GUIDE_STEPS[i];
    if (!step) return finish();
    state.index = i;
    textEl.textContent = step.text;
    countEl.textContent = `Schritt ${i + 1} / ${GUIDE_STEPS.length}`;
    nextBtn.textContent = i === GUIDE_STEPS.length - 1 ? "Fertig ✓" : "Weiter →";

    clearHighlight();
    const target = document.querySelector(step.selector);
    if (target) {
      scrollToEl(target);
      target.classList.add("guide-highlight");
      state.lastHighlight = target;
    }
  }

  function start() {
    tab.hidden = true;
    guide.hidden = false;
    state.active = true;
    if (!reducedMotion) {
      guide.classList.add("is-entering");
      requestAnimationFrame(() =>
        requestAnimationFrame(() => guide.classList.remove("is-entering"))
      );
    }
    showStep(0);
  }

  function next() {
    if (state.index >= GUIDE_STEPS.length - 1) return finish();
    showStep(state.index + 1);
  }

  function minimize() {
    state.active = false;
    clearHighlight();
    guide.hidden = true;
    tab.hidden = false;
  }

  function finish() { markSeen(); minimize(); }
  function skip() { markSeen(); minimize(); }
  function replay() { start(); }

  // --- Eye tracking (pupils follow cursor) ---
  if (!reducedMotion && mascot) {
    const pupils = mascot.querySelectorAll(".brummer__pupil");
    let raf = null, mx = 0, my = 0;
    window.addEventListener("mousemove", (e) => {
      mx = e.clientX; my = e.clientY;
      if (!raf) raf = requestAnimationFrame(updateEyes);
    });
    function updateEyes() {
      const r = mascot.getBoundingClientRect();
      const cxp = r.left + r.width / 2;
      const cyp = r.top + r.height / 2;
      const ang = Math.atan2(my - cyp, mx - cxp);
      const dx = Math.cos(ang) * 2.2;
      const dy = Math.sin(ang) * 2.2;
      pupils.forEach((p) => {
        const bx = p.getAttribute("cx");
        const by = p.getAttribute("cy");
        p.setAttribute("transform", `translate(${dx} ${dy})`);
        void bx; void by;
      });
      raf = null;
    }
  }

  // --- Passive quips via IntersectionObserver ---
  const sections = document.querySelectorAll("[data-guide-step]");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const key = entry.target.getAttribute("data-guide-step");
        // guided mode keeps its own pointing; quips only when inactive + minimized
        if (state.active || guide.hidden === false) return;
        if (tab.hidden) return; // tab not shown yet (first visit auto-tour pending)
        const quip = QUIPS[key];
        if (quip && !state.quipCooldown) {
          state.quipCooldown = true;
          textEl.textContent = quip;
          // briefly peek the bubble without full takeover
          setTimeout(() => { state.quipCooldown = false; }, 6000);
        }
      });
    },
    { threshold: 0.45 }
  );
  sections.forEach((s) => io.observe(s));

  // --- Controls ---
  nextBtn.addEventListener("click", next);
  skipBtn.addEventListener("click", skip);
  tab.addEventListener("click", replay);
  document.getElementById("replay-guide")?.addEventListener("click", replay);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && state.active) skip();
  });

  // --- Boot ---
  if (seen()) {
    tab.hidden = false; // returning visitor: minimized, replayable
  } else {
    setTimeout(start, reducedMotion ? 200 : 900); // first visit: auto-tour
  }

  return { replay, start, minimize };
}
