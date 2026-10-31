/* UNLOXX fictional session demo and celebratory WOW effect. No real calls or mentor contact. */
(() => {
  "use strict";
  let activeMentor = "Demo Mentor";
  const praise = ["GOOD!", "EXCELLENT!", "WOW!", "YOU SLAYED!", "YOU NAILED IT!", "YOU CRUSHED IT!", "LEGENDARY!", "BRILLIANT!", "YOU ACED IT!", "ICONIC!"];
  let praiseIndex = 0;
  function nextPraise() {
    // Persist across page refreshes so the next achievement gets the next message.
    try {
      const stored = Number(sessionStorage.getItem("unloxxPraiseIndex"));
      if (Number.isInteger(stored) && stored >= 0) praiseIndex = stored % praise.length;
      const message = praise[praiseIndex];
      praiseIndex = (praiseIndex + 1) % praise.length;
      sessionStorage.setItem("unloxxPraiseIndex", String(praiseIndex));
      return message;
    } catch (_) {
      const message = praise[praiseIndex];
      praiseIndex = (praiseIndex + 1) % praise.length;
      return message;
    }
  }
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
  .unloxx-wow-word{position:absolute;top:43%;left:50%;font:900 clamp(2.4rem,9vw,7rem)/1 system-ui,sans-serif;letter-spacing:-.055em;will-change:transform,opacity;color:#ffcc43;-webkit-text-stroke:3px #173452;text-shadow:0 9px 0 #e58a32,0 16px 30px #0b253a70;white-space:nowrap}
  .unloxx-wow-prop{position:absolute;top:43%;left:0;font-size:clamp(2.8rem,7vw,5rem);filter:drop-shadow(0 6px 6px #0005)}
  .unloxx-wow-projectile{position:absolute;top:calc(43% + 21px);left:80px;width:30px;height:10px;border-radius:70% 45% 45% 70%;background:linear-gradient(90deg,#ffc33d,#fff3ac)}
  @media(prefers-reduced-motion:reduce){.unloxx-wow-word{animation:none!important}}
  `;
  document.head.appendChild(style);
  function celebrate() {
    const host = document.createElement("div");
    host.className = "unloxx-wow-layer";
    host.setAttribute("role", "status");
    host.setAttribute("aria-label", "Achievement complete");
    const word = document.createElement("div");
    word.className = "unloxx-wow-word";
    word.textContent = nextPraise();
    host.append(word);
    document.body.append(host);
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      word.style.left = "50%"; word.style.transform = "translate(-50%,-50%)";
      setTimeout(() => host.remove(), 1400); return;
    }
    const prop = document.createElement("div");
    prop.className = "unloxx-wow-prop";
    prop.innerHTML = '<svg width="154" height="100" viewBox="0 0 200 125" aria-hidden="true"><defs><linearGradient id="unloxx-metal-recoil" x1="0" y1="0" x2=".1" y2="1"><stop stop-color="#78828d"/><stop offset=".18" stop-color="#373f49"/><stop offset=".52" stop-color="#171b22"/><stop offset="1" stop-color="#080a0e"/></linearGradient><linearGradient id="unloxx-grip-recoil" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#484e56"/><stop offset="1" stop-color="#11151a"/></linearGradient></defs><path d="M12 28 Q13 21 23 21 H173 Q183 21 185 31 V46 L176 51 H128 L118 61 H104 L89 114 Q87 119 81 119 H47 Q42 119 45 111 L58 62 H19 Q12 62 12 54 Z" fill="url(#unloxx-metal-recoil)" stroke="#080b0f" stroke-width="4" stroke-linejoin="round"/><path d="M17 27 H177 V32 H17 Z" fill="#88939d" opacity=".65"/><path d="M17 43 H177" stroke="#080b0f" stroke-width="3"/><path d="M55 66 L88 66 L75 112 H48 Z" fill="url(#unloxx-grip-recoil)" stroke="#090c10" stroke-width="2"/><path d="M61 76 L78 76 M58 83 L76 83 M56 90 L74 90 M54 97 L72 97 M52 104 L70 104" stroke="#8b939d" stroke-width="1.5" opacity=".4"/><path d="M103 60 H128 L119 79 H105 Q99 73 103 60 Z" fill="#090b10"/><path d="M111 62 Q111 72 119 70" fill="none" stroke="#8a9199" stroke-width="3"/><path d="M158 35 V47 M166 35 V47 M174 35 V47" stroke="#a4adb6" stroke-width="2" opacity=".55"/><circle cx="31" cy="50" r="3" fill="#a0aab5"/><path d="M185 31 V46" stroke="#b6bec7" stroke-width="3"/></svg>';
    prop.setAttribute("aria-hidden","true");
    const projectile = document.createElement("div");
    projectile.className = "unloxx-wow-projectile";
    host.append(prop, projectile);
    // A single continuous left-to-right journey: projectile morphs into WOW.
    const vw = document.documentElement.clientWidth;
    const start = 130, change = Math.max(150, vw * .43), finish = vw + 260;
    const duration = 2300;
    const options = {duration, easing:"linear", fill:"forwards"};
    // Brief recoil: kick backward, return to the same resting position, then fade.
    prop.animate([
      {transform:"translate3d(-160px,0,0)",opacity:0,offset:0},
      {transform:"translate3d(0,0,0)",opacity:1,offset:.12},
      {transform:"translate3d(0,0,0)",opacity:1,offset:.275},
      {transform:"translate3d(-23px,4px,0) rotate(-5deg)",opacity:1,offset:.305},
      {transform:"translate3d(6px,-2px,0) rotate(1.5deg)",opacity:1,offset:.345},
      {transform:"translate3d(0,0,0) rotate(0deg)",opacity:1,offset:.395},
      {transform:"translate3d(0,0,0)",opacity:1,offset:.49},
      {transform:"translate3d(0,0,0)",opacity:0,offset:.59},
      {transform:"translate3d(0,0,0)",opacity:0,offset:1}
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
