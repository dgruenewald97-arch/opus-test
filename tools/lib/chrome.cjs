// Shared shell for every static page and the journal generator.
const CANON_BASE = 'https://dgruenewald97-arch.github.io/opus-test';
const menuRows=[['arbeiten.html','PROJEKTE','01','Vier Markenwelten entdecken'],['ueber-uns.html','STUDIO','02','Arbeitsweise und Crew kennenlernen'],['kontakt.html','BRIEFING','03','Die eigene Idee konkret machen']];
const NAV = `<header class="nav">
<a class="nav__logo" href="index.html" aria-label="GRELLWERK Startseite">GRELL<span>//</span>WERK<span class="logo-dot">®</span></a>
<nav class="nav__links" aria-label="Hauptnavigation"><a class="nav__link" href="arbeiten.html">Projekte</a><a class="nav__link" href="ueber-uns.html">Studio</a><a class="nav__link" href="kontakt.html">Briefing</a></nav>
<button class="menu-open" data-menu-open aria-controls="studio-menu" aria-expanded="false" type="button">MENÜ<i aria-hidden="true"></i></button>
<dialog class="studio-menu" id="studio-menu" aria-label="GRELLWERK Menü"><div class="menu-head"><span>GRELL//WERK®</span><button class="menu-close" data-menu-close type="button" aria-label="Menü schließen">SCHLIESSEN <span aria-hidden="true">×</span></button></div>
<nav class="menu-primary" aria-label="Menünavigation">${menuRows.map(([href,name,count,line])=>`<a href="${href}"><span class="menu-index">${count}</span><span class="menu-label">${name}</span><span class="menu-description">${line}</span><span class="menu-arrow" aria-hidden="true">↗</span></a>`).join('')}</nav>
<div class="menu-foot"><nav class="menu-extra" aria-label="Ergänzende Navigation"><a href="leistungen.html">Leistungen</a><a href="journal.html">Journal</a><a href="labor.html">Spielwiese</a><a href="labor.html#pakete">Pakete</a><a href="ueber-uns.html#spezialisten">Spezialisten</a><a href="impressum.html">Impressum</a><a href="datenschutz.html">Datenschutz</a></nav><p>GRELLWERK / KI-AGENTURKONZEPT / 2026</p><button id="motion-toggle" class="motion-toggle" type="button" aria-pressed="false">Bewegung pausieren</button></div></dialog>
<noscript><nav class="nojs-navigation"><a href="arbeiten.html">Projekte</a> · <a href="ueber-uns.html">Studio</a> · <a href="kontakt.html">Briefing</a> · <a href="journal.html">Journal</a></nav></noscript>
</header>`;
const FOOTER = `<footer class="footer">
<div class="footer-intro"><p>WAS SOLL DEINE MARKE AUSLÖSEN?</p><a href="kontakt.html">DEINE IDEE <span>↗</span></a><p class="footer-next">Bereite dein Briefing vor. Die Vorschau bleibt bei dir.</p></div>
<div class="footer-bottom"><a class="footer-brand" href="index.html">GRELL//WERK®</a><nav aria-label="Weitere Informationen"><a href="arbeiten.html">Projekte</a><a href="ueber-uns.html">Studio</a><a href="leistungen.html">Leistungen</a><a href="journal.html">Journal</a><a href="labor.html">Spielwiese</a><a href="impressum.html">Impressum</a><a href="datenschutz.html">Datenschutz</a></nav><p>© 2026 GRELLWERK · Agenturkonzept & freie Arbeiten.</p></div>
</footer>`;
const OVERLAYS = `<div class="route-feedback" hidden><p id="route-error" role="status"></p><a data-native href="index.html">Seite neu öffnen ↗</a><button type="button" aria-label="Hinweis schließen">×</button></div><div class="sr-only" id="route-status" role="status" aria-live="polite"></div>`;
const CATEGORIES={performance:'Performance',branding:'Branding',social:'Social',daten:'Daten',web:'Web',meinung:'Meinung'};
const escape = s => String(s || '').replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;');
function head(o) {return `<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escape(o.title)} | GRELLWERK</title>
<meta name="description" content="${escape(o.desc)}">
<meta property="og:title" content="${escape(o.ogTitle || o.title)} | GRELLWERK">
<meta property="og:description" content="${escape(o.ogDesc || o.desc)}">
<meta property="og:image" content="${CANON_BASE}/assets/og-image.svg">
<link rel="canonical" href="${CANON_BASE}/${o.slug}.html">
<meta name="theme-color" content="#f3f3ee"><link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
<link rel="preload" href="assets/fonts/Anton-Regular.ttf" as="font" type="font/ttf" crossorigin>
${['reset','tokens','base','components','sections','motion','art','agency','studio','direction','about','home','editorial','ux'].map(n=>`<link rel="stylesheet" href="css/${n}.css?v=12">`).join('\n')}
</head>`;}
const BODY_OPEN='<body><a class="skip-link" href="#main">Zum Inhalt springen</a>';
const SCRIPTS='<script type="module" src="js/main.js?v=12"></script>';
module.exports={CANON_BASE,NAV,FOOTER,OVERLAYS,CATEGORIES,head,BODY_OPEN,SCRIPTS};
