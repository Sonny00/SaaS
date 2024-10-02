'use client'; // <-- Ajoute cette ligne

import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import LoginPage from './auth/login';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  return (
    <div>
      {!isAuthenticated ? <LoginPage /> : <p>Redirection en cours...</p>}
    </div>
  );
}
