// cookie-tod.cjs — Daten-Datei für journal-cookie-tod.html.
// Rückgeführt aus der hand-gebauten Seite (Backfill „generieren statt klonen").

const F = require("../../lib/figures.cjs");

module.exports = {
  slug: "journal-cookie-tod",
  cat: "daten",
  title: "Tracking nach dem Cookie-Tod",
  desc: "Third-Party-Cookies sterben. Wie GRELLWERK mit First-Party-Daten, Server-Side-Tracking und Consent-Realismus weiter misst — mit Daten-Schichten-Modell und Recovery-Rechnung.",
  ogDesc: "Wer erst beim Cookie-Tod über First-Party-Daten nachdenkt, denkt drei Jahre zu spät.",

  h1: "Tracking nach dem Cookie-Tod",
  crumb: "Tracking nach dem Cookie-Tod",
  dek: "Der Third-Party-Cookie liegt im Sterben, und halb Marketing-Deutschland tut so, als wäre Messen vorbei. Ist es nicht. Vorbei ist die Bequemlichkeit, fremde Daten gratis mitzunehmen, ohne je eine eigene Beziehung zum Kunden aufzubauen.",
  dt: "2026-05-28",
  dateLabel: "28. Mai 2026",
  read: 5,
  author: "Selin Akar · Head of Performance",

  body: [
    { p: "Der Third-Party-Cookie liegt im Sterben, und halb Marketing-Deutschland tut so, als wäre Messen damit vorbei. Ist es nicht. Was vorbei ist, ist die Bequemlichkeit, fremde Daten gratis mitzunehmen, ohne je eine eigene Beziehung zum Kunden aufzubauen." },
    { h: "First-Party ist kein Plan B" },
    { p: "Die Daten, die wirklich tragen, gehören dir: Käufe, Logins, Newsletter, Support-Tickets, Loyalty. Wer diese Signale sauber sammelt und verknüpft, misst nach dem Cookie genauer als die meisten je mit ihm gemessen haben — weil First-Party-Daten näher am echten Verhalten sitzen als jedes Pixel." },
    { h: "Das Modell: vom Browser-Pixel zur eigenen Infrastruktur" },
    {
      fig: {
        svg: F.pyramid({
          label: "Daten-Schichten nach dem Cookie",
          layers: [
            { text: "3rd-Party-Pixel (stirbt)", fill: F.C.paper },
            { text: "Consent-Realismus + Modeling", fill: F.C.paper },
            { text: "Server-Side-Tracking (sGTM/CAPI)", fill: F.C.acid },
            { text: "First-Party: Käufe, Logins, Loyalty", fill: F.C.acid },
          ],
        }),
        cap: "<b>Worauf du baust.</b> Unten = robust und dir gehörend, oben = fremd und bröckelnd. Die meisten haben jahrelang oben gemessen. Nach dem Cookie zählt, was unten steht.",
      },
    },
    { h: "Server-Side schlägt Browser" },
    { p: "Tracking im Browser ist ein Minenfeld aus Ad-Blockern, ITP und Consent-Bannern. Server-Side-Tagging holt die Messung dahin zurück, wo sie kontrollierbar ist: auf deine Infrastruktur. Sauberer, robuster, DSGVO-erklärbar." },
    {
      ul: [
        "First-Party-Events serverseitig erheben statt im Browser einsammeln",
        "Conversions-API / serverseitige Schnittstellen statt nur Pixel",
        "Consent ehrlich behandeln — Modelling füllt nur die echten Lücken",
      ],
    },
    {
      calc: {
        label: "Recovery-Rechnung (illustrativ)",
        lines: [
          "100.000 Sessions/Monat · 2% CR · 80€ = 160.000€ Umsatz.",
          "Browser-Tracking verliert ~20% der Conversions → 32.000€/Monat unsichtbar.",
          "Server-Side + CAPI holt ~20% davon zurück (konservativ):",
        ],
        result: "≈ 6.400€/Monat wieder messbar — sonst falsche Budgets",
      },
    },
    { h: "Was du Montag tust" },
    {
      checklist: [
        "Dunkelziffer beziffern: Welche Conversions fehlen im Pixel gegenüber den echten Backend-Bestellungen?",
        "Server-Side-Container (sGTM auf eigener Subdomain) + Conversions-API aufsetzen.",
        "Eine neue First-Party-Quelle bauen: Account im Checkout, Newsletter mit Mehrwert oder Loyalty.",
        `Consent sauber defaulten (auf „denied") und Modeling nur für die echten Lücken nutzen.`,
      ],
    },
    { p: "Das Cookie-Ende ist kein Mess-Problem. Es ist ein Filter: Es trennt Marken, die ihre Kunden kennen, von denen, die sie nur geliehen hatten." },
  ],

  quote: "Wer erst beim Cookie-Tod über First-Party-Daten nachdenkt, denkt drei Jahre zu spät.",
  sources: [],
  next: "journal-roas-luegt",
  nextLabel: "Warum dein ROAS lügt",
};
