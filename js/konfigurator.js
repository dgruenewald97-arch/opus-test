// GRELLWERK — Krach-Konfigurator. Pure-vanilla interactive recommender.
// Reads option buttons, keeps a tiny answer state, re-renders the result panel.

export function initKonfigurator({ KONFIGURATOR }) {
  const form = document.getElementById("config-form");
  const paketEl = document.getElementById("config-paket");
  const leadEl = document.getElementById("config-lead");
  const whyEl = document.getElementById("config-why");
  const ctaEl = document.getElementById("config-cta");
  if (!form || !paketEl || !KONFIGURATOR) return;

  const answers = { ziel: null, phase: null, tempo: null };

  function render() {
    const rec = KONFIGURATOR.recommend(answers);
    if (!rec) {
      const answered = Object.values(answers).filter(Boolean).length;
      paketEl.textContent = "Beantworte die Fragen →";
      leadEl.textContent = "";
      whyEl.textContent = answered
        ? `Noch ${3 - answered} Frage${3 - answered === 1 ? "" : "n"} bis zu deinem Krach.`
        : "Tipp dich durch — ich stell dir das passende Paket und den richtigen Kopf aus der Crew zusammen.";
      if (ctaEl) ctaEl.hidden = true;
      return;
    }
    paketEl.textContent = rec.paket;
    leadEl.textContent = rec.lead;
    whyEl.textContent = rec.why;
    if (ctaEl) ctaEl.hidden = false;
  }

  form.querySelectorAll(".config__opt").forEach((btn) => {
    btn.addEventListener("click", () => {
      const q = btn.getAttribute("data-config-q");
      const v = btn.getAttribute("data-config-v");
      if (!q) return;
      answers[q] = v;
      // toggle active state within this question group only
      form
        .querySelectorAll(`.config__opt[data-config-q="${q}"]`)
        .forEach((el) => el.classList.toggle("is-active", el === btn));
      render();
    });
  });

  render();
}
