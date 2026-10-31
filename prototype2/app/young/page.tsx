import { requireRole } from '@/lib/auth';
export default async function YoungPage(){ const {profile}=await requireRole('young'); return <main style={{padding:32}}><h1>Young portal</h1><p>Welcome, {profile.display_name || 'member'}.</p><p>Protected placeholder — features are not implemented yet.</p></main>; }
