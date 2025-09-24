// src/hooks/useAuthStatus.ts
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setLoggedIn(!!session);
    };

    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setLoggedIn(!!session);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return loggedIn;
};
