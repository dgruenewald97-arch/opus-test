# Launch-Checkliste

Vor dem Go-Live durchgehen. Abhaken, was zutrifft — nicht jeder Punkt gilt für jedes Projekt.

## SEO
- [ ] `<title>` (≤ 60 Z.) + `meta description` (≤ 155 Z.) pro Seite, einzigartig
- [ ] Open-Graph + Twitter-Card (Titel, Beschreibung, Bild 1200×630)
- [ ] `<html lang="…">` korrekt; bei i18n `hreflang`
- [ ] Semantisches HTML (eine `<h1>`, logische Heading-Hierarchie)
- [ ] `robots.txt` + `sitemap.xml`
- [ ] Canonical-URL gesetzt
- [ ] Aussagekräftige `alt`-Texte für alle inhaltlichen Bilder

## Accessibility (a11y)
- [ ] Tastatur-bedienbar; sichtbarer `:focus-visible`-Stil
- [ ] Kontrast ≥ 4.5:1 (Text) / 3:1 (große Schrift, UI)
- [ ] Skip-Link „Zum Inhalt"
- [ ] Formularfelder mit `<label>`; Fehler programmatisch (`aria-live`)
- [ ] `prefers-reduced-motion` respektiert
- [ ] Bilder/Icons: dekorativ → `alt=""`/`aria-hidden`, sonst beschriftet
- [ ] Check mit axe / Lighthouse a11y ≥ 95

## Performance
- [ ] Lighthouse Performance ≥ 90 (mobil)
- [ ] Bilder optimiert (AVIF/WebP, `width`/`height`, `loading="lazy"` below-the-fold)
- [ ] Fonts: `font-display: swap`, `preconnect`, System-Fallback
- [ ] Kein render-blockendes JS; Code-Splitting wo sinnvoll
- [ ] CLS vermeiden (feste Maße für Media/Embeds)
- [ ] `npm run build` Bundle-Größe geprüft

## Tech & Hygiene
- [ ] `.env` nicht committet; Secrets nur in CI-Secrets
- [ ] Funktioniert ohne JS in Grundzügen (progressive enhancement)
- [ ] 404-Seite vorhanden
- [ ] Favicon + Apple-Touch-Icon + `theme-color`
- [ ] Cross-Browser + echtes Mobilgerät getestet
- [ ] Analytics datenschutzkonform (Consent, falls nötig); Impressum/Datenschutz
- [ ] HTTPS + sinnvolle Security-Header (CSP soweit machbar)
- [ ] CI grün (lint, test, build)
