# GRELLWERK — Brutalist Marketing Agency Website

Eine fiktive Werbe-/Performance-Agentur als **brutalistische Anti-Design-Website**
mit dem interaktiven Maskottchen **BRUMMER**, das Besucher Schritt für Schritt
durch die Seite führt.

> Tagline: **„Lärm, der verkauft."**

## Highlights

- 🧨 **Brutalist / Anti-Design** — übergroße Typo, Glitch-Effekte, harte Kontraste,
  asymmetrische Layouts, endlose Marquees, Block-Shadows.
- 🐝 **BRUMMER-Onboarding-Guide** — animiertes SVG-Maskottchen mit Cursor-Tracking,
  IntersectionObserver-gesteuerter Tour, deutschen Dialogen, `localStorage`-Merker
  und Replay-Funktion.
- 🖱️ **Custom Cursor + magnetische Buttons**, Scramble-Text, Grain-Overlay.
- ⚡ **Build-less** — reines HTML + CSS + Vanilla-JS. Keine Installation nötig.
  CDN-Libs (GSAP, Lenis, Google Fonts) sind reine Verbesserung und fallen
  **graceful** aus, wenn sie nicht erreichbar sind.
- ♿ **Accessibility** — `prefers-reduced-motion`, Keyboard-Navigation, Skip-Link,
  Live-Regions, semantische Landmarks.

## Lokal starten

Empfohlen (vermeidet ES-Modul/CORS-Probleme):

```bash
python3 -m http.server 8000
# dann http://localhost:8000 öffnen
```

Alternativ lässt sich `index.html` in modernen Browsern auch direkt per
`file://` öffnen — der lokale Server ist aber zuverlässiger.

## Struktur

```
index.html          # Single-Page mit allen Sektionen + BRUMMER-Markup
css/                # reset, tokens, base, components, sections, guide, motion
js/                 # config, cdn, cursor, effects, scroll, guide, main
assets/             # noise.svg (Grain), favicon.svg, og-image.svg
```

Texte und Tour-Schritte liegen zentral in `js/config.js` und lassen sich dort
ohne Logik-Änderungen anpassen.

## Verifikation

- Scrolle top → bottom: alle Sektionen reveal-en, Marquees loopen nahtlos,
  Service-Zeilen invertieren beim Hover, Case-Karten verzerren leicht.
- Erster Besuch: BRUMMER fliegt ein und bietet die Tour an. „Weiter" scrollt
  durch, „Überspringen" minimiert. Reload → keine Auto-Tour, Tab unten rechts
  zum Replay.
- CDN-Fail-Test: in DevTools `cdn.jsdelivr.net` + `fonts.googleapis.com` blocken
  → Seite rendert weiter (System-Fonts, IO-Reveals, Guide funktioniert).
- `window.__FLAGS` in der Konsole zeigt, welche CDN-Libs geladen wurden.

> Alle Marken, Cases und Personen sind fiktiv (Demo-Content).
