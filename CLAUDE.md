# CLAUDE.md

Kurz-Doku für die Arbeit in diesem Repo. **Knapp halten, bei Änderungen mitpflegen.**
→ **Vollständige Referenz** (Sektionen, Effekte, Rezepte, Gotchas): [`AGENTS.md`](AGENTS.md).

## Repo-Struktur
- **GRELLWERK** (Repo-Root) = Hauptprojekt. Build-less Vanilla HTML/CSS/JS, brutalistische
  Fake-Agentur. **Mehrseitig:** `index.html` (Startseite) + Unterseiten im Root
  (`arbeiten.html`, `case-*.html`, `leistungen.html`, `leistung-*.html`, `ueber-uns.html`,
  `journal.html`, `journal-*.html`, `kontakt.html`, `impressum.html`, `datenschutz.html`),
  die sich `css/` + `js/` teilen. Kontakt-Formular existiert NUR auf `kontakt.html` (Single
  Source) — alle „buchen"-CTAs verlinken dorthin. Mobile-Nav = Hamburger (`.nav__toggle`
  + `#nav-menu`, Toggle-Logik in `js/effects.js#initNav`); aktive Seite via `aria-current`.
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
- **Inhalte/Tour zentral** in `js/config.js`: `GUIDE_STEPS`, `QUIPS` (Werte String **oder**
  Array → Zufallsauswahl), `BRUMMER` (Frag-Modus/Q&A/Nudge), `SLOGAN` (Krach-Maschine),
  `KONFIGURATOR`. Neue Sektion → dort Eintrag ergänzen. Brummer ist **seiten-tauglich**:
  `guide.js` filtert `GUIDE_STEPS` auf Schritte, deren `selector` auf der aktuellen Seite
  existiert (Schrittzähler dynamisch) — Unterseiten-Schritte in `GUIDE_STEPS` zusammenhängend
  + in Sichtreihenfolge gruppieren. **Brummer startet immer minimiert als Tab — KEINE
  Auto-Popups** (keine Scroll-Quips/Idle). Einzige Ausnahme: einmaliger Kontakt-Stupser
  (`BRUMMER.nudge`, `sessionStorage`) wenn `nudge.after` in Sicht kommt + `nudge.go` existiert
  (= Homepage, nach den Cases). Tab öffnet **Frag-Modus** (Chips + freie Texteingabe →
  `BRUMMER.match()`, Keyword-Score auf `qa[].keys`, sonst `fallback`). Bubble hat ein
  Schließen-**X** (`.guide__close`); Modi via `guide.dataset.mode` (`tour`/`ask`/`nudge`).
- **Interaktive Tools** (`index.html`, reine Vanilla-Fake-KI = Keyword-Match, kein
  Netz, Logik in `config.js`): `#konfigurator` (→ `js/konfigurator.js`), `#slogan-lab`
  „Krach-Maschine" Slogan-Generator (→ `js/generator.js`). `SLOGAN.detect()` rät die
  Branche aus Marke+Branche-Feld (`SLOGAN.categories`, Keyword→Wortfarbe+Templates),
  `generate()` liefert `{ category, slogans }` — Kategorie wird als Badge angezeigt.
- **Journal** (`journal.html` + `journal-*.html`): Übersicht hat Kategorie-Filter
  (`#journal-filter` Chips + `.post[data-cat]`, „eine + Alle") **und Sortierung**
  (`#journal-sort`: Datum/Titel/Kategorie) — Logik in `js/journal.js`, sortiert beim
  Laden automatisch nach Datum. Karten nutzen `data-reveal`: Filter/Sort setzen sichtbare
  Karten sofort auf `.is-visible` (sonst bleiben sie unsichtbar). Quellen je Artikel via
  `.article__sources`.
  Neuer Artikel → Seite vom Template ableiten (`<span class="tag">` + Eyebrow = Kategorie),
  Karte mit passendem `data-cat` ins Grid (newest first), Filter-Chip ergänzen falls neue
  Kategorie, Sitemap pflegen. Kategorien: Performance/Branding/Social/Daten/Web/Meinung.
- **Neue Unterseite** → vom Kopf/Fuß einer bestehenden Seite ableiten (Head, `nav`, `footer`,
  Brummer-`<aside>`+Tab, `js/main.js` sind auf jeder Seite dupliziert). Layout über bestehende
  Klassen + `page-hero`/`prose`/`cta-band`/`crumbs` in `css/sections.css`. Cross-Page-Links
  relativ (`arbeiten.html`, `index.html#kontakt`). Deploy kopiert `*.html` automatisch.
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
