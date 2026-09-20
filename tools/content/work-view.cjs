const {projects}=require('./site.cjs');
const {visual}=require('./showcase.cjs');
const {loop,motion}=require('./motion.cjs');
const lines={kold:'EINE KRONE FÜR DIE NACHT.',neon:'BEWEGUNG WIRD HALTUNG.',hafer:'MORGEN WIRD GUT.',blitz:'EIN ZEICHEN. EIN STANDPUNKT.'};
const names={kold:'KOLD<br>BREW',neon:'NEONTRITT',hafer:'HAFER<br>KRAFT',blitz:'BLITZ<br>BANK'};
function renderProjects(){return `<section class="work-masthead"><h1>PROJEKTE<sup>04</sup></h1><div class="work-lead"><p>Vier Marken.<br>Vier eigene Welten.</p><div><p>Von der ersten Idee bis zum Auftritt auf der Straße. Freie Markenstudien aus dem GRELLWERK-Konzept.</p><button type="button" data-reel-toggle aria-pressed="false">Bewegung pausieren</button></div></div></section><nav class="work-jump" data-chapter-nav aria-label="Projekt auswählen">${projects.map(p=>`<a data-chapter-link href="#projekt-${p.id}">${p.name} ↘</a>`).join('')}</nav>
 <section class="work-editorial" aria-label="Unsere Projekte">${projects.map((p,i)=>`<article class="work-spread ${i%2?'is-reversed':''} work-${p.id}" id="projekt-${p.id}" style="--project-accent:${p.color}">
  <div class="work-meta"><span>${p.discipline}</span><span>FREIE STUDIE / ${p.year}</span></div>
  <div class="work-composition"><a class="work-screen" data-work-screen href="case-${p.slug}.html" aria-label="${p.name}: Projekt ansehen">${motion[p.id]?loop(motion[p.id],{alt:''}):visual(p,{scene:true})}<div class="work-screen-shade"></div><span class="work-screen-line">${lines[p.id]}</span><h2>${names[p.id]}</h2><span class="work-screen-open">PROJEKT ANSEHEN ↗</span></a>
  <div class="work-design"><a class="work-design-image" href="case-${p.slug}.html" aria-label="${p.name}: Projekt ansehen">${visual(p,{life:true,sizes:'(max-width:700px) 30vw, 28vw'})}<span aria-hidden="true">↗</span></a><h3>${p.line.replace(/\n/g,'<br>')}</h3><p>${p.intro}</p><a class="editorial-link" href="case-${p.slug}.html">Projekt ansehen ↗</a></div></div>
 </article>`).join('')}<p class="work-note">Marken und Kampagnen sind fiktiv. Die Filmschnitte sind Bewegungsstudien zur jeweiligen Bildwelt.</p></section><a class="work-to-about" href="ueber-uns.html"><span>DAS STUDIO DAHINTER</span><strong>GUTE ARBEIT.<br>EIGENE KÖPFE. ↗</strong></a>`;}
module.exports={renderProjects};
