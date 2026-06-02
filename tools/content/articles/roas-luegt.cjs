// roas-luegt.cjs — Daten-Datei für journal-roas-luegt.html.
// Rückgeführt aus der hand-gebauten Seite (Backfill „generieren statt klonen").
// Diagramm: hbars (gemeldeter vs. echter ROAS — Brand Search 8x vs. 1x, Prospecting 3x vs. 3x)

const F = require("../../lib/figures.cjs");

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
        svg: F.hbars({
          label: "Gemeldeter ROAS gegen echten inkrementellen ROAS",
          unit: "x",
          bars: [
            { name: "Brand Search gemeldet", value: 8, fill: F.C.shock },
            { name: "Brand Search echt", value: 1, fill: F.C.acid },
            { name: "Prospecting gemeldet", value: 3, fill: F.C.warn },
            { name: "Prospecting echt", value: 3, fill: F.C.acid },
          ],
          max: 8,
        }),
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
