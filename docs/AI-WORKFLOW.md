# AI-Workflow für GRELLWERK

Wie man mit KI in diesem Repo das beste Ergebnis erzielt. Knapp halten, bei Änderungen
mitpflegen. Schneller Einstieg in jeder Session: **`/help-grellwerk`**.

## Orchestrierung

```
        ┌─────────────┐   parallel    ┌─────────────┐
  Thema │ researcher  │──┐            │  builder    │──► generate.cjs ──► journal-*.html
  ─────►│ researcher  │  ├─► Rohstoff►│ (Daten-CJS) │    + Grid/Sitemap/Chip
        │ researcher  │──┘            └─────────────┘
        └─────────────┘                      │
                                             ▼
                                    ┌─────────────┐      ┌──────────────┐
                                    │  reviewer   │────► │ verify.cjs   │ ──► grün? fertig
                                    │ (Diff+Konv) │      │  (das Gate)  │ ──► rot? fixen
                                    └─────────────┘      └──────────────┘
```

- **Fan-out-Recherche**, wenn ein Thema mehrere Teilfragen hat oder Zahlen gegengeprüft werden
  müssen: 2–4 `researcher`-Agenten parallel (mehrere Agent-Aufrufe in EINER Nachricht). Bei
  einem eng umrissenen Faktencheck reicht ein Agent.
- **Bauen** immer über den Generator (`builder`), nie HTML von Hand klonen.
- **Reviewer + Gate** sind die letzte Instanz vor dem Commit.

Slash-Command für den ganzen Ablauf: **`/neuer-artikel <thema>`**.

## Mehrwert-Anatomie eines Artikels

Ein guter Journal-Artikel ist mehr als Text. Reihenfolge im Body:

1. **Hook** — Zahl/Beobachtung, die sofort Spannung erzeugt (aus dem `dek` aufgegriffen).
2. **Framework-Diagramm** — ein Modell, das das Thema ordnet, gebaut aus `tools/lib/figures.cjs`
   (`matrix · pyramid · layers · hbars · stackBar · funnel · triangle · curve`).
3. **Rechenbeispiel** (`calc`) — Ausgangslage → Hebel → Ergebnis, als illustrativ markiert.
4. **Checkliste** — 3–5 Schritte, die der Leser am Montag umsetzt.
5. **Gegen-These** — wann die Story NICHT gilt. Schafft Glaubwürdigkeit.
6. **Schluss-Zitat + Quellen** — zugespitzter Merksatz, Quellen verlinkt (`article__sources`).

## Goldene Regel: generieren statt klonen

nav/footer/brummer/head sind auf jeder der ~40 Seiten dupliziert. Wer von Hand kopiert,
erzeugt Drift. Deshalb: Artikel als **Daten-Datei** (`tools/content/articles/<slug>.cjs`)
schreiben, Chrome aus `tools/lib/chrome.cjs`, Seite mit `node tools/generate.cjs` rendern.
Der Generator schreibt nur die Artikelseite — Grid-Karte, Sitemap und Filter-Chip bleiben
manuell und werden vom Gate erzwungen.

## Das Verify-Gate (`node tools/verify.cjs`)

Pflicht vor jedem Commit/Push. Läuft auch in CI (`.github/workflows/verify.yml`) und lokal als
Stop-Hook, sobald HTML/JS/CSS geändert wurden (`.claude/hooks/verify-gate.sh`). Prüfungen:

| Prüfung | fängt ab |
|---|---|
| JS-Syntax (`node --check`) | kaputtes JS |
| Meta-Attribute | gerade `"` im `content="…"` (zerschossenes Attribut) |
| Rohe `<`-Zeichen | `<2,5 s` / `<50 ms` im Text statt `&lt;` |
| Links + Assets | tote interne Links, fehlende css/js/assets |
| Pflicht-Meta | fehlender Title / Description / Canonical / og:image |
| Chrome-Drift | nav/footer/brummer weicht von der zentralen Chrome ab |
| Journal/Sitemap | Artikel fehlt im Grid oder in der Sitemap (beidseitig) |
| Build-Smoke | `build-standalone.cjs` läuft fehlerfrei |

Rot ist blockierend. Fixen, nicht übergehen.

## Goldene Regeln für Inhalte (Bug-Prävention)

- In Meta-Texten (desc/ogDesc/Attribute) **keine geraden `"`** — typografische „…" nutzen.
- „kleiner als"-Werte ausschreiben oder `&lt;` — nie rohes `<` vor einer Zahl.
- Diagramm-Farben aus `figures.cjs` (`F.C.*`), Layout-Farben aus den CSS-Tokens. Keine Hardcodes.
- Kategorie konsistent halten: Eyebrow = Tag = `data-cat` (performance/branding/social/daten/web/meinung).
