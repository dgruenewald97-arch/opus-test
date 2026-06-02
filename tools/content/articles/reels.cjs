// reels.cjs — Daten-Datei für journal-reels.html.
// Rückgeführt aus der hand-gebauten Seite (Backfill „generieren statt klonen").
// Diagramm: curve (Retention-Kurven — durchhängende Mitte vs. gehaltene Spannung)

const F = require("../../lib/figures.cjs");

module.exports = {
  slug: "journal-reels",
  cat: "social",
  title: "Warum 90 % deiner Reels keiner sieht",
  desc: "Der Hook holt sie rein, die Retention hält sie. Warum die meisten Reels nach drei Sekunden sterben — und wie GRELLWERK für Watch-Time baut. Mit Retention-Kurve.",
  ogDesc: "Ein guter Hook ohne Retention ist eine laute Tür zu einem leeren Raum.",

  h1: "Warum 90 % deiner Reels keiner sieht",
  crumb: "Reels",
  dek: "Ein guter Hook ist nur die Eintrittskarte. Er bringt Leute in die ersten drei Sekunden — und dann entscheidet etwas anderes, ob dein Reel ausgespielt wird: wie lange die Leute bleiben. Genau hier sterben die meisten Videos.",
  dt: "2026-04-23",
  dateLabel: "23. Apr 2026",
  read: 3,
  author: "Jonas Reh · Kreativdirektor",

  body: [
    { p: "Ein guter Hook ist nur die Eintrittskarte. Er bringt Leute in die ersten drei Sekunden — und dann entscheidet etwas anderes, ob dein Reel ausgespielt wird: wie lange die Leute bleiben. Genau hier sterben die meisten Videos." },
    { h: "Der Algorithmus belohnt Bleiben, nicht Klicken" },
    { p: "Reichweite kommt nicht von einem viralen Anfang, sondern von Watch-Time und Re-Watches. Ein Reel mit starkem Hook und durchhängender Mitte wird nach dem ersten Schub gedrosselt. Ein Reel, das die Spannung hält, wird weiter ausgespielt — Stunde um Stunde." },
    { h: "Das Modell: die Retention-Kurve" },
    {
      fig: {
        svg: F.curve({
          label: "Retention-Kurve: Reel mit und ohne starke Mitte",
          xLabel: "Sekunden →",
          series: [
            {
              name: "durchhängende Mitte → gedrosselt",
              fill: F.C.shock,
              points: [1.0, 0.85, 0.45, 0.18, 0.10],
            },
            {
              name: "Spannung gehalten → weiter ausgespielt",
              fill: F.C.electric,
              points: [1.0, 0.88, 0.72, 0.60, 0.50],
            },
          ],
        }),
        cap: "<b>Wo Reels sterben.</b> Beide Videos starten mit demselben Hook. Das rote bricht in der Mitte ein → der Algorithmus drosselt es. Das blaue hält die Spannung → es wird weiter ausgespielt. Die meisten optimieren nur den Anfang und verlieren in der Mitte.",
      },
    },
    { h: "Was Retention rettet" },
    {
      ul: [
        "Kein Vorspann, keine Logo-Animation — sofort in die Substanz",
        "Alle paar Sekunden ein visueller oder erzählerischer Schnitt",
        "Ein offenes Loop am Anfang, das erst am Ende aufgelöst wird",
        "Untertitel, weil die Hälfte ohne Ton schaut",
      ],
    },
    {
      calc: {
        label: "Faustregel (illustrativ)",
        lines: [
          "100 Zuschauer starten. Bricht die Hälfte bis Sekunde 5 weg, sieht der Algorithmus ein schwaches Signal.",
          "Hältst du 70 bis zum Ende und ein Teil schaut nochmal → starkes Signal, mehr Auslieferung.",
          "Derselbe Hook, andere Mitte — ein Vielfaches an Reichweite.",
        ],
        result: "Watch-Time ist die Währung, nicht der Hook allein",
      },
    },
    { h: "Was du Montag tust" },
    {
      checklist: [
        "Schau dir die Retention-Kurve deiner letzten 10 Reels an — wo genau bricht es ein?",
        `Killt den Vorspann: erster Frame = Substanz, kein Logo, kein „Hi Leute".`,
        "Setz alle 2–3 Sekunden einen Schnitt oder Bildwechsel gegen das Wegwischen.",
        "Bau ein offenes Loop ein (Frage/Versprechen am Anfang, Auflösung am Ende) und brenn Untertitel ein.",
      ],
    },
    { p: "Hör auf, nur den Anfang zu optimieren. Der Hook entscheidet, ob jemand anfängt. Die Mitte entscheidet, ob der Algorithmus dich überhaupt jemandem zeigt." },
  ],

  quote: "Ein guter Hook ohne Retention ist eine laute Tür zu einem leeren Raum.",
  sources: [],
  next: "journal-hook",
  nextLabel: "Der Hook in 3 Sekunden",
};
