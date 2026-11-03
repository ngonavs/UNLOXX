/* UNLOXX Focus Studio: 20 openly licensed Wikimedia Commons ambience recordings.
 * Each file's Commons page is linked for author/license and reuse conditions.
 * Media remains hosted by Wikimedia Commons. */
(()=>{'use strict';
const root=document.querySelector('#young .f2-root');if(!root)return;
document.getElementById('unloxx-focus-sounds-original')?.remove();
document.querySelector('#young .f2-sounds')?.remove();
const col=root.querySelector('.f2-col:nth-child(2)');if(!col)return;
const tracks=[["rain","🌧️ Rain & thunder","Medium shower accompanied by thunders.ogg","Rain"],["soft-rain","🌦️ Night rain","2013-07-24 00-19-04hrs Chiang Mai Chang Khien rain animal sounds night time.ogg","Rain"],["wind","🍃 Wind after rain","Gentle wind after shower accompanied by thunders.ogg","Nature"],["waves","🌊 Ocean waves","Waves.ogg","Water"],["shore","🏖️ Pebble beach","On a pebble beach.ogg","Water"],["sea","🐚 Soft sea","Seasound.ogg","Water"],["brook","💧 Flowing brook","Brook.ogg","Water"],["creek","🏞️ Forest creek","Forest lawn creek.ogg","Water"],["fire","🔥 Campfire","Campfire sound ambience.ogg","Cozy"],["night","🌙 Country night","Country night noise.ogg","Night"],["crickets","🦗 Night crickets","Audio Hörbild Grillenzirpen - nachts um 3 im Föhrenwald Mödling.ogg","Night"],["cicadas","🌿 Summer cicadas","Calling of Cicads on Ko Tao, Thailand 1.ogg","Nature"],["jungle","🦜 Rainforest","Nature sounds ambience in a Dordogne pond.ogg","Nature"],["birds","🐦 Morning birds","Atmo – Vögel 1.mp3","Nature"],["woodland","🌲 Woodland birds","Atmo – Waldatmo Vögel.mp3","Nature"],["garden","🌼 Summer garden","Atmo – Vögel sommerlich.mp3","Nature"],["shoreline","🌅 Shoreline ambience","Atmo – Ufer Wellen.mp3","Water"],["greenhouse","🌱 Greenhouse","Atmo – Gewächshaus.mp3","Cozy"],["forest-walk","🥾 Forest walk","Walking through woods.ogg","Nature"],["snow","❄️ Snow steps","Walking through snow.mp3","Cozy"]];
const card=document.createElement('section');card.className='f2-card f2-sounds';
const h=document.createElement('h3');h.textContent='🎧 Soundscapes · 20 ambient sounds';
const intro=document.createElement('p');intro.className='f2-muted';intro.textContent='Build your atmosphere. Mix several sounds, adjust each volume, and open the source link for creator credits and licensing.';
const toolbar=document.createElement('div');toolbar.className='f2-sound-toolbar';
const search=document.createElement('input');search.type='search';search.placeholder='Search sounds…';search.setAttribute('aria-label','Search ambient sounds');
const stopAll=document.createElement('button');stopAll.type='button';stopAll.textContent='■ Stop all';
toolbar.append(search,stopAll);
const categories=document.createElement('div');categories.className='f2-sound-categories';
const grid=document.createElement('div');grid.className='f2-sound-grid';
card.append(h,intro,toolbar,categories,grid);col.insertBefore(card,col.firstChild);
const playing=new Map(),tiles=new Map(),prefs=(()=>{try{return JSON.parse(localStorage.getItem('unloxx-focus-mixer-v2')||'{}')}catch{return {}}})();
const persist=()=>{try{localStorage.setItem('unloxx-focus-mixer-v2',JSON.stringify(prefs))}catch{}};
let category='All';
function stop(id){const item=playing.get(id);if(!item)return;item.audio.pause();item.audio.removeAttribute('src');item.audio.load();playing.delete(id);item.button.textContent='▶ Play';item.button.classList.remove('f2-sound-active');item.button.setAttribute('aria-pressed','false')}
function halt(){for(const id of [...playing.keys()])stop(id)}
stopAll.onclick=halt;
async function start(id,file,button,volume){if(playing.has(id))return;button.disabled=true;button.textContent='Loading…';
const audio=new Audio('https://commons.wikimedia.org/wiki/Special:Redirect/file/'+encodeURIComponent(file));audio.loop=true;audio.preload='none';audio.volume=volume;
try{await audio.play();playing.set(id,{audio,button});button.textContent='■ Stop';button.classList.add('f2-sound-active');button.setAttribute('aria-pressed','true');audio.addEventListener('error',()=>{stop(id);button.textContent='↻ Retry';button.title='Recording unavailable; try another sound.'})}
catch(e){audio.pause();audio.removeAttribute('src');button.textContent='↻ Retry';button.title='Audio unavailable. Open Source to inspect the recording.';console.warn('UNLOXX sound could not play:',file,e)}
finally{button.disabled=false}}
for(const [id,label,file,group] of tracks){
const tile=document.createElement('div');tile.className='f2-sound-tile';tile.dataset.group=group;tile.dataset.label=label.toLowerCase();
const tag=document.createElement('small');tag.className='f2-sound-tag';tag.textContent=group;
const name=document.createElement('strong');name.textContent=label;
const b=document.createElement('button');b.type='button';b.textContent='▶ Play';b.setAttribute('aria-pressed','false');b.setAttribute('aria-label','Play '+label);
const slider=document.createElement('input');slider.type='range';slider.min='0';slider.max='1';slider.step='0.05';slider.value=String(prefs[id]??0.35);slider.setAttribute('aria-label',label+' volume');
slider.oninput=()=>{prefs[id]=Number(slider.value);persist();const item=playing.get(id);if(item)item.audio.volume=Number(slider.value)};
b.onclick=()=>playing.has(id)?stop(id):start(id,file,b,Number(slider.value));
const source=document.createElement('a');source.href='https://commons.wikimedia.org/wiki/File:'+encodeURIComponent(file).replace(/%20/g,'_');source.target='_blank';source.rel='noopener noreferrer';source.textContent='Source · credits & license';source.setAttribute('aria-label','Open source and license for '+label);
tile.append(tag,name,b,slider,source);grid.append(tile);tiles.set(id,tile)}
function filter(){for(const tile of tiles.values())tile.hidden=(category!=='All'&&tile.dataset.group!==category)||!tile.dataset.label.includes(search.value.trim().toLowerCase())}
search.addEventListener('input',filter);
for(const group of ['All',...new Set(tracks.map(x=>x[3]))]){const b=document.createElement('button');b.type='button';b.textContent=group;b.className=group==='All'?'active':'';b.onclick=()=>{category=group;for(const x of categories.children)x.classList.toggle('active',x===b);filter()};categories.append(b)}
const foot=document.createElement('p');foot.className='f2-muted';foot.textContent='Open-license recordings from Wikimedia Commons. Each recording has its own license and attribution requirements. Streaming needs an internet connection.';card.append(foot);
window.addEventListener('pagehide',halt);
})();