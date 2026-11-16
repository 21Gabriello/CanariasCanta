import type { Metadata } from 'next';
import Songs from '@/components/Songs';

export const metadata: Metadata = { title: 'Canciones' };

export default function CancionesPage() {
  return <Songs />;
}
