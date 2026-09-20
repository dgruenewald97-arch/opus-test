# GRID — Design-System / UX-Motion

Umgesetzt in `css/ux.css` als letzte Styleschicht:

- Gemeinsamer fester Header: 80 px Desktop, 104 px mobil; Hauptlinks auf allen Seiten sichtbar. Menü mit stabilen Namen, Beschreibungen und 160-ms-Pfeilfeedback.
- Akzeptierter Filmeinstieg erhalten. Projekte als primärer Acid-Pill, Studio als Outline-Pill; kleine Erklärung innerhalb beider Flächen.
- Sticky Kapitelwahl unter Header, aktuelle Position unterstrichen, zwei Zeilen auf kleinen Displays. Ankersprung verrechnet den Header genau einmal.
- Kürzeres Studio-Opening und kompaktere Porträtbühnen, Teamprofil unter Header/Kapiteln; Cases mit sichtbaren Folgeaktionen.
- Formularfelder, lokale Briefing-Vorschau und Aktionen ab 320 px gestaltet; sichtbarer Fokus und mindestens 44 px hohe zentrale Bedienflächen.
- Bewegungstokens: 160 ms Feedback, 420 ms Reveal, maximal 16 px Text-Reveal. Projektblenden subtil (3 %), GIFs erhalten. Reduced Motion und manuelle Pause schalten CSS-Bewegung aus.
- Ladeanzeige und Fehlerhinweis unter Header; Kontaktfooter wiederholt den Kontaktaufruf nicht.

Quellen und Selektoren gegen aktuelle Content-/Chrome-Struktur geprüft. Keine Build- oder Browsertests durch GRID durchgeführt. Browserprüfung ist durch die geltende Netzwerk-/URL-Policy blockiert; visuelle Freigabe, Touchverhalten und 320/700/1440-px-Layouts bleiben ungeprüft. Build/Verify führt Root zusammen mit dem integrierten Stand aus.
