import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://nrhavdvfqscppyahvddq.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5yaGF2ZHZmcXNjcHB5YWh2ZGRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg1OTQ4NDQsImV4cCI6MjA3NDE3MDg0NH0.yOkRUxuPUuLxQGjJq3dZzFdfDnUTl6fiWWuoR-jRyGI'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
