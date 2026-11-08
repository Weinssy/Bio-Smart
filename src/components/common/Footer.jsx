import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="app-footer" data-purpose="site-footer">
      <div className="footer-inner">
        <p>Bio Smart · Ruang belajar biologi SMA · Materi, pengamatan, dan evaluasi mandiri.</p>
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
