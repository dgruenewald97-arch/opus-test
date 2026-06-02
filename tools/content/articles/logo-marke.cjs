// logo-marke.cjs — Daten-Datei für journal-logo-marke.html.
// Rückgeführt aus der hand-gebauten Seite (Backfill „generieren statt klonen").
// Diagramm: pyramid (Marken-Schichten, schmale Spitze = Logo, breites Fundament = Haltung)

const F = require("../../lib/figures.cjs");

module.exports = {
  slug: "journal-logo-marke",
  cat: "branding",
  title: "Dein Logo ist nicht deine Marke",
  desc: "Ein Logo ist die Oberfläche, nicht der Kern. Wie GRELLWERK Marken baut, die auch ohne Schriftzug erkennbar sind — mit Abdeck-Test und Marken-Schichten-Modell.",
  ogDesc: "Ein Logo macht dich erkennbar. Eine Haltung macht dich unverwechselbar.",

  h1: "Dein Logo ist nicht deine Marke",
  crumb: "Dein Logo ist nicht deine Marke",
  dek: `„Wir brauchen ein neues Logo." Fast jeder Rebrand startet mit diesem Satz — und fast jeder meint damit das Falsche. Ein Logo ist ein Erkennungszeichen, kein Versprechen. Es ist die Tür, nicht das Haus.`,
  dt: "2026-05-07",
  dateLabel: "7. Mai 2026",
  read: 4,
  author: "Jonas Reh · Kreativdirektor",

  body: [
    { p: `„Wir brauchen ein neues Logo." Fast jeder Rebrand startet mit diesem Satz — und fast jeder meint damit das Falsche. Ein Logo ist ein Erkennungszeichen, kein Versprechen. Es ist die Tür, nicht das Haus.` },
    { h: "Der Test: deck das Logo ab" },
    { p: "Nimm einen deiner Posts und entferne Logo und Markennamen. Erkennt dich noch jemand? Wenn nicht, ist deine Marke austauschbar — egal wie schick das Logo ist. Starke Marken sind an Stimme, Farbe, Haltung und Rhythmus erkennbar, lange bevor der Name fällt." },
    { h: "Das Modell: Was eine Marke trägt" },
    {
      fig: {
        svg: F.pyramid({
          label: "Marken-Schichten von der Oberfläche zum Fundament",
          layers: [
            { text: "LOGO (die Oberfläche)", fill: F.C.paper },
            { text: "Farbe, Typo, Sound", fill: F.C.paper },
            { text: "Stimme & Rhythmus", fill: F.C.acid },
            { text: "HALTUNG (das Fundament)", fill: F.C.acid },
          ],
        }),
        cap: "<b>Marken-Schichten.</b> Das Logo ist die schmale Spitze — sichtbar, aber austauschbar. Was eine Marke wirklich trägt, sitzt unten: eine Haltung, eine konsistente Stimme. Wer nur die Spitze redesignt, lässt das Fundament unberührt.",
      },
    },
    { p: "Was eine Marke wirklich trägt:" },
    {
      ul: [
        "Eine Haltung, die auch jemanden vor den Kopf stoßen darf",
        "Eine Stimme, die in jeder Mail gleich klingt wie im TikTok",
        "Konsequenz über Jahre — nicht ein perfekter Auftritt zum Launch",
      ],
    },
    {
      calc: {
        label: "Der Abdeck-Test",
        lines: [
          "Nimm 5 deiner letzten Posts. Schwärze Logo und Namen.",
          "Zeig sie jemandem, der dich kennt. Wie viele ordnet er dir zu?",
          "5/5 → starke Marke. 1/5 → du hast ein Logo, aber keine Marke.",
        ],
        result: "Wiedererkennung ohne Namen = echte Markenstärke",
      },
    },
    { h: "Was du Montag tust" },
    {
      checklist: [
        "Mach den Abdeck-Test mit 5 echten Posts — ehrlich, mit jemandem von außen.",
        "Schreib in einem Satz auf, wofür ihr laut werdet (und gegen was). Kein Satz = kein Fundament.",
        "Prüfe drei Kanäle (Mail, Social, Website): Klingt die Stimme gleich? Wenn nicht, ist das die Baustelle — nicht das Logo.",
        "Bevor du ein Redesign beauftragst: Liegt das Problem im Vektor oder in der fehlenden Haltung?",
      ],
    },
    { p: "Ein Redesign ohne diese Substanz ist Kosmetik. Es sieht für ein Quartal neu aus und fühlt sich danach genauso beliebig an wie vorher. Die Arbeit liegt nicht im Vektor — sie liegt in der Entscheidung, wofür du laut wirst." },
  ],

  quote: "Ein Logo macht dich erkennbar. Eine Haltung macht dich unverwechselbar.",
  sources: [],
  next: "journal-anecken",
  nextLabel: "Anecken als Strategie",
};
