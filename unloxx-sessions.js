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
  .unloxx-wow-prop{position:absolute;top:43%;left:0;font-size:clamp(2.8rem,7vw,5rem);filter:drop-shadow(0 6px 6px #0005)}
  .unloxx-wow-projectile{position:absolute;top:calc(43% + 21px);left:80px;width:30px;height:10px;border-radius:70% 45% 45% 70%;background:linear-gradient(90deg,#ffc33d,#fff3ac)}
  @media(prefers-reduced-motion:reduce){.unloxx-wow-word{animation:none!important}}
  `;
  document.head.appendChild(style);
  function celebrate() {
    const host = document.createElement("div");
    host.className = "unloxx-wow-layer";
    host.setAttribute("role", "status");
    host.setAttribute("aria-label", "WOW! Achievement complete");
    const word = document.createElement("div");
    word.className = "unloxx-wow-word";
    word.textContent = "WOW!";
    host.append(word);
    document.body.append(host);
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      word.style.left = "50%"; word.style.transform = "translate(-50%,-50%)";
      setTimeout(() => host.remove(), 1400); return;
    }
    const prop = document.createElement("div");
    prop.className = "unloxx-wow-prop";
    prop.innerHTML = '<svg width="132" height="88" viewBox="0 0 180 110" aria-hidden="true"><defs><linearGradient id="wowmetal" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#65717e"/><stop offset=".38" stop-color="#1c232d"/><stop offset="1" stop-color="#090c12"/></linearGradient></defs><path d="M9 24 H163 Q171 24 171 32 V48 H114 L102 62 H88 L75 102 H44 L55 56 H9 Z" fill="url(#wowmetal)" stroke="#050607" stroke-width="4" stroke-linejoin="round"/><path d="M55 56 H91 L82 72 H65 Z" fill="#3c424b" stroke="#111" stroke-width="4"/><path d="M12 29 H166" stroke="#89939d" stroke-width="3"/><path d="M45 100 L74 100" stroke="#555" stroke-width="4"/></svg>';
    prop.setAttribute("aria-hidden","true");
    const projectile = document.createElement("div");
    projectile.className = "unloxx-wow-projectile";
    host.append(prop, projectile);
    // A single continuous left-to-right journey: projectile morphs into WOW.
    const vw = document.documentElement.clientWidth;
    const start = 130, change = Math.max(150, vw * .43), finish = vw + 260;
    const duration = 2300;
    const options = {duration, easing:"linear", fill:"forwards"};
    prop.animate([
      {transform:"translate3d(-150px,0,0)",opacity:0,offset:0},
      {transform:"translate3d(0,0,0)",opacity:1,offset:.12},
      {transform:"translate3d(0,0,0)",opacity:1,offset:.27},
      {transform:"translate3d(-150px,0,0)",opacity:0,offset:.4}
    ],options);
    projectile.style.left = start + "px";
    projectile.animate([
      {transform:"translate3d(0,0,0)",opacity:0,offset:0},
      {transform:"translate3d(0,0,0)",opacity:0,offset:.25},
      {transform:"translate3d(0,0,0)",opacity:1,offset:.28},
      {transform:"translate3d(" + (change-start) + "px,0,0)",opacity:1,offset:.53},
      {transform:"translate3d(" + (change-start+22) + "px,0,0)",opacity:0,offset:.57},
      {transform:"translate3d(" + (change-start+22) + "px,0,0)",opacity:0,offset:1}
    ],options);
    word.style.left = "0px";
    word.style.top = "calc(43% + 21px)";
    word.style.transformOrigin = "center center";
    word.animate([
      {transform:"translate3d(" + change + "px,-50%,0) scale(.18)",opacity:0,offset:0},
      {transform:"translate3d(" + change + "px,-50%,0) scale(.18)",opacity:0,offset:.53},
      {transform:"translate3d(" + change + "px,-50%,0) scale(.75)",opacity:1,offset:.61},
      {transform:"translate3d(" + (vw*.76) + "px,-50%,0) scale(1)",opacity:1,offset:.8},
      {transform:"translate3d(" + finish + "px,-50%,0) scale(.85)",opacity:0,offset:1}
    ],options);
    setTimeout(() => host.remove(),duration+100);
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
