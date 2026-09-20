export function initTeam(main){
 const buttons=[...main.querySelectorAll('[data-agent]')],panels=[...main.querySelectorAll('.agent-panel')],profiles=[...main.querySelectorAll('[data-agent-mobile]')],filters=[...main.querySelectorAll('[data-team-filter]')];
 if(!buttons.length)return;
 let selected='',group='all';
 function select(id,animate=true,remember=false){
  const button=buttons.find(b=>b.dataset.agent===id);if(!button)return;
  const changed=selected!==id;selected=id;
  buttons.forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
  panels.forEach(p=>{p.hidden=p.id!=='agent-'+id;if(!p.hidden&&changed&&animate&&!document.documentElement.classList.contains('no-motion')){const portrait=p.querySelector('.agent-portrait');portrait.getAnimations().forEach(a=>a.cancel());portrait.animate([{opacity:0,transform:'translateY(8px)'},{opacity:1,transform:'translateY(0)'}],{duration:240,easing:'cubic-bezier(.22,1,.36,1)'});}});
  profiles.forEach(p=>p.open=p.dataset.agentMobile===id);
  if(remember){const url=new URL(location.href);url.searchParams.set('agent',id);url.searchParams.set('team',group);history.replaceState(history.state,'',url.href);dispatchEvent(new Event('grellwerk:statechange'));}

 }
 buttons.forEach(button=>{
  // Selecting a profile is an intentional click/keyboard action, never incidental hover.

  button.addEventListener('click',()=>select(button.dataset.agent,true,true));
  button.addEventListener('keydown',e=>{
   if(!['ArrowUp','ArrowDown','Home','End'].includes(e.key))return;e.preventDefault();
   const visible=buttons.filter(b=>!b.hidden),i=visible.indexOf(button);
   const next=e.key==='Home'?0:e.key==='End'?visible.length-1:(i+(e.key==='ArrowDown'?1:-1)+visible.length)%visible.length;
   visible[next].focus();select(visible[next].dataset.agent,true,true);
  });
 });
 profiles.forEach(p=>p.addEventListener('toggle',()=>{if(p.open&&p.dataset.agentMobile!==selected)select(p.dataset.agentMobile,true,true);}));
 function filterGroup(value){
  group=filters.some(f=>f.dataset.teamFilter===value)?value:'all';
  filters.forEach(f=>f.setAttribute('aria-pressed',String(f.dataset.teamFilter===group)));
  for(const item of [...buttons,...profiles])item.hidden=group!=='all'&&item.dataset.department!==group;
 }
 filters.forEach(filter=>filter.addEventListener('click',()=>{
  filterGroup(filter.dataset.teamFilter);
  const next=buttons.find(b=>b.dataset.agent===selected&&!b.hidden)||buttons.find(b=>!b.hidden);
  select(next.dataset.agent,true,true);
 }));
 const params=new URL(location.href).searchParams;
 const requested=buttons.find(b=>b.dataset.agent===params.get('agent'));
 filterGroup(params.get('team')||(requested?requested.dataset.department:'all'));
 const initial=requested&&!requested.hidden?requested:buttons.find(b=>!b.hidden);
 select(initial.dataset.agent,false);

}
