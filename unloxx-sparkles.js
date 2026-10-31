/* UNLOXX starburst v3: SVG shapes + Web Animations, no font glyph scaling. */
(() => {
  "use strict";
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  const selector = 'button[data-panel],button[data-school-tab],.tabs button,.school-tabs button,[role="tab"],.young-growth-tabs button,.young-world-tabs button';
  let overlay;
  const palette = ["#ffb900", "#ffd54e", "#fff2b5", "#22bba4", "#efacff"];
  function layer() {
    if (overlay && overlay.isConnected) return overlay;
    overlay = document.createElement("div");
    overlay.id = "unloxx-starburst-overlay-v3";
    overlay.setAttribute("aria-hidden", "true");
    Object.assign(overlay.style, {
      position: "fixed", inset: "0", width: "100vw", height: "100dvh",
      pointerEvents: "none", overflow: "visible", zIndex: "2147483647",
      contain: "layout style"
    });
    document.body.appendChild(overlay);
    return overlay;
  }
  function starSvg(color, size) {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 100 100");
    svg.setAttribute("width", String(size));
    svg.setAttribute("height", String(size));
    svg.setAttribute("aria-hidden", "true");
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M50 2 L62 35 L96 50 L62 63 L50 98 L38 63 L4 50 L38 35 Z");
    path.setAttribute("fill", color);
    path.setAttribute("stroke", "#ffffff");
    path.setAttribute("stroke-width", "3");
    svg.appendChild(path);
    return svg;
  }
  function pistolSvg(size) {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 100 100");
    svg.setAttribute("width", String(size));
    svg.setAttribute("height", String(size));
    svg.setAttribute("aria-hidden", "true");
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M7 28 H91 Q95 28 95 33 V46 H63 L55 54 H46 L38 87 H21 L30 51 H7 Z M54 51 H67 L60 64 H51 Z");
    path.setAttribute("fill", "#111111");
    path.setAttribute("stroke", "#ffffff");
    path.setAttribute("stroke-width", "3");
    path.setAttribute("stroke-linejoin", "round");
    svg.appendChild(path);
    return svg;
  }
  function burst(button, kind) {
    if (reduce.matches) return;
    const box = button.getBoundingClientRect();
    if (!box.width || !box.height) return;
    const host = layer();
    // Each star begins just outside a different edge of the button.
    const count = 13;
    for (let i = 0; i < count; i++) {
      const edge = i % 4;
      const margin = 6;
      const along = (Math.floor(i / 4) + 1) / ((edge === 0 ? 4 : 3) + 1);
      const x = edge === 0 ? box.left + along * box.width : edge === 1 ? box.right + margin : edge === 2 ? box.left + along * box.width : box.left - margin;
      const y = edge === 0 ? box.top - margin : edge === 1 ? box.top + along * box.height : edge === 2 ? box.bottom + margin : box.top + along * box.height;
      const angle = edge === 0 ? -Math.PI / 2 : edge === 1 ? 0 : edge === 2 ? Math.PI / 2 : Math.PI;
      const drift = angle + (Math.random() - 0.5) * 0.65;
      const travel = 30 + Math.random() * 34;
      const size = 15 + Math.random() * 9;
      const el = document.createElement("div");
      el.appendChild(kind === "mentor" ? pistolSvg(size) : starSvg(palette[i % palette.length], size));
      Object.assign(el.style, {
        position: "absolute", left: x + "px", top: y + "px",
        width: size + "px", height: size + "px",
        marginLeft: -size / 2 + "px", marginTop: -size / 2 + "px",
        pointerEvents: "none", filter: "drop-shadow(0 2px 3px #142d4666)"
      });
      host.appendChild(el);
      const dx = Math.cos(drift) * travel, dy = Math.sin(drift) * travel;
      const duration = 650 + Math.random() * 220;
      const anim = el.animate([
        {transform: "translate(0px, 0px) scale(.8) rotate(0deg)", opacity: 0.95, offset: 0},
        {transform: "translate(" + dx * .35 + "px," + dy * .35 + "px) scale(1.2) rotate(35deg)", opacity: 1, offset: .35},
        {transform: "translate(" + dx + "px," + dy + "px) scale(.65) rotate(115deg)", opacity: 0, offset: 1}
      ], {duration, easing: "cubic-bezier(.16,.72,.3,1)", fill: "forwards"});
      anim.onfinish = () => el.remove();
      setTimeout(() => el.remove(), 1100);
    }
  }
  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const button = target.closest(selector);
    if (!button || button.disabled) return;
    const portal = button.closest("#young, #mentors");
    if (portal?.id === "young") burst(button, "young");
    else if (portal?.id === "mentors") burst(button, "mentor");
  }, true);
})();
