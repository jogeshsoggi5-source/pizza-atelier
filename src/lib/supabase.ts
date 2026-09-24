import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

let supabase: any = null

if (supabaseUrl && supabaseAnonKey && supabaseUrl.includes('supabase.co')) {
  supabase = createClient(supabaseUrl, supabaseAnonKey)
}

export { supabase }
