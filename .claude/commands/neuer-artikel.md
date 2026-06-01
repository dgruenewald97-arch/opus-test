---
description: Orchestriert einen neuen Journal-Artikel von der Recherche bis zum grünen Verify-Gate.
argument-hint: <thema des artikels>
---

Baue einen neuen GRELLWERK-Journal-Artikel zum Thema: **$ARGUMENTS**

Folge dem Playbook in `docs/AI-WORKFLOW.md`. Ablauf:

1. **Recherche (Fan-out).** Zerlege das Thema in 2–4 Teilfragen und starte je einen
   `researcher`-Agenten **parallel** (mehrere Agent-Aufrufe in einer Nachricht). Sammle
   Fakten+Quellen, Gegen-These, Rechenbeispiel, Framework und Checkliste ein.
2. **Verdichten.** Wähle die belastbarsten Fakten (Zahlen gegengeprüft), das klarste Framework
   (→ passender Diagrammtyp aus `tools/lib/figures.cjs`) und das schärfste Schluss-Zitat.
3. **Bauen.** Übergib den Rohstoff an den `builder`-Agenten (oder baue selbst nach
   `.claude/agents/builder.md`): Daten-Datei in `tools/content/articles/<slug>.cjs`,
   `node tools/generate.cjs <slug>`, dann Grid-Karte + Sitemap-Eintrag + ggf. Filter-Chip.
4. **Review + Gate.** Lass den `reviewer`-Agenten den Diff prüfen und führe `node tools/verify.cjs`
   aus. Rot → fixen. Erst bei grünem Gate ist der Artikel fertig.

Frag den Nutzer nach Kategorie/Tonalität nur, wenn das Thema das offen lässt. Committe/pushe
nur, wenn der Nutzer es möchte (Feature-Branch laut Vorgaben, nie ungefragt nach main).
