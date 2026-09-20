# Teamreview / Revision 12

20.09.2026. Ziel: durchgängiger Weg vom Filmeinstieg über Projekte und Arbeitsweise zum lokalen Briefing. Alle 30 Agenturrollen sind mit Beiträgen in [docs/ux-motion-review](docs/ux-motion-review) vertreten. Es waren 23 eigenständige Unteragenten plus AURA als Integration beteiligt; 30 Rollen bedeuten hier nicht 30 getrennte laufende Agenten. LINK dokumentiert die Bündelung nach Erreichen des Thread-Limits. Die öffentliche Website bleibt statisch.

## Umgesetzte Befunde

- CUT, GRID und VOICE: einheitliche Navigation, stabile Menübeschriftungen, klare primäre Einstiege, Arbeitsweise vor Rollenporträts.
- MOTION und FRONT: kurze Übergänge, Kapitelmarkierung ohne erzwungenes Scrollen, korrekter Tastaturfokus auch nach einem Seitenwechsel zu einem Anker.
- SYNTAX und FORM: lokales Briefing mit Vorschau, optionalen persönlichen Angaben, ehrlicher Clipboard-Rückmeldung und manueller Kopiermöglichkeit.
- WATCHDOG und VERIFY: unterbrechbare Navigation, verspätete Antworten ohne Überschreiben neuer Inhalte, benutzbare Seite auch nach fehlgeschlagener Zurücknavigation.
- VECTOR, PROMPT und VISUAL: vier neue Produktfotos mit zusammengehöriger Bildsprache je Marke; KOLD bleibt gelb, NEON lime. BLITZ bekommt ein ruhiges Motiv ohne eingebrannte große Überschrift.
- SPEED: zwei WebP-Größen und passend deklarierte Bildbreiten. Keine behaupteten Lighthouse-Werte.
- COMPLY: sichtbare KI-Persona-Kennzeichnung auch an Prozessporträts. Keine Rechtsfreigabe behauptet.
- SCOUT: konkrete Stockquellen und Kandidaten dokumentiert. Vorhandene GIFs bleiben erhalten; neue Kandidaten wurden nicht als Film integriert.

Weitere Rollenberichte liefern Strategie, Messfragen, Inhalte und Freigabekriterien. Sie sind fachliche Empfehlungen, keine erfundenen Nutzerstudien oder Kampagnendaten. Frühe Einzelberichte beziehen sich teilweise auf einen Zwischenstand; die obige Liste und der finale Prüfstatus beschreiben die Integration.

## Nachweise

- `node tools/build-art-site.cjs`: erfolgreich.
- `node tools/verify.cjs`: alle neun Gruppen erfolgreich, einschließlich lokaler Referenzen und Standalone-Build.
- `node tools/verify-ux.cjs`: 16/16 erfolgreich. VERIFY schrieb 13 Tests; AURA ergänzte drei Regressionstests für seitenübergreifenden Ankerfokus, fehlgeschlagene Historiennavigation und Kapitelwechsel nach Rollenwahl.
- `git diff --check`: erfolgreich. `studio-seide/` ohne Änderungen.
- Neue generierte Fotos einzeln visuell geprüft; dies ist keine Layoutprüfung der eingebauten Seiten.

## Offene visuelle Abnahme

Die bisher veröffentlichte Seite wurde im Browser betrachtet. Die neue lokale Revision konnte wegen der Browserpolicy weder über localhost noch als lokale Datei geladen werden. Die Grenze wurde nicht umgangen. jsdom simuliert Geometrie und Browser-APIs; es bestätigt Zustände, Events und Cleanup, aber keine realen Pixelpositionen, Dialog-Fokusfallen, GIF-Wiedergabe oder Performance.

Vor Veröffentlichung: Desktop, Tablet und Smartphone; kurze Klickfolgen, Zurück/Vorwärts, Menü/Escape/Tastatur, Rollen-Deep-Links, Pause, reduzierte Bewegung und Medienausfälle im echten Browser prüfen. Insbesondere Hero-Bildausschnitte und sticky Kapitel unter dem mobilen Header ansehen. Der Pull Request bleibt bis zur Abnahme ein Entwurf; kein Merge oder Live-Deploy gehört zu diesem Arbeitsstand.

## Aktualisierte Veröffentlichungsanweisung

Der Nutzer hat nach Kenntnis der blockierten lokalen Browserprüfung ausdrücklich „Push und Update die Page“ beauftragt. Veröffentlichung erfolgt auf diese Anweisung nach technischen Gates. Die fehlende visuelle Vorabnahme wird nicht als bestanden ausgegeben; die öffentliche Seite wird nach dem Deploy geprüft. Frühere Entwurfs-/Nichtveröffentlichungsnotizen oben beschreiben den vorangegangenen Plan.
