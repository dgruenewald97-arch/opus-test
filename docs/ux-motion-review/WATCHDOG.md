# WATCHDOG – Verfügbarkeit

Quellenreview vom 20.09.2026; keine Laufzeit-, Monitoring- oder Verfügbarkeitsmessung.

- **Routefetch:** `js/main.js`, `loadPage()`/`navigate()`: HTTP-/Markupfehler und 10-Sekunden-Abbruch zeigen bei normaler Navigation Rückmeldung samt erneutem Öffnen; bestehender Inhalt bleibt stehen. Höchstes Risiko: Bei fehlgeschlagenem Zurück/Vorwärts lädt `location.assign()` vollständig neu. Bei anhaltendem Ausfall kann damit auch die nutzbare aktuelle Ansicht verloren gehen.
- **Medienfallback:** `js/reel.js`, `createReel()`/`createMotionLoops()`: GIF-Fehler wechseln zum Standbild; Video-Fehler entfernen `is-ready`, `video.load()` initialisiert eingefügte Medien. Ein ebenfalls fehlendes Standbild erhält hier keinen weiteren Ersatz; abgelehnte `play()`-Promises werden still verworfen.
- **Prüfgrenze:** `tools/verify.cjs` prüft Syntax, lokale Referenzen, Metadaten, gemeinsame Hülle, Journal-Konsistenz, Standalone-Build und delegierte Inhalts-/Assetverträge. Es führt keine Browsernavigation, Fetch-Fehlerinjektion oder Medienwiedergabe aus. Ein grünes Gate belegt daher weder funktionierende Ausfallansichten noch Host-Verfügbarkeit. Die vorgeschriebenen Browserfehlerchecks bleiben erforderlich.
