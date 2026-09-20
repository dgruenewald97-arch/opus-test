# GRELLWERK / Revision 12

20.09.2026. **Lärm, der etwas auslöst.** Ein statisches KI-Agenturkonzept mit vier freien Kampagnenstudien. Diese Revision verbindet Navigation, Bewegung, Kampagnenbilder und Briefing zu einem verständlichen Ablauf.

## Aktueller Aufbau

- Home bleibt der akzeptierte Film-Hero mit den vorhandenen GIFs. Die Einstiege heißen durchgängig **Projekte / Studio / Briefing**.
- Projekte und Cases haben Kapitelnavigation. Kurze Übergänge erhalten die Orientierung; fehlgeschlagene Seitenabrufe lassen den vorhandenen Inhalt benutzbar.
- Studio erklärt zuerst die Zusammenarbeit, anschließend die KI-Personas und Spezialisierungen. Profile werden bewusst ausgewählt, nicht beim bloßen Überfahren.
- Vier neue, zusammengehörig inszenierte Produktfotos ergänzen die bestehenden Markenmotive. Alle vorhandenen GIFs bleiben erhalten. [Kampagnenrichtung und Quellen](docs/CAMPAIGN-DIRECTION.md).
- Das lokale Briefing erstellt eine Vorschau und kopierbaren Text. Nur die Idee ist erforderlich; persönliche Angaben sind optional. Es versendet nichts.
- Bewegungspause, reduzierte Bewegung, Medienersatz, bestehende URLs und Zusatzfunktionen bleiben erhalten.

Die Umsetzung wurde über 30 Agenturrollen bearbeitet. Mehrere Rollen wurden nach Erreichen des Agentenlimits von bestehenden Workern übernommen; dies ist in den Berichten gekennzeichnet. [Teamreview und Nachweise](TEAM-REVIEW.md). Die Website selbst enthält weiterhin kein autonomes Agenten-Backend und behauptet keine echten Kunden oder Kampagnenergebnisse.

## Lokal arbeiten

`START-PREVIEW.cmd` oder `python tools/preview.py --headless --port 8877` startet die Vorschau.

```sh
node tools/build-art-site.cjs
node tools/verify.cjs
npm install --prefix ../qa-runtime --no-package-lock --no-audit --no-fund jsdom@26.1.0
node tools/verify-ux.cjs
```

Der Build erzeugt die Seiten aus `tools/content/` und `tools/lib/chrome.cjs`. `css/ux.css` ist die abschließende Gestaltungsschicht. `js/main.js` verbindet Routen und Historie; `js/projects.js` die Kapitel; `js/briefing.js` den lokalen Briefingfluss. Änderungen gehören in diese Quellen, anschließend in den Build.

## Prüfstatus

Neun bestehende Prüfgruppen und 16 zusätzliche DOM-Verhaltenstests bestanden. Diese Revision ist als Entwurf zur Prüfung vorgesehen: Die lokale Browseransicht war durch die Browserumgebung blockiert. Desktop-, Tablet- und Smartphone-Sichtprüfung sowie echte Medienwiedergabe und Dialog-Fokus bleiben vor der Veröffentlichung offen. Frühere Browsernachweise gelten nicht automatisch für diese Revision.

Feature-Pushes und Pull Requests führen Build und Prüfungen aus; `main` veröffentlicht nach erfolgreichem Workflow über GitHub Pages. `studio-seide/` bleibt unverändert.

## Aktualisierte Veröffentlichungsanweisung

Der Nutzer hat nach Kenntnis der blockierten lokalen Browserprüfung ausdrücklich „Push und Update die Page“ beauftragt. Veröffentlichung erfolgt auf diese Anweisung nach technischen Gates. Die fehlende visuelle Vorabnahme wird nicht als bestanden ausgegeben; die öffentliche Seite wird nach dem Deploy geprüft. Frühere Entwurfs-/Nichtveröffentlichungsnotizen oben beschreiben den vorangegangenen Plan.
