import { Component } from 'react'

export default class PageErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="page-load-error" id="main-content" tabIndex={-1}>
          <p>Bio Smart</p>
          <h1>Halaman belum berhasil dimuat.</h1>
          <p>Periksa koneksi internet, lalu muat ulang halaman untuk mencoba kembali.</p>
          <button type="button" onClick={() => window.location.reload()}>Muat ulang halaman</button>
          <a href={import.meta.env.BASE_URL}>Kembali ke beranda</a>
        </main>
      )
    }
    return this.props.children
  }
}
