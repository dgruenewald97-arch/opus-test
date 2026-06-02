// geo.cjs — Daten-Datei für journal-geo.html.
// Rückgeführt aus der hand-gebauten Seite (Backfill „generieren statt klonen").

const F = require("../../lib/figures.cjs");

// Diagramm: vertikales Balkendiagramm mit 4 positiven acid-Balken und 1 negativem
// shock-Balken. Die F-Bibliothek bietet nur horizontale Balken (F.hbars) und keinen
// Typ für Vertikal-Charts mit negativer Achse — das rohe SVG wird faithful übernommen.
// viewBox 460×300 (abweichend vom Standard 440×300).
const geoHebel = `<svg viewBox="0 0 460 300" role="img" aria-label="GEO-Hebel: relativer Sichtbarkeitsgewinn">
<rect width="460" height="300" fill="${F.C.paper}"/>
<text x="20" y="24" font-family="'JetBrains Mono', monospace" font-size="11" fill="${F.C.ink}">% Sichtbarkeitsgewinn (PAWC, Princeton-Studie)</text>
<line x1="20" y1="200" x2="440" y2="200" stroke="${F.C.ink}" stroke-width="3"/>
<rect x="30" y="53.80000000000001" width="56" height="146.2" fill="${F.C.acid}" stroke="${F.C.ink}" stroke-width="4"/>
<text text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" fill="${F.C.ink}"><tspan x="58" y="46.13333333333335">+43%</tspan></text>
<text text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="9.5" font-weight="400" fill="${F.C.ink}"><tspan x="58" y="219.16666666666666">Zitate</tspan></text>
<rect x="118" y="87.8" width="56" height="112.2" fill="${F.C.acid}" stroke="${F.C.ink}" stroke-width="4"/>
<text text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" fill="${F.C.ink}"><tspan x="146" y="80.13333333333333">+33%</tspan></text>
<text text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="9.5" font-weight="400" fill="${F.C.ink}"><tspan x="146" y="219.16666666666666">Statistik</tspan></text>
<rect x="206" y="101.4" width="56" height="98.6" fill="${F.C.acid}" stroke="${F.C.ink}" stroke-width="4"/>
<text text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" fill="${F.C.ink}"><tspan x="234" y="93.73333333333333">+29%</tspan></text>
<text text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="9.5" font-weight="400" fill="${F.C.ink}"><tspan x="234" y="219.16666666666666">Fluency</tspan></text>
<rect x="294" y="104.8" width="56" height="95.2" fill="${F.C.acid}" stroke="${F.C.ink}" stroke-width="4"/>
<text text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" fill="${F.C.ink}"><tspan x="322" y="97.13333333333333">+28%</tspan></text>
<text text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="9.5" font-weight="400" fill="${F.C.ink}"><tspan x="322" y="219.16666666666666">Quellen</tspan></text>
<rect x="382" y="200" width="56" height="51" fill="${F.C.shock}" stroke="${F.C.ink}" stroke-width="4"/>
<text text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" fill="${F.C.ink}"><tspan x="410" y="271.3333333333333">-15%</tspan></text>
<text text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="9.5" font-weight="400" fill="${F.C.ink}"><tspan x="410" y="182.91666666666666">Keyword</tspan><tspan x="410" y="195.41666666666666">Stuffing</tspan></text>
</svg>`;

module.exports = {
  slug: "journal-geo",
  cat: "web",
  title: "GEO ist nicht SEO mit neuem Namen",
  desc: "GEO mit Daten: die +28–43% PAWC-Hebel der Princeton-Studie als Balkendiagramm, plus die ~11%-Overlap-Falle und ein Content-Audit-Rechenbeispiel.",
  ogDesc: "SEO wollte ranken. GEO will zitiert werden. Bei ~11% Plattform-Overlap optimierst du gegen drei Blackboxes, nicht eine.",

  h1: "GEO ist nicht SEO mit neuem Namen",
  crumb: "GEO",
  dek: "Die Princeton-Studie misst es: Zitate steigern die Sichtbarkeit in KI-Antworten um +43 %, Statistiken um +33 %, Keyword-Stuffing schadet. Aber nur ~11 % der zitierten Quellen überschneiden sich zwischen den Engines. Es gibt keinen einen Algorithmus zu knacken.",
  dt: "2026-05-13",
  dateLabel: "13. Mai 2026",
  read: 7,
  author: "Tobias Klein · Tech & Web",

  body: [
    { p: `Ehrliche Vorwarnung: „GEO" ist zur Hälfte Buzzword, verkauft von denselben Leuten, die dir vor zwei Jahren „Web3-Marketing" andrehen wollten. Sei skeptisch bei jedem, der dir eine fertige „GEO-Strategie" für 5.000 €/Monat anbietet.` },
    { p: `Unter dem Hype liegt aber echte Substanz: eine peer-reviewte Studie (Princeton et al., KDD 2024), die mit Daten beantwortet, wie man in generativen Antworten zitiert wird. Gemessen über „Position-Adjusted Word Count" (PAWC):` },
    { h: "Das Modell: GEO-Hebel, gemessen" },
    {
      fig: {
        svg: geoHebel,
        cap: "<b>Was nachweislich wirkt.</b> Direktzitate (+43 %), belegte Statistiken (+33 %), flüssige Sprache (+29 %), Inline-Quellen (+28 %). Und das alte SEO-Brot — Keyword-Stuffing — schadet. Kurz: belegen schlägt tricksen.",
      },
    },
    { p: `Fällt dir was auf? Die stärksten „GEO-Hebel" sind schlicht <em>guter, belegter Journalismus</em> — Zitate, Statistiken, Quellen. Kein Geheimnis, sondern Handwerk. Genau deshalb ist GEO nicht „SEO mit neuem Namen": Du optimierst nicht für einen Crawler, der Wörter zählt, sondern für ein Modell, das Glaubwürdigkeit bewertet.` },
    { h: "Die Falle: es gibt keinen einen Algorithmus" },
    { p: "Mehrere unabhängige Studien (Averi: 680 Mio. Citations; Whitehat: 118.000 Antworten) finden nur ~11 % Quellen-Überschneidung zwischen ChatGPT, Perplexity und Google AIO. Und Ahrefs zeigt: 88 % der KI-Citations stammen von Quellen, die <em>nicht</em> in Googles Top 10 ranken. Du optimierst gegen drei Blackboxes mit verschiedenen Vorlieben — ChatGPT mag Wikipedia, Perplexity YouTube, AIO Reddit/Quora." },
    {
      calc: {
        label: "Content-Audit",
        lines: [
          "50 Money-Artikel. Stats + Zitate heben PAWC-Sichtbarkeit ~+35% pro Artikel (Mittel aus +33/+43).",
          "Aber wegen ~11% Overlap zählt das primär PRO ENGINE — 11 Citations in ChatGPT ≠ 11 in Perplexity.",
          "Realistischer Plan: Top-5-Artikel × 3 Engines = 15 Slots.",
        ],
        result: "Aufwand bündeln (15 Slots) statt über 50 Artikel streuen",
      },
    },
    { h: "Was du Montag tust" },
    {
      checklist: [
        "Top-5-Money-Pages mit je ≥1 Direktzitat (benannte Quelle) und ≥1 belegter Statistik (inline) anreichern — stärkste Hebel zuerst.",
        "Autoritative Inline-Quellen verlinken; jegliches Keyword-Stuffing aktiv entfernen (schadet in GEO).",
        "Sichtbarkeit pro Engine getrennt messen (ChatGPT, Perplexity, AIO) — nicht aggregieren.",
        "Quellen-Vorlieben bespielen: für AIO/ChatGPT Wikipedia + Reddit/Quora, für Perplexity ggf. YouTube.",
      ],
    },
  ],

  quote: "SEO wollte ranken, GEO will zitiert werden. Und bei 11 % Überschneidung gibt es keinen Algorithmus zu knacken — nur drei Blackboxes mit verschiedenem Geschmack.",
  sources: [
    { label: "GEO-Studie (arXiv, Princeton)", url: "https://arxiv.org/abs/2311.09735" },
    { label: "Ahrefs — AI Search Overlap", url: "https://ahrefs.com/blog/ai-search-overlap/" },
  ],
  next: "journal-inp-consent",
  nextLabel: "Zwei Zahlen, die deine Daten zerlegen",
};
