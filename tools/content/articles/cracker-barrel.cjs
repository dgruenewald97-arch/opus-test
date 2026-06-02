// cracker-barrel.cjs — Daten-Datei für journal-cracker-barrel.html.
// Rückgeführt aus der hand-gebauten Seite (Backfill „generieren statt klonen").

const F = require("../../lib/figures.cjs");

module.exports = {
  slug: "journal-cracker-barrel",
  cat: "branding",
  title: "Cracker Barrel und der teuerste Logo-Fehler des Jahres",
  desc: "Cracker Barrel: 48 Jahre Markenzeichen gegen 7 Tage Lebensdauer, ~143 Mio $ Marktwert weg. Mit Ritsons Bothism-Matrix und der Risiko-Rechnung.",
  ogDesc: "Ein Rebrand, der die Wiedererkennung löscht, ist freiwillige Amnesie — und der Markt stellt die Rechnung sofort.",

  h1: "Der teuerste Logo-Fehler des Jahres",
  crumb: "Cracker Barrel",
  dek: "Eine Restaurantkette löschte ihr 48 Jahre altes Logo. Sieben Tage später war es zurück — nachdem die Aktie intraday 15 % verloren hatte. Der Kulturkampf war nur das Streichholz. Das Pulverfass war ein Rebrand ohne Differenzierung.",
  dt: "2026-05-26",
  dateLabel: "26. Mai 2026",
  read: 6,
  author: "Jonas Reh · Kreativdirektor",

  body: [
    { p: `Am 19. August 2025 zeigte Cracker Barrel ein neues Logo — zum <strong>ersten Mal in 48 Jahren</strong> ohne „Uncle Herschel", den Old Timer am Fass. Die Reaktion war nicht nur ein Shitstorm, sie war finanziell: Die Aktie fiel intraday bis −15 %, schloss −7,2 %, rund 94 Mio. $ Börsenwert an einem Tag weg, über die Woche ~100–143 Mio. $. Nach <strong>sieben Tagen</strong> die Rolle rückwärts: „Our 'Old Timer' will remain."` },
    { h: "Nicht der Kulturkampf war die Ursache" },
    { p: `Die populäre Erzählung — „MAGA-Outrage tötete das Logo" — verwechselt Auslöser mit Ursache. Das eigentliche Versagen war strategisch: Cracker Barrel löschte sein wertvollstes Distinctive Brand Asset (48 Jahre Wiedererkennung), ohne dass das neue, generische Logo <em>irgendeine</em> Differenzierung bot. Ein politisch unauffälliges, aber genauso blandes Logo wäre langsamer, aber genauso teuer gescheitert.` },
    { h: "Das Modell: Bothism-Matrix (Ritson / Ehrenberg-Bass)" },
    {
      fig: {
        svg: F.matrix({
          label: "Bothism-Matrix: Distinctiveness gegen Differentiation",
          xAxis: "DISTINCTIVENESS  erkennen sie mich?",
          yAxis: "DIFFERENTIATION  warum ich?",
          cells: {
            tl: { lines: ["GEHEIMTIPP", "relevant, unsichtbar"] },
            tr: { fill: F.C.acid, emphasis: true, lines: ["IKONE", "erkennbar + Grund"] },
            bl: { fill: F.C.shock, emphasis: true, lines: ["BLANDING", "CB neu"] },
            br: { fill: F.C.warn, lines: ["CB ALT", "erkennbar, schwach diff."] },
          },
        }),
        cap: "<b>Bothism (Mark Ritson).</b> Starke Marken sind erkennbar UND anders. Cracker Barrel saß stabil unten rechts und schob sich mit dem Rebrand nach unten links — weder erkennbar noch differenziert. Die schlechteste mögliche Richtung.",
      },
    },
    {
      calc: {
        label: "Die Risiko-Rechnung",
        lines: [
          "700 Mio. $ Transformationsprogramm über 660+ Filialen.",
          "Das Logo ist davon nur ein winziger Kostenposten —",
          "vernichtete aber ~143 Mio. $ Börsenwert in 5 Handelstagen.",
        ],
        result: "Das billigste Element trug ~20% des Marktrisikos",
      },
    },
    { h: "Was du Montag tust" },
    {
      checklist: [
        "Distinctive-Asset-Audit: jedes Element nach Alter × Wiedererkennung scoren. Alles >10 Jahre + hohe Bekanntheit = nicht anfassen ohne Test.",
        "Vor Launch testen (z.B. System1-Fluency: erkennen X% die Marke am Ende?) — Cracker Barrel launchte ungetestet.",
        "Evolution statt Revolution: Asset modernisieren (Strichstärke, Farbe), nicht entfernen.",
        "Rückzugsplan definieren BEVOR du launchst — die schnelle Kehrtwende rettete hier die Aktie, war aber Glück, nicht Plan.",
      ],
    },
  ],

  quote: "Das billigste Element im Rebrand trägt oft das größte Markenrisiko. 48 Jahre Wiedererkennung gegen 7 Tage Mut — der Markt rechnet in Echtzeit ab.",
  sources: [
    { label: "CBS News", url: "https://www.cbsnews.com/news/cracker-barrel-cbrl-stock-down-200-million-loss-new-logo-change/" },
    { label: "Adweek — Ritson Top 10", url: "https://www.adweek.com/brand-marketing/mark-ritsons-top-10-marketing-moments-of-2025/" },
  ],
  next: "journal-made-by-humans",
  nextLabel: "Made by Humans: Wenn Anti-KI zum Klischee wird",
};
