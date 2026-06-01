// chrome.cjs — single source für die "Chrome" der GENERIERTEN Seiten.
// nav / head / footer / brummer sind auf jeder GRELLWERK-Seite dupliziert (Konvention,
// siehe CLAUDE.md). Damit der Generator nicht ein 41. driftendes Duplikat erzeugt, leben
// die Blöcke hier zentral und 1:1 identisch zu den handgepflegten Seiten.
// → verify.cjs prüft per Signatur, dass die echten Seiten nicht von diesen Blöcken abweichen.

const CANON_BASE = "https://dgruenewald97-arch.github.io/opus-test";

const NAV = `  <!-- ===== NAV ===== -->
  <header class="nav">
    <a class="nav__logo" href="index.html" aria-label="GRELLWERK Startseite">GRELL<b>//</b>WERK</a>
      <button class="nav__toggle" aria-label="Menü öffnen" aria-controls="nav-menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    <nav class="nav__links" id="nav-menu" aria-label="Hauptnavigation">
      <a class="nav__link" href="leistungen.html" data-scramble>Leistungen</a>
      <a class="nav__link" href="arbeiten.html" data-scramble>Arbeiten</a>
      <a class="nav__link" href="ueber-uns.html" data-scramble>Über uns</a>
      <a class="nav__link" href="journal.html" aria-current="page" data-scramble>Journal</a>
      <a class="nav__link" href="index.html#pakete" data-scramble>Pakete</a>
      <a class="nav__link" href="kontakt.html" data-scramble>Kontakt</a>
      <a class="nav__link nav__cta btn" href="kontakt.html">Jetzt buchen</a>
    </nav>
  </header>`;

const FOOTER = `  <!-- ===== FOOTER ===== -->
  <footer class="footer">
    <div class="container">
      <div class="footer__top">
        <div class="footer__logo">GRELL//WERK</div>
        <div class="footer__col">
          <strong>Navigation</strong>
          <a href="leistungen.html">Leistungen</a>
          <a href="arbeiten.html">Arbeiten</a>
          <a href="ueber-uns.html">Über uns</a>
          <a href="journal.html">Journal</a>
          <a href="index.html#pakete">Pakete</a>
          <a href="kontakt.html">Kontakt</a>
        </div>
        <div class="footer__col">
          <strong>Kontakt</strong>
          <span>Lärmstraße 1</span>
          <span>50667 Köln</span>
          <span>hallo@grellwerk.de</span>
        </div>
        <div class="footer__col">
          <strong>Legal</strong>
          <a href="impressum.html">Impressum</a>
          <a href="datenschutz.html">Datenschutz</a>
        </div>
      </div>
      <div class="marquee marquee--rev" aria-hidden="true" style="border:none; background:transparent; color:var(--acid);">
        <div class="marquee__track">
          <span>Lärm der verkauft</span><span>Lärm der verkauft</span><span>Lärm der verkauft</span><span>Lärm der verkauft</span>
        </div>
      </div>
      <div class="footer__bottom">
        <span>© 2026 GRELLWERK GmbH — fiktive Demo-Agentur</span>
        <button type="button" id="replay-guide">Guide erneut starten ↻</button>
      </div>
    </div>
  </footer>`;

const BRUMMER = `  <!-- ===== BRUMMER GUIDE ===== -->
  <aside class="guide" id="guide" aria-label="Onboarding-Guide Brummer" hidden>
    <div class="guide__bubble">
      <span class="guide__step-count" id="guide-count">Schritt 1 / 1</span>
      <p class="guide__text" id="guide-text" role="status" aria-live="polite">Servus!</p>
      <div class="guide__controls">
        <button class="guide__btn guide__btn--primary" id="guide-next" type="button">Weiter →</button>
        <button class="guide__btn guide__btn--ghost" id="guide-skip" type="button">Überspringen</button>
      </div>
    </div>
    <div class="guide__mascot" id="guide-mascot" aria-hidden="true">
      <!-- BRUMMER: inline SVG bee/fly -->
      <svg viewBox="0 0 100 100" role="img">
        <g class="brummer__wing"><ellipse cx="32" cy="34" rx="14" ry="22" fill="#2D2DFF" opacity="0.6" stroke="#0A0A0A" stroke-width="3"/></g>
        <g class="brummer__wing" style="animation-delay:-0.09s"><ellipse cx="68" cy="34" rx="14" ry="22" fill="#2D2DFF" opacity="0.6" stroke="#0A0A0A" stroke-width="3"/></g>
        <g class="brummer__body">
          <line class="brummer__antenna" x1="40" y1="40" x2="34" y2="22" stroke="#0A0A0A" stroke-width="3"/>
          <line class="brummer__antenna" x1="60" y1="40" x2="66" y2="22" stroke="#0A0A0A" stroke-width="3" style="animation-delay:-0.6s"/>
          <circle cx="34" cy="20" r="4" fill="#FF2E63"/>
          <circle cx="66" cy="20" r="4" fill="#FF2E63"/>
          <rect x="28" y="40" width="44" height="44" rx="10" fill="#D6FF3B" stroke="#0A0A0A" stroke-width="4"/>
          <rect x="28" y="58" width="44" height="8" fill="#0A0A0A"/>
          <rect x="28" y="72" width="44" height="6" fill="#0A0A0A"/>
          <circle cx="42" cy="52" r="7" fill="#fff" stroke="#0A0A0A" stroke-width="2"/>
          <circle cx="58" cy="52" r="7" fill="#fff" stroke="#0A0A0A" stroke-width="2"/>
          <circle class="brummer__pupil" cx="42" cy="52" r="3" fill="#0A0A0A"/>
          <circle class="brummer__pupil" cx="58" cy="52" r="3" fill="#0A0A0A"/>
        </g>
      </svg>
    </div>
  </aside>

  <button class="guide-tab" id="guide-tab" type="button" hidden>
    <span class="guide-tab__dot" aria-hidden="true">
      <svg viewBox="0 0 100 100"><rect x="20" y="30" width="60" height="55" rx="12" fill="#D6FF3B" stroke="#0A0A0A" stroke-width="6"/><circle cx="40" cy="52" r="6" fill="#0A0A0A"/><circle cx="60" cy="52" r="6" fill="#0A0A0A"/></svg>
    </span>
    Brummer fragen?
  </button>`;

// Kategorie-Label (data-cat → Anzeige) — Single Source, auch von journal.js erwartet.
const CATEGORIES = {
  performance: "Performance",
  branding: "Branding",
  social: "Social",
  daten: "Daten",
  web: "Web",
  meinung: "Meinung",
};

// <head> für eine Artikel-Seite. opts: { title, desc, ogTitle, ogDesc, slug }
function head(opts) {
  return `<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${opts.title} | Lärm-Journal | GRELLWERK</title>
  <meta name="description" content="${opts.desc}" />
  <meta property="og:title" content="${opts.ogTitle} | GRELLWERK" />
  <meta property="og:description" content="${opts.ogDesc}" />
  <meta property="og:image" content="${CANON_BASE}/assets/og-image.svg" />
  <link rel="icon" href="assets/favicon.svg" type="image/svg+xml" />
  <link rel="canonical" href="${CANON_BASE}/${opts.slug}.html" />

  <!-- Fonts (graceful: system fallbacks defined in tokens.css) -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Space+Grotesk:wght@400;500;700&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet" />

  <!-- Styles -->
  <link rel="stylesheet" href="css/reset.css" />
  <link rel="stylesheet" href="css/tokens.css" />
  <link rel="stylesheet" href="css/base.css" />
  <link rel="stylesheet" href="css/components.css" />
  <link rel="stylesheet" href="css/sections.css" />
  <link rel="stylesheet" href="css/guide.css" />
  <link rel="stylesheet" href="css/motion.css" />

  <!-- Importmap for optional CDN ESM libs (enhancement only) -->
  <script type="importmap">
  {
    "imports": {
      "gsap": "https://cdn.jsdelivr.net/npm/gsap@3.12.5/+esm",
      "gsap/ScrollTrigger": "https://cdn.jsdelivr.net/npm/gsap@3.12.5/ScrollTrigger/+esm",
      "lenis": "https://cdn.jsdelivr.net/npm/lenis@1.1.13/+esm"
    }
  }
  </script>
</head>`;
}

const BODY_OPEN = `<body>
  <a class="skip-link" href="#main">Zum Inhalt springen</a>
  <div class="grain" aria-hidden="true"></div>
  <div class="cursor" aria-hidden="true"></div>`;

const SCRIPTS = `  <!-- ===== Scripts (ES modules, deferred by default) ===== -->
  <script type="module" src="js/main.js"></script>`;

module.exports = { CANON_BASE, NAV, FOOTER, BRUMMER, CATEGORIES, head, BODY_OPEN, SCRIPTS };
