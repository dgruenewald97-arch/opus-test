# Web Starter Kit — geführtes Setup für neue Webseiten

Ein wiederverwendbares Claude-Code-Setup, das beim Start **neuer** Webseiten-Projekte
die ganze Arbeit abnimmt: ein **geführter Multiple-Choice-Wizard** scaffoldet ein
startklares **Vite**-Projekt inkl. AI-Doku, Tooling/CI und Launch-Checkliste.

> Lebt im Skill-Ordner [`.claude/skills/new-site/`](.claude/skills/new-site/) — komplett
> portabel. Unabhängig vom restlichen Inhalt dieses Repos.

## Benutzen

In Claude Code einfach:

```
/new-site
```

Der Wizard führt dich per Dropdown-Fragen durch:

1. **Projektname** (Slug)
2. **Profil** — Seitentyp · Stack · Styling · Deploy-Ziel
3. **Ausbau** — Features (Mehrfach) · Qualität/Tooling (Mehrfach)
4. **Zusammenfassung & Freigabe** → dann wird gebaut

Du kannst auch frei formulieren („bau mir eine neue Landingpage") — Claude erkennt den
Skill und startet den geführten Flow.

## Was erzeugt wird

```
<projekt>/
├── (Vite-Projekt: src/, index.html, vite.config, package.json)
├── src/styles/         reset.css → tokens.css → app-CSS
├── CLAUDE.md           knappe Projekt-Doku (vorausgefüllt)
├── AGENTS.md           ausführliche Agenten-Referenz
├── CHECKLIST.md        Launch-Checkliste (SEO · a11y · Performance)
├── .claude/
│   ├── settings.json   Permissions + SessionStart-Hook
│   └── hooks/session-start.sh
├── .github/workflows/  deploy-pages.yml (bei GitHub Pages)
├── .gitignore · eslint.config.js · .prettierrc.json  (je nach Wahl)
```

## Optionen im Wizard

| Frage | Auswahl |
|---|---|
| Seitentyp | Landing/One-Pager · Marketing-Site · Web-App (SPA) · Blog/Content · Portfolio |
| Stack | Vanilla TS · React · Vue · Svelte · Astro — alle auf Vite |
| Styling | Design-Tokens + plain CSS · Tailwind · CSS Modules · UnoCSS |
| Features | SEO/OG · Dark-Mode · Kontaktformular · Markdown · i18n · PWA · Analytics |
| Tooling | ESLint+Prettier · TS strict · Vitest · Playwright · Husky · Lighthouse-CI |
| Deploy | GitHub Pages · Vercel · Netlify · Cloudflare · keins |

## In andere Projekte mitnehmen

- **Pro Projekt:** Ordner `.claude/skills/new-site/` in das neue Repo kopieren → `/new-site` verfügbar.
- **Global (alle Projekte):** nach `~/.claude/skills/new-site/` kopieren.

## Erweitern

- **Neue Option** → in [`SKILL.md`](.claude/skills/new-site/SKILL.md) bei der passenden Frage
  ergänzen und in [`references/scaffold.md`](.claude/skills/new-site/references/scaffold.md)
  die Build-Schritte dafür beschreiben.
- **Neues Template-Asset** → in `.claude/skills/new-site/assets/` ablegen und im Scaffold-Playbook referenzieren.
- **Checkliste anpassen** → [`references/checklist.md`](.claude/skills/new-site/references/checklist.md).

## Prinzipien

- Sinnvolle Defaults, erste Option ist die Empfehlung — schnelle Entscheidungen.
- Nur erzeugen, was gewählt wurde (kein Über-Engineering).
- Tokens statt Hardcodes · a11y & Performance von Anfang an · progressive Enhancement.
