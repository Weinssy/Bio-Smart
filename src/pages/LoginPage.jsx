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

  // Show/Hide password toggles for mobile accessibility
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

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
      const cleanEmail = email.trim()
      const { data, error } = await signIn({ email: cleanEmail, password })
      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          setErrorMessage('Email atau kata sandi tidak sesuai. Silakan periksa kembali.')
        } else if (error.message.includes('Email not confirmed')) {
          setErrorMessage('Email Anda belum dikonfirmasi. Silakan buka kotak masuk atau folder spam email Anda untuk mengklik tautan verifikasi.')
        } else {
          setErrorMessage(error.message || 'Gagal masuk. Periksa kembali koneksi internet dan akun Anda.')
        }
      } else if (data?.user) {
        setSuccessMessage('Berhasil masuk! Mengarahkan ke halaman utama...')
        setTimeout(() => navigate('/'), 900)
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
      setErrorMessage('Konfirmasi kata sandi tidak cocok. Pastikan kedua kolom kata sandi terisi sama persis.')
      return
    }

    if (password.length < 6) {
      setErrorMessage('Kata sandi minimal harus 6 karakter demi keamanan akun.')
      return
    }

    setLoading(true)
    try {
      const cleanEmail = email.trim()
      const { data, error } = await signUp({
        email: cleanEmail,
        password,
        fullName: fullName.trim(),
        nisn: nisn.trim(),
        schoolName: schoolName.trim(),
        grade,
      })

      if (error) {
        if (error.message.includes('User already registered')) {
          setErrorMessage('Alamat email ini sudah terdaftar. Silakan beralih ke tab "Masuk" di atas.')
        } else {
          setErrorMessage(error.message || 'Gagal mendaftarkan akun. Silakan periksa kembali data Anda.')
        }
      } else {
        if (data?.session) {
          setSuccessMessage('Pendaftaran berhasil! Anda telah otomatis masuk. Mengarahkan ke halaman utama...')
          setTimeout(() => navigate('/'), 1200)
        } else {
          setSuccessMessage(
            'Pendaftaran berhasil! Tautan konfirmasi telah dikirimkan ke email Anda. Silakan periksa kotak masuk atau spam email Anda untuk mengaktifkan akun.'
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
      <div className="min-h-[100dvh] bg-[#fcfdfc] flex flex-col justify-center py-6 sm:py-12 px-4 sm:px-6 lg:px-8 font-sans">
        <div className="w-full max-w-md mx-auto">
          <div className="bg-white p-6 sm:p-8 shadow-xl shadow-slate-200/50 rounded-2xl sm:rounded-3xl border border-slate-200 text-center space-y-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-emerald-50 text-pine-800 mx-auto flex items-center justify-center">
              <span className="material-symbols-outlined" style={{ fontSize: '32px' }}>account_circle</span>
            </div>
            <div>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-pine-800 border border-emerald-200/60 uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Akun Siswa Aktif
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-2 break-words">
                {profile?.full_name || user.email}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                {profile?.nisn ? `NISN: ${profile.nisn} • ` : ''}Fase F Kelas {profile?.grade || 'XI'} SMA
              </p>
              {profile?.school_name && (
                <p className="text-xs text-slate-400 mt-0.5">{profile.school_name}</p>
              )}
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-col gap-2.5">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="w-full min-h-[44px] py-3 px-4 rounded-xl bg-pine-900 hover:bg-pine-950 text-white font-semibold text-sm shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>home</span>
                <span>Lanjut Belajar di Beranda</span>
              </button>
              <button
                type="button"
                onClick={signOut}
                className="w-full min-h-[44px] py-3 px-4 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-medium text-sm transition-all active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>logout</span>
                <span>Keluar dari Akun</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[100dvh] bg-[#fcfdfc] flex flex-col justify-center py-6 sm:py-12 px-3.5 sm:px-6 lg:px-8 font-sans selection:bg-emerald-100 selection:text-pine-900">
      <div className="w-full max-w-md mx-auto">
        {/* Brand Header */}
        <Link 
          to="/" 
          className="flex items-center justify-center gap-2.5 mb-5 group focus:outline-none" 
          aria-label="Kembali ke Beranda Bio Smart"
        >
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-pine-900 flex items-center justify-center text-white shadow-md shadow-pine-950/15 group-hover:scale-105 transition-transform duration-200">
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 100-6 3 3 0 000 6z" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 4v4m3-2h-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-2xl font-bold tracking-tight text-slate-900">
              Bio <span className="text-pine-800">Smart</span>
            </span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-pine-800 border border-emerald-200/60 uppercase">
              SMA
            </span>
          </div>
        </Link>

        <h1 className="text-center text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {mode === 'signin' ? 'Masuk ke Portal Siswa' : 'Daftar Akun Siswa Baru'}
        </h1>
        <p className="mt-1 sm:mt-1.5 text-center text-xs sm:text-sm text-slate-500 max-w-xs mx-auto">
          Pembelajaran Biologi SMA Fase F • Kurikulum Merdeka
        </p>
      </div>

      <div className="mt-5 w-full max-w-md mx-auto">
        <div className="bg-white p-5 sm:p-8 shadow-xl shadow-slate-200/50 rounded-2xl sm:rounded-3xl border border-slate-200/80">
          
          {/* Supabase Not Configured Notice */}
          {!isConfigured && (
            <div className="mb-5 p-3.5 sm:p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-amber-950 text-xs sm:text-sm">
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>warning</span>
                Koneksi Supabase Belum Terhubung
              </div>
              <p className="leading-relaxed">
                Fitur autentikasi membutuhkan kredensial <code>VITE_SUPABASE_URL</code> dan <code>VITE_SUPABASE_ANON_KEY</code>.
              </p>
              <p className="text-[11px] text-amber-800 pt-0.5">
                Pastikan secret telah diatur di GitHub Repository Secrets lalu deploy ulang.
              </p>
            </div>
          )}

          {/* Mode Switcher Tabs - Minimum 44px touch height */}
          <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-xl mb-5 text-sm font-semibold text-slate-600">
            <button
              type="button"
              onClick={() => { setMode('signin'); setErrorMessage(''); setSuccessMessage('') }}
              className={`min-h-[44px] py-2.5 px-3 rounded-lg transition-all active:scale-[0.98] ${
                mode === 'signin' 
                  ? 'bg-white text-pine-900 shadow-sm font-bold' 
                  : 'hover:text-slate-900 text-slate-500'
              }`}
            >
              Masuk
            </button>
            <button
              type="button"
              onClick={() => { setMode('signup'); setErrorMessage(''); setSuccessMessage('') }}
              className={`min-h-[44px] py-2.5 px-3 rounded-lg transition-all active:scale-[0.98] ${
                mode === 'signup' 
                  ? 'bg-white text-pine-900 shadow-sm font-bold' 
                  : 'hover:text-slate-900 text-slate-500'
              }`}
            >
              Daftar Baru
            </button>
          </div>

          {/* Error & Success Alerts */}
          {errorMessage && (
            <div className="mb-4 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs font-medium flex items-start gap-2.5 animate-in fade-in">
              <span className="material-symbols-outlined text-red-600 shrink-0" style={{ fontSize: '18px' }}>error</span>
              <span className="leading-relaxed break-words">{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="mb-4 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-start gap-2.5 animate-in fade-in">
              <span className="material-symbols-outlined text-emerald-600 shrink-0" style={{ fontSize: '18px' }}>check_circle</span>
              <span className="leading-relaxed break-words">{successMessage}</span>
            </div>
          )}

          {/* ========================================================
              SIGN IN FORM
             ======================================================== */}
          {mode === 'signin' ? (
            <form className="space-y-4" onSubmit={handleSignIn} noValidate>
              <div>
                <label htmlFor="email" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Alamat Email Siswa
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>mail</span>
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    autoCapitalize="none"
                    autoCorrect="off"
                    spellCheck="false"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    /* text-base on mobile prevents iOS Safari auto-zoom! */
                    className="w-full pl-11 pr-3.5 py-3 bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 focus:border-pine-800 rounded-xl text-base sm:text-sm text-slate-900 transition-all focus:outline-none focus:ring-2 focus:ring-pine-800/15"
                    placeholder="siswa@sekolah.sch.id"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Kata Sandi
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>lock</span>
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    autoCapitalize="none"
                    autoCorrect="off"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-11 pr-11 py-3 bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 focus:border-pine-800 rounded-xl text-base sm:text-sm text-slate-900 transition-all focus:outline-none focus:ring-2 focus:ring-pine-800/15"
                    placeholder="••••••••"
                  />
                  {/* Toggle Show/Hide Password Touch Button */}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none min-h-[44px] min-w-[44px] justify-center"
                    aria-label={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading || !isConfigured}
                  className="w-full min-h-[48px] py-3.5 px-4 rounded-xl bg-pine-900 hover:bg-pine-950 text-white font-semibold text-sm sm:text-base shadow-md shadow-pine-950/15 hover:shadow-lg transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Memproses Masuk...</span>
                    </>
                  ) : (
                    <>
                      <span>Masuk ke Akun</span>
                      <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            /* ========================================================
               SIGN UP FORM (Mobile-First Stacked Layout)
               ======================================================== */
            <form className="space-y-4" onSubmit={handleSignUp} noValidate>
              <div>
                <label htmlFor="fullName" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Nama Lengkap Siswa
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>person</span>
                  </div>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-11 pr-3.5 py-3 bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 focus:border-pine-800 rounded-xl text-base sm:text-sm text-slate-900 transition-all focus:outline-none focus:ring-2 focus:ring-pine-800/15"
                    placeholder="Contoh: Ahmad Fauzan"
                  />
                </div>
              </div>

              {/* Grid stacks into 1 column on mobile, 2 columns on tablet/desktop */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label htmlFor="nisn" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    NISN (10 Digit Angka)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>badge</span>
                    </div>
                    <input
                      id="nisn"
                      name="nisn"
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={10}
                      value={nisn}
                      onChange={(e) => setNisn(e.target.value.replace(/\D/g, ''))}
                      className="w-full pl-11 pr-3.5 py-3 bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 focus:border-pine-800 rounded-xl text-base sm:text-sm font-mono text-slate-900 transition-all focus:outline-none focus:ring-2 focus:ring-pine-800/15"
                      placeholder="0061234567"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="grade" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Tingkat Kelas (Fase F)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>school</span>
                    </div>
                    <select
                      id="grade"
                      value={grade}
                      onChange={(e) => setGrade(e.target.value)}
                      className="w-full pl-11 pr-3.5 py-3 bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 focus:border-pine-800 rounded-xl text-base sm:text-sm text-slate-900 transition-all focus:outline-none focus:ring-2 focus:ring-pine-800/15"
                    >
                      <option value="XI">Kelas XI SMA (Fase F)</option>
                      <option value="XII">Kelas XII SMA (Fase F)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="schoolName" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Asal Sekolah
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>apartment</span>
                  </div>
                  <input
                    id="schoolName"
                    name="schoolName"
                    type="text"
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                    className="w-full pl-11 pr-3.5 py-3 bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 focus:border-pine-800 rounded-xl text-base sm:text-sm text-slate-900 transition-all focus:outline-none focus:ring-2 focus:ring-pine-800/15"
                    placeholder="SMA Negeri 1 Jakarta"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="signupEmail" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Alamat Email Siswa
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>mail</span>
                  </div>
                  <input
                    id="signupEmail"
                    name="signupEmail"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    autoCapitalize="none"
                    autoCorrect="off"
                    spellCheck="false"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-3.5 py-3 bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 focus:border-pine-800 rounded-xl text-base sm:text-sm text-slate-900 transition-all focus:outline-none focus:ring-2 focus:ring-pine-800/15"
                    placeholder="siswa@sekolah.sch.id"
                  />
                </div>
              </div>

              {/* Password & Confirm stack vertically on mobile to prevent cramped layout */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label htmlFor="signupPassword" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Kata Sandi
                  </label>
                  <div className="relative">
                    <input
                      id="signupPassword"
                      name="signupPassword"
                      type={showPassword ? 'text' : 'password'}
                      autoCapitalize="none"
                      autoCorrect="off"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-3.5 pr-11 py-3 bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 focus:border-pine-800 rounded-xl text-base sm:text-sm text-slate-900 transition-all focus:outline-none focus:ring-2 focus:ring-pine-800/15"
                      placeholder="Min 6 karakter"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none min-h-[44px] min-w-[44px] justify-center"
                      aria-label={showPassword ? 'Sembunyikan sandi' : 'Tampilkan sandi'}
                    >
                      <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                        {showPassword ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Konfirmasi Sandi
                  </label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      autoCapitalize="none"
                      autoCorrect="off"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full pl-3.5 pr-11 py-3 bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 focus:border-pine-800 rounded-xl text-base sm:text-sm text-slate-900 transition-all focus:outline-none focus:ring-2 focus:ring-pine-800/15"
                      placeholder="Ulangi kata sandi"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none min-h-[44px] min-w-[44px] justify-center"
                      aria-label={showConfirmPassword ? 'Sembunyikan konfirmasi' : 'Tampilkan konfirmasi'}
                    >
                      <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                        {showConfirmPassword ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading || !isConfigured}
                  className="w-full min-h-[48px] py-3.5 px-4 rounded-xl bg-pine-900 hover:bg-pine-950 text-white font-semibold text-sm sm:text-base shadow-md shadow-pine-950/15 hover:shadow-lg transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Mendaftarkan Akun...</span>
                    </>
                  ) : (
                    <>
                      <span>Daftar Akun Siswa Baru</span>
                      <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>how_to_reg</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          <div className="mt-5 pt-4 border-t border-slate-100 text-center">
            <Link 
              to="/" 
              className="inline-flex items-center gap-1.5 min-h-[44px] py-2 px-3 text-xs sm:text-sm font-semibold text-slate-500 hover:text-pine-800 transition active:scale-[0.98]"
            >
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_back</span>
              <span>Kembali ke Beranda Bio Smart</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
