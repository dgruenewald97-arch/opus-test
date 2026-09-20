/* =====================================================================
   Agent Lens — Demo-Treiber
   Spielt eine realistische Agent-Session zeitgesteuert ab, damit man
   SOFORT sieht, was das Tool tut — ganz ohne echten Agent.
   Erzeugt exakt dieselbe Datenstruktur wie eine echte session.json.
   ===================================================================== */
(function () {
  const now = () => Date.now();

  // Eine Session von Grund auf — der Treiber füllt sie Frame für Frame.
  function freshSession() {
    return {
      schema: 1,
      demo: true,
      session: {
        id: "demo_" + Math.random().toString(36).slice(2, 8),
        title: "Passkey-Login bauen",
        model: "claude-opus-4-8",
        startedAt: now(),
        updatedAt: now(),
        status: "thinking",
        phase: "Verstehen",
        now: "Lese mich in die bestehende Auth ein …",
        sub: "Ich schaue erst, was schon da ist, bevor ich etwas ändere.",
      },
      tasks: [
        { id: "t1", label: "Repo erkunden", status: "active" },
        { id: "t2", label: "Plan abstimmen", status: "pending" },
        { id: "t3", label: "Auth-Service bauen", status: "pending" },
        { id: "t4", label: "Login-UI verdrahten", status: "pending" },
        { id: "t5", label: "Tests & Verify", status: "pending" },
      ],
      events: [],
      files: [],
      metrics: { tools: 0, files: 0 },
      awaiting: null,
    };
  }

  let state, timer, idx;

  // helper: Status + „Jetzt"-Zeile setzen
  function set(status, phase, line, sub) {
    state.session.status = status;
    if (phase) state.session.phase = phase;
    if (line) state.session.now = line;
    if (sub !== undefined) state.session.sub = sub;
  }
  // helper: Event anhängen
  function ev(type, title, detail, extra) {
    const e = { id: "e" + (state.events.length + 1), ts: now(), type, title, detail };
    if (extra) Object.assign(e, extra);
    state.events.push(e);
    if (type === "tool" || type === "file") state.metrics.tools++;
    return e;
  }
  // helper: berührte Datei vormerken (einmalig pro Pfad, Op aktualisieren)
  function touch(op, path) {
    let f = state.files.find((x) => x.path === path);
    if (f) { f.op = op; } else { state.files.push({ op, path }); }
    state.metrics.files = state.files.length;
  }
  function task(id, status) {
    const t = state.tasks.find((x) => x.id === id);
    if (t) t.status = status;
  }

  // ---- Das Drehbuch: [Verzögerung ms, Funktion] -------------------------
  const script = [
    [400, () => { ev("thought", "Plane das Vorgehen", "Erst lesen, dann Plan, dann bauen — nichts blind ändern."); }],
    [1200, () => { set("working", "Erkunden", "Durchsuche das Projekt nach Auth-Logik"); ev("tool", "Grep", "\"login|session|token\" · 14 Treffer", { status: "ok", ms: 180 }); }],
    [1300, () => { ev("tool", "Read", "src/auth/session.ts", { status: "ok", ms: 90 }); touch("read", "src/auth/session.ts"); }],
    [1200, () => { ev("tool", "Read", "src/auth/middleware.ts", { status: "ok", ms: 70 }); touch("read", "src/auth/middleware.ts"); }],
    [1400, () => {
      set("thinking", "Planen", "Fasse einen Plan zusammen");
      task("t1", "done"); task("t2", "active");
      ev("thought", "Verstanden", "Sessions liegen als Cookie, kein Passkey-Support. Ich ergänze WebAuthn additiv.");
    }],
    [1500, () => {
      set("waiting", "Abstimmen", "Warte auf dein Okay zum Plan", "Kurz bestätigen — dann lege ich los.");
      ev("message", "Plan steht", "Passkey additiv neben dem Cookie-Login. 3 neue Dateien, keine Breaking Changes. Soll ich?");
      state.awaiting = {
        question: "Plan umsetzen?",
        options: [
          { id: "go", label: "Los geht's", primary: true },
          { id: "wait", label: "Erst Tests zuerst" },
        ],
      };
    }],
    // -> wartet hier auf Klick ODER springt nach Timeout automatisch weiter
    [4200, () => {
      if (state.awaiting) { resolveAsk("go", true); }
    }],
  ];

  // Phase 2 nach der Bestätigung (separat, damit Klick es sofort starten kann)
  const buildScript = [
    [300, () => {
      state.awaiting = null;
      set("working", "Bauen", "Lege den Passkey-Service an");
      task("t2", "done"); task("t3", "active");
    }],
    [1200, () => { ev("file", "src/auth/passkey.ts", "+96  neue Datei", { op: "create" }); touch("create", "src/auth/passkey.ts"); }],
    [1300, () => { ev("file", "src/auth/passkey.ts", "+22  −4  Challenge-Handling", { op: "edit" }); touch("edit", "src/auth/passkey.ts"); }],
    [1200, () => { ev("tool", "Read", "src/routes/auth.ts", { status: "ok", ms: 60 }); touch("read", "src/routes/auth.ts"); }],
    [1300, () => { set("working", "Bauen", "Verdrahte die Login-Oberfläche"); task("t3", "done"); task("t4", "active"); ev("file", "src/routes/auth.ts", "+18  −1  Routen registriert", { op: "edit" }); touch("edit", "src/routes/auth.ts"); }],
    [1300, () => { ev("file", "src/ui/Login.tsx", "+41  −7  „Mit Passkey anmelden\"", { op: "edit" }); touch("edit", "src/ui/Login.tsx"); }],
    [1400, () => { set("working", "Prüfen", "Lasse die Tests laufen"); task("t4", "done"); task("t5", "active"); ev("tool", "Bash", "npm test", { status: "running" }); }],
    [2100, () => {
      const e = [...state.events].reverse().find((x) => x.title === "Bash");
      if (e) { e.status = "ok"; e.detail = "npm test · 38 grün"; e.ms = 1940; }
      ev("thought", "Grün", "Alle Tests laufen durch, keine Regression im Cookie-Pfad.");
    }],
    [1200, () => {
      set("done", "Fertig", "Passkey-Login steht — bereit zum Review", "3 Dateien geändert, 1 neu. Sag Bescheid, was du sehen willst.");
      task("t5", "done");
      ev("message", "Erledigt", "Passkey-Login ist additiv eingebaut und getestet. Soll ich einen Commit vorbereiten?");
    }],
  ];

  let phase = "main";
  function tick() {
    const seq = phase === "main" ? script : buildScript;
    if (idx >= seq.length) {
      if (phase === "main") return; // wartet ggf. auf Klick; Timeout-Frame hat schon gegriffen
      return; // Ende
    }
    const [delay, fn] = seq[idx++];
    timer = setTimeout(() => {
      fn();
      state.session.updatedAt = now();
      emit();
      tick();
    }, delay);
  }

  // Klick auf eine Ask-Option (vom Composer aufgerufen) oder Auto-Resolve
  function resolveAsk(optionId, auto) {
    if (!state.awaiting) return;
    const opt = state.awaiting.options.find((o) => o.id === optionId) || { label: optionId };
    ev("message", auto ? "Automatisch fortgesetzt" : "Du hast geantwortet", opt.label, { role: "user" });
    state.awaiting = null;
    // in die Bau-Phase wechseln
    clearTimeout(timer);
    phase = "build"; idx = 0;
    emit();
    tick();
  }

  let onUpdate = () => {};
  function emit() { onUpdate(state); }

  window.AgentLensDemo = {
    start(cb) {
      onUpdate = cb || onUpdate;
      state = freshSession();
      phase = "main"; idx = 0;
      emit();
      tick();
    },
    stop() { clearTimeout(timer); },
    // erlaubt dem Composer, eine Ask-Antwort/Nachricht in die Demo zu spielen
    answer(optionId) { resolveAsk(optionId, false); },
    say(text) {
      if (!state) return;
      ev("message", "Du", text, { role: "user" });
      state.session.updatedAt = now();
      emit();
    },
    get state() { return state; },
  };
})();
