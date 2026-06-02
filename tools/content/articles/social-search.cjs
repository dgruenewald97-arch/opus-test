// social-search.cjs — Daten-Datei für journal-social-search.html.
// Rückgeführt aus der hand-gebauten Seite (Backfill „generieren statt klonen").

const F = require("../../lib/figures.cjs");

module.exports = {
  slug: "journal-social-search",
  cat: "social",
  title: "Social ist die neue Suchmaschine",
  desc: "Social-Search 2026: 41% Gen Z suchen zuerst auf Social. Mit dem 4-Schichten-Social-SEO-Stack und der Question-Mining-Rechnung für Evergreen-Reichweite.",
  ogDesc: "Discoverability ist kein Distributions-, sondern ein Skript-Problem. Die Maschine liest gesprochenes Audio — Hashtags verlieren.",

  h1: "Social ist die neue Suchmaschine",
  crumb: "Social-Search",
  dek: "41 % der Gen Z suchen zuerst auf Social, 86 % wöchentlich auf TikTok. Discoverability ist dabei kein Distributions-, sondern ein Skript-Problem: Wer schöne, aber stumme Videos macht, ist für die Such-Hälfte des Funnels unsichtbar.",
  dt: "2026-05-20",
  dateLabel: "20. Mai 2026",
  read: 6,
  author: "Mara Vogt · Chief Chaos Officer",

  body: [
    { p: `Die berühmte „40 % der Gen Z googeln nicht mehr"-Zahl ist ein verzerrtes Zitat von 2022. Die belastbare Version: Laut Sprout Social (Q2 2025, mehr als 2.200 Nutzer) suchen <strong>41 % der Gen Z zuerst auf Social</strong> — vor Suchmaschinen (32 %) und KI-Chatbots (11 %). WARC × TikTok ergänzt: 86 % der Gen Z suchen wöchentlich auf TikTok, fast gleichauf mit klassischer Suche (90 %).` },
    { p: `<em>(Transparenz: Die früher kursierende Zahl „nur 25 % finden die Ergebnisse effektiv" ließ sich nicht belegen und ist hier raus. Belegt sind: 61 % der TikTok-Sucher fühlen sich eher zum Handeln inspiriert, 90 % der Gen Z wurden in 6 Monaten von Social-Content zu einem Kauf beeinflusst.)</em>` },
    { h: "Die unbequeme These: ein Skript-Problem" },
    { p: `„Social-SEO" wird als Hashtag-Spiel missverstanden. Tatsächlich transkribieren TikTok und Instagram gesprochenes Audio und indexieren Captions wie Mini-Blogposts, während Hashtags an Gewicht verlieren. Folge: Wer schöne, aber stumme oder generisch betextete Videos produziert, ist für die Such-Hälfte des Funnels unsichtbar — und genau dort entscheidet die Gen Z.` },
    { h: "Das Modell: 4-Schichten-Social-Search-Stack" },
    {
      fig: {
        svg: F.pyramid({
          label: "4-Schichten-Social-Search-Stack",
          layers: [
            { text: "TAGS + ALT-TEXT", fill: F.C.paper },
            { text: "CAPTION (Keyword in Satz 1)", fill: F.C.paper },
            { text: "ON-SCREEN-TEXT (Sek 1–3)", fill: F.C.acid },
            { text: "GESPROCHEN (Sek 1–3)", fill: F.C.acid },
          ],
        }),
        cap: "<b>Social-Search-Stack.</b> Breiter = höheres Ranking-Gewicht. Die Indexierung läuft von unten: Keyword gesprochen UND als Text in den ersten 3 Sekunden schlägt jeden Hashtag-Block. Tags sind nur die Kirsche.",
      },
    },
    {
      calc: {
        label: "Question-Mining",
        lines: [
          "Zieh die 20 häufigsten Kunden-Suchphrasen (Sales, Support, Autocomplete).",
          "Pro Phrase 1 Video: Keyword gesprochen + on-screen in Sek 1–3, Caption front-geladen.",
          "20 Phrasen × ca. 80€ Produktion = 1.600€.",
        ],
        result: "20 Evergreen-Assets, die monatelang Suchtraffic abgreifen — statt 1 vergänglichem Ad-Burst",
      },
    },
    { h: "Was du Montag tust" },
    {
      checklist: [
        "Top-20-Kundensuchphrasen aus Support/Sales/Autocomplete extrahieren.",
        "Pro Phrase ein Evergreen-Video: Keyword gesprochen + on-screen in Sek 1–3.",
        "Captions front-laden (Keyword in Satz 1), 3–5 Long-Tail-Hashtags, Alt-Text setzen.",
        `Monatlich „In-App-Search"-Performance tracken (Aufrufe aus Suche vs. FYP), nicht nur Gesamtviews.`,
      ],
    },
  ],

  quote: "Die Leute suchen längst auf Social. Ob sie dich finden, entscheidet nicht dein Budget, sondern dein Skript — was in den ersten drei Sekunden gesagt und gezeigt wird.",
  sources: [
    { label: "Sprout Social (Q2 2025)", url: "https://sproutsocial.com/insights/press/new-research-from-sprout-social-finds-social-media-is-the-top-place-gen-z-turns-to-for-search-surpassing-traditional-search-engines/" },
    { label: "WARC × TikTok (Mediaweek)", url: "https://www.mediaweek.com.au/warc-gen-z-turns-to-tiktok-for-search-almost-as-often-as-google/" },
  ],
  next: "journal-ai-slop",
  nextLabel: "AI Slop: Die Plattformen drehen den Geldhahn zu",
};
