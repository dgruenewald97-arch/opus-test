# CLAUDE.md

Kurz-Doku für die Arbeit an **{{PROJECT_NAME}}**. Knapp halten, bei Änderungen mitpflegen.
→ Vollständige Referenz: [`AGENTS.md`](AGENTS.md).

## Projekt
- **Stack:** {{STACK}} auf Vite. **Styling:** {{STYLING}}. **Deploy:** {{DEPLOY}}.
- **Features:** {{FEATURES}}.
- Erstellt {{DATE}} mit dem `/new-site`-Wizard.

## Struktur
- `src/` — Anwendungscode. `src/styles/` — `reset.css` → `tokens.css` → App-CSS (in der Reihenfolge laden).
- `public/` — statische Assets (1:1 ausgeliefert).
- `index.html` — Einstieg (Vite). Head-Meta hier bzw. pro Seite pflegen.

## Konventionen
- **Design-Tokens** in `src/styles/tokens.css` (Farben, Typo-Skala, Spacing). **Keine Hardcodes** — immer Tokens.
- Semantisches HTML, eine `<h1>` pro Seite, `prefers-reduced-motion` respektieren.
- Progressive Enhancement: Kernfunktion ohne JS, JS nur als Verbesserung.
- TypeScript bevorzugt; kleine, fokussierte Module.

## Befehle
- Dev: `npm run dev`  · Build: `npm run build`  · Preview: `npm run preview`
- Lint/Format: `npm run lint` / `npm run format`
- Tests: `npm run test`

## Vor dem Push / Launch
- `npm run build` muss grün sein; `npm run lint`.
- `CHECKLIST.md` durchgehen (SEO, a11y, Performance).

## Arbeitsweise
1. Erst planen, an den Konventionen orientieren — Ergebnis muss konsistent zum Rest sein.
2. Auf Feature-Branch entwickeln, nicht ungefragt nach `main`.
3. Diese Datei bei strukturellen Änderungen mitpflegen — nur Fakten.
