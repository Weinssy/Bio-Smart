import { Link, useSearchParams } from 'react-router-dom'
import materiData from '../../data/materiData.json'
import { filterModules } from '../../lib/materialSearch'

export default function MateriCatalog() {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const modules = filterModules(materiData.modules, query)

  function updateQuery(value) {
    setSearchParams(previous => {
      const next = new URLSearchParams(previous)
      if (value) next.set('q', value)
      else next.delete('q')
      return next
    }, { replace: true })
  }

  return (
    <section className="material-library" aria-labelledby="material-list-title">
      <form className="catalog-search" role="search" onSubmit={event => event.preventDefault()}>
        <label htmlFor="catalog-query">Cari modul atau subtopik</label>
        <div className="catalog-search-field">
          <input id="catalog-query" type="search" value={query} onChange={event => updateQuery(event.target.value)} placeholder="Misalnya: membran sel, hormon, atau fotosintesis" />
          {query && <button type="button" onClick={() => updateQuery('')}>Hapus pencarian</button>}
        </div>
      </form>
      <div className="catalog-result-heading">
        <h2 id="material-list-title">{query.trim() ? 'Hasil pencarian' : 'Pilih modul belajarmu'}</h2>
        <p role="status" aria-live="polite">{modules.length} dari {materiData.modules.length} modul</p>
      </div>
      {modules.length ? (
        <div className="catalog-module-grid">
          {modules.map(mod => (
            <Link key={mod.id} to={`/materi/${mod.id}`} className="catalog-module">
              <div className="catalog-module-top"><span>Modul {materiData.modules.indexOf(mod) + 1}</span><span>{mod.subtopics.length} subtopik</span></div>
              <h3>{mod.title}</h3>
              <p>{mod.description}</p>
              <div className="catalog-module-topics">{mod.subtopics.slice(0, 2).map(sub => <span key={sub.id}>{sub.title}</span>)}</div>
              <span className="catalog-module-action">Buka materi <span aria-hidden="true">↗</span></span>
            </Link>
          ))}
        </div>
      ) : (
        <div className="catalog-empty">
          <h3>Materi belum ditemukan.</h3>
          <p>Tidak ada modul yang cocok dengan “{query}”. Coba kata yang lebih singkat atau buka seluruh modul.</p>
          <button type="button" className="study-button" onClick={() => updateQuery('')}>Tampilkan semua modul</button>
        </div>
      )}
    </section>
  )
}
