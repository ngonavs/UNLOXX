/* Young navigation: Home shortcut, collapsible on scroll, accessible restore handle. */
(()=>{'use strict';const root=document.getElementById('young');const bar=root?.querySelector('.tabs[data-role="young"]');if(!bar)return;
const header=document.getElementById('youngHead');const overview=document.getElementById('young-overview');if(!header||!overview)return;
const home=document.createElement('button');home.type='button';home.textContent='⌂ Home';home.dataset.panel='young-overview';home.className='unloxx-home-tab';bar.prepend(home);
const arrow=document.createElement('button');arrow.type='button';arrow.className='unloxx-nav-handle';arrow.textContent='❯';arrow.setAttribute('aria-label','Show Young navigation');arrow.setAttribute('aria-expanded','false');root.append(arrow);
let collapsed=false,lastY=window.scrollY,manual=false;
const visible=()=>!root.hidden&&getComputedStyle(root).display!=='none';
function setCollapsed(value){collapsed=value;bar.classList.toggle('unloxx-tabs-collapsed',value);arrow.classList.toggle('unloxx-nav-handle-visible',value);arrow.setAttribute('aria-expanded',String(!value));arrow.textContent=value?'❮':'❯'}
arrow.addEventListener('click',()=>{manual=true;setCollapsed(false);bar.scrollIntoView({behavior:'smooth',block:'start'});setTimeout(()=>manual=false,700)});
function activateHome(){const old=bar.querySelector('button[data-panel="young-overview"]:not(.unloxx-home-tab)');if(old)old.click();else{root.querySelectorAll('.panel').forEach(p=>p.classList.toggle('active',p===overview));}setCollapsed(false);window.scrollTo({top:Math.max(0,root.getBoundingClientRect().top+window.scrollY-8),behavior:'smooth'})}
home.addEventListener('click',event=>{event.preventDefault();event.stopPropagation();activateHome()});
bar.addEventListener('click',event=>{const b=event.target.closest('button[data-panel]');if(!b||b===home)return;setCollapsed(false);if(b.dataset.panel==='young-overview'){window.scrollTo({top:Math.max(0,root.getBoundingClientRect().top+window.scrollY-8),behavior:'smooth'});return}requestAnimationFrame(()=>{const y=bar.getBoundingClientRect().top+window.scrollY-8;window.scrollTo({top:y,behavior:'smooth'})})});
window.addEventListener('scroll',()=>{if(!visible())return;const y=window.scrollY,delta=y-lastY;lastY=y;if(manual||Math.abs(delta)<8)return;const beyond=y>root.getBoundingClientRect().top+window.scrollY+100;if(delta>0&&beyond)setCollapsed(true);else if(delta<0&&y<root.getBoundingClientRect().top+window.scrollY+80)setCollapsed(false)},{passive:true});
})();