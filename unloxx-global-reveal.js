/* UNLOXX motion system: progressive, accessible reveal across all portals. */
(()=>{'use strict';
const reduce=window.matchMedia('(prefers-reduced-motion: reduce)');
if(reduce.matches||!('IntersectionObserver'in window))return;
const portals=['home','young','mentors','schools'];
const selector='.card,.item,.dash,.f2-card,.f2-stat,.young-welcome,.young-world-card,.uh-portal,.uh-section,.hero-stats>div,.grid>.card,.panel.active>h2,.panel.active>.grid,.panel.active>.card,.panel.active>.item';
const seen=new WeakSet();
const io=new IntersectionObserver(entries=>{for(const entry of entries){if(!entry.isIntersecting)continue;const el=entry.target;el.classList.add('ux-revealed');io.unobserve(el)}},{threshold:0.06,rootMargin:'0px 0px 40px 0px'});
function visible(el){if(!el.isConnected)return false;const portal=el.closest('.view');if(!portal||portal.classList.contains('hide'))return false;const panel=el.closest('.panel');if(panel&&!panel.classList.contains('active'))return false;return !!el.getClientRects().length}
function scan(){for(const id of portals){const portal=document.getElementById(id);if(!portal||portal.classList.contains('hide'))continue;let n=0;for(const el of portal.querySelectorAll(selector)){if(seen.has(el)||!visible(el))continue;if(el.closest('.uh-reveal'))continue; // Homepage 3.0 already owns this reveal.
if(el.matches('.f2-card')&&el.closest('.f2-shield'))continue;
seen.add(el);el.classList.add('ux-reveal');el.style.setProperty('--ux-delay',Math.min(n++%4,3)*65+'ms');
io.observe(el);
}}}
let pending=false;function schedule(){if(pending)return;pending=true;requestAnimationFrame(()=>{pending=false;scan()})}
const root=document.querySelector('main');if(root){const mo=new MutationObserver(schedule);mo.observe(root,{childList:true,subtree:true,attributes:true,attributeFilter:['class']})}
document.addEventListener('click',schedule,true);window.addEventListener('hashchange',schedule);window.addEventListener('pageshow',schedule);reduce.addEventListener?.('change',()=>{if(reduce.matches){io.disconnect();document.querySelectorAll('.ux-reveal').forEach(el=>el.classList.add('ux-revealed'))}});
scan();
})();