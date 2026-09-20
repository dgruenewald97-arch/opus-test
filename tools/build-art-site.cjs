// Static page source. Run before verify; no runtime templating or framework.
const fs=require('fs');
const path=require('path');
const root=path.join(__dirname,'..');
const {NAV,FOOTER,OVERLAYS,head,BODY_OPEN,SCRIPTS}=require('./lib/chrome.cjs');
const {projects,agents,specialists}=require('./content/site.cjs');
const {renderAgency}=require('./content/agency-view.cjs');
const {renderCase}=require('./content/showcase.cjs');
const {renderHome,renderProjects}=require('./content/direction.cjs');
const nl=s=>s.replace(/\n/g,'<br>');
const decode=s=>s.replace(/&(?:amp|quot|lt|gt|apos);/g,m=>({'&amp;':'&','&quot;':'"','&lt;':'<','&gt;':'>','&apos;':"'"}[m]));
const photo=(p,{detail=false,hero=false}={})=>`<div class="campaign-image" data-image-label="${p.name}"><img src="assets/campaigns/${p.id}${detail?'-detail-v2':'-v2'}-1536.webp" srcset="assets/campaigns/${p.id}${detail?'-detail-v2':'-v2'}-800.webp 800w, assets/campaigns/${p.id}${detail?'-detail-v2':'-v2'}-1536.webp 1536w" sizes="${hero?'100vw':'(max-width: 700px) 100vw, 50vw'}" width="1536" height="1024" alt="${detail?p.detailAlt:p.alt}" ${hero?'fetchpriority="high"':'loading="lazy"'} decoding="async"></div>`;
const card=(p,i)=>`<article class="project-card"><a href="case-${p.slug}.html" aria-label="${p.name}: Projekt ansehen"><div class="project-visual">${photo(p)}<span class="project-open">PROJEKT ANSEHEN ↗</span></div><div class="project-caption"><h3>${p.name}</h3><span>${p.discipline}</span><span class="project-number">0${i+1} ↗</span></div></a></article>`;
function page(slug,title,desc,type,content){fs.writeFileSync(path.join(root,slug+'.html'),`<!DOCTYPE html>\n<html lang="de">${head({title,desc,slug})}${BODY_OPEN.replace("<body>",`<body data-page="${type}">`)}${NAV}<main id="main" tabindex="-1" data-page="${type}">${content}</main>${FOOTER}${OVERLAYS}${SCRIPTS}</body></html>\n`);}
page('index','Lärm, der etwas auslöst.','GRELLWERK. Das KI-Agenturkonzept für Marken, Kampagnen und digitale Erlebnisse. Strategie, Kreation und Code mit klaren Zuständigkeiten.','home',renderHome());
page('arbeiten','Projects','Vier eigene Markenwelten. KOLD BREW, NEONTRITT, HAFERKRAFT und BLITZBANK. Freie Konzeptarbeiten von GRELLWERK.','projects',renderProjects());
projects.forEach((p,i)=>page('case-'+p.slug,p.name,p.intro,'case',renderCase(p,i)));
page('ueber-uns','About — Das Studio','Zwölf spezialisierte Agenten für Strategie, Kreation, Beratung, Digital und Qualität. Die GRELLWERK Agenturstruktur.','about',renderAgency(specialists));
page('kontakt','Contact','Eine Idee im Kopf? Der Kontaktweg zur fiktiven Agentur GRELLWERK.','contact',`
<section class="contact-head"><div class="page-kicker"><span>Contact</span><span>Jede gute Sache beginnt irgendwo.</span></div><h1>WAS HAST<br>DU VOR?</h1><div class="contact-content"><div><p>Eine Idee, die dich nicht loslässt?<br>Ein Problem, das nach Gestaltung ruft?<br>Schreib es auf.</p><a class="contact-mail" href="#contact-form">Briefing vorbereiten ↘</a><p class="fiction-note">GRELLWERK ist eine fiktive Agentur. Dieses Formular erstellt lokal ein Briefing zum Kopieren. Es versendet keine Anfrage und speichert deine Angaben nicht in einer Datenbank.</p></div><form id="contact-form" class="contact-form"><label for="f-name">Wie heißt du?<input id="f-name" name="name" autocomplete="name" required placeholder="Dein Name"></label><label for="f-email">Deine E-Mail<input id="f-email" name="email" type="email" autocomplete="email" required placeholder="du@beispiel.de"></label><label for="f-company">Marke / Unternehmen <span>(optional)</span><input id="f-company" name="company" autocomplete="organization" placeholder="Für wen wird’s laut?"></label><label for="f-msg">Worum geht’s?<textarea id="f-msg" name="message" rows="3" required placeholder="Die kurze Version reicht."></textarea></label><button class="pill" type="submit">Briefing kopieren <span>↗</span></button><p id="form-status" role="status" aria-live="polite"></p></form></div></section>`);
// Preserve the original interactive tools, extracted once before redesigning Home.
const labPath=path.join(__dirname,'content','lab.html');
if(!fs.existsSync(labPath)){
 const original=fs.readFileSync(path.join(root,'..','..','work','original-index.html'),'utf8');
 const sections=[...original.matchAll(/<section\b[\s\S]*?<\/section>/g)].map(m=>m[0]);
 fs.writeFileSync(labPath,sections.filter(s=>/id="(?:pakete|konfigurator|slogan-lab|faq)"/.test(s)).join('\n').replace(/href="#kontakt"/g,'href="kontakt.html"').replace(/href="#crew"/g,'href="ueber-uns.html#crew"'));
}
page('labor','Spielwiese','Krach-Konfigurator, Slogan-Maschine und die Pakete aus dem GRELLWERK-Konzept.','legacy',`<section class="lab-head"><p class="eyebrow">GRELLWERK Playground</p><h1>SPIELWIESE.</h1><p>Ausprobieren erlaubt. Konfigurator und Slogan-Maschine laufen lokal als Demo.</p></section>${fs.readFileSync(labPath,'utf8')}`);
// Update shell of retained service/legal/journal pages, keeping their content.
const core=new Set(['index','arbeiten','ueber-uns','kontakt','labor',...projects.map(p=>'case-'+p.slug)]);
for(const file of fs.readdirSync(root).filter(f=>f.endsWith('.html')&&f!=='grellwerk-standalone.html'&&!core.has(f.slice(0,-5)))){
 const html=fs.readFileSync(path.join(root,file),'utf8');
 const main=html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/);
 if(!main)throw new Error('Missing main: '+file);
 const title=html.match(/<title>(.*?)<\/title>/)?.[1].replace(/\s*\|.*$/,'')||'GRELLWERK';
 const desc=html.match(/name="description"\s+content="([^"]*)"/)?.[1]||title;
 page(file.slice(0,-5),decode(title),decode(desc),'legacy',main[1].replace(/href="index.html#pakete"/g,'href="labor.html#pakete"'));
}
let sitemap=fs.readFileSync(path.join(root,'sitemap.xml'),'utf8');
if(!sitemap.includes('/labor.html'))fs.writeFileSync(path.join(root,'sitemap.xml'),sitemap.replace('</urlset>','<url><loc>https://dgruenewald97-arch.github.io/opus-test/labor.html</loc></url>\n</urlset>'));
console.log('GRELLWERK: core pages and shared shell generated.');
