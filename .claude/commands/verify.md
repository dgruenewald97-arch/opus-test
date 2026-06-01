---
description: Führt das GRELLWERK-Verify-Gate aus und fasst das Ergebnis zusammen.
---

Führe `node tools/verify.cjs` aus und berichte das Ergebnis knapp:

- Liste je Prüfung ✓/✗ (JS-Syntax, Meta-Attribute, rohe `<`, Links/Assets, Pflicht-Meta,
  Chrome-Drift, Journal/Sitemap, Build-Smoke).
- Bei roten Befunden: die konkreten Treffer (Datei:Zeile) nennen und einen Fix vorschlagen
  bzw. — wenn eindeutig — direkt beheben und erneut prüfen.
- Bei grünem Gate: kurz bestätigen.

Das Gate ist Pflicht vor jedem Commit/Push. Es läuft zusätzlich in CI
(`.github/workflows/verify.yml`) und lokal als Stop-Hook, wenn HTML/JS/CSS geändert wurden.
