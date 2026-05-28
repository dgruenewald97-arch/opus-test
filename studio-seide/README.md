# STUDIO SEIDE — Haus für Haar & Beauty

Eine fiktive **Friseur- & Beauty-Salon-Website** im **Editorial-/Magazin-Stil**.
Warmes Ivory-Papier, Tinten-Schwarz, Terrakotta-Akzent, Display-Serif *Fraunces*
+ Sans *Inter*. Gebaut mit **Vite + React**.

> Tagline: **„Schnitt als Handwerk, Farbe als Charakter."**
> Alle Personen, Stimmen und Preise sind frei erfunden (Demo-Inhalt).

## Highlights

- 📰 **Editorial-Layout** — Masthead-Hero, nummerierte Sektionen (Nº 01…08),
  Hairlines, Drop-Cap, asymmetrisches Lookbook-Raster, Pull-Quotes.
- 🧭 **Stilfinder** (Differenzierer) — interaktiver 3-Fragen-Konfigurator, der
  live eine Leistung + passende:n Stylist:in empfiehlt. Voll tastaturbedienbar
  (Radiogroup, `aria-live`).
- ⚡ **Scroll-Reveals ohne Lib** — `IntersectionObserver`, der bei
  `prefers-reduced-motion` oder fehlendem IO sofort alles sichtbar macht.
- 🖼️ **Keine Raster-Bilder** — alle Grafiken sind Inline-SVG (Hero, Lookbook-
  Plates, Team-Avatare, Karte). Schlank und gestochen scharf.
- ♿ **Barrierefrei** — semantische Landmarks, Skip-Link, Fokus-Stile,
  Tastatur-Nav, ausreichende Kontraste, native `<details>`-FAQ.
- 🔌 **Graceful Degradation** — Google Fonts sind reine Verbesserung; fällt das
  CDN aus, rendert die Seite mit System-Serif/-Sans weiter.
- 📱 **Responsiv** — getestet auf 360 / 768 / 1280 px.

## Entwicklung

```bash
npm install
npm run dev        # Dev-Server (http://localhost:5173)
npm run build      # Production-Build -> dist/
npm run preview    # Build lokal ansehen
```

### Standalone (offline / Single-File)

```bash
npm run build:standalone   # -> dist-standalone/index.html (alles inline)
```

Eine fertige, eingecheckte Kopie liegt als **`studio-seide-standalone.html`** im
Projektordner: **eine einzige Datei** mit komplettem CSS + JS inline. Lässt sich
per Doppelklick oder direkt am Handy öffnen — **ohne Server, offline lauffähig**
(Fonts fallen dann auf System-Schriften zurück).

## Struktur

```
studio-seide/
├─ index.html              # HTML-Hülle + Font-Preconnect
├─ src/
│  ├─ main.jsx             # React-Entry
│  ├─ App.jsx              # Seiten-Komposition
│  ├─ styles/index.css     # komplettes Design-System (Tokens → Motion)
│  ├─ data/content.js      # ALLE Texte + Stilfinder-Logik (zentral)
│  ├─ hooks/useReveal.js   # IntersectionObserver-Reveal (reduced-motion-safe)
│  └─ components/          # Nav, Hero, Leistungen, …, Stilfinder, Footer, Art
├─ public/                 # favicon.svg, og-image.svg
├─ verify.mjs              # headless Screenshots (Desktop/Tablet/Mobil) + Konsolen-Check
└─ studio-seide-standalone.html   # offline Single-File-Build
```

Texte ändern? Alles steckt in `src/data/content.js` — keine Logik anfassen nötig.

## Verifikation nachstellen

```bash
npm run build && node verify.mjs   # erzeugt Screenshots in ./screens, meldet Konsolenfehler
```

## Live gehen (Hosting)

Die Seite ist **statisch** (nur HTML/CSS/JS), also überall hostbar:

| Weg | Befehl / Schritte | Hinweise |
|-----|-------------------|----------|
| **Netlify / Vercel** | Repo verbinden, Build: `npm run build`, Publish-Dir: `dist` | Einfachster Weg, kostenlos, eigene Domain möglich. |
| **GitHub Pages** | `dist/` per Action oder `gh-pages`-Branch deployen | **Wichtig:** GitHub Pages braucht ein **öffentliches Repo** — oder **GitHub Pro/Team** bei privatem Repo. `base: './'` ist bereits gesetzt, läuft also auch unter `/repo-name/`. |
| **Cloudflare Pages** | Build: `npm run build`, Output: `dist` | Schnelles CDN, kostenlos. |
| **Nur Datei** | `studio-seide-standalone.html` verschicken/öffnen | Kein Hosting nötig — offline lauffähig. |

> Tipp: Für GitHub Pages als Projekt-Seite (`username.github.io/repo`) passt die
> relative `base: './'` aus `vite.config.js` bereits. Für eine eigene Domain ist
> nichts weiter nötig.
