# SPEED · Ladezeiten

- **GIFs ausdrücklich behalten.** `tools/content/motion.cjs` startet mit WebP-Standbildern, festen Abmessungen und Lazy Loading. `js/reel.js:createMotionLoops` setzt GIF-Quellen erst bei Sichtbarkeit; außerhalb des Bildbereichs, bei Pause oder verborgenem Dokument kehren Standbilder zurück. Der Reel pausiert zusätzlich sein Video.
- **Responsive Bilder und Hero-Priorität bestehen.** `tools/content/showcase.cjs:visual` liefert 800-/1536-Breiten, für KOLD zusätzlich ein mobiles Motiv. Case-Heros erhalten `fetchpriority="high"`; weitere Bilder laden lazy. Daraus folgt keine Aussage über die aktuelle Home-Hero-Priorität.
- **Höchstes Quellenrisiko:** `visual` meldet reguläre Bilder mit `sizes="100vw"`. `tools/content/work-view.cjs` verwendet diese Bilder innerhalb der Projektkomposition neben einer Bühne. Bei schmalerer Darstellung kann die Auswahl größer als nötig ausfallen; auch Szenen verwenden großzügige Größenangaben. Tatsächliche Auswahl und Ladeauswirkung bleiben ungeprüft.

Reine Quellenprüfung; keine Performancewerte erhoben, keine neuen Optimierungsfeatures vorgeschlagen.
