import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const navigate = useNavigate()
  const { user, profile, signIn, signUp, signOut, isConfigured } = useAuth()

  const [mode, setMode] = useState('signin') // 'signin' | 'signup'
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  // Form states
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [nisn, setNisn] = useState('')
  const [grade, setGrade] = useState('XI')
  const [schoolName, setSchoolName] = useState('')

  // Handle Sign In
  const handleSignIn = async (e) => {
    e.preventDefault()
    setErrorMessage('')
    setSuccessMessage('')
    setLoading(true)

    try {
      const { data, error } = await signIn({ email, password })
      if (error) {
        setErrorMessage(
          error.message === 'Invalid login credentials'
            ? 'Email atau kata sandi tidak sesuai. Silakan periksa kembali.'
            : error.message
        )
      } else if (data?.user) {
        setSuccessMessage('Berhasil masuk! Mengarahkan ke halaman utama...')
        setTimeout(() => navigate('/'), 1000)
      }
    } catch (err) {
      setErrorMessage(err.message || 'Terjadi kesalahan sistem saat mencoba masuk.')
    } finally {
      setLoading(false)
    }
  }

  // Handle Sign Up
  const handleSignUp = async (e) => {
    e.preventDefault()
    setErrorMessage('')
    setSuccessMessage('')

    if (password !== confirmPassword) {
      setErrorMessage('Konfirmasi kata sandi tidak cocok.')
      return
    }

    if (password.length < 6) {
      setErrorMessage('Kata sandi minimal harus 6 karakter.')
      return
    }

    setLoading(true)
    try {
      const { data, error } = await signUp({
        email,
        password,
        fullName,
        nisn,
        schoolName,
        grade,
      })

      if (error) {
        setErrorMessage(error.message)
      } else {
        if (data?.session) {
          setSuccessMessage('Pendaftaran berhasil! Anda telah masuk.')
          setTimeout(() => navigate('/'), 1200)
        } else {
          setSuccessMessage(
            'Pendaftaran berhasil! Tautan verifikasi telah dikirimkan ke email Anda. Silakan cek kotak masuk atau folder spam email Anda.'
          )
        }
      }
    } catch (err) {
      setErrorMessage(err.message || 'Gagal mendaftarkan akun.')
    } finally {
      setLoading(false)
    }
  }

  // Jika pengguna sudah login
  if (user) {
    return (
      <div className="min-h-screen bg-[#fcfdfc] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-6 shadow-xl shadow-slate-200/50 rounded-2xl border border-slate-200 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-pine-800 mx-auto flex items-center justify-center">
              <span className="material-symbols-outlined" style={{ fontSize: '32px' }}>account_circle</span>
            </div>
            <div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-pine-800 border border-emerald-200/60 uppercase">
                Akun Terverifikasi
              </span>
              <h2 className="text-xl font-bold text-slate-900 mt-2">
                {profile?.full_name || user.email}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {profile?.nisn ? `NISN: ${profile.nisn} • ` : ''}Fase F Kelas {profile?.grade || 'XI'} SMA
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="w-full py-2.5 px-4 rounded-xl bg-pine-900 hover:bg-pine-950 text-white font-semibold text-sm shadow-md transition-all active:scale-[0.98]"
              >
                Lanjut Belajar di Beranda
              </button>
              <button
                type="button"
                onClick={signOut}
                className="w-full py-2.5 px-4 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-medium text-sm transition-all"
              >
                Keluar Akun
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#fcfdfc] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center justify-center gap-3 mb-6 group focus:outline-none" aria-label="Kembali ke Beranda">
          <div className="w-11 h-11 rounded-xl bg-pine-900 flex items-center justify-center text-white shadow-md shadow-pine-950/15 group-hover:scale-105 transition-transform duration-200">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 100-6 3 3 0 000 6z" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 4v4m3-2h-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="text-2xl font-bold tracking-tight text-slate-900">
            Bio <span className="text-pine-800">Smart</span>
          </span>
        </Link>

        <h1 className="text-center text-3xl font-extrabold text-slate-900 tracking-tight">
          {mode === 'signin' ? 'Masuk ke Portal Siswa' : 'Daftar Akun Siswa Baru'}
        </h1>
        <p className="mt-2 text-center text-sm text-slate-600">
          Platform Pembelajaran Biologi SMA Fase F • Kurikulum Merdeka
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-xl shadow-slate-200/50 rounded-2xl sm:px-10 border border-slate-200/80">
          
          {/* Supabase Not Configured Notice */}
          {!isConfigured && (
            <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-amber-950 text-sm">
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>info</span>
                Koneksi Supabase Belum Dikonfigurasi
              </div>
              <p className="leading-relaxed">
                Fitur autentikasi membutuhkan kredensial <code>VITE_SUPABASE_URL</code> dan <code>VITE_SUPABASE_ANON_KEY</code>.
              </p>
              <p className="text-[11px] text-amber-800">
                Atur file <code>.env</code> untuk pengembangan lokal atau atur di <strong>GitHub Repository Secrets</strong> untuk GitHub Pages.
              </p>
            </div>
          )}

          {/* Mode Switcher Tabs */}
          <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-xl mb-6 text-sm font-semibold text-slate-600">
            <button
              type="button"
              onClick={() => { setMode('signin'); setErrorMessage(''); setSuccessMessage('') }}
              className={`py-2 rounded-lg transition-all ${mode === 'signin' ? 'bg-white text-pine-900 shadow-xs' : 'hover:text-slate-900'}`}
            >
              Masuk
            </button>
            <button
              type="button"
              onClick={() => { setMode('signup'); setErrorMessage(''); setSuccessMessage('') }}
              className={`py-2 rounded-lg transition-all ${mode === 'signup' ? 'bg-white text-pine-900 shadow-xs' : 'hover:text-slate-900'}`}
            >
              Daftar Baru
            </button>
          </div>

          {/* Error & Success Alerts */}
          {errorMessage && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-800 text-xs font-medium flex items-start gap-2">
              <span className="material-symbols-outlined text-red-600" style={{ fontSize: '18px' }}>error</span>
              <span className="leading-relaxed">{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="mb-4 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-start gap-2">
              <span className="material-symbols-outlined text-emerald-600" style={{ fontSize: '18px' }}>check_circle</span>
              <span className="leading-relaxed">{successMessage}</span>
            </div>
          )}

          {/* SIGN IN FORM */}
          {mode === 'signin' ? (
            <form className="space-y-4" onSubmit={handleSignIn}>
              <div>
                <label htmlFor="email" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Alamat Email Siswa
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 focus:border-pine-800 rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-pine-800/15"
                  placeholder="siswa@sekolah.sch.id"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Kata Sandi
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 focus:border-pine-800 rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-pine-800/15"
                  placeholder="••••••••"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading || !isConfigured}
                  className="w-full py-3 px-4 rounded-xl bg-pine-900 hover:bg-pine-950 text-white font-semibold text-sm shadow-md shadow-pine-950/15 hover:shadow-lg transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Memproses Masuk...</span>
                    </>
                  ) : (
                    <span>Masuk ke Akun</span>
                  )}
                </button>
              </div>
            </form>
          ) : (
            /* SIGN UP FORM */
            <form className="space-y-4" onSubmit={handleSignUp}>
              <div>
                <label htmlFor="fullName" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Nama Lengkap Siswa
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 focus:border-pine-800 rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-pine-800/15"
                  placeholder="Ahmad Fauzan"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="nisn" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    NISN (10 Digit)
                  </label>
                  <input
                    id="nisn"
                    name="nisn"
                    type="text"
                    maxLength={10}
                    value={nisn}
                    onChange={(e) => setNisn(e.target.value.replace(/\D/g, ''))}
                    className="w-full px-3.5 py-2.5 bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 focus:border-pine-800 rounded-xl text-sm font-mono transition-all focus:outline-none focus:ring-2 focus:ring-pine-800/15"
                    placeholder="0061234567"
                  />
                </div>
                <div>
                  <label htmlFor="grade" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Kelas (Fase F)
                  </label>
                  <select
                    id="grade"
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 focus:border-pine-800 rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-pine-800/15"
                  >
                    <option value="XI">Kelas XI SMA</option>
                    <option value="XII">Kelas XII SMA</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="schoolName" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Nama Sekolah
                </label>
                <input
                  id="schoolName"
                  name="schoolName"
                  type="text"
                  value={schoolName}
                  onChange={(e) => setSchoolName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 focus:border-pine-800 rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-pine-800/15"
                  placeholder="SMA Negeri 1 Jakarta"
                />
              </div>

              <div>
                <label htmlFor="signupEmail" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Alamat Email
                </label>
                <input
                  id="signupEmail"
                  name="signupEmail"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 focus:border-pine-800 rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-pine-800/15"
                  placeholder="siswa@sekolah.sch.id"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="signupPassword" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Kata Sandi
                  </label>
                  <input
                    id="signupPassword"
                    name="signupPassword"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 focus:border-pine-800 rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-pine-800/15"
                    placeholder="Min 6 karakter"
                  />
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Konfirmasi
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 focus:border-pine-800 rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-pine-800/15"
                    placeholder="Ulangi sandi"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading || !isConfigured}
                  className="w-full py-3 px-4 rounded-xl bg-pine-900 hover:bg-pine-950 text-white font-semibold text-sm shadow-md shadow-pine-950/15 hover:shadow-lg transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Mendaftarkan Akun...</span>
                    </>
                  ) : (
                    <span>Daftar Akun Siswa</span>
                  )}
                </button>
              </div>
            </form>
          )}

          <div className="mt-6 pt-4 border-t border-slate-100 text-center">
            <Link to="/" className="text-xs font-semibold text-slate-500 hover:text-pine-800 transition">
              ← Kembali ke Beranda Bio Smart
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
