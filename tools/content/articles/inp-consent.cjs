// inp-consent.cjs — Daten-Datei für journal-inp-consent.html.
// Rückgeführt aus der hand-gebauten Seite (Backfill „generieren statt klonen").
// Diagramm-Typ: custom (duales Panel — Consent-Funnel + Bar-Vergleich, kein F.*-Typ passend)

const F = require("../../lib/figures.cjs");

module.exports = {
  slug: "journal-inp-consent",
  cat: "web",
  title: "Zwei Zahlen, die deine Daten zerlegen",
  desc: `INP statt FID (−5pp Pass-Rate) und Consent Mode v2 (~51% Opt-in, 67% non-compliant). Mit Mess-Schrumpf-Diagramm und dem 49%-Reporting-Bruch durchgerechnet.`,
  ogDesc: `Die gefährlichsten Zahlen sind die, die leise kaputtgehen, während dein Dashboard noch grün zeigt.`,

  h1: "Zwei Zahlen, die deine Daten zerlegen",
  crumb: "INP & Consent",
  dek: "Zwei Tech-Realitäten von 2024, die dieselbe Falle sind: Beide senken deine gemessenen Zahlen, ohne dass sich die Realität verschlechtert hat. INP bewertet dieselbe Seite strenger, Consent v2 zeigt dir nur noch die Hälfte der Nutzer. Wer Bugs sucht, sucht etwas, das es nicht gibt.",
  dt: "2026-05-11",
  dateLabel: "11. Mai 2026",
  read: 6,
  author: "Tobias Klein · Tech & Web",

  body: [
    { p: "Dieser Artikel hat keine sexy Headline, weil das Thema keine ist. Es geht um zwei technische Realitäten, die kaum jemand auf dem Schirm hat — und die beide seit 2024 leise scharf sind. Gemeinsam haben sie etwas Tückisches: Beide senken deine <em>gemessenen</em> Zahlen, ohne dass sich die <em>Realität</em> verschlechtert hat." },
    { h: "Zahl 1: INP hat FID abgelöst" },
    { p: `Seit dem 12. März 2024 ist <strong>Interaction to Next Paint</strong> ein Core Web Vital. FID maß nur die erste Interaktion und war fast immer „gut". INP misst alle Interaktionen über den ganzen Besuch. Folge laut HTTP Archive: Mit FID hätten 48 % der Mobile-Sites „gute" CWV, mit INP nur 43 % — <strong>5 Prozentpunkte weg, ohne eine Zeile Code-Änderung</strong>. INP ist die am schwersten zu bestehende CWV-Metrik.` },
    { h: "Zahl 2: der Consent-Bruch" },
    { p: `Consent Mode v2 ist bei >90 % der EWR-Advertiser eingeführt — klingt erledigt. Ist es nicht: ~67 % der Setups sind nicht sauber compliant (oft „granted" als Default vor der Wahl = Rechtsbruch), und die durchschnittliche Opt-in-Rate liegt bei ~51 %, in DE/FR oft unter 25 %.` },
    {
      fig: {
        svg: `<svg viewBox="0 0 460 240" role="img" aria-label="Mess-Schrumpf durch Consent und INP">
<rect width="460" height="240" fill="#F2F0E9"/>
<text x="20" y="24" font-family="'JetBrains Mono', monospace" font-size="11" fill="#0A0A0A">CONSENT: real → getrackt</text>
<polygon points="30,40 230,40 184,170 76,170" fill="#D6FF3B" stroke="#0A0A0A" stroke-width="4"/>
<text text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="700" fill="#0A0A0A"><tspan x="130" y="64">100% real</tspan></text>
<text text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="700" fill="#0A0A0A"><tspan x="130" y="154">≈51% getrackt</tspan></text>
<text x="20" y="200" font-family="'JetBrains Mono', monospace" font-size="10" fill="#0A0A0A">≈49% nur modellierbar,</text>
<text x="20" y="214" font-family="'JetBrains Mono', monospace" font-size="10" fill="#0A0A0A">nicht messbar</text>
<text x="300" y="24" font-family="'JetBrains Mono', monospace" font-size="11" fill="#0A0A0A">CWV mobil: FID→INP</text>
<line x1="290" y1="170" x2="450" y2="170" stroke="#0A0A0A" stroke-width="3"/>
<rect x="310" y="74" width="44" height="96" fill="#D6FF3B" stroke="#0A0A0A" stroke-width="4"/>
<rect x="380" y="84" width="44" height="86" fill="#FF2E63" stroke="#0A0A0A" stroke-width="4"/>
<text text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" fill="#0A0A0A"><tspan x="332" y="64.33">48%</tspan></text>
<text text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" fill="#0A0A0A"><tspan x="402" y="74.33">43%</tspan></text>
<text text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="400" fill="#0A0A0A"><tspan x="332" y="191.33">FID</tspan></text>
<text text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="400" fill="#0A0A0A"><tspan x="402" y="191.33">INP</tspan></text>
<text x="300" y="214" font-family="'JetBrains Mono', monospace" font-size="10" fill="#0A0A0A">−5 pp „gut", ohne Code-Änderung</text>
</svg>`,
        cap: "<b>Zwei Schrumpf-Mechanismen.</b> Links: Consent filtert ~49 % der Sessions aus dem klassischen Tracking — der Rest ist nur modellierbar, nicht messbar. Rechts: INP drückt die mobile CWV-Pass-Rate um 5 pp. Beide 2024 eingeführt, beide unsichtbar im Dashboard.",
      },
    },
    {
      calc: {
        label: "Der Reporting-Bruch",
        lines: [
          "EWR-Site, real 100.000 Sessions/Monat, Opt-in 51% → nur 51.000 im GA4-Tracking.",
          "Reale Conversions 2.000 (2%) → direkt gemessen ~1.020.",
          "Das sieht aus wie ein −49%-Einbruch — rein durch Consent, ohne realen Verlust.",
        ],
        result: "Faustregel: EWR-Roh-GA4 ≈ 50% der Realität behandeln",
      },
    },
    { h: "Was du Montag tust" },
    {
      checklist: [
        `Consent-Mode-v2 auditieren: Wird vor der Wahl auf „denied" defaultet (compliant) oder „granted" (im 67%-Block)? Default zwingend auf „denied".`,
        "EWR-Reporting mit Consent-Korrektur lesen: Conversion-Modeling / serverseitiges GTM aktivieren, Pre/Post-März-2024-Vergleiche annotieren.",
        "INP auf Mobile mit Feld-Daten (CrUX/RUM, nicht nur Lighthouse-Lab) messen; schwerste Templates (viel JS bei Interaktion) zuerst.",
        "Main-Thread entlasten: Event-Handler aufbrechen, Long Tasks &lt;50 ms, damit kippelnde Templates unter 200 ms kommen.",
      ],
    },
  ],

  quote: `Die gefährlichsten Zahlen sind die, die leise kaputtgehen, während dein Dashboard noch grün zeigt. INP und Consent v2 sind genau das — zweimal.`,
  sources: [
    { label: "web.dev (INP launch)", url: "https://web.dev/blog/inp-cwv-march-12" },
    { label: "HTTP Archive Web Almanac 2024", url: "https://almanac.httparchive.org/en/2024/performance" },
    { label: "Consent-Compliance (arXiv, CHI 2025)", url: "https://arxiv.org/html/2503.19655v1" },
  ],
  next: "journal-roas-luegt",
  nextLabel: "Warum dein ROAS lügt",
};
