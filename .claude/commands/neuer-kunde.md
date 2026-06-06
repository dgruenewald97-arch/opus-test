---
description: Automatisiert das Onboarding eines neuen Kunden: Scraped dessen Website und erstellt ein Brand DNA JSON-Profil.
argument-hint: <kunden-name> <website-url>
---

Führe das Onboarding für den neuen Kunden **$ARGUMENTS** durch.

Ablauf:

1. **Website-Scraping & Analyse:**
   - Extrahiere aus dem Argument den Kundennamen und die Website-URL.
   - Nutze Web-Recherche- und Lesetools, um die Landingpage und Unterseiten des Kunden zu scannen.
   - Extrahiere: Mission, Alleinstellungsmerkmale (USPs), Zielgruppenansprache, genutztes Wording (Tonalität) und das visuelle Design (Primär-/Sekundärfarben, Schriftarten).

2. **Profil-Synthese (Brand DNA):**
   - Strukturiere die gesammelten Informationen exakt nach dem JSON-Schema in `tools/content/brands/_example.json`.
   - Formuliere:
     - Einen prägnanten Elevator Pitch (Positionierung).
     - Die 3 stärksten USPs.
     - Zielgruppe und deren emotionale Schmerzpunkte (Pain Points).
     - Tonalitätsvorgaben (Stil-Keywords, Banned Words, Beispielsätze).
     - Farbschemata (HEX-Codes) und Schriftfamilien.

3. **Speichern:**
   - Erstelle die Datei `tools/content/brands/<kunden-name-kleingeschrieben-slug>.json`.
   - Schreibe das strukturierte JSON-Profil hinein.

4. **Summary & Output:**
   - Zeige dem Nutzer eine übersichtliche Markdown-Zusammenfassung der erkannten Brand DNA und bestätige, dass der Kunde nun für Kampagnen bereit ist.
