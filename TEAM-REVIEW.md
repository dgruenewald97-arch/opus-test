# Teamreview / Revision 11

20.09.2026. Drei getrennte Agenten prüften den Stand vor der beauftragten GitHub-Veröffentlichung. Die Website selbst bleibt ein statisches Agenturkonzept ohne Agenten-Backend.

## CUT / Gestaltung und Bedienung

- Projects-Header überdeckte das Logo auf Mobil. Die volle Headerbreite ist korrigiert und bei 320, 390 und 1440 Pixeln sichtbar nachgeprüft.
- Auf den hellen HAFERKRAFT- und BLITZBANK-Motiven war die weiße Navigation schlecht lesbar. Ein begrenzter dunkler Verlauf verbessert den Kontrast; beide Motive wurden nachgeprüft.
- Home ausschließlich Hero, alle vier Projektbühnen, About-Porträts und Rollenlinks, drei Case-GIFs sowie Bewegungspause und Menü/Escape im Browser geprüft.

## VERIFY / Funktion

- Der Skip-Link scrollte, setzte den Tastaturfokus aber nicht auf den Inhalt. Der Hash-Handler fokussiert jetzt `main`; CUT hat Tab → Enter nachgeprüft.
- Alle neun Gruppen von `node tools/verify.cjs` bestanden. Prüfung von lokalen Referenzen und Groß-/Kleinschreibung für Linux, Modul-Lebenszyklen und Medienersatz ohne weiteren belegten Fehler.
- Der Pages-Workflow baut und prüft GRELLWERK jetzt vor dem Deploy. Auch Feature-Pushes und Pull Requests führen Build und Verify aus.

## VOICE / Inhalte

- Sieben Leistungsseiten enthielten erfundene Ergebnisse, Kundenstimmen und technische Kennzahlen. Diese wurden durch Aufgaben, mögliche Liefergegenstände und verlinkte freie Konzeptstudien ersetzt. URLs und Anker blieben erhalten.
- Root entfernte zusätzlich erfundene Buchungs- und Kundenbehauptungen aus der Spielwiese. Modellpreise sind als Beispiele gekennzeichnet.
- Die unbestätigte Agentur-E-Mail wurde durch den lokalen Briefing-Einstieg ersetzt. Projekt- und Datenschutzinformationen beschreiben den tatsächlichen statischen Aufbau und GitHub Pages statt einer erfundenen GmbH.

## Abschlussprüfung durch Root

- Build und neun Verify-Gruppen nach den Korrekturen erneut erfolgreich.
- Web-Leistungsseite und Kontakt bei 390 × 844 im Browser geprüft: Texte und neue Titel passen, kein horizontaler Überlauf. Der Briefing-Link scrollt zum Formular. Erfasste Warnungs-/Fehlerlogs leer.
- Titel der Leistungsseiten von doppelter HTML-Escapierung bereinigt.
- Versionierte Styles und Module konsistent auf v11 gesetzt. `studio-seide/` ohne Diff.

## Grenzen

Keine Prüfung auf einem physischen Smartphone, kein neuer Lighthouse-Lauf und keine vollständige erneute Sichtprüfung aller Journalartikel oder Zusatzfunktionen. Die sichtbare Prüfung ersetzt keine gestalterische Abnahme durch den Nutzer. Die Projektinformationen sind keine rechtliche Prüfung. Die Veröffentlichung ist erst mit erfolgreichem Pages-Deploy abgeschlossen; den Status dokumentieren Pull Request und GitHub Actions.
