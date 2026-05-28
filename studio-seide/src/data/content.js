// -----------------------------------------------------------------------------
// STUDIO SEIDE — zentraler Inhalt
// Alle Texte hier zentral, damit sich Inhalte ohne Logik-Änderungen anpassen
// lassen. Sprache: Deutsch, Ansprache "du". Alle Personen/Stimmen sind fiktiv.
// -----------------------------------------------------------------------------

export const brand = {
  name: 'STUDIO SEIDE',
  short: 'SEIDE',
  tagline: 'Schnitt als Handwerk, Farbe als Charakter.',
  claim: 'Haus für Haar & Beauty',
  city: 'Hamburg',
  founded: '2016',
}

export const nav = [
  { id: 'leistungen', label: 'Leistungen' },
  { id: 'philosophie', label: 'Haltung' },
  { id: 'lookbook', label: 'Lookbook' },
  { id: 'team', label: 'Team' },
  { id: 'stilfinder', label: 'Stilfinder' },
  { id: 'kontakt', label: 'Kontakt' },
]

export const hero = {
  kicker: 'Ausgabe Nº 09 — Frühling 2026',
  // Drei Zeilen für das Masthead.
  titleLines: ['Haar', 'als', 'Handwerk.'],
  lead:
    'Wir nehmen uns Zeit, hören zu und schneiden, was zu dir passt — nicht, was gerade laut ist. Ein Haus für Haar & Beauty mitten in Hamburg.',
  ctaPrimary: { label: 'Termin anfragen', target: 'kontakt' },
  ctaSecondary: { label: 'Stilfinder starten', target: 'stilfinder' },
  stats: [
    { value: 'seit 2016', label: 'in der Schanze' },
    { value: '6', label: 'Hände, die hören' },
    { value: '4,9★', label: '· 380 Bewertungen' },
  ],
}

export const leistungen = {
  kicker: 'Nº 01 — Leistungen',
  title: 'Was wir können',
  intro:
    'Klare Preise, keine Überraschungen. Jeder Termin beginnt mit einer ehrlichen Beratung — erst dann reden wir über Schere und Farbe.',
  groups: [
    {
      name: 'Schnitt',
      items: [
        { title: 'Damenschnitt', desc: 'Beratung, Wäsche, Schnitt & Styling', price: 'ab 69 €' },
        { title: 'Herrenschnitt', desc: 'Beratung, Schnitt & Finish', price: 'ab 45 €' },
        { title: 'Trockenschnitt', desc: 'Form pur, ohne Wäsche', price: 'ab 39 €' },
        { title: 'Pony & Konturen', desc: 'Auffrischung zwischendurch', price: '15 €' },
      ],
    },
    {
      name: 'Farbe',
      items: [
        { title: 'Ansatzfarbe', desc: 'Nachwuchs, sauber abgedeckt', price: 'ab 59 €' },
        { title: 'Balayage', desc: 'Handgemalte Verläufe, natürlich', price: 'ab 159 €' },
        { title: 'Foliensträhnen', desc: 'Highlights mit Präzision', price: 'ab 119 €' },
        { title: 'Glossing', desc: 'Glanz & Tonung in 30 Minuten', price: 'ab 49 €' },
      ],
    },
    {
      name: 'Beauty',
      items: [
        { title: 'Augenbrauen', desc: 'Forming & Färben', price: 'ab 29 €' },
        { title: 'Make-up', desc: 'Tages- oder Anlass-Look', price: 'ab 65 €' },
        { title: 'Treatment', desc: 'Tiefenpflege Olaplex / Kérastase', price: 'ab 35 €' },
        { title: 'Braut-Paket', desc: 'Probetermin + Tag, alles drin', price: 'auf Anfrage' },
      ],
    },
  ],
}

export const philosophie = {
  kicker: 'Nº 02 — Haltung',
  title: 'Wir glauben an Handwerk, nicht an Hektik.',
  dropcap: 'E',
  body: [
    'in Salon ist kein Fließband. Bei uns bekommst du einen festen Menschen an deiner Seite, der dein Haar kennt — Termin für Termin. Wir arbeiten in Ruhe, mit Werkzeug, das wir pflegen, und mit Produkten, hinter denen wir stehen.',
    'Nachhaltigkeit ist für uns keine Pose: Wir dosieren sparsam, recyceln Folien und Tuben über ein Salon-Programm und setzen auf vegane, tierversuchsfreie Pflege. Was bei dir ankommt, soll auch morgen noch gut aussehen.',
  ],
  pillars: [
    { title: 'Beratung zuerst', text: 'Jeder Termin startet mit Zuhören. Wir sagen ehrlich, was geht — und was nicht.' },
    { title: 'Faire Preise', text: 'Transparent ausgezeichnet. Du weißt vorher, was es kostet.' },
    { title: 'Grün im Detail', text: 'Vegane Pflege, recycelte Folien, sparsame Dosierung.' },
  ],
}

export const lookbook = {
  kicker: 'Nº 03 — Lookbook',
  title: 'Arbeiten aus dem Haus',
  intro: 'Eine kleine Auswahl. Jeder Look entsteht im Gespräch — kein Look ist von der Stange.',
  // Abstrakte Editorial-Kacheln (als SVG gerendert), je mit Bildunterschrift.
  plates: [
    { id: 1, name: 'Kupfer-Balayage', tag: 'Farbe', tone: 'copper' },
    { id: 2, name: 'Weicher Bob', tag: 'Schnitt', tone: 'ink' },
    { id: 3, name: 'Aschblond, kühl', tag: 'Farbe', tone: 'ash' },
    { id: 4, name: 'Curtain Bangs', tag: 'Schnitt', tone: 'rouge' },
    { id: 5, name: 'Naturlocke, definiert', tag: 'Treatment', tone: 'olive' },
    { id: 6, name: 'Braut-Hochsteck', tag: 'Beauty', tone: 'sand' },
  ],
}

export const team = {
  kicker: 'Nº 04 — Team',
  title: 'Die Hände im Haus',
  intro: 'Sechs Köpfe, ein Anspruch. Such dir aus, wer dich begleitet — oder lass dich beim Stilfinder zuordnen.',
  members: [
    { name: 'Mara Lindqvist', role: 'Inhaberin · Color Director', focus: 'Balayage & Korrekturen', initials: 'ML', tone: 'copper' },
    { name: 'Jonas Reuter', role: 'Master Stylist', focus: 'Herren & Präzisionsschnitt', initials: 'JR', tone: 'ink' },
    { name: 'Édith Caron', role: 'Stylistin', focus: 'Locken & Curly Cutting', initials: 'ÉC', tone: 'rouge' },
    { name: 'Sami Yıldız', role: 'Colorist', focus: 'Kühle Töne & Foliensträhnen', initials: 'SY', tone: 'ash' },
    { name: 'Pauline Berg', role: 'Beauty & Make-up', focus: 'Braut & Anlass', initials: 'PB', tone: 'sand' },
    { name: 'Nael Brandt', role: 'Junior Stylist', focus: 'Trends & Trockenschnitt', initials: 'NB', tone: 'olive' },
  ],
}

export const stimmen = {
  kicker: 'Nº 05 — Stimmen',
  title: 'Was Gäste sagen',
  quotes: [
    { text: 'Zum ersten Mal fühlt sich meine Farbe nach mir an und nicht nach Schablone. Mara hört wirklich zu.', author: 'Lena K.', meta: 'Gast seit 2019' },
    { text: 'Ich war Salon-müde. Hier sitzt der Schnitt vier Wochen später immer noch.', author: 'Tobias M.', meta: 'Herrenschnitt' },
    { text: 'Ruhig, ehrlich, kein Verkaufsdruck. Édith hat meine Locken endlich verstanden.', author: 'Asli D.', meta: 'Curly Cutting' },
    { text: 'Mein Braut-Look war genau wie besprochen — und hielt bis zum letzten Tanz.', author: 'Friederike W.', meta: 'Braut-Paket' },
  ],
}

export const faq = {
  kicker: 'Nº 06 — FAQ',
  title: 'Kurz gefragt',
  items: [
    {
      q: 'Brauche ich einen Termin?',
      a: 'Ja, wir arbeiten ausschließlich auf Termin, damit wir uns wirklich Zeit nehmen können. Spontan? Frag gern an — manchmal wird kurzfristig etwas frei.',
    },
    {
      q: 'Wie läuft die Beratung ab?',
      a: 'Jeder Termin beginnt mit einem kurzen Gespräch: Haargeschichte, Alltag, Wunsch. Erst danach legen wir gemeinsam los — ohne Drängen.',
    },
    {
      q: 'Was kostet eine Farbe wirklich?',
      a: 'Die Startpreise findest du oben bei den Leistungen. Den genauen Preis nennen wir dir verbindlich nach der Haar-Analyse, bevor wir anfangen.',
    },
    {
      q: 'Arbeitet ihr nachhaltig?',
      a: 'Wir nutzen vegane, tierversuchsfreie Pflege, recyceln Folien und Tuben und dosieren bewusst sparsam. Ökostrom im ganzen Haus.',
    },
    {
      q: 'Kann ich stornieren?',
      a: 'Klar — bitte bis 24 Stunden vorher. So können wir den Platz an jemand anderen vergeben.',
    },
  ],
}

export const kontakt = {
  kicker: 'Nº 07 — Kontakt',
  title: 'Komm vorbei',
  address: ['Susannenstraße 12', '20357 Hamburg — Schanzenviertel'],
  phone: '+49 40 123 456 78',
  email: 'hallo@studio-seide.de',
  hours: [
    { day: 'Di – Fr', time: '09 – 19 Uhr' },
    { day: 'Samstag', time: '09 – 16 Uhr' },
    { day: 'So & Mo', time: 'geschlossen' },
  ],
  note: 'Termine bitte online anfragen oder anrufen. Wir melden uns am selben Werktag zurück.',
}

// -----------------------------------------------------------------------------
// Stilfinder — kleiner interaktiver Konfigurator.
// 3 Fragen -> Empfehlung (Leistung + passende:r Stylist:in).
// -----------------------------------------------------------------------------
export const stilfinder = {
  kicker: 'Nº 08 — Stilfinder',
  title: 'Was passt zu dir?',
  intro: 'Drei kurze Fragen, eine ehrliche Empfehlung. Unverbindlich — gebucht wird nichts.',
  questions: [
    {
      id: 'ziel',
      label: 'Worum geht es dir gerade?',
      options: [
        { value: 'schnitt', label: 'Neue Form / Schnitt' },
        { value: 'farbe', label: 'Farbe oder Strähnen' },
        { value: 'pflege', label: 'Pflege & Glanz' },
        { value: 'anlass', label: 'Anlass / Braut' },
      ],
    },
    {
      id: 'aufwand',
      label: 'Wie viel Zeit darf es kosten?',
      options: [
        { value: 'kurz', label: 'Lieber kurz & knackig' },
        { value: 'mittel', label: 'Ein gutes Stündchen' },
        { value: 'lang', label: 'Ruhig ausgiebig' },
      ],
    },
    {
      id: 'typ',
      label: 'Dein Haar ist eher …',
      options: [
        { value: 'glatt', label: 'Glatt / fein' },
        { value: 'wellig', label: 'Wellig' },
        { value: 'lockig', label: 'Lockig / kraus' },
      ],
    },
  ],
  // Empfehlungslogik: pro Ziel eine Basis-Empfehlung, leicht abgewandelt.
  recommend(answers) {
    const { ziel, aufwand, typ } = answers
    const base = {
      schnitt: {
        service: typ === 'lockig' ? 'Curly Cutting' : 'Form-Schnitt mit Beratung',
        stylist: typ === 'lockig' ? 'Édith Caron' : 'Jonas Reuter',
        why: 'Erst die Form, dann das Styling — schneiden, was im Alltag wirklich hält.',
      },
      farbe: {
        service: aufwand === 'lang' ? 'Balayage' : 'Foliensträhnen oder Glossing',
        stylist: 'Mara Lindqvist',
        why: 'Handgemalte Verläufe oder gezielte Highlights — natürlich und pflegeleicht im Rauswachsen.',
      },
      pflege: {
        service: 'Tiefenpflege-Treatment + Glossing',
        stylist: 'Sami Yıldız',
        why: 'Glanz, Geschmeidigkeit und ein kühler, klarer Ton in unter einer Stunde.',
      },
      anlass: {
        service: 'Make-up & Hochsteck (Braut-Paket auf Wunsch)',
        stylist: 'Pauline Berg',
        why: 'Look im Probetermin festzurren, damit am großen Tag alles sitzt.',
      },
    }
    const r = base[ziel] || base.schnitt
    const timeNote =
      aufwand === 'kurz'
        ? 'Plan ca. 30–45 Min ein.'
        : aufwand === 'lang'
          ? 'Nimm dir 2–3 Stunden Zeit.'
          : 'Rechne mit gut einer Stunde.'
    return { ...r, timeNote }
  },
}

export const footer = {
  legalLinks: ['Impressum', 'Datenschutz', 'AGB'],
  social: [
    { label: 'Instagram', href: '#' },
    { label: 'Pinterest', href: '#' },
  ],
  credit: 'Alle Personen, Stimmen und Preise sind frei erfunden (Demo-Inhalt).',
}
