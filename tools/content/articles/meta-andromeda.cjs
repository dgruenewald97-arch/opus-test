// meta-andromeda.cjs — Daten-Datei für journal-meta-andromeda.html.
// Rückgeführt aus der hand-gebauten Seite (Backfill „generieren statt klonen").
// Diagramm-Typ: custom (duales Pipeline-Panel mit Pfeil + Hebel-Balken, kein F.*-Typ passend)

const F = require("../../lib/figures.cjs");

module.exports = {
  slug: "journal-meta-andromeda",
  cat: "performance",
  title: "Meta entscheidet jetzt, wer deine Anzeige sieht",
  desc: `Metas Andromeda + GEM kippen die Werbelogik vom Targeting zum Creative. Mit Funnel-Diagramm, Reattributions-Check und Rechenbeispiel zum +22%-ROAS-Claim.`,
  ogDesc: `Du targetest nicht mehr die Leute. Du fütterst die Maschine mit Creatives. Und ein hoher Advantage+-ROAS kann ein Warnsignal sein.`,

  h1: "Meta entscheidet, wer deine Anzeige sieht",
  crumb: "Meta Andromeda",
  dek: `Andromeda wählt aus 10 Millionen Anzeigen vor, GEM rankt sie wie ein Sprachmodell. Targeting ist weg-automatisiert. Dein letzter echter Hebel: Creative und Datenqualität. Und der „+22 % ROAS"-Claim hat einen Haken.`,
  dt: "2026-05-30",
  dateLabel: "30. Mai 2026",
  read: 7,
  author: "Selin Akar · Head of Performance",

  body: [
    { p: `Zwanzig Jahre war Werbung auf Meta ein Filter-Problem: Zielgruppe schneiden, hoffen, dass die Anzeige die Richtigen trifft. <strong>Andromeda</strong> (Retrieval, seit Dez 2024) und <strong>GEM</strong> (Ranking, live seit Q2 2025) drehen das um. Andromeda wählt aus zehn Millionen Anzeigen ein paar Tausend Kandidaten vor; GEM — trainiert auf Tausenden GPUs „at the same scale as ChatGPT" — rankt daraus die eine, die du siehst.` },
    { p: `Die alte Frage „Wem zeigen wir die Anzeige?" wird ersetzt durch „Welche Anzeige zeigen wir dieser Person?". Das verschiebt den Hebel — von den Reglern im Ads Manager zu den Inhalten, die du hochlädst.` },
    { h: "Wo der Hebel jetzt liegt" },
    {
      fig: {
        svg: `<svg viewBox="0 0 460 240" role="img" aria-label="Meta Ads Funnel: Andromeda und GEM, der Hebel verschiebt sich zum Creative">
<rect width="460" height="240" fill="#F2F0E9"/>
<rect x="20" y="24" width="180" height="92" fill="#F2F0E9" stroke="#2D2DFF" stroke-width="5"/>
<text text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="700" fill="#0A0A0A"><tspan x="110" y="59">ANDROMEDA</tspan><tspan x="110" y="74">Retrieval</tspan><tspan x="110" y="89">10 Mio → Tausende</tspan></text>
<rect x="260" y="24" width="180" height="92" fill="#F2F0E9" stroke="#2D2DFF" stroke-width="5"/>
<text text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="700" fill="#0A0A0A"><tspan x="350" y="59">GEM</tspan><tspan x="350" y="74">Ranking + Auktion</tspan><tspan x="350" y="89">Tausende → 1 Ad</tspan></text>
<polygon points="208,55 252,55 252,45 260,70 252,95 252,85 208,85" fill="#0A0A0A"/>
<rect x="20" y="150" width="420" height="64" fill="#D6FF3B" stroke="#0A0A0A" stroke-width="4"/>
<text text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="700" fill="#0A0A0A"><tspan x="230" y="177">DEIN HEBEL 2026:</tspan></text>
<text text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="400" fill="#0A0A0A"><tspan x="230" y="198.67">weg von Targeting/Audiences → Creative + Datenqualität</tspan></text>
</svg>`,
        cap: "<b>Zwei Stufen, ein verschobener Hebel.</b> Retrieval und Ranking sind Maschine. Was DU steuerst, ist nach unten gerutscht: Creative-Volumen, Konzept-Diversität und die Qualität deiner First-Party-Signale (CAPI/Feed).",
      },
    },
    { p: `Heißt konkret: Dein bester Media-Buyer ist nicht mehr der mit den feinsten Audience-Stacks, sondern der, der mutige, <em>verschiedene</em> Creatives in Serie liefert. Nicht zehn Farbvarianten desselben Templates — sondern Konzepte, die unterschiedliche Menschen unterschiedlich ansprechen, damit die Maschine etwas zum Matchen hat.` },
    { h: `Der Haken am „+22 % ROAS"` },
    { p: `Meta wirbt mit +22 % ROAS durch Advantage+ (Eigenangabe, Q1-2025-Earnings). Ein unabhängiger Black-Friday-Gegentest kam auf +16 %. Wichtiger ist der Reattributions-Verdacht: Advantage+ schiebt Budget bevorzugt zu Nutzern mit <em>hoher</em> Conversion-Wahrscheinlichkeit — also oft Bestandskunden, die ohnehin gekauft hätten. Hoher Advantage+-ROAS kann ein Warnsignal sein, kein Erfolg.` },
    {
      calc: {
        label: "Rechenbeispiel",
        lines: [
          "50.000€/Monat Spend, ROAS 3,0 → 150.000€ Umsatz.",
          `Naiver „+22%"-Glaube: +33.000€.`,
          "Realistisch: Wenn 60% des Uplifts bereits konvertierende Bestandskunden sind, bleibt echter Inkrement = 0,22 × 40% = 8,8%:",
        ],
        result: "+13.200€ wirklich neu — nicht +33.000€",
      },
    },
    { p: "Wer mit den vollen 22 % plant, überschätzt den Effekt um Faktor ~2,5 und überallokiert Budget. Die GEM-Zahlen (+5 % Conversions auf Instagram, +3 % auf Facebook) sind außerdem System-Durchschnitte für Meta — keine garantierten Gewinne für dein Konto." },
    { h: "Was du Montag tust" },
    {
      checklist: [
        `ROAS-Plausibilitätscheck: Anteil Neu- vs. Bestandskunden in Advantage+ ziehen — Reattribution sichtbar machen, ggf. auf „New Customer Acquisition" optimieren.`,
        "Conversions API + Feed-Qualität härten — die Maschine performt nur so gut wie deine First-Party-Signale.",
        "Creative-Pipeline auf Volumen + Konzept-Diversität umstellen, statt Micro-Audience-Splits zu bauen.",
        "Den 22%-Claim mit einem Geo-/Lift-Holdout testen, statt Plattform-ROAS blind zu glauben.",
      ],
    },
  ],

  quote: "Du targetest nicht mehr die Leute — du fütterst die Maschine mit Creatives. Und ein traumhafter Advantage+-ROAS ist manchmal nur teuer eingekaufte Bestandskundschaft.",
  sources: [
    { label: "Engineering at Meta — GEM", url: "https://engineering.fb.com/2025/11/10/ml-applications/metas-generative-ads-model-gem-the-central-brain-accelerating-ads-recommendation-ai-innovation/" },
    { label: "Search Engine Land", url: "https://searchengineland.com/meta-ai-driven-advertising-system-andromeda-gem-468020" },
  ],
  next: "journal-incrementality",
  nextLabel: "Incrementality schlägt Attribution",
};
