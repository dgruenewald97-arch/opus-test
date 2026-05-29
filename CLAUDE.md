# CLAUDE.md

Kurz-Doku für die Arbeit in diesem Repo. **Knapp halten, bei Änderungen mitpflegen.**

## Repo-Struktur
- **GRELLWERK** (Repo-Root) = Hauptprojekt. Build-less Vanilla HTML/CSS/JS, brutalistische
  Fake-Agentur, eine Single-Page (`index.html`).
- **`studio-seide/`** = Nebenprojekt (Vite + React, Friseur-Salon). Nicht anfassen, außer
  ausdrücklich gewünscht.

## GRELLWERK — Konventionen (wichtig fürs „passt zum Rest"-Gefühl)
- **Sektionen** leben alle in `index.html`. Muster pro Sektion:
  `<section class="section <name>" id="<id>" data-guide-step="<id>">` → `.container` →
  `.eyebrow`-Label → `<h2 data-reveal>` → Items mit `data-reveal`.
- **Design-Tokens** in `css/tokens.css` (Farben `--ink/--paper/--acid/--shock/--electric/--warn`,
  `--font-display/-ui/-mono`, `--step-*`, `--border`, `--shadow-block`). Keine Hardcodes —
  immer Tokens nutzen.
- **Wiederverwendbar:** `.btn`/`.btn--ghost`/`.btn--big`, `.tag`, `.block`, `.marquee`, `.eyebrow`.
  Layout pro Sektion in `css/sections.css` (Block-Kommentar-Stil beibehalten).
- **Effekte über `data-*`:** `data-reveal` (Fade-in), `data-scramble` (Nav-Hover),
  `data-count`/`data-suffix` (Zähler). Logik in `js/effects.js`, `js/scroll.js`.
- **Inhalte/Tour zentral** in `js/config.js`: `GUIDE_STEPS`, `QUIPS`. Neue Sektion → dort
  Eintrag ergänzen (Guide-Schrittzähler ist automatisch via `GUIDE_STEPS.length`).
- **Neues JS-Modul** → in `js/main.js` `boot()` einbinden UND in `build-standalone.cjs`
  zur Concat-Liste hinzufügen, sonst fehlt es im Standalone-Build.
- Graceful Degradation (System-Fonts, IO-Fallbacks) + `prefers-reduced-motion` respektieren.

## Befehle
- Dev: `python3 -m http.server 8000` (Root) → http://localhost:8000
- Standalone-Build: `node build-standalone.cjs` → `grellwerk-standalone.html`
- Salon: in `studio-seide/`: `npm run dev` / `npm run build`
- JS-Syntaxcheck: `node --check js/<datei>.js`

## Verifikation
Hier ist **kein Headless-Browser** verfügbar (Chromium-Download durch Netz-Allowlist
geblockt). Visuelle Kontrolle läuft über den User: Standalone-Datei öffnen oder
Pages-Preview. Vor dem Pushen: `node --check` + `node build-standalone.cjs`.

## Deploy
GitHub Pages baut **nur aus `main`** (`.github/workflows/deploy-pages.yml`). GRELLWERK im
Root, STUDIO SEIDE unter `/studio-seide/`. Feature-Branch wird nicht deployt — erst nach Merge.

## Arbeitsweise (vereinbart)
1. **Erst planen**, an obigen Konventionen orientieren, Ergebnis muss optisch zum Rest passen.
2. Auf dem zugewiesenen Feature-Branch entwickeln; nicht ungefragt nach `main` pushen.
3. **Diese Datei bei strukturellen Änderungen mitpflegen** — tokensparend, nur Fakten.
