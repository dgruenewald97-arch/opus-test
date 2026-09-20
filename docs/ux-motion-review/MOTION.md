# MOTION

Die echten GIFs bleiben Teil der Markeninszenierung. `reel.js` behält Wiedergabe, Standbilder und Pause vollständig. Projektbilder öffnen sich einmal beim Eintritt in den sichtbaren Bereich, ohne wiederholtes Zuschneiden beim Zurückscrollen. Tastaturfokus, Pause und reduzierte Bewegung entfernen die Blende sofort. Ohne IntersectionObserver bleiben alle Bilder offen.

Ein gemeinsamer Kapiteltracker begleitet Projekte, Cases und Studio. Er setzt ausschließlich am aktuellen Kapitellink `aria-current="location"`, berücksichtigt Header und Kapitelbar und übernimmt beim Einstieg zunächst den Deep Link. Danach entscheidet die reale Abschnittsposition. Scroll- und Resize-Ereignisse laufen gebündelt über requestAnimationFrame; Größenänderungen und geladene Medien lösen eine Neuberechnung aus. Der Tracker bewegt weder Seite noch horizontale Linkleisten. Listener, Observer und ausstehender Frame werden beim Seitenwechsel entfernt.

Prüfung: JavaScript-Syntaxprüfung bestanden. Quellprüfung: Schnittstelle `createProjects(main,isPaused)` mit `sync`/`destroy` erhalten; keine GIF-Quelle oder Routinglogik geändert. Browser-, Build- und Integrationsprüfungen übernimmt VERIFY. Besonders prüfen: Deep Links, letztes Kapitel, mobile Headerhöhe, Tastaturfokus und Pause während einer Bildöffnung.
