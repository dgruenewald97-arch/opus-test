// incrementality.cjs — Daten-Datei für journal-incrementality.html.
// Rückgeführt aus der hand-gebauten Seite (Backfill „generieren statt klonen").

const F = require("../../lib/figures.cjs");

module.exports = {
  slug: "journal-incrementality",
  cat: "performance",
  title: "Incrementality schlägt Attribution",
  desc: "Incrementality, MMM und Attribution 2026: drei Linsen, eine Wahrheit. Mit Speed×Causality-Matrix und Brand-Search-Rechenbeispiel (iROAS 0,70x).",
  ogDesc: "Attribution sagt dir, wer am Ende dastand. Incrementality sagt dir, ob du den Lauf überhaupt ausgelöst hast.",

  h1: "Incrementality schlägt Attribution",
  crumb: "Incrementality",
  dek: `„Welcher Klick kriegt die Conversion?" ist die falsche Frage. Über 225 Geo-Tests zeigen: Brand Search bringt im Schnitt nur 0,70€ je 1€ echten Umsatz. Wer Last-Click feiert, finanziert Käufe, die sowieso passiert wären.`,
  dt: "2026-05-29",
  dateLabel: "29. Mai 2026",
  read: 7,
  author: "Selin Akar · Head of Performance",

  body: [
    { p: "Stell dir vor, du sponserst den schnellsten Läufer beim Marathon. Er gewinnt. Du klebst dein Logo auf die Siegerehrung — nur wäre er auch ohne dich Erster geworden. Genau das macht Last-Click-Attribution: Sie heftet die Conversion an den letzten Touchpoint und tut so, als hätte der sie verursacht." },
    { p: "Mit dem Wegfall sauberer User-Level-Daten verschiebt sich die Messung. Laut eMarketer × TransUnion (196 US-Marketer, Juli 2025) nutzen <strong>52 %</strong> bereits Incrementality-Tests, <strong>36,2 %</strong> wollen das Budget erhöhen, und <strong>27,6 %</strong> nennen MMM ihre verlässlichste Methode — vor Attribution (19,4 %)." },
    { h: "Drei Linsen, keine Wahrheit allein" },
    { p: `Wichtig, damit kein neuer Hype entsteht: Es ist nicht „Incrementality <em>statt</em> Attribution". Es sind drei Werkzeuge auf zwei Achsen — Geschwindigkeit und Kausalität. Keines gewinnt; sie haben verschiedene Jobs:` },
    {
      fig: {
        svg: F.matrix({
          label: "Measurement-Matrix: Geschwindigkeit gegen Kausalität",
          xAxis: "GESCHWINDIGKEIT  langsam → schnell",
          yAxis: "KAUSALITÄT  Korrelation → kausal",
          cells: {
            tl: { lines: ["MMM", "Quartals-Budget"] },
            tr: { fill: F.C.acid, emphasis: true, lines: ["INCREMENTALITY", "Goldstandard"] },
            bl: { fill: F.C.shock, lines: ["BLINDFLUG"] },
            br: { fill: F.C.warn, lines: ["ATTRIBUTION", "Tages-Tuning"] },
          },
        }),
        cap: "<b>Speed × Causality.</b> MMM steuert die Quartals-Allokation, Incrementality validiert kausal <i>vor</i> dem Skalieren, Attribution macht das tägliche Tuning. Geo-Lift eicht das MMM (Meridian/Robyn) — so wird Korrelation näher an Kausalität.",
      },
    },
    { h: "Der teuerste Posten: was sowieso passiert wäre" },
    { p: "Stella wertete über <strong>225 Geo-/Holdout-Tests</strong> aus (Aug 2024–Dez 2025). Ergebnis: Median-iROAS aller Kanäle 2,31x — aber Google <strong>Brand Search bei nur 0,70x</strong>, dem niedrigsten Wert überhaupt. Heißt: Brand Search bringt weniger als 1€ je 1€, weil die Leute ohnehin gekauft hätten." },
    {
      calc: {
        label: "Rechenbeispiel",
        lines: [
          `50.000€/Monat Brand Search, Plattform meldet ROAS 8,0 → „400.000€ Umsatz".`,
          "Geo-Holdout: echter iROAS = 0,70x → real inkrementell nur <b>35.000€</b>.",
          "≈ 91% des zugeschriebenen Umsatzes wäre auch ohne Ads gekommen.",
        ],
        result: "10.000€ aus Brand Search abziehen = fast 0 echter Verlust",
      },
    },
    { h: "Was du Montag tust" },
    {
      checklist: [
        "Einen sauberen Geo-Holdout aufsetzen — beim verdächtigsten Kanal (Brand Search/Retargeting), mind. 4 Wochen, Confidence-Intervall vorab definieren.",
        `Plattform-ROAS vs. iROAS gegenüberstellen — die Differenz ist dein „Reattributions-Aufschlag".`,
        "MMM-Pilot mit Meridian (Bayesian) oder Robyn — und mit Geo-Lift kalibrieren, nicht isoliert laufen lassen.",
        "Rollen fixieren: Attribution = Tag, Incrementality = Kausal-Check vor Scale, MMM = Quartal. Festlegen, welche Zahl welche Entscheidung steuert.",
      ],
    },
    { p: "Achtung Gegen-These: 44 % der Marketer misstrauen ihren eigenen Incrementality-Ergebnissen — meist wegen schlecht designter Tests (zu kleine Geos, zu kurz). Wer nur die Methode wechselt, ohne Test-Design zu beherrschen, tauscht eine Illusion gegen eine teurere." },
  ],

  quote: "Attribution sagt dir, wer am Ende dastand. Incrementality sagt dir, ob du den Lauf überhaupt ausgelöst hast. Den Unterschied bezahlst du jeden Monat.",
  sources: [
    { label: "eMarketer × TransUnion (2026)", url: "https://www.emarketer.com/content/mmm--incrementality--other-measurement-trends-that-will-define-2026" },
    { label: "Stella iROAS-Benchmarks 2025", url: "https://www.stellaheystella.com/blog/2025-dtc-digital-advertising-incrementality-benchmarks" },
  ],
  next: "journal-jaguar",
  nextLabel: "Jaguar: 49 Autos, ein Lehrstück",
};
