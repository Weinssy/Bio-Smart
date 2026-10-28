import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="app-footer" data-purpose="site-footer">
      <div className="footer-inner">
        <p>© 2024–2026 BioSMA Indonesia • Modul Biologi Digital Berstandar Kurikulum Merdeka Kemendikbudristek RI.</p>
        <div className="footer-links">
          <Link to="/materi">Katalog Modul</Link>
          <Link to="/laboratorium">Lab Virtual</Link>
          <Link to="/anatomi">Anatomi 3D</Link>
          <Link to="/kuis">Bank Kuis</Link>
        </div>
      </div>
    </footer>
  )
}
