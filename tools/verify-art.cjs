// Content/asset contracts which the generic gate cannot infer.
const fs=require('fs'),path=require('path'),assert=require('node:assert/strict');
const root=path.join(__dirname,'..');
const {projects,agents,specialists}=require('./content/site.cjs');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
assert.equal(projects.length,4);assert.equal(agents.length,12);
assert.equal(specialists.reduce((sum,[,items])=>sum+items.length,0),18);
for(const p of projects){
 const html=read('case-'+p.slug+'.html');
 for(const suffix of ['-v2', '-detail-v2'])for(const size of [800,1536]){
  const asset='assets/campaigns/'+p.id+suffix+'-'+size+'.webp';
  assert(html.includes(asset),'Missing case image '+asset);
  assert(fs.statSync(path.join(root,asset)).size>10000,'Empty campaign asset '+asset);
 }
}
const ids=new Set(agents.map(a=>a.id));
assert.equal(ids.size,agents.length,'Duplicate primary agent id');
assert(!specialists.flatMap(([,list])=>list.map(([name])=>name)).some(name=>agents.some(a=>a.name===name)),'Promoted agents must not remain in specialist pool');
for(const file of fs.readdirSync(root).filter(f=>f.endsWith('.html')&&f!=='grellwerk-standalone.html')){
 for(const [,id] of read(file).matchAll(/ueber-uns\.html\?agent=([^&#" ]+)/g))assert(ids.has(id),'Unknown linked agent '+id+' in '+file);
}
const about=read('ueber-uns.html');
for(const a of agents){
 assert(about.includes('id="agent-'+a.id+'"'));assert(about.includes('data-agent-mobile="'+a.id+'"'));
 for(const size of [600,1080]){
  const portrait='assets/agents/'+a.id+'-'+size+'.webp';
  assert(about.includes(portrait),'Agent portrait not linked: '+portrait);
  assert(fs.statSync(path.join(root,portrait)).size>10000,'Missing agent portrait: '+portrait);
 }
}
assert(about.includes('fiktive Personen'),'Portraits must be identified as fictional');
const home=read('index.html');
assert(!home.includes('id="guide"'),'Retired mascot must not be in the active shell');
assert(!/from ['"]\.\/(?:flight|brummer|finder)\.js/.test(read('js/main.js')),'Retired runtime imported by main');
assert(home.includes('data-reel')&&home.includes('data-monitor'),'Shared reel and monitor required');
for(const name of ['pulse','signal']){
 const gif=fs.readFileSync(path.join(root,'assets/motion/'+name+'.gif'));
 assert.equal(gif.subarray(0,6).toString(),'GIF89a','Real animated GIF file required');
 assert(home.includes('data-motion-src="assets/motion/'+name+'.gif"'),'GIF not connected to Home');
 assert(home.includes('data-still="assets/motion/'+name+'-still.webp"'),'Pause needs a still image');
}
assert(!home.includes('grellwerk-reel.mp4'),'Rejected photo slideshow remains on Home');
for(const name of ['coffee','footwork','cream']){
 const gif=fs.readFileSync(path.join(root,'assets/motion/'+name+'.gif'));
 assert.equal(gif.subarray(0,6).toString(),'GIF89a','Project studies require real GIF files');
 assert(read('arbeiten.html').includes('data-motion-src="assets/motion/'+name+'.gif"'),'Missing project film study '+name);
}
assert(!home.includes('id="weiter"')&&!home.includes('home-crew-story'),'Home must contain only its hero');
assert(about.includes('id="zusammenarbeit"'),'Crew handoffs belong on About');
for(const p of projects)assert(read('arbeiten.html').includes('id="projekt-'+p.id+'"'),'Missing project chapter '+p.id);
for(const p of projects.slice(0,3))assert(read('case-'+p.slug+'.html').includes('data-motion-loop'),'Missing case motion '+p.id);
assert(!home.includes('data-screen-select='),'Retired campaign carousel remains');
assert(home.includes('id="studio-menu"'),'Fullscreen menu missing');
assert(about.includes('data-cut-toggle'),'CUT interaction missing');
for(const file of ['kold-street-v4-800.webp','kold-street-v4-1536.webp','kold-street-v4-mobile.webp'])assert(fs.statSync(path.join(root,'assets/campaigns',file)).size>10000,'Missing new campaign asset '+file);
for(const [file,ids] of [['labor.html',['pakete','konfigurator','slogan-lab','faq']],['kontakt.html',['f-name','f-email','f-company','f-msg']]]){
 const html=read(file);for(const id of ids)assert(html.includes('id="'+id+'"'),file+' missing '+id);
}
// The Three dependency graph must stay local, including the example geometry.
for(const file of ['js/brummer.js','js/hero-stage.js','assets/vendor/FontLoader.js','assets/vendor/TextGeometry.js','assets/vendor/RoomEnvironment.js','assets/vendor/three.module.js','assets/vendor/three.core.js','assets/vendor/RoundedBoxGeometry.js']){
 for(const [,spec] of read(file).replace(/\/\*[\s\S]*?\*\//g,'').matchAll(/from\s*['"]([^'"]+)['"]/g)){
  assert(spec.startsWith('.'),'Nonlocal import in '+file+': '+spec);
  assert(fs.existsSync(path.resolve(root,path.dirname(file),spec)),'Missing '+spec);
 }
}
const sa=read('grellwerk-standalone.html');
assert(!/<link rel="stylesheet"/.test(sa),'Standalone has external CSS');
assert(!/(?:src|href)="assets\//.test(sa),'Standalone has external assets');
assert(!/srcset="assets\//.test(sa),'Standalone has external picture sources');
assert((sa.match(/data-motion-src="data:image\/gif;base64,/g)||[]).length===2,'Standalone must embed both hero GIF loops');
assert(!/src="js\//.test(sa),'Standalone has external scripts');
const map=JSON.parse(sa.match(/<script type="importmap">([\s\S]*?)<\/script>/)[1]).imports;
assert.equal(Object.keys(map).length,3);
for(const [key,data] of Object.entries(map)){
 assert(data.startsWith('data:application/javascript;base64,'));
 const source=Buffer.from(data.split(',')[1],'base64').toString();
 for(const [,spec] of source.matchAll(/(?:from\s*|import\s*\()['"](gw\/[^'"]+)['"]/g))assert(map[spec],key+' unresolved '+spec);
}
console.log('Studio: cases, agents, utilities, local 3D dependencies and standalone assets verified.');
