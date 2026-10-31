/* UNLOXX Prototype 2 auth adapter. No secrets belong in this public file. */
const UNLOXX_AUTH={url:"",anonKey:""};
const role=document.body.dataset.role;
const status=document.getElementById("authStatus");
const loginForm=document.getElementById("loginForm");
const dashboard=document.getElementById("dashboard");
const loginPanel=document.getElementById("loginPanel");
let supabaseClient=null;
function say(message){if(status)status.textContent=message}
function configured(){return Boolean(UNLOXX_AUTH.url&&UNLOXX_AUTH.anonKey&&window.supabase)}
async function initAuth(){if(!configured()){say("Secure login is not connected yet. The portal preview below is sample content only.");document.getElementById("loginButton").disabled=true;return}supabaseClient=window.supabase.createClient(UNLOXX_AUTH.url,UNLOXX_AUTH.anonKey);await checkSession()}
async function checkSession(){const {data:{user},error}=await supabaseClient.auth.getUser();if(error||!user){loginPanel.classList.remove("hide");dashboard.classList.add("hide");say("Sign in using your approved account.");return}const {data:profile,error:profileError}=await supabaseClient.from("profiles").select("role,display_name").eq("id",user.id).single();if(profileError||!profile||profile.role!==role){await supabaseClient.auth.signOut();say("This account is not approved for the "+role+" portal.");return}loginPanel.classList.add("hide");dashboard.classList.remove("hide");document.getElementById("welcomeName").textContent=profile.display_name||"Member";say("Signed in securely.")}
loginForm?.addEventListener("submit",async e=>{e.preventDefault();if(!supabaseClient)return;say("Checking account…");const email=document.getElementById("email").value.trim();const password=document.getElementById("password").value;const {error}=await supabaseClient.auth.signInWithPassword({email,password});if(error){say("Sign in failed. Check your credentials or account approval.");return}await checkSession()});
async function logout(){if(supabaseClient)await supabaseClient.auth.signOut();dashboard.classList.add("hide");loginPanel.classList.remove("hide");say("Signed out.")}
initAuth();