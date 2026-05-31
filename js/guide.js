// GRELLWERK — BRUMMER interactive onboarding guide (state machine).
import { GUIDE_STEPS, QUIPS, BRUMMER, COPY } from "./config.js";
import { scrollToEl } from "./scroll.js";

const pick = (v) => (Array.isArray(v) ? v[Math.floor(Math.random() * v.length)] : v);

export function initGuide({ reducedMotion }) {
  const guide = document.getElementById("guide");
  const tab = document.getElementById("guide-tab");
  const textEl = document.getElementById("guide-text");
  const countEl = document.getElementById("guide-count");
  const nextBtn = document.getElementById("guide-next");
  const skipBtn = document.getElementById("guide-skip");
  const mascot = document.getElementById("guide-mascot");
  if (!guide || !tab) return null;

  // Page-aware tour: keep only steps whose target exists on THIS page, in order.
  // So the homepage runs the full tour while sub-pages get their own short one.
  const steps = GUIDE_STEPS.filter((s) => document.querySelector(s.selector));
  if (!steps.length) { guide.hidden = true; tab.hidden = true; return null; }

  const state = {
    index: 0,
    active: false,
    lastHighlight: null,
    quipCooldown: false,
    mode: "tour",     // "tour" | "ask" | "peek"
    peekTimer: null,
    idleTimer: null,
  };

  const setMode = (m) => { state.mode = m; guide.dataset.mode = m; };

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

  // --- Frag-Brummer UI (dynamisch, damit das duplizierte <aside> unangetastet
  // bleibt). Chip-Leiste wird einmal in die Bubble gehängt, per Modus ein-/aus.
  const qa = document.createElement("div");
  qa.className = "guide__qa";
  BRUMMER.qa.forEach((item) => {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "guide__chip";
    chip.textContent = item.q;
    chip.addEventListener("click", () => answer(item));
    qa.appendChild(chip);
  });
  const tourChip = document.createElement("button");
  tourChip.type = "button";
  tourChip.className = "guide__chip guide__chip--tour";
  tourChip.textContent = BRUMMER.tourLabel;
  tourChip.addEventListener("click", start);
  qa.appendChild(tourChip);
  textEl.insertAdjacentElement("afterend", qa);

  // Freies Eingabefeld: tippen → Keyword-Match → Antwort. Chips sind Vorschläge.
  const askForm = document.createElement("form");
  askForm.className = "guide__ask";
  const askInput = document.createElement("input");
  askInput.type = "text";
  askInput.className = "guide__ask-input";
  askInput.placeholder = BRUMMER.inputPlaceholder || "Frag Brummer …";
  askInput.setAttribute("aria-label", "Frag Brummer");
  askInput.maxLength = 80;
  askInput.autocomplete = "off";
  const askSend = document.createElement("button");
  askSend.type = "submit";
  askSend.className = "guide__ask-send";
  askSend.textContent = "→";
  askSend.setAttribute("aria-label", "Absenden");
  askForm.append(askInput, askSend);
  askForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const q = askInput.value.trim();
    if (!q) return;
    answer(BRUMMER.match(q));
    askInput.value = "";
  });
  textEl.insertAdjacentElement("afterend", askForm);

  function showStep(i) {
    const step = steps[i];
    if (!step) return finish();
    setMode("tour");
    state.index = i;
    textEl.textContent = step.text;
    countEl.textContent = `Schritt ${i + 1} / ${steps.length}`;
    nextBtn.textContent = i === steps.length - 1 ? "Fertig ✓" : "Weiter →";

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
    if (state.index >= steps.length - 1) return finish();
    showStep(state.index + 1);
  }

  function minimize() {
    state.active = false;
    clearTimeout(state.peekTimer);
    clearHighlight();
    guide.hidden = true;
    tab.hidden = false;
    scheduleIdle();
  }

  function finish() { markSeen(); minimize(); }
  function skip() { markSeen(); minimize(); }
  function replay() { start(); }

  // --- Frag-Modus: Bubble mit Chips, ohne Tour-Schritte. ---
  function openAsk() {
    clearTimeout(state.idleTimer);
    clearTimeout(state.peekTimer);
    clearHighlight();
    state.active = true;
    setMode("ask");
    tab.hidden = true;
    guide.hidden = false;
    textEl.textContent = BRUMMER.greet;
    if (!reducedMotion) setTimeout(() => askInput.focus(), 120);
  }

  // Fake-KI: kurz „denken", dann antworten + optional zum Ziel scrollen.
  function answer(item) {
    clearTimeout(state.idleTimer);
    setMode("ask");
    textEl.textContent = pick(BRUMMER.thinking);
    textEl.classList.add("is-thinking");
    const delay = reducedMotion ? 250 : 650;
    clearTimeout(state.peekTimer);
    state.peekTimer = setTimeout(() => {
      textEl.classList.remove("is-thinking");
      textEl.textContent = item.a;
      const target = item.go && document.querySelector(item.go);
      if (target) {
        clearHighlight();
        scrollToEl(target);
        target.classList.add("guide-highlight");
        state.lastHighlight = target;
      }
    }, delay);
  }

  // Peek: Bubble kurz sichtbar (Quip/Idle), dann wieder zum Tab. Klick = Frag-Modus.
  function peek(text) {
    if (state.active) return;
    clearTimeout(state.peekTimer);
    setMode("peek");
    textEl.textContent = text;
    tab.hidden = true;
    guide.hidden = false;
    state.peekTimer = setTimeout(minimize, 5200);
  }

  function scheduleIdle() {
    clearTimeout(state.idleTimer);
    state.idleTimer = setTimeout(() => {
      if (!state.active && !tab.hidden) peek(pick(BRUMMER.idle));
    }, 32000);
  }

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
          peek(pick(quip)); // briefly show the bubble, then minimize again
          setTimeout(() => { state.quipCooldown = false; }, 9000);
        }
      });
    },
    { threshold: 0.45 }
  );
  sections.forEach((s) => io.observe(s));

  // --- Controls ---
  nextBtn.addEventListener("click", next);
  skipBtn.addEventListener("click", skip);
  tab.addEventListener("click", openAsk);      // Tab hält sein Versprechen: fragen, nicht Tour
  guide.addEventListener("click", () => { if (state.mode === "peek") openAsk(); });
  document.getElementById("replay-guide")?.addEventListener("click", replay);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && state.active) skip();
  });

  // Idle-Timer bei jeder Aktivität zurücksetzen (nur wenn minimiert).
  ["mousemove", "scroll", "keydown", "pointerdown"].forEach((ev) =>
    window.addEventListener(ev, () => { if (!state.active) scheduleIdle(); }, { passive: true })
  );

  // --- Boot ---
  if (seen()) {
    tab.hidden = false; // returning visitor: minimized, replayable
    scheduleIdle();
  } else {
    setTimeout(start, reducedMotion ? 200 : 900); // first visit: auto-tour
  }

  return { replay, start, minimize };
}
