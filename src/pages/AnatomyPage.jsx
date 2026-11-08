import Sidebar from '../components/common/Sidebar'
import Header from '../components/common/Header'

export default function AnatomyPage() {
  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="main-wrapper" style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />

        <main className="dashboard-main" id="main-content" tabIndex={-1} style={{ flex: 1, padding: 0, display: 'flex', flexDirection: 'column' }}>
          <h1 className="sr-only">Atlas Anatomi 3D</h1>
          {/* 3D Viewport Module using iframe */}
          <section style={{ flex: 1, width: '100%', position: 'relative', overflow: 'hidden' }}>
            <iframe
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
            />
          </section>
        </main>
      </div>
    </div>
  )
}
