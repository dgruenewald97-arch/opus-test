# VERIFY — Funktionsprüfung

Stand: 20. September 2026. Geprüfte Quellen: `js/main.js`, `js/team.js`, `js/studio.js`, `js/briefing.js`, `js/projects.js`.

## Ergebnis

13/13 ausführbare DOM-Verhaltensprüfungen bestanden. Im geprüften Umfang kein P1-Funktionsfehler gefunden. Produktcode und Produktionsabhängigkeiten wurden durch VERIFY nicht verändert.

`tools/verify-ux.cjs` führt die echten Quellmodule in jsdom aus. Importanweisungen werden für die isolierte Ausführung entfernt; bei Routertests sind Seiteninitialisierer ersetzt, bei Studio-Tests die Mediencontroller. Die Funktionen und Eventhandler des jeweils geprüften Moduls bleiben echter Produktcode. Tests prüfen beobachtbares Verhalten und sind keine String-Suchtests.

Geprüft:

- Schnelle Routenklicks: AbortSignal gesetzt, verspätete Antwort kann neue Route nicht überschreiben.
- Gleichseitiger Ankerklick bricht laufenden Seitenabruf ab und fokussiert sein Ziel.
- Ladefehler erhält bisheriges DOM, URL und History; nativer Wiederholungslink erscheint.
- Zurücknavigation über Seiten hinweg und innerhalb eines Dokuments stellt gespeicherte Scrollposition wieder her.
- Unterbrechung während Aus- und Einblendung beendet die alten Animationshandles ohne hängenden Ladezustand.
- Clipboard-Ablehnung meldet keinen Erfolg, markiert Vorschautext zur manuellen Kopie; reine Leerzeichen bleiben ungültig.
- Doppeltes Absenden erzeugt keinen doppelten Schreibaufruf; Änderungen während Kopieren werden als neuere Fassung ausgewiesen.
- Briefing-Cleanup verhindert verspäteten Fokus und Statusänderungen nach Abbau.
- Projektpause und Tastaturfokus öffnen die Projektbilder; Cleanup trennt Observer.
- Kapitelmarkierung folgt kontrollierter Geometrie und verändert den Viewport nicht.
- Team-Deep-Link, Filter und Pfeiltastenauswahl synchronisieren Profile, Auswahl und URL.
- Bewegungspause wird gespeichert; Menü pausiert Medien; erneute Seiteninitialisierung zerstört alte Controller und entfernt alte Toggle-Listener.

## Ausführen

Im Repository:

```sh
npm install --prefix ../qa-runtime --no-package-lock --no-audit --no-fund jsdom@26.1.0
node tools/verify-ux.cjs
```

Alternativer vorhandener Installationsort: `QA_NODE_MODULES=/absoluter/pfad/node_modules node tools/verify-ux.cjs`.

Die Testabhängigkeit liegt außerhalb des Repositorys. Für diese Prüfung kein Build oder Webserver erforderlich. Ergänzend gelten die bestehenden Build-/Verify-Gates.

## Grenzen

Keine Browser- oder visuelle Freigabe: Browserzugriff auf localhost und lokale Dateien wurde durch die Browserpolicy blockiert. Es wurde kein anderer Browser gestartet, um diese Grenze zu umgehen.

jsdom hat kein echtes Layout, Rendering, Video-/GIF-Decoding, nativen Dialog-Fokus oder Clipboard. Geometrie, Web Animations API, IntersectionObserver und Clipboard werden kontrolliert simuliert. Die Tests bestätigen State-, Event-, Cleanup- und Race-Verhalten, nicht reales Scroll-Timing, Pixelpositionen, Performance oder Medienwiedergabe. Die spätere Integration erhält auch bei fehlgeschlagenem Popstate-Abruf die sichtbare Seite und bietet einen nativen Wiederholungslink. Responsive Ansichten, reale GIF-Pause, Medienausfälle und Escape-/Fokusverhalten des Browserdialogs bleiben ohne Browserlauf unbestätigt.

## Integrationsnachtrag durch AURA

Final 16/16 Tests erfolgreich. Drei zusätzliche Regressionen: Fokus am seitenübergreifenden Fragmentziel; DOM-Erhalt und URL-Recovery bei fehlgeschlagenem Popstate; Kapitelziel nach Rollenwahl mit bestehendem agent-Queryparameter. Die Grenzen der simulierten Browserumgebung gelten unverändert.
