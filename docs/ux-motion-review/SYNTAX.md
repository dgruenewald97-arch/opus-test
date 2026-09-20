# SYNTAX · Briefing-Werkbank

Die Kontaktseite strukturiert eine lokale Projektidee. Nur die Idee ist Pflicht; Ziel, Unternehmen, Name und E-Mail bleiben freiwillig. Die beschriftete, schreibgeschützte Textvorschau wird aus FormData aktualisiert und bleibt manuell kopierbar. Ein höflicher Live-Status bestätigt ausschließlich erfolgreiches Clipboard-Schreiben. Bei fehlender Berechtigung oder API wird die Vorschau ausgewählt und eine konkrete Kopieranleitung angezeigt. Änderungen während eines laufenden Kopiervorgangs werden in der Erfolgsmeldung berücksichtigt.

`initBriefing(main)` liefert eine Cleanup-Funktion für Routenwechsel. Bekannte Projektparameter werden über eine feste Zuordnung kanonisiert; unbekannte Werte werden ignoriert. Herkunftstexte nutzen textContent. Es gibt weder Netzwerkanfragen noch Browser-Speicher oder Versand. Vor der Initialisierung ist der Kopierbutton kein Submit-Button.

Prüfung: JavaScript-Modul und Generator bestehen Node-Syntaxprüfungen. Pflichtfelder, Labels, Vorschau und Fehlerpfad wurden anhand der Quellen geprüft. Build und Integration übernimmt die Hauptinstanz. Browserprüfung bleibt wegen der vorgegebenen Policy-Sperre offen; sie wurde nicht umgangen. Clipboard-Verhalten, mobile Textauswahl und Screenreader-Ausgabe benötigen deshalb noch echte Interaktionsprüfung.
