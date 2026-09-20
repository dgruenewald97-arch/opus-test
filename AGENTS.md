# GRELLWERK / Projektregeln

Revision 12, 20.09.2026. Der Nutzer hat die früheren Entwürfe gestalterisch abgelehnt. Er stellte K72-HTML bereit und beauftragte eine engere Adaption der Seitenstruktur einschließlich Überarbeitung des ursprünglichen GitHub-Konzepts. Der Nutzer hat den Filmeinstieg der Revision 8 positiv aufgenommen. Revision 10 korrigiert ausdrücklich die Seitenaufteilung: Home nur Hero; die ausführliche Inszenierung gehört auf Projects, About und Cases. KONZEPT.md beschreibt die Richtung. Technische Prüfungen ersetzen keine visuelle Freigabe.

## Grenzen

Vanilla HTML/CSS/JavaScript, bestehende URLs und Zusatzfunktionen bleiben erhalten. GRELLWERK ist ein fiktives KI-Agenturkonzept; keine echten Kunden, Ergebnisse oder laufende autonome Agenten behaupten. studio-seide, ursprünglicher Checkout und Reel-Prototyp bleiben unangetastet. Der Nutzer hat am 20.09.2026 den Teamdurchlauf und die Veröffentlichung auf GitHub beauftragt. Vor der Veröffentlichung Build, Verify und relevante Browserchecks abschließen.

## Umsetzung

- tools/build-art-site.cjs erzeugt die Hauptseiten und aktualisiert die gemeinsame Hülle aller weiteren Seiten.
- tools/content/direction.cjs enthält Home und About-Einstieg; work-view.cjs die Projektkapitel; agency-story.cjs die Crew-Zusammenarbeit; motion.cjs gemeinsames GIF-Markup; agency-view.cjs den Rollenindex. showcase.cjs liefert Cases und Bildmarkup.
- js/reel.js steuert das lokale MP4 und zwei echte GIF-Loops. Pause und reduzierte Bewegung ersetzen alle GIFs durch Standbilder. createMotionLoops lädt zusätzliche GIFs nur bei Sichtbarkeit und pausiert sie außerhalb des Bildbereichs. js/projects.js steuert das Öffnen der Projektbilder per IntersectionObserver; js/studio.js verbindet Menü, Bewegungspause und CUT-Demo. js/main.js steuert Routen und Browserhistorie.
- css/home.css gestaltet den Film-Hero. css/editorial.css gestaltet Projects, die About-Erweiterung und Case-GIFs. css/about.css setzt die Porträtserie und den Rollenindex um. css/direction.css definiert die bestehende Hülle und den Hero. Gemeinsame Navigation und Footer stammen aus tools/lib/chrome.cjs.
- Home beginnt mit dem akzeptierten Hero mit drei typografischen Zeilen, zwei GIF-Loops im Monitor und zwei großen Einstiegen. Home enthält keine weiteren Inhaltsabschnitte und keinen sichtbaren Footer. Das Vollbildmenü hält die Zusatz- und Rechtsseiten erreichbar. Der frühere manuelle Kampagnenwähler ist durch den beauftragten Reel ersetzt.
- Projects hat vier große Markenkompositionen mit GIF oder Markenmotiv plus Bild und Konzepttext. Mobil stehen Bühne und Bild/Text-Zeile untereinander. Tastaturfokus muss einen lesbaren Projektaufruf liefern.
- Der Nutzer hat fiktive Personenporträts mit sichtbarem KI-Charakter ausdrücklich beauftragt. Alle zwölf Agents haben eine eigene synthetische Persona in assets/agents. Nicht als reale Mitarbeiter ausgeben. Kein Aktivitätsfeed oder Live-Agentenstatus.
- CUT ist Designkritik, VERIFY Funktionsprüfung. Rollen-Links, Filter und mobile Akkordeons erhalten.
- Die HTML/CSS/JavaScript-Quellen von K72 dienten zur Analyse. Keine K72-Filme, Fotos, Logos, Schriftdateien oder Tracking-Skripte übernehmen.

## Prüfung

node tools/build-art-site.cjs
node tools/verify.cjs

Browserprüfung: Desktop, Tablet, Smartphone, kurze Klickfolgen, Zurück/Vorwärts, Menü per Escape/Tastatur, Rollen-Deep-Links, Pause, reduzierte Bewegung, Bild-, Video- und GIF-Ausfall. Bei per DOMParser geladenen Seiten die Videomedien mit load() initialisieren. tools/qa-server.py injiziert Fehler ausschließlich für lokale Prüfungen.

Versionsparameter für geänderte Module und Styles konsistent halten, einschließlich Standalone-Build. Bei optischen Fehlern zuerst prüfen, dass tatsächlich der aktuelle Build geladen ist.

## Revision 12

Durchgängige Navigation: Projekte / Studio / Briefing. Studio erklärt den Ablauf vor den Porträtbühnen. `css/ux.css` ist die letzte Gestaltungsschicht. Der Router lädt zuerst und verwendet kurze Überblendungen statt Übergangsvorhang/Bildmorph. `js/briefing.js` verwaltet Vorschau und Kopieren ohne Versand. `node tools/verify-ux.cjs` ergänzt die bestehenden Gates; Einrichtung steht in README.md. Die Browserpflicht oben bleibt bestehen: Ein Entwurfs-PR ist keine visuelle Freigabe und kein Live-Deploy.
