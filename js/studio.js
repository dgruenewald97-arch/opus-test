import {createReel,createMotionLoops} from './reel.js?v=14';
import {createProjects} from './projects.js?v=14';
const reduce=matchMedia('(prefers-reduced-motion: reduce)');
let paused=false,disposePage=()=>{},reel=null,projects=null,loops=null,updateScroll=()=>{};
try{paused=sessionStorage.getItem('grellwerk-still')==='1';}catch{}
export const motionOff=()=>reduce.matches||paused;
function syncMotion(){
 document.documentElement.classList.toggle('no-motion',motionOff());
 for(const button of document.querySelectorAll('#motion-toggle,[data-reel-toggle]')){button.setAttribute('aria-pressed',String(motionOff()));button.disabled=reduce.matches;button.textContent=reduce.matches?'Reduzierte Bewegung aktiv':paused?'Bewegung einschalten':'Bewegung pausieren';button.setAttribute('aria-label',button.textContent);}
 if(motionOff())document.getAnimations().forEach(a=>{try{a.finish();}catch{a.cancel();}});
 reel?.sync();projects?.sync();loops?.sync();updateScroll();
}
function toggleMotion(){paused=!paused;try{sessionStorage.setItem('grellwerk-still',paused?'1':'0');}catch{}syncMotion();}
const menu=document.querySelector('#studio-menu'),menuButton=document.querySelector('[data-menu-open]');
let menuMotion=null,menuEpoch=0;
function menuMask(edges){return `polygon(${edges.flatMap((y,i)=>[`${i*20}% ${y}%`,`${(i+1)*20}% ${y}%`]).join(',')},100% 100%,0 100%)`;}
function animateMenu(open){
 menuMotion?.cancel();
 const frames=[{clipPath:menuMask([100,100,100,100,100])},{clipPath:menuMask([0,12,28,46,64]),offset:.58},{clipPath:menuMask([0,0,0,0,0])}];
 menuMotion=menu.animate(frames,{duration:open?620:390,direction:open?'normal':'reverse',easing:'cubic-bezier(.65,0,.25,1)',fill:'both'});
 return menuMotion.finished.catch(()=>{});
}
menuButton?.addEventListener('click',()=>{
 if(menu.open)return;
 const epoch=++menuEpoch;menu.showModal();menuButton.setAttribute('aria-expanded','true');
 if(!motionOff()){
  animateMenu(true).then(()=>{if(epoch===menuEpoch){menuMotion?.cancel();menuMotion=null;}});
  menu.querySelectorAll('.menu-primary>a>span').forEach((el,i)=>el.animate([{transform:'translateY(100%)',opacity:0},{transform:'translateY(0)',opacity:1}],{duration:600,delay:130+i*55,easing:'cubic-bezier(.22,1,.36,1)'}));
 }
 reel?.sync();projects?.sync();loops?.sync();
});
export function closeStudioMenu(){
 if(!menu?.open)return;
 const epoch=++menuEpoch;
 const finish=()=>{if(epoch!==menuEpoch)return;menu.close();menuMotion?.cancel();menuMotion=null;};
 if(motionOff())finish();else animateMenu(false).then(finish);
}
menu?.querySelector('[data-menu-close]')?.addEventListener('click',closeStudioMenu);
menu?.addEventListener('cancel',e=>{e.preventDefault();closeStudioMenu();});
menu?.addEventListener('close',()=>{menuButton?.setAttribute('aria-expanded','false');reel?.sync();projects?.sync();loops?.sync();});
document.querySelector('#motion-toggle')?.addEventListener('click',toggleMotion);
reduce.addEventListener('change',syncMotion);
export function initStudio(main){
 disposePage();document.documentElement.classList.add('studio-ready');
 const abort=new AbortController(),{signal}=abort;let frame=0;
 reel=createReel(main,()=>motionOff()||menu?.open);
 loops=createMotionLoops(main,()=>motionOff()||menu?.open);
 main.querySelectorAll('[data-reel-toggle]').forEach(button=>button.addEventListener('click',toggleMotion,{signal}));
 projects=createProjects(main,()=>motionOff()||menu?.open);
 const reveal=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in-view');reveal.unobserve(e.target);}}),{threshold:.08});main.querySelectorAll('[data-reveal]').forEach(el=>reveal.observe(el));
 const features=[...main.querySelectorAll('.crew-feature')],agencyImages=[...main.querySelectorAll('[data-agency-frame]')],masthead=main.querySelector('.about-hero');
 updateScroll=()=>{
  frame=0;const still=motionOff(),height=innerHeight;
  features.forEach((el,i)=>{const r=el.getBoundingClientRect();if(r.top>height||r.bottom<0)return;const progress=Math.max(0,Math.min(1,(height-r.top)/(r.height+height)));el.querySelector('.feature-name').style.transform=still?'translateX(-20%)':`translateX(${-10-progress*30}%)`;});
  if(masthead&&agencyImages.length){const progress=Math.max(0,-masthead.getBoundingClientRect().top/Math.max(1,masthead.offsetHeight-height*.25)),index=still?0:Math.min(agencyImages.length-1,Math.floor(progress*agencyImages.length));agencyImages.forEach((img,i)=>img.hidden=i!==index);}
 };
 const requestScroll=()=>{if(!frame)frame=requestAnimationFrame(updateScroll);};addEventListener('scroll',requestScroll,{passive:true,signal});addEventListener('resize',requestScroll,{passive:true,signal});
 const preview=main.querySelector('.project-preview');
 if(preview)for(const item of main.querySelectorAll('.elastic-project')){
  const show=()=>{preview.querySelector('[data-preview-name]').textContent=item.dataset.work;preview.querySelector('[data-preview-line]').textContent=item.dataset.workLine;preview.querySelector('[data-preview-year]').textContent=item.dataset.workYear;preview.classList.add('is-visible');};const hide=()=>preview.classList.remove('is-visible');
  item.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse')show();},{signal});item.addEventListener('pointerleave',hide,{signal});item.addEventListener('focusin',show,{signal});item.addEventListener('focusout',hide,{signal});
 }
 main.querySelector('[data-cut-toggle]')?.addEventListener('click',e=>{const button=e.currentTarget,proof=button.closest('.cut-proof'),on=proof.classList.toggle('is-cut');button.setAttribute('aria-pressed',String(on));proof.querySelectorAll('.cut-extra').forEach(el=>el.setAttribute('aria-hidden',String(on)));button.textContent=on?'Vorher ansehen ↶':'CUT anwenden ↗';proof.querySelector('[data-cut-status]').textContent=on?'EINE MARKE. EINE BOTSCHAFT.':'BEISPIELENTWURF / VORHER';},{signal});
 syncMotion();disposePage=()=>{abort.abort();reveal.disconnect();cancelAnimationFrame(frame);reel?.destroy();projects?.destroy();loops?.destroy();reel=null;projects=null;loops=null;updateScroll=()=>{};};
}
syncMotion();
