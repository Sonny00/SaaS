'use client'; 

import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import LoginPage from './auth/login';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import LoadingTransition from '@/components/loading';
import AuthGuard from '../app/AuthGuard'

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
      {!isAuthenticated ? <LoginPage /> :  <LoadingTransition />}
      </div>
     
  );
}
