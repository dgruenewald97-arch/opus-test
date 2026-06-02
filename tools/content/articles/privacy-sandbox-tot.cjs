// privacy-sandbox-tot.cjs — Daten-Datei für journal-privacy-sandbox-tot.html.
// Rückgeführt aus der hand-gebauten Seite (Backfill „generieren statt klonen").
// Diagramm-Typ: pyramid (Daten-Eigentums-Pyramide)

const F = require("../../lib/figures.cjs");

module.exports = {
  slug: "journal-privacy-sandbox-tot",
  cat: "daten",
  title: "Das Cookie ist unsterblich",
  desc: `Google hat im Okt 2025 die Privacy Sandbox beerdigt. Warum der abgesagte Cookie-Tod keine Entwarnung ist — mit Daten-Eigentums-Pyramide und Rechenbeispiel.`,
  ogDesc: `Der Cookie-Tod war sechs Jahre die meistzitierte Deadline. Sie kam nie. Trotzdem ändert das nichts an der richtigen Strategie.`,

  h1: "Das Cookie ist unsterblich",
  crumb: "Das Cookie ist unsterblich",
  dek: "Im Oktober 2025 hat Google 10 Privacy-Sandbox-Technologien beerdigt. Der Cookie-Tod, sechs Jahre lang als Deadline verkauft, fällt aus. Schlechte Nachricht: Das ist keine Entwarnung, sondern dein Auftrag, endlich eigene Infrastruktur zu bauen.",
  dt: "2026-05-31",
  dateLabel: "31. Mai 2026",
  read: 7,
  author: "Selin Akar · Head of Performance",

  body: [
    { p: "Am <strong>17. Oktober 2025</strong> hat Google die Privacy Sandbox faktisch eingestampft: zehn Technologien auf einmal — Topics, Protected Audience, Attribution Reporting, IP Protection und mehr, auf Chrome wie Android. Sechs Jahre lang hat eine ganze Industrie auf den Cookie-Tod hingearbeitet. Jetzt fällt die Beerdigung aus." },
    { p: `Die verlockende Lesart: „Cookies leben weiter, Entwarnung." Falsch. Google hat die einzige browser-native, datenschutzkonforme Messlösung beerdigt — und lässt dich mit erodierenden Cookies plus klaffenden Mess-Lücken zurück. Es kommt kein Industrie-Standard mehr. Wer 2026 keine eigene Infrastruktur baut, ist total abhängig von den Walled Gardens und ihrer Blackbox-Messung.` },
    { h: "Was wirklich passiert ist — und warum" },
    { p: "Am selben Tag entließ die britische CMA Google aus den 2022er-Verpflichtungen. Pikant: <strong>alle 15 Konsultations-Antworten waren dagegen</strong> — die Behörde tat es trotzdem. Die CMA-Tests hatten die Schwäche der Sandbox offengelegt: 85 % der Conversions waren um 60–100 % falsch gemessen, Publisher meldeten ~30 % Umsatzrückgang. Der eigentliche Treiber (Branchen-Lesart): Mit dem laufenden AdTech-Kartellverfahren war ein Sandbox-Rückzug für Google das kleinere Opfer." },
    { h: "Das Modell: Daten-Eigentums-Pyramide" },
    { p: `Die Frage ist nicht „Cookie ja oder nein", sondern wie weit unten in deinem Daten-Stack du investierst. Je tiefer, desto unabhängiger. Die meisten Firmen bauen an der Spitze (Plattform-abhängig) — und vernachlässigen die Basis, die ihnen wirklich gehört:` },
    {
      fig: {
        svg: F.pyramid({
          label: "Daten-Eigentums-Pyramide",
          layers: [
            { text: "WALLED-GARDEN-SIGNALE", fill: F.C.paper },
            { text: "Enrichment / Modeling", fill: F.C.paper },
            { text: "First-Party-Infrastruktur", fill: F.C.acid },
            { text: "Zero-/First-Party-Daten", fill: F.C.acid },
          ],
        }),
        cap: "<b>Daten-Eigentums-Pyramide.</b> Unten = dir gehört's, oben = du mietest. Wer nur oben baut (Google/Meta-Targeting), steht ohne Fundament da, sobald die Plattform die Regeln ändert.",
      },
    },
    {
      calc: {
        label: "Rechenbeispiel",
        lines: [
          "Shop: 100.000 Sessions/Monat · 2% CR · 80€ AOV = 160.000€ Umsatz.",
          "Browser-Tracking verliert ~20% der Conversions (ITP, Opt-outs, Adblocker) → 400 Sales <b>unsichtbar</b> = 32.000€/Monat nicht zugeordnet.",
          "Server-Side-Tracking + Conversions API holt ~20% davon zurück (Anbieter-Eigenangabe, konservativ):",
        ],
        result: "≈ 6.400€/Monat ≈ 77.000€/Jahr wieder messbar",
      },
    },
    { h: "Was du Montag tust" },
    {
      checklist: [
        "Dunkelziffer beziffern: Welche Conversions kommen nur über Client-Side-Pixel? Gegen die Backend-Bestellungen abgleichen.",
        "Server-Side-Container (sGTM auf eigener Subdomain) + Conversions API priorisieren — 2026 Baseline, kein Nice-to-have.",
        "Eine konkrete neue Zero-Party-Quelle bis Quartalsende: Quiz, Account-Pflicht im Checkout oder Loyalty.",
        "privacysandbox.google.com/overview/status ins Monitoring: exakte Topics-Abschalttermine (Chrome M144 deprecated → M150 entfernt) tracken.",
      ],
    },
    { p: "Sechs Jahre Vorbereitung auf ein Ereignis, das ausfällt — teuer. Aber die Firmen, die in der Zeit echte First-Party-Strukturen gebaut haben, stehen heute besser da. Nicht wegen der Prophezeiung. Sondern obwohl sie nie eintrat." },
  ],

  quote: "Der Cookie-Tod war die meistzitierte Deadline der Branche. Sie kam nie. Wer trotzdem sein Fundament gegossen hat, hat gewonnen.",
  sources: [
    { label: "AdExchanger (Okt 2025)", url: "https://www.adexchanger.com/privacy/google-pulls-the-plug-on-topics-paapi-and-other-major-privacy-sandbox-apis-as-the-cma-says-cheerio/" },
    { label: "PPC Land", url: "https://ppc.land/chrome-kills-most-privacy-sandbox-technologies-after-adoption-fails/" },
    { label: "Privacy Sandbox Status", url: "https://privacysandbox.google.com/overview/status" },
  ],
  next: "journal-meta-andromeda",
  nextLabel: "Meta entscheidet, wer deine Anzeige sieht",
};
