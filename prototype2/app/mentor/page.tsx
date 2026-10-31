import { requireRole } from '@/lib/auth';
export default async function MentorPage(){ const {profile}=await requireRole('mentor'); return <main style={{padding:32}}><h1>Mentor portal</h1><p>Welcome, {profile.display_name || 'member'}.</p><p>Protected placeholder — features are not implemented yet.</p></main>; }
