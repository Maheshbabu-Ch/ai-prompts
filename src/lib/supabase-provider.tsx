import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { supabase } from './supabase'

export const SupabaseProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionContextProvider supabaseClient={supabase}>
      {children}
    </SessionContextProvider>
  )
}
