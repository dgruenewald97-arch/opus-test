const {projects}=require('./site.cjs');
const {visual}=require('./showcase.cjs');
const {renderProjects}=require('./work-view.cjs');

function renderHome(){return `<section class="manifesto" aria-label="GRELLWERK / Lärm, der etwas auslöst">
 <div class="reel-stage" aria-hidden="true"><div class="reel-fallback"><img src="assets/motion/pulse-still.webp" width="1280" height="720" alt="" fetchpriority="high"></div><video data-reel poster="assets/motion/pulse-still.webp" muted playsinline loop preload="auto" disablepictureinpicture><source media="(max-width:700px)" src="assets/motion/home-film-mobile.mp4" type="video/mp4"><source src="assets/motion/home-film.mp4" type="video/mp4"></video></div>
 <div class="manifesto-content"><h1 aria-label="Lärm, der etwas auslöst."><span class="manifesto-line">LÄRM, DER</span><span class="manifesto-line manifesto-middle"><span class="reel-monitor" data-monitor aria-hidden="true">${['signal','pulse'].map((name,i)=>`<img src="assets/motion/${name}-still.webp" data-motion-src="assets/motion/${name}.gif" data-still="assets/motion/${name}-still.webp" width="360" height="202" alt="" ${i?'hidden':''}>`).join('')}</span>ETWAS</span><span class="manifesto-line"><span class="circled-word">AUSLÖST.</span></span></h1>
 <div class="manifesto-note"><p>Bei GRELLWERK arbeiten zwölf KI-Rollen an Marken, Kampagnen und digitalen Erlebnissen. Menschen geben die Richtung vor und entscheiden, was rausgeht.</p><span>Strategie · Kreation · Digital</span></div>
 <nav class="manifesto-ctas" aria-label="Entdecken"><a href="arbeiten.html">PROJECTS</a><a href="ueber-uns.html">ABOUT</a></nav>
 <div class="manifesto-meta"><span>GRELLWERK® / EIN KI-AGENTURKONZEPT</span><button type="button" data-reel-toggle aria-pressed="false">Bewegung pausieren</button></div></div>
 </section>`;}

function renderAgencyOpening(){return `<section class="studio-intro">
 <div class="studio-intro-heading"><h1>12 KÖPFE.<br>EIN STUDIO.</h1><p>Strategie, Kreation und Code.<br>Eine Crew mit klaren Aufgaben.</p></div>
 <div class="studio-contact-sheet" aria-label="Fiktive KI-Personas aus der Crew">${[
 ['aura','AURA','Leitung'],['visual','VISUAL','Art Direction'],['syntax','SYNTAX','Digital'],['cut','CUT','Designkritik']
 ].map(([id,name,role])=>`<a href="ueber-uns.html?agent=${id}#crew" class="studio-face" data-reveal><figure><img src="assets/agents/${id}-1080.webp" srcset="assets/agents/${id}-600.webp 600w, assets/agents/${id}-1080.webp 1080w" sizes="(max-width:700px) 50vw, 25vw" width="1080" height="1440" alt="${name}, fiktive KI-Persona mit synthetischen Details" fetchpriority="high"></figure><span><strong>${name}</strong><small>${role} ↗</small></span></a>`).join('')}</div>
 <div class="studio-position"><p>Gute Arbeit entsteht<br>zwischen den Köpfen.</p><div><p>GRELLWERK ist das Konzept einer Agentur mit KI-Crew. Zwölf Rollen entwickeln Strategie, Text, Gestaltung und Code. Jede hat einen Auftrag. Jede gibt ihre Arbeit weiter.</p><p>Menschen setzen das Ziel, beurteilen die Entwürfe und entscheiden, was veröffentlicht wird.</p><a class="editorial-link" href="#crew">Alle zwölf Rollen kennenlernen ↗</a></div></div>
 </section>`;}
module.exports={renderHome,renderProjects,renderAgencyOpening};
