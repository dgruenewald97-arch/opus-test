// GRELLWERK — central config (copy + guide steps). Edit text here, not logic.

export const FLAGS = {
  gsap: false,
  lenis: false,
};

// BRUMMER guide steps. `selector` is scrolled into view + highlighted.
export const GUIDE_STEPS = [
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
    text: "Zahlen lügen nicht. +312% ROAS sind +312% ROAS. Schau dir die Cases an.",
  },
  {
    selector: "#kunden",
    text: "Acht Marken, die uns vertrauen — und ein paar Awards im Regal. Kein Zufall.",
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
    selector: "#crew",
    text: "Die Verrückten, die das alles bauen. Sag Hallo.",
  },
  {
    selector: "#stimmen",
    text: "Glaub nicht uns — glaub denen, mit denen wir schon Krach gemacht haben.",
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
];

// Passive quips shown when a section scrolls into view (guide inactive).
export const QUIPS = {
  zahlen: "Zahlen statt Buzzwords.",
  leistungen: "Sechs Disziplinen, ein Ziel: Krach.",
  kunden: "Die vertrauen uns. Du auch?",
  manifest: "Fünf Sätze. Kein Bullshit.",
  faq: "Antworten ohne Drumherum.",
  arbeiten: "Echte Zahlen, keine Fake-Mockups.",
  prozess: "Vier Schritte. Null Bullshit.",
  pakete: "Drei Stufen Lärm. Such dir was aus.",
  konfigurator: "Zwei Klicks zur Empfehlung.",
  crew: "Sieht harmlos aus. Ist es nicht.",
  stimmen: "Hör auf die, nicht auf uns.",
  journal: "Frischer Lärm zum Nachlesen.",
  kontakt: "Na los, trau dich.",
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

export const COPY = {
  formSuccess: "Bzzz! Nachricht ist drin. Wir melden uns lauter als erwartet. 🐝",
  formError: "Fast! Füll bitte alle Felder aus.",
  storageKey: "grellwerk_guide_seen",
};
