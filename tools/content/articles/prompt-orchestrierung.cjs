// prompt-orchestrierung.cjs — Journal-Artikel: Prompt-Engineering & Orchestrierung
const F = require("../../lib/figures.cjs");

module.exports = {
  // --- Identität / SEO -----------------------------------------------------------
  slug: "journal-prompt-orchestrierung",
  cat: "meinung",
  title: "Dein KI-Output ist so gut wie dein schlechtester Prompt",
  ogTitle: "Prompt-Engineering & Orchestrierung: Was wirklich zählt",
  // KEINE geraden " in desc/ogDesc — das zerschießt das Attribut.
  desc: "Wharton-Forscher haben gemessen: CoT bringt bei modernen Reasoning-Modellen nur noch 3 % Mehrwert. Die größten Hebel stecken woanders — und fast niemand hebt sie.",
  ogDesc: "Die Prompt-Qualitätspyramide zeigt, wo die meisten Teams stecken — und was sie Montag ändern.",

  // --- Hero ----------------------------------------------------------------------
  h1: "Dein KI-Output ist so gut wie dein schlechtester Prompt",
  crumb: "Prompt & Orchestrierung",
  dek: "Wharton-Forscher haben es 2025 gemessen: Bei modernen Reasoning-Modellen bringt Chain-of-Thought-Prompting nur noch 2,9 % Genauigkeitsgewinn — bei bis zu 80 % mehr Antwortzeit. Die größten Gewinne stecken woanders. Und fast niemand hebt sie.",
  dt: "2026-06-03",
  dateLabel: "3. Jun 2026",
  read: 6,
  author: "GRELLWERK · Meinung",

  // --- Body ----------------------------------------------------------------------
  body: [
    {
      p: "Die Frage ist nicht mehr, ob KI gut genug ist. Die Frage ist, ob euer Input gut genug ist. Wer täglich mit Claude, GPT oder Gemini arbeitet und trotzdem schlechte Ergebnisse produziert, hat kein Modell-Problem. Er hat ein Prompt-Problem. Und das ist lösbar — ohne Zertifikat, ohne Kurs, ohne Budget.",
    },
    { h: "Die Prompt-Qualitätspyramide" },
    {
      p: "Fünf Ebenen trennen den Lotterie-Prompt vom reproduzierbaren Profi-Output. Die meisten Teams stecken auf Ebene 1 oder 2 — und wundern sich, warum die KI nicht liefert.",
    },
    {
      fig: {
        svg: F.pyramid({
          label: "Prompt-Qualitätspyramide: 5 Ebenen von Bare Request bis System + Memory",
          layers: [
            { text: "SYSTEM + MEMORY  →  reproduzierbar", fill: F.C.acid },
            { text: "CONSTRAINTS + FORMAT", fill: F.C.paper },
            { text: "FEW-SHOT-BEISPIELE", fill: F.C.paper },
            { text: "KONTEXT + AUFGABE", fill: F.C.paper },
            { text: "BARE REQUEST  →  Lotterie", fill: F.C.shock },
          ],
        }),
        cap: "<b>Prompt-Qualitätspyramide.</b> Unten (breit): der nackte Auftrag — hier stecken die meisten. Oben (schmal): System-Prompt mit persistentem Kontext — reproduzierbar, kontrollierbar, skalierbar.",
      },
    },
    {
      p: "Ebene 1: »Schreib mir einen Text über X.« Funktioniert. Liefert Mittelmaß. Ebene 2 fügt Kontext hinzu — wer ist die Zielgruppe, was ist das Ziel? Ebene 3 ersetzt abstrakte Beschreibungen durch Beispiele: zwei konkrete Input-Output-Paare sagen mehr als drei Sätze Tonalitätserklärung. Ebene 4 definiert das Format explizit — JSON, Bullets, Wortlimit. Ebene 5 setzt einen System-Prompt mit Rollendefinition, persistentem Markenwissen und Tool-Anbindung. Ab Ebene 4 wird Output reproduzierbar. Unter Ebene 3 ist es Glückssache.",
    },
    { h: "Was die Zahlen wirklich sagen" },
    {
      p: "Hier trennt sich Mythos von Mechanik. Chain-of-Thought-Prompting — das explizite »Denke Schritt für Schritt« — verbesserte GPT-3 dramatisch. Bei heutigen Reasoning-Modellen wie o3 oder Claude 3.7 Sonnet bringt es laut Wharton GAIL 2025 gerade noch 2,9 bis 3,1 % Genauigkeitsgewinn — bei 20 bis 80 % mehr Antwortzeit. Der Hebel hat sich verlagert: weg vom Trick, hin zur Struktur. Few-Shot-Beispiele schlagen bei aktuellen Modellen oft nicht mehr die Reasoning-Fähigkeit — sie dienen zur Format-Ausrichtung. Role-Prompting (»Du bist ein erfahrener Anwalt«) verbessert laut einer EMNLP-2024-Studie über 2.410 Faktenfragen die Faktentreue im Schnitt nicht — manchmal verschlechtert es sie. Die Wirkung liegt in Tonalität und Stil, nicht in Faktengenauigkeit.",
    },
    {
      calc: {
        label: "Rechenbeispiel: Was ein Standard-Prompt-Template wert ist (illustrativ)",
        lines: [
          "5-köpfiges Content-Team, 20 Social-Texte täglich, je 3 Iterationen à 3 min = 9 min/Text.",
          "Standard-Template mit Kontext-Block + Format-Vorgabe + 2 Beispielen → 1,2 Iterationen.",
          "Neue Zeit: 3,5 min/Text — Ersparnis: 110 min täglich, rund 550 min pro Woche.",
        ],
        result: "ca. 25.000 € Jahreswert bei 60 €/h — für 4–8 Stunden einmalige Template-Arbeit",
      },
    },
    { h: "Wann ein Agent besser ist als ein Prompt" },
    {
      p: "Anthropics eigenes Multi-Agent-Research-System übertraf einen einzelnen Claude-Agenten auf internen Benchmarks um 90,2 %. Klingt nach dem Killer-Argument für Orchestrierung — bis man die Fußnote liest: Das System verbraucht 15-mal mehr Tokens als ein normaler Chat. McKinsey berichtet aus Pilotprojekten, dass Agentic-AI-Workflows Kampagnenprozesse um den Faktor 10 bis 15 beschleunigen können. Aber auch hier gilt: nur bei eng definierten, wiederholbaren Prozessen mit echter Parallelisierbarkeit.",
    },
    {
      p: "Multi-Agent-Orchestrierung lohnt sich, wenn drei Bedingungen gleichzeitig erfüllt sind: Die Aufgabe ist breiter als ein Kontextfenster. Teilaufgaben sind echt parallel ausführbar ohne geteilten Zustand. Und der Fehler eines Subagenten darf die Gesamtkette nicht unkontrolliert implodieren lassen. Wer ein Netz aus Agenten baut, bevor er diese drei Fragen beantwortet hat, zahlt für Komplexität — nicht für Ergebnis.",
    },
    { h: "Was du Montag tust" },
    {
      checklist: [
        "Prompt-Audit: Den meistgenutzten Team-Prompt herausnehmen. Enthält er Kontext (Wer? Wofür?) und ein Format-Constraint? Falls nicht — jetzt ergänzen, Ergebnis vergleichen.",
        "Zwei Beispiele statt Beschreibung: Für jeden Kernprozess je ein gutes und ein schlechtes Output-Beispiel anlegen. 20 Minuten Arbeit — Wochen gespart.",
        "CoT-Check: Nutzt ihr ein Reasoning-Modell (o3, o4-mini, Claude 3.7+)? Dann explizites »Denke Schritt für Schritt« weglassen. Es kostet Zeit ohne Mehrwert.",
        "Sycophantie-Bremse einbauen: An komplexe Prompts anhängen: »Falls meine Frage falsche Annahmen enthält, weise zuerst darauf hin.« Verhindert, dass das Modell höflich lügt.",
        "Prompt-Bibliothek anlegen: Funktionierende Prompts versioniert speichern — Notion, Git, egal. Wer sie nicht dokumentiert, optimiert dieselben Sachen viermal im Jahr neu.",
      ],
    },
    { h: "Wann das alles nicht gilt" },
    {
      p: "Prompt-Engineering hat zwei harte Grenzen. Nach oben: Wer mit o3 oder GPT-4o einfache Klassifikationsaufgaben löst, bekommt bei Zero-Shot dasselbe Ergebnis wie bei ausgefeilt konstruierten Prompts. Wharton belegt es. Nach unten: Kein Prompt rettet ein Modell, das eine Aufgabe strukturell nicht beherrscht. Prompt-Engineering ersetzt kein Fine-Tuning, kein RAG, kein besseres Modell. Der Hebel liegt im Mittelfeld — komplexe Aufgaben, aktuelle Standardmodelle, wiederholende Prozesse. Wer dieses Mittelfeld kennt, investiert richtig. Alle anderen optimieren an der falschen Stelle.",
    },
  ],

  // --- Abschluss -----------------------------------------------------------------
  quote: "Multi-Agent ist kein Upgrade — es ist eine Architekturentscheidung. Wer sie trifft, ohne vorher die Grenze des einzelnen Agenten nachgewiesen zu haben, kauft Komplexität auf Kredit.",
  sources: [
    {
      label: "Wei et al.: Chain-of-Thought Prompting Elicits Reasoning (NeurIPS 2022)",
      url: "https://arxiv.org/abs/2201.11903",
    },
    {
      label: "Wharton GAIL: The Decreasing Value of Chain of Thought in Prompting (2025)",
      url: "https://gail.wharton.upenn.edu/research-and-insights/tech-report-chain-of-thought/",
    },
    {
      label: "Zheng et al.: When Personas Are Not Helpful — EMNLP Findings 2024",
      url: "https://aclanthology.org/2024.findings-emnlp.888/",
    },
    {
      label: "Anthropic Engineering: How we built our multi-agent research system (2025)",
      url: "https://www.anthropic.com/engineering/multi-agent-research-system",
    },
    {
      label: "McKinsey: Reinventing marketing workflows with agentic AI (2025)",
      url: "https://www.mckinsey.com/capabilities/growth-marketing-and-sales/our-insights/reinventing-marketing-workflows-with-agentic-ai",
    },
    {
      label: "Caylent: Prompt Engineering vs. Orchestration ROI (2025)",
      url: "https://caylent.com/blog/agentic-ai-why-prompt-engineering-delivers-better-roi-than-orchestration",
    },
  ],
  next: "journal-hook",
  nextLabel: "Der Hook in 3 Sekunden",
};
