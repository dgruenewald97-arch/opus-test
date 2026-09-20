# Agent Lens

**Sieh, was deine KI gerade tut — statt eine Textwand zu lesen.**

Du arbeitest wie gewohnt in Claude (oder einem anderen Agent). Der Agent schreibt
seinen Verlauf in eine kleine `session.json`. Agent Lens liest diese Datei und macht
daraus eine ruhige, visuelle Live-Ansicht: *Was passiert gerade? Welcher Schritt? Welche
Dateien? Worauf wartet die KI?* Plus ein Eingabefeld, um zwischendurch Feedback zu geben.

Reines Vanilla (HTML/CSS/JS), keine Dependencies, kein Build. Apple-clean, Light + Dark.

---

## In 30 Sekunden ausprobieren

**Nur ansehen (Demo):** `agent-lens/index.html` im Browser öffnen.
Der Demo-Modus spielt eine echte Beispiel-Session ab — du siehst sofort, wie es wirkt.

**Live mit echtem Agent:**

```bash
node agent-lens/bridge/serve.cjs
# → http://localhost:4173/?mode=live
```

In einem zweiten Terminal (oder direkt vom Agent) den Verlauf schreiben:

```bash
node agent-lens/bridge/emit.cjs reset "Passkey-Login bauen"
node agent-lens/bridge/emit.cjs status working "Lege den Service an"
node agent-lens/bridge/emit.cjs task t1 active "Repo erkunden"
node agent-lens/bridge/emit.cjs tool Read "src/auth.ts" ok 90
node agent-lens/bridge/emit.cjs file edit "src/auth.ts" "+12 −2"
node agent-lens/bridge/emit.cjs done "Fertig — bereit fürs Review"
```

Die Ansicht aktualisiert sich automatisch (Polling, 1 s).

> Ohne `serve.cjs` reicht auch jeder statische Server (`python3 -m http.server`) für den
> Live-Modus — dann liest das UI `data/session.json` direkt. Das Eingabefeld braucht aber
> die Bridge (`serve.cjs`); ohne sie kopiert „Senden" den Text in die Zwischenablage.

---

## Wie ein Agent anbindet

Drei Wege, alle schreiben dieselbe `data/session.json`:

1. **Emit-CLI** (am einfachsten): `node bridge/emit.cjs <befehl> …` pro Schritt aufrufen.
   Befehle: `reset · status · phase · now · task · thought · tool · file · message · ask ·
   clear-ask · done · error`. Beispiele stehen oben in `bridge/emit.cjs`.
2. **HTTP** an die Bridge: `POST /api/event` mit `{ "cmd": "tool", "args": ["Read","src/x",  "ok"] }`,
   oder `POST /api/session` mit einer kompletten Session.
3. **Datei direkt schreiben:** `data/session.json` nach dem Schema unten erzeugen/überschreiben.

Für Claude Code bietet sich (1) an — der Agent ruft `emit.cjs` als ganz normalen Befehl auf,
während er arbeitet. Oder vollautomatisch über den Hook (siehe unten).

---

## Automatik: Claude-Code-Hook

Ein `PostToolUse`-Hook (`bridge/hook.cjs`, eingetragen in `.claude/settings.json`) übersetzt
**jeden Tool-Aufruf von Claude automatisch** in ein Agent-Lens-Event — Read/Edit/Write/Grep/
Bash/Task/Web… landen als Schritte, `TodoWrite` füllt den Plan. Kein manuelles Tippen nötig.

Der Hook ist **opt-in**: Er schreibt nur, solange eine Live-Session läuft (Sentinel
`data/.live`). Ohne dieses Flag ist er komplett inert und stört normale Sessions nicht.

```bash
node agent-lens/bridge/serve.cjs            # UI starten → http://localhost:4173/?mode=live
node agent-lens/bridge/emit.cjs reset "Was ich gerade tue"   # Live scharf schalten (.live an)
#   … jetzt in Claude arbeiten — die Ansicht füllt sich von selbst …
node agent-lens/bridge/emit.cjs off          # Live-Erfassung beenden (.live weg)
```

`reset` legt eine frische Session an UND aktiviert den Hook; `on`/`off` schalten nur das Flag.

---

## Datenschema (`data/session.json`)

```jsonc
{
  "schema": 1,
  "session": {
    "id": "sess_…",
    "title": "Passkey-Login bauen",   // Überschrift der Session
    "model": "claude-opus-4-8",
    "startedAt": 0, "updatedAt": 0,    // ms-Zeitstempel
    "status": "working",               // idle|thinking|working|waiting|done|error
    "phase": "Bauen",                  // kurzes Phasen-Label
    "now": "Lege den Service an",       // EINE Zeile: was gerade passiert (der Kern!)
    "sub": "kurzer Zusatz"              // optional
  },
  "tasks": [                            // der Plan / die Checkliste
    { "id": "t1", "label": "Repo erkunden", "status": "done" }   // pending|active|done
  ],
  "events": [                           // der Verlauf (neueste zeigt das UI oben)
    { "id": "e1", "ts": 0, "type": "tool", "title": "Read",
      "detail": "src/auth.ts", "status": "ok", "ms": 90 }
    // type: tool | file | thought | message | error
    // tool/file kennen status (ok|running|error) + ms; file kennt op (read|edit|write|create|delete)
  ],
  "files": [ { "op": "edit", "path": "src/auth.ts" } ],
  "metrics": { "tools": 3, "files": 2 },
  "awaiting": {                         // null, außer der Agent braucht Input
    "question": "Plan umsetzen?",
    "options": [ { "id": "go", "label": "Los", "primary": true } ]
  }
}
```

`status` tönt die ganze Oberfläche dezent ein (Denken violett, Arbeiten blau, Warten gelb,
Fertig grün, Fehler rot). `now` ist bewusst **eine** Zeile — das ist die Hauptaussage für alle,
die nicht mitlesen wollen.

---

## Dateien

```
agent-lens/
  index.html         UI-Gerüst
  css/lens.css        Design (Tokens, Light/Dark, Motion)
  js/lens.js          Render + Polling + Eingabe
  js/demo.js          abgespielte Beispiel-Session (Demo-Modus)
  data/session.json   aktueller Stand — vom Agent geschrieben
  bridge/serve.cjs    Mini-Server (statisch + API + Eingabe)
  bridge/emit.cjs     CLI/Bibliothek zum Schreiben des Verlaufs
```

Eigenständiges Nebenprojekt — unabhängig von GRELLWERK, berührt dessen Build/Verify nicht.
