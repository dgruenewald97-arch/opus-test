// hook.cjs — Daten-Datei für journal-hook.html.
// Rückgeführt aus der hand-gebauten Seite (Backfill „generieren statt klonen").

const F = require("../../lib/figures.cjs");

module.exports = {
  slug: "journal-hook",
  cat: "social",
  title: "Der Hook in 3 Sekunden",
  desc: "48.000 Anmeldungen für einen Sneaker-Drop. Was den Neontritt-Reel zum Selbstläufer machte — die drei Hook-Muster, mit Stopp-Matrix und Test-Faustregel.",
  ogDesc: "Du konkurrierst nicht mit der Branche. Du konkurrierst mit dem Daumen.",

  h1: "Der Hook in 3 Sekunden",
  crumb: "Der Hook in 3 Sekunden",
  dek: "Der Neontritt-Drop hatte 48.000 Anmeldungen — bei einem Werbebudget, das kleiner war als der Catering-Posten mancher Konkurrenz. Der Hebel war nicht das Geld, sondern die ersten drei Sekunden jedes Reels.",
  dt: "2025-12-09",
  dateLabel: "9. Dez 2025",
  read: 4,
  author: "Jonas Reh · Kreativdirektor",

  body: [
    { p: "Der Neontritt-Drop hatte 48.000 Anmeldungen — bei einem Werbebudget, das kleiner war als der Catering-Posten mancher Konkurrenz. Der Hebel war nicht das Geld, sondern die ersten drei Sekunden jedes Reels." },
    { h: "In drei Sekunden entscheidet sich alles" },
    { p: "Im Feed konkurrierst du nicht mit anderen Sneaker-Marken, sondern mit Katzenvideos, Kommentarspalten und dem nächsten Wisch. Wer in drei Sekunden keinen Grund zum Bleiben liefert, hat verloren — egal wie schön die restlichen 27 Sekunden sind." },
    { h: "Das Modell: Was einen Daumen stoppt" },
    {
      fig: {
        svg: F.matrix({
          label: "Hook-Matrix: Erwartbarkeit gegen Spannung",
          xAxis: "ERWARTBARKEIT  überraschend → erwartbar",
          yAxis: "SPANNUNG  flach → hoch",
          cells: {
            tl: { fill: F.C.acid, emphasis: true, lines: ["STOPP", "Bruch im Frame 1"] },
            tr: { lines: ["SOLIDE", "gut, aber bekannt"] },
            bl: { fill: F.C.shock, emphasis: true, lines: ["WEGGEWISCHT", "Logo-Intro"] },
            br: { fill: F.C.warn, lines: ["TAPETE"] },
          },
        }),
        cap: "<b>Was einen Hook stoppen lässt.</b> Oben links gewinnt: überraschend UND spannungsgeladen im ersten Frame. Das klassische Logo-Intro sitzt unten links — erwartbar und flach — und wird weggewischt, bevor die Story beginnt.",
      },
    },
    { h: "Drei Muster, die funktioniert haben" },
    { p: "Wir testen jeden Hook gegen eine einfache Frage: Erzeugt er in der ersten Sekunde Spannung? Bei Neontritt funktionierten drei Muster besonders gut:" },
    {
      ul: [
        "Bruch: etwas Unerwartetes im ersten Frame, das nicht in den Feed passt",
        "Countdown: sichtbare Knappheit, die sofort Druck aufbaut",
        "Gesicht plus Behauptung: ein Mensch, ein steiler Satz, kein Logo-Intro",
      ],
    },
    {
      calc: {
        label: "Test-Faustregel (illustrativ)",
        lines: [
          "Produzier 10 Hooks statt 1 Hochglanz-Video — gleicher Aufwand, mehr Würfe.",
          "Stell sie gegen die eine Frage: Spannung in Sekunde 1? Wenn nein, gar nicht erst posten.",
          "Lass die Plattform den Gewinner finden, dann häng deine beste Story dahinter.",
        ],
        result: "Zehn Hooks schlagen ein perfektes Video",
      },
    },
    { h: "Was du Montag tust" },
    {
      checklist: [
        "Schreib zu deinem nächsten Video 10 verschiedene Hooks — Bruch, Countdown, Gesicht+Behauptung durchspielen.",
        `Streich jedes Logo-Intro und jedes „Hi Leute": Frame 1 muss Spannung haben.`,
        "Test die Hooks gegeneinander (auch organisch) und schau auf die 3-Sekunden-Halterate.",
        "Häng deine beste Story an den Gewinner-Hook — nicht umgekehrt.",
      ],
    },
    { p: "Der Rest des Reels darf ruhig handwerklich sein. Aber der Hook entscheidet, ob ihn überhaupt jemand sieht. Deshalb stecken wir die meiste Energie genau dorthin — und produzieren lieber zehn Hooks als ein Hochglanz-Video." },
  ],

  quote: "Du konkurrierst nicht mit der Branche. Du konkurrierst mit dem Daumen.",
  sources: [],
  next: "journal-roas-luegt",
  nextLabel: "Warum dein ROAS lügt",
};
