# GRELLWERK — Brutalist Marketing Agency Website

Eine fiktive Werbe-/Performance-Agentur als **brutalistische Anti-Design-Website**
mit dem interaktiven Maskottchen **BRUMMER**.

> Tagline: **„Lärm, der verkauft."**

## Highlights

- **Brutalist / Anti-Design** — übergroße Typo, Glitch-Effekte, harte Kontraste,
  asymmetrische Layouts, endlose Marquees, Block-Shadows.
- **BRUMMER** — SVG-Maskottchen, das minimiert als Tab startet. Öffnet einen
  Frag-Modus (Chips + freie Texteingabe, Keyword-Matching) und eine optionale
  Seiten-Tour. Einmaliger Kontakt-Stupser via `sessionStorage` auf der Homepage.
- **Custom Cursor + magnetische Buttons**, Scramble-Text, Grain-Overlay.
- **Build-less** — reines HTML + CSS + Vanilla-JS. Keine Installation nötig.
  CDN-Libs (GSAP, Lenis, Google Fonts) fallen graceful aus.
- **Mehrseitig** — `index.html` + Unterseiten (`arbeiten.html`, `case-*.html`,
  `leistungen.html`, `leistung-*.html`, `journal.html`, `journal-*.html`,
  `ueber-uns.html`, `kontakt.html`, `impressum.html`, `datenschutz.html`).
- **Journal** mit Kategorie-Filter und Datum/Titel/Kategorie-Sortierung.
- **Interaktive Tools** — `#konfigurator` (Marken-Konfigurationsrechner) und
  `#slogan-lab` Krach-Maschine (Slogan-Generator mit Branchen-Erkennung) — alles
  reine Vanilla-JS-Keyword-Logik, kein Netz.
- **Accessibility** — `prefers-reduced-motion`, Keyboard-Navigation, Skip-Link,
  Live-Regions, semantische Landmarks.

## Struktur

```
index.html              # Startseite mit allen Haupt-Sektionen
*.html                  # Unterseiten (Cases, Leistungen, Journal-Artikel, …)
css/                    # reset, tokens, base, components, sections, guide, motion
js/                     # config, cdn, cursor, effects, scroll, guide, konfigurator,
                        #   generator, journal, main
assets/                 # noise.svg, favicon.svg, og-image.svg
tools/                  # Generator + Verify-Gate (Node.js, kein Build nötig für Dev)
  content/articles/     # Daten-Dateien für Journal-Artikel (*.cjs)
  lib/                  # figures.cjs, chrome.cjs (Bau-Helfer)
  generate.cjs          # Artikel aus Daten-Datei rendern
  verify.cjs            # Verify-Gate (Pflicht vor Push)
.github/workflows/      # CI: verify.yml + deploy-pages.yml
studio-seide/           # Nebenprojekt: Friseur-Salon (Vite + React) — separat
```

Design-Tokens in `css/tokens.css` (`--ink`, `--paper`, `--acid`, `--shock`,
`--electric`, `--warn`, Schriften, Spacing). Texte, Tour-Schritte und
Tool-Logik zentral in `js/config.js`.

## Lokal starten

```bash
python3 -m http.server 8000
# → http://localhost:8000
```

Alternativ `index.html` direkt per `file://` — lokaler Server ist aber zuverlässiger.

## Verify-Gate (vor jedem Push)

```bash
node tools/verify.cjs
```

Prüft: Meta-Attribute, rohe `<`-Zeichen, tote interne Links, Pflicht-Meta,
Chrome-Drift, Journal/Sitemap-Konsistenz, Standalone-Build. Läuft auch in CI.

## Standalone-Build

```bash
node build-standalone.cjs   # → grellwerk-standalone.html (alles in einer Datei)
```

## Journal-Artikel erstellen

1. Daten-Datei anlegen: `tools/content/articles/<slug>.cjs` (Vorlage `_example.cjs`)
2. Diagramm (optional) aus `tools/lib/figures.cjs` wählen
3. Seite generieren: `node tools/generate.cjs [slug]`
4. Karte + Filter-Chip in `journal.html` ergänzen, Sitemap pflegen

Kategorien: `Performance` · `Branding` · `Social` · `Daten` · `Web` · `Meinung`

## Deploy

GitHub Pages baut aus `main` (`deploy-pages.yml`). GRELLWERK im Root,
Studio Seide unter `/studio-seide/`. Feature-Branches werden nicht deployt.

## Nebenprojekt Studio Seide

```bash
cd studio-seide && npm run dev   # Vite-Dev-Server
cd studio-seide && npm run build # Produktions-Build
```

---

> Alle Marken, Cases und Personen sind fiktiv (Demo-Content).
