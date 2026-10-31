/* UNLOXX Young Lab: five self-contained, local-only prototype experiences. */
(() => {
"use strict";
const young = document.getElementById("young");
const tabs = young?.querySelector('.tabs[data-role="young"]');
if (!young || !tabs) return;
const key = "unloxx-young-lab-v1";
const defaults = {dream:"Scientist",completed:[],focusMinutes:0,creations:[],nickname:"Explorer",theme:"sage",birthday:"",festivals:false};
let data;
try { data = {...defaults,...JSON.parse(localStorage.getItem(key)||"{}")}; } catch { data={...defaults}; }
function save(){try{localStorage.setItem(key,JSON.stringify(data));}catch{}}
const el=(tag,cls,txt)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(txt!==undefined)n.textContent=txt;return n;};
const btn=(label,fn,cls="")=>{const b=el("button",cls,label);b.type="button";b.addEventListener("click",fn);return b;};
const section=(id,title,subtitle)=>{const p=el("div","panel unloxx-lab",undefined);p.id=id;const h=el("h2","",title),s=el("p","unloxx-lab-sub",subtitle);p.append(h,s);young.append(p);return p;};
const card=(parent,title,description)=>{const d=el("div","unloxx-lab-card");d.append(el("h3","",title),el("p","",description));parent.append(d);return d;};
const notice=(parent,msg)=>{const n=el("p","unloxx-lab-note",msg);parent.append(n);return n;};
const features=[
["young-skilltree","🧭 My Future","Pick a dream and unlock its skill roadmap."],
["young-focuslab","🌿 Focus Studio","A calm study timer and session tracker."],
["young-creations","🎨 Creation Studio","Build a private portfolio of your ideas."],
["young-workshops","📅 Workshops","Explore sample events and registration."],
["young-worldlab","✨ My World","Make your UNLOXX space your own."]
];
// Pricing preview only: no checkout, payment processing, or paid access verification.
const overview = document.getElementById("young-overview");
if (overview) {
  const pricing = el("div","unloxx-lab-card");
  pricing.append(el("h3","","UNLOXX Plans · Preview"));
  pricing.append(el("p","","Free for everyone: basic UNLOXX AI, nickname and birthday, My Future Skill Tree, Focus Studio, Creation Studio, Workshops and Events. UNLOXX Plus: $99 USD/month for extra personalization and an enhanced AI chatbot."));
  pricing.append(el("p","unloxx-lab-note","Pricing is a preview only. No payment is collected, no paid access is enforced, and the enhanced AI chatbot is not yet implemented."));
  overview.append(pricing);
}
features.forEach(([id,label])=>{const b=el("button","",label);b.type="button";b.dataset.panel=id;tabs.append(b);});
const roadmap={
Scientist:["Ask a research question","Plan a simple experiment","Record observations","Explain what you discovered"],
Entrepreneur:["Spot a real-world problem","Interview potential users","Sketch a solution","Create a mini pitch"],
Designer:["Find design inspiration","Draw three ideas","Make a prototype","Ask for feedback"],
Pilot:["Learn the basics of flight","Explore weather and navigation","Practice a flight checklist","Explain aviation safety"],
Developer:["Choose a small problem","Design the interface","Build a simple prototype","Test and improve it"]
};
const tree=section("young-skilltree","🧭 My Future · Skill Tree","A demo roadmap for exploring a career dream. Your progress stays in this browser.");
const treeBox=el("div","unloxx-lab-card");tree.append(treeBox);
function renderTree(){treeBox.replaceChildren(el("h3","","Choose your dream"));const select=el("select","unloxx-lab-input");Object.keys(roadmap).forEach(d=>{const o=el("option","",d);o.value=d;select.append(o)});select.value=roadmap[data.dream]?data.dream:"Scientist";select.addEventListener("change",()=>{data.dream=select.value;save();renderTree()});treeBox.append(select);const steps=el("div","unloxx-steps");roadmap[select.value].forEach((task,i)=>{const id=select.value+":"+i;const done=data.completed.includes(id);const row=el("div","unloxx-step");row.append(el("span","unloxx-step-icon",done?"✓":String(i+1)),el("span","",task));row.append(btn(done?"Completed":"Mark complete",()=>{data.completed=done?data.completed.filter(x=>x!==id):[...data.completed,id];save();renderTree();if(!done)window.unloxxCelebrate?.("save")},"unloxx-mini"));steps.append(row)});treeBox.append(steps);treeBox.append(el("p","unloxx-lab-note",data.completed.filter(x=>x.startsWith(select.value+":")).length+" of 4 milestones completed"))}renderTree();
const focus=section("young-focuslab","🌿 Focus Studio","A quiet space for short study sessions. Timer runs while this page remains open.");
const focusCard=card(focus,"Find your flow","Choose a session length, then press Start.");
const clock=el("div","unloxx-focus-clock","05:00");focusCard.append(clock);
const focusControls=el("div","unloxx-controls");focusCard.append(focusControls);
const minutesSelect=el("select","unloxx-lab-input");[5,10,15,25].forEach(m=>{const o=el("option","",m+" minutes");o.value=m;minutesSelect.append(o)});focusControls.append(minutesSelect);
let timer=null,deadline=0,remaining=300;
const fmt=n=>String(Math.floor(n/60)).padStart(2,"0")+":"+String(n%60).padStart(2,"0");
const stop=()=>{if(timer!==null)clearInterval(timer);timer=null;};
const reset=()=>{stop();remaining=Number(minutesSelect.value)*60;clock.textContent=fmt(remaining);startButton.textContent="Start session";};
const startButton=btn("Start session",()=>{if(timer!==null){remaining=Math.max(0,Math.ceil((deadline-Date.now())/1000));stop();startButton.textContent="Resume";return}deadline=Date.now()+remaining*1000;startButton.textContent="Pause";timer=setInterval(()=>{remaining=Math.max(0,Math.ceil((deadline-Date.now())/1000));clock.textContent=fmt(remaining);if(remaining===0){stop();data.focusMinutes+=Number(minutesSelect.value);save();startButton.textContent="Start session";focusTotal.textContent="Completed focus time: "+data.focusMinutes+" minutes";window.unloxxCelebrate?.();remaining=Number(minutesSelect.value)*60;}},250)});focusControls.append(startButton,btn("Reset",reset,"light"));minutesSelect.addEventListener("change",reset);
const focusTotal=notice(focusCard,"Completed focus time: "+data.focusMinutes+" minutes");
const creations=section("young-creations","🎨 My Creation Studio","Save project ideas in a private demo portfolio. Nothing is published or shared.");
const createCard=card(creations,"Add a creation","Give your idea a name and describe what you built or imagined.");
const nameInput=el("input","unloxx-lab-input");nameInput.placeholder="Project name";nameInput.maxLength=60;
const descriptionInput=el("textarea","unloxx-lab-input");descriptionInput.placeholder="Describe your creation...";descriptionInput.maxLength=500;descriptionInput.rows=3;
createCard.append(nameInput,descriptionInput);
const portfolio=el("div","unloxx-lab-grid");creations.append(portfolio);
function renderPortfolio(){portfolio.replaceChildren();if(!data.creations.length)notice(portfolio,"Your private portfolio is empty. Add your first creation!");data.creations.forEach((p,i)=>{const c=card(portfolio,p.name,p.description);c.append(btn("Remove",()=>{data.creations.splice(i,1);save();renderPortfolio()},"light unloxx-mini"))})}
createCard.append(btn("Save creation",()=>{const name=nameInput.value.trim(),description=descriptionInput.value.trim();if(!name||!description)return alert("Please enter a project name and description.");if(data.creations.length>=30)return alert("Demo limit: 30 creations.");data.creations.unshift({name,description});save();nameInput.value="";descriptionInput.value="";renderPortfolio();window.unloxxCelebrate?.("save")}));renderPortfolio();
const workshops=section("young-workshops","📅 Workshops & Events","Sample workshops only. No real registration or mentor connection is made.");
const events=[["Future Makers Lab","Online","Design a small invention with a fictional mentor."],["Creative Coding Jam","Online","Explore coding and share a practice project."],["Young Innovators Meetup","Jamshedpur · Demo venue","A sample in-person innovation gathering."]];
const eventGrid=el("div","unloxx-lab-grid");workshops.append(eventGrid);
events.forEach(([title,place,desc])=>{const c=card(eventGrid,title,desc);c.append(el("p","unloxx-lab-note",place+" · Demonstration only"),btn("View demo events",()=>{if(typeof window.tab==="function")window.tab("young","young-events");else young.querySelector('[data-panel="young-events"]')?.click()},"unloxx-mini"))});
notice(workshops,"Real events for minors will require verified organizers, moderation, and guardian or school consent.");
const world=section("young-worldlab","✨ My UNLOXX World","Personalize this demo on your device. Nothing is shared publicly.");
const worldCard=card(world,"Your space, your style","Pick a nickname and calm color theme.");
const nickname=el("input","unloxx-lab-input");nickname.placeholder="Your nickname";nickname.maxLength=32;nickname.value=data.nickname;
const theme=el("select","unloxx-lab-input");[["sage","Pale Sage"],["navy","Midnight Navy"],["sunset","Soft Sunset"]].forEach(([v,l])=>{const o=el("option","",l);o.value=v;theme.append(o)});theme.value=data.theme;
const birthday=el("input","unloxx-lab-input");birthday.type="date";birthday.value=data.birthday||"";
const birthdayLabel=el("label","","Birthday (optional)");birthdayLabel.append(birthday);
const festivalLabel=el("label","unloxx-check","Optional festival greetings");const festival=el("input");festival.type="checkbox";festival.checked=Boolean(data.festivals);festivalLabel.prepend(festival);
worldCard.append(nickname,theme,birthdayLabel,festivalLabel);
const worldPreview=el("div","unloxx-world-preview");worldCard.append(worldPreview);
function preview(){worldPreview.dataset.theme=theme.value;worldPreview.textContent="Welcome to your world, "+(nickname.value.trim()||"Explorer")+" ✨";}
nickname.addEventListener("input",preview);theme.addEventListener("change",preview);preview();
worldCard.append(btn("Save my world",()=>{data.nickname=nickname.value.trim().slice(0,32)||"Explorer";data.theme=theme.value;data.birthday=birthday.value;data.festivals=festival.checked;save();preview();window.unloxxCelebrate?.("save")}));
notice(world,"Your birthday and preferences are stored only in this browser for this prototype.");
})();