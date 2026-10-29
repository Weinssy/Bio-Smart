import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import CommandPalette from './CommandPalette'

export default function Header() {
  const [isPaletteOpen, setIsPaletteOpen] = useState(false)
  const { user, profile } = useAuth()

  // Listen for Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setIsPaletteOpen(true)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <>
      <header className="top-header">
        <div className="header-inner">
          <div className="search-section">
            <button 
              type="button"
              className="search-bar" 
              onClick={() => setIsPaletteOpen(true)}
              style={{ 
                cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', 
                justifyContent: 'space-between', width: '100%', maxWidth: '440px',
                backgroundColor: 'var(--color-surface-container-lowest)',
                border: '1px solid rgba(203, 213, 225, 0.7)',
                borderRadius: 'var(--radius-lg, 0.75rem)',
                padding: '0.55rem 0.85rem 0.55rem 2.5rem',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: 'var(--shadow-level-1)'
              }}
              aria-label="Cari materi biologi (Ctrl K)"
            >
              <div style={{ display: 'flex', alignItems: 'center', color: 'var(--color-on-surface-variant)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                <span className="material-symbols-outlined search-icon" style={{ left: '0.75rem', fontSize: '1.25rem' }}>search</span>
                <span style={{ fontSize: '0.875rem' }}>Cari materi biologi, sel, DNA...</span>
              </div>
              <span className="search-shortcut-badge" style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--color-outline)', border: '1px solid var(--color-outline-variant, #cbd5e1)', borderRadius: '4px', padding: '2px 5px', background: '#fff' }}>Ctrl K</span>
            </button>
          </div>

          <div className="header-actions" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span 
              className="header-badge" 
              style={{ 
                fontSize: '0.75rem', 
                fontWeight: 600, 
                color: 'var(--color-primary-container, #0d5c46)', 
                background: 'var(--color-secondary-container, #e6f7ef)',
                padding: '0.3rem 0.65rem',
                borderRadius: '9999px',
                border: '1px solid rgba(13, 92, 70, 0.15)'
              }}
            >
              Kurikulum Merdeka • Fase F
            </span>

            <Link 
              to="/laboratorium" 
              className="header-quick-lab"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontSize: '0.8rem',
                fontWeight: 600,
                color: '#fff',
                backgroundColor: 'var(--color-primary, #004331)',
                padding: '0.45rem 0.85rem',
                borderRadius: '0.5rem',
                textDecoration: 'none',
                boxShadow: '0 1px 3px rgba(0, 67, 49, 0.2)',
                transition: 'all 0.18s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '1.1rem' }}>science</span>
              <span className="quick-lab-text">Lab Virtual</span>
            </Link>

            {/* User Profile / Login Link */}
            <Link 
              to="/login"
              className="header-user-btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.8rem',
                fontWeight: 600,
                color: user ? 'var(--color-primary, #004331)' : 'var(--color-on-surface-variant)',
                backgroundColor: user ? 'var(--color-secondary-container, #e6f7ef)' : 'var(--color-surface-container-high)',
                padding: '0.45rem 0.75rem',
                borderRadius: '0.5rem',
                textDecoration: 'none',
                border: '1px solid rgba(13, 92, 70, 0.1)',
                transition: 'all 0.18s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              title={user ? `Akun: ${profile?.full_name || user.email}` : 'Masuk ke Portal Siswa'}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '1.1rem' }}>
                {user ? 'account_circle' : 'login'}
              </span>
              <span className="header-user-name">
                {user ? (profile?.full_name?.split(' ')[0] || 'Akun') : 'Masuk'}
              </span>
            </Link>
          </div>
        </div>
      </header>

      <CommandPalette isOpen={isPaletteOpen} onClose={() => setIsPaletteOpen(false)} />
    </>
  )
}
