import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Sidebar from '../components/common/Sidebar'
import Header from '../components/common/Header'
import Footer from '../components/common/Footer'
import materiData from '../data/materiData.json'
import quizData from '../data/quizData.json'
import { resolveAsset } from '../utils/assetResolver'
import '../styles/home.css'

export default function HomePage() {
  const navigate = useNavigate()
  const { user, profile } = useAuth()
  const modules = materiData.modules
  const subtopicCount = modules.reduce((total, mod) => total + mod.subtopics.length, 0)

  function searchMaterials(event) {
    event.preventDefault()
    const query = String(new FormData(event.currentTarget).get('q') || '').trim()
    navigate(query ? `/materi?q=${encodeURIComponent(query)}` : '/materi')
  }

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="main-wrapper">
        <Header />
        <main className="dashboard-main study-home" id="main-content" tabIndex={-1}>
          <div className="study-intro">
            <div>
              <p className="study-eyebrow">Ruang belajar biologi · SMA kelas XI & XII</p>
              <h1>{user ? `Selamat belajar, ${profile?.full_name?.split(' ')[0] || 'Siswa'}.` : 'Ada yang menarik di setiap sel.'}</h1>
              <p>Pahami konsepnya, amati prosesnya, lalu uji pemahamanmu.</p>
            </div>
            <span className="study-curriculum">Kurikulum Merdeka · Fase F</span>
          </div>
          <section className="study-feature" aria-labelledby="study-feature-title">
            <div className="study-feature-copy">
              <p className="study-eyebrow">Mulai dari unit terkecil kehidupan</p>
              <h2 id="study-feature-title">Dunia besar,<br />di dalam sebuah sel.</h2>
              <p>Kenali membran sel dan organelnya. Lihat bagaimana sel mengatur zat yang masuk dan keluar, lalu amati osmosis di lab virtual.</p>
              <div className="study-feature-actions">
                <Link to="/materi/mod-1" className="study-button study-button-light">Pelajari biologi sel</Link>
                <Link to="/laboratorium" className="study-feature-link">Buka lab osmosis <span aria-hidden="true">↗</span></Link>
              </div>
              <p className="study-feature-note">Materi, diagram interaktif, dan praktikum tersedia tanpa masuk akun.</p>
            </div>
            <figure className="study-specimen">
              <div className="study-specimen-heading"><span>Objek pengamatan</span><span>Biologi sel / 01</span></div>
              <img src={resolveAsset('images/diagrams/sel/membran-sel.svg')} alt="Diagram dwilapis fosfolipid dan protein pada membran sel" width="800" height="600" fetchPriority="high" />
              <figcaption><span>Membran sel</span><Link to="/materi/mod-1">Amati bagian-bagiannya <span aria-hidden="true">↗</span></Link></figcaption>
            </figure>
          </section>
          <section className="study-library" aria-labelledby="study-library-title">
            <div className="study-section-heading">
              <div><p className="study-eyebrow">Bahan belajar</p><h2 id="study-library-title">Apa yang ingin kamu pahami?</h2></div>
              <Link to="/materi" className="study-text-link">Lihat semua {modules.length} modul</Link>
            </div>
            <form className="study-search" onSubmit={searchMaterials} role="search">
              <label htmlFor="home-material-search">Cari materi atau subtopik</label>
              <div className="study-search-field">
                <input id="home-material-search" name="q" type="search" placeholder="Misalnya: membran sel, genetika, atau enzim" />
                <button className="study-button" type="submit">Cari materi</button>
              </div>
            </form>
            <div className="study-topic-list">
              {modules.slice(0, 4).map((mod, index) => (
                <Link to={`/materi/${mod.id}`} key={mod.id} className="study-topic">
                  <span className="study-topic-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                  <div><h3>{mod.title}</h3><p>{mod.subtopics.length} subtopik</p></div>
                  <span className="study-topic-open" aria-hidden="true">↗</span>
                </Link>
              ))}
            </div>
            <p className="study-library-note">{modules.length} modul · {subtopicCount} subtopik · {quizData.quizzes.length} kuis formatif</p>
          </section>
          <section className="study-practice" aria-labelledby="study-practice-title">
            <div className="study-practice-intro"><p className="study-eyebrow">Dari teori ke pengamatan</p><h2 id="study-practice-title">Coba, amati,<br />hubungkan.</h2><p>Gunakan alat belajar untuk melihat konsep dari sudut yang berbeda.</p></div>
            <div className="study-tools">
              <Link to="/laboratorium" className="study-tool"><span className="study-tool-kind">Praktikum</span><div><h3>Apa yang terjadi jika sel kehilangan air?</h3><p>Ubah konsentrasi larutan dan amati respons sel pada simulasi osmosis.</p></div><span className="study-tool-action">Buka laboratorium <span aria-hidden="true">↗</span></span></Link>
              <Link to="/anatomi" className="study-tool"><span className="study-tool-kind">Pengamatan 3D</span><div><h3>Lihat susunan organ dari dekat.</h3><p>Putar model tubuh manusia untuk mempelajari letak dan hubungan antarorgan.</p></div><span className="study-tool-action">Buka atlas anatomi <span aria-hidden="true">↗</span></span></Link>
              <Link to="/kuis" className="study-tool study-tool-quiz"><span className="study-tool-kind">Evaluasi mandiri</span><div><h3>Sudah sejauh mana pemahamanmu?</h3><p>Pilih kuis sesuai materi, lalu periksa jawaban dan pembahasannya.</p></div><span className="study-tool-action">Pilih kuis <span aria-hidden="true">↗</span></span></Link>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  )
}
