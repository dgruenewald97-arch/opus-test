// roas-luegt.cjs — Daten-Datei für journal-roas-luegt.html.
// Rückgeführt aus der hand-gebauten Seite (Backfill „generieren statt klonen").
// Diagramm: hbars (gemeldeter vs. echter ROAS — Brand Search 8x vs. 1x, Prospecting 3x vs. 3x)

const F = require("../../lib/figures.cjs");

const roasSvg = `<svg viewBox="0 0 460 300" role="img" aria-label="Gemeldeter ROAS gegen echten inkrementellen ROAS">
<rect width="460" height="300" fill="${F.C.paper}"/>
<line x1="40" y1="260" x2="440" y2="260" stroke="${F.C.ink}" stroke-width="3"/>
<rect x="60" y="60" width="70" height="200" fill="${F.C.shock}" stroke="${F.C.ink}" stroke-width="4"/>
<text text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" fill="${F.C.ink}"><tspan x="95" y="50.333333333333336">8x</tspan></text>
<text text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="9.5" font-weight="400" fill="${F.C.ink}"><tspan x="95" y="272.9166666666667">Brand</tspan><tspan x="95" y="285.4166666666667">Search</tspan></text>
<rect x="148" y="235" width="70" height="25" fill="${F.C.acid}" stroke="${F.C.ink}" stroke-width="4"/>
<text text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" fill="${F.C.ink}"><tspan x="183" y="225.33333333333334">1x</tspan></text>
<text text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="9.5" font-weight="400" fill="${F.C.ink}"><tspan x="183" y="272.9166666666667">Brand</tspan><tspan x="183" y="285.4166666666667">echt</tspan></text>
<rect x="236" y="185" width="70" height="75" fill="${F.C.warn}" stroke="${F.C.ink}" stroke-width="4"/>
<text text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" fill="${F.C.ink}"><tspan x="271" y="175.33333333333334">3x</tspan></text>
<text text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="9.5" font-weight="400" fill="${F.C.ink}"><tspan x="271" y="272.9166666666667">Prospect.</tspan><tspan x="271" y="285.4166666666667">gemeldet</tspan></text>
<rect x="324" y="185" width="70" height="75" fill="${F.C.acid}" stroke="${F.C.ink}" stroke-width="4"/>
<text text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" fill="${F.C.ink}"><tspan x="359" y="175.33333333333334">3x</tspan></text>
<text text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="9.5" font-weight="400" fill="${F.C.ink}"><tspan x="359" y="272.9166666666667">Prospect.</tspan><tspan x="359" y="285.4166666666667">echt</tspan></text>
</svg>`;

module.exports = {
  slug: "journal-roas-luegt",
  cat: "performance",
  title: "Warum dein ROAS lügt",
  desc: "Last-Click ist tot. Wie GRELLWERK Kampagnen über inkrementellen Lift statt Vanity-Metriken steuert — mit gemeldetem-vs-echtem-ROAS-Vergleich und Holdout-Rechnung.",
  ogDesc: "Ein ROAS ohne Inkrementalität ist eine Vanity-Metrik im Anzug.",

  h1: "Warum dein ROAS lügt",
  crumb: "Warum dein ROAS lügt",
  dek: "Dein Werbekonto meldet 6,0 ROAS und alle klopfen sich auf die Schulter. Das Problem: Dieser ROAS misst meistens nicht, was du denkst. Er misst, wem die Plattform den letzten Klick zuschreibt — fast nie dasselbe wie der zusätzliche Umsatz.",
  dt: "2026-04-18",
  dateLabel: "18. Apr 2026",
  read: 4,
  author: "Selin Akar · Head of Performance",

  body: [
    { p: "Dein Werbekonto meldet 6,0 ROAS und alle klopfen sich auf die Schulter. Das Problem: Dieser ROAS misst meistens nicht, was du denkst. Er misst, wem die Plattform den letzten Klick zuschreibt — und das ist fast nie dasselbe wie der zusätzliche Umsatz, den die Werbung wirklich erzeugt hat." },
    { h: "Last-Click belohnt das Offensichtliche" },
    { p: "Branded Search, Retargeting, Warenkorb-Abbrecher: Diese Kampagnen ernten Käufe, die ohnehin passiert wären. Sie sehen großartig aus und skalieren trotzdem nichts. Wer sein Budget nach plattform-gemeldetem ROAS verteilt, füttert genau die Kanäle, die am wenigsten Neues bringen." },
    { h: "Das Modell: gemeldet vs. echt" },
    {
      fig: {
        svg: roasSvg,
        cap: "<b>Wo der ROAS lügt.</b> Brand Search meldet traumhafte 8x — der echte inkrementelle Wert liegt nahe 1x (die Leute hätten ohnehin gekauft). Bei echtem Neukunden-Prospecting sind gemeldet und echt fast deckungsgleich. Genau die unscheinbaren Kanäle bringen das Neue.",
      },
    },
    { h: "Steuere über inkrementellen Lift" },
    { p: `Die Frage ist nicht „Welcher Kanal bekommt die Conversion zugeschrieben?", sondern „Was wäre ohne diese Ausgabe passiert?". Antworten liefern keine Dashboards, sondern Tests:` },
    {
      ul: [
        "Geo-Holdouts: Regionen mit und ohne Kampagne vergleichen",
        "Conversion-Lift-Studien direkt in den Ad-Plattformen",
        "Saubere Baselines vor jedem Skalierungs-Schritt",
      ],
    },
    {
      calc: {
        label: "Holdout-Rechnung (illustrativ)",
        lines: [
          `Brand Search meldet 8,0 ROAS auf 10.000€ → „80.000€ Umsatz".`,
          "Geo-Holdout zeigt: echter inkrementeller ROAS ~1,0 → real nur 10.000€ zusätzlich.",
          "70.000€ wären auch ohne die Ads gekommen.",
        ],
        result: "Budget umschichten kostet fast keinen echten Umsatz",
      },
    },
    { h: "Was du Montag tust" },
    {
      checklist: [
        "Setz EINEN Geo-Holdout auf deinem schönsten Kanal (meist Brand Search) auf — 4 Wochen, Region mit/ohne.",
        "Stell gemeldeten ROAS und inkrementellen ROAS nebeneinander — die Lücke ist deine Selbsttäuschung.",
        "Schichte einen Teil des Brand-Search-/Retargeting-Budgets in Prospecting und miss den echten Lift.",
        "Mach saubere Baselines zur Pflicht VOR jedem Skalieren — nicht danach.",
      ],
    },
    { p: "Klingt nach mehr Arbeit. Ist es auch. Aber es ist der Unterschied zwischen einem ROAS, der gut aussieht, und einem, der gut ist." },
  ],

  quote: "Ein ROAS ohne Inkrementalität ist eine Vanity-Metrik im Anzug.",
  sources: [],
  next: "journal-anecken",
  nextLabel: "Anecken als Strategie",
};
