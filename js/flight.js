import { syncHeroStage } from './hero-stage.js';
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const stage=document.getElementById('guide'),toggle=document.getElementById('guide-tab');
let model=null,unavailable=false,paused=false,loading=false,frame=0,lastTime=0,initial=true;
let x=innerWidth*.7,y=250,size=420,flightUntil=0,flightFrom=null,slots=[],observed=new Set();
let pointer={x:innerWidth/2,y:innerHeight/2},lookTarget=null;
try{paused=sessionStorage.getItem('brummer-paused')==='1';}catch{}
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
const observer=new IntersectionObserver(entries=>{for(const e of entries){if(e.isIntersecting)observed.add(e.target);else observed.delete(e.target);}wake();},{threshold:[0,.3,.65,1]});
function destination(){
 if(document.querySelector('#project-finder[open],.more-nav[open]'))return null;
 for(const slot of slots){
  if(slot.closest('details:not([open])')||!slot.getClientRects().length)continue;
  const r=slot.getBoundingClientRect();
  if(r.bottom<40||r.top>innerHeight-15||r.right<0||r.left>innerWidth)continue;
  const kind=slot.dataset.brummerSlot;
  // Never park in the margin or cover text: each page reserves its own slot.
  return{x:r.left+r.width/2,y:r.top+r.height/2,size:Math.min(r.width,r.height)*(kind==='home'?1.12:1.28),kind};
 }
 return null;
}
function syncButton(){
 const off=paused||reduced.matches;document.documentElement.classList.toggle('no-motion',off);
 toggle.disabled=reduced.matches||unavailable;toggle.setAttribute('aria-pressed',String(off||unavailable));
 toggle.setAttribute('aria-label',reduced.matches?'Reduzierte Bewegung aktiv':unavailable?'Statische Ersatzdarstellung':paused?'Bewegung einschalten':'Bewegung pausieren');
 toggle.firstElementChild.textContent=off||unavailable?'▶':'Ⅱ';toggle.querySelector('.motion-label').textContent=off?'Bewegung einschalten':'Bewegung pausieren';
}
function tick(time){
 frame=0;if(document.hidden)return;
 const d=destination(),off=paused||reduced.matches||unavailable;
 if(!d){stage.style.opacity='0';stage.dataset.docked='none';lastTime=time;initial=true;return;}
 stage.style.opacity='1';stage.dataset.docked=d.kind;
 const dt=Math.min((time-lastTime)||16,45);lastTime=time;
 let target=d;
 if(!off&&flightUntil>time&&flightFrom){const p=clamp(1-(flightUntil-time)/750,0,1),ease=p*p*(3-2*p);target={x:flightFrom.x+(d.x-flightFrom.x)*ease,y:flightFrom.y+(d.y-flightFrom.y)*ease-Math.sin(p*Math.PI)*Math.min(80,innerHeight*.1),size:flightFrom.size+(d.size-flightFrom.size)*ease};}
 const previous=x,blend=initial||off?1:1-Math.exp(-dt*.014);
 x+=(target.x-x)*blend;y+=(target.y-y)*blend;size+=(target.size-size)*blend;
 stage.style.transform=`translate3d(${(x-size/2).toFixed(2)}px,${(y-size/2).toFixed(2)}px,0) scale(${(size/420).toFixed(4)})`;stage.style.transformOrigin='0 0';
 const gaze=lookTarget?.isConnected?lookTarget.getBoundingClientRect():null;
 const px=gaze?gaze.left+gaze.width/2:pointer.x,py=gaze?gaze.top+gaze.height/2:pointer.y;
 model?.draw(time,{gazeX:clamp((px-x)/300,-1,1),gazeY:clamp((y-py)/300,-1,1),velocity:(x-previous)*60/dt,flight:flightUntil>time?1:0,still:off,perched:d.kind!=='home'&&flightUntil<=time});
 initial=false;
 if(!off)frame=requestAnimationFrame(tick);
}
function wake(){if(!frame&&!document.hidden)frame=requestAnimationFrame(tick);}
async function loadModel(){
 if(model||loading||reduced.matches)return;loading=true;
 try{const {createBrummer}=await import('./brummer.js');if(reduced.matches)return;model=createBrummer(stage,available=>{unavailable=!available;syncButton();wake();});unavailable=false;wake();}
 catch{unavailable=true;stage.dataset.renderer='fallback';stage.classList.remove('is-rendered');syncButton();wake();}
 finally{loading=false;}
}
function refreshSlots(){observer.disconnect();observed.clear();slots=[...document.querySelectorAll('main [data-brummer-slot]')];slots.forEach(s=>observer.observe(s));syncHeroStage();wake();}
export function flyTo(target=null){lookTarget=target;flightFrom=target?null:{x,y,size};flightUntil=performance.now()+(target?350:750);wake();}
export function refreshFlight(){lookTarget=null;refreshSlots();}
function scrollWake(){initial=true;flightUntil=0;flightFrom=null;wake();}
// A passive wake schedules one frame; all measurements are batched inside tick.
addEventListener('scroll',scrollWake,{passive:true});
addEventListener('resize',()=>{initial=true;wake();},{passive:true});
addEventListener('pointermove',e=>{pointer={x:e.clientX,y:e.clientY};},{passive:true});
reduced.addEventListener('change',()=>{if(reduced.matches&&model){model.dispose();model=null;stage.classList.remove('is-rendered');stage.dataset.renderer='fallback';}else loadModel();syncButton();wake();});
reportVisibility();
function reportVisibility(){if(document.hidden){cancelAnimationFrame(frame);frame=0;}else{lastTime=0;wake();}}
document.addEventListener('visibilitychange',reportVisibility);
document.addEventListener('brummer:refresh',refreshSlots);
document.querySelector('.more-nav').addEventListener('toggle',wake);
toggle.addEventListener('click',()=>{if(reduced.matches||unavailable)return;paused=!paused;try{sessionStorage.setItem('brummer-paused',paused?'1':'0');}catch{}syncButton();wake();});
syncButton();refreshSlots();loadModel();
