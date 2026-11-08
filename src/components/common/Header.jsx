import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import CommandPalette from './CommandPalette'

export default function Header() {
  const [isPaletteOpen, setIsPaletteOpen] = useState(false)
  const searchButtonRef = useRef(null)
  const { pathname } = useLocation()
  const section = pathname.startsWith('/materi') || pathname.startsWith('/katalog') ? 'Materi' : pathname === '/kuis' ? 'Kuis' : ['/anatomi', '/anatomi-3d'].includes(pathname) ? 'Anatomi 3D' : ['/laboratorium', '/lab', '/praktikum'].includes(pathname) ? 'Laboratorium' : 'Beranda'

  useEffect(() => {
    document.title = `${section} · Bio Smart`
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, section])

  useEffect(() => {
    function handleKeyDown(event) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setIsPaletteOpen(open => !open)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <>
      <header className="top-header">
        <div className="learning-header">
          <p className="learning-breadcrumb"><Link to="/">Bio Smart</Link><span aria-hidden="true">/</span><span>{section}</span></p>
          <button ref={searchButtonRef} type="button" className="learning-search-trigger" onClick={() => setIsPaletteOpen(true)} aria-label="Cari materi biologi (Ctrl K)">
            <span className="material-symbols-outlined" aria-hidden="true">search</span><span className="learning-search-label">Cari materi biologi...</span><kbd>Ctrl K</kbd>
          </button>
        </div>
      </header>
      {isPaletteOpen && <CommandPalette returnFocusRef={searchButtonRef} onClose={() => setIsPaletteOpen(false)} />}
    </>
  )
}
