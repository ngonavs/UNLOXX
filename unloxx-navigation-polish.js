/* UNLOXX Phase 1: accessible, resilient portal tab navigation. */
(() => {
  "use strict";
  const roles = ["young", "mentors", "schools"];
  for (const role of roles) {
    const root = document.getElementById(role);
    const bar = root?.querySelector('.tabs[data-role="' + role + '"]');
    if (!bar) continue;
    bar.setAttribute("role", "tablist");
    bar.setAttribute("aria-label", role === "young" ? "Young sections" : role === "mentors" ? "Mentor sections" : "School sections");
    const sync = () => {
      const buttons = Array.from(bar.querySelectorAll("button[data-panel]"));
      for (const button of buttons) {
        const id = button.dataset.panel;
        const panel = document.getElementById(id);
        if (!panel || !root.contains(panel)) continue;
        button.setAttribute("role", "tab");
        button.setAttribute("aria-controls", id);
        if (!button.id) button.id = "nav-" + id;
        panel.setAttribute("role", "tabpanel");
        panel.setAttribute("aria-labelledby", button.id);
        const active = panel.classList.contains("active");
        button.classList.toggle("active", active);
        button.setAttribute("aria-selected", String(active));
        button.tabIndex = active ? 0 : -1;
        panel.hidden = !active;
      }
    };
    sync();
    // Existing inline tab() changes classes; reflect that state without replacing it.
    const observer = new MutationObserver(records => {
      if (records.some(record => record.type === "childList" || record.attributeName === "class")) sync();
    });
    observer.observe(root, {subtree:true, childList:true, attributes:true, attributeFilter:["class"]});
    bar.addEventListener("keydown", event => {
      if (!["ArrowRight","ArrowLeft","Home","End"].includes(event.key)) return;
      const buttons = Array.from(bar.querySelectorAll('button[data-panel]')).filter(b => !b.disabled);
      const index = buttons.indexOf(document.activeElement);
      if (index < 0) return;
      event.preventDefault();
      let next = event.key === "Home" ? 0 : event.key === "End" ? buttons.length - 1 : (index + (event.key === "ArrowRight" ? 1 : -1) + buttons.length) % buttons.length;
      buttons[next].focus();
      buttons[next].click();
      buttons[next].scrollIntoView({block:"nearest",inline:"nearest",behavior:"auto"});
    });
    bar.addEventListener("click", event => {
      const button = event.target.closest("button[data-panel]");
      if (!button) return;
      requestAnimationFrame(() => {
        sync();
        button.scrollIntoView({block:"nearest",inline:"nearest",behavior:"auto"});
      });
    });
  }
})();
