# FRONT — Oberflächen

- `css/ux.css` definiert den festen Header mit 80px, bis 700px Breite mit 104px und zwei Navigationszeilen. `tools/lib/chrome.cjs` liefert stabile Beschriftungen und lädt `ux.css?v=12` zuletzt: additive Integration ist im Generator angelegt. Wechselwirkungen mit älteren Regeln bleiben visuell zu prüfen.
- `js/main.js` lässt die aktuelle Seite während des Ladens stehen und animiert nur `main` mit 140ms Ausblendung und 240ms Einblendung; die Navigation bleibt bestehen. Reduzierte Bewegung und Bewegungspause überspringen diese Animation.
- **Höchstes Funktionsrisiko:** Seitenübergreifende Hash-/Agent-Deep-Links scrollen zum Ziel, fokussieren anschließend jedoch stets `main`. Zielbezogenen Fokus nach dem Routenwechsel ergänzen; bei Historiennavigation bewusste Fokusstrategie erhalten. Gleichseitige Hash-Links setzen bereits Zielfokus. Header-/Kapitelabstände sind per Scroll-Padding vorgesehen, tatsächlich sichtbare Ziele bleiben zu prüfen.

Quellenreview gemäß `AGENTS.md` und `tools/content/site.cjs`; keine Messung, Browserprüfung oder visuelle Freigabe.
