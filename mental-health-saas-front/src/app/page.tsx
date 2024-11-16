'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import LoginPage from './auth/login';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import LoadingTransition from '@/components/loading';

export default function Home() {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // Le composant est monté côté client
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  if (!isMounted) {
    return null; 
  }

  return (
    <div>
      {!isAuthenticated ? <LoginPage /> : <LoadingTransition />}
    </div>
  );
}
