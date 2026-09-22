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

function renderAgencyOpening(){return `<section class="studio-collage experience-opening">
 <div class="collage-heading"><p class="eyebrow">About / Eine Crew mit klaren Aufgaben</p><h1 data-enter>12 KÖPFE.<br>EIN STUDIO.</h1></div>
 <div class="collage-work"><p>Eine Idee geht<br>durch viele Hände.</p><a href="#zusammenarbeit" aria-label="Von der Idee zur Kampagne"><img src="assets/campaigns/kold-detail-v2-800.webp" width="800" height="533" alt="KOLD BREW: Produktdetail mit gelber Krone, unser gemeinsames Arbeitsbeispiel" fetchpriority="high"><span>VOM BRIEFING ZUR MARKE ↘</span></a></div>
 <div class="collage-portraits">${[['visual','VISUAL','Art Direction'],['syntax','SYNTAX','Digital']].map(([id,name,role])=>`<a class="collage-small" href="ueber-uns.html?agent=${id}#crew"><figure><img src="assets/agents/${id}-600.webp" width="600" height="800" alt="${name}, fiktive KI-Persona" fetchpriority="high"></figure><span>${name}<small>${role} ↗</small></span></a>`).join('')}</div>
 <a class="collage-lead" href="ueber-uns.html?agent=cut#crew" data-enter><img src="assets/agents/cut-1080.webp" srcset="assets/agents/cut-600.webp 600w, assets/agents/cut-1080.webp 1080w" sizes="(max-width:700px) 100vw, 44vw" width="1080" height="1440" alt="CUT, fiktive KI-Persona mit sichtbaren synthetischen Bauteilen" fetchpriority="high"><span>CUT / Designkritik <b>↗</b></span></a>
 <div class="collage-bottom"><a href="#crew">DIE CREW ENTDECKEN <span>↘</span></a><p>Zwölf fiktive KI-Personas.<br>Menschen geben die Richtung vor.</p></div>
 </section>`;}
module.exports={renderHome,renderProjects,renderAgencyOpening};
