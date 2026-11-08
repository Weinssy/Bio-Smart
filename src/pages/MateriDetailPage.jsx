import Sidebar from '../components/common/Sidebar'
import Header from '../components/common/Header'
import Footer from '../components/common/Footer'

import MateriDetail from '../components/materi/MateriDetail'

export default function MateriDetailPage() {
  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="main-wrapper">
        <Header />

        <main className="dashboard-main" id="main-content" tabIndex={-1}>
          <MateriDetail />
        </main>

        <Footer />
      </div>


    </div>
  )
}
