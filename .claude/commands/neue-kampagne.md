---
description: Orchestriert eine neue Marketing-Kampagne (Landingpage + Ads + Hooks) aus einem Briefing.
argument-hint: <pfad/zu/briefing.md>
---

Baue eine neue GRELLWERK-Kampagne basierend auf dem Briefing in: **$ARGUMENTS**

Folge dem Playbook für die AI-Orchestrierung. Ablauf:

1. **Briefing & Brand DNA auswerten:**
   - Lies das Briefing-File (z.B. aus `tools/content/briefs/`). Extrahiere den Kundennamen aus dem Feld `Kunde`.
   - Suche nach der entsprechenden Brand-DNA-Datei unter `tools/content/brands/<kunde-slug>.json`. Falls diese nicht existiert, nutze `_example.json` als Fallback oder fordere Onboarding via `/neuer-kunde` an.
   - Extrahiere die Designfarben, Tonalitätsregeln, USPs und Banned Words aus dem Profil.

2. **Strategie- & Insights-Lauf:**
   - Simuliere den Output von **SPY** (Konkurrenz-Analyse) und **TARGET** (Zielgruppen-Segmente) unter Berücksichtigung der Schmerzpunkte und Mitbewerber aus dem Brand-DNA-Profil.
   - Formuliere 3 konkrete Kampagnen-Hebeleffekte und Zielgruppeneigenschaften, die für die Creative-Generierung genutzt werden.

3. **Kreations-Lauf (Copywriting & Hooks):**
   - Simuliere **VOICE** (Brand Voice Copywriter): Generiere Headline-Varianten und Body-Copy für die Landingpage unter Beachtung der Tonalitätsregeln. **Verwende keinesfalls die Banned Words** und nutze die `sample_phrases` als Inspiration.
   - Simuliere **HOOK** (Social Video Ideator) & **MOTION** (Storyboard Artist): Generiere 5 Video-Ad-Hooks und ein kurzes UGC-Storyboard.
   - Speichere diese Entwürfe in `tools/content/campaigns/<slug>-assets.md` zur Dokumentation ab.

4. **Entwicklungs-Lauf (Landingpage):**
   - Simuliere **FRONT** (UI Builder) & **SPEED** (Performance Optimizer): 
     - Leite eine neue Landingpage-Datei `lp-<slug>.html` vom Standard-Header/Footer ab.
     - Gestalte die Landingpage unter Verwendung des Farbschemas (`design_system.colors`) des Kunden.
     - Gestalte eine brutalistische Hero-Sektion mit der generierten Headline und dem Haupt-CTA, ein Zahlen-Band mit Vorteilen und ein Feedback-Grid.
     - Stelle sicher, dass die Dateipfade zu CSS/JS korrekt sind.

5. **Qualitätssicherung & Compliance:**
   - Simuliere **COMPLY** (Ad-Policy & Legal Auditor): Scanne das generierte HTML nach gesetzlichen Pflichten (Verlinkung Impressum/Datenschutz, Cookie-Hinweis, keine markenrechtlich geschützten Wettbewerber-Nennungen).
   - Registriere das neue HTML-File in `tools/verify.cjs` unter `htmlFiles` falls erforderlich, oder stelle sicher, dass alle internen Links funktionieren.
   - Führe `node tools/verify.cjs` aus. Rot -> beheben.

6. **Kampagnen-Report:**
   - Gib dem Nutzer eine Zusammenfassung aller erzeugten Assets und den Status des Verify-Gates aus.
