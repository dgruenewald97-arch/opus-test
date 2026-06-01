#!/usr/bin/env node
// verify.cjs — DAS Verify-Gate für GRELLWERK (Repo-Root, build-less).
// Reines Node, keine Dependencies, läuft offline. Fängt genau die Fehler ab, die in der
// Vergangenheit mehrfach durchgerutscht sind. Exit 1 bei mindestens einem Fehler.
//
//   node tools/verify.cjs
//
// Prüft: JS-Syntax · kaputte Meta-Attribute · rohe <-Zeichen · interne Links/Assets ·
// Pflicht-Meta · Chrome-Drift (nav/footer/brummer) · Journal/Sitemap-Konsistenz · Build-Smoke.

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const { NAV, FOOTER } = require("./lib/chrome.cjs");

const root = path.join(__dirname, "..");
const errors = [];
const checks = [];
const rel = (p) => path.relative(root, p);

function record(name, localErrors) {
  checks.push({ name, ok: localErrors.length === 0, count: localErrors.length });
  errors.push(...localErrors);
}
const norm = (s) => s.replace(/\s+/g, " ").trim();

// Welche HTML-Seiten gehören zu GRELLWERK (Root)? Standalone-Build ist Artefakt → aus.
const htmlFiles = fs
  .readdirSync(root)
  .filter((f) => f.endsWith(".html") && f !== "grellwerk-standalone.html");
const readRoot = (f) => fs.readFileSync(path.join(root, f), "utf8");

// --- 1) JS-Syntax (node --check) ----------------------------------------------
(function () {
  const e = [];
  const jsDir = path.join(root, "js");
  for (const f of fs.readdirSync(jsDir).filter((x) => x.endsWith(".js"))) {
    try {
      execFileSync("node", ["--check", path.join(jsDir, f)], { stdio: "pipe" });
    } catch (err) {
      e.push(`JS-Syntaxfehler in js/${f}: ${String(err.stderr || err).split("\n")[0]}`);
    }
  }
  record("JS-Syntax (node --check)", e);
})();

// --- 2) Kaputte Meta-Attribute (gerade " im content="…") ----------------------
(function () {
  const e = [];
  for (const f of htmlFiles) {
    const lines = readRoot(f).split("\n");
    lines.forEach((line, i) => {
      let idx = line.indexOf('content="');
      while (idx !== -1) {
        const start = idx + 'content="'.length;
        const close = line.indexOf('"', start);
        if (close !== -1) {
          const rest = line.slice(close + 1);
          // Nach dem schließenden " muss folgen: Tag-Ende, oder weiteres Attribut.
          if (!/^\s*(\/?>|[a-zA-Z-]+=)/.test(rest)) {
            e.push(`${f}:${i + 1} — kaputtes content-Attribut (gerade " im Text?): ${norm(line).slice(0, 90)}`);
          }
        }
        idx = line.indexOf('content="', idx + 1);
      }
    });
  }
  record('Meta-Attribute (gerade " in content)', e);
})();

// --- 3) Rohe <-Zeichen im sichtbaren Text (<2,5 s / <50 ms …) ------------------
(function () {
  const e = [];
  for (const f of htmlFiles) {
    readRoot(f).split("\n").forEach((line, i) => {
      // < direkt gefolgt von Ziffer, oder < + Leerzeichen + Ziffer → nicht escaped
      if (/<(?=\d)|<\s+\d/.test(line)) {
        e.push(`${f}:${i + 1} — rohes < vor Zahl (→ &lt; nutzen): ${norm(line).slice(0, 90)}`);
      }
    });
  }
  record("Rohe <-Zeichen im Text", e);
})();

// --- 4) Interne Links + Asset-Referenzen existieren ---------------------------
(function () {
  const e = [];
  const exists = (p) => fs.existsSync(path.join(root, p));
  for (const f of htmlFiles) {
    const html = readRoot(f);
    const refs = [...html.matchAll(/(?:href|src)="([^"]+)"/g)].map((m) => m[1]);
    for (const r of refs) {
      if (/^(https?:|mailto:|tel:|data:|#)/.test(r)) continue; // extern / in-page
      const target = r.split("#")[0];
      if (!target) continue; // reiner Anker
      if (!exists(target)) {
        e.push(`${f} — toter Verweis: "${r}" (Datei fehlt: ${target})`);
      }
    }
  }
  record("Interne Links + Assets", e);
})();

// --- 5) Pflicht-Meta pro Seite ------------------------------------------------
(function () {
  const e = [];
  const need = [
    [/<title>[^<]+<\/title>/, "<title>"],
    [/<meta\s+name="description"\s+content="[^"]+"/, "meta description"],
    [/<link\s+rel="canonical"/, "canonical"],
    [/property="og:image"/, "og:image"],
  ];
  for (const f of htmlFiles) {
    const html = readRoot(f);
    for (const [re, label] of need) {
      if (!re.test(html)) e.push(`${f} — Pflicht-Meta fehlt: ${label}`);
    }
  }
  record("Pflicht-Meta", e);
})();

// --- 6) Chrome-Drift (nav-Links / footer / brummer) ---------------------------
(function () {
  const e = [];
  // erwartete nav-Link-Sequenz aus der zentralen Chrome.
  // Auf der Homepage ist der Pakete-Link ein Seiten-Anker (#pakete), auf Unterseiten
  // index.html#pakete — semantisch gleich, daher normalisieren wir das weg.
  const navHrefs = (block) =>
    [...block.matchAll(/class="nav__link[^"]*"\s+href="([^"]+)"/g)].map((m) => m[1].replace(/^index\.html#/, "#"));
  const expectNav = navHrefs(NAV).join("|");
  const footerBlock = FOOTER.match(/<footer class="footer">[\s\S]*?<\/footer>/)[0];
  // Footer normalisieren: aria-current="page" (aktive Seite) + Homepage-Selbstanker
  // (#pakete vs index.html#pakete) sind erlaubte, seitenabhängige Varianten.
  // Seiten-Anker-Links (#pakete, #konfigurator, #slogan-lab) sind Homepage-eigene Zusätze —
  // raus, damit nur die echte Cross-Page-Footer-Struktur verglichen wird.
  const footNorm = (s) =>
    norm(s)
      .replace(/\s+aria-current="page"/g, "")
      .replace(/href="index\.html#/g, 'href="#')
      .replace(/<a href="#[^"]*">[^<]*<\/a> ?/g, "");
  const expectFooter = footNorm(footerBlock);
  for (const f of htmlFiles) {
    const html = readRoot(f);
    // nav: gleiche Link-Sequenz (aria-current ignorieren wir, da seitenabhängig)
    const navMatch = html.match(/<header class="nav">[\s\S]*?<\/header>/);
    if (!navMatch) { e.push(`${f} — kein <header class="nav"> gefunden`); }
    else if (navHrefs(navMatch[0]).join("|") !== expectNav) {
      e.push(`${f} — Nav weicht von zentraler Chrome ab (Link-Sequenz)`);
    }
    // footer: normalisiert identisch
    const footMatch = html.match(/<footer class="footer">[\s\S]*?<\/footer>/);
    if (!footMatch) { e.push(`${f} — kein <footer class="footer"> gefunden`); }
    else if (footNorm(footMatch[0]) !== expectFooter) {
      e.push(`${f} — Footer weicht von zentraler Chrome ab`);
    }
    // brummer: Guide-Aside + Tab vorhanden
    if (!/id="guide"/.test(html) || !/id="guide-tab"/.test(html)) {
      e.push(`${f} — Brummer-Guide (#guide / #guide-tab) fehlt`);
    }
  }
  record("Chrome-Drift (nav/footer/brummer)", e);
})();

// --- 7) Journal ↔ Grid ↔ Sitemap konsistent -----------------------------------
(function () {
  const e = [];
  const files = new Set(htmlFiles.filter((f) => /^journal-.+\.html$/.test(f)));
  const grid = readRoot("journal.html");
  const gridSet = new Set([...grid.matchAll(/href="(journal-[a-z0-9-]+\.html)"/g)].map((m) => m[1]));
  const sm = readRoot("sitemap.xml");
  const smSet = new Set([...sm.matchAll(/(journal-[a-z0-9-]+\.html)/g)].map((m) => m[1]));
  for (const f of files) {
    if (!gridSet.has(f)) e.push(`${f} — fehlt im #journal-grid (journal.html)`);
    if (!smSet.has(f)) e.push(`${f} — fehlt in sitemap.xml`);
  }
  for (const g of gridSet) if (!files.has(g)) e.push(`journal.html verlinkt "${g}", aber Datei fehlt`);
  for (const s of smSet) if (!files.has(s)) e.push(`sitemap.xml listet "${s}", aber Datei fehlt`);
  record("Journal / Grid / Sitemap", e);
})();

// --- 8) Build-Smoke (build-standalone.cjs) ------------------------------------
(function () {
  const e = [];
  try {
    const out = execFileSync("node", ["build-standalone.cjs"], { cwd: root, stdio: "pipe" }).toString();
    if (!/grellwerk-standalone\.html/.test(out)) e.push("build-standalone.cjs: unerwartete Ausgabe");
    const sa = path.join(root, "grellwerk-standalone.html");
    if (!fs.existsSync(sa) || fs.statSync(sa).size < 10000) e.push("Standalone-Datei fehlt oder ist zu klein");
  } catch (err) {
    e.push(`build-standalone.cjs fehlgeschlagen: ${String(err.stderr || err).split("\n")[0]}`);
  }
  record("Build-Smoke (standalone)", e);
})();

// --- Report -------------------------------------------------------------------
console.log("\nGRELLWERK Verify-Gate\n" + "─".repeat(40));
for (const c of checks) {
  console.log(`${c.ok ? "✓" : "✗"} ${c.name}${c.ok ? "" : `  (${c.count})`}`);
}
if (errors.length) {
  console.log("\n" + "─".repeat(40) + `\n${errors.length} Problem(e):\n`);
  for (const msg of errors) console.log("  • " + msg);
  console.log("");
  process.exit(1);
} else {
  console.log("─".repeat(40) + "\nAlles grün. ✦\n");
}
