#!/usr/bin/env bash
# Stop-Hook-Wächter: läuft das Verify-Gate NUR, wenn GRELLWERK-Quellen (HTML/JS/CSS)
# gegenüber HEAD geändert wurden. So bleibt es auf reinen Chat-/Doku-Turns still und
# wird zum echten Gate, sobald die Site angefasst wurde. Nicht-Null-Exit blockt das
# Beenden und gibt den Report an Claude zurück (→ erst fixen, dann fertig).
cd "$(dirname "$0")/../.." || exit 0
changed=$(git diff --name-only HEAD -- '*.html' js css 2>/dev/null)
if [ -n "$changed" ]; then
  node tools/verify.cjs
fi
