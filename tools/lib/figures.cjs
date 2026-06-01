// figures.cjs — brutalistische Inline-SVG-Diagramme als wiederverwendbare Bibliothek.
// Stil-Vertrag (passt zum Rest des Journals): Paper-Hintergrund, Ink-Outline (dick 6 /
// normal 4), JetBrains-Mono-Labels, Token-Farben. Jede Funktion gibt einen SVG-STRING zurück
// (kein <figure>-Wrapper — das macht generate.cjs). viewBox einheitlich 0 0 440 300.
//
// Verwendung im Artikel-Daten-Block:
//   { fig: { svg: F.matrix({...}), cap: "<b>Titel.</b> Erklärung." } }
//
// Diese Bibliothek ist die Single Source für Diagramme — neue Artikel kombinieren diese
// Bausteine statt rohes SVG zu schreiben. Neuer Diagrammtyp? Hier als Funktion ergänzen.

const C = {
  ink: "#0A0A0A",
  paper: "#F2F0E9",
  acid: "#D6FF3B",
  shock: "#FF2E63",
  electric: "#2D2DFF",
  warn: "#FF6B00",
  white: "#fff",
};

const W = 440;
const H = 300;
const MONO = "'JetBrains Mono', monospace";

// --- low-level helpers ---------------------------------------------------------
const round = (n) => Math.round(n * 100) / 100;
const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function bg() {
  return `<rect width="${W}" height="${H}" fill="${C.paper}"/>`;
}
function svg(label, inner) {
  return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(label)}">
${bg()}
${inner}
</svg>`;
}
function text(x, y, str, o = {}) {
  const size = o.size || 13;
  const weight = o.weight || 700;
  const anchor = o.anchor || "middle";
  const fill = o.fill || C.ink;
  const tr = o.rotate != null ? ` transform="rotate(${o.rotate} ${round(x)} ${round(y)})"` : "";
  return `<text x="${round(x)}" y="${round(y)}" text-anchor="${anchor}" font-family="${MONO}" font-size="${size}" font-weight="${weight}" fill="${fill}"${tr}>${esc(str)}</text>`;
}
// multi-line centered text block around vertical center cy
function lines(cx, cy, arr, o = {}) {
  const size = o.size || 13;
  const lh = o.lh || 16;
  const fill = o.fill || C.ink;
  const start = cy - ((arr.length - 1) * lh) / 2 + size / 3;
  const tspans = arr
    .map((s, i) => `<tspan x="${round(cx)}" y="${round(start + i * lh)}">${esc(s)}</tspan>`)
    .join("");
  return `<text text-anchor="middle" font-family="${MONO}" font-size="${size}" font-weight="700" fill="${fill}">${tspans}</text>`;
}
function rect(x, y, w, h, fill, emphasis) {
  const sw = emphasis ? 6 : 4;
  return `<rect x="${round(x)}" y="${round(y)}" width="${round(w)}" height="${round(h)}" fill="${fill}" stroke="${C.ink}" stroke-width="${sw}"/>`;
}

// --- 1) 2×2-Matrix -------------------------------------------------------------
// opts: { label, xAxis, yAxis, cells: { tl,tr,bl,br } } — jede Zelle:
//   { fill, lines:[...], emphasis }   (fill default paper; emphasis = dicke Outline)
function matrix(opts) {
  const pos = {
    tl: [60, 20], tr: [220, 20], bl: [60, 135], br: [220, 135],
  };
  const cw = 160, ch = 115;
  const parts = [];
  for (const key of ["tl", "tr", "bl", "br"]) {
    const cell = opts.cells[key];
    if (!cell) continue;
    const [x, y] = pos[key];
    parts.push(rect(x, y, cw, ch, cell.fill || C.paper, cell.emphasis));
    parts.push(lines(x + cw / 2, y + ch / 2, cell.lines || []));
  }
  if (opts.xAxis) parts.push(text(220, 284, opts.xAxis, { size: 11, weight: 400 }));
  if (opts.yAxis) parts.push(text(26, 135, opts.yAxis, { size: 11, weight: 400, rotate: -90 }));
  return svg(opts.label, parts.join("\n"));
}

// --- 2) Pyramide (Trapez-Stapel, schmal oben → breit unten) --------------------
// opts: { label, layers:[{text, fill}] }  layers[0] = Spitze
function pyramid(opts) {
  const ls = opts.layers;
  const n = ls.length;
  const top = 30, bottom = 250, cx = 220;
  const minHalf = 40, maxHalf = 190;
  const band = (bottom - top) / n;
  const parts = [];
  for (let i = 0; i < n; i++) {
    const yTop = top + i * band;
    const yBot = yTop + band;
    const halfTop = minHalf + ((maxHalf - minHalf) * i) / n;
    const halfBot = minHalf + ((maxHalf - minHalf) * (i + 1)) / n;
    const fill = ls[i].fill || C.paper;
    const pts = [
      [cx - halfTop, yTop], [cx + halfTop, yTop],
      [cx + halfBot, yBot], [cx - halfBot, yBot],
    ].map((p) => `${round(p[0])},${round(p[1])}`).join(" ");
    parts.push(`<polygon points="${pts}" fill="${fill}" stroke="${C.ink}" stroke-width="${i === 0 ? 6 : 4}"/>`);
    parts.push(text(cx, yTop + band / 2 + 4, ls[i].text, { size: 12 }));
  }
  return svg(opts.label, parts.join("\n"));
}

// --- 3) Gestapelte Schichten (gleich breite Bänder) ----------------------------
// opts: { label, layers:[{text, fill}] }  layers[0] = oberste Schicht
function layers(opts) {
  const ls = opts.layers;
  const n = ls.length;
  const x = 70, w = 300, top = 30, bottom = 260;
  const band = (bottom - top) / n;
  const parts = [];
  for (let i = 0; i < n; i++) {
    const y = top + i * band;
    parts.push(rect(x, y, w, band, ls[i].fill || C.paper, i === 0));
    parts.push(text(x + w / 2, y + band / 2 + 4, ls[i].text, { size: 12 }));
  }
  return svg(opts.label, parts.join("\n"));
}

// --- 4) Horizontale Balken -----------------------------------------------------
// opts: { label, unit, bars:[{name, value, fill}], max }
function hbars(opts) {
  const bars = opts.bars;
  const n = bars.length;
  const max = opts.max || Math.max(...bars.map((b) => b.value));
  const left = 130, right = 410, top = 30, bottom = 250;
  const trackW = right - left;
  const slot = (bottom - top) / n;
  const barH = Math.min(34, slot * 0.62);
  const parts = [];
  for (let i = 0; i < n; i++) {
    const cy = top + i * slot + slot / 2;
    const bw = Math.max(6, (bars[i].value / max) * trackW);
    parts.push(text(left - 10, cy + 4, bars[i].name, { size: 11, weight: 700, anchor: "end" }));
    parts.push(rect(left, cy - barH / 2, bw, barH, bars[i].fill || C.acid, i === 0));
    const val = bars[i].value + (opts.unit || "");
    parts.push(text(left + bw + 8, cy + 4, val, { size: 11, anchor: "start" }));
  }
  return svg(opts.label, parts.join("\n"));
}

// --- 5) Segment-Balken (Zusammensetzung / Schrumpf) ----------------------------
// opts: { label, segments:[{text, value, fill}] }  — ein horizontaler Balken, geteilt
function stackBar(opts) {
  const segs = opts.segments;
  const total = segs.reduce((s, x) => s + x.value, 0);
  const left = 40, right = 400, y = 110, h = 80;
  const trackW = right - left;
  let cx = left;
  const parts = [];
  for (let i = 0; i < segs.length; i++) {
    const w = (segs[i].value / total) * trackW;
    parts.push(rect(cx, y, w, h, segs[i].fill || C.paper, false));
    if (w > 34) parts.push(lines(cx + w / 2, y + h / 2, [segs[i].text], { size: 11 }));
    parts.push(text(cx + w / 2, y + h + 22, String(segs[i].value), { size: 11 }));
    cx += w;
  }
  return svg(opts.label, parts.join("\n"));
}

// --- 6) Funnel (Trapez-Stapel, breit oben → schmal unten) ----------------------
// opts: { label, stages:[{text, fill}] }  stages[0] = oben (breit)
function funnel(opts) {
  const st = opts.stages;
  const n = st.length;
  const top = 30, bottom = 250, cx = 220;
  const maxHalf = 190, minHalf = 55;
  const band = (bottom - top) / n;
  const parts = [];
  for (let i = 0; i < n; i++) {
    const yTop = top + i * band;
    const yBot = yTop + band - 6; // kleine Lücke zwischen Stufen
    const halfTop = maxHalf - ((maxHalf - minHalf) * i) / n;
    const halfBot = maxHalf - ((maxHalf - minHalf) * (i + 1)) / n;
    const pts = [
      [cx - halfTop, yTop], [cx + halfTop, yTop],
      [cx + halfBot, yBot], [cx - halfBot, yBot],
    ].map((p) => `${round(p[0])},${round(p[1])}`).join(" ");
    parts.push(`<polygon points="${pts}" fill="${st[i].fill || C.paper}" stroke="${C.ink}" stroke-width="${i === 0 ? 6 : 4}"/>`);
    parts.push(text(cx, yTop + (band - 6) / 2 + 4, st[i].text, { size: 12 }));
  }
  return svg(opts.label, parts.join("\n"));
}

// --- 7) Dreieck mit beschrifteten Ecken ----------------------------------------
// opts: { label, corners:[topText, leftText, rightText], fill }
function triangle(opts) {
  const cx = 220;
  const apex = [cx, 40], bl = [70, 240], br = [370, 240];
  const pts = [apex, bl, br].map((p) => `${p[0]},${p[1]}`).join(" ");
  const parts = [
    `<polygon points="${pts}" fill="${opts.fill || C.acid}" stroke="${C.ink}" stroke-width="6"/>`,
    text(apex[0], apex[1] - 12, opts.corners[0], { size: 12 }),
    text(bl[0] - 4, bl[1] + 22, opts.corners[1], { size: 12, anchor: "start" }),
    text(br[0] + 4, br[1] + 22, opts.corners[2], { size: 12, anchor: "end" }),
  ];
  return svg(opts.label, parts.join("\n"));
}

// --- 8) Kurve (Liniendiagramm, z. B. Retention) --------------------------------
// opts: { label, series:[{name, fill, points:[0..1,...] }], xLabel }
// points sind 0..1 (Anteil der Höhe), gleichmäßig über die Breite verteilt.
function curve(opts) {
  const left = 50, right = 410, top = 40, bottom = 240;
  const plotW = right - left, plotH = bottom - top;
  const parts = [
    // Achsen
    `<line x1="${left}" y1="${top}" x2="${left}" y2="${bottom}" stroke="${C.ink}" stroke-width="4"/>`,
    `<line x1="${left}" y1="${bottom}" x2="${right}" y2="${bottom}" stroke="${C.ink}" stroke-width="4"/>`,
  ];
  for (const s of opts.series) {
    const pts = s.points
      .map((p, i) => {
        const x = left + (plotW * i) / (s.points.length - 1);
        const y = bottom - plotH * Math.max(0, Math.min(1, p));
        return `${round(x)},${round(y)}`;
      })
      .join(" ");
    parts.push(`<polyline points="${pts}" fill="none" stroke="${s.fill || C.shock}" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/>`);
  }
  if (opts.xLabel) parts.push(text(220, 270, opts.xLabel, { size: 11, weight: 400 }));
  // einfache Legende oben rechts
  opts.series.forEach((s, i) => {
    const ly = top + 4 + i * 18;
    parts.push(`<rect x="300" y="${ly - 9}" width="16" height="10" fill="${s.fill || C.shock}" stroke="${C.ink}" stroke-width="2"/>`);
    parts.push(text(322, ly, s.name, { size: 10, weight: 700, anchor: "start" }));
  });
  return svg(opts.label, parts.join("\n"));
}

module.exports = { C, matrix, pyramid, layers, hbars, stackBar, funnel, triangle, curve };
