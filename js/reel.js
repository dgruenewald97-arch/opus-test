// Actual footage in the background; two animated GIF cuts in the type.
// GIFs switch to still files on pause so reduced motion also stops raster animation.
export function createReel(main,isPaused){
 const video=main.querySelector('video[data-reel]');
 const loops=[...main.querySelectorAll('[data-monitor] img')];
 if(!video)return {sync(){},destroy(){}};
 let dead=false,inView=true;const abort=new AbortController(),{signal}=abort;
 function showLoop(){
  const stopped=dead||isPaused()||document.hidden||!inView;
  const active=video.currentTime>=5.5?1:0;
  loops.forEach((img,i)=>{
   img.hidden=i!==active;
   const src=!stopped&&i===active&&!img.dataset.failed?img.dataset.motionSrc:img.dataset.still;
   if(img.getAttribute('src')!==src)img.setAttribute('src',src);
  });
 }
 function sync(){
  showLoop();
  if(dead||isPaused()||document.hidden||!inView){video.pause();return;}
  video.play().then(()=>{if(dead||isPaused()||document.hidden||!inView)video.pause();}).catch(()=>{});
 }
 for(const img of loops)img.addEventListener('error',()=>{
  img.dataset.failed='true';
  if(img.getAttribute('src')!==img.dataset.still)img.src=img.dataset.still;
 },{signal});
 video.addEventListener('loadeddata',()=>{video.parentElement.classList.add('is-ready');sync();},{signal});
 video.addEventListener('error',()=>video.parentElement.classList.remove('is-ready'),{signal});
 video.addEventListener('playing',()=>video.parentElement.classList.add('is-ready'),{signal});
 video.addEventListener('timeupdate',showLoop,{signal});
 document.addEventListener('visibilitychange',sync,{signal});
 const observer=new IntersectionObserver(entries=>{inView=entries[0].isIntersecting;sync();},{threshold:0});
 observer.observe(video.parentElement);
 video.muted=true;video.load();sync();
 return {sync,destroy(){dead=true;video.pause();showLoop();observer.disconnect();abort.abort();}};
}

// Below-the-fold GIFs are requested only when their actual image enters view.
export function createMotionLoops(main,isPaused){
 const images=[...main.querySelectorAll('[data-motion-loop]')],visible=new Set();
 const abort=new AbortController(),{signal}=abort;let dead=false;
 function sync(){
  for(const img of images){
   const moving=!dead&&!isPaused()&&!document.hidden&&visible.has(img)&&!img.dataset.failed;
   const src=moving?img.dataset.motionSrc:img.dataset.still;
   if(img.getAttribute('src')!==src)img.setAttribute('src',src);
  }
 }
 const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>e.isIntersecting?visible.add(e.target):visible.delete(e.target));sync();
 },{threshold:.08});
 for(const img of images){
  img.addEventListener('error',()=>{img.dataset.failed='true';sync();},{signal});
  observer.observe(img);
 }
 document.addEventListener('visibilitychange',sync,{signal});
 return {sync,destroy(){dead=true;sync();observer.disconnect();abort.abort();}};
}
