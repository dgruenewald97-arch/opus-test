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
    selector: "#leistungen",
    text: "Das können wir. Fahr mit der Maus über die Zeilen — keine Angst, sie beißen nicht.",
  },
  {
    selector: "#arbeiten",
    text: "Zahlen lügen nicht. +312% ROAS sind +312% ROAS. Schau dir die Cases an.",
  },
  {
    selector: "#prozess",
    text: "In vier Schritten von der Idee zum Knall. So einfach, so laut.",
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
    selector: "#kontakt",
    text: "Genug geschaut. Schreib uns — wir beißen nur Wettbewerber. Klick mich an, wenn du mich nochmal brauchst!",
  },
];

// Passive quips shown when a section scrolls into view (guide inactive).
export const QUIPS = {
  leistungen: "Sechs Disziplinen, ein Ziel: Krach.",
  arbeiten: "Echte Zahlen, keine Fake-Mockups.",
  prozess: "Vier Schritte. Null Bullshit.",
  crew: "Sieht harmlos aus. Ist es nicht.",
  stimmen: "Hör auf die, nicht auf uns.",
  kontakt: "Na los, trau dich.",
};

export const COPY = {
  formSuccess: "Bzzz! Nachricht ist drin. Wir melden uns lauter als erwartet. 🐝",
  formError: "Fast! Füll bitte alle Felder aus.",
  storageKey: "grellwerk_guide_seen",
};
