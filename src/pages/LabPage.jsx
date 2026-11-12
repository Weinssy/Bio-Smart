import Sidebar from '../components/common/Sidebar'
import Header from '../components/common/Header'
import Footer from '../components/common/Footer'
import { Link } from 'react-router-dom'

import LabSimulation from '../components/lab/LabSimulation'
import '../styles/laboratory.css'

export default function LabPage() {
  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="main-wrapper">
        <Header />

        <main className="dashboard-main laboratory-page" id="main-content" tabIndex={-1}>
          <div className="lab-page-heading">
            <div>
              <p className="lab-eyebrow">Praktikum virtual · Transport membran</p>
              <h1>Ke mana air bergerak?</h1>
              <p>Ubah larutan di sekitar sel. Amati osmosis dan respons membrannya.</p>
            </div>
            <Link to="/materi/mod-1?topik=sub-1-3" className="lab-theory-link">Baca teori osmosis <span aria-hidden="true">↗</span></Link>
          </div>
          <LabSimulation />
        </main>

        <Footer />
      </div>


    </div>
  )
}
