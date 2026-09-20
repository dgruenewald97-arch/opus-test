# Prüfung / Revision 11

20.09.2026. Home besteht wieder ausschließlich aus dem akzeptierten Film-Hero. Die Projektinszenierung liegt auf Projects und in den Cases; die Zusammenarbeit der Rollen auf About.

## Automatisch

`node tools/build-art-site.cjs` und `node tools/verify.cjs` erfolgreich. Alle neun Prüfgruppen bestanden: Syntax, HTML/Meta, lokale Links und Medien, gemeinsame Hülle, Journal/Sitemap, Standalone-Build sowie Projektverträge. Diese prüfen jetzt Home ohne zusätzliche Inhaltsstrecke, vier Projektkapitel, die Crew-Erzählung auf About, GIFs in drei Cases und zwei eingebettete Hero-GIFs in der Einzeldatei.

## Browserprüfung

- Home bei 1440 × 900: genau ein Inhaltsabschnitt, Dokumenthöhe 900 Pixel, Footer ausgeblendet. Hintergrundvideo geladen und laufend. Hero visuell betrachtet. Projects-Einstieg funktioniert und stellt den Footer auf der Unterseite wieder her.
- Projects: KOLD BREW und NEONTRITT auf Desktop betrachtet, HAFERKRAFT auf 390 × 844, BLITZBANK auf Desktop. Alle vier Kapitel vorhanden. Projektbilder öffnen sich per IntersectionObserver ohne Größenänderung des Layouts. Die zusätzliche große BLITZBANK-Schrift ist ausgeblendet, damit die Wortmarke des Bildmotivs allein steht.
- GIF-Ladung: sichtbare Studien laden als GIF, außerhalb des sichtbaren Bereichs zeigen sie WebP-Standbilder. Projekt-Sprunglinks funktionieren. Kein horizontaler Überlauf bei 1440 und 390 Pixeln.
- Projects bei 320 × 568: kein Überlauf, alle vier Filmflächen 277 Pixel breit bei 305 Pixel verfügbarer Breite. Links und Projekttext bleiben innerhalb der Seite.
- NEONTRITT-Aufruf aus der Filmfläche: Bildübernahme in das Case beobachtet; die Übergangsebene ist nach der Animation entfernt. Zurück führt wieder zu Projects. Neues Case-GIF mobil betrachtet; Pause schaltet auf das geladene Standbild, Fortsetzen wieder zum GIF.
- About: neuer Ablauf auf Desktop und Smartphone betrachtet; Porträts geladen. VECTOR-Porträt öffnet das passende Profil. „Briefing an PROMPT“ öffnet mobil PROMPT. CUT-Demo schaltet die Zusatzbotschaften aus und zeigt „Vorher ansehen“.
- About bei 320 Pixeln ohne horizontalen Überlauf. Die gemeinsame AURA-/CUT-Bühne bei 768 × 1024 visuell betrachtet; beide Porträts und Profilaufrufe passen.
- Menü geöffnet: GIFs wechseln zu Standbildern. Escape schließt das Menü. Projektlinks per Tastatur erreichbar.
- Simulierte reduzierte Bewegung: alle Projekt-GIFs bleiben Standbilder, Bildmasken sind geöffnet, Pauseknopf deaktiviert.
- Simulierter GIF- und KOLD-Bildausfall: coffee.gif wird durch geladenes coffee-still.webp ersetzt; Kampagnenbild erhält seine vorhandene Fehleransicht.
- Keine Warnungen oder Fehler im geprüften Log der normalen Vorschau.

## Grenzen

Keine Prüfung auf einem physischen Smartphone. Kein neuer Lighthouse-Lauf. Kein vollständiger erneuter Test aller zwölf Profile, Spezialisten, Journal- und Laborfunktionen; deren Struktur und Assets durchlaufen die automatische Prüfung. Der Nutzer hat anschließend einen Teamdurchlauf und die Veröffentlichung beauftragt. Die neue Gestaltung ist noch nicht durch den Nutzer abgenommen.

Revision 9 ist in work/GRELLWERK-Studio-v9.zip gesichert. Medienquellen stehen in assets/motion/CREDITS.md; vorhandene Stock-GIFs wurden wiederverwendet.

## Teamdurchlauf vor Veröffentlichung

Die unabhängigen Reviews, behobenen Fehler und ergänzenden Browserchecks stehen in TEAM-REVIEW.md. Build und Verify sind nach den Korrekturen erneut grün. Styles und Module verwenden v11.
