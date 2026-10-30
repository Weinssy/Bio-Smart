import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient'

const AuthContext = createContext({
  user: null,
  profile: null,
  session: null,
  loading: true,
  isConfigured: false,
  signIn: async () => ({ error: new Error('Supabase belum dikonfigurasi') }),
  signUp: async () => ({ error: new Error('Supabase belum dikonfigurasi') }),
  signOut: async () => {},
  refreshProfile: async () => {},
})

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [session, setSession] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  // Fetch profil pengguna dari tabel public.profiles
  const fetchProfile = useCallback(async (userId) => {
    if (!supabase || !userId) {
      setProfile(null)
      return
    }
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle()

      if (!error && data) {
        setProfile(data)
      } else {
        setProfile(null)
      }
    } catch (err) {
      console.warn('[Bio-Smart] Gagal memuat data profil:', err)
      setProfile(null)
    }
  }, [])

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      setLoading(false)
      return
    }

    // 1. Dapatkan sesi aktif saat ini
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      if (session?.user) {
        fetchProfile(session.user.id)
      }
      setLoading(false)
    }).catch(() => {
      setLoading(false)
    })

    // 2. Berlangganan perubahan status otentikasi (login, logout, token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        setSession(newSession)
        setUser(newSession?.user ?? null)
        if (newSession?.user) {
          fetchProfile(newSession.user.id)
        } else {
          setProfile(null)
        }
        setLoading(false)
      }
    )

    return () => {
      subscription?.unsubscribe()
    }
  }, [fetchProfile])

  // Masuk dengan email & password
  const signIn = async ({ email, password }) => {
    if (!isSupabaseConfigured || !supabase) {
      return { error: { message: 'Kredensial Supabase belum diatur. Silakan atur VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY terlebih dahulu.' } }
    }
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (!error && data?.user) {
      await fetchProfile(data.user.id)
    }
    return { data, error }
  }

  // Daftar akun baru siswa/guru
  const signUp = async ({ email, password, fullName, nisn, schoolName = '', grade = 'XI' }) => {
    if (!isSupabaseConfigured || !supabase) {
      return { error: { message: 'Kredensial Supabase belum diatur. Silakan atur VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY terlebih dahulu.' } }
    }

    const redirectUrl = typeof window !== 'undefined' 
      ? `${window.location.origin}${window.location.pathname}#/login`
      : undefined

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          full_name: fullName,
          nisn,
          school_name: schoolName,
          grade,
          role: 'siswa',
        },
      },
    })

    return { data, error }
  }

  // Keluar dari akun
  const signOut = async () => {
    if (supabase) {
      await supabase.auth.signOut()
    }
    setUser(null)
    setSession(null)
    setProfile(null)
  }

  const value = {
    user,
    profile,
    session,
    loading,
    isConfigured: isSupabaseConfigured,
    signIn,
    signUp,
    signOut,
    refreshProfile: () => (user ? fetchProfile(user.id) : Promise.resolve()),
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
