"use strict";
(function(){
const FRIENDS=["Sagnik","Aarav","Rahul","Vaibhav","Sachin"];
const MENTORS=["Rahul Mehta","Aarav Mehta","Karan Mehta","Bia Behera","Nabendu Mohanty","Riya Sharma","Pallavi Mohanty","Shreyans Mohanty"];
const QUESTS=[["Explore a new skill","Spend 10 minutes learning something new."],["Make a small plan","Write one achievable step toward your dream."],["Practice kindness","Encourage a friend or help someone today."]];
const K="unloxx-young-growth-demo-v1";
let data={dream:"",completed:[],friends:[],day:""};
try{const v=JSON.parse(localStorage.getItem(K)||"null");if(v&&typeof v==="object"){data={...data,...v,completed:Array.isArray(v.completed)?v.completed:[],friends:Array.isArray(v.friends)?v.friends:[]}}}catch{}
const today=()=>new Date().toLocaleDateString("en-CA");
if(data.day!==today()){data.day=today();data.completed=[]}
const persist=()=>{try{localStorage.setItem(K,JSON.stringify(data))}catch{}};
const el=(tag,cls,txt)=>{const x=document.createElement(tag);if(cls)x.className=cls;if(txt!==undefined)x.textContent=txt;return x};
const button=(label,fn)=>{const b=el("button","",label);b.type="button";b.addEventListener("click",fn);return b};
const panels=document.querySelector("#young .tabs");
const overview=document.getElementById("young-overview");
if(!panels||!overview)return;
const css=document.createElement("link");css.rel="stylesheet";css.href="./young-growth.css";document.head.appendChild(css);
const heading=overview.querySelector(".young-welcome h2");if(heading)heading.textContent="Welcome back, Ansh! What will you unlock today?";
const note=el("p","young-growth-note","Interactive demo · Ansh and all friends and mentors are sample profiles. Your entries stay in this browser.");overview.insertBefore(note,overview.children[1]||null);
const specs=[["young-circle","👥 My Circle"],["young-quests","⚡ Daily Quest"],["young-dreams","🎯 My Dreams"]];
specs.forEach(([id,label])=>{const b=el("button","",label);b.dataset.panel=id;panels.appendChild(b);const p=el("div","panel young-growth-panel");p.id=id;document.getElementById("young").appendChild(p)});
const overviewGrid=overview.querySelector(".grid");if(overviewGrid){specs.forEach(([id,label])=>{const c=el("div","card");c.append(el("div","icon",label.slice(0,2)),el("h3","",label.slice(3)));c.append(el("p","",id==="young-circle"?"Meet demo friends and explore connections.":id==="young-quests"?"Three small daily wins, at your pace.":"Describe your ambition and discover suggested demo mentors."));c.append(button("Explore →",()=>window.tab("young",id)));overviewGrid.append(c)})}
function title(p,t,desc){p.append(el("h2","",t),el("p","muted",desc))}
const circle=document.getElementById("young-circle");title(circle,"My Circle","Discover demo student profiles. Friend requests are simulated locally; nobody receives a request.");
const search=el("input","young-growth-input");search.type="search";search.placeholder="Find a friend by name";search.setAttribute("aria-label","Search demo friends");circle.append(search);
const friendList=el("div","young-growth-grid");circle.append(friendList);
function drawFriends(){friendList.replaceChildren();FRIENDS.filter(n=>n.toLowerCase().includes(search.value.trim().toLowerCase())).forEach((n,i)=>{const card=el("article","young-growth-card");const avatar=el("div","young-growth-avatar",n.charAt(0));const status=el("p","muted","Demo student profile");const active=data.friends.includes(n);const b=button(active?"✓ Request saved":"Add friend (demo)",()=>{data.friends=active?data.friends.filter(x=>x!==n):[...data.friends,n];persist();drawFriends()});card.append(avatar,el("h3","",n),status,b);friendList.append(card)});if(!friendList.children.length)friendList.append(el("p","muted","No matching demo friends."))}
search.addEventListener("input",drawFriends);drawFriends();
const quests=document.getElementById("young-quests");title(quests,"Daily Quest","Little steps count. No streak pressure, and your quests reset each day.");
const progress=el("p","young-growth-progress");quests.append(progress);const questList=el("div","young-growth-grid");quests.append(questList);
function drawQuests(){questList.replaceChildren();progress.textContent=data.completed.length+" of "+QUESTS.length+" completed today";QUESTS.forEach(([name,desc],i)=>{const card=el("article","young-growth-card");const done=data.completed.includes(i);card.append(el("h3","",name),el("p","muted",desc),button(done?"✓ Completed — undo":"Mark complete",()=>{data.completed=done?data.completed.filter(x=>x!==i):[...data.completed,i];persist();drawQuests()}));questList.append(card)})}drawQuests();
const dreams=document.getElementById("young-dreams");title(dreams,"My Dreams","Tell UNLOXX what you want to become. This prototype uses simple keyword matching, not live AI.");
const label=el("label","young-growth-label","What do you dream of becoming?");label.htmlFor="youngDreamInput";const input=el("textarea","young-growth-input");input.id="youngDreamInput";input.maxLength=800;input.rows=5;input.placeholder="I want to become a scientist because I love discovering how things work...";input.value=data.dream;dreams.append(label,input);
const results=el("div","young-growth-results");dreams.append(button("Save dream & find mentors",()=>{data.dream=input.value.trim();persist();drawDream()}),results);
const domains=[
{re:/code|program|software|app|website|tech|ai|robot|engineer|startup|founder|business/i,tag:"Technology and entrepreneurship",names:["Aarav Mehta","Karan Mehta","Nabendu Mohanty"]},
{re:/science|scientist|physics|chemistry|biology|research|doctor|medical|health/i,tag:"Science and research",names:["Riya Sharma","Rahul Mehta","Pallavi Mohanty"]},
{re:/art|draw|design|music|sing|dance|write|author|creative|film/i,tag:"Arts and creativity",names:["Bia Behera","Shreyans Mohanty","Pallavi Mohanty"]},
{re:/teach|education|school|mentor|help people|social|community|leader/i,tag:"Education and community",names:["Pallavi Mohanty","Nabendu Mohanty","Rahul Mehta"]},
{re:/sport|cricket|football|athlet|fitness|game/i,tag:"Sports and personal growth",names:["Shreyans Mohanty","Karan Mehta","Bia Behera"]}
];
function drawDream(){results.replaceChildren();if(!data.dream){results.append(el("p","muted","Write a dream above to see personalized demo suggestions."));return}const matches=domains.filter(d=>d.re.test(data.dream));const selected=matches.length?matches:[{tag:"Exploring your interests",names:[MENTORS[0],MENTORS[3],MENTORS[5]]}];results.append(el("h3","","Your possible direction: "+selected.map(x=>x.tag).join(" · ")),el("p","muted","Suggested demo mentors (not verified expertise or actual availability):"));const list=el("div","young-growth-grid");const names=[...new Set(selected.flatMap(x=>x.names))].slice(0,6);names.forEach(n=>{const c=el("article","young-growth-card");c.append(el("div","young-growth-avatar",n.charAt(0)),el("h3","",n),el("p","muted","Demo mentor · profile and expertise not yet verified"));list.append(c)});results.append(list,el("p","young-growth-note","These suggestions use keywords from your description. Real UNLOXX AI recommendations will require a secure backend, verified mentor specialties, and appropriate safeguards."))}
drawDream();persist();
})();