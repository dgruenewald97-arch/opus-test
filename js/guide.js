// GRELLWERK — BRUMMER interactive onboarding guide (state machine).
// Verhalten: KEINE automatischen Popups. Brummer bleibt minimiert als Tab und
// öffnet sich ausschließlich auf Klick (Frag-Modus). Tour nur auf Wunsch.
import { GUIDE_STEPS, BRUMMER, COPY } from "./config.js";
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
    mode: "tour",     // "tour" | "ask"
    thinkTimer: null,
  };

  const setMode = (m) => { state.mode = m; guide.dataset.mode = m; };

  const markSeen = () => { try { localStorage.setItem(COPY.storageKey, "1"); } catch (_) {} };

  // Kontakt-Stupser: einmal pro Besuch → sessionStorage (resettet beim Schließen
  // des Tabs/der Sitzung, nicht dauerhaft wie der Tour-Flag).
  const NUDGE_KEY = "grellwerk_kontakt_nudge";
  const nudgeSeen = () => { try { return sessionStorage.getItem(NUDGE_KEY) === "1"; } catch (_) { return false; } };
  const markNudgeSeen = () => { try { sessionStorage.setItem(NUDGE_KEY, "1"); } catch (_) {} };

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

  // Kontakt-Stupser (einmal pro Besuch, nach den Cases): Text + ein CTA-Button.
  const nudgeEl = document.createElement("div");
  nudgeEl.className = "guide__nudge";
  const nudgeCta = document.createElement("button");
  nudgeCta.type = "button";
  nudgeCta.className = "guide__btn guide__btn--primary";
  nudgeCta.textContent = BRUMMER.nudge?.cta || "Zum Kontakt →";
  nudgeCta.addEventListener("click", () => {
    const t = BRUMMER.nudge?.go && document.querySelector(BRUMMER.nudge.go);
    minimize();
    if (t) {
      scrollToEl(t, reducedMotion);
      clearHighlight();
      t.classList.add("guide-highlight");
      state.lastHighlight = t;
      setTimeout(clearHighlight, 2400);
    }
  });
  nudgeEl.appendChild(nudgeCta);
  textEl.insertAdjacentElement("afterend", nudgeEl);

  // Schließen-Kreuz (X): in jedem Modus sichtbar, macht Brummer zu.
  const closeBtn = document.createElement("button");
  closeBtn.type = "button";
  closeBtn.className = "guide__close";
  closeBtn.setAttribute("aria-label", "Brummer schließen");
  closeBtn.textContent = "✕";
  closeBtn.addEventListener("click", minimize);
  guide.querySelector(".guide__bubble")?.appendChild(closeBtn);

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
      scrollToEl(target, reducedMotion);
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
    clearTimeout(state.thinkTimer);
    clearHighlight();
    guide.hidden = true;
    tab.hidden = false;
  }

  function finish() { markSeen(); minimize(); }
  function skip() { markSeen(); minimize(); }
  function replay() { start(); }

  // --- Frag-Modus: Bubble mit Chips, ohne Tour-Schritte. ---
  function openAsk() {
    clearTimeout(state.thinkTimer);
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
    setMode("ask");
    textEl.textContent = pick(BRUMMER.thinking);
    textEl.classList.add("is-thinking");
    const delay = reducedMotion ? 250 : 650;
    clearTimeout(state.thinkTimer);
    state.thinkTimer = setTimeout(() => {
      textEl.classList.remove("is-thinking");
      textEl.textContent = item.a;
      const target = item.go && document.querySelector(item.go);
      if (target) {
        clearHighlight();
        scrollToEl(target, reducedMotion);
        target.classList.add("guide-highlight");
        state.lastHighlight = target;
      }
    }, delay);
  }

  // Einmaliger Kontakt-Stupser. Unterbricht nicht, wenn Brummer schon offen ist
  // (Observer bleibt dann aktiv, bis es tatsächlich angezeigt werden konnte).
  let nudgeObserver = null;
  function showNudge() {
    if (nudgeSeen()) { nudgeObserver?.disconnect(); return; }
    if (state.active) return;
    markNudgeSeen();
    nudgeObserver?.disconnect();
    clearHighlight();
    state.active = true;
    setMode("nudge");
    tab.hidden = true;
    guide.hidden = false;
    textEl.textContent = BRUMMER.nudge.text;
    if (!reducedMotion) {
      guide.classList.add("is-entering");
      requestAnimationFrame(() =>
        requestAnimationFrame(() => guide.classList.remove("is-entering"))
      );
    }
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

  // --- Controls ---
  nextBtn.addEventListener("click", next);
  skipBtn.addEventListener("click", skip);
  tab.addEventListener("click", openAsk);      // Tab hält sein Versprechen: fragen, nicht Tour
  document.getElementById("replay-guide")?.addEventListener("click", replay);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && state.active) skip();
  });

  // --- Boot: immer minimiert als Tab. Keine Auto-Tour, keine Scroll-/Idle-Popups.
  // EINZIGE Ausnahme: ein Kontakt-Stupser, einmal pro Besuch, sobald die Sektion
  // nach den Cases in Sicht kommt — und nur, wenn Trigger + Ziel existieren (Home).
  tab.hidden = false;

  const nudgeTrigger = BRUMMER.nudge && document.querySelector(BRUMMER.nudge.after);
  const nudgeTarget = BRUMMER.nudge && document.querySelector(BRUMMER.nudge.go);
  if (nudgeTrigger && nudgeTarget && !nudgeSeen() && "IntersectionObserver" in window) {
    nudgeObserver = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) showNudge();
    }, { threshold: 0.3 });
    nudgeObserver.observe(nudgeTrigger);
  }

  return { replay, start, minimize };
}
