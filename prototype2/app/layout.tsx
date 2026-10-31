import type { ReactNode } from 'react';
export const metadata = { title: 'UNLOXX Prototype 2', description: 'Unlock what you can become' };
export default function RootLayout({ children }: { children: ReactNode }) { return <html lang="en"><body style={{ fontFamily: 'system-ui, sans-serif', margin: 0, background: '#faf9f4', color: '#1f3036' }}>{children}</body></html>; }
