// Apertures reveal each project without moving the surrounding layout.
export function createProjects(main,isPaused){
 const screens=[...main.querySelectorAll('[data-work-screen]')];
 const abort=new AbortController(),{signal}=abort;
 const observer=new IntersectionObserver(entries=>{
  for(const e of entries)if(e.isIntersecting){e.target.classList.add('is-open');observer.unobserve(e.target);}
 },{threshold:.2});
 screens.forEach(screen=>{screen.classList.add('js-work-motion');observer.observe(screen);screen.addEventListener('focus',()=>screen.classList.add('is-open'),{signal});});
 return {sync(){if(isPaused())screens.forEach(s=>s.classList.add('is-open'));},destroy(){observer.disconnect();abort.abort();}};
}
