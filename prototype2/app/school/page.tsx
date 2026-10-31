import { requireRole } from '@/lib/auth';
export default async function SchoolPage(){ const {profile}=await requireRole('school'); return <main style={{padding:32}}><h1>School portal</h1><p>Welcome, {profile.display_name || 'member'}.</p><p>Protected placeholder — features are not implemented yet.</p></main>; }
