import { requireRole } from '@/lib/auth';
export default async function AdminPage(){ const {profile}=await requireRole('admin'); return <main style={{padding:32}}><h1>Admin portal</h1><p>Welcome, {profile.display_name || 'member'}.</p><p>Protected placeholder — features are not implemented yet.</p></main>; }
