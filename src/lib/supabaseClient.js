import { createClient } from '@supabase/supabase-js'
import { isPrivilegedSupabaseKey, isPublicSupabaseConfig } from './supabaseConfig'

const rawUrl = (import.meta.env.VITE_SUPABASE_URL || '').trim()
const rawAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim()

// Bersihkan trailing slash atau path /rest/v1 jika tidak sengaja tersalin dari dashboard
export const supabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/i, '').replace(/\/+$/, '')
export const supabaseAnonKey = rawAnonKey

export const isSupabaseConfigured = isPublicSupabaseConfig(supabaseUrl, supabaseAnonKey)

if (isPrivilegedSupabaseKey(supabaseAnonKey)) {
  console.error('[Bio Smart] Kunci server Supabase ditolak. Gunakan publishable key atau anon key di aplikasi browser.')
} else if (!isSupabaseConfigured) {
  console.warn(
    '[Bio-Smart] Supabase credentials belum dikonfigurasi. Pastikan VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY telah diatur di .env (lokal) atau GitHub Secrets (GitHub Pages).'
  )
}

// Inisialisasi client Supabase dengan auto session persistence di localStorage
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
      },
    })
  : null
