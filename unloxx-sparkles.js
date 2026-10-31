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
    path.setAttribute("d", "M5 24 Q6 19 15 19 H89 Q95 19 95 27 V40 H70 L60 47 H42 L33 87 Q30 92 24 91 L14 87 L23 47 H8 Q5 47 5 43 Z");
    path.setAttribute("fill", "#111111");
    path.setAttribute("stroke", "#ffffff");
    path.setAttribute("stroke-width", "3");
    path.setAttribute("stroke-linejoin", "round");
    svg.appendChild(path);
    const detail = document.createElementNS("http://www.w3.org/2000/svg", "path");
    detail.setAttribute("d", "M8 22 H89 V28 H8 Z M26 49 H55 L45 61 H35 L28 81 H21 Z");
    detail.setAttribute("fill", "#727983");
    detail.setAttribute("stroke", "#0c1015");
    detail.setAttribute("stroke-width", "2");
    svg.appendChild(detail);
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
      const perimeter = 2 * (box.width + box.height);
      const p = (i + .5) * perimeter / count;
      const gap = 12;
      let x, y, nx, ny;
      if (p < box.width) { x = box.left + p; y = box.top - gap; nx = 0; ny = -1; }
      else if (p < box.width + box.height) { x = box.right + gap; y = box.top + p - box.width; nx = 1; ny = 0; }
      else if (p < 2 * box.width + box.height) { x = box.right - (p - box.width - box.height); y = box.bottom + gap; nx = 0; ny = 1; }
      else { x = box.left - gap; y = box.bottom - (p - 2 * box.width - box.height); nx = -1; ny = 0; }
      const travel = 90 + (i % 4) * 19;
      const size = 15 + (i % 3) * 3;
      const el = document.createElement("div");
      el.appendChild(kind === "mentor" ? pistolSvg(size) : starSvg(palette[i % palette.length], size));
      Object.assign(el.style, {
        position: "absolute", left: x + "px", top: y + "px",
        width: size + "px", height: size + "px",
        marginLeft: -size / 2 + "px", marginTop: -size / 2 + "px",
        pointerEvents: "none", filter: "drop-shadow(0 2px 3px #142d4666)"
      });
      host.appendChild(el);
      const dx = nx * travel + ny * ((i % 3) - 1) * 23, dy = ny * travel + nx * ((i % 3) - 1) * 23;
      const duration = 950 + Math.random() * 300;
      const anim = el.animate([
        {transform: "translate(0px, 0px) scale(1)", opacity: 0.95, offset: 0},
        {transform: "translate(" + dx * .35 + "px," + dy * .35 + "px) scale(1)", opacity: 1, offset: .35},
        {transform: "translate(" + dx + "px," + dy + "px) scale(.7)", opacity: 0, offset: 1}
      ], {duration, easing: "linear", fill: "forwards"});
      anim.onfinish = () => el.remove();
      setTimeout(() => el.remove(), 1500);
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
