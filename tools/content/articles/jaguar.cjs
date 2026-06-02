// jaguar.cjs — Daten-Datei für journal-jaguar.html.
// Rückgeführt aus der hand-gebauten Seite (Backfill „generieren statt klonen").
// Diagramm-Typ: matrix (Verfügbarkeits-Matrix nach Byron Sharp)

const F = require("../../lib/figures.cjs");

module.exports = {
  slug: "journal-jaguar",
  cat: "branding",
  title: "Jaguar: 49 Autos, ein Lehrstück",
  desc: `Jaguars Rebrand: 49 Autos im April 2025. Warum mentale Verfügbarkeit ohne physische verpufft — mit Sharps Verfügbarkeits-Matrix und der Margen-Wette durchgerechnet.`,
  ogDesc: `Aufmerksamkeit, die auf ein leeres Regal trifft, ist die teuerste Art, recht zu behalten.`,

  h1: "Jaguar: 49 Autos, ein Lehrstück",
  crumb: "Jaguar",
  dek: "April 2025: Jaguar verkauft in ganz Europa 49 Autos, minus 97,5 %. Das ist kein Kreativ-Skandal — es ist ein Verfügbarkeits-Versagen. Die Marke baut 2,5 Jahre lang Aufmerksamkeit auf, während es nichts zu kaufen gibt.",
  dt: "2026-05-27",
  dateLabel: "27. Mai 2026",
  read: 6,
  author: "Jonas Reh · Kreativdirektor",

  body: [
    { p: `Es ist der meist-missverstandene Marketing-Aufreger des Jahres. Jaguar zeigte einen Rebrand-Film ohne Auto, „Copy Nothing", Pink und Gelb. Das halbe Internet schrie „woke". Und dann die Zahl, die alles bewiesen haben soll: Im April 2025 registrierte Jaguar in Europa <strong>49 Fahrzeuge</strong> — gegenüber 1.961 im Vorjahr. Minus 97,5 %.` },
    { p: "Fast alle zogen den falschen Schluss. Die 49 Autos beweisen nicht, dass mutiges Marketing scheitert. Sie beweisen, dass Marketing einen Mechanismus dahinter braucht — denn es gab schlicht nichts zu verkaufen." },
    { h: "Bewusster Kollaps, nicht Kaufstreik" },
    { p: "Jaguar hatte die Verbrennerpalette eingestellt (UK-Verkauf schon Ende 2024 ausgesetzt), die Händler standen ohne Inventar da. Der erste Produktionswagen, der <strong>Type 01</strong>, wird erst im September 2026 enthüllt, Auslieferung frühestens 2027. Macht ein Lücken-Fenster von rund 2,5 Jahren zwischen Rebrand und Verkaufsstart. Die Jahreszahl relativiert die Schlagzeile übrigens: Jan–Apr 2025 waren es 2.665 statt 10.641 (−75 %) — die 49 sind ein Tiefpunkt, nicht der Schnitt." },
    { h: "Das Modell: Verfügbarkeits-Matrix (Byron Sharp)" },
    {
      fig: {
        svg: F.matrix({
          label: "Verfügbarkeits-Matrix nach Byron Sharp",
          xAxis: "MENTALE VERFÜGBARKEIT  niedrig → hoch",
          yAxis: "PHYSISCHE VERFÜGBARKEIT  niedrig → hoch",
          cells: {
            tl: { lines: ["COMMODITY", "verfügbar, vergessen"] },
            tr: { fill: F.C.acid, emphasis: true, lines: ["WACHSTUM", "im Kopf + kaufbar"] },
            bl: { fill: F.C.warn, lines: ["TOT"] },
            br: { fill: F.C.shock, emphasis: true, lines: ["JAGUAR 2025", "Buzz, nichts kaufbar"] },
          },
        }),
        cap: "<b>Verfügbarkeits-Matrix.</b> Marken wachsen nur oben rechts: präsent im Kopf UND kaufbar. Jaguar sitzt unten rechts — maximale mentale, null physische Verfügbarkeit. Die Wette: bis 2027 nach oben zu klettern, bevor die Aufmerksamkeit verfällt.",
      },
    },
    {
      calc: {
        label: "Die Margen-Wette",
        lines: [
          "Vor dem Rebrand: ~24.000 Jaguars/Jahr in Europa, Schnittpreis ~£40k.",
          `Neuer Type 01: Start „deutlich über £100k" — also ~2,5× Preis.`,
          "Rechnung: Jaguar muss nur noch ~40% des alten Volumens verkaufen, um denselben Umsatz zu machen.",
        ],
        result: "Weniger Autos, mehr Marge — wenn die Konversion 2027 zündet",
      },
    },
    { h: "Was du Montag tust" },
    {
      checklist: [
        "Timing-Check: Nie mentale Verfügbarkeit aufbauen, bevor das Produkt kaufbar ist. Lücke zwischen Kampagne und Regal in Monaten festschreiben.",
        "Distinctive Assets inventarisieren, bevor du sie streichst (bei Jaguar: Leaper, Growler, British Racing Green).",
        "Preissprung gegen Volumenverlust rechnen: Bei welchem Margenaufschlag rechtfertigt sich welcher Absatzeinbruch?",
        "Polarisierung von Mut trennen: Definiere, WER abgestoßen werden darf — und ob das die zahlende Gruppe ist.",
      ],
    },
  ],

  quote: "Aufmerksamkeit, die auf ein leeres Regal trifft, ist die teuerste Art, recht zu behalten.",
  sources: [
    { label: "Motor1 (ACEA/Dataforce)", url: "https://www.motor1.com/news/760854/jaguar-terrible-registration-numbers/" },
    { label: "DesignRush News", url: "https://news.designrush.com/jaguar-sold-49-cars-amid-ev-rebrand-dealer-standstill" },
  ],
  next: "journal-cracker-barrel",
  nextLabel: "Der teuerste Logo-Fehler des Jahres",
};
