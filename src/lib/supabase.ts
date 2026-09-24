import { createClient } from '@supabase/supabase-js'

// Use import.meta.env for client-side builds, fall back to undefined for server
const getSupabaseUrl = () => {
  if (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_URL) {
    return import.meta.env.VITE_SUPABASE_URL
  }
  return undefined
}

const getSupabaseAnonKey = () => {
  if (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_ANON_KEY) {
    return import.meta.env.VITE_SUPABASE_ANON_KEY
  }
  return undefined
}

const supabaseUrl = getSupabaseUrl()
const supabaseAnonKey = getSupabaseAnonKey()

let supabase: any = null

if (supabaseUrl && supabaseAnonKey && supabaseUrl.includes('supabase.co')) {
  try {
    supabase = createClient(supabaseUrl, supabaseAnonKey)
  } catch (error) {
    console.error('Failed to initialize Supabase:', error)
  }
}

export { supabase }
