// agentic-commerce.cjs — Agentic Commerce: Wenn die KI einkauft, für wen baust du dann?
// Mehrwert-Anatomie: Hook → Framework-Diagramm → Rechenbeispiel → Checkliste →
// Gegen-These → Schluss-Zitat + Quellen.

const F = require("../../lib/figures.cjs");

module.exports = {
  // --- Identität / SEO ---------------------------------------------------------
  slug: "journal-agentic-commerce",
  cat: "performance",
  title: "Agentic Commerce: Wenn die KI einkauft, für wen baust du dann?",
  ogTitle: "Agentic Commerce: Wenn die KI einkauft, für wen baust du dann?",
  // KEINE geraden " in desc/ogDesc
  desc: "Salesforce misst 67 Mrd. US-Dollar KI-Agenten-Einfluss in der Cyber Week 2025 — Adobe zählt plus 4.700 % AI-Traffic zu US-Retailseiten. Wie Shops jetzt Maschinenlesbarkeit aufbauen.",
  ogDesc: "Der erste Käufer im Funnel ist zunehmend eine Maschine — was das für Produktdaten, Tracking und Differenzierung bedeutet.",

  // --- Hero --------------------------------------------------------------------
  h1: "Agentic Commerce: Wenn die KI einkauft, für wen baust du dann?",
  crumb: "Agentic Commerce",
  dek: "Cyber Week 2025: KI-Agenten beeinflussten laut Salesforce 67 Mrd. US-Dollar und 20 % aller Orders. Adobe misst beim AI-Traffic zu US-Retailseiten plus 4.700 % gegenüber dem Vorjahr. Der erste Käufer im Funnel ist zunehmend eine Maschine.",
  dt: "2026-06-02",
  dateLabel: "2. Juni 2026",
  read: 6,
  author: "Selin Akar · Head of Performance",

  // --- Body: Array aus Blöcken -------------------------------------------------
  body: [
    {
      p: "Stell dir vor, deine Produktseite wird nie von einem Menschen aufgerufen — und trotzdem landet sie im Warenkorb. Kein Scroll, kein Vergleich, kein Banner-Klick. Cyber Week 2025 hat dieses Szenario zur messbaren Realität gemacht: Salesforce beziffert den Umsatz, den KI-Agenten direkt beeinflusst oder ausgelöst haben, auf 67 Milliarden US-Dollar — rund 20 % aller Orders liefen über einen Agenten-Touchpoint. Adobe zählt beim KI-referenzierten Traffic zu US-Retailseiten ein Plus von 4.700 % gegenüber dem Vorjahreszeitraum. Das ist kein Trend mehr. Das ist Infrastruktur.",
    },
    { h: "Agenten lesen Feeds, keine Produktfotos" },
    {
      p: "ChatGPT Instant Checkout und Microsoft Copilot Checkout (Januar 2026) zeigen, wohin die Reise geht: Ein Agent empfängt eine Absicht — „bestell mir das günstigste verfügbare Rennrad unter 800 Euro mit 30 Tagen Rückgaberecht“ — und führt die Transaktion eigenständig durch. Der Klickpfad durch den Shop entfällt. Was zählt, ist, ob der Produktdatensatz vollständig, korrekt und maschinenlesbar ist. Agenten parsen strukturiertes Markup und Product Feeds, keine Lifestyle-Fotos. Sie zitieren Marken, die mit GTIN, availability und policy-Attributen ausgezeichnet sind — und übersehen Shops, die nur für das menschliche Auge gestaltet wurden.",
    },
    { h: "Die Agentic Readiness Matrix" },
    {
      p: "Zwei Dimensionen entscheiden, ob ein Shop von Agenten gefunden, zitiert und beauftragt wird: die Maschinenlesbarkeit der Produktdaten und der inhaltliche Differenzierungswert. Die Kombination ergibt vier Positionen — mit drastisch unterschiedlichen Konsequenzen.",
    },
    {
      fig: {
        svg: F.matrix({
          label: "Agentic Readiness Matrix: Maschinenlesbarkeit vs. Differenzierungswert",
          xAxis: "MASCHINENLESBARKEIT  niedrig → hoch",
          yAxis: "↑ DIFFERENZIERUNGSWERT  niedrig → hoch",
          cells: {
            tl: {
              fill: F.C.warn,
              lines: ["INVISIBLE", "CHAMPION", "gut, aber unauffindbar"],
            },
            tr: {
              fill: F.C.acid,
              emphasis: true,
              lines: ["AGENTIC", "WINNER", "Ziel: zitiert + bevorzugt"],
            },
            bl: {
              fill: F.C.shock,
              emphasis: true,
              lines: ["COMMODITY", "DRIFTER", "weder sichtbar noch besonders"],
            },
            br: {
              fill: F.C.paper,
              lines: ["PRICE", "FIGHTER", "nur über Preis im Rennen"],
            },
          },
        }),
        cap: "<b>Agentic Readiness Matrix.</b> Oben rechts ist das Ziel: hohe Maschinenlesbarkeit (vollständige Feeds, Schema, GTINs) kombiniert mit echtem Differenzierungswert. Unten links verlieren Shops unsichtbar.",
      },
    },
    { h: "Was im Tracking unsichtbar bleibt" },
    {
      p: "KI-Agenten senden keine UTM-Parameter. Sie öffnen keine Landing Pages. Das Measurement-Problem ist akut: Laut Drittforschung werden rund 70 % des AI-referierten Traffics in GA4 als „Direct“ fehlklassifiziert — weil kein Referrer-Header übertragen wird. Das folgende Beispiel ist bewusst illustrativ und fiktiv, zeigt aber die Größenordnung des blinden Flecks.",
    },
    {
      calc: {
        label: "Rechenbeispiel (illustrativ, fiktive Zahlen)",
        lines: [
          "Shop mit 500.000 Euro Monatsumsatz, ca. 120 Orders/Monat in GA4 als „Direct“ ausgewiesen.",
          "70 % davon vermutlich AI-referred → ca. 84 Orders/Monat werden nicht als KI-Agenten-Traffic erkannt.",
          "AOV 85 Euro × 84 Orders = ca. 7.140 Euro/Monat unsichtbarer Umsatz — nicht budgetiert, nicht optimiert.",
          "Hebel: Server-Side-Tracking (Shopify-Webhook → GA4 Measurement Protocol) + vollständiges Schema/GTIN.",
          "Laut Drittforschung steigt die Zitierhäufigkeit in KI-Ergebnissen mit vollständigen Produktdaten um rund +73 %.",
        ],
        result: "ca. 7.140 Euro/Monat „dunkler“ Umsatz — sichtbar durch Server-Side-Tracking und vollständige Feeds",
      },
    },
    { h: "Fünf Schritte für diese Woche" },
    {
      checklist: [
        "AI-Traffic-Audit: GA4-Segment „Direct“ der letzten 90 Tage mit Shopify-Referrer-Daten abgleichen — Diskrepanz quantifizieren.",
        "Feed-Vollständigkeit Top-50 prüfen: GTIN, availability und Rückgabe-Policy müssen in jedem Datensatz vollständig sein; Schema-Markup mit dem Rich Results Test validieren.",
        "KI-Crawler nicht blocken: OAI-SearchBot, PerplexityBot und Google-Extended dürfen nicht in der robots.txt gesperrt sein — Crawl-Zugang ist Voraussetzung für Zitierung.",
        "Server-Side-Tracking für AI-Orders aufsetzen: Shopify-Webhook → GA4 Measurement Protocol überträgt Order-Events mit korrektem Kanal, unabhängig vom Browser.",
        "Differenzierungs-USPs maschinenlesbar auszeichnen: Garantie, Herkunft, Zertifikate als strukturierte Attribute im Feed und als Schema-Properties — nicht nur als Fließtext auf der Produktseite.",
      ],
    },
    { h: "Die eigentliche Gefahr ist nicht Unsichtbarkeit" },
    {
      p: "Wer seine Feeds pflegt und KI-Crawlern Zugang gewährt, wird gefunden. Die tiefere Frage ist Commoditisierung: Agenten bevorzugen Marken mit hoher Trainingsdaten-Präsenz, vollständigen API-Integrationen und Preistransparenz — das begünstigt Plattformen und Platzhirsche. Emotional aufgeladene und sensorische Kategorien wie Mode oder Parfum werden 2026 noch überwiegend menschlich gekauft; die Überzeugung passiert im Körper, nicht im Daten-Feed. Agentic Commerce greift 2026 vor allem dort, wo Kaufentscheidungen spezifikationsgetrieben und wiederholbar sind: Elektronik, Haushalt, Replenishment. Wer ausschließlich dort spielt und keinen Differenzierungswert jenseits des Preises aufgebaut hat, wird zum austauschbaren Zeileneintrag in einem Agenten-Vergleich.",
    },
  ],

  // --- Abschluss ---------------------------------------------------------------
  quote: "Wer seine Produktseite für Menschen baut, verliert — der erste Käufer im Funnel ist bereits eine Maschine.",
  sources: [
    {
      label: "McKinsey, The agentic commerce opportunity (2025)",
      url: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-agentic-commerce-opportunity-how-ai-agents-are-ushering-in-a-new-era-for-consumers-and-merchants",
    },
    {
      label: "Salesforce, Cyber Week AI Agents (Dez 2025)",
      url: "https://www.salesforce.com/news/press-releases/2025/12/05/cyber-week-ai-agents-sales/",
    },
    {
      label: "Adobe, Generative AI Shopping Traffic (Aug 2025)",
      url: "https://business.adobe.com/blog/generative-ai-powered-shopping-rises-with-traffic-to-retail-sites",
    },
    {
      label: "Search Engine Land, ChatGPT vs. Non-Branded Organic (2025)",
      url: "https://searchengineland.com/chatgpt-vs-non-branded-organic-search-conversions-470321",
    },
    {
      label: "Microsoft Advertising, Copilot Checkout (Jan 2026)",
      url: "https://about.ads.microsoft.com/en/blog/post/january-2026/conversations-that-convert-copilot-checkout-and-brand-agents",
    },
  ],
  next: "journal-incrementality",
  nextLabel: "Incrementality vs. Attribution",
};
