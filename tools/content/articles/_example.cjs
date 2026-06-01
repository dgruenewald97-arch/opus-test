// _example.cjs — kommentierte VORLAGE für einen Journal-Artikel.
// Dateien mit führendem _ ignoriert der Generator. Zum Anlegen eines echten Artikels:
//   1. Diese Datei nach tools/content/articles/<thema>.cjs kopieren (ohne führendes _).
//   2. Felder füllen (siehe Kommentare). Diagramm aus tools/lib/figures.cjs wählen.
//   3. node tools/generate.cjs   → erzeugt journal-<slug>.html
//   4. Karte ins journal.html-Grid + sitemap.xml + ggf. Filter-Chip ergänzen.
//   5. node tools/verify.cjs     → muss grün sein, bevor committet/gepusht wird.
//
// Mehrwert-Anatomie (siehe docs/AI-WORKFLOW.md): Hook → Framework-Diagramm →
// Rechenbeispiel → Checkliste → Gegen-These → Quellen. Genau diese Bausteine unten.

const F = require("../../lib/figures.cjs");

module.exports = {
  // --- Identität / SEO ---------------------------------------------------------
  slug: "journal-beispiel",                 // Dateiname-Stamm → journal-beispiel.html
  cat: "performance",                        // performance|branding|social|daten|web|meinung
  title: "Beispiel-Titel für den Browser-Tab", // <title> + og:title (Tab/Teilen)
  ogTitle: "Beispiel-Titel",                 // optional; default = title
  // KEINE geraden " in desc/ogDesc verwenden — das zerschießt das Attribut (verify fängt es).
  desc: "Eine Meta-Description in einem Satz: konkret, mit Zahl, neugierig machend.",
  ogDesc: "Eine knackige Zeile fürs Teilen — die These des Artikels.",

  // --- Hero --------------------------------------------------------------------
  h1: "Die steile These als Überschrift",
  crumb: "Die steile These",                 // Brotkrumen-Label (kurz)
  dek: "Der Aufhänger: eine Zahl oder Beobachtung, die sofort Spannung erzeugt — und das Versprechen, was der Leser gleich mitnimmt.",
  dt: "2026-06-01",                          // datetime-Attribut (ISO)
  dateLabel: "1. Jun 2026",                  // sichtbares Datum
  read: 4,                                    // Lesezeit in Minuten
  author: "Vorname Nachname · Rolle",

  // --- Body: Array aus Blöcken (Reihenfolge = Seite) ---------------------------
  // Block-Typen: {h:"Zwischentitel"} {p:"Absatz"} {ul:[...]} {fig:{svg,cap}}
  //              {calc:{label,lines:[],result}} {checklist:[...]}
  body: [
    { p: "Einstiegsabsatz, der den Hook aus dem dek aufgreift und konkretisiert." },
    { h: "Das Modell" },
    { p: "Hinführung zum Framework — warum dieses Bild das Problem ordnet." },
    {
      fig: {
        svg: F.matrix({
          label: "Beispiel-Matrix: Achse X gegen Achse Y",
          xAxis: "AUFWAND  niedrig → hoch",
          yAxis: "WIRKUNG  klein → groß",
          cells: {
            tl: { fill: F.C.acid, emphasis: true, lines: ["GEWINN", "wenig Aufwand, große Wirkung"] },
            tr: { lines: ["LOHNT", "teuer, aber wirksam"] },
            bl: { fill: F.C.shock, emphasis: true, lines: ["SPARE DIR", "viel Mühe, kaum Wirkung"] },
            br: { fill: F.C.warn, lines: ["EGAL"] },
          },
        }),
        cap: "<b>Worauf es ankommt.</b> Oben links zuerst angehen: maximale Wirkung bei minimalem Aufwand.",
      },
    },
    { h: "Drei Muster, die funktionieren" },
    { p: "Übergang zur Liste." },
    { ul: ["Erstes Muster mit konkretem Beispiel", "Zweites Muster", "Drittes Muster"] },
    {
      calc: {
        label: "Rechenbeispiel (illustrativ)",
        lines: [
          "Ausgangslage: 10.000 Besucher, 2 % Conversion = 200 Abschlüsse.",
          "Hebel X verbessert die Rate um die Hälfte → 3 %.",
          "Gleicher Traffic, 300 Abschlüsse — 50 % mehr, ohne einen Euro Mehrbudget.",
        ],
        result: "+100 Abschlüsse aus derselben Reichweite",
      },
    },
    { h: "Was du Montag tust" },
    {
      checklist: [
        "Erster konkreter Schritt, heute umsetzbar.",
        "Zweiter Schritt mit messbarem Ergebnis.",
        "Dritter Schritt, der den Hebel verankert.",
      ],
    },
    { p: "Gegen-These / Einordnung: wann das Modell NICHT greift — Ehrlichkeit schafft Vertrauen." },
  ],

  // --- Abschluss ---------------------------------------------------------------
  quote: "Ein zugespitzter Merksatz, der die These auf den Punkt bringt.",
  sources: [
    { label: "Quelle 1 (Herausgeber, Jahr)", url: "https://example.com/quelle-1" },
    { label: "Quelle 2", url: "https://example.com/quelle-2" },
  ],
  next: "journal-hook",                       // Slug des Weiterlesen-Links (existierende Seite!)
  nextLabel: "Der Hook in 3 Sekunden",
};
