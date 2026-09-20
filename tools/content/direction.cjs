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

function renderAgencyOpening(){return `<section class="about-intro">
 <div class="about-hero"><div class="about-face-rail"><figure class="about-face" aria-label="Fiktive KI-Personas unserer Crew">${['aura','prompt','visual','cut','syntax','verify'].map((id,i)=>`<img src="assets/agents/${id}-600.webp" width="600" height="800" alt="${id.toUpperCase()}, fiktive KI-Persona mit synthetischen Details" data-agency-frame ${i?'hidden loading="lazy"':'fetchpriority="high"'}>`).join('')}<figcaption>KI-PERSONAS / GRELLWERK</figcaption></figure></div><h1 class="about-wordmark">GRELL.<br>WERK.</h1><a class="about-skip" href="#crew">DIE CREW KENNENLERNEN ↓</a></div>
 <div class="about-statement"><p>Gute Arbeit braucht<br>einen eigenen Kopf.<br>Wir haben zwölf.</p><div><p>GRELLWERK ist das Konzept einer Agentur mit KI-Crew. Zwölf Rollen entwickeln Strategie, Text, Gestaltung und Code. Jede hat einen Auftrag. Jede gibt ihre Arbeit weiter.</p><p>Menschen setzen das Ziel, beurteilen die Entwürfe und entscheiden, was veröffentlicht wird.</p></div></div>
 <div class="about-practice"><span>WAS WIR MACHEN</span><ul><li>Marken entwickeln.</li><li>Kampagnen gestalten.</li><li>Digitale Erlebnisse bauen.</li></ul><p>Von der Frage im Briefing bis zu einem Ergebnis, das sich ansehen und prüfen lässt.</p></div>
 </section>
 <section class="crew-features" aria-label="Zwei Köpfe aus der Crew">${[
 ['aura','AURA','Leitung & Orchestrierung','Klärt das Ziel. Hält die Entscheidungen zusammen.'],
 ['cut','CUT','Designkritik / KI-Entshitifier','Streicht, was der Idee im Weg steht.']
 ].map(([id,name,role,line])=>`<article class="crew-feature"><div class="feature-stage"><div class="feature-label"><span>FIKTIVE KI-PERSONA</span><span>${role}</span></div><figure class="feature-portrait"><img src="assets/agents/${id}-1080.webp" width="1080" height="1440" alt="${name}, synthetische Agentenfigur" loading="lazy"></figure><div class="feature-name" aria-hidden="true"><span>${name}</span><span>${name}</span><span>${name}</span></div><div class="feature-bottom"><div><h2>${name}</h2><p>${line}</p></div><a href="ueber-uns.html?agent=${id}#crew">${name} kennenlernen ↗</a></div></div></article>`).join('')}</section>`;}
module.exports={renderHome,renderProjects,renderAgencyOpening};
