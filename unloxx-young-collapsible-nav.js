/* Young navigation: Home shortcut, collapsible on scroll, accessible restore handle. */
(()=>{'use strict';const root=document.getElementById('young');const bar=root?.querySelector('.tabs[data-role="young"]');if(!bar)return;
const header=document.getElementById('youngHead');const overview=document.getElementById('young-overview');if(!header||!overview)return;
// Hide older duplicate navigation entries while retaining their panels for compatibility.
const duplicates=[['young-focuslab','young-focus'],['young-create-lab','young-create']];
for(const [legacy,modern] of duplicates){if(document.getElementById(modern)){const old=bar.querySelector('button[data-panel="'+legacy+'"]');if(old)old.hidden=true}}
const focusButtons=Array.from(bar.querySelectorAll('button[data-panel]')).filter(b=>/focus studio/i.test(b.textContent||''));
focusButtons.forEach(b=>{if(b.dataset.panel!=='young-focus')b.hidden=true});
const createButtons=Array.from(bar.querySelectorAll('button[data-panel]')).filter(b=>/creation studio/i.test(b.textContent||''));
createButtons.forEach(b=>{if(b.dataset.panel!=='young-create')b.hidden=true});
const home=document.createElement('button');home.type='button';home.textContent='⌂ Home';home.dataset.panel='young-overview';home.className='unloxx-home-tab';bar.prepend(home);
const arrow=document.createElement('button');arrow.type='button';arrow.className='unloxx-nav-handle';arrow.textContent='❯';arrow.setAttribute('aria-label','Show Young navigation');arrow.setAttribute('aria-expanded','false');root.append(arrow);
// Navigation stays in the document flow: it scrolls away naturally, with no sticky jitter.
const visible=()=>!root.hidden&&getComputedStyle(root).display!=='none';
let raf=0;
function updateHandle(){raf=0;if(!visible()){arrow.hidden=true;return}const rect=bar.getBoundingClientRect();const passed=rect.bottom<0;arrow.hidden=!passed;arrow.setAttribute('aria-expanded',String(!passed));}
function scheduleHandle(){if(!raf)raf=requestAnimationFrame(updateHandle)}
arrow.addEventListener('click',()=>{bar.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});scheduleHandle()});
function activateHome(){const old=bar.querySelector('button[data-panel="young-overview"]:not(.unloxx-home-tab)');if(old)old.click();else{root.querySelectorAll('.panel').forEach(p=>p.classList.toggle('active',p===overview));}scheduleHandle();window.scrollTo({top:Math.max(0,root.getBoundingClientRect().top+window.scrollY-8),behavior:'smooth'})}
home.addEventListener('click',event=>{event.preventDefault();event.stopPropagation();activateHome()});
bar.addEventListener('click',event=>{const b=event.target.closest('button[data-panel]');if(!b||b===home)return;scheduleHandle();if(b.dataset.panel==='young-overview'){window.scrollTo({top:Math.max(0,root.getBoundingClientRect().top+window.scrollY-8),behavior:'smooth'});return}requestAnimationFrame(()=>{const y=bar.getBoundingClientRect().top+window.scrollY-8;window.scrollTo({top:y,behavior:'smooth'})})});
window.addEventListener('scroll',scheduleHandle,{passive:true});
window.addEventListener('resize',scheduleHandle,{passive:true});
window.addEventListener('hashchange',scheduleHandle);
scheduleHandle();
})();