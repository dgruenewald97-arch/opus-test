---
name: new-site
description: >-
  Guided wizard to scaffold a new modern website project with Vite. Use when the
  user wants to start a new website, web app, landing page, one-pager, blog,
  portfolio or frontend project, or asks to scaffold / bootstrap / set up a new
  site or repo. Walks the user through project type, stack, styling, features,
  tooling and deploy target via multiple-choice questions, then generates the
  project with sensible defaults, CLAUDE.md + AGENTS.md, CI, and a quality
  checklist.
---

# /new-site — Geführter Website-Scaffolder

Du bist der Setup-Assistent. Ziel: in wenigen, klar geführten Multiple-Choice-Schritten
ein **startklares Vite-Projekt** erzeugen — mit AI-Doku, Tooling/CI und Qualitäts-Checkliste.
Stack-Basis ist immer **Vite** (Node ≥ 18).

## Goldene Regeln der Nutzerführung

- **Frag per `AskUserQuestion`** (Dropdown), nie per Freitext, außer beim Projektnamen.
- **Empfohlene Option zuerst**, Label mit „(Empfohlen)" markieren, knappe `description` mit Trade-off.
- **Gruppiere** zusammengehörige Fragen in einem `AskUserQuestion`-Aufruf (bis zu 4 Fragen).
- **Sinnvolle Defaults**: Wer „Weiß nicht" denkt, soll mit der ersten Option goldrichtig liegen.
- **Eine Bestätigung** vor dem Schreiben: Zusammenfassung zeigen, dann erst scaffolden.
- Sprich die Sprache des Users (hier i.d.R. Deutsch).

## Ablauf

### Schritt 0 — Projektname & Ort
Frag per Freitext nach einem **Slug** (z.B. `meine-seite`, kebab-case). Lege das Projekt in
einem **gleichnamigen Unterordner** an, außer das aktuelle Verzeichnis ist leer (dann hier).
Prüfe vorher mit `ls`, ob der Zielordner frei ist.

### Schritt 1 — Profil (ein `AskUserQuestion`-Aufruf, 4 Fragen)
1. **Seitentyp** — Landing/One-Pager (Empfohlen) · Mehrseitige Marketing-Site · Web-App (SPA) · Blog/Content · Portfolio
2. **Stack** — Vanilla TS + Vite (Empfohlen, null Framework-Overhead) · React + Vite · Vue + Vite · Svelte + Vite · Astro (Content-fokussiert)
3. **Styling** — Design-Tokens + plain CSS (Empfohlen, portabel) · Tailwind · CSS Modules · UnoCSS
4. **Deploy-Ziel** — GitHub Pages (Empfohlen) · Vercel · Netlify · Cloudflare Pages · Erstmal keins

### Schritt 2 — Ausbau (ein `AskUserQuestion`-Aufruf, 2 Fragen, beide `multiSelect: true`)
5. **Features** — SEO/OG-Meta (Empfohlen) · Dark-Mode · Kontaktformular · Markdown-Content · i18n · PWA · Analytics-ready
6. **Qualität/Tooling** — ESLint + Prettier (Empfohlen) · TypeScript strict · Vitest (Unit) · Playwright (E2E) · Husky + lint-staged · Lighthouse-CI

### Schritt 3 — Zusammenfassung & Freigabe
Fasse alle Antworten in einer kompakten Liste zusammen und frag **einmal** per `AskUserQuestion`
„Scaffolden?" → „Ja, los" / „Nochmal anpassen". Erst bei „Ja" schreiben.

### Schritt 4 — Scaffold
Folge **`references/scaffold.md`** (detaillierter Playbook pro Stack). Kurzfassung:
1. `npm create vite@latest <slug> -- --template <template>` (non-interaktiv).
2. Styling-Wahl integrieren (Tokens-Assets kopieren bzw. Tailwind/UnoCSS einrichten).
3. AI-Doku: `assets/CLAUDE.md` + `assets/AGENTS.md` ins Projekt kopieren und mit den Antworten füllen.
4. Claude-Setup: `assets/settings.json` → `.claude/settings.json`, `assets/session-start.sh` → `.claude/hooks/`.
5. Tooling je nach Wahl: ESLint/Prettier (`assets/eslint.config.js`, `assets/prettierrc.json`), Vitest, Playwright, Husky.
6. CI: bei GitHub Pages `assets/deploy-pages.yml` → `.github/workflows/`. (Andere Ziele: passende Hinweise in README.)
7. `assets/gitignore` → `.gitignore`, `references/checklist.md` → `CHECKLIST.md`.
8. `npm install`, danach `npm run build` zum Verifizieren.

> Asset-Pfade sind relativ zum Skill-Ordner (`.claude/skills/new-site/`). Lies die
> Template-Dateien mit `Read` und schreibe die finalen mit `Write`/`Edit` ins neue Projekt —
> ersetze Platzhalter (`{{PROJECT_NAME}}`, `{{STACK}}`, `{{STYLING}}`, `{{DEPLOY}}`,
> `{{FEATURES}}`, `{{DATE}}`).

### Schritt 5 — Abschluss
Gib eine kurze „Was wurde erzeugt"-Übersicht aus plus die nächsten Befehle
(`cd <slug> && npm run dev`) und verweise auf `CHECKLIST.md` vor dem Launch.

## Vite-Template-Mapping
| Stack | `--template` |
|---|---|
| Vanilla TS | `vanilla-ts` |
| React | `react-ts` |
| Vue | `vue-ts` |
| Svelte | `svelte-ts` |
| Astro | *(stattdessen `npm create astro@latest`)* |

## Nicht-Ziele
- Kein Über-Engineering: nur erzeugen, was gewählt wurde.
- Keine Secrets/Keys anlegen. Analytics/PWA nur als ready-to-fill Gerüst.
