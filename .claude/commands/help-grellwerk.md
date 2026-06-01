---
description: Listet alle GRELLWERK-Commands, Tools und Agenten auf einen Blick (Einstieg je Session).
---

Gib dem Nutzer eine kompakte Übersicht des GRELLWERK-AI-Systems aus. Lies bei Bedarf
`docs/AI-WORKFLOW.md` für Details, aber halte die Antwort knapp und scanbar.

## Slash-Commands
- **/help-grellwerk** — diese Übersicht.
- **/neuer-artikel** `<thema>` — voller Orchestrierungs-Ablauf: parallele Recherche → Daten →
  Generator → Grid/Sitemap → Verify. Erzeugt einen Journal-Artikel mit Mehrwert.
- **/seite-generieren** `[slug…]` — rendert Artikel-Seiten aus vorhandenen Daten in
  `tools/content/articles/` neu (Generator-Lauf).
- **/verify** — führt das Verify-Gate aus und fasst das Ergebnis zusammen.

## Tools (`tools/`)
- `node tools/verify.cjs` — Verify-Gate: JS-Syntax, kaputte Meta-Attribute, rohe `<`, tote
  Links/Assets, Pflicht-Meta, Chrome-Drift, Journal/Sitemap-Konsistenz, Build-Smoke.
- `node tools/generate.cjs [slug…]` — generiert `journal-*.html` aus Daten-Dateien.
- `tools/lib/chrome.cjs` — zentrale nav/head/footer/brummer-Bausteine (Single Source).
- `tools/lib/figures.cjs` — Diagramm-Bibliothek: `matrix · pyramid · layers · hbars · stackBar
  · funnel · triangle · curve`.
- `tools/content/articles/*.cjs` — je Artikel eine Daten-Datei (`_example.cjs` = Vorlage).

## Agenten (`.claude/agents/`)
- **researcher** — Web-Recherche (Fakten+Quellen, Gegen-These, Rechenbeispiel, Framework, Checkliste).
- **builder** — baut Seiten über den Generator (nie HTML klonen).
- **reviewer** — prüft Diff gegen Konventionen + Verify-Gate.

## Playbook
`docs/AI-WORKFLOW.md` — wie man mit KI das beste Ergebnis erzielt (Orchestrierung,
Mehrwert-Anatomie, Gate-Regeln, „generieren statt klonen").

> Bei neuem Command/Tool/Agent: diese Liste **und** `docs/AI-WORKFLOW.md` mitpflegen.
