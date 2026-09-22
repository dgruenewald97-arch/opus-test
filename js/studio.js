import {createReel,createMotionLoops} from './reel.js?v=13';
import {createProjects} from './projects.js?v=13';
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
let menuClosing=null;
function stopMenuAnimations(){menu?.getAnimations({subtree:true}).forEach(a=>a.cancel());}
menuButton?.addEventListener('click',()=>{
 if(menu.open)return;
 stopMenuAnimations();menu.classList.remove('is-routing');menu.showModal();
 document.documentElement.classList.add('menu-is-open');menuButton.setAttribute('aria-expanded','true');
 if(!motionOff()){
  menu.animate([{clipPath:'inset(0 0 100% 0)'},{clipPath:'inset(0)'}],{duration:580,easing:'cubic-bezier(.22,1,.36,1)'});
  menu.querySelectorAll('.menu-primary>a>span').forEach((el,i)=>el.animate([{transform:'translateY(110%)',opacity:0},{transform:'translateY(0)',opacity:1}],{duration:620,delay:100+i*65,easing:'cubic-bezier(.22,1,.36,1)',fill:'backwards'}));
 }
 reel?.sync();projects?.sync();loops?.sync();
});
export function closeStudioMenu({immediate=false}={}){
 if(!menu?.open)return Promise.resolve();
 if(immediate||motionOff()){stopMenuAnimations();menu.close();return Promise.resolve();}
 if(menuClosing)return menuClosing;
 stopMenuAnimations();
 menuClosing=menu.animate([{clipPath:'inset(0)'},{clipPath:'inset(0 0 100% 0)'}],{duration:360,easing:'cubic-bezier(.65,0,.25,1)'}).finished.catch(()=>{}).then(()=>{if(menu.open)menu.close();menuClosing=null;});
 return menuClosing;
}
menu?.querySelector('[data-menu-close]')?.addEventListener('click',()=>closeStudioMenu());
menu?.addEventListener('cancel',e=>{e.preventDefault();closeStudioMenu();});
menu?.addEventListener('close',()=>{menuButton?.setAttribute('aria-expanded','false');document.documentElement.classList.remove('menu-is-open');menu.classList.remove('is-routing');reel?.sync();projects?.sync();loops?.sync();});
document.querySelector('#motion-toggle')?.addEventListener('click',toggleMotion);
reduce.addEventListener('change',syncMotion);
export function initStudio(main){
 disposePage();document.documentElement.classList.add('studio-ready');
 const abort=new AbortController(),{signal}=abort;let frame=0;
 reel=createReel(main,()=>motionOff()||menu?.open);
 loops=createMotionLoops(main,()=>motionOff()||menu?.open);
 main.querySelectorAll('[data-reel-toggle]').forEach(button=>button.addEventListener('click',toggleMotion,{signal}));
 projects=createProjects(main,()=>motionOff()||menu?.open);
 const enter=()=>{
  if(motionOff())return;
  main.querySelectorAll('[data-enter],.case-opening-title h1').forEach((el,i)=>{
   if(el.getBoundingClientRect().top>innerHeight)return;
   el.getAnimations().forEach(a=>a.cancel());
   el.animate([{opacity:0,transform:'translateY(36px)'},{opacity:1,transform:'translateY(0)'}],{duration:780,delay:Math.min(i,3)*65,easing:'cubic-bezier(.22,1,.36,1)',fill:'backwards'});
  });
 };
 document.addEventListener('grellwerk:page-ready',enter,{signal});
 if(!document.documentElement.classList.contains('route-is-loading'))requestAnimationFrame(()=>{if(main.isConnected)enter();});
 const handoffTabs=[...main.querySelectorAll('[data-handoff]')];
 function chooseStep(button){
  handoffTabs.forEach(tab=>{const active=tab===button;tab.setAttribute('aria-selected',String(active));tab.tabIndex=active?0:-1;});
  main.querySelectorAll('.handoff-panel').forEach(panel=>{panel.hidden=panel.id!==button.getAttribute('aria-controls');if(!panel.hidden&&!motionOff()){panel.getAnimations().forEach(a=>a.cancel());panel.animate([{opacity:0,transform:'translateY(14px)'},{opacity:1,transform:'translateY(0)'}],{duration:450,easing:'cubic-bezier(.22,1,.36,1)'});}});
  loops?.sync();
 }
 handoffTabs.forEach((button,i)=>{
  button.addEventListener('click',()=>chooseStep(button),{signal});
  button.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;e.preventDefault();const index=e.key==='Home'?0:e.key==='End'?handoffTabs.length-1:(i+(e.key==='ArrowRight'?1:-1)+handoffTabs.length)%handoffTabs.length;handoffTabs[index].focus();chooseStep(handoffTabs[index]);},{signal});
 });
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
