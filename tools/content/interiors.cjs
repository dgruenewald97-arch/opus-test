// Preserve retained copy, controls and anchors while adding contextual imagery.
const media={performance:'neon-v2',brand:'hafer-v2',kampagnen:'kold-street-v4',content:'neon-detail-v2',web:'blitz-detail-v2',daten:'blitz-v2'};
const image=(file,cls,alt='')=>`<img class="${cls}" src="assets/campaigns/${file}-800.webp" srcset="assets/campaigns/${file}-800.webp 800w, assets/campaigns/${file}-1536.webp 1536w" sizes="(max-width:700px) 100vw, 50vw" width="800" height="533" alt="${alt}" loading="lazy">`;
function enhanceRetained(slug,html){
 if(slug==='leistungen'){
  html=html.replace(/(<a class="case magnetic" href="leistung-([a-z]+)\.html"[^>]*>)(?!<img class="service-image")/g,(_,tag,id)=>tag+image(media[id],'service-image'));
 }
 if(slug.startsWith('leistung-')){
  const key=slug.slice(9);
  html=html.replace(/<div class="case-hero__metric">[\s\S]*?<\/div>/,`<figure class="service-hero-visual">${image(media[key],'service-hero-image','Motiv aus einer freien GRELLWERK-Markenstudie')}</figure>`);
 }
 return html;
}
module.exports={enhanceRetained};
