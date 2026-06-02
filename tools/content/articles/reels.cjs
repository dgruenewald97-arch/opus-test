// reels.cjs — Daten-Datei für journal-reels.html.
// Rückgeführt aus der hand-gebauten Seite (Backfill „generieren statt klonen").
// Diagramm: curve (Retention-Kurven — durchhängende Mitte vs. gehaltene Spannung)

const F = require("../../lib/figures.cjs");

const retentionSvg = `<svg viewBox="0 0 460 280" role="img" aria-label="Retention-Kurve: Reel mit und ohne starke Mitte">
<rect width="460" height="280" fill="${F.C.paper}"/>
<line x1="50" y1="230" x2="440" y2="230" stroke="${F.C.ink}" stroke-width="3"/>
<line x1="50" y1="30" x2="50" y2="230" stroke="${F.C.ink}" stroke-width="3"/>
<text x="50" y="22" font-family="'JetBrains Mono', monospace" font-size="11" fill="${F.C.ink}">% noch dabei</text>
<text x="300" y="252" font-family="'JetBrains Mono', monospace" font-size="11" fill="${F.C.ink}">Sekunden →</text>
<polyline points="50,40 110,70 180,180 300,215 440,222" fill="none" stroke="${F.C.shock}" stroke-width="5"/>
<polyline points="50,40 110,75 200,100 320,120 440,140" fill="none" stroke="${F.C.electric}" stroke-width="5" stroke-dasharray="2 0"/>
<circle cx="110" cy="70" r="6" fill="${F.C.ink}"/>
<text x="118" y="64" font-family="'JetBrains Mono', monospace" font-size="10" fill="${F.C.ink}">Hook endet (Sek 3)</text>
<rect x="300" y="40" width="14" height="14" fill="${F.C.shock}" stroke="${F.C.ink}" stroke-width="2"/>
<text x="320" y="51" font-family="'JetBrains Mono', monospace" font-size="10.5" fill="${F.C.ink}">durchhängende Mitte → gedrosselt</text>
<rect x="300" y="60" width="14" height="14" fill="${F.C.electric}" stroke="${F.C.ink}" stroke-width="2"/>
<text x="320" y="71" font-family="'JetBrains Mono', monospace" font-size="10.5" fill="${F.C.ink}">Spannung gehalten → weiter ausgespielt</text>
</svg>`;

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
        svg: retentionSvg,
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
