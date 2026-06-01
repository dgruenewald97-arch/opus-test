---
description: Rendert Journal-Artikelseiten aus den Daten-Dateien neu (Generator-Lauf).
argument-hint: [slug…] (leer = alle)
---

Führe den Generator aus, um `journal-*.html` aus den Daten in `tools/content/articles/` zu
erzeugen bzw. zu aktualisieren.

1. `node tools/generate.cjs $ARGUMENTS` (ohne Argument: alle Artikel; mit Slugs: nur passende).
2. Danach `node tools/verify.cjs` ausführen.
3. Fasse zusammen: welche Seiten geschrieben wurden und ob das Gate grün ist. Bei roten
   Befunden die Treffer nennen und beheben (z. B. fehlende Grid-/Sitemap-Einträge bei neuen
   Slugs, siehe `.claude/agents/builder.md`).

Hinweis: Der Generator erzeugt nur die Artikelseite — Grid-Karte, Sitemap und Filter-Chip
bleiben manuell und werden vom Verify-Gate erzwungen.
