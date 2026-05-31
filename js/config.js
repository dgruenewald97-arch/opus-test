// GRELLWERK — central config (copy + guide steps). Edit text here, not logic.

export const FLAGS = {
  gsap: false,
  lenis: false,
};

// BRUMMER guide steps. `selector` is scrolled into view + highlighted.
// Page-aware: guide.js keeps only steps whose selector exists on the current
// page, in array order. So group sub-page steps contiguously + in visual order.
export const GUIDE_STEPS = [
  // ===== Startseite (index.html) =====
  {
    selector: "#hero",
    text: "Servus! Ich bin Brummer. Ich zeig dir kurz den Laden — oder du klickst dich selbst durch.",
  },
  {
    selector: "#hero",
    text: "Das hier ist unser Versprechen: Lärm, der verkauft. Kein Blabla, nur Wirkung.",
  },
  {
    selector: "#zahlen",
    text: "Erstmal Fakten: 8 Jahre, 240+ Kampagnen, 17 Awards. Wir reden nicht — wir liefern.",
  },
  {
    selector: "#leistungen",
    text: "Das können wir. Fahr mit der Maus über die Zeilen — keine Angst, sie beißen nicht.",
  },
  {
    selector: "#arbeiten",
    text: "Zahlen lügen nicht. Klick einen Case an — jeder hat seine eigene Lärm-Geschichte.",
  },
  {
    selector: "#manifest",
    text: "Unser Manifest. Lies es — es meint genau dich.",
  },
  {
    selector: "#prozess",
    text: "In vier Schritten von der Idee zum Knall. So einfach, so laut.",
  },
  {
    selector: "#pakete",
    text: "Drei Pakete, ein Ziel: Krach. Vom ersten Knall bis Vollgas auf allen Kanälen.",
  },
  {
    selector: "#konfigurator",
    text: "Keine Lust zu rätseln? Klick dich durch — ich bau dir das passende Paket zusammen.",
  },
  {
    selector: "#slogan-lab",
    text: "Spielzeug gefällig? Tipp deine Marke ein — meine KI macht dir live Slogans draus.",
  },
  {
    selector: "#crew",
    text: "Die Verrückten, die das alles bauen. Mehr über uns gibt's auf der Über-uns-Seite.",
  },
  {
    selector: "#journal",
    text: "Frischer Lärm aus der Werkstatt: wie wir denken, testen und skalieren.",
  },
  {
    selector: "#faq",
    text: "Noch Fragen? Hier die Antworten — bevor du überhaupt fragen musst.",
  },
  {
    selector: "#kontakt",
    text: "Genug geschaut. Schreib uns — wir beißen nur Wettbewerber. Klick mich an, wenn du mich nochmal brauchst!",
  },

  // ===== Cases-Übersicht (arbeiten.html) =====
  {
    selector: "#arbeiten-all",
    text: "Alle Cases an einem Ort. Klick dich rein — jeder Case erzählt, wie wir Krach gemacht haben.",
  },
  {
    selector: "#kunden",
    text: "Acht Marken, die uns vertrauen — und ein paar Awards im Regal. Kein Zufall.",
  },

  // ===== Case-Detail (case-*.html teilen diese Selektoren) =====
  {
    selector: "#case-hero",
    text: "Ein Case zum Anfassen: Ausgangslage, Idee, Krach — und was am Ende rauskam.",
  },
  {
    selector: "#case-krach",
    text: "Hier wird's laut: so haben wir den Krach tatsächlich gebaut.",
  },
  {
    selector: "#case-ergebnis",
    text: "Und das kam dabei raus. Zahlen, keine Versprechen.",
  },

  // ===== Leistungen-Übersicht (leistungen.html) =====
  {
    selector: "#leistungen-all",
    text: "Sechs Disziplinen, ein Ziel: Krach. Klick eine an — jede hat ihre eigene Lärm-Maschine.",
  },

  // ===== Leistung-Detail (leistung-*.html teilen diese Selektoren) =====
  {
    selector: "#leistung-hero",
    text: "Eine Disziplin im Detail: das Problem, unsere Haltung, der Prozess — und was rauskommt.",
  },
  {
    selector: "#leistung-prozess",
    text: "So gehen wir vor: vier Schritte vom Brief zum Knall.",
  },
  {
    selector: "#leistung-ergebnis",
    text: "Und das springt dabei raus. Zahlen, keine Versprechen.",
  },

  // ===== Über uns (ueber-uns.html) =====
  {
    selector: "#ueber",
    text: "Wer wir sind und warum wir lieber anecken als einschläfern.",
  },
  {
    selector: "#ueber-crew",
    text: "Die ganze Crew. Sieht harmlos aus — ist es nicht.",
  },
  {
    selector: "#ueber-stimmen",
    text: "Glaub nicht uns — glaub denen, mit denen wir schon Krach gemacht haben.",
  },

  // ===== Lärm-Journal (journal.html) =====
  {
    selector: "#journal-list",
    text: "Frischer Lärm zum Nachlesen — such dir einen Artikel aus.",
  },

  // ===== Artikel (journal-*.html) =====
  {
    selector: "#article",
    text: "Viel Spaß beim Lesen. Wenn's brummt, weißt du ja, wo du uns findest.",
  },
];

// Passive quips shown when a section scrolls into view (guide inactive).
// Werte dürfen String ODER Array sein — guide.js pickt bei Arrays zufällig,
// damit Wiederbesuche frischer wirken. Neue Sektion → hier ergänzen.
export const QUIPS = {
  zahlen: ["Zahlen statt Buzzwords.", "Rechne nach. Wir warten.", "Keine geschönten Slides."],
  leistungen: ["Sechs Disziplinen, ein Ziel: Krach.", "Such dir aus, wo's wehtun soll."],
  kunden: "Die vertrauen uns. Du auch?",
  manifest: ["Fünf Sätze. Kein Bullshit.", "Lies es laut. Es meint dich."],
  faq: "Antworten ohne Drumherum.",
  arbeiten: ["Echte Zahlen, keine Fake-Mockups.", "Jeder Case ein Tatort."],
  prozess: "Vier Schritte. Null Bullshit.",
  pakete: ["Drei Stufen Lärm. Such dir was aus.", "Vom Knall bis Vollgas."],
  konfigurator: "Zwei Klicks zur Empfehlung.",
  slogan: ["Tipp deine Marke ein. Ich mach Krach draus.", "Gratis-Slogans, frisch aus der Maschine."],
  crew: ["Sieht harmlos aus. Ist es nicht.", "Sieben Köpfe, ein Krawall."],
  stimmen: "Hör auf die, nicht auf uns.",
  journal: "Frischer Lärm zum Nachlesen.",
  kontakt: ["Na los, trau dich.", "Der Knopf beißt nicht. Wir schon."],
  // Sub-pages
  case: "Ein Case zum Anfassen — von Brief bis Knall.",
  "leistungen-all": "Sechs Maschinen. Such dir Lärm aus.",
  leistung: "Eine Disziplin, voll aufgedreht.",
  "leistung-prozess": "Vier Schritte. Null Bullshit.",
  "leistung-ergebnis": "Zahlen, keine Versprechen.",
  ueber: "Anti-Agentur seit 2018.",
  article: "Frischer Lärm, ausführlich.",
};

// BRUMMER „Frag-Modus" + Verhalten. Fake-KI: Keyword-Matching auf feste
// Antworten, kein Netz. `qa[].keys` = Schlüsselwörter für freie Eingabe,
// `qa[].go` = Selektor auf DIESER Seite (existiert er, scrollt Brummer hin).
// `match()` wählt die beste Antwort, sonst ein Fallback. Texte hier pflegen.
export const BRUMMER = {
  greet: "Frag mich was — tipp's ein oder klick einen Vorschlag.",
  tourLabel: "Zeig mir den Laden ↻",
  inputPlaceholder: "Frag Brummer …",
  thinking: ["brummt kurz nach …", "sortiert die Flügel …", "lädt Krach …", "rechnet im Schwarm …"],
  idle: [
    "Eingeschlafen? Ich nicht.",
    "Psst. Der Kontakt-Knopf wartet.",
    "Noch da? Frag mich was.",
    "Stille verkauft nichts. Klick mich.",
  ],
  fallback: [
    "Versteh nur Lärm. Probier: Preis, Tempo, Zahlen — oder buchen.",
    "Gute Frage, schlechte Keywords. Frag konkreter, dann knallt's.",
    "Da passe ich — aber meine Menschen nicht. Schreib uns einfach.",
  ],
  qa: [
    { q: "Was kostet das?", a: "Kommt drauf an, wie laut. Drei Pakete — vom ersten Knall bis Vollgas. Schau selbst.", go: "#pakete", keys: ["kost", "preis", "teuer", "geld", "budget", "euro", "€", "zahl ich", "günstig", "guenstig", "tarif"] },
    { q: "Wie schnell knallt's?", a: "Vier Schritte von der Idee zum Lärm. Kein Quartals-Geschwafel.", go: "#prozess", keys: ["schnell", "dauer", "wie lang", "wann", "tempo", "zeit", "deadline", "ablauf", "prozess"] },
    { q: "Echte Zahlen?", a: "Jeder Case mit echten Werten. Keine hübschen Mockup-Lügen.", go: "#arbeiten", keys: ["zahl", "beweis", "case", "referenz", "ergebnis", "roi", "roas", "erfolg", "beispiel", "projekt"] },
    { q: "Welches Paket für mich?", a: "Zwei Klicks und ich bau dir die Empfehlung. Probier den Konfigurator.", go: "#konfigurator", keys: ["paket", "empfehl", "passend", "welches", "konfigurat", "für mich", "fuer mich", "richtig"] },
    { q: "Wer seid ihr?", a: "Sieben Köpfe, eine Mission: Lärm, der verkauft. Anti-Agentur seit 2018.", go: "#crew", keys: ["wer", "team", "crew", "ihr", "agentur", "über euch", "ueber euch", "gegründet", "leute"] },
    { q: "Seid ihr nicht zu laut?", a: "Doch. Genau das ist der Plan. Leise gibt's woanders.", go: "#manifest", keys: ["laut", "leise", "schrei", "krach", "nervt", "aggressiv", "zu viel", "ruhig"] },
    { q: "Buchen!", a: "Stark. Schreib uns — wir melden uns lauter als erwartet. 🐝", go: "#kontakt", keys: ["buch", "kontakt", "anfrage", "melde", "termin", "schreib", "los", "start", "zusammen", "anfangen", "kennenlernen"] },
  ],

  // Freie Eingabe → beste Antwort per Keyword-Score, sonst Fallback.
  match(text) {
    const t = (text || "").toLowerCase();
    let best = null;
    let bestScore = 0;
    for (const item of this.qa) {
      const score = (item.keys || []).reduce((s, k) => s + (t.includes(k) ? 1 : 0), 0);
      if (score > bestScore) { bestScore = score; best = item; }
    }
    if (best) return best;
    return { a: this.fallback[Math.floor(Math.random() * this.fallback.length)], go: null };
  },
};

// Krach-Konfigurator: Antworten → Empfehlung. Paket-Namen identisch zur
// #pakete-Sektion, Leads identisch zur #crew. Logik hier, nicht in der UI.
export const KONFIGURATOR = {
  defaultLead: "Mara Vogt · Chief Chaos Officer",
  recommend({ ziel, phase, tempo }) {
    if (!ziel || !phase || !tempo) return null;

    // Paket primär über Tempo, leicht angehoben je nach Phase.
    let paket = "Krachen";
    if (tempo === "test") paket = "Zünden";
    else if (tempo === "vollgas") paket = "Eskalieren";
    if (phase === "etabliert" && tempo === "dauer") paket = "Eskalieren";
    if (phase === "start" && tempo === "vollgas") paket = "Krachen";

    const leads = {
      awareness: "Jonas Reh · Kreativdirektor",
      sales: "Selin Akar · Head of Performance",
      launch: "Tobias Klein · Tech & Web",
    };
    const lead = leads[ziel] || this.defaultLead;

    const zielText = {
      awareness: "Du willst auffallen",
      sales: "Du willst Umsatz",
      launch: "Du willst launchen",
    }[ziel];
    const tempoText = {
      test: "erstmal antesten",
      dauer: "dauerhaft dranbleiben",
      vollgas: "Vollgas geben",
    }[tempo];

    return {
      paket,
      lead,
      why: `${zielText} und ${tempoText}? Dann ist „${paket}" dein Lärmpegel — ${lead.split(" · ")[0]} übernimmt den Hut.`,
    };
  },
};

// Krach-Maschine: Fake-KI Slogan-Generator. Keyword-Erkennung statt echter KI —
// `detect()` rät die Branche aus Marke+Branche-Text, `generate()` färbt Wortwahl
// und Templates entsprechend ein und meldet die erkannte Kategorie zurück (das
// macht den „versteht-mich"-Effekt). Reine Kombinatorik, kein Netz.
export const SLOGAN = {
  fallbackBrand: "deine Marke",
  tones: [
    { id: "frech", label: "Frech" },
    { id: "edgy", label: "Edgy" },
    { id: "premium", label: "Premium" },
    { id: "rebell", label: "Rebellisch" },
  ],
  // Branchen-Erkennung: Keyword-Treffer → Kategorie mit eigener Wortfarbe +
  // Extra-Templates. Reihenfolge = Priorität bei Mehrfachtreffern.
  categories: {
    food: {
      label: "Food & Drink",
      keys: ["kaffee", "café", "cafe", "müsli", "muesli", "hafer", "bio", "food", "essen", "snack", "getränk", "getraenk", "bier", "drink", "restaurant", "küche", "kueche", "schoko", "tee", "pizza", "burger", "vegan", "saft", "wein", "bäcker", "baecker", "eis", "limo"],
      noun: ["Geschmack", "Rezept", "Zutat", "Aroma", "Portion Lärm"],
      verb: ["schmeckt", "brodelt", "dampft", "knuspert"],
      templates: [
        "{BRAND} schmeckt nach Aufruhr.",
        "Iss {BRAND}. Schmeck den Unterschied.",
        "{BRAND} — {adj} auf der Zunge.",
      ],
    },
    fitness: {
      label: "Sport & Fitness",
      keys: ["fitness", "gym", "sport", "training", "lauf", "yoga", "crossfit", "muskel", "workout", "studio", "abnehmen", "protein", "fahrrad", "bike"],
      noun: ["Schweiß", "Wiederholung", "Puls", "Rekord"],
      verb: ["pusht", "brennt", "pumpt", "treibt"],
      templates: [
        "Schwitz mit {BRAND}, nicht gegen dich.",
        "{BRAND}: keine Ausreden, nur {noun}.",
        "Letzter Satz? Von wegen. {BRAND} {verb}.",
      ],
    },
    tech: {
      label: "Tech & Software",
      keys: ["software", "app", "ki", "ai", "saas", "tech", "code", "digital", "startup", "cloud", "daten", "plattform", "tool", "online", "web", " it ", "programm", "automat", "agentur"],
      noun: ["Update", "Feature", "Deploy", "Algorithmus"],
      verb: ["deployt", "skaliert", "rendert", "bootet"],
      templates: [
        "{BRAND} deployt Lärm. Zero Bugs.",
        "Andere haben Roadmaps. {BRAND} hat {noun}.",
        "{BRAND} skaliert lauter als dein Server.",
      ],
    },
    mode: {
      label: "Mode & Beauty",
      keys: ["mode", "fashion", "beauty", "kosmetik", "schuh", "textil", "style", "klamotten", "kleid", "sneaker", "schmuck", "brille", "parfum", "make-up", "makeup"],
      noun: ["Schnitt", "Statement", "Look", "Naht"],
      verb: ["sitzt", "glänzt", "funkelt", "trägt"],
      templates: [
        "Trag {BRAND}. Oder trag das Risiko.",
        "{BRAND} sitzt da, wo andere kneifen.",
        "{noun} mit Ansage: {BRAND}.",
      ],
    },
    finanz: {
      label: "Finanzen",
      keys: ["bank", "finanz", "geld", "krypto", "invest", "versicherung", "sparkasse", "kredit", "aktie", "fintech", "zahlung", "vermögen", "rente"],
      noun: ["Rendite", "Zins", "Bilanz", "Konto"],
      verb: ["rechnet", "zahlt", "wächst", "verzinst"],
      templates: [
        "{BRAND}: Rendite mit Radau.",
        "Andere flüstern Zinsen. {BRAND} {verb} laut.",
        "Dein Geld, {adj}. Mit {BRAND}.",
      ],
    },
  },
  _adj: {
    frech: ["frech", "ungeniert", "vorlaut", "unverschämt", "respektlos"],
    edgy: ["gnadenlos", "ungezähmt", "scharf", "kompromisslos", "wach"],
    premium: ["unbezahlbar", "makellos", "unkopierbar", "erste Wahl", "edel"],
    rebell: ["unbequem", "aufmüpfig", "systemwidrig", "laut", "ungehorsam"],
  },
  _noun: ["Krawall", "Statement", "Knall", "Ansage", "Wucht", "Frequenz", "Lärmpegel"],
  _verb: ["knallt", "schreit", "trifft", "brennt", "wackelt", "liefert"],
  _templates: [
    "{BRAND} macht Lärm. Der Rest macht Pause.",
    "Während andere flüstern, {verb} {BRAND}.",
    "{BRAND}: {adj} oder gar nicht.",
    "Kauf {BRAND}, bevor's dein Nachbar tut.",
    "{BRAND} — {noun} mit Ansage.",
    "Kein Budget für leise. {BRAND} {verb}.",
    "{BRAND} ist {adj}. Gewöhn dich dran.",
    "Stell dir vor, {BRAND} wär laut. Ist es.",
    "{noun} heißt ab jetzt {BRAND}.",
    "{BRAND}. Weil {adj} besser verkauft als nett.",
    "Nett war gestern. Heute ist {BRAND}.",
    "{BRAND} {verb} da, wo andere kuschen.",
  ],

  // Branche aus freiem Text raten. Gibt Kategorie-Id oder null.
  detect(text) {
    const t = ` ${(text || "").toLowerCase()} `;
    for (const [id, c] of Object.entries(this.categories)) {
      if (c.keys.some((k) => t.includes(k))) return id;
    }
    return null;
  },

  // Liefert { category, slogans }. Erkannte Branche färbt Wortwahl + Templates;
  // ein Branchen-Template steht (falls erkannt) bevorzugt an erster Stelle.
  generate({ brand, branche, ton } = {}, count = 3) {
    const b = (brand || "").trim() || this.fallbackBrand;
    const BRAND = b.toUpperCase();
    const adj = this._adj[ton] || this._adj.frech;
    const catId = this.detect(`${brand || ""} ${branche || ""}`);
    const cat = catId ? this.categories[catId] : null;
    const nouns = cat ? cat.noun.concat(this._noun) : this._noun;
    const verbs = cat ? cat.verb.concat(this._verb) : this._verb;
    const rnd = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const fill = (tpl) =>
      tpl
        .replace(/\{BRAND\}/g, BRAND)
        .replace(/\{adj\}/g, () => rnd(adj))
        .replace(/\{noun\}/g, () => rnd(nouns))
        .replace(/\{verb\}/g, () => rnd(verbs));

    const pool = (cat ? cat.templates : []).concat(this._templates);
    const used = new Set();
    const draw = (arr) => {
      const cand = arr.filter((t) => !used.has(t));
      if (!cand.length) return null;
      const t = cand[Math.floor(Math.random() * cand.length)];
      used.add(t);
      return t;
    };

    const slogans = [];
    const n = Math.min(count, pool.length);
    while (slogans.length < n) {
      // Erste Zeile bevorzugt aus der Branche, Rest aus dem ganzen Pool.
      let tpl = cat && slogans.length === 0 ? draw(cat.templates) : null;
      if (!tpl) tpl = draw(pool);
      if (!tpl) break;
      slogans.push(fill(tpl));
    }
    return { category: cat ? cat.label : null, slogans };
  },
};

export const COPY = {
  formSuccess: "Bzzz! Nachricht ist drin. Wir melden uns lauter als erwartet. 🐝",
  formError: "Fast! Füll bitte alle Felder aus.",
  storageKey: "grellwerk_guide_seen",
};
