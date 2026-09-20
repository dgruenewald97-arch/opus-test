/* =====================================================================
   Agent Lens — App-Logik
   Liest eine Session (Demo-Treiber ODER echte data/session.json) und
   rendert daraus die Live-Ansicht. Reines Vanilla, keine Dependencies.
   ===================================================================== */
(function () {
  "use strict";

  const $ = (id) => document.getElementById(id);
  const body = document.body;

  // -------------------------------------------------- Konfiguration
  const LIVE_URL = "data/session.json"; // Quelle im Live-Modus
  const POLL_MS = 1000; //              Abfrage-Intervall
  const BRIDGE_FEEDBACK = "api/feedback"; // optionaler Bridge-Endpunkt (POST)

  const STATUS_LABEL = {
    idle: "Bereit",
    thinking: "Denkt nach",
    working: "Arbeitet",
    waiting: "Wartet auf dich",
    done: "Fertig",
    error: "Fehler",
  };

  // SVG-Icons je Event-Typ (16px, currentColor)
  const ICONS = {
    tool: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a4 4 0 0 0-5.4 5.3L4 17v3h3l5.4-5.3a4 4 0 0 0 5.3-5.4l-2.6 2.6-2-2 2.6-2.6z"/></svg>',
    file: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/></svg>',
    thought: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0-4 10.5V16h8v-2.5A6 6 0 0 0 12 3z"/><path d="M9 19h6M10 21h4"/></svg>',
    message: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-5A8 8 0 1 1 21 12z"/></svg>',
    error: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 8v4M12 16h.01"/></svg>',
  };
  const CHECK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5L20 6"/></svg>';

  // -------------------------------------------------- Zustand
  let mode = "demo"; // "demo" | "live"
  let pollTimer = null;
  let lastSig = ""; // Signatur, um No-op-Renders zu sparen
  let renderedEvents = new Set(); // welche Event-IDs schon im DOM sind
  let current = null; // letzte Session

  // -------------------------------------------------- Render
  function render(s) {
    if (!s) return;
    current = s;
    const sess = s.session || {};
    const status = sess.status || "idle";

    body.dataset.status = status;
    $("status-label").textContent = STATUS_LABEL[status] || status;

    // Kopf
    $("session-title").textContent = sess.title || "Session";
    const model = $("session-model");
    if (sess.model) { model.textContent = sess.model; model.hidden = false; } else { model.hidden = true; }

    // „Jetzt"
    $("now-phase").textContent = sess.phase || STATUS_LABEL[status] || "";
    swapText($("now-line"), sess.now || "Bereit, wenn du es bist.");
    $("now-sub").textContent = sess.sub || "";

    // Verlauf (nur neue Events anhängen → smooth)
    renderFeed(s.events || []);

    // Plan
    renderPlan(s.tasks || []);

    // Stats
    const m = s.metrics || {};
    $("stat-tools").textContent = m.tools != null ? m.tools : (s.events || []).filter((e) => e.type === "tool" || e.type === "file").length;
    $("stat-files").textContent = m.files != null ? m.files : (s.files || []).length;

    // Dateien
    renderFiles(s.files || []);

    // Eingabe-Anfrage
    renderAsk(s.awaiting);
  }

  function swapText(el, text) {
    if (el.textContent === text) return;
    el.classList.add("is-swapping");
    setTimeout(() => { el.textContent = text; el.classList.remove("is-swapping"); }, 160);
  }

  function renderFeed(events) {
    const feed = $("feed");
    // Neueste oben: wir rendern absteigend, hängen aber neue oben ein.
    for (const e of events) {
      if (renderedEvents.has(e.id)) {
        // ggf. Status/Detail aktualisieren (z. B. laufender Tool-Call wird „ok")
        const node = feed.querySelector('[data-ev="' + e.id + '"]');
        if (node) updateEventNode(node, e);
        continue;
      }
      renderedEvents.add(e.id);
      feed.insertBefore(buildEventNode(e), feed.firstChild);
    }
    $("feed-count").textContent = events.length + (events.length === 1 ? " Schritt" : " Schritte");
  }

  function buildEventNode(e) {
    const li = document.createElement("li");
    li.className = "event event--" + e.type;
    li.dataset.ev = e.id;
    li.innerHTML =
      '<span class="event__icon">' + (ICONS[e.type] || ICONS.tool) + "</span>" +
      '<div class="event__body">' +
      '<div class="event__title"></div>' +
      '<div class="event__detail"></div>' +
      "</div>" +
      '<span class="event__meta"></span>';
    updateEventNode(li, e);
    return li;
  }

  function updateEventNode(node, e) {
    node.querySelector(".event__title").textContent = e.title || "";
    const det = node.querySelector(".event__detail");
    det.textContent = e.detail || "";
    det.style.display = e.detail ? "" : "none";
    const meta = node.querySelector(".event__meta");
    let text = "", cls = "";
    if (e.status === "running") { text = "läuft …"; cls = "event__meta--running"; }
    else if (e.status === "ok") { text = e.ms ? fmtMs(e.ms) : "ok"; cls = "event__meta--ok"; }
    else if (e.status === "error") { text = "Fehler"; cls = "event__meta--error"; }
    else if (e.role === "user") { text = "Du"; }
    meta.textContent = text;
    meta.className = "event__meta " + cls;
  }

  function renderPlan(tasks) {
    const list = $("plan");
    list.innerHTML = "";
    let done = 0;
    for (const t of tasks) {
      if (t.status === "done") done++;
      const li = document.createElement("li");
      li.className = "plan__item plan__item--" + (t.status || "pending");
      li.innerHTML = '<span class="plan__tick">' + CHECK + "</span>" + '<span class="plan__label"></span>';
      li.querySelector(".plan__label").textContent = t.label;
      list.appendChild(li);
    }
    $("plan-progress").textContent = done + " / " + tasks.length;
    const pct = tasks.length ? (done / tasks.length) * 100 : 0;
    $("plan-fill").style.width = pct + "%";
  }

  function renderFiles(files) {
    const list = $("files");
    list.innerHTML = "";
    for (const f of files) {
      const li = document.createElement("li");
      li.className = "file";
      li.innerHTML =
        '<span class="file__op file__op--' + (f.op || "edit") + '">' + (f.op || "edit") + "</span>" +
        '<span class="file__path" title="' + escapeAttr(f.path) + '">' + escapeHtml(f.path) + "</span>";
      list.appendChild(li);
    }
  }

  function renderAsk(awaiting) {
    const ask = $("ask");
    if (!awaiting) { ask.hidden = true; return; }
    ask.hidden = false;
    $("ask-q").textContent = awaiting.question || "Eingabe nötig";
    const opts = $("ask-opts");
    opts.innerHTML = "";
    (awaiting.options || []).forEach((o) => {
      const b = document.createElement("button");
      b.className = "ask-opt" + (o.primary ? " ask-opt--primary" : "");
      b.textContent = o.label;
      b.addEventListener("click", () => handleAnswer(o.id, o.label));
      opts.appendChild(b);
    });
  }

  // -------------------------------------------------- Eingabe / Feedback
  function handleAnswer(optionId, label) {
    if (mode === "demo" && window.AgentLensDemo) {
      window.AgentLensDemo.answer(optionId);
      toast("Antwort übernommen: " + label);
    } else {
      sendFeedback({ type: "answer", option: optionId, label });
    }
  }

  function onSubmit(e) {
    e.preventDefault();
    const input = $("composer-input");
    const text = input.value.trim();
    if (!text) return;
    input.value = "";
    if (mode === "demo" && window.AgentLensDemo) {
      window.AgentLensDemo.say(text);
      render(window.AgentLensDemo.state);
      toast("In die Demo gespielt");
    } else {
      sendFeedback({ type: "message", text });
    }
  }

  // Schickt Feedback an die Bridge; fällt sonst auf Zwischenablage zurück.
  function sendFeedback(payload) {
    const body = JSON.stringify({ ...payload, ts: Date.now() });
    fetch(BRIDGE_FEEDBACK, { method: "POST", headers: { "Content-Type": "application/json" }, body })
      .then((r) => { if (!r.ok) throw new Error(r.status); return r.json().catch(() => ({})); })
      .then(() => toast("An den Agent gesendet"))
      .catch(() => {
        const text = payload.text || payload.label || JSON.stringify(payload);
        if (navigator.clipboard) {
          navigator.clipboard.writeText(text).then(
            () => toast("Keine Bridge — in Zwischenablage kopiert, in Claude einfügen"),
            () => toast("Keine Bridge aktiv (siehe README)")
          );
        } else {
          toast("Keine Bridge aktiv (siehe README)");
        }
      });
  }

  // -------------------------------------------------- Modus-Umschaltung
  function setMode(next) {
    if (next === mode) return;
    mode = next;
    body.dataset.mode = mode;
    $("mode-demo").classList.toggle("is-active", mode === "demo");
    $("mode-live").classList.toggle("is-active", mode === "live");
    $("mode-demo").setAttribute("aria-selected", String(mode === "demo"));
    $("mode-live").setAttribute("aria-selected", String(mode === "live"));
    resetView();
    if (mode === "demo") startDemo();
    else startLive();
  }

  function resetView() {
    if (window.AgentLensDemo) window.AgentLensDemo.stop();
    if (pollTimer) { clearInterval(pollTimer); pollTimer = null; }
    $("feed").innerHTML = "";
    renderedEvents = new Set();
    lastSig = "";
    $("composer-note").textContent = "";
  }

  function startDemo() {
    $("composer-note").textContent = "Demo-Modus — eine abgespielte Beispiel-Session.";
    window.AgentLensDemo.start((s) => render(s));
  }

  function startLive() {
    $("composer-note").textContent = "Live-Modus — liest data/session.json (per HTTP-Server / Bridge).";
    const poll = () => {
      fetch(LIVE_URL + "?t=" + Date.now(), { cache: "no-store" })
        .then((r) => { if (!r.ok) throw new Error(r.status); return r.json(); })
        .then((s) => {
          const sig = (s.session && s.session.updatedAt) + ":" + (s.events ? s.events.length : 0);
          if (sig !== lastSig) { lastSig = sig; render(s); }
        })
        .catch(() => {
          if (!lastSig) $("composer-note").textContent = "Warte auf data/session.json … (Datei noch nicht da oder ohne HTTP-Server geöffnet)";
        });
    };
    poll();
    pollTimer = setInterval(poll, POLL_MS);
  }

  // -------------------------------------------------- Laufzeit-Uhr
  setInterval(() => {
    if (!current || !current.session) return;
    const st = current.session.status;
    const end = (st === "done" || st === "error") && current.session.updatedAt ? current.session.updatedAt : Date.now();
    const ms = end - (current.session.startedAt || end);
    $("stat-elapsed").textContent = fmtClock(ms);
  }, 1000);

  // -------------------------------------------------- Helfer
  function fmtClock(ms) {
    const s = Math.max(0, Math.floor(ms / 1000));
    const m = Math.floor(s / 60);
    return m + ":" + String(s % 60).padStart(2, "0");
  }
  function fmtMs(ms) { return ms >= 1000 ? (ms / 1000).toFixed(1) + "s" : ms + "ms"; }
  function escapeHtml(s) { return String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])); }
  function escapeAttr(s) { return escapeHtml(s); }

  let toastTimer = null;
  function toast(msg) {
    const t = $("toast");
    t.textContent = msg;
    t.classList.add("is-on");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("is-on"), 2600);
  }

  // -------------------------------------------------- Start
  $("composer-form").addEventListener("submit", onSubmit);
  $("mode-demo").addEventListener("click", () => setMode("demo"));
  $("mode-live").addEventListener("click", () => setMode("live"));

  // Startmodus: ?mode=live erzwingt Live, sonst Demo (damit sofort etwas passiert).
  const params = new URLSearchParams(location.search);
  body.dataset.mode = "demo";
  if (params.get("mode") === "live") {
    $("mode-demo").classList.remove("is-active");
    setMode("live");
  } else {
    startDemo();
  }
})();
