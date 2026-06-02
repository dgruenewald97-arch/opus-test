// creative-targeting.cjs — Daten-Datei für journal-creative-targeting.html.
// Rückgeführt aus der hand-gebauten Seite (Backfill „generieren statt klonen").

const F = require("../../lib/figures.cjs");

module.exports = {
  slug: "journal-creative-targeting",
  cat: "performance",
  title: "Creative schlägt Targeting",
  desc: "Targeting ist weitgehend automatisiert — der größte Performance-Hebel sitzt in der Kreation. Wie GRELLWERK über Creative skaliert, mit Hebel-Matrix und Test-Rechnung.",
  ogDesc: "Die Plattform findet die Leute. Du findest die Idee. Dein bester Media-Buyer ist heute ein Editor.",

  h1: "Creative schlägt Targeting",
  crumb: "Creative schlägt Targeting",
  dek: "Vor zehn Jahren hast du Kampagnen über Zielgruppen gewonnen. Heute macht der Algorithmus das Targeting in der Hälfte der Zeit besser, als du es je könntest. Was bleibt als echter Hebel? Das, was du in die Maschine gibst — die Kreation.",
  dt: "2026-05-21",
  dateLabel: "21. Mai 2026",
  read: 4,
  author: "Jonas Reh · Kreativdirektor",

  body: [
    { p: "Vor zehn Jahren hast du Kampagnen über Zielgruppen gewonnen. Heute macht der Algorithmus das Targeting in der Hälfte der Zeit besser, als du es je könntest. Was bleibt als echter Hebel? Das, was du in die Maschine gibst — die Kreation." },
    { h: "Die Plattform findet die Leute. Du findest die Idee." },
    { p: "Broad Targeting plus starke Creatives schlägt enges Targeting plus austauschbare Ads — fast immer. Der Algorithmus braucht keine Zielgruppen-Liste, er braucht Signale. Und das stärkste Signal ist eine Anzeige, bei der Leute aufhören zu scrollen." },
    { h: "Das Modell: Wo der Hebel wirklich sitzt" },
    {
      fig: {
        svg: F.matrix({
          label: "Hebel-Matrix: Targeting-Aufwand gegen Creative-Stärke",
          xAxis: "CREATIVE-STÄRKE  schwach → stark",
          yAxis: "TARGETING-AUFWAND  niedrig → hoch",
          cells: {
            tl: { fill: F.C.warn, lines: ["BREIT + FAD", "Geld verbrannt"] },
            tr: { fill: F.C.acid, emphasis: true, lines: ["BREIT + STARK", "skaliert"] },
            bl: { fill: F.C.shock, emphasis: true, lines: ["MICRO + FAD", "teuer, klein"] },
            br: { fill: F.C.paper, lines: ["MICRO + STARK", "begrenzt"] },
          },
        }),
        cap: "<b>Wo du arbeiten solltest.</b> Die rechte Spalte (starkes Creative) gewinnt — Targeting-Aufwand (Y) bewegt fast nichts mehr, weil die Maschine das übernimmt. Wer unten links optimiert (Micro-Audiences, fade Ads), poliert das Falsche.",
      },
    },
    { h: "Volumen schlägt Perfektion" },
    { p: "Eine perfekte Anzeige ist ein Risiko. Zwanzig mutige sind ein System. Wir testen breit, töten schnell und skalieren, was funktioniert:" },
    {
      ul: [
        "Mehrere Hooks pro Konzept statt ein Hero-Film",
        "Wöchentliche Creative-Refreshs gegen Ad-Fatigue",
        "Gewinner zerlegen und in neue Varianten recyceln",
      ],
    },
    {
      calc: {
        label: "Faustregel (illustrativ)",
        lines: [
          "1 Hochglanz-Film: ein Treffer-Versuch. Floppt er, ist das Budget weg.",
          "20 günstige Hooks: 20 Versuche. Erfahrungsgemäß tragen wenige Gewinner den Großteil der Performance.",
          "Dieselbe Produktionssumme, aufgeteilt, kauft dir mehr Wahrscheinlichkeit auf einen Treffer.",
        ],
        result: "Streuung schlägt das eine perfekte Asset",
      },
    },
    { h: "Was du Montag tust" },
    {
      checklist: [
        "Schraub aufhören am Targeting-Menü — stell die Audiences breit und lass die Maschine matchen.",
        "Produziere 10+ Hooks pro Konzept statt einen Hero-Film, teste sie gegeneinander.",
        "Setz einen wöchentlichen Creative-Refresh auf, bevor die Müdigkeit die CPMs hochtreibt.",
        "Zerleg jeden Gewinner in seine Bestandteile und bau daraus die nächste Test-Welle.",
      ],
    },
    { p: "Wer am Targeting-Menü schraubt, optimiert das, was schon automatisch läuft. Wer an der Kreation arbeitet, bewegt die Zahl, die wirklich wackelt." },
  ],

  quote: "Dein bester Media-Buyer ist heute ein Editor. Das Targeting macht die Maschine.",
  sources: [],
  next: "journal-cookie-tod",
  nextLabel: "Tracking nach dem Cookie-Tod",
};
