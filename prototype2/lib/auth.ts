import { redirect } from 'next/navigation';
import { supabaseServer } from './supabase/server';
export type Role = 'young'|'mentor'|'school'|'admin';
export async function requireRole(role: Role) { const supabase=supabaseServer(); const {data:{user},error}=await supabase.auth.getUser(); if(error || !user) redirect('/login'); const {data:profile,error:profileError}=await supabase.from('profiles').select('role,display_name').eq('id',user.id).single(); if(profileError || !profile || profile.role!==role) redirect('/unauthorized'); return {user,profile}; }
