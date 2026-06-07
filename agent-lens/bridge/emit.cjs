#!/usr/bin/env node
/* =====================================================================
   Agent Lens — emit.cjs
   Mini-CLI, mit der ein Agent (oder Skript) seinen Verlauf in
   data/session.json schreibt. Reines Node, keine Dependencies.

   Beispiele:
     node bridge/emit.cjs reset "Passkey-Login bauen"
     node bridge/emit.cjs status working "Lege den Service an"
     node bridge/emit.cjs task t1 active "Repo erkunden"
     node bridge/emit.cjs thought "Plane" "Erst lesen, dann ändern"
     node bridge/emit.cjs tool Read "src/auth.ts" ok 90
     node bridge/emit.cjs file edit "src/auth.ts" "+12 −2"
     node bridge/emit.cjs message "Plan steht" "Soll ich loslegen?"
     node bridge/emit.cjs ask "Plan umsetzen?" go:Los wait:"Erst Tests"
     node bridge/emit.cjs done "Fertig — bereit fürs Review"
   ===================================================================== */
const fs = require("fs");
const path = require("path");

const DATA = path.join(__dirname, "..", "data", "session.json");

function load() {
  try {
    return JSON.parse(fs.readFileSync(DATA, "utf8"));
  } catch {
    return fresh("Neue Session");
  }
}
function fresh(title) {
  const t = Date.now();
  return {
    schema: 1,
    session: { id: "sess_" + t.toString(36), title: title || "Session", model: process.env.AGENT_MODEL || "claude-opus-4-8", startedAt: t, updatedAt: t, status: "thinking", phase: "", now: "", sub: "" },
    tasks: [],
    events: [],
    files: [],
    metrics: { tools: 0, files: 0 },
    awaiting: null,
  };
}
function save(s) {
  s.session.updatedAt = Date.now();
  fs.mkdirSync(path.dirname(DATA), { recursive: true });
  fs.writeFileSync(DATA, JSON.stringify(s, null, 2) + "\n");
}
function nextId(s) { return "e" + (s.events.length + 1); }
function pushEvent(s, e) {
  e.id = e.id || nextId(s);
  e.ts = e.ts || Date.now();
  s.events.push(e);
  if (e.type === "tool" || e.type === "file") s.metrics.tools = (s.metrics.tools || 0) + 1;
  return e;
}
function touch(s, op, p) {
  let f = s.files.find((x) => x.path === p);
  if (f) f.op = op; else s.files.push({ op, path: p });
  s.metrics.files = s.files.length;
}

// Eine einzelne Mutation anwenden (auch von serve.cjs genutzt).
function apply(s, cmd, args) {
  switch (cmd) {
    case "reset": {
      const ns = fresh(args[0]);
      Object.assign(s, ns);
      break;
    }
    case "status": // status <state> [now] [sub]
      s.session.status = args[0] || s.session.status;
      if (args[1] != null) s.session.now = args[1];
      if (args[2] != null) s.session.sub = args[2];
      break;
    case "phase":
      s.session.phase = args[0] || "";
      break;
    case "now":
      s.session.now = args[0] || "";
      if (args[1] != null) s.session.sub = args[1];
      break;
    case "done":
      s.session.status = "done";
      s.session.phase = "Fertig";
      if (args[0]) s.session.now = args[0];
      if (args[1] != null) s.session.sub = args[1];
      break;
    case "error":
      s.session.status = "error";
      if (args[0]) s.session.now = args[0];
      pushEvent(s, { type: "error", title: args[0] || "Fehler", detail: args[1] || "" });
      break;
    case "task": { // task <id> <status> [label]
      const [id, status, label] = args;
      let t = s.tasks.find((x) => x.id === id);
      if (t) { t.status = status || t.status; if (label) t.label = label; }
      else s.tasks.push({ id, label: label || id, status: status || "pending" });
      break;
    }
    case "thought":
      pushEvent(s, { type: "thought", title: args[0] || "", detail: args[1] || "" });
      break;
    case "message":
      pushEvent(s, { type: "message", title: args[0] || "", detail: args[1] || "", role: args[2] || "agent" });
      break;
    case "tool": { // tool <title> <detail> [status] [ms]
      const [title, detail, status, ms] = args;
      pushEvent(s, { type: "tool", title, detail, status: status || "ok", ms: ms ? Number(ms) : undefined });
      break;
    }
    case "file": { // file <op> <path> [detail]
      const [op, p, detail] = args;
      pushEvent(s, { type: "file", title: p, detail: detail || "", op: op || "edit" });
      touch(s, op || "edit", p);
      break;
    }
    case "ask": { // ask <question> id:Label id:Label …
      const question = args[0];
      const options = args.slice(1).map((a, i) => {
        const ci = a.indexOf(":");
        const id = ci === -1 ? a : a.slice(0, ci);
        const label = ci === -1 ? a : a.slice(ci + 1);
        return { id, label, primary: i === 0 };
      });
      s.awaiting = { question, options };
      s.session.status = "waiting";
      break;
    }
    case "clear-ask":
      s.awaiting = null;
      break;
    default:
      throw new Error("Unbekannter Befehl: " + cmd);
  }
  return s;
}

module.exports = { load, save, apply, fresh };

// --- als CLI ausgeführt -------------------------------------------------
if (require.main === module) {
  const [cmd, ...args] = process.argv.slice(2);
  if (!cmd) {
    console.error("Befehl fehlt. Siehe Kommentar in emit.cjs für Beispiele.");
    process.exit(1);
  }
  const s = load();
  try {
    apply(s, cmd, args);
    save(s);
    console.log("ok: " + cmd + (args.length ? " " + args.join(" ") : ""));
  } catch (e) {
    console.error(String(e.message || e));
    process.exit(1);
  }
}
