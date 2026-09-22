# GRELLWERK / Revision 13

22. September 2026. Die Bildentwürfe dienen als Richtung für bedienbare HTML-Seiten. Home und Projects behalten ihren akzeptierten Hauptinhalt. Die gemeinsame Navigation erhält eine durchgehende Animation vom geöffneten Menü bis zum Inhalt der Zielseite.

## Umsetzung

- About: Porträtcollage mit CUT, VISUAL, SYNTAX und KOLD-Detail. Drei Schritte zeigen Briefing, Gestaltung und Ergebnis; native Tab-Semantik, Pfeiltasten, Home/End und sichtbarer Auswahlzustand.
- Leistungen: große Typografie, drei direkte Einstiege und eine eigens generierte Studioaufnahme. Alle sechs bestehenden Detailseiten bleiben erreichbar.
- Journal: große Bildgeschichte mit einem vorhandenen Artikel; bestehendes Archiv und Filter erhalten.
- Spielwiese: Generator direkt im Einstieg. Tonwahl mit aria-pressed, lokale Textbausteine, drei Ergebnisse; Konfigurator, Preise und FAQ erhalten.
- Kontakt: gemeinsame Bildsprache und bestehendes lokales Briefingformular. Kein Versand und kein neues Backend.
- Cases: stärkerer Titel und angepasste Einstiegshöhe. Eigene Motive, GIFs und Credits bleiben erhalten.
- Menü: gestaffelte Schrift, animiertes Schließen per Escape, Übergabe an den Seitenvorhang, Zielname und anschließender Inhaltseintritt. Tastaturfokus landet nach dem Wechsel im Hauptinhalt.

Die neue Studioaufnahme liegt in zwei WebP-Größen vor (zusammen etwa 214 KB). Die Herkunft ist in assets/studio/CREDITS.md dokumentiert. Bestehende Porträts und Filmstudien werden weiterverwendet.

## Prüfung

Build und neun Verify-Gruppen bestanden. Zusätzliche Prüfungen verhindern doppelte Hauptüberschriften, fehlende Tab-Panels und beschädigte UTF-8-Texte. Home- und Projects-Hauptinhalt gegen Revision 12 verglichen.

Browser-Sichtprüfung bei 1440 und 390 Pixeln: About, Zusammenarbeit, Menü, Leistungen, Generator, Journal, Kontakt und NEONTRITT. Sechs veränderte Seitentypen zusätzlich bei 320 Pixeln ohne horizontale Überbreite. Generator erzeugt drei Vorschläge; Tonwahl meldet den aktiven Zustand. About-Tabs reagieren auf Klick und Pfeiltaste. Bewegungspause ersetzt das GIF durch sein Standbild. Menü per Escape schließbar, Fokus kehrt zurück. Menüroute zu About und Leistungen endet auf dem passenden Inhalt. Erfasste Warnungs- und Fehlerlogs leer.

Keine neue Lighthouse-Messung und kein physisches Smartphone getestet. Betriebssystemweite reduzierte Bewegung und Fehler-Injektion wurden in dieser Revision nicht erneut simuliert; bestehende Fallbacks bleiben erhalten. Technische Prüfung ersetzt nicht die gestalterische Abnahme durch den Nutzer.
