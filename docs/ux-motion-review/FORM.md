# FORM · Formularprüfung

- `js/briefing.js`: Vorschau entsteht lokal aus getrimmten Formulardaten. `reportValidity()` prüft vor dem Kopieren Pflichtidee und optionale E-Mail; reine Leerzeichen erhalten eine eigene Fehlermeldung. Kein Netzwerkaufruf oder Backendversprechen erkennbar.
- `tools/build-art-site.cjs`: Kontakt erklärt Fiktion, lokale Verarbeitung, freiwillige persönliche Angaben und fehlenden Versand. Labels, Pflichtfeldhinweis, schreibgeschützte Vorschau und `role="status"` mit höflicher Live-Ausgabe sind vorhanden. Der Button heißt zutreffend „Briefing kopieren“ und wird erst nach Initialisierung zum Submit-Button.
- `js/briefing.js`: Während des Kopierens ist der Button deaktiviert; Erfolg bestätigt ausdrücklich fehlenden Versand. Clipboard-Fehler fokussieren und markieren die Vorschau mit konkreter Kopieranleitung. Änderungen während des Kopierens erhalten einen Versionshinweis statt einer irreführenden Erfolgsmeldung.

Kein belegter funktionaler Fehler bei statischer Sichtung. Tastatur-, Browser- und Screenreaderverhalten hier nicht geprüft.
