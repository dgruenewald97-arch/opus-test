// generate.cjs — festes Generator-Tool für Journal-Artikel.
// Liest jede Datendatei in tools/content/articles/*.cjs (Dateien mit führendem _ werden
// als Vorlagen ignoriert) und schreibt die fertige journal-<…>.html ins Repo-Root.
// Chrome kommt aus tools/lib/chrome.cjs, Diagramme aus tools/lib/figures.cjs — so bleibt
// alles konsistent und driftfrei. Idempotent: erneuter Lauf überschreibt sauber.
//
// Aufruf:
//   node tools/generate.cjs              → alle Artikel-Daten rendern
//   node tools/generate.cjs hook roas    → nur passende Slugs (Teilstring-Match)
//
// WICHTIG: Der Generator erzeugt NUR die Artikelseite. Karte im journal.html-Grid,
// Eintrag in sitemap.xml und ggf. neuer Filter-Chip bleiben manuell (siehe ausgegebene
// Checkliste) — verify.cjs erzwingt anschließend, dass nichts vergessen wurde.

const fs = require("fs");
const path = require("path");
const { NAV, FOOTER, BRUMMER, CATEGORIES, head, BODY_OPEN, SCRIPTS } = require("./lib/chrome.cjs");

const root = path.join(__dirname, "..");
const articlesDir = path.join(__dirname, "content", "articles");

// --- Block-Renderer (spiegelt die handgepflegte Artikel-Struktur) --------------
function figureHtml(f) {
  return `        <figure class="figure" data-reveal>
          <div class="figure__frame">
${f.svg.split("\n").map((l) => "            " + l).join("\n")}
          </div>
          <figcaption class="figure__cap">${f.cap}</figcaption>
        </figure>`;
}
function calcHtml(c) {
  const lines = c.lines.map((l) => `          <p>${l}</p>`).join("\n");
  const result = c.result ? `\n          <p class="calc__result">${c.result}</p>` : "";
  return `        <div class="calc" data-reveal>
          <span class="calc__label">${c.label}</span>
${lines}${result}
        </div>`;
}
function checklistHtml(items) {
  return `        <ul class="checklist" data-reveal>
${items.map((li) => `          <li>${li}</li>`).join("\n")}
        </ul>`;
}
function bodyHtml(blocks) {
  const out = [];
  let buf = [];
  const flush = () => {
    if (buf.length) {
      out.push(`        <div class="prose" data-reveal>\n${buf.join("\n")}\n        </div>`);
      buf = [];
    }
  };
  for (const b of blocks) {
    if (b.h) buf.push(`          <h3>${b.h}</h3>`);
    else if (b.p) buf.push(`          <p>${b.p}</p>`);
    else if (b.ul) buf.push(`          <ul>\n${b.ul.map((li) => `            <li>${li}</li>`).join("\n")}\n          </ul>`);
    else if (b.fig) { flush(); out.push(figureHtml(b.fig)); }
    else if (b.calc) { flush(); out.push(calcHtml(b.calc)); }
    else if (b.checklist) { flush(); out.push(checklistHtml(b.checklist)); }
  }
  flush();
  return out.join("\n");
}

function page(a) {
  const label = CATEGORIES[a.cat];
  if (!label) throw new Error(`Unbekannte Kategorie "${a.cat}" in ${a.slug} (erlaubt: ${Object.keys(CATEGORIES).join(", ")})`);
  const sources = a.sources
    .map((s) => `<a href="${s.url}" target="_blank" rel="noopener">${s.label}</a>`)
    .join(" · ");
  const headHtml = head({
    title: a.title,
    desc: a.desc,
    ogTitle: a.ogTitle || a.title,
    ogDesc: a.ogDesc,
    slug: a.slug,
  });
  return `<!DOCTYPE html>
<html lang="de">
${headHtml}
${BODY_OPEN}

${NAV}

  <main id="main">

    <!-- ===== ARTICLE HERO ===== -->
    <section class="section page-hero" id="article-hero">
      <div class="container">
        <nav class="crumbs" aria-label="Brotkrumen">
          <a href="index.html">Start</a><span>/</span><a href="journal.html">Journal</a><span>/</span>${a.crumb}
        </nav>
        <span class="eyebrow">${label}</span>
        <h1 class="page-hero__headline">${a.h1}</h1>
        <p class="page-hero__lead">${a.dek}</p>
        <div class="article__meta">
          <span class="tag">${label}</span>
          <time datetime="${a.dt}">${a.dateLabel}</time>
          <span>· ${a.read} Min Lesezeit</span>
          <span>· ${a.author}</span>
        </div>
      </div>
    </section>

    <!-- ===== ARTICLE BODY ===== -->
    <section class="section" id="article" data-guide-step="article">
      <div class="container">
${bodyHtml(a.body)}
        <blockquote class="bigquote" data-reveal>
          <p>${a.quote}</p>
          <footer>— ${a.author}</footer>
        </blockquote>
        <p class="article__sources" data-reveal><strong>Quellen:</strong> ${sources}</p>
      </div>
    </section>

    <!-- ===== CTA + BACK ===== -->
    <section class="section cta-band" id="article-cta">
      <div class="container">
        <span class="eyebrow">Klingt nach deinem Problem?</span>
        <h2 data-reveal>Lass uns Lärm machen</h2>
        <div class="cta-band__row" data-reveal>
          <a class="btn btn--big magnetic" href="kontakt.html">Krach buchen →</a>
          <a class="btn btn--ghost btn--big magnetic" href="journal.html">Mehr aus dem Journal</a>
        </div>
        <div class="next-case">
          <span>Weiterlesen</span>
          <a href="${a.next}.html">${a.nextLabel} →</a>
        </div>
      </div>
    </section>
  </main>

${FOOTER}

${BRUMMER}

${SCRIPTS}
</body>
</html>
`;
}

// --- Lauf ----------------------------------------------------------------------
function loadArticles() {
  if (!fs.existsSync(articlesDir)) return [];
  return fs
    .readdirSync(articlesDir)
    .filter((f) => f.endsWith(".cjs") && !f.startsWith("_"))
    .map((f) => {
      const data = require(path.join(articlesDir, f));
      data.__file = f;
      return data;
    });
}

function main() {
  const filters = process.argv.slice(2);
  let articles = loadArticles();
  if (filters.length) {
    articles = articles.filter((a) => filters.some((q) => a.slug.includes(q)));
  }
  if (!articles.length) {
    console.log("Keine passenden Artikel-Daten in tools/content/articles/ gefunden.");
    return;
  }
  for (const a of articles) {
    fs.writeFileSync(path.join(root, a.slug + ".html"), page(a));
    console.log("✓ geschrieben:", a.slug + ".html");
  }
  console.log(`\nFertig: ${articles.length} Seite(n).`);
  console.log("Nicht vergessen (verify.cjs prüft das):");
  console.log("  • Karte ins #journal-grid in journal.html (newest first, data-cat passend)");
  console.log("  • <url>-Eintrag in sitemap.xml");
  console.log("  • Filter-Chip in #journal-filter, falls neue Kategorie");
  console.log("  • node tools/verify.cjs");
}

if (require.main === module) main();
module.exports = { page, bodyHtml };
