// buzzword-bingo.cjs — Daten-Datei für journal-buzzword-bingo.html.
// Rückgeführt aus der hand-gebauten Seite (Backfill „generieren statt klonen").

const F = require("../../lib/figures.cjs");

module.exports = {
  slug: "journal-buzzword-bingo",
  cat: "meinung",
  title: "Buzzword-Bingo, das wir nie wieder hören wollen",
  desc: "Ganzheitlich, synergetisch, disruptiv: ein Klartext-Manifest gegen die Wörter, hinter denen sich Agenturen verstecken — mit Bullshit-Übersetzer und Streich-Test.",
  ogDesc: "Wenn du ein Wort streichst und der Satz verliert keine Bedeutung — war es ein Buzzword.",

  h1: "Buzzword-Bingo, das wir nie wieder hören wollen",
  crumb: "Buzzword-Bingo",
  dek: `Es gibt Wörter, die bedeuten alles und damit nichts. Sie klingen nach Kompetenz und sagen in Wahrheit: „Wir haben keine klare Antwort." Ein Klartext-Manifest — mit Übersetzungstabelle und einem Test, der jedes Buzzword entlarvt.`,
  dt: "2026-04-30",
  dateLabel: "30. Apr 2026",
  read: 3,
  author: "Mara Vogt · Chief Chaos Officer",

  body: [
    { p: `Es gibt Wörter, die bedeuten alles und damit nichts. Sie klingen nach Kompetenz und sagen in Wahrheit: „Wir haben keine klare Antwort." Hier ein paar Favoriten — und was wir stattdessen sagen.` },
    { h: "Die üblichen Verdächtigen" },
    {
      ul: [
        `„Ganzheitlich" — heißt meist: Wir machen alles ein bisschen, nichts richtig.`,
        `„Synergien heben" — heißt: Wir haben zwei Folien, die zueinander passen sollen.`,
        `„Disruptiv" — heißt: ein neuer Button in hellblau.`,
        `„Wir denken in Zielgruppen" — heißt: Wir haben mit niemandem geredet.`,
        `„Best Practice" — heißt: Das macht der Wettbewerb auch, also ist es safe.`,
      ],
    },
    { h: "Der Bullshit-Übersetzer" },
    {
      fig: {
        svg: F.matrix({
          label: "Buzzword-Matrix: Konkretheit gegen Risiko",
          xAxis: "KONKRETHEIT  vage → präzise",
          yAxis: "RISIKO  unangreifbar → messbar",
          cells: {
            tl: { fill: F.C.shock, emphasis: true, lines: ["BUZZWORD", "klingt gut, sagt nichts"] },
            tr: { fill: F.C.acid, emphasis: true, lines: ["KLARTEXT", "präzise + messbar"] },
            bl: { fill: F.C.paper, lines: ["FÜLLWORT"] },
            br: { fill: F.C.paper, lines: ["FAKT ohne", "Haltung"] },
          },
        }),
        cap: `<b>Warum Buzzwords bequem sind.</b> Oben links: vage UND unangreifbar — niemand kann dich an „ganzheitlich" messen. Klartext (oben rechts) ist unbequem, weil er präzise und messbar ist. Genau deshalb benutzen wir ihn.`,
      },
    },
    { h: "Was wir stattdessen sagen" },
    { p: `Statt „ganzheitlich" sagen wir, woran wir <em>nicht</em> arbeiten. Statt „disruptiv" zeigen wir die Zahl, die sich bewegt hat. Klartext ist unbequemer, weil man an ihm gemessen werden kann. Genau deshalb benutzen wir ihn.` },
    {
      calc: {
        label: "Der Streich-Test",
        lines: [
          "Nimm einen Satz aus deiner letzten Präsentation.",
          "Streiche das verdächtige Wort.",
          "Verliert der Satz an Bedeutung? Nein → es war Dekoration.",
        ],
        result: "Kein Bedeutungsverlust = Buzzword. Raus damit.",
      },
    },
    { h: "Was du Montag tust" },
    {
      checklist: [
        "Lies deine Startseite laut. Markiere jedes Wort, das du einem Kunden im Gespräch NIE sagen würdest.",
        `Ersetze jedes „wir sind innovativ/ganzheitlich" durch eine konkrete Zahl oder ein konkretes Beispiel.`,
        "Wende den Streich-Test auf jeden Claim an — überlebt er das Streichen nicht, fliegt er raus.",
        "Eine Aussage pro Seite, an der man dich messen kann. Eine reicht, aber sie muss echt sein.",
      ],
    },
    { p: "Eine Marke, die sich hinter Buzzwords versteckt, hat meistens Angst vor einer klaren Aussage. Wir nicht. Lieber ein Satz, der aneckt, als drei, die nichts riskieren." },
  ],

  quote: "Wenn du ein Wort streichst und der Satz verliert keine Bedeutung — war es ein Buzzword.",
  sources: [],
  next: "journal-logo-marke",
  nextLabel: "Dein Logo ist nicht deine Marke",
};
