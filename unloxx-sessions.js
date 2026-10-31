/* UNLOXX fictional session demo and celebratory WOW effect. No real calls or mentor contact. */
(() => {
  "use strict";
  let activeMentor = "Demo Mentor";
  const mentors = ["Dr. Asha Verma", "Arjun Mehta", "Mira Shah"];
  const style = document.createElement("style");
  style.textContent = `
  .unloxx-session-backdrop{position:fixed;inset:0;background:#08182cbb;z-index:10000;display:grid;place-items:center;padding:16px}
  .unloxx-session-modal{width:min(560px,100%);max-height:90dvh;overflow:auto;border-radius:22px;background:#fff;padding:22px;box-shadow:0 25px 90px #0006}
  .unloxx-session-screen{height:clamp(190px,34vh,300px);background:linear-gradient(145deg,#1b3457,#234f5a);border-radius:16px;display:grid;place-items:center;position:relative;color:#fff;text-align:center}
  .unloxx-session-avatar{width:112px;height:112px;border-radius:50%;background:#d8b7a0;position:relative;overflow:hidden;margin:auto auto 12px;box-shadow:0 0 0 7px #ffffff20}
  .unloxx-session-avatar:before{content:"";position:absolute;width:75px;height:85px;border-radius:45%;background:#302d37;top:-48px;left:18px}
  .unloxx-session-avatar:after{content:"";position:absolute;width:120px;height:65px;border-radius:50% 50% 0 0;background:#567c9c;top:83px;left:-4px}
  .unloxx-session-actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:15px}
  .unloxx-session-actions button{flex:1}
  .unloxx-wow-layer{position:fixed;inset:0;z-index:2147483647;pointer-events:none;overflow:hidden}
  .unloxx-wow-word{position:absolute;top:43%;left:50%;font:900 clamp(4rem,15vw,9rem)/1 system-ui,sans-serif;color:#ffcc43;-webkit-text-stroke:3px #173452;text-shadow:0 9px 0 #e58a32,0 16px 30px #0b253a70;white-space:nowrap}
  .unloxx-wow-prop{position:absolute;top:43%;left:0;font-size:clamp(2.8rem,7vw,5rem);filter:grayscale(1) brightness(.15)}
  .unloxx-wow-projectile{position:absolute;top:calc(43% + 21px);left:80px;width:30px;height:10px;border-radius:70% 45% 45% 70%;background:linear-gradient(90deg,#ffc33d,#fff3ac)}
  @media(prefers-reduced-motion:reduce){.unloxx-wow-word{animation:none!important}}
  `;
  document.head.appendChild(style);
  function celebrate() {
    const host = document.createElement("div");
    host.className = "unloxx-wow-layer";
    host.setAttribute("aria-label", "WOW! Achievement complete");
    host.setAttribute("role", "status");
    const word = document.createElement("div");
    word.className = "unloxx-wow-word";
    word.textContent = "WOW!";
    host.append(word);
    document.body.append(host);
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      word.style.transform = "translate(-50%,-50%)";
      setTimeout(() => host.remove(), 1300);
      return;
    }
    const prop = document.createElement("div");
    prop.className = "unloxx-wow-prop";
    prop.innerHTML = '<svg width="132" height="88" viewBox="0 0 180 110" aria-hidden="true"><path d="M9 24 H163 Q171 24 171 32 V48 H114 L102 62 H88 L75 102 H44 L55 56 H9 Z" fill="#15191f" stroke="#050607" stroke-width="5" stroke-linejoin="round"/><path d="M55 56 H91 L82 72 H65 Z" fill="#4a4d52" stroke="#111" stroke-width="4"/><path d="M12 29 H166" stroke="#697078" stroke-width="4"/><path d="M45 100 L74 100" stroke="#555" stroke-width="4"/></svg>';
    prop.setAttribute("aria-hidden","true");
    const projectile = document.createElement("div");
    projectile.className = "unloxx-wow-projectile";
    host.append(prop,projectile);
    prop.animate([{transform:"translateX(-100%)",opacity:0},{transform:"translateX(0)",opacity:1,offset:.25},{transform:"translateX(0)",opacity:1,offset:.65},{transform:"translateX(-110%)",opacity:0}],{duration:1300,fill:"forwards"});
    projectile.animate([{transform:"translateX(0)",opacity:0},{transform:"translateX(0)",opacity:1,offset:.22},{transform:"translateX(45vw)",opacity:1,offset:.7},{transform:"translateX(55vw) scale(2)",opacity:0}],{duration:1100,fill:"forwards"});
    word.animate([{transform:"translate(-50%,-50%) scale(.1)",opacity:0},{transform:"translate(-50%,-50%) scale(.1)",opacity:0,offset:.45},{transform:"translate(-50%,-50%) scale(1.3)",opacity:1,offset:.72},{transform:"translate(-50%,-50%) scale(1)",opacity:1,offset:.85},{transform:"translate(-50%,-50%) scale(1.05)",opacity:0}],{duration:2300,fill:"forwards"});
    setTimeout(()=>host.remove(),2450);
  }
  function openSession(name) {
    activeMentor = mentors.includes(name) ? name : "Demo Mentor";
    const backdrop = document.createElement("div");
    backdrop.className = "unloxx-session-backdrop";
    backdrop.innerHTML = '<section class="unloxx-session-modal" role="dialog" aria-modal="true" aria-labelledby="unloxx-session-title"><h2 id="unloxx-session-title">Mentor Session · Demo</h2><p>This is a fictional screen. No video call or real mentor connection is active.</p><div class="unloxx-session-screen"><div><div class="unloxx-session-avatar" aria-hidden="true"></div><strong id="unloxx-session-name"></strong><p>Sample mentor · simulated session</p></div></div><div class="unloxx-session-actions"><button type="button" data-close-session class="light">Close</button><button type="button" data-complete-session>Complete Session ✨</button></div></section>';
    backdrop.querySelector("#unloxx-session-name").textContent = activeMentor;
    backdrop.addEventListener("click", e => {if(e.target===backdrop||e.target.closest("[data-close-session]"))backdrop.remove();if(e.target.closest("[data-complete-session]")){backdrop.remove();celebrate()}});
    document.body.append(backdrop);
    backdrop.querySelector("[data-complete-session]").focus();
  }
  document.addEventListener("click", e => {
    const button = e.target instanceof Element && e.target.closest("[data-demo-session]");
    if (button) openSession(button.getAttribute("data-demo-session"));
  });
  window.unloxxCelebrate = celebrate;
})();
