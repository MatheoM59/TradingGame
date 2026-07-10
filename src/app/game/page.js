'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Game() {
  const router = useRouter();
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      router.push('/');
    }
  }, [router]);
  return (
    <div>
      <h1>Hello world</h1>
    </div>
  );
}
