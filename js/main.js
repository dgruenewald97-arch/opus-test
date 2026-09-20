import { initTeam } from './team.js';
import { initStudio, closeStudioMenu } from './studio.js?v=11';
import { initKonfigurator } from './konfigurator.js';
import { initGenerator } from './generator.js';
import { initJournal } from './journal.js';
import { KONFIGURATOR, SLOGAN } from './config.js';

const reduce=matchMedia('(prefers-reduced-motion: reduce)');
const curtain=document.querySelector('.route-curtain');
const strips=[...curtain.querySelectorAll('i')];
let pending=null,busy=false,controller=null,scrollTimer=0,imageTransfer=null,navigationId=0;
const cache=new Map();
const rootURL=new URL('.',location.href);
const isLocalPage=url=>url.origin===location.origin && url.pathname.startsWith(rootURL.pathname) && !url.pathname.slice(rootURL.pathname.length).includes('/') && (/\.html$/.test(url.pathname)||url.pathname===rootURL.pathname);
history.scrollRestoration='manual';
history.replaceState({...history.state,scroll:scrollY},'',location.href);

function imageError(img){img.closest('.campaign-image,.profile-work')?.classList.add('image-failed');}
document.addEventListener('error',e=>{if(e.target instanceof HTMLImageElement)imageError(e.target);},true);

function initPage(){
 const main=document.querySelector('main');
 if(!main.dataset.page)main.dataset.page='legacy';
 main.tabIndex=-1;
 document.body.dataset.page=main.dataset.page;
 document.querySelectorAll('.nav__link').forEach(a=>{
  const selected=new URL(a.href).pathname===location.pathname || (main.dataset.page==='case'&&a.getAttribute('href')==='arbeiten.html');
  if(selected)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');
 });
 document.querySelectorAll('.campaign-image img,.profile-work img').forEach(img=>{if(img.complete&&!img.naturalWidth)imageError(img);});
 initKonfigurator({KONFIGURATOR});
 initGenerator({SLOGAN,reducedMotion:reduce.matches});
 initJournal();
 initTeam(main);
 const form=main.querySelector('#contact-form');
 form?.addEventListener('submit',async e=>{
  e.preventDefault();
  if(!form.reportValidity())return;
  const data=new FormData(form);
  const text=['GRELLWERK · Briefing','Name: '+data.get('name'),'E-Mail: '+data.get('email'),'Unternehmen: '+(data.get('company')||'—'),'','Idee: '+data.get('message')].join('\n');
  const status=main.querySelector('#form-status');
  try{await navigator.clipboard.writeText(text);status.textContent='Briefing kopiert. Es wurde nichts versendet.';}
  catch{status.textContent='Kopieren ist hier nicht verfügbar. Du kannst deine Angaben direkt aus den Feldern kopieren.';}
 });
 // Preserve old deep links while the tools now have a dedicated page.
 if(main.dataset.page==='home'&&['#pakete','#konfigurator','#slogan-lab','#faq'].includes(location.hash)){
  navigate(new URL('labor.html'+location.hash,location.href),{replace:true});
 }
 initStudio(main);
}
async function animateCurtain(cover){
 if(reduce.matches||document.documentElement.classList.contains('no-motion')){
  curtain.classList.remove('is-covering');strips.forEach(s=>s.getAnimations().forEach(a=>a.cancel()));return;
 }
 if(cover)curtain.classList.add('is-covering');
 await Promise.all(strips.map((strip,i)=>strip.animate(
  [{transform:cover?'translateY(100%)':'translateY(0)'},{transform:cover?'translateY(0)':'translateY(-100%)'}],
  {duration:cover?330:420,delay:i*42,easing:'cubic-bezier(.65,0,.25,1)',fill:'forwards'}
 ).finished.catch(()=>{})));
 if(!cover){curtain.classList.remove('is-covering');strips.forEach(s=>s.getAnimations().forEach(a=>a.cancel()));}
}
async function loadPage(url,signal){
 const key=url.pathname;
 if(cache.has(key))return cache.get(key).cloneNode(true);
 const requestURL=new URL(url);requestURL.searchParams.set('_build',new URL(import.meta.url).searchParams.get('v')||'10');
 const response=await fetch(requestURL.href,{signal,cache:'no-store'});
 if(!response.ok)throw new Error('Page unavailable');
 const doc=new DOMParser().parseFromString(await response.text(),'text/html');
 if(!doc.querySelector('main')||!doc.querySelector('.nav'))throw new Error('Invalid page');
 cache.set(key,doc);
 if(cache.size>12)cache.delete(cache.keys().next().value);
 return doc.cloneNode(true);
}
function cancelTransfer(){
 imageTransfer?.animation?.cancel();imageTransfer?.node.remove();imageTransfer=null;
}
async function carryImage(source,commit){
 const alternate=source.querySelector('.project-alternate');
 const activeAlternate=alternate&&matchMedia('(hover:hover)').matches&&source.matches(':hover,:focus-visible');
 const rect=source.getBoundingClientRect(),img=(activeAlternate?alternate:source).querySelector('img');
 if(!img||!rect.width||!rect.height){commit();return;}
 const node=document.createElement('div'),copy=img.cloneNode();
 node.className='image-transfer';node.setAttribute('aria-hidden','true');
 copy.removeAttribute('srcset');copy.src=img.currentSrc||img.src;copy.loading='eager';copy.alt='';
 const video=source.querySelector('video');
 if(video?.readyState>=2){
  try{
   const snapshot=document.createElement('canvas');snapshot.width=Math.round(rect.width);snapshot.height=Math.round(rect.height);
   const c=snapshot.getContext('2d'),vr=video.getBoundingClientRect(),scale=Math.max(vr.width/video.videoWidth,vr.height/video.videoHeight);
   c.drawImage(video,vr.left-rect.left+(vr.width-video.videoWidth*scale)/2,vr.top-rect.top+(vr.height-video.videoHeight*scale)/2,video.videoWidth*scale,video.videoHeight*scale);
   copy.src=snapshot.toDataURL('image/jpeg',.9);
  }catch{}
 }
 Object.assign(node.style,{width:rect.width+'px',height:rect.height+'px',transform:`translate(${rect.x}px,${rect.y}px)`});
 node.append(copy);document.body.append(node);imageTransfer={node,animation:null};
 commit();
 const target=document.querySelector('.case-opening-media')?.getBoundingClientRect();
 if(!target){cancelTransfer();return;}
 const destination=`translate(${target.x}px,${target.y}px) scale(${target.width/rect.width},${target.height/rect.height})`;
 const animation=node.animate([{transform:`translate(${rect.x}px,${rect.y}px)`,opacity:1},{transform:destination,opacity:1,offset:.85},{transform:destination,opacity:0}],{duration:720,easing:'cubic-bezier(.2,.75,.2,1)',fill:'forwards'});
 imageTransfer.animation=animation;
 await animation.finished.catch(()=>{});
 if(imageTransfer?.node===node)cancelTransfer();else node.remove();
}
function syncHead(doc){
 document.title=doc.title;
 for(const selector of ['meta[name="description"]','meta[property="og:title"]','meta[property="og:description"]','meta[property="og:image"]','link[rel="canonical"]']){
  const next=doc.querySelector(selector);const old=document.querySelector(selector);
  if(next&&old)old.replaceWith(next.cloneNode(true));
 }
}
function scrollDestination(url,options){
 if(options.pop){scrollTo({top:options.scroll||0,behavior:'instant'});return;}
 const agent=url.searchParams.get('agent');
 const role=agent&&document.querySelector('main[data-page=about]')?document.querySelector(innerWidth<701?'[data-agent-mobile="'+CSS.escape(agent)+'"]':'.team-filters'):null;
 const target=role||(url.hash?document.getElementById(decodeURIComponent(url.hash.slice(1))):null);
 if(target)target.scrollIntoView({behavior:'instant',block:'start'});
 else scrollTo({top:options.pop?(options.scroll||0):0,behavior:'instant'});
}
async function drain(){
 if(busy)return;
 busy=true;
 clearTimeout(scrollTimer);
 closeStudioMenu();
 let covered=false;
 try{
  // Fetch and the visual cover start together; only the latest click commits.
  while(pending){
   const request=pending;pending=null;controller=new AbortController();
   const loading=loadPage(request.url,controller.signal);
   loading.catch(()=>{}); // avoid an unhandled rejection while the curtain animates
   const shared=request.options.sharedMedia?.isConnected&&request.options.sharedMedia.querySelector('img')?.naturalWidth&&!reduce.matches&&!document.documentElement.classList.contains('no-motion');
   if(!covered&&!shared){await animateCurtain(true);covered=true;}
   let doc;
   try{doc=await loading;}catch(error){
    if(error.name==='AbortError')continue;
    if(pending)continue;
    location.assign(request.url.href);return;
   }
   if(pending)continue;
   const commit=()=>{
   if(pending||request.id!==navigationId)return;
   if(!request.options.pop){
    if(!request.options.replace)history.replaceState({...history.state,scroll:scrollY},'',location.href);
    history[request.options.replace?'replaceState':'pushState']({scroll:0},'',request.url.href);
   }
   document.querySelector('main').replaceWith(doc.querySelector('main'));
   syncHead(doc);initPage();scrollDestination(request.url,request.options);
   document.querySelector('main').focus({preventScroll:true});
   document.getElementById('route-status').textContent=document.title.replace(' | GRELLWERK','')+' geladen';
   };
   if(shared&&!covered){
    await carryImage(request.options.sharedMedia,commit);
   }else commit();
  }
 }finally{
  if(covered)await animateCurtain(false);
  busy=false;controller=null;
  if(pending)drain();
 }
}
function navigate(url,options={}){
 pending={url,options,id:++navigationId};
 cancelTransfer();
 controller?.abort();
 drain();
}
document.addEventListener('click',e=>{
 const a=e.target.closest('a[href]');
 if(!a||e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||a.target||a.hasAttribute('download'))return;
 const url=new URL(a.href,location.href);
 if(!isLocalPage(url)||location.protocol==='file:')return;
 if(url.pathname===location.pathname&&url.search===location.search&&!busy){
  if(url.hash){e.preventDefault();history.replaceState({...history.state,scroll:scrollY},'',location.href);history.pushState({scroll:0},'',url.href);scrollDestination(url,{});if(url.hash==='#main')document.querySelector('main').focus({preventScroll:true});}
  else if(!url.hash){e.preventDefault();scrollTo({top:0,behavior:reduce.matches?'instant':'smooth'});}
  return;
 }
 const sharedMedia=(a.matches('.elastic-window,.work-screen,.agency-story-film')?a:a.querySelector('.campaign-image'))||(a.matches('[data-screen-link]')?document.querySelector('.screen-frame.is-active .campaign-image'):null);
 e.preventDefault();navigate(url,{sharedMedia});
});
addEventListener('popstate',e=>{
 const url=new URL(location.href);
 navigate(url,{pop:true,scroll:e.state?.scroll||0});
});
addEventListener('scroll',()=>{
 if(busy)return;
 clearTimeout(scrollTimer);scrollTimer=setTimeout(()=>{if(!busy)history.replaceState({...history.state,scroll:scrollY},'',location.href);},120);
},{passive:true});
initPage();

if(location.hash&&new URL(location.href).searchParams.has('agent'))requestAnimationFrame(()=>scrollDestination(new URL(location.href),{}));
