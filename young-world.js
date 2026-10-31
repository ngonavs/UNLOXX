"use strict";(function(){
const root=document.getElementById("young"),tabs=root?.querySelector(".tabs");if(!root||!tabs)return;
const K="unloxx-young-world-v1",defaults={mood:"",reflection:"",steps:[],focus:false};let state={...defaults};try{const saved=JSON.parse(localStorage.getItem(K)||"null");if(saved&&typeof saved==="object")state={...state,...saved}}catch{}
const save=()=>{try{localStorage.setItem(K,JSON.stringify(state))}catch{}};
const el=(tag,cls,text)=>{const x=document.createElement(tag);if(cls)x.className=cls;if(text!==undefined)x.textContent=text;return x};
const btn=(text,action)=>{const x=el("button","",text);x.type="button";x.addEventListener("click",action);return x};
const link=document.createElement("link");link.rel="stylesheet";link.href="./young-world.css";document.head.append(link);
const panel=el("section","panel young-world");panel.id="young-sanctuary";root.append(panel);
const t=btn("✦ My Safe Space",()=>{if(typeof window.tab==="function")window.tab("young","young-sanctuary")});t.dataset.panel="young-sanctuary";tabs.append(t);
panel.append(el("p","young-eyebrow","YOUR PRIVATE CORNER"),el("h2","","Your world. Your pace."),el("p","young-intro","A quiet place to reflect, celebrate small wins, and plan your next adventure. Nothing you write here is shared with friends or mentors."));
const moodTitle=el("h3","","How are you feeling today?");panel.append(moodTitle);const moods=el("div","young-moods");panel.append(moods);
const feedback=el("p","young-mood-feedback");panel.append(feedback);
function drawMoods(){moods.replaceChildren();["Calm","Excited","Curious","Tired","Unsure"].forEach(m=>{const b=btn(m,()=>{state.mood=m;save();drawMoods()});b.setAttribute("aria-pressed",String(state.mood===m));moods.append(b)});feedback.textContent=state.mood?"Feeling "+state.mood.toLowerCase()+"? That's a valid place to start.":"Choose a feeling, or skip this entirely."}drawMoods();
panel.append(el("h3","","My private journal"));const journal=el("textarea","young-journal");journal.rows=5;journal.maxLength=1200;journal.placeholder="A thought, a hope, something you're proud of…";journal.value=typeof state.reflection==="string"?state.reflection:"";journal.setAttribute("aria-label","Private journal");panel.append(journal);
const saved=el("p","young-saved","Saved only on this device.");panel.append(btn("Save my thoughts",()=>{state.reflection=journal.value;save();saved.textContent="✓ Saved on this device. Others cannot see this through UNLOXX."}),saved);
panel.append(el("h3","","My next tiny step"),el("p","young-intro","Choose something small. No streaks or pressure."));
const ideas=["Read about a career I love","Practice a skill for 10 minutes","Write down one question","Take a screen break"];const steps=el("div","young-steps");panel.append(steps);
function drawSteps(){steps.replaceChildren();ideas.forEach((idea,i)=>{const checked=Array.isArray(state.steps)&&state.steps.includes(i);const b=btn((checked?"✓ ":"○ ")+idea,()=>{const a=Array.isArray(state.steps)?state.steps:[];state.steps=checked?a.filter(x=>x!==i):[...a,i];save();drawSteps()});b.setAttribute("aria-pressed",String(checked));steps.append(b)})}drawSteps();
const note=el("p","young-privacy","Your mood, journal, and steps stay in this browser. This is not an encrypted personal vault: anyone using this browser profile may access its local data. Avoid passwords or sensitive personal details.");panel.append(note);
const actions=el("div","young-actions");actions.append(btn("Clear my private space",()=>{if(!confirm("Clear your journal, mood, and steps from this browser?"))return;state={...defaults};journal.value="";save();drawMoods();drawSteps();saved.textContent="Your private space was cleared."}));panel.append(actions);
const overview=document.getElementById("young-overview");const grid=overview?.querySelector(".grid");if(grid){const card=el("div","card young-safe-card");card.append(el("div","icon","✦"),el("h3","","Your Safe Space"),el("p","","Journal privately, check in with yourself, and take one tiny step at a time."),btn("Enter your space →",()=>window.tab("young","young-sanctuary")));grid.prepend(card)}
})();