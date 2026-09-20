# HOOK — Video-Einstiege

- **Einstieg beibehalten:** `direction.cjs` kombiniert den akzeptierten Filmhero mit zwei dekorativen Monitor-GIFs. Die vollständige H1 bleibt über `aria-label` verständlich. PROJEKTE führt direkt zu `arbeiten.html`, STUDIO zu `ueber-uns.html`; die Unterzeilen erklären den ersten sinnvollen Klick. Keine zusätzliche Home-Erzählstrecke nötig.
- **Pause semantisch angelegt:** Der native Button trägt Text und `aria-pressed`. `reel.js` pausiert das Video und ersetzt GIFs durch Standbilder, sobald `isPaused()` greift. Die Kopplung an reduzierte Bewegung sowie aktualisierte Buttontexte liegen außerhalb dieser drei Quellen und sind hier nicht bestätigt.
- **Fallback vorhanden, Grenze benennen:** GIF-Fehler wechseln zum Standbild; Videofehler entfernen `is-ready`. Ein abgewiesenes `play()` bleibt ohne eigene Rückmeldung. `motion.cjs` liefert Standbildquellen und konfigurierbare Alternativtexte; deren Aussagekraft hängt vom Aufrufer ab. Navigation und Hero-Text benötigen keine laufenden Medien.

Quellenprüfung; keine visuellen Tests oder Wirkungszahlen.
