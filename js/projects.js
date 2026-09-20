// Open each project once; chapter tracking never moves the viewport or its links.
export function createProjects(main,isPaused){
 const abort=new AbortController(),{signal}=abort;
 const reduce=matchMedia('(prefers-reduced-motion: reduce)');
 const screens=[...main.querySelectorAll('[data-work-screen]')];
 let observer=null,frame=0,destroyed=false;
 const still=()=>reduce.matches||isPaused();
 const open=(screen,immediate=false)=>{
  screen.classList.add('is-open');
  // Removing the aperture also removes clipping immediately on keyboard focus.
  if(immediate)screen.classList.remove('js-work-motion');
  observer?.unobserve(screen);
 };
 if('IntersectionObserver' in window)observer=new IntersectionObserver(entries=>{
  for(const entry of entries)if(entry.isIntersecting)open(entry.target,still());
 },{threshold:0,rootMargin:'0px 0px -8% 0px'});
 screens.forEach(screen=>{
  if(still()||!observer||screen.contains(document.activeElement))open(screen,true);
  else{screen.classList.add('js-work-motion');observer.observe(screen);}
  screen.addEventListener('focusin',()=>open(screen,true),{signal});
 });

 const header=document.querySelector('header.nav');
 const groups=[...main.querySelectorAll('[data-chapter-nav]')].map(nav=>{
  const links=[...nav.querySelectorAll('[data-chapter-link]')];
  const chapters=links.flatMap(link=>{
   try{
    const url=new URL(link.href,location.href);
    if(url.origin!==location.origin||url.pathname!==location.pathname||url.search!==location.search||!url.hash)return [];
    const target=document.getElementById(decodeURIComponent(url.hash.slice(1)));
    return target&&main.contains(target)?[{link,target}]:[];
   }catch{return [];}
  });
  return {nav,links,chapters,active:null};
 });
 const activate=(group,chapter)=>{
  const active=chapter?.link||null;
  group.active=active;
  group.links.forEach(link=>{
   if(link===active){if(link.getAttribute('aria-current')!=='location')link.setAttribute('aria-current','location');}
   else link.removeAttribute('aria-current');
  });
 };
 const track=()=>{
  frame=0;
  if(destroyed)return;
  const headerBottom=Math.max(0,header?.getBoundingClientRect().bottom||0);
  const atEnd=scrollY>0&&scrollY+innerHeight>=document.documentElement.scrollHeight-2;
  for(const group of groups){
   const navStyle=getComputedStyle(group.nav),navRect=group.nav.getBoundingClientRect();
   const sticky=navStyle.position==='sticky'||navStyle.position==='fixed';
   const navTop=parseFloat(navStyle.top);
   const readingLine=sticky?Math.max(headerBottom,Number.isFinite(navTop)?navTop:headerBottom)+navRect.height+24:headerBottom+24;
   const visible=group.chapters.map(chapter=>({...chapter,rect:chapter.target.getBoundingClientRect()}))
    .filter(chapter=>chapter.rect.height>0).sort((a,b)=>a.rect.top-b.rect.top);
   let active=visible[0];
   for(const chapter of visible)if(chapter.rect.top<=readingLine)active=chapter;
   if(atEnd&&visible.length)active=visible[visible.length-1];
   activate(group,active);
  }
 };
 const schedule=()=>{if(!destroyed&&!frame&&groups.length)frame=requestAnimationFrame(track);};
 // Reflect a deep link immediately; geometry takes over after native/router scrolling.
 let initialId='';
 try{initialId=decodeURIComponent(location.hash.slice(1));}catch{}
 groups.forEach(group=>activate(group,group.chapters.find(chapter=>chapter.target.id===initialId)||group.chapters[0]));
 addEventListener('scroll',schedule,{passive:true,signal});
 addEventListener('resize',schedule,{passive:true,signal});
 addEventListener('hashchange',schedule,{signal});
 addEventListener('pageshow',schedule,{signal});
 main.addEventListener('load',schedule,{capture:true,signal});
 let resize=null;
 if(groups.length&&'ResizeObserver' in window){
  resize=new ResizeObserver(schedule);
  new Set([main,header,...groups.flatMap(group=>[group.nav,...group.chapters.map(chapter=>chapter.target)])]).forEach(element=>{if(element)resize.observe(element);});
 }
 document.fonts?.ready.then(schedule);
 const sync=()=>{if(still())screens.forEach(screen=>open(screen,true));schedule();};
 reduce.addEventListener('change',sync,{signal});
 sync();
 return {sync,destroy(){destroyed=true;abort.abort();observer?.disconnect();resize?.disconnect();cancelAnimationFrame(frame);}};
}
