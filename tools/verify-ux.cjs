/* Behavioral DOM regression checks; deliberately does not launch a browser. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
let JSDOM;
try { ({ JSDOM } = require(require.resolve('jsdom', { paths: [process.env.QA_NODE_MODULES || path.resolve(root, '../qa-runtime/node_modules'), root] }))); }
catch { console.error('Install isolated test dependency: npm install --prefix ../qa-runtime --no-package-lock --no-audit --no-fund jsdom@26'); process.exit(1); }
const tick = () => new Promise(resolve => setTimeout(resolve, 0));
const deferred = () => { let resolve, reject; const promise = new Promise((a,b) => { resolve=a; reject=b; }); return { promise, resolve, reject }; };
function env(html, url='https://example.test/index.html') {
  const dom = new JSDOM(html, { url, runScripts: 'outside-only', pretendToBeVisual: true });
  const w = dom.window;
  w.matchMedia = () => ({ matches: true, addEventListener() {}, removeEventListener() {} });
  w.CSS = { escape: value => value };
  w.scrollTo = ({top}) => { w._scroll=top; Object.defineProperty(w,'scrollY',{value:top,writable:true,configurable:true}); };
  w.HTMLElement.prototype.scrollIntoView = function(options) { w._anchor = this.id; w._scrollOptions = options; };
  w.HTMLElement.prototype.getAnimations = () => [];
  w.HTMLElement.prototype.animate = () => ({ cancel(){}, finished: Promise.resolve() });
  w.document.getAnimations = () => [];
  w._observers=[];
  w.IntersectionObserver = class { constructor(callback){this.callback=callback;this.targets=new Set();w._observers.push(this);} observe(el){this.targets.add(el);} unobserve(el){this.targets.delete(el);} disconnect(){this.targets.clear();this.disconnected=true;} };
  return dom;
}
function moduleSource(w, name, exports=[]) {
  let source = fs.readFileSync(path.join(root,'js',name),'utf8');
  source=source.replace(/^import .*;\s*$/gm,'').replace(/export /g,'').replaceAll('import.meta.url',JSON.stringify('https://example.test/js/main.js?v=12'));
  w.eval(`{\n${source}\n${exports.map(name=>`window.${name}=${name};`).join('\n')}\n}`);
}
const page = (name, extra='') => `<title>${name} | GRELLWERK</title><header class="nav"></header><main data-page="${name}"><h1>${name}</h1>${extra}</main>`;
function routerEnv({motion=false}={}) {
  const dom=env(page('home','<a id="a" href="a.html">A</a><a id="b" href="b.html">B</a><a id="home" href="index.html#target">Home</a><section id="target">Target</section>')+'<div class="route-feedback" hidden><p></p><a data-native>Retry</a><button>Close</button></div><span id="route-status"></span>');
  const w=dom.window;
  for(const name of ['initTeam','initStudio','closeStudioMenu','initKonfigurator','initGenerator','initJournal'])w[name]=()=>{};
  w.initBriefing=()=>()=>{};w.KONFIGURATOR={};w.SLOGAN={};
  w.requests=[];
  w.animations=[];
  if(motion){
    w.matchMedia=()=>({matches:false,addEventListener(){}});
    w.HTMLElement.prototype.animate=function(){const pending=deferred();const animation={target:this,active:true,finished:pending.promise,cancel(){this.active=false;pending.reject(new Error('cancelled'));},finish(){pending.resolve();}};w.animations.push(animation);return animation;};
  }
  w.fetch=(url,options)=>{const pending=deferred();w.requests.push({url,options,...pending});return pending.promise;};
  moduleSource(w,'main.js');
  return dom;
}
const response = html => ({ok:true,text:async()=>html});
const click=(w,selector)=>w.document.querySelector(selector).dispatchEvent(new w.MouseEvent('click',{bubbles:true,cancelable:true,button:0}));
const tests=[];
const test=(name,run)=>tests.push({name,run});
test('rapid routes: aborted fetch cannot overwrite the latest route',async()=>{
 const dom=routerEnv(),w=dom.window;
 try { click(w,'#a');click(w,'#b');assert.equal(w.requests[0].options.signal.aborted,true);
 w.requests[1].resolve(response(page('b')));await tick();assert.equal(w.document.querySelector('main').dataset.page,'b');
 w.requests[0].resolve(response(page('a')));await tick();assert.equal(w.document.querySelector('main').dataset.page,'b');assert.equal(w.location.pathname,'/b.html');assert.equal(w.history.length,2);
 } finally {dom.window.close();}
});
test('same-page anchor cancels pending route and focuses destination',async()=>{
 const dom=routerEnv(),w=dom.window;
 try {click(w,'#a');click(w,'#home');assert.equal(w.requests[0].options.signal.aborted,true);assert.equal(w._anchor,'target');assert.equal(w.document.activeElement.id,'target');
 w.requests[0].resolve(response(page('a')));await tick();assert.equal(w.document.querySelector('main').dataset.page,'home');assert.equal(w.location.hash,'#target');
 } finally {w.close();}
});
test('failed route preserves main, URL, history and exposes native retry',async()=>{
 const dom=routerEnv(),w=dom.window;
 try {const main=w.document.querySelector('main');click(w,'#a');w.requests[0].reject(new Error('offline'));await tick();assert.equal(w.document.querySelector('main'),main);assert.equal(w.location.pathname,'/index.html');assert.equal(w.history.length,1);assert.equal(w.document.querySelector('.route-feedback').hidden,false);assert.equal(w.document.querySelector('.route-feedback a').pathname,'/a.html');assert.equal(main.hasAttribute('aria-busy'),false);
 } finally {w.close();}
});
test('history restores scroll without creating an extra entry',async()=>{
 const dom=routerEnv(),w=dom.window;
 try {w.scrollTo({top:420});click(w,'#a');w.requests[0].resolve(response(page('a')));await tick();assert.equal(w.history.length,2);
 w.history.back();await new Promise(resolve=>setTimeout(resolve,30));assert.equal(w.requests.length,2);w.requests[1].resolve(response(page('home')));await tick();assert.equal(w.location.pathname,'/index.html');assert.equal(w._scroll,420);assert.equal(w.history.length,2);
 } finally {w.close();}
});
test('same-document back navigation restores the saved scroll',async()=>{
 const dom=routerEnv(),w=dom.window;
 try {w.scrollTo({top:170});click(w,'#home');w.scrollTo({top:480});w.dispatchEvent(new w.Event('scroll'));await new Promise(resolve=>setTimeout(resolve,150));w.history.back();await new Promise(resolve=>setTimeout(resolve,30));assert.equal(w._scroll,170);assert.equal(w.requests.length,0);assert.equal(w.location.hash,'');
 } finally {w.close();}
});
test('route interruption cancels outgoing and incoming animation handles',async()=>{
 const dom=routerEnv({motion:true}),w=dom.window;
 try {click(w,'#a');w.requests[0].resolve(response(page('a')));await tick();assert.equal(w.animations.length,1);click(w,'#b');assert.equal(w.animations[0].active,false);w.requests[1].resolve(response(page('b','<a id="hash" href="#detail">Detail</a><section id="detail"></section>')));await tick();assert.equal(w.animations.length,2);w.animations[1].finish();await tick();assert.equal(w.document.querySelector('main').dataset.page,'b');assert.equal(w.animations.length,3);assert.equal(w.animations[2].active,true);click(w,'#hash');await tick();assert.equal(w.animations[2].active,false);assert.equal(w._anchor,'detail');assert.equal(w.document.activeElement.id,'detail');assert.equal(w.document.body.hasAttribute('data-loading'),false);assert.equal(w.history.length,3);
 } finally {w.close();}
});
test('cross-page fragment focuses the destination rather than the page start',async()=>{
 const dom=routerEnv(),w=dom.window;
 try {w.document.querySelector('#a').href='a.html#detail';click(w,'#a');w.requests[0].resolve(response(page('a','<section id="detail"><h2>Detail</h2></section>')));await tick();assert.equal(w._anchor,'detail');assert.equal(w.document.activeElement.id,'detail');assert.equal(w.location.hash,'#detail');}
 finally {w.close();}
});
test('failed history load preserves the usable page and restores its address',async()=>{
 const dom=routerEnv(),w=dom.window;
 try {click(w,'#a');w.requests[0].resolve(response(page('a')));await tick();const main=w.document.querySelector('main');w.history.back();await new Promise(resolve=>setTimeout(resolve,30));w.requests[1].reject(new Error('offline'));await tick();assert.equal(w.document.querySelector('main'),main);assert.equal(w.location.pathname,'/a.html');assert.equal(w.document.querySelector('.route-feedback').hidden,false);assert.equal(w.document.querySelector('.route-feedback a').pathname,'/index.html');assert.equal(w.history.length,2);}
 finally {w.close();}
});
test('studio chapter links remain usable after a profile selection changes the query',async()=>{
 const dom=routerEnv(),w=dom.window;
 try {w.document.querySelector('#a').href='ueber-uns.html?agent=cut#crew';click(w,'#a');w.requests[0].resolve(response(page('about','<section id="crew"></section><a id="chapter" href="#designpruefung">Design</a><section id="designpruefung"></section>')));await tick();assert.equal(w._anchor,'crew');w.history.replaceState(w.history.state,'','?agent=verify#crew');w.dispatchEvent(new w.Event('grellwerk:statechange'));click(w,'#chapter');await tick();assert.equal(w.requests.length,1);assert.equal(w._anchor,'designpruefung');assert.equal(w.document.activeElement.id,'designpruefung');}
 finally {w.close();}
});
function briefingEnv(){
 const dom=env('<main><p id="briefing-source" hidden></p><form id="contact-form"><input id="f-company" name="company"><textarea id="f-msg" name="message" required></textarea><textarea id="briefing-preview" readonly></textarea><p id="form-status"></p><button data-briefing-copy>Copy</button></form></main>','https://example.test/kontakt.html?project=kold');
 moduleSource(dom.window,'briefing.js',['initBriefing']);dom.window.dispose=dom.window.initBriefing(dom.window.document.querySelector('main'));return dom;
}
const submit=w=>w.document.querySelector('form').dispatchEvent(new w.Event('submit',{bubbles:true,cancelable:true}));
const input=(w,text)=>{const idea=w.document.querySelector('#f-msg');idea.value=text;idea.dispatchEvent(new w.Event('input',{bubbles:true}));};
test('clipboard failure gives manual selection, never a success claim',async()=>{
 const dom=briefingEnv(),w=dom.window;
 try {let calls=0;w.navigator.clipboard={writeText:async()=>{calls++;throw new Error('denied');}};assert.equal(w.document.querySelector('#f-company').value,'KOLD BREW');input(w,'   ');submit(w);await tick();assert.equal(calls,0);input(w,'Launch a brand');submit(w);await tick();assert.equal(calls,1);const preview=w.document.querySelector('#briefing-preview');assert.equal(w.document.activeElement,preview);assert.equal(preview.selectionEnd,preview.value.length);assert.match(w.document.querySelector('#form-status').textContent,/nicht möglich/);assert.equal(w.document.querySelector('button').disabled,false);
 } finally {w.close();}
});
test('clipboard race reports copied version and prevents duplicate writes',async()=>{
 const dom=briefingEnv(),w=dom.window;
 try {const pending=deferred();let calls=0;w.navigator.clipboard={writeText:()=>{calls++;return pending.promise;}};input(w,'First');submit(w);submit(w);assert.equal(calls,1);input(w,'Second');pending.resolve();await tick();assert.match(w.document.querySelector('#form-status').textContent,/vorherige Fassung/);assert.equal(w.document.querySelector('button').disabled,false);
 } finally {w.close();}
});
test('briefing cleanup blocks detached async focus and feedback',async()=>{
 const dom=briefingEnv(),w=dom.window;
 try {const pending=deferred();w.navigator.clipboard={writeText:()=>pending.promise};input(w,'First');submit(w);w.dispose();pending.reject(new Error('denied'));await tick();assert.equal(w.document.querySelector('#form-status').textContent,'');assert.notEqual(w.document.activeElement.id,'briefing-preview');assert.equal(w.document.querySelector('button').type,'button');
 } finally {w.close();}
});
test('project pause and keyboard focus open screens; destroy disconnects observers',async()=>{
 const dom=env('<header class="nav"></header><main><section data-work-screen><a href="case.html">Case</a></section><section data-work-screen></section></main>'),w=dom.window;
 try {w.matchMedia=()=>({matches:false,addEventListener(){}});moduleSource(w,'projects.js',['createProjects']);let paused=false;const screens=[...w.document.querySelectorAll('[data-work-screen]')];const project=w.createProjects(w.document.querySelector('main'),()=>paused);assert.equal(screens[0].classList.contains('js-work-motion'),true);screens[0].querySelector('a').focus();assert.equal(screens[0].classList.contains('is-open'),true);assert.equal(screens[0].classList.contains('js-work-motion'),false);paused=true;project.sync();assert.ok(screens.every(el=>el.classList.contains('is-open')&&!el.classList.contains('js-work-motion')));project.destroy();assert.equal(w._observers[0].disconnected,true);
 } finally {w.close();}
});
test('chapter tracking changes accessible selection without scrolling the viewport',async()=>{
 const dom=env('<header class="nav"></header><main><nav data-chapter-nav><a data-chapter-link href="#one">One</a><a data-chapter-link href="#two">Two</a></nav><section id="one"></section><section id="two"></section></main>','https://example.test/arbeiten.html#two'),w=dom.window;
 try {const main=w.document.querySelector('main'),links=[...main.querySelectorAll('a')];let secondTop=600;w.document.querySelector('header').getBoundingClientRect=()=>({bottom:60});w.document.querySelector('#one').getBoundingClientRect=()=>({top:-500,height:600});w.document.querySelector('#two').getBoundingClientRect=()=>({top:secondTop,height:600});moduleSource(w,'projects.js',['createProjects']);const projects=w.createProjects(main,()=>false);assert.equal(links[1].getAttribute('aria-current'),'location');await new Promise(resolve=>setTimeout(resolve,30));assert.equal(links[0].getAttribute('aria-current'),'location');secondTop=40;w.dispatchEvent(new w.Event('scroll'));await new Promise(resolve=>setTimeout(resolve,30));assert.equal(links[1].getAttribute('aria-current'),'location');assert.equal(links[0].hasAttribute('aria-current'),false);assert.equal(w._anchor,undefined);assert.equal(w._scroll,undefined);projects.destroy();
 } finally {w.close();}
});
test('team deep link, filter and keyboard selection stay synchronized',async()=>{
 const dom=env('<main><button data-team-filter="all">All</button><button data-team-filter="design">Design</button><button data-agent="cut" data-department="design">Cut</button><button data-agent="verify" data-department="tech">Verify</button><section class="agent-panel" id="agent-cut"><div class="agent-portrait"></div></section><section class="agent-panel" id="agent-verify"><div class="agent-portrait"></div></section><details data-agent-mobile="cut" data-department="design"></details><details data-agent-mobile="verify" data-department="tech"></details></main>','https://example.test/agentur.html?agent=verify'),w=dom.window;
 try {moduleSource(w,'team.js',['initTeam']);w.initTeam(w.document.querySelector('main'));assert.equal(w.document.querySelector('#agent-verify').hidden,false);assert.equal(w.document.querySelector('[data-agent-mobile="verify"]').open,true);click(w,'[data-team-filter="design"]');assert.equal(w.document.querySelector('[data-agent="verify"]').hidden,true);assert.equal(w.document.querySelector('#agent-cut').hidden,false);assert.equal(new w.URL(w.location.href).searchParams.get('agent'),'cut');click(w,'[data-team-filter="all"]');w.document.querySelector('[data-agent="cut"]').dispatchEvent(new w.KeyboardEvent('keydown',{key:'ArrowDown',bubbles:true}));assert.equal(w.document.activeElement.dataset.agent,'verify');assert.equal(w.document.querySelector('[data-agent="verify"]').getAttribute('aria-pressed'),'true');assert.equal(w.document.querySelector('#agent-verify').hidden,false);
 } finally {w.close();}
});
test('studio pause persists, menu pauses media and page replacement destroys controllers',async()=>{
 const dom=env('<button id="motion-toggle"></button><button data-menu-open></button><dialog id="studio-menu"><button data-menu-close></button></dialog><main><button data-reel-toggle></button></main>'),w=dom.window;
 try {const media=[];w.matchMedia=()=>({matches:false,addEventListener(){}});for(const name of ['createReel','createMotionLoops','createProjects'])w[name]=(main,paused)=>{const item={paused,sync(){this.synced=true;},destroy(){this.destroyed=true;}};media.push(item);return item;};const menu=w.document.querySelector('dialog');menu.showModal=()=>{menu.open=true;};menu.close=()=>{menu.open=false;menu.dispatchEvent(new w.Event('close'));};moduleSource(w,'studio.js',['initStudio','closeStudioMenu']);w.initStudio(w.document.querySelector('main'));click(w,'#motion-toggle');assert.equal(w.sessionStorage.getItem('grellwerk-still'),'1');assert.equal(w.document.documentElement.classList.contains('no-motion'),true);assert.ok(media.every(item=>item.paused()));click(w,'#motion-toggle');assert.ok(media.every(item=>!item.paused()));click(w,'[data-menu-open]');assert.ok(media.every(item=>item.paused()));assert.equal(w.document.querySelector('[data-menu-open]').getAttribute('aria-expanded'),'true');w.closeStudioMenu({immediate:true});assert.ok(media.every(item=>!item.paused()));assert.equal(w.document.querySelector('[data-menu-open]').getAttribute('aria-expanded'),'false');const oldToggle=w.document.querySelector('[data-reel-toggle]'),next=w.document.createElement('main');w.document.querySelector('main').replaceWith(next);w.initStudio(next);assert.ok(media.slice(0,3).every(item=>item.destroyed));oldToggle.click();assert.equal(w.sessionStorage.getItem('grellwerk-still'),'0');
 } finally {w.close();}
});
(async()=>{let failures=0;for(const {name,run} of tests){try{await run();console.log(`PASS ${name}`);}catch(error){failures++;console.error(`FAIL ${name}\n${error.stack}`);}}console.log(`${tests.length-failures}/${tests.length} behavioral DOM checks passed. No browser or visual verification performed.`);process.exitCode=failures?1:0;})();
