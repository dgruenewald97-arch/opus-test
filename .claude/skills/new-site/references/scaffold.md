# Scaffold-Playbook

Detaillierte Schritte, auf die `SKILL.md` (Schritt 4) verweist. Alle Pfade relativ zum
Skill-Ordner `.claude/skills/new-site/`. Führe Befehle non-interaktiv aus.

## 1. Vite-Projekt anlegen
```bash
# <slug> = Projektname, <template> aus dem Mapping in SKILL.md
npm create vite@latest <slug> -- --template <template>
cd <slug>
```
Astro-Ausnahme:
```bash
npm create astro@latest <slug> -- --template minimal --no-install --no-git --yes
```

## 2. Styling integrieren
- **Design-Tokens + plain CSS** (Default, portabel — destilliert aus bewährten Mustern):
  - `assets/tokens.css` → `src/styles/tokens.css`
  - `assets/reset.css`  → `src/styles/reset.css`
  - In Entry-CSS bzw. `main.ts` importieren (Reihenfolge: reset → tokens → app).
- **Tailwind**: `npm i -D tailwindcss @tailwindcss/vite`, Plugin in `vite.config`, `@import "tailwindcss";` in der Entry-CSS. Tokens optional als `@theme` ergänzen.
- **CSS Modules**: bei Vite eingebaut — Konvention `*.module.css`; Tokens-Asset trotzdem als globale Basis kopieren.
- **UnoCSS**: `npm i -D unocss`, Vite-Plugin + `virtual:uno.css`-Import.

## 3. AI-Doku
- `assets/CLAUDE.md` → `<slug>/CLAUDE.md`, Platzhalter füllen.
- `assets/AGENTS.md` → `<slug>/AGENTS.md`, Platzhalter füllen.
Halte beide knapp und faktenbasiert; trag die getroffenen Wahl-Entscheidungen ein.

## 4. Claude-Code-Setup im neuen Projekt
- `assets/settings.json`     → `<slug>/.claude/settings.json`
- `assets/session-start.sh`  → `<slug>/.claude/hooks/session-start.sh` (`chmod +x`)
Die `session-start.sh` installiert fehlende Deps und meldet Lint/Build-Status — sorgt dafür,
dass Claude-on-the-web direkt arbeitsfähig ist.

## 5. Tooling (nur Gewähltes)
- **ESLint + Prettier**: `npm i -D eslint prettier`; `assets/eslint.config.js` → Root,
  `assets/prettierrc.json` → `.prettierrc.json`. Scripts ergänzen:
  `"lint": "eslint ."`, `"format": "prettier --write ."`.
- **TypeScript strict**: in `tsconfig.json` `"strict": true` (+ `noUncheckedIndexedAccess`).
- **Vitest**: `npm i -D vitest`; Script `"test": "vitest run"`; Beispiel `src/example.test.ts`.
- **Playwright**: `npm i -D @playwright/test`; `npx playwright install --with-deps chromium`;
  Minimal-Smoke-Test in `e2e/`.
- **Husky + lint-staged**: `npm i -D husky lint-staged`; `npx husky init`;
  pre-commit → `npx lint-staged`; `lint-staged`-Config für `*.{ts,css,html}`.
- **Lighthouse-CI**: `npm i -D @lhci/cli`; Hinweis in README (Budget-Datei optional).

## 6. CI / Deploy
- **GitHub Pages**: `assets/deploy-pages.yml` → `.github/workflows/deploy-pages.yml`.
  In `vite.config` `base: '/<repo>/'` setzen (oder Custom-Domain → `base: '/'`).
- **Vercel/Netlify/Cloudflare**: keine Workflow-Datei nötig (Git-Integration); kurzen
  Abschnitt in die README mit Build-Command `npm run build` + Output `dist`.

## 7. Restdateien
- `assets/gitignore`         → `<slug>/.gitignore`
- `references/checklist.md`  → `<slug>/CHECKLIST.md`

## 8. Verifizieren
```bash
cd <slug>
npm install
npm run build      # muss grün sein
npm run lint || true
```
Bei Fehlern: melden, nicht stillschweigend übergehen.

## Feature-Hinweise
- **SEO/OG-Meta**: `<head>`-Block mit title/description/OG/Twitter + `lang`-Attribut; bei
  Astro/SSR pro Seite, bei SPA via Head-Management oder statisch in `index.html`.
- **Dark-Mode**: `tokens.css` enthält bereits `prefers-color-scheme`; optional Toggle, der
  `data-theme` auf `<html>` setzt + `localStorage` (guarded).
- **Kontaktformular**: progressiv (funktioniert ohne JS), JS nur für Inline-Validierung;
  kein Backend hart verdrahten — Endpoint als `.env`-Platzhalter.
- **Markdown-Content**: Astro nativ; sonst `unplugin`/`vite-plugin-md` oder `marked`.
- **i18n**: leichtgewichtig (eigene Dictionary-Map) bevor schwere Libs; `lang`/`hreflang` setzen.
- **PWA**: `vite-plugin-pwa` als Gerüst (Manifest + SW), nicht aktiv ohne Wunsch.
