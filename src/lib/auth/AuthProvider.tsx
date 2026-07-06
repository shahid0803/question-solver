'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useAuthStore } from '@/lib/auth/authStore';
import { getCurrentUser } from '@/services/auth/authService';
import { LoadingSpinner } from '@/components/animations';

const protectedRoutes = ['/dashboard', '/profile', '/settings', '/practice'];

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, setUser, setLoading } = useAuthStore();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    setLoading(true);

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          const appUser = await getCurrentUser(firebaseUser);
          setUser(appUser);
        } else {
          setUser(null);
          if (protectedRoutes.some((route) => pathname.startsWith(route))) {
            router.push('/login');
          }
        }
      } catch (error) {
        console.error('Auth error:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [isClient, router, pathname, setUser, setLoading]);

  if (!isClient) {
    return <LoadingSpinner />;
  }

  return <>{children}</>;
}
