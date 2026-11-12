import { useState, useSyncExternalStore } from 'react'
import { Link } from 'react-router-dom'
import Sidebar from '../components/common/Sidebar'
import Header from '../components/common/Header'

const subscribeConnection = listener => {
  window.addEventListener('online', listener)
  window.addEventListener('offline', listener)
  return () => {
    window.removeEventListener('online', listener)
    window.removeEventListener('offline', listener)
  }
}
const getConnectionSnapshot = () => navigator.onLine

export default function AnatomyPage() {
  const online = useSyncExternalStore(subscribeConnection, getConnectionSnapshot, () => true)
  const [viewerVersion, setViewerVersion] = useState(0)
  const [retryMessage, setRetryMessage] = useState('')

  function retryViewer() {
    setRetryMessage(navigator.onLine ? '' : 'Koneksi belum tersedia. Sambungkan perangkat ke internet lalu coba lagi.')
    setViewerVersion(version => version + 1)
  }

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="main-wrapper" style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />

        <main className="dashboard-main" id="main-content" tabIndex={-1} style={{ flex: 1, padding: 0, display: 'flex', flexDirection: 'column' }}>
          <h1 className="sr-only">Atlas Anatomi 3D</h1>
          <div className="atlas-connection-note">
            <p>Atlas 3D memerlukan koneksi internet. Materi dan kuis dapat dibuka offline setelah aplikasi selesai menyimpan cache.</p>
            {online && <button type="button" onClick={retryViewer}>Muat ulang atlas</button>}
          </div>
          <p className="sr-only" role="status">{online ? '' : retryMessage}</p>
          <section style={{ flex: 1, width: '100%', position: 'relative', overflow: 'hidden' }}>
            {online ? <iframe
              key={viewerVersion}
              width="1200"
              height="800"
              src={`${import.meta.env.BASE_URL}human-atlas/index.html`}
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
                backgroundColor: '#ffffff'
              }}
              title="Human Atlas 3D Anatomy Viewer"
              allow="fullscreen"
            /> : <div className="atlas-offline">
              <h2>Atlas memerlukan koneksi internet</h2>
              <p>Perangkat sedang offline. Sambungkan ke internet untuk memuat model anatomi 3D, atau lanjutkan membaca materi.</p>
              <div className="atlas-offline-actions">
                <button type="button" onClick={retryViewer}>Coba lagi</button>
                <Link to="/materi">Buka materi biologi</Link>
              </div>
            </div>}
          </section>
        </main>
      </div>
    </div>
  )
}
