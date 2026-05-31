// GRELLWERK — Krach-Maschine. Pure-vanilla Fake-KI Slogan-Generator.
// Liest Marke + Ton, lässt SLOGAN.generate() rechnen, rendert Karten mit
// Copy-Button. Keine Abhängigkeiten, kein Netz.

export function initGenerator({ SLOGAN, reducedMotion }) {
  const form = document.getElementById("slogan-form");
  const input = document.getElementById("slogan-input");
  const tonesEl = document.getElementById("slogan-tones");
  const goBtn = document.getElementById("slogan-go");
  const out = document.getElementById("slogan-out");
  if (!form || !input || !out || !SLOGAN) return;

  let ton = "frech";

  // Ton-Chips: aktiven Zustand innerhalb der Gruppe umschalten.
  tonesEl?.querySelectorAll(".slogan__tone").forEach((btn) => {
    btn.addEventListener("click", () => {
      ton = btn.getAttribute("data-ton") || "frech";
      tonesEl
        .querySelectorAll(".slogan__tone")
        .forEach((el) => el.classList.toggle("is-active", el === btn));
    });
  });

  function copy(text, btn) {
    const done = () => {
      const label = btn.textContent;
      btn.textContent = "Kopiert ✓";
      btn.classList.add("is-copied");
      setTimeout(() => { btn.textContent = label; btn.classList.remove("is-copied"); }, 1600);
    };
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text).then(done).catch(done);
    } else {
      // Fallback ohne Clipboard-API (file://, alte Browser).
      const ta = document.createElement("textarea");
      ta.value = text; ta.setAttribute("readonly", ""); ta.style.position = "absolute";
      ta.style.left = "-9999px"; document.body.appendChild(ta);
      ta.select(); try { document.execCommand("copy"); } catch (_) {}
      document.body.removeChild(ta); done();
    }
  }

  function render(slogans) {
    out.innerHTML = "";
    slogans.forEach((text, i) => {
      const card = document.createElement("div");
      card.className = "slogan__card";
      if (!reducedMotion) card.style.animationDelay = `${i * 70}ms`;

      const p = document.createElement("p");
      p.className = "slogan__line";
      p.textContent = text;

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "slogan__copy";
      btn.textContent = "Kopieren";
      btn.addEventListener("click", () => copy(text, btn));

      card.append(p, btn);
      out.appendChild(card);
    });
  }

  function generate() {
    const slogans = SLOGAN.generate({ brand: input.value, ton });
    goBtn.textContent = "Nochmal ⚡";
    render(slogans);
  }

  form.addEventListener("submit", (e) => { e.preventDefault(); generate(); });
}
