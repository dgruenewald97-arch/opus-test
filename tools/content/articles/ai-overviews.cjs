// ai-overviews.cjs — Daten-Datei für journal-ai-overviews.html.
// Rückgeführt aus der hand-gebauten Seite (Backfill „generieren statt klonen").

const F = require("../../lib/figures.cjs");

// Dieses Diagramm ist ein horizontaler Segment-Balken mit abweichender viewBox (440×180)
// und Annotations-Text — kein exakter Treffer für F.stackBar (440×300). Das rohe SVG
// wird faithful übernommen, weil die Geometrie nicht aus den Standard-Funktionen folgt.
const klickVerteilungSvg = `<svg viewBox="0 0 440 180" role="img" aria-label="Verteilung der Klicks bei AI-Overview-Suchen">
<rect width="440" height="180" fill="${F.C.paper}"/>
<rect x="20" y="50" width="288" height="70" fill="${F.C.shock}" stroke="${F.C.ink}" stroke-width="4"/>
<rect x="308" y="50" width="40" height="70" fill="${F.C.acid}" stroke="${F.C.ink}" stroke-width="4"/>
<rect x="348" y="50" width="72" height="70" fill="${F.C.paper}" stroke="${F.C.ink}" stroke-width="4"/>
<text text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="20" font-weight="700" fill="${F.C.ink}"><tspan x="164" y="94.66666666666667">72%</tspan></text>
<text text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700" fill="${F.C.ink}"><tspan x="328" y="91.66666666666667">~10%</tspan></text>
<text text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" fill="${F.C.ink}"><tspan x="384" y="92.33333333333333">18%</tspan></text>
<text x="20" y="38" font-family="'JetBrains Mono', monospace" font-size="11" fill="${F.C.ink}">100% aller AI-Overview-Impressionen →</text>
<text x="20" y="145" font-family="'JetBrains Mono', monospace" font-size="10.5" fill="${F.C.ink}">■ Zero-Click / Session-Ende  ·  ■ Klick auf ZITIERTE Quelle (= GEO-Chance)</text>
<text x="20" y="162" font-family="'JetBrains Mono', monospace" font-size="10.5" fill="${F.C.ink}">■ Klick auf nicht-zitiertes Ergebnis (schrumpft)</text>
</svg>`;

module.exports = {
  slug: "journal-ai-overviews",
  cat: "web",
  title: "Platz 1, aber keiner klickt",
  ogTitle: "Platz 1, aber keiner klickt",
  desc: "AI Overviews & Zero-Click: −38% kausal vs. −58% korreliert sauber getrennt. Mit Klick-Verteilungs-Balken und Forecast-Rechnung mit Bandbreite.",
  ogDesc: "Platz 1 war ein Ziel. Heute ist es ein Schaufenster, an dem alle vorbeigehen — außer du wirst in der Antwort zitiert.",

  h1: "Platz 1, aber keiner klickt",
  crumb: "AI Overviews",
  dek: "Erscheint ein AI Overview, brechen die Klicks ein — sauber gemessen um 38 %, das randomisierte Feldexperiment ist die belastbarste Zahl. Aber die Klicks sind nicht weg: Sie wandern zu den zitierten Marken. Zitiert werden ist das neue Ranken.",
  dt: "2026-05-16",
  dateLabel: "16. Mai 2026",
  read: 7,
  author: "Tobias Klein · Tech & Web",

  body: [
    { p: "Jahrelang war SEO simpel: Platz 1, kassiere die Klicks. Dieser Deal ist gebrochen. Blendet Google über deinem Ergebnis einen <strong>AI Overview</strong> ein, beantwortet er die Frage oft komplett, bevor jemand zu den blauen Links scrollt." },
    { h: "Erst die Zahlen sauber trennen" },
    { p: "Hier wird viel Unsinn zitiert, weil Methodiken vermischt werden. Sauber getrennt:" },
    {
      ul: [
        "<strong>Feldexperiment (Agarwal & Sen, randomisiert, stärkste Evidenz):</strong> −38 % ausgehende organische Klicks, Zero-Click steigt von 54 % auf 72 %.",
        "<strong>Pew (Clickstream-Panel):</strong> 8 % Klickrate mit KI-Zusammenfassung vs. 15 % ohne; nur 1 % klickt auf den Link <em>in</em> der Zusammenfassung.",
        "<strong>Ahrefs (Clickstream-Korrelation, Eigenangabe):</strong> −58 % auf Position 1 — aber das ist ein Vergleich zweier Keyword-Töpfe über Zeit, kein kausaler Wert.",
      ],
    },
    { p: `Wer mit den −58 % argumentiert, verkauft Korrelation als Kausalität. Die ehrliche Pointe: Klicks sind nicht „weg" — sie verteilen sich zu zitierten Marken um. Der Schaden ist hochgradig ungleich verteilt.` },
    { h: "Das Modell: Klick-Verteilung bei AIO" },
    {
      fig: {
        svg: klickVerteilungSvg,
        cap: "<b>Wohin die Klicks gehen.</b> Das verlierende Unternehmen kämpft um das schrumpfende rechte Segment (nicht-zitiert). Das gewinnende verschiebt sich in das schmale acid-Segment: zitiert in der Antwort. Seer misst dort bis zu +35 % organische Klicks.",
      },
    },
    {
      calc: {
        label: "Forecast mit Bandbreite",
        lines: [
          `10.000 organische Klicks/Monat, davon 40% auf Keywords, die jetzt ein AIO auslösen = 4.000 „at risk".`,
          "Konservativ (−38% kausal): −1.520 Klicks → 8.480 gesamt (−15%).",
          "Aggressiv (−58% korreliert): −2.320 Klicks → 7.680 gesamt (−23%).",
        ],
        result: "Plane −15 bis −23% — aufs betroffene Segment, nicht aufs Gesamtportfolio",
      },
    },
    { h: "Was du Montag tust" },
    {
      checklist: [
        "In GSC splitten: Welche Top-Keywords lösen ein AIO aus? Nur dieses Segment ist betroffen, nicht das Gesamtportfolio.",
        "Pro AIO-Keyword prüfen: zitiert oder nicht? Zitierte vs. nicht-zitierte CTR getrennt im Reporting führen.",
        "Conversion-Wert statt Klickzahl tracken: Brechen transaktionale Klicks weg oder nur informationale (verkraftbar)?",
        "Forecast immer als Bandbreite (−15 bis −23 %) kommunizieren, nie mit der Schlagzeilen-Einzelzahl.",
      ],
    },
  ],

  quote: "Platz 1 war gestern ein Ziel. Heute ist es ein Schaufenster, an dem alle vorbeigehen. Zitiert werden ist das neue Ranken.",
  sources: [
    { label: "Pew Research", url: "https://www.pewresearch.org/short-reads/2025/07/22/google-users-are-less-likely-to-click-on-links-when-an-ai-summary-appears-in-the-results/" },
    { label: "Feldexperiment (Search Engine Journal)", url: "https://www.searchenginejournal.com/ai-overviews-cut-organic-clicks-38-field-study-finds/573145/" },
    { label: "Ahrefs", url: "https://ahrefs.com/blog/ai-overviews-reduce-clicks-update/" },
  ],
  next: "journal-geo",
  nextLabel: "GEO ist nicht SEO mit neuem Namen",
};
