# AGENTS.md — {{PROJECT_NAME}}

Referenz für KI-Agenten (und Menschen). Ergänzt die knappe `CLAUDE.md` um Details.

## Überblick
- **Zweck:** {{PROJECT_NAME}} — {{STACK}} auf Vite, Styling via {{STYLING}}.
- **Build-Tool:** Vite. **Node:** ≥ 18. **Paketmanager:** npm.
- **Deploy:** {{DEPLOY}}.

## Verzeichnisse
| Pfad | Inhalt |
|---|---|
| `src/` | Anwendungscode |
| `src/styles/` | `reset.css`, `tokens.css`, App-CSS |
| `public/` | unveränderte statische Assets |
| `.claude/` | Claude-Code-Setup (settings, hooks) |
| `.github/workflows/` | CI/CD |

## Design-System
- Tokens in `src/styles/tokens.css`: Farben (`--color-*`), Typo (`--step-*`, `--font-*`),
  Spacing (`--space-*`), `--radius`, `--shadow`, `--container`, `--transition`.
- Light/Dark über `prefers-color-scheme`; manueller Override via `:root[data-theme]`.
- Reset (`reset.css`) bringt Box-Sizing, fluide Defaults, `:focus-visible`, reduced-motion.

## Qualitätsregeln
- **A11y:** Tastaturbedienung, Kontrast ≥ 4.5:1, Labels, `aria-live` für Fehler, Skip-Link.
- **Performance:** optimierte Bilder (AVIF/WebP, Maße gesetzt), `font-display: swap`,
  kein render-blockendes JS, CLS vermeiden.
- **SEO:** eindeutige title/description, OG/Twitter, `lang`, semantische Struktur.
- Vollständige Liste: `CHECKLIST.md`.

## Tooling
{{TOOLING_NOTES}}

## Gotchas
- Vite `base` muss zum Deploy passen (GitHub Pages: `/<repo>/`, Custom-Domain: `/`).
- `.env` nie committen; Secrets über CI-Secrets / Hosting-Env.
- Bei Styling=Tailwind/UnoCSS: Tokens trotzdem als gemeinsame Quelle der Wahrheit nutzen.
