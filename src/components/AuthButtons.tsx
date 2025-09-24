// src/components/AuthButtons.tsx
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';
import { useAuthStatus } from '@/hooks/useAuthStatus';

export const AuthButtons = () => {
//   const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

//   useEffect(() => {
//     const getSession = async () => {
//       const { data: { session } } = await supabase.auth.getSession();
//       setLoggedIn(!!session);
//     };

//     getSession();

//     // Subscribe to auth changes
//     const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
//       setLoggedIn(!!session);
//     });

//     return () => {
//       listener.subscription.unsubscribe();
//     };
//   }, []);
const loggedIn = useAuthStatus();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  if (!loggedIn) return null;

  return (
    <div className="fixed bottom-4 right-4">
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
};
