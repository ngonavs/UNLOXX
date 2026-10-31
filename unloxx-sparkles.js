/* Small decorative star burst when switching between portal tabs. */
(()=>{"use strict";
const motion=window.matchMedia("(prefers-reduced-motion: reduce)");
const css=document.createElement("style");css.textContent=`
.unloxx-spark-layer{position:fixed;inset:0;pointer-events:none;overflow:hidden;z-index:9999;contain:strict}
.unloxx-spark{position:absolute;left:0;top:0;display:block;width:var(--spark-size);height:var(--spark-size);background:var(--spark-color);clip-path:polygon(50% 0%,60% 37%,100% 50%,60% 63%,50% 100%,40% 63%,0% 50%,40% 37%);transform:translate3d(var(--spark-x),var(--spark-y),0) scale(.5);opacity:0;animation:unloxx-spark-fly var(--spark-duration) cubic-bezier(.15,.7,.25,1) forwards;will-change:transform,opacity}
@keyframes unloxx-spark-fly{0%{opacity:0;transform:translate3d(var(--spark-x),var(--spark-y),0) scale(.25) rotate(0deg)}12%{opacity:1}65%{opacity:.9}100%{opacity:0;transform:translate3d(calc(var(--spark-x) + var(--spark-dx)),calc(var(--spark-y) + var(--spark-dy)),0) scale(.08) rotate(var(--spark-rot))}}
@media(prefers-reduced-motion:reduce){.unloxx-spark{animation:none!important;display:none!important}}
`;document.head.append(css);
let layer=null;function sparkle(target){if(motion.matches)return;const rect=target.getBoundingClientRect();if(!rect.width||!rect.height)return;
if(!layer){layer=document.createElement("div");layer.className="unloxx-spark-layer";layer.setAttribute("aria-hidden","true");document.body.append(layer)}
const x=rect.left+rect.width/2,y=rect.top+rect.height/2;
const count=12,colors=["#f1c86c","#ffecb4","#a8e8dc","#f7f9ff"];
for(let i=0;i<count;i++){const a=(Math.PI*2*i/count)+(Math.random()-.5)*.4;const dist=30+Math.random()*55;const star=document.createElement("i");star.className="unloxx-spark";star.style.setProperty("--spark-x",x+"px");star.style.setProperty("--spark-y",y+"px");star.style.setProperty("--spark-dx",Math.cos(a)*dist+"px");star.style.setProperty("--spark-dy",Math.sin(a)*dist+20+"px");star.style.setProperty("--spark-rot",(120+Math.random()*260)+"deg");star.style.setProperty("--spark-size",(4+Math.random()*7)+"px");star.style.setProperty("--spark-color",colors[i%colors.length]);star.style.setProperty("--spark-duration",(480+Math.random()*250)+"ms");layer.append(star);star.addEventListener("animationend",()=>star.remove(),{once:true});setTimeout(()=>star.remove(),900)}
}
document.addEventListener("click",event=>{const b=event.target.closest("button[data-panel],button[data-school-tab],.young-world-tabs button,.young-growth-tabs button,.tabs button,[role=tab]");if(!b||b.disabled)return;sparkle(b)},true);
})();