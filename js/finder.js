// Local project guidance: explicit choices, existing work, no pretend AI chat.
export function initFinder(){
 const dialog=document.getElementById('project-finder');
 const choices=[...dialog.querySelectorAll('[data-finder-choice]')];
 const results=[...dialog.querySelectorAll('[data-finder-result]')];
 const status=dialog.querySelector('[data-finder-status]');
 let opener=null;
 function notify(){document.dispatchEvent(new Event('brummer:refresh'));}
 function close(){if(dialog.open)dialog.close();}
 document.addEventListener('click',e=>{
  const trigger=e.target.closest('[data-finder-open]');
  if(trigger){opener=trigger;dialog.showModal();choices[0].focus();notify();}
  if(e.target.closest('[data-finder-close]'))close();
  if(dialog.open&&e.target.closest('#project-finder a'))close();
 });
 dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)close();}});
 dialog.addEventListener('close',()=>{if(opener?.isConnected)opener.focus({preventScroll:true});notify();});
 choices.forEach(button=>button.addEventListener('click',()=>{
  choices.forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
  results.forEach(r=>r.hidden=r.dataset.finderResult!==button.dataset.finderChoice);
  dialog.querySelector('.finder-empty').hidden=true;
  const result=results.find(r=>!r.hidden);
  status.textContent='Vorschlag: '+result.querySelector('h3').textContent;
 }));
}
