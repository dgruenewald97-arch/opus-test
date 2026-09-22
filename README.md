# GRELLWERK / Revision 12

20.09.2026. **Lärm, der etwas auslöst.** Die KI-Agenturidee aus dem GitHub-Projekt wird als Marken-, Kampagnen- und Digitalstudio mit klaren Rollen weitergeführt. Das ausgearbeitete Konzept steht in [KONZEPT.md](KONZEPT.md).

## Vorschau

START-PREVIEW.cmd startet die vollständige Website lokal. Alternativ: `python tools/preview.py --headless --port 8877`.

[Home](http://127.0.0.1:8877/index.html?v=12) · [Projects](http://127.0.0.1:8877/arbeiten.html?v=12) · [About](http://127.0.0.1:8877/ueber-uns.html?v=12)

## Aktueller Aufbau

- Ein bildschirmfüllender Hero mit elf Sekunden echtem Film und separater Hochformatfassung. Zwei echte GIF-Loops wechseln in der Überschrift. Beide Aufnahmen sind monochrom mit säuregrünen Lichtern gestaltet. Große Outline-Links führen zu Projects und About.
- Home besteht ausschließlich aus dem Film-Hero. Projects, About und alle Zusatzseiten sind über Einstiege und Vollbildmenü erreichbar.
- Projects inszeniert vier Marken in großen, versetzten Bildkompositionen. Drei echte GIFs, scharfe HTML-Wortmarken und eigene Kampagnenmotive bilden die Projektkapitel. Die Filmflächen öffnen sich beim Eintritt in den sichtbaren Bereich; vier Sprunglinks erschließen die Seite.
- About beginnt mit einer Collage aus drei Porträts und einer Produktaufnahme. „Von Kopf zu Kopf“ erklärt die Zusammenarbeit an KOLD BREW in drei bedienbaren Schritten von VECTOR über PROMPT bis SYNTAX, einschließlich GIF-Ergebnis. Der Desktop-Index zeigt auswählbare Porträts. Alle zwölf Rollen, Filter, Profile und CUTs Vorher/Nachher-Demo bleiben erreichbar.
- Vollbildmenü, fünf gestaffelte Übergangsflächen, Browserhistorie und abbrechbare Bildübernahme beim Case-Einstieg.
- Pause, reduzierte Bewegung, ruhige Ersatzansicht bei Video- oder GIF-Ausfall und native Links. Film und GIFs pausieren auch bei geöffnetem Menü oder verborgenem Browser-Tab. Die neuen GIFs laden erst im sichtbaren Bereich; außerhalb wechseln sie auf Standbilder.
- Cases erzählen jede Marke auf dunklen Bildstrecken mit GIFs und Porträt-Credits. Leistungen, Journal, Kontakt und Spielwiese verwenden die gemeinsame Typografie und dezente Konturen. Vorhandene Cases, Leistungen, Journal, Kontaktformular und Spielwiese bleiben erhalten. Das Formular kopiert ein Briefing und versendet nichts.

GRELLWERK ist eine fiktive Agentur. Die Rollen sind ein Arbeitsmodell; auf dieser Website läuft kein Agenten-Backend. Der Home-Film und die GIFs stammen aus zwei bearbeiteten Mixkit-Stockaufnahmen. Quellen, Lizenz und Schnitt sind in assets/motion/CREDITS.md dokumentiert. Die Personen im Film sind keine Agentenporträts oder behaupteten Kunden. Drei weitere Filmstudien ergänzen Projects, About und die passenden Cases.

Die Prompts und die Herkunft der Porträtserie stehen in [assets/agents/PROMPTS.md](assets/agents/PROMPTS.md). WebP-Exporte liegen in zwei Größen vor.

## Quellen zum Weiterarbeiten

- Home und About-Einstieg: tools/content/direction.cjs; Projects: work-view.cjs; About-Arbeitsweise: agency-story.cjs; GIF-Markup: motion.cjs
- Cases und Bilder: tools/content/showcase.cjs; Inhalte: site.cjs
- Rollen: tools/content/agency.cjs; Index/Profile: agency-view.cjs
- Gemeinsame Hülle: tools/lib/chrome.cjs
- Unterseiten ab Revision 12: css/interiors.css; Bildanreicherung der Leistungsseiten: tools/content/interiors.cjs
- Hero: css/home.css; Projektstrecken, Case-GIFs und About-Erweiterung: css/editorial.css; Porträts und Rollenindex: css/about.css
- Interaktionen: js/studio.js, js/reel.js, js/projects.js, js/team.js und js/main.js

`node tools/build-art-site.cjs` erzeugt die Seiten. `node tools/verify.cjs` prüft neun Gruppen und baut die eingebettete Home-Vorschau grellwerk-standalone.html. Unter Windows kann NODE_OPTIONS=--preserve-symlinks --preserve-symlinks-main erforderlich sein.

Die Vorschau sendet Cache-Control: no-store. Auch direkte, unversionierte Seitenaufrufe erhalten damit nach dem Neuladen den aktuellen Stand.

## Teamreview und Veröffentlichung

Das Teamreview der Revision 11: CUT prüfte die Gestaltung im Browser, VERIFY Funktionen und Prüfablauf, VOICE die Texte. Die anschließende Überarbeitung der Unterseiten und ihre Prüfungen stehen in [INTERIOR-REVIEW.md](INTERIOR-REVIEW.md). Die behobenen Befunde und Grenzen stehen in [TEAM-REVIEW.md](TEAM-REVIEW.md).

Die Veröffentlichung wurde vom Nutzer beauftragt. Feature-Push und Pull Request durchlaufen den Verify-Workflow; `main` baut und prüft GRELLWERK vor dem Pages-Deploy. Die [öffentliche Website](https://dgruenewald97-arch.github.io/opus-test/) zeigt den letzten erfolgreichen Pages-Deploy.

Ursprünglicher Checkout, früherer Reel-Prototyp und studio-seide bleiben unverändert. Frühere ZIP-Stände sind gesichert.

Revision 13 setzt die Bildentwürfe als native Layouts um: Studiofotografie für Leistungen, Journal und Kontakt; Generator im Einstieg der Spielwiese; animiertes Menü mit durchgehendem Seitenwechsel. Details und Prüfgrenzen: EXPERIENCE-REVIEW.md.
