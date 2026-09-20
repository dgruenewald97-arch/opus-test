#!/usr/bin/env node
/* =====================================================================
   Agent Lens — serve.cjs
   Winziger Zero-Dependency-Server: liefert das UI statisch aus UND
   bietet die API-Endpunkte, die der Live-Modus + die Eingabe brauchen.

     node bridge/serve.cjs            → http://localhost:4173
     PORT=8080 node bridge/serve.cjs

   Endpunkte:
     GET  /                  UI (index.html)
     GET  /data/session.json aktueller Stand (vom Agent geschrieben)
     POST /api/event         { cmd, args:[...] }  → wendet emit-Mutation an
     POST /api/session       komplette Session ersetzen (JSON-Body)
     POST /api/feedback      { type, text|option } → hängt an data/feedback.json
   ===================================================================== */
const http = require("http");
const fs = require("fs");
const path = require("path");
const emit = require("./emit.cjs");

const ROOT = path.join(__dirname, "..");
const PORT = Number(process.env.PORT) || 4173;

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};

function send(res, code, body, type) {
  res.writeHead(code, { "Content-Type": type || "text/plain; charset=utf-8", "Cache-Control": "no-store" });
  res.end(body);
}
function readBody(req) {
  return new Promise((resolve) => {
    let d = "";
    req.on("data", (c) => (d += c));
    req.on("end", () => resolve(d));
  });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, "http://x");
  const p = decodeURIComponent(url.pathname);

  // ---------------- API ----------------
  if (req.method === "POST" && p === "/api/event") {
    try {
      const { cmd, args } = JSON.parse(await readBody(req));
      const s = emit.load();
      emit.apply(s, cmd, args || []);
      emit.save(s);
      return send(res, 200, JSON.stringify({ ok: true }), MIME[".json"]);
    } catch (e) {
      return send(res, 400, JSON.stringify({ ok: false, error: String(e.message || e) }), MIME[".json"]);
    }
  }
  if (req.method === "POST" && p === "/api/session") {
    try {
      const s = JSON.parse(await readBody(req));
      emit.save(s);
      return send(res, 200, JSON.stringify({ ok: true }), MIME[".json"]);
    } catch (e) {
      return send(res, 400, JSON.stringify({ ok: false, error: String(e.message || e) }), MIME[".json"]);
    }
  }
  if (req.method === "POST" && p === "/api/feedback") {
    try {
      const entry = JSON.parse(await readBody(req));
      entry.ts = entry.ts || Date.now();
      const file = path.join(ROOT, "data", "feedback.json");
      let arr = [];
      try { arr = JSON.parse(fs.readFileSync(file, "utf8")); } catch {}
      arr.push(entry);
      fs.mkdirSync(path.dirname(file), { recursive: true });
      fs.writeFileSync(file, JSON.stringify(arr, null, 2) + "\n");
      console.log("📨 Feedback:", entry.text || entry.label || JSON.stringify(entry));
      return send(res, 200, JSON.stringify({ ok: true }), MIME[".json"]);
    } catch (e) {
      return send(res, 400, JSON.stringify({ ok: false, error: String(e.message || e) }), MIME[".json"]);
    }
  }

  // ---------------- Statisch ----------------
  if (req.method !== "GET") return send(res, 405, "Method Not Allowed");
  let rel = p === "/" ? "/index.html" : p;
  const file = path.normalize(path.join(ROOT, rel));
  if (!file.startsWith(ROOT)) return send(res, 403, "Forbidden");
  fs.readFile(file, (err, data) => {
    if (err) return send(res, 404, "Not Found");
    send(res, 200, data, MIME[path.extname(file)] || "application/octet-stream");
  });
});

server.listen(PORT, () => {
  console.log("Agent Lens läuft auf  http://localhost:" + PORT);
  console.log("UI im Live-Modus:      http://localhost:" + PORT + "/?mode=live");
  console.log("Verlauf schreiben:     node bridge/emit.cjs <befehl> …  (oder POST /api/event)");
});
