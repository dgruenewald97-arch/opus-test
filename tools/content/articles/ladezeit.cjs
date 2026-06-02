// ladezeit.cjs — Daten-Datei für journal-ladezeit.html.
// Rückgeführt aus der hand-gebauten Seite (Backfill „generieren statt klonen").
// Diagramm: hbars (Core Web Vitals „gut"-Grenzen; LCP in ms, CLS ×1000 skaliert)

const F = require("../../lib/figures.cjs");

module.exports = {
  slug: "journal-ladezeit",
  cat: "web",
  title: "Eine Sekunde entscheidet",
  desc: "Ladezeit ist kein Technik-Thema, sondern Umsatz. Wie GRELLWERK über Core Web Vitals den teuersten Conversion-Killer abstellt — mit CWV-Modell und Absprung-Rechnung.",
  ogDesc: "Die schnellste Anfrage ist die, die nie gestellt wird. Lass das Überflüssige weg.",

  h1: "Eine Sekunde entscheidet",
  crumb: "Eine Sekunde entscheidet",
  dek: "Du zahlst pro Klick, schickst teuren Traffic auf deine Seite — und dann lädt sie drei Sekunden. Jede dieser Sekunden ist ein Eimer, aus dem dein Budget tropft. Ladezeit ist die unsichtbarste Conversion-Steuer, die du zahlst.",
  dt: "2026-05-14",
  dateLabel: "14. Mai 2026",
  read: 4,
  author: "Tobias Klein · Tech & Web",

  body: [
    { p: "Du zahlst pro Klick, schickst teuren Traffic auf deine Seite — und dann lädt sie drei Sekunden. Jede dieser Sekunden ist ein Eimer, aus dem dein Budget tropft. Ladezeit ist kein Technik-Thema. Es ist die unsichtbarste Conversion-Steuer, die du zahlst." },
    { h: "Was die Leute wirklich spüren" },
    { p: `Niemand misst „Largest Contentful Paint" im Kopf. Aber jeder spürt den Moment, in dem nichts passiert, der Button noch nicht reagiert, das Layout nachträglich verspringt. Genau das messen die Core Web Vitals — und genau da entscheidet sich, ob jemand bleibt:` },
    {
      fig: {
        svg: F.hbars({
          label: "Core Web Vitals Schwellenwerte",
          unit: "",
          bars: [
            { name: "LCP\nInhalt da?", value: 2500, fill: F.C.acid },
            { name: "INP\nreagiert?", value: 200, fill: F.C.acid },
            { name: "CLS\nruhig?", value: 100, fill: F.C.acid },
          ],
          max: 2500,
        }),
        cap: `<b>Die drei Core Web Vitals.</b> LCP (gut: unter 2,5 s) — wie schnell der Hauptinhalt sichtbar ist. INP (gut: unter 200 ms) — wie schnell die Seite auf Klicks reagiert. CLS (gut: unter 0,1) — ob beim Laden alles ruhig bleibt. Balken zeigen die „gut"-Grenze (LCP in ms, CLS ×1000 skaliert).`,
      },
    },
    { h: "Schnell ist eine Entscheidung, kein Zufall" },
    { p: "Diese Seite hier lädt ohne Framework, ohne Megabyte-Bundle, ohne Render-Blocker. Kein Trick — eine Haltung. Bilder schlank, Schriften mit Fallback, kritisches CSS zuerst, alles andere später. Geschwindigkeit baut man nicht nachträglich ein. Man lässt das Langsame von Anfang an weg." },
    {
      calc: {
        label: "Absprung-Rechnung (illustrativ)",
        lines: [
          "10.000 bezahlte Klicks/Monat, 1,50€ CPC = 15.000€ Traffic-Kosten.",
          "Lädt die Seite zu langsam und 20% springen vor dem Laden ab → 2.000 Klicks verpufft.",
          "Das sind 3.000€/Monat, für die niemand je deine Seite gesehen hat.",
        ],
        result: "Ladezeit ist Media-Budget, das du in den Sand kippst",
      },
    },
    { h: "Was du Montag tust" },
    {
      checklist: [
        "Miss deine Seite mit PageSpeed Insights im FELD (CrUX), nicht nur im Lab — die echten Nutzerwerte zählen.",
        "Größtes Bild im Viewport finden und komprimieren/modern kodieren — meist der schnellste LCP-Gewinn.",
        "Render-blockierendes JavaScript/CSS aufspüren und nach unten verschieben oder lazy laden.",
        "Feste Größen für Bilder/Embeds setzen, damit nichts nachträglich verspringt (CLS).",
      ],
    },
  ],

  quote: "Die schnellste Anfrage ist die, die nie gestellt wird. Lass das Überflüssige weg.",
  sources: [],
  next: "journal-creative-targeting",
  nextLabel: "Creative schlägt Targeting",
};
