// tiktok-us.cjs — Daten-Datei für journal-tiktok-us.html.
// Rückgeführt aus der hand-gebauten Seite (Backfill „generieren statt klonen").

const F = require("../../lib/figures.cjs");

module.exports = {
  slug: "journal-tiktok-us",
  cat: "social",
  title: "TikTok hat jetzt einen US-Pass",
  desc: "TikTok-US-Deal geschlossen: Algorithmus-Reset durch Oracle. Mit Reset-Radar-Matrix und Re-Learning-Budget-Rechnung für die Volatilitätsphase.",
  ogDesc: "Wer alte Performance-Daten als Optimierungsgrundlage behält, optimiert für einen Algorithmus, der nicht mehr existiert.",

  h1: "TikTok hat jetzt einen US-Pass",
  crumb: "TikTok US-Deal",
  dek: "Am 22. Januar 2026 ist der Deal durch. Oracle bekommt eine lizenzierte Kopie des Algorithmus und trainiert ihn from scratch auf US-Daten neu. Das schafft eine künstliche Stunde Null — und entwertet genau die Performance-Benchmarks, in die du jahrelang investiert hast.",
  dt: "2026-05-22",
  dateLabel: "22. Mai 2026",
  read: 6,
  author: "Mara Vogt · Chief Chaos Officer",

  body: [
    { p: `Nach Jahren Tauziehen ist es durch: Am 22. Januar 2026 wurde der TikTok-US-Deal geschlossen. Oracle, Silver Lake und MGX halten je 15 % (zusammen 45 %), ByteDance bewusst 19,9 % — unter der gesetzlichen 20-%-Schwelle, ohne Zugriff auf US-Daten oder den US-Algorithmus. Oracle erhält laut Weißem Haus eine <strong>lizenzierte Kopie des Empfehlungssystems und trainiert sie „from the ground up" ausschließlich auf US-Daten</strong> neu.` },
    { p: "Klingt nach Geopolitik. Hat aber eine sehr praktische Folge: Der For-You-Feed, auf dem eine ganze Creator- und Marken-Ökonomie ihre Reichweite gebaut hat, wird bei laufendem Motor neu trainiert." },
    { h: "Die eigentliche Gefahr: künstliche Stunde Null" },
    { p: `Forrester warnt, dass historische Benchmarks Erfolg nicht mehr vorhersagen — Engagement-Muster, Hashtags, virale Signale werden rekalibriert, Feeds fühlen sich „distinctly American" an. Der Reset entwertet damit genau das Asset, in das Marken investiert haben: ihre erlernten Creative-Benchmarks. Und: Frühe Tester eines frisch trainierten Modells gewinnen überproportional, weil das Modell anfangs datenarm und damit explorationsfreudig ist.` },
    { h: "Das Modell: Reset-Radar" },
    {
      fig: {
        svg: F.matrix({
          label: "Reset-Radar: Signal-Reife gegen Budget-Hebel",
          xAxis: "SIGNAL-REIFE  alt/erlernt → neu/datenarm",
          yAxis: "BUDGET-HEBEL  halten → skalieren",
          cells: {
            tl: { fill: F.C.shock, emphasis: true, lines: ["FALLE", "totes Modell skaliert"] },
            tr: { fill: F.C.paper, lines: ["SKALIEREN", "validiert"] },
            bl: { fill: F.C.paper, lines: ["BEOBACHTEN"] },
            br: { fill: F.C.acid, emphasis: true, lines: ["EXPLORIEREN", "früher Vorteil"] },
          },
        }),
        cap: "<b>Reset-Radar.</b> Der Pfad führt von unten links (Beobachten) nach unten rechts (Explorieren mit neuen Signalen) und erst nach Validierung nach oben (Skalieren). Oben links ist die Falle: altes Modell mit hohem Budget skalieren.",
      },
    },
    {
      calc: {
        label: "Re-Learning-Puffer",
        lines: [
          "Bisher: CPA 12€, Budget 30.000€/Monat → 2.500 Conversions.",
          "Volatilitätsphase nach Reset: CPA schwankt ~±30–50% für 6–10 Wochen.",
          "Bei CPA 18€ (+50%) und gleichem Budget: nur noch 1.667 Conversions.",
        ],
        result: "15% Budget (4.500€) als Test-Puffer · 4 Wochen Skalierungs-Freeze",
      },
    },
    { h: "Was du Montag tust" },
    {
      checklist: [
        `Performance-Baseline VOR dem 22.01.2026 als „Legacy"-Snapshot archivieren und aus Auto-Optimierungsregeln entfernen.`,
        "15-%-Re-Learning-Puffer ins Budget einbauen; Skalierungs-Freeze für 4 Wochen ab sichtbarer Feed-Veränderung.",
        "Wöchentliches CPA-/CTR-Monitoring mit ±30-%-Alert-Schwelle statt Tagesreaktion.",
        "Owned-Kanäle (E-Mail, Community) stärken — Reichweite, die dir keiner neu trainiert.",
      ],
    },
  ],

  quote: "Bau deine Reichweite nicht auf einem Algorithmus, der gerade seinen Pass wechselt. Wer alte Benchmarks behält, optimiert für ein Modell, das nicht mehr existiert.",
  sources: [
    { label: "TechCrunch (Jan 2026)", url: "https://techcrunch.com/2026/01/23/heres-whats-you-should-know-about-the-us-tiktok-deal/" },
    { label: "Forrester", url: "https://www.forrester.com/blogs/tiktok-seals-the-deal-with-new-us-joint-venture/" },
  ],
  next: "journal-social-search",
  nextLabel: "Social ist die neue Suchmaschine",
};
