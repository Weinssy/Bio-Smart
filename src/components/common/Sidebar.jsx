import { useState, useEffect, useRef, useSyncExternalStore } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

const mobileQuery = '(max-width: 768px)'
const subscribeMobile = listener => {
  const media = window.matchMedia(mobileQuery)
  media.addEventListener('change', listener)
  return () => media.removeEventListener('change', listener)
}
const getMobileSnapshot = () => window.matchMedia(mobileQuery).matches
const navItems = [
  { label: 'Beranda', path: '/', icon: 'home' },
  { label: 'Materi', path: '/materi', icon: 'menu_book' },
  { label: 'Laboratorium', path: '/laboratorium', icon: 'science' },
  { label: 'Anatomi 3D', path: '/anatomi', icon: 'view_in_ar' },
  { label: 'Kuis', path: '/kuis', icon: 'quiz' },
]

export default function Sidebar() {
  const { pathname } = useLocation()
  const canonicalPath = pathname.replace(/^\/katalog(?=\/|$)/, '/materi').replace(/^\/(lab|praktikum)$/, '/laboratorium').replace(/^\/anatomi-3d$/, '/anatomi')
  const [mobileOpen, setMobileOpen] = useState(false)
  const isMobile = useSyncExternalStore(subscribeMobile, getMobileSnapshot, () => false)
  const dialogRef = useRef(null)
  const menuButtonRef = useRef(null)

  useEffect(() => {
    if (!isMobile || !mobileOpen) return
    const dialog = dialogRef.current
    const returnFocusTarget = menuButtonRef.current
    const previousOverflow = document.body.style.overflow
    dialog.showModal()
    document.body.style.overflow = 'hidden'
    return () => { dialog.close(); document.body.style.overflow = previousOverflow; returnFocusTarget?.focus() }
  }, [isMobile, mobileOpen])

  const content = (
    <aside className={`app-sidebar ${isMobile ? 'open' : ''}`} aria-label="Navigasi aplikasi">
      <div className="sidebar-header">
        <div className="sidebar-brand-row">
          <NavLink to="/" onClick={() => setMobileOpen(false)} className="sidebar-logo-link" aria-label="Bio Smart, beranda">
            <div className="sidebar-logo"><div className="logo-icon-box"><span className="material-symbols-outlined" aria-hidden="true">biotech</span></div><div className="sidebar-logo-text"><div className="logo-brand">Bio Smart</div><div className="logo-sub">Ruang belajar biologi</div></div></div>
          </NavLink>
          {isMobile && <button type="button" className="sidebar-close-btn" onClick={() => setMobileOpen(false)} aria-label="Tutup menu"><span aria-hidden="true">×</span></button>}
        </div>
        <p className="sidebar-section-label">Menu belajar</p>
        <nav className="sidebar-nav" aria-label="Menu utama">
          {navItems.map(item => {
            const active = canonicalPath === item.path || (item.path !== '/' && canonicalPath.startsWith(`${item.path}/`))
            return <Link key={item.path} to={item.path} aria-current={active ? 'page' : undefined} onClick={() => setMobileOpen(false)} className={`nav-item ${active ? 'active' : ''}`}><span className="material-symbols-outlined" aria-hidden="true">{item.icon}</span><span>{item.label}</span></Link>
          })}
        </nav>
        <div className="sidebar-cta"><NavLink to="/laboratorium" onClick={() => setMobileOpen(false)} className="btn-practical"><span className="material-symbols-outlined" aria-hidden="true">science</span><span>Mulai praktikum</span></NavLink></div>
      </div>
      <div className="sidebar-study-note"><span>Belajar dengan mengamati.</span><p>Hubungkan materi dengan diagram dan percobaan virtual.</p></div>
    </aside>
  )

  return (
    <>
      {isMobile && <button ref={menuButtonRef} type="button" className="mobile-menu-toggle" onClick={() => setMobileOpen(true)} aria-label="Buka menu navigasi" aria-expanded={mobileOpen} aria-controls={mobileOpen ? 'mobile-learning-menu' : undefined}><span className="material-symbols-outlined" aria-hidden="true">menu</span></button>}
      {isMobile ? mobileOpen && <dialog id="mobile-learning-menu" ref={dialogRef} className="sidebar-dialog" aria-label="Menu belajar" onCancel={event => { event.preventDefault(); setMobileOpen(false) }} onClick={event => { if (event.target === event.currentTarget) setMobileOpen(false) }}>{content}</dialog> : content}
    </>
  )
}
