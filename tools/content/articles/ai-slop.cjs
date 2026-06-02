// ai-slop.cjs — Daten-Datei für journal-ai-slop.html.
// Rückgeführt aus der hand-gebauten Seite (Backfill „generieren statt klonen").

const F = require("../../lib/figures.cjs");

// Dieses Diagramm zeigt zwei verschachtelte Dreiecke (äußeres Outline-Dreieck paper +
// inneres acid-Dreieck mit Score-Text und Achsen-Labels an den Ecken).
// F.triangle zeichnet nur ein einzelnes Dreieck ohne äußeres Rahmenelement — das rohe
// SVG wird faithful übernommen.
const authentizitaetsDreieckSvg = `<svg viewBox="0 0 440 300" role="img" aria-label="Authentizitäts-Dreieck: Perspektive, Produktion, Variation">
<rect width="440" height="300" fill="${F.C.paper}"/>
<polygon points="220,40 60,250 380,250" fill="${F.C.paper}" stroke="${F.C.ink}" stroke-width="4"/>
<polygon points="220,108 132,222 308,222" fill="${F.C.acid}" stroke="${F.C.ink}" stroke-width="4"/>
<text text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" fill="${F.C.ink}"><tspan x="220" y="171.33333333333334">≥ 4/6</tspan><tspan x="220" y="187.33333333333334">= freigeben</tspan></text>
<text text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="700" fill="${F.C.ink}"><tspan x="220" y="30">PERSPEKTIVE</tspan></text>
<text text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="700" fill="${F.C.ink}"><tspan x="95" y="274">PRODUKTION</tspan></text>
<text text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="700" fill="${F.C.ink}"><tspan x="345" y="274">VARIATION</tspan></text>
<text x="220" y="292" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="10" fill="${F.C.ink}">je Achse 0–2 Punkte · darunter = Slop-Risiko</text>
</svg>`;

module.exports = {
  slug: "journal-ai-slop",
  cat: "social",
  title: "AI Slop: Die Plattformen drehen den Geldhahn zu",
  ogTitle: "AI Slop: Die Plattformen drehen den Geldhahn zu",
  desc: "YouTube & Meta demonetarisieren AI Slop kanalweit. Mit dem Authentizitäts-Dreieck (≥4/6-Schwelle) und dem Klumpenrisiko des Faceless-Channel-Modells.",
  ogDesc: "Wer KI nutzt, um MEHR zu produzieren, ist gefährdet. Wer KI nutzt, um BESSER zu produzieren, gewinnt.",

  h1: "AI Slop: Geldhahn zu",
  crumb: "AI Slop",
  dek: "YouTube hat Anfang 2026 16 der Top-100-Slop-Kanäle entfernt — zusammen 4,7 Mrd. Views und ~9,8 Mio. $ Jahresumsatz, weg. Die Plattformen bauen bewusst keinen KI-Detektor. Die Linie ist nicht KI ja/nein, sondern menschlicher Mehrwert pro Asset.",
  dt: "2026-05-18",
  dateLabel: "18. Mai 2026",
  read: 6,
  author: "Jonas Reh · Kreativdirektor",

  body: [
    { p: `YouTube-CEO Neal Mohan machte im Jahresbrief vom 21. Januar 2026 das Eindämmen von „AI slop" zur Priorität. Dahinter steht harte Policy: Die „Inauthentic Content"-Regel (seit 15. Juli 2025) demonetarisiert massenproduzierten, schablonenhaften Content — und zwar <strong>kanalweit</strong>, nicht pro Video. In einer Enforcement-Welle Anfang 2026 entfernte YouTube 16 der Top-100-Slop-Kanäle (laut Kapwing-Report): zusammen 35 Mio. Abos, 4,7 Mrd. Lifetime-Views, ~9,8 Mio. $ geschätzter Jahresumsatz.` },
    { p: "Meta zog nach: reduzierte Distribution + eingeschränkte Monetarisierung für unoriginalen Content, ~500.000 sanktionierte Accounts und ~10 Mio. entfernte Impersonator-Profile seit Anfang 2025." },
    { h: "Die clevere These: kein KI-Detektor" },
    { p: `Die Plattformen führen bewusst <em>keinen</em> KI-Detektor ein. Die Linie ist nicht „KI ja/nein", sondern menschlicher Mehrwert pro Asset. Das ist strategisch klüger und für Slop-Farmen gefährlicher: Ein Detektor wäre umgehbar, „inauthentisch/templated" ist es nicht — weil es das Geschäftsmodell (Skalierung durch Wiederholung) direkt angreift. Ironie: Wer KI nutzt, um <strong>mehr</strong> zu produzieren, ist gefährdet; wer KI nutzt, um <strong>besser</strong> zu produzieren, gewinnt.` },
    { h: "Das Werkzeug: Authentizitäts-Dreieck" },
    {
      fig: {
        svg: authentizitaetsDreieckSvg,
        cap: "<b>Authentizitäts-Dreieck.</b> Bewerte jeden Content-Batch auf drei Achsen mit je 0–2 Punkten. Veröffentliche nur, was ≥4/6 erreicht — praktisch heißt das: pro Asset mindestens ein menschliches Element, das ein Template-Klon nicht reproduzieren kann.",
      },
    },
    {
      calc: {
        label: "Das Klumpenrisiko",
        lines: [
          "16 entfernte Kanäle verloren ~9,8 Mio. $/Jahr — im Schnitt ~613.000 $ pro Kanal, schlagartig auf null.",
          `Ein „Faceless-AI-Channel" als Geschäftsmodell hat ein binäres Risiko:`,
          "Eine Policy-Welle = Totalverlust. Kein Diversifikations-Netz.",
        ],
        result: "Pro Asset ≥1 nicht-replizierbares menschliches Element verankern",
      },
    },
    { h: "Was du Montag tust" },
    {
      checklist: [
        `Bestehende Kanäle gegen die „Inauthentic Content"-Kriterien auditieren: Template-Serien, Slideshows, narrationslose Clips identifizieren und überarbeiten oder depublizieren.`,
        "Vor jeder Veröffentlichung das Authentizitäts-Dreieck anwenden — nur ≥4/6 freigeben.",
        "Pro Asset mind. ein nicht-replizierbares menschliches Element (Original-Voiceover, eigene Daten, Gesicht/Erfahrung).",
        "Realistischen KI-Content gemäß Transparenzregeln offenlegen; Geschäftsmodell vom Single-Channel-Klumpenrisiko diversifizieren.",
      ],
    },
  ],

  quote: "Die Plattformen zahlen nicht mehr fürs Viele. Sie zahlen fürs Andere. KI verschiebt den Engpass von Quantität zu nachweisbarer Originalität.",
  sources: [
    { label: "Social Media Today (Policy)", url: "https://www.socialmediatoday.com/news/youtube-clarifies-monetization-update-inauthentic-repeated-content/752892/" },
    { label: "XDA (Kapwing-Report)", url: "https://www.xda-developers.com/youtube-just-deleted-over-4-7-billion-views-worth-ofai-slop-videos/" },
  ],
  next: "journal-ai-overviews",
  nextLabel: "Platz 1, aber keiner klickt",
};
