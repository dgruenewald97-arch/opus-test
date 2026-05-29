// Bundles the build-less site into ONE self-contained HTML file.
// All CSS, JS, and the noise SVG are inlined so the page works from file://
// (e.g. opened directly on a phone) with zero external dependencies.
const fs = require("fs");
const path = require("path");

const root = __dirname;
const read = (p) => fs.readFileSync(path.join(root, p), "utf8");

// --- CSS: concat in load order, inline the noise.svg as a data URI ---
const cssFiles = [
  "css/reset.css", "css/tokens.css", "css/base.css", "css/components.css",
  "css/sections.css", "css/guide.css", "css/motion.css",
];
let css = cssFiles.map(read).join("\n");
const noiseDataUri =
  "data:image/svg+xml;base64," + Buffer.from(read("assets/noise.svg")).toString("base64");
css = css.replace(/url\(["']?\.\.\/assets\/noise\.svg["']?\)/g, `url("${noiseDataUri}")`);

// --- JS: strip ES module syntax, concat into one classic script ---
const stripModule = (src) =>
  src
    .replace(/^\s*import[^;]*;\s*$/gm, "")          // drop import lines
    .replace(/^\s*export\s+/gm, "");                 // drop leading export keywords

const config = stripModule(read("js/config.js"));
const cursor = stripModule(read("js/cursor.js"));
const effects = stripModule(read("js/effects.js"));
const konfigurator = stripModule(read("js/konfigurator.js"));
const scroll = stripModule(read("js/scroll.js"));
const guide = stripModule(read("js/guide.js"));

// main.js: replace the CDN loader with hard-coded fallbacks (no network needed)
let main = stripModule(read("js/main.js"))
  .replace(
    /const \{ gsap, ScrollTrigger, Lenis \} = await loadEnhancements\(\);/,
    "const gsap = null, ScrollTrigger = null, Lenis = null; window.__FLAGS = { gsap: false, lenis: false, standalone: true };"
  );

const js = `(function(){\n${config}\n${cursor}\n${effects}\n${konfigurator}\n${scroll}\n${guide}\n${main}\n})();`;

// --- Assemble HTML from index.html, swapping in inline style + script ---
let html = read("index.html");

// Replace the external stylesheet links with one inline <style>
html = html.replace(
  /<link rel="stylesheet" href="css\/reset\.css" \/>[\s\S]*?<link rel="stylesheet" href="css\/motion\.css" \/>/,
  `<style>\n${css}\n</style>`
);

// Remove the importmap (no CDN modules in standalone)
html = html.replace(/<script type="importmap">[\s\S]*?<\/script>/, "");

// Replace the module script tag with the inlined classic script
html = html.replace(
  /<script type="module" src="js\/main\.js"><\/script>/,
  `<script>\n${js}\n</script>`
);

// Favicon/OG point at assets/ which won't exist standalone; harmless if missing,
// but inline the favicon so the tab icon still works.
const favDataUri =
  "data:image/svg+xml;base64," + Buffer.from(read("assets/favicon.svg")).toString("base64");
html = html.replace(/href="assets\/favicon\.svg"/, `href="${favDataUri}"`);

fs.writeFileSync(path.join(root, "grellwerk-standalone.html"), html);
console.log("Wrote grellwerk-standalone.html (" + (html.length / 1024).toFixed(1) + " KB)");
