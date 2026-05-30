#!/usr/bin/env bash
# SessionStart-Hook: macht das Projekt für Claude (auch on-the-web) sofort arbeitsfähig.
# Schnell halten (<5s soweit möglich). Schreibt Status als additionalContext nach stdout.
set -euo pipefail
cd "${CLAUDE_PROJECT_DIR:-.}"

notes=""

if [ -f package.json ]; then
  if [ ! -d node_modules ]; then
    notes+="Installiere Dependencies… "
    if [ -f package-lock.json ]; then npm ci --no-audit --no-fund >/dev/null 2>&1 || npm install --no-audit --no-fund >/dev/null 2>&1 || true
    else npm install --no-audit --no-fund >/dev/null 2>&1 || true; fi
    notes+="fertig. "
  else
    notes+="Dependencies vorhanden. "
  fi
  # Lint nur melden, nie blockieren
  if npm run --silent lint >/dev/null 2>&1; then notes+="Lint OK. "; else notes+="Lint: siehe 'npm run lint'. "; fi
else
  notes+="Kein package.json gefunden. "
fi

branch="$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo '-')"
notes+="Branch: ${branch}."

# JSON-Ausgabe mit additionalContext (plain stdout ginge auch, aber so explizit).
printf '{"hookSpecificOutput":{"hookEventName":"SessionStart","additionalContext":"%s"}}\n' "$notes"
