const {projects,agents}=require('./site.cjs');
const {loop,motion}=require('./motion.cjs');
const backgrounds={kold:'kold-street-v4',neon:'neon-detail-v2',hafer:'hafer-detail-v2',blitz:'blitz-v2'};
const context={kold:'Eine Krone für die Nacht.',neon:'Für draußen gemacht.',hafer:'Ein guter Morgen fängt klein an.',blitz:'Ein Zeichen. Ein Standpunkt.'};
const focus={kold:'Die Nacht.\nEine Krone.',neon:'Neongrün\nwird zum Abdruck.',hafer:'Platz\nfür den Hafer.',blitz:'Der Blitz\nals Satzzeichen.'};
const nl=s=>s.replace(/\n/g,'<br>');
function visual(p,{detail=false,scene=false,priority=false}={}){
 const file=scene?backgrounds[p.id]:p.id+(detail?'-detail-v2':'-v2');
 const alt=scene&&p.id==='kold'?'KOLD BREW Kampagne: schwarze Dose, gelbe Krone und ein nächtlicher Kiosk':detail?p.detailAlt:p.alt;
 return `<div class="campaign-image" data-image-label="${p.name}">${scene&&p.id==='kold'?'<picture><source media="(max-width:700px), (max-width:1000px) and (orientation:portrait)" srcset="assets/campaigns/kold-street-v4-mobile.webp">':''}<img src="assets/campaigns/${file}-1536.webp" srcset="assets/campaigns/${file}-800.webp 800w, assets/campaigns/${file}-1536.webp 1536w" sizes="${scene?'(max-width:700px) 150vh, 100vw':'100vw'}" width="1536" height="${scene&&p.id==='kold'?864:1024}" alt="${alt}" ${priority?'fetchpriority="high"':'loading="lazy"'} decoding="async">${scene&&p.id==='kold'?'</picture>':''}</div>`;
}
function renderHome(){return `<section class="screening-room" aria-label="GRELLWERK Kampagnen">
 <div class="screen-media">${projects.map((p,i)=>`<div class="screen-frame ${i?'':'is-active'}" data-screen="${i}" ${i?'aria-hidden="true"':''}>${visual(p,{scene:true,priority:i===0})}</div>`).join('')}</div>
 <div class="screen-shade" aria-hidden="true"></div>
 <div class="screen-intro"><p>Independent creative studio</p><h1><span>GUTE IDEEN.</span><span>SCHLECHTE</span><span>RUHE.</span></h1></div>
 <div class="screen-bottom"><div class="screen-selector" aria-label="Kampagne auswählen">${projects.map((p,i)=>`<button type="button" data-screen-select="${i}" aria-pressed="${i===0}" aria-label="${p.name} im Vollbild zeigen"><span>0${i+1}</span><span>${p.name}</span></button>`).join('')}</div>
 <div class="screen-route"><a class="screen-case" data-screen-link href="case-kold-brew.html">KOLD BREW entdecken <span>↗</span></a><a href="arbeiten.html" class="screen-all">Alle Projects <span>↗</span></a></div></div>
 <p class="sr-only" data-screen-status aria-live="polite">KOLD BREW ausgewählt</p>
 </section>`;}
function renderProjects(){return `<section class="work-title"><h1>PROJECTS<sup>04</sup></h1><div class="work-intro"><p>Vier Marken. Vier eigene Welten.</p><a href="ueber-uns.html">Das Studio dahinter ↗</a></div></section>
 <section class="work-gallery" aria-label="Unsere Projekte">${projects.map((p,i)=>`<article class="work-item" data-reveal><a href="case-${p.slug}.html" class="work-image-link" aria-label="${p.name}: Projekt ansehen">${visual(p,{scene:i===0,priority:i<2})}<span class="work-enter" aria-hidden="true">Ansehen ↗</span></a><div class="work-caption"><div><span class="work-id">0${i+1}</span><h2><a href="case-${p.slug}.html">${p.name}</a></h2></div><p>${context[p.id]}</p><span>${p.discipline}</span></div></article>`).join('')}<p class="fiction-note">Freie Konzeptarbeiten. Marken, Produkte und Kampagnen sind fiktiv.</p></section>`;}
function renderCase(p,i){const next=projects[(i+1)%projects.length];return `<div class="case-world" style="--case-accent:${p.color}">
 <section class="case-opening"><div class="case-opening-media">${visual(p,{scene:true,priority:true})}</div><div class="case-opening-shade"></div><a class="case-back" href="arbeiten.html">← Projects</a><div class="case-opening-title"><p>${p.discipline}</p><h1>${p.name}</h1><span>${context[p.id]}</span></div></section>
 <section class="case-editorial-intro"><div class="case-edition"><span>${p.name}</span><span>Freie Markenstudie · ${p.year}</span></div><h2 data-reveal>${nl(p.line)}</h2><div class="case-editorial-copy"><p class="case-summary">${p.intro}</p><div><h3>Die Aufgabe</h3><p>${p.brief}</p></div></div></section>
 <section class="case-brand-spread" aria-label="${p.name}: Die Marke"><figure data-reveal>${visual(p)}<figcaption>${p.name} / Markenstudie</figcaption></figure><div class="case-brand-note"><h2>${nl(focus[p.id])}</h2><p>${p.idea}</p></div></section>
${motion[p.id]?`<section class="case-motion" aria-label="${p.name}: Bewegungsstudie"><div class="case-motion-film" data-reveal>${loop(motion[p.id])}<div class="work-screen-shade"></div><p>${nl(p.poster)}</p></div><div class="case-motion-caption"><span>${p.name} / Bewegungsstudie</span><button type="button" data-reel-toggle aria-pressed="false">Bewegung pausieren</button></div></section>`:''}
 <section class="case-detail-spread"><div><span>Die Umsetzung</span><p>${p.output}</p></div><figure data-reveal>${visual(p,{detail:true})}<figcaption>${p.name} / Im Detail</figcaption></figure></section>
 <section class="case-team-v4"><div class="case-credits-intro"><h2>Die Köpfe<br>dahinter.</h2><p>Von der Leitidee bis zur letzten Prüfung.</p></div><nav aria-label="Beteiligte Agenten">${['prompt','visual','voice','grid','syntax','cut','verify'].map(id=>{const a=agents.find(a=>a.id===id);return `<a href="ueber-uns.html?agent=${id}#crew"><img src="assets/agents/${id}-600.webp" width="600" height="800" alt="" loading="lazy"><strong>${a.name}</strong><span>${a.role}</span><span>↗</span></a>`;}).join('')}</nav><p class="fiction-note">Freie Konzeptarbeit · ${p.year} · Keine echte Kundenkampagne.</p></section>
 <a class="next-screen" href="case-${next.slug}.html">${visual(next,{scene:true})}<span>Nächstes Projekt</span><strong>${next.name} ↗</strong></a></div>`;}
module.exports={renderHome,renderProjects,renderCase,visual};
