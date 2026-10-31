/* UNLOXX Young backend adapter: activate only after a dedicated project exists.
   No credentials or private tokens belong in this file. */
(function(){
"use strict";
const config=window.UNLOXX_BACKEND_CONFIG;
if(!config?.url||!config?.publishableKey)return;
if(!/^https:\/\/[a-z0-9-]+\.supabase\.co\/?$/.test(config.url))return;
const status=document.createElement("div");
status.className="young-growth-note";
status.textContent="UNLOXX backend configured. Sign-in and account verification are required before syncing private data.";
const young=document.getElementById("young");
if(young)young.prepend(status);
window.UNLOXX_YOUNG_BACKEND={url:config.url,configured:true};
/* Deliberately no automatic uploads of local demo data or minor information.
   Next integration: authenticated session + consent flow + Supabase RLS queries. */
})();
