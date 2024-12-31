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
    setIsMounted(true); // Assure que le composant est monté côté client
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/dashboard'); // Utilisation de replace pour éviter l'historique inutile
    }
  }, [isAuthenticated, router]);

  if (!isMounted) {
    return <LoadingTransition />; // Retourne un indicateur de chargement
  }

  // Si non authentifié, affiche la page de connexion
  return !isAuthenticated ? (
    <LoginPage />
  ) : (
    <LoadingTransition />
  );
}
