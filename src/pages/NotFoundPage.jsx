import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <main id="main-content" tabIndex={-1} className="page-load-error">
      <h1>Halaman tidak ditemukan.</h1>
      <p>Halaman yang Anda tuju tidak tersedia.</p>
      <Link to="/" style={{ color: 'var(--color-primary-container, #0d5c46)' }}>
        Kembali ke beranda
      </Link>
    </main>
  )
}
