/* UNLOXX visible star burst on navigation tab clicks */
(()=>{"use strict";
const reduced=window.matchMedia("(prefers-reduced-motion: reduce)");
const css=document.createElement("style");css.textContent=`
.unloxx-stars{position:fixed;inset:0;pointer-events:none;z-index:2147483647;overflow:hidden}
.unloxx-star{position:absolute;left:0;top:0;display:block;font-family:system-ui,sans-serif;font-weight:900;line-height:1;transform:translate3d(-50%,-50%,0);opacity:0;text-shadow:0 0 5px #f8d779aa;animation:unloxx-star-flight var(--dur) cubic-bezier(.15,.7,.28,1) both;will-change:transform,opacity}
@keyframes unloxx-star-flight{0%{opacity:0;transform:translate3d(var(--x),var(--y),0) scale(.25) rotate(0deg)}14%{opacity:1}40%{opacity:1}100%{opacity:0;transform:translate3d(calc(var(--x) + var(--dx)),calc(var(--y) + var(--dy)),0) scale(.45) rotate(var(--rot))}}
@media(prefers-reduced-motion:reduce){.unloxx-star{animation:none!important;display:none!important}}
`;document.head.appendChild(css);
let layer;
function burst(button){if(reduced.matches)return;const box=button.getBoundingClientRect();if(box.width<2||box.height<2)return;if(!layer){layer=document.createElement("div");layer.className="unloxx-stars";layer.setAttribute("aria-hidden","true");document.body.append(layer)}
const cx=box.left+box.width/2,cy=box.top+box.height/2;
const colors=["#ffce57","#f6b82b","#fff3bd","#61d9bd","#ffffff"];
for(let i=0;i<20;i++){const angle=(Math.PI*2*i/20)+(Math.random()-.5)*.3;const distance=44+Math.random()*65;const star=document.createElement("span");star.className="unloxx-star";star.textContent=i%3===0?"✦":"★";star.style.color=colors[i%colors.length];star.style.fontSize=(9+Math.random()*9)+"px";star.style.setProperty("--x",cx+"px");star.style.setProperty("--y",cy+"px");star.style.setProperty("--dx",Math.cos(angle)*distance+"px");star.style.setProperty("--dy",(Math.sin(angle)*distance+18)+"px");star.style.setProperty("--rot",(Math.random()*280-140)+"deg");star.style.setProperty("--dur",(750+Math.random()*250)+"ms");layer.append(star);star.addEventListener("animationend",()=>star.remove(),{once:true});setTimeout(()=>star.remove(),1250)}
}
document.addEventListener("click",event=>{const el=event.target instanceof Element?event.target:null;const button=el?.closest('button[data-panel],button[data-school-tab],.tabs button,.school-tabs button,[role="tab"],.young-growth-tabs button,.young-world-tabs button');if(button&&!button.disabled)burst(button)},true);
})();