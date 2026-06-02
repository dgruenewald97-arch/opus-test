// made-by-humans.cjs — Daten-Datei für journal-made-by-humans.html.
// Rückgeführt aus der hand-gebauten Seite (Backfill „generieren statt klonen").
// Diagramm-Typ: matrix (AI-Transparenz-Matrix)

const F = require("../../lib/figures.cjs");

module.exports = {
  slug: "journal-made-by-humans",
  cat: "meinung",
  title: "Made by Humans: Wenn Anti-KI zum Klischee wird",
  desc: `Anti-KI-Backlash 2026: McDonald's, Aerie, Equinox. Wann „Made by Humans“ Haltung ist und wann Pose — mit AI-Transparenz-Matrix und Slop-EV-Rechnung.`,
  ogDesc: `Made by Humans ist weniger Ethik als Positionierungs-Arbitrage: Wer menschengemacht besitzt, besitzt das knappe Gut.`,

  h1: "Made by Humans",
  crumb: "Made by Humans",
  dek: `McDonald's zog einen KI-Spot nach 3 Tagen zurück. 50 % der Konsumenten bevorzugen Marken ohne GenAI. „Von Menschen gemacht" ist plötzlich premiumfähig — aber es geht nicht um Ethik, sondern darum, wer die Knappheit besitzt.`,
  dt: "2026-05-24",
  dateLabel: "24. Mai 2026",
  read: 6,
  author: "Mara Vogt · Chief Chaos Officer",

  body: [
    { p: `McDonald's Niederlande veröffentlichte am 6. Dezember 2025 einen KI-generierten Weihnachtsspot — und nahm ihn nach „AI slop"-Spott am 9. Dezember wieder offline. Drei Tage. Kein Einzelfall, sondern ein Kipppunkt: Aerie, Equinox und iHeartMedia positionieren sich jetzt aktiv gegen KI-Content.` },
    { p: `Die Daten dahinter sind unbequem für jeden mit Vollautomatik-Pipeline: Laut Gartner (Okt 2025, n=1.539) bevorzugen <strong>50 % der Konsumenten Marken, die KEIN GenAI</strong> in kundenseitigen Inhalten nutzen, und 68 % fragen sich oft, ob Inhalte echt sind. Bei der Gen Z fiel „KI macht mich excited" laut Gallup von 36 % (2025) auf 22 % (2026).` },
    { h: "Die unbequeme These: Es geht nicht um Ethik" },
    { p: `„Made by Humans" ist weniger Moral als Positionierungs-Arbitrage. Solange KI-Content billig und allgegenwärtig wird, ist menschengemacht automatisch das knappe, premiumfähige Gut. Aerie und iHeart verkaufen keine Tugend, sondern Distinktion in einem Markt voller Slop. Der Beweis: Equinox erreicht denselben „Wir sind echt"-Effekt, indem es KI-Bilder <em>neben</em> echte Fotos stellt — KI zeigt statt verleugnet.` },
    { h: "Das Modell: AI-Transparenz-Matrix" },
    {
      fig: {
        svg: F.matrix({
          label: "AI-Transparenz-Matrix: KI-Einsatz gegen Offenlegung",
          xAxis: "KI-EINSATZ  kein → viel",
          yAxis: "OFFENLEGUNG  versteckt → offen",
          cells: {
            tl: { fill: F.C.acid, emphasis: true, lines: ["GUARANTEED", "HUMAN — Aerie"] },
            tr: { lines: ["HONEST HYBRID", "Equinox"] },
            bl: { lines: ["STILLER", "HANDWERKER"] },
            br: { fill: F.C.shock, emphasis: true, lines: ["SLOP-RISIKO", `McDonald's NL`] },
          },
        }),
        cap: "<b>AI-Transparenz-Matrix.</b> Der Schaden entsteht nur in einem Quadranten: viel KI + Verschleierung (unten rechts). Die anderen drei sind alle verteidigbar — auch offen gezeigte KI. Die Todsünde ist nicht KI, sondern Versteck.",
      },
    },
    {
      calc: {
        label: "Slop-EV-Faustregel",
        lines: [
          `McDonald's spart durch KI-Produktion grob 50–80% der Spotkosten — sagen wir 200.000€.`,
          "Dagegen: 3 Tage globaler Spott, Marken-Rückzug, Nachrichtenzyklus.",
          "Regel: Ist die Ersparnis < dem erwarteten PR-Schaden bei Entdeckung, ist die KI-Abkürzung negativ-EV.",
        ],
        result: "Gegenprobe: Aeries No-AI-Pledge fiel mit +23% Comps zusammen",
      },
    },
    { p: "Vorsicht bei der Kausalität: Aeries +23 % im Q4 fielen mit dem No-AI-Pledge <em>zusammen</em> — bewiesen ist der Zusammenhang nicht. Aber die Richtung ist klar genug, um die Produktionsersparnis lächerlich aussehen zu lassen." },
    { h: "Was du Montag tust" },
    {
      checklist: [
        "Slop-Test vor Launch: Wäre dieser Spot bei offengelegter KI-Herkunft peinlich? Wenn ja → nicht launchen.",
        `Position wählen UND benennen: „Guaranteed Human", „Honest Hybrid" oder bewusst neutral — nie in der versteckten Mitte landen.`,
        `Knappheit besitzen: Wo ist „menschengemacht" bei euch ein echtes Differenzierungsmerkmal (Stimme, Models, Texte)? Dort pledgen, nicht überall.`,
        "KI für Backstage, Mensch fürs Schaufenster — die Trennlinie schriftlich fixieren.",
      ],
    },
  ],

  quote: `Es geht nicht um Anti-KI. Es geht darum, wer die Knappheit besitzt. „Von Menschen gemacht" ist nur dann ein Statement, wenn es eine Entscheidung ist — kein Aufkleber.`,
  sources: [
    { label: "Gartner (Okt 2025)", url: "https://www.gartner.com/en/newsroom/press-releases/2026-03-16-gartner-marketing-survey-finds-50-percent-of-consumers-prefer-brands-that-avoid-using-genai-in-consumer-facing-content0" },
    { label: "NBC News (McDonald's)", url: "https://www.nbcnews.com/world/europe/mcdonalds-ai-generated-christmas-advert-social-media-backlash-rcna248590" },
    { label: "Gallup (Gen Z)", url: "https://news.gallup.com/poll/708224/gen-adoption-steady-skepticism-climbs.aspx" },
  ],
  next: "journal-tiktok-us",
  nextLabel: "TikTok hat jetzt einen US-Pass",
};
