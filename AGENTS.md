# AGENTS.md — GRELLWERK Gesamt-Referenz für KI-Agenten

> Zweck: Diese Datei einmal lesen = das Projekt verstehen, **ohne den ganzen Code zu
> scannen**. Build-less Vanilla-Website, jede Konvention zählt. Bei strukturellen
> Änderungen mitpflegen (tokensparend, nur Fakten). Kurzfassung: `CLAUDE.md`.

## 1. Was ist das?
**GRELLWERK** = fiktive brutalistische Werbe-/Performance-Agentur, **mehrseitig**
(Startseite `index.html` + Unterseiten im Root, siehe §8). Reines HTML + CSS + Vanilla-JS,
**kein Build, keine Dependencies**.
CDN-Libs (GSAP/Lenis/Google Fonts) sind reine Verbesserung und fallen *graceful* aus.
Maskottchen **BRUMMER** führt als Onboarding-Guide durch die Seite. Tagline:
„Lärm, der verkauft." Alle Inhalte sind Demo/fiktiv (Footer-Disclaimer behalten).

**`studio-seide/`** = eigenständiges Nebenprojekt (Vite + React, Friseur-Salon).
Nicht anfassen außer ausdrücklich gewünscht. Hat eigene Konventionen.

## 2. Verzeichnis-Struktur
```
index.html              Startseite (Sektionen + BRUMMER-Markup)
arbeiten.html           Cases-Übersicht
case-*.html             4 Case-Detailseiten (kold-brew/neontritt/haferkraft/blitzbank)
leistungen.html         Leistungs-Übersicht  ·  leistung-*.html  6 Disziplin-Detailseiten
ueber-uns.html          Agentur-Story, Manifest, Crew, Stimmen
journal.html            Blog-Übersicht  ·  journal-*.html  3 Artikel
css/
  reset.css             minimaler Reset
  tokens.css            Design-Tokens (Farben, Fonts, Type-Scale, Spacing) — Quelle der Wahrheit
  base.css              Typo, .container, .section, .eyebrow, [data-reveal]
  components.css        wiederverwendbar: .btn, .marquee, .tag, .block, .grain, .cursor
  sections.css          Layout PRO Sektion (Block-Kommentar-Stil pro Sektion)
  guide.css             BRUMMER-Bubble + Mascot-Animationen
  motion.css            @keyframes + prefers-reduced-motion-Block
js/
  config.js             ZENTRALE Inhalte: GUIDE_STEPS, QUIPS, COPY, KONFIGURATOR
  cdn.js                lädt optionale CDN-Libs (gsap/lenis), Failure wird geschluckt
  cursor.js             Custom-Cursor + magnetische Buttons (.magnetic)
  effects.js            initScramble, initMarquee, initRotator, initCounters, initForm
  scroll.js             initScroll (Reveal via IO/GSAP) + scrollToEl()
  guide.js              BRUMMER-State-Machine (Tour, Quips, Eye-Tracking)
  konfigurator.js       initKonfigurator (interaktiver Empfehlungs-Rechner)
  main.js               boot() — Orchestrator, bindet alle Module ein
assets/                 noise.svg (Grain), favicon.svg, og-image.svg
build-standalone.cjs    bündelt alles in EINE Datei → grellwerk-standalone.html
.github/workflows/deploy-pages.yml   Pages-Deploy (nur main)
```

## 3. Design-Tokens (`css/tokens.css`) — NIE hardcoden, immer Token
- **Farben:** `--ink` #0A0A0A, `--paper` #F2F0E9, `--acid` #D6FF3B, `--shock` #FF2E63,
  `--electric` #2D2DFF, `--warn` #FF6B00. Semantik: `--bg`=paper, `--fg`=ink.
- **Fonts:** `--font-display` (Archivo Black, Headlines), `--font-ui` (Space Grotesk),
  `--font-mono` (JetBrains Mono, Labels/Nav/Mono-Text). System-Fallbacks definiert.
- **Type-Scale (fluid clamp):** `--step--1` … `--step-3`, `--step-mega`.
- **Spacing:** `--gap`, `--pad-section`; **`--container`** 1440px.
- **Struktur:** `--border` 4px, `--border-thick` 6px, `--shadow-block` 8px-Versatz,
  `--shadow-block-lg`. **Z-Index:** grain 9000, cursor 9999, guide 8000, nav 7000.

## 4. Sektionen in `index.html` (Reihenfolge = Page-Flow)
Muster pro Sektion: `<section class="section <name>" id="<id>" data-guide-step="<id>">`
→ `.container` → `.eyebrow`-Label → `<h2 data-reveal>` → Items mit `data-reveal`.

| # | id | Sektion | Kern-Klassen / Besonderheit |
|---|----|---------|------------------------------|
| 1 | `hero` | Hero | Headline mit `.glitch` + acid `.hero__loud`, 2× `.hero__block`, animierter `.hero__proof` (data-rotate) |
| – | – | Marquee-Bänder | `.marquee` / `.marquee--rev` (aria-hidden, dekorativ) |
| 2 | `zahlen` | Stats-Band | `.stats__grid`/`.stat`, full-bleed acid, `data-count` |
| 3 | `leistungen` | Services | `.services__list`/`.service` (Hover invertiert) |
| 4 | `arbeiten` | Cases | `.work__grid`/`.case` (rotiert, `.magnetic`, Block-Shadow) |
| 5 | `kunden` | Logo-Wall | `.clients__grid`/`.client` (klont Stats-Grid + Service-Hover) |
| 6 | `manifest` | Manifest | full-bleed ink, `.manifest__item` |
| 7 | `prozess` | Process | `.process__strip`/`.step` (verbundenes Border-Grid) |
| 8 | `pakete` | Pakete/Preise | `.pricing__strip`/`.tier` (klont Process; `.tier--mid` = acid) |
| 9 | `konfigurator` | Krach-Konfigurator | full-bleed ink, `.config__opt` (data-config-q/-v), Result-Panel |
| 10 | `crew` | Team | `.team__grid`/`.member` |
| 11 | `stimmen` | Testimonials | `.quotes__grid`/`.quote` |
| 12 | `journal` | Lärm-Journal | `.journal__grid`/`.post` (klont Cases) |
| 13 | `faq` | FAQ | `<details>`/`.faq__item` |
| 14 | `kontakt` | Kontakt | full-bleed ink, `.form` (Fake-Submit) |

Danach: `.footer` + BRUMMER-Markup (`#guide`, `#guide-tab`).
**Nav** (`.nav__links`) verlinkt Anker; ab `max-width:720px` nur noch CTA sichtbar.

## 5. Effekte über `data-*` (Referenz)
| Attribut | Wirkung | Logik in |
|----------|---------|----------|
| `data-reveal` | Fade+Lift beim Scrollen (`.is-visible`) | scroll.js (IO/GSAP) + base.css |
| `data-scramble` | Text-Scramble bei Hover (Nav) | effects.js |
| `data-count` (+`data-suffix`) | Count-up beim Sichtbarwerden | effects.js |
| `data-rotate` | cyclet Kind-`<span>`s (Proof-Ticker), `.is-on` | effects.js `initRotator` |
| `data-guide-step="<id>"` | registriert Sektion für BRUMMER-Tour/Quip | guide.js |
| `data-config-q` / `data-config-v` | Konfigurator-Optionsbuttons | konfigurator.js |
| `data-text` | Text-Kopie für `.glitch`-Pseudoelemente | motion.css |
| `.magnetic` | Button folgt Cursor leicht | cursor.js |

Alles respektiert `prefers-reduced-motion` (Animationen aus, Reveals sofort sichtbar).

## 6. Inhalte/Config zentral (`js/config.js`)
- **`GUIDE_STEPS`** — Array `{selector, text}` für BRUMMER-Tour. Schrittzähler ist
  **automatisch** `GUIDE_STEPS.length` (keine harte Zahl pflegen).
- **`QUIPS`** — `{ "<data-guide-step>": "Spruch" }`, passiv beim Scrollen (Tour inaktiv).
- **`COPY`** — Formular-Texte + `storageKey` (localStorage für „Tour gesehen").
- **`KONFIGURATOR`** — `{ defaultLead, recommend({ziel,phase,tempo}) }`, liefert
  `{paket, lead, why}`. Paket-Namen identisch zur `#pakete`-Sektion, Leads zur `#crew`.

## 7. BRUMMER-Guide (`js/guide.js`)
State-Machine: Erstbesuch → Auto-Tour nach ~900ms; Rückkehrer → minimierter Tab
„Brummer fragen?". Tour highlightet `step.selector`, scrollt hin (`scrollToEl`).
Passive Quips via IntersectionObserver, wenn Tour inaktiv. Pupillen folgen Cursor.
Footer-Button `#replay-guide` startet neu.

## 8. Rezepte (How-to)
**Neue Sektion:** (1) `<section>` nach Muster in `index.html` einfügen; (2) Layout in
`css/sections.css` (am besten ein bestehendes Muster KLONEN → optische Konsistenz, EIN
Akzent pro Sektion, Spacing nur via `var(--gap)`/`--pad-section`); (3) `GUIDE_STEPS` +
`QUIPS` in `config.js` ergänzen; (4) Nav- & Footer-Link in `index.html`.

**Neues JS-Modul:** in `js/main.js` `boot()` einbinden **UND** in `build-standalone.cjs`
zur Concat-Liste hinzufügen (sonst fehlt es im Standalone). Aktuelle JS-Concat-Reihenfolge:
`config → cursor → effects → konfigurator → scroll → guide → main`.

**Reine Effekt-Funktion** (kein neues File): in `js/effects.js` ergänzen + in `main.js`
aufrufen — effects.js ist bereits im Standalone-Bundle.

**Neue Unterseite (Multipage):** GRELLWERK ist mehrseitig — Unterseiten als eigene
`*.html` im Root (`arbeiten.html`, `case-*.html`, `leistungen.html`, `leistung-*.html`,
`ueber-uns.html`, `journal.html`, `journal-*.html`), die `css/`+`js/` teilen. (1) Kopf/Fuß einer bestehenden Seite klonen
(Head, `nav`, `footer`, Brummer-`<aside>`+`#guide-tab`, `js/main.js` sind pro Seite
dupliziert — kein HTML-Templating); (2) Layout über bestehende Klassen + die Sub-Page-Bausteine
`page-hero`/`prose`/`lead`/`result__grid`/`bigquote`/`cta-band`/`crumbs`/`next-case` in
`css/sections.css`; (3) Cross-Page-Links relativ (`arbeiten.html`, `index.html#kontakt`);
(4) Brummer: `GUIDE_STEPS`/`QUIPS` in `config.js` ergänzen — `guide.js` filtert pro Seite
auf vorhandene `selector`. **Standalone-Build bleibt single-page** (nur `index.html`);
Mehrseitigkeit lebt auf Pages, Deploy kopiert `*.html`.

## 9. Befehle, Build, Deploy
- **Dev:** `python3 -m http.server 8000` (Root) → http://localhost:8000
- **Standalone:** `node build-standalone.cjs` → `grellwerk-standalone.html` (inlined CSS/JS +
  noise/favicon als data-URI; strippt ES-Module, ersetzt CDN-Loader durch Fallbacks).
- **Syntaxcheck:** `node --check js/<datei>.js`
- **Deploy:** GitHub Pages baut **nur aus `main`** (Workflow `deploy-pages.yml`). GRELLWERK
  im Root, STUDIO SEIDE unter `/studio-seide/`. Push auf `main` = sofort live. Feature-
  Branch wird nicht deployt. **Keine Branch-Preview** eingerichtet (User-Entscheidung).

## 10. Gotchas / Vor dem Pushen
- **Kein Headless-Browser** in dieser Umgebung (Chromium-Download durch Netz-Allowlist
  geblockt). Visuelle Kontrolle nur über User (Standalone-Datei / Pages). Daher
  **konservativ** bauen: bestehende Muster klonen statt neue erfinden.
- **Mobile-Fallen:** Display-Font-Wörter überlaufen schnell → bei Grids `min-width:0` +
  `overflow-wrap` und Schrift im Breakpoint verkleinern. Rotierte Karten/Block-Shadows
  können auf schmalen Screens unruhig wirken.
- **Konsistenz:** EIN Akzent pro Sektion; Tokens statt Hardcodes; Block-Kommentar-Stil in
  `sections.css` beibehalten; full-bleed (stats/manifest/config/kontakt) vs. `.container`.
- Immer: `node --check` + `node build-standalone.cjs` vor dem Pushen; danach committen.
