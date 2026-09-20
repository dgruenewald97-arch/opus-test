#!/usr/bin/env node
/* =====================================================================
   Agent Lens — hook.cjs  (Claude-Code PostToolUse-Hook)
   Liest die Hook-JSON von stdin und übersetzt jeden Tool-Aufruf in ein
   Agent-Lens-Event. Schreibt NUR, wenn eine Live-Session aktiv ist
   (Sentinel data/.live) — sonst tut der Hook nichts und stört nichts.

   Aktivieren:   node bridge/emit.cjs reset "Was ich gerade tue"   (oder: … on)
   Deaktivieren: node bridge/emit.cjs off
   ===================================================================== */
const emit = require("./emit.cjs");

function read() {
  return new Promise((resolve) => {
    let d = "";
    process.stdin.on("data", (c) => (d += c));
    process.stdin.on("end", () => resolve(d));
    // Falls kein stdin kommt: nach kurzem Moment leer auflösen.
    setTimeout(() => resolve(d), 250);
  });
}

const base = (p) => String(p || "").split("/").slice(-2).join("/");
const clip = (s, n) => { s = String(s || "").replace(/\s+/g, " ").trim(); return s.length > n ? s.slice(0, n - 1) + "…" : s; };

// Tool-Aufruf → { event, now }
function translate(name, input, response) {
  const i = input || {};
  switch (name) {
    case "Read":
      return { ev: ["tool", "Read", base(i.file_path), "ok"], now: "Lese " + base(i.file_path) };
    case "Edit":
    case "MultiEdit":
      return { ev: ["file", "edit", relpath(i.file_path), "Bearbeitet"], now: "Bearbeite " + base(i.file_path), file: true };
    case "Write":
      return { ev: ["file", "create", relpath(i.file_path), "Geschrieben"], now: "Schreibe " + base(i.file_path), file: true };
    case "NotebookEdit":
      return { ev: ["file", "edit", relpath(i.notebook_path), "Notebook"], now: "Bearbeite Notebook", file: true };
    case "Grep":
      return { ev: ["tool", "Grep", clip(i.pattern, 48), "ok"], now: "Durchsuche den Code" };
    case "Glob":
      return { ev: ["tool", "Glob", clip(i.pattern, 48), "ok"], now: "Suche Dateien" };
    case "Bash":
      return { ev: ["tool", "Bash", clip(i.command, 60), bashStatus(response)], now: clip(i.description || i.command, 60) };
    case "Task":
    case "Agent":
      return { ev: ["tool", "Agent", clip(i.description || i.prompt, 60), "ok"], now: "Starte einen Teil-Agent" };
    case "WebFetch":
      return { ev: ["tool", "WebFetch", clip(i.url, 56), "ok"], now: "Hole eine Webseite" };
    case "WebSearch":
      return { ev: ["tool", "WebSearch", clip(i.query, 56), "ok"], now: "Recherchiere im Web" };
    case "TodoWrite":
      return { todos: i.todos };
    default:
      return { ev: ["tool", name, "", "ok"], now: clip(name, 40) };
  }
}

function relpath(p) {
  // Pfad relativ zum cwd halten, sonst Basename.
  const cwd = process.cwd();
  let s = String(p || "");
  if (s.startsWith(cwd)) s = s.slice(cwd.length).replace(/^\//, "");
  return s || base(p);
}
function bashStatus(resp) {
  if (resp && (resp.exit_code || resp.exitCode)) return "error";
  return "ok";
}

// TodoWrite → Plan/Tasks synchronisieren
function syncTodos(s, todos) {
  s.tasks = todos.map((t, n) => ({
    id: "t" + (n + 1),
    label: t.content || t.activeForm || ("Schritt " + (n + 1)),
    status: t.status === "completed" ? "done" : t.status === "in_progress" ? "active" : "pending",
  }));
}

(async function main() {
  // Nichts tun, wenn keine Live-Session läuft → Hook ist dann inert.
  if (!emit.isLive()) process.exit(0);

  let payload = {};
  try { payload = JSON.parse((await read()) || "{}"); } catch { process.exit(0); }

  const name = payload.tool_name || payload.toolName;
  if (!name) process.exit(0);

  const t = translate(name, payload.tool_input || payload.toolInput, payload.tool_response || payload.toolResponse);
  const s = emit.load();

  if (t.todos) {
    syncTodos(s, t.todos);
  } else if (t.ev) {
    const [type, a, b, c] = t.ev;
    if (t.file) emit.apply(s, "file", [a, b, c]);
    else emit.apply(s, "tool", [a, b, c]);
    if (s.session.status !== "waiting" && s.session.status !== "error") s.session.status = "working";
    if (t.now) s.session.now = t.now;
  }
  emit.save(s);
  process.exit(0);
})();
