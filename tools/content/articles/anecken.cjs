// anecken.cjs — Daten-Datei für journal-anecken.html.
// Rückgeführt aus der hand-gebauten Seite (Backfill „generieren statt klonen").

const F = require("../../lib/figures.cjs");

module.exports = {
  slug: "journal-anecken",
  cat: "branding",
  title: "Anecken als Strategie",
  desc: "Der Haferkraft-Rebrand: aus leiser Hafermilch eine Marke, über die man streitet. Warum Polarisierung Strategie ist — mit Polarisierungs-Matrix und Reichweiten-Rechnung.",
  ogDesc: "Wer von allen gemocht werden will, wird von niemandem erinnert. Anecken als Strategie.",

  h1: "Anecken als Strategie",
  crumb: "Anecken als Strategie",
  dek: "Die meisten Marken wollen von allen gemocht werden — und werden deshalb von niemandem erinnert. Beim Haferkraft-Rebrand haben wir das Gegenteil gemacht: eine Position, die polarisiert. Und damit Reichweite gewonnen, die kein Mediabudget kauft.",
  dt: "2026-02-27",
  dateLabel: "27. Feb 2026",
  read: 5,
  author: "Jonas Reh · Kreativdirektor",

  body: [
    { p: "Die meisten Marken haben Angst vorm Anecken. Sie wollen von allen gemocht werden — und werden deshalb von niemandem erinnert. Beim Haferkraft-Rebrand haben wir das Gegenteil gemacht: eine Position, die polarisiert. Und genau dadurch Reichweite gewonnen, die kein Mediabudget gekauft hätte." },
    { h: "Neutralität ist teuer" },
    { p: `„Auch lecker" ist kein Standpunkt, es ist Hintergrundrauschen. Eine Marke, die niemandem widerspricht, gibt niemandem einen Grund, über sie zu reden. Wer im Regal verschwindet, muss seine Sichtbarkeit jeden Monat neu einkaufen.` },
    { h: "Das Modell: Polarisierungs-Matrix" },
    {
      fig: {
        svg: F.matrix({
          label: "Polarisierungs-Matrix: Zustimmung gegen Intensität",
          xAxis: "ZUSTIMMUNG  wenige → viele",
          yAxis: "INTENSITÄT  egal → stark",
          cells: {
            tl: { lines: ["KULT", "kleine Gruppe glüht"] },
            tr: { fill: F.C.acid, emphasis: true, lines: ["IKONE", "viele + heiß"] },
            bl: { fill: F.C.warn, lines: ["UNBEKANNT"] },
            br: { fill: F.C.shock, emphasis: true, lines: ["TAPETE", "alle mögen, keiner brennt"] },
          },
        }),
        cap: `<b>Polarisierungs-Matrix.</b> Die meisten Marken zielen auf „alle mögen mich" (unten rechts) — und landen als Tapete: breite, laue Zustimmung, null Intensität. Marken, die erinnert werden, akzeptieren Gegner, um Fans zu bekommen.`,
      },
    },
    { h: "Reibung erzeugt Erinnerung" },
    { p: `Mit dem Claim „Kuh war gestern" hatte Haferkraft plötzlich Gegner — und Fans. Beide haben darüber geredet. So funktioniert Anecken als Strategie:` },
    {
      ul: [
        "Klare Haltung, die eine Gruppe bewusst ausschließt",
        "Design, das die Haltung sichtbar macht statt sie zu verstecken",
        "Ein eingeplanter Shitstorm — als Reichweite, nicht als Risiko",
      ],
    },
    {
      calc: {
        label: "Faustregel (illustrativ)",
        lines: [
          "Lauer Post: Reichweite ≈ Followerzahl × kleiner Faktor — du zahlst Ads für jeden Extra-Blick.",
          "Polarisierender Post: ein Teil teilt zustimmend, ein Teil empört — beide Lager tragen ihn weiter.",
          "Geteilte/kommentierte Beiträge bekommen vom Algorithmus mehr organische Reichweite.",
        ],
        result: "Haltung ist Media-Budget, das du nicht bezahlst",
      },
    },
    { h: "Was du Montag tust" },
    {
      checklist: [
        "Formuliere den einen Satz, dem die Hälfte deiner Wunschkunden zustimmt — und ein anderes Lager widerspricht.",
        "Definiere bewusst, WEN du nicht willst. Eine Marke für alle ist eine Marke für niemanden.",
        "Plane die Gegenreaktion ein: Wer wird meckern, und ist das die zahlende Gruppe? Wenn nein — durchziehen.",
        "Miss Resonanz an Shares/Kommentaren, nicht an Likes. Likes sind höflich, Shares sind Haltung.",
      ],
    },
    { p: "Wichtig: Anecken heißt nicht beleidigen. Es heißt, für etwas zu stehen und den Mut zu haben, nicht für jeden die Richtige zu sein." },
  ],

  quote: "Wer von allen gemocht werden will, wird von niemandem erinnert.",
  sources: [],
  ctaEyebrow: "Bereit, anzuecken?",
  ctaSecondary: { href: "case-haferkraft.html", label: "Den Case lesen" },
  next: "journal-hook",
  nextLabel: "Der Hook in 3 Sekunden",
};
