import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import materiData from '../../data/materiData.json'
import { findMaterialResults } from '../../lib/materialSearch'

export default function CommandPalette({ onClose, returnFocusRef }) {
  const [query, setQuery] = useState('')
  const dialogRef = useRef(null)
  const inputRef = useRef(null)
  const navigate = useNavigate()
  const results = findMaterialResults(materiData.modules, query)

  useEffect(() => {
    const dialog = dialogRef.current
    const returnFocusTarget = returnFocusRef.current
    const previousOverflow = document.body.style.overflow
    dialog.showModal()
    inputRef.current?.focus()
    document.body.style.overflow = 'hidden'
    return () => { dialog.close(); document.body.style.overflow = previousOverflow; returnFocusTarget?.focus() }
  }, [returnFocusRef])

  function submitSearch(event) {
    event.preventDefault()
    if (!results.length) return
    navigate(results[0].to)
    onClose()
  }

  return (
    <dialog ref={dialogRef} className="material-search-dialog" aria-labelledby="search-dialog-title" onCancel={event => { event.preventDefault(); onClose() }} onClick={event => { if (event.target === event.currentTarget) onClose() }}>
      <div className="material-search-panel">
        <div className="material-search-heading"><h2 id="search-dialog-title">Cari di ruang belajar</h2><button type="button" onClick={onClose} aria-label="Tutup pencarian">Tutup <kbd>Esc</kbd></button></div>
        <form onSubmit={submitSearch}>
          <label htmlFor="global-material-query">Materi atau subtopik</label>
          <input ref={inputRef} id="global-material-query" type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Coba: membran, genetika, atau enzim" />
          <p className="material-search-hint" role="status">{query.trim() ? results.length ? `${results.length} hasil ditemukan. Enter membuka hasil pertama.` : 'Tidak ada hasil. Coba kata lain.' : 'Ketik judul materi. Gunakan Tab untuk memilih hasil.'}</p>
        </form>
        <div className="material-search-results">
          {results.map(result => <Link to={result.to} key={result.key} onClick={onClose}><span>{result.title}</span><small>{result.context}</small></Link>)}
          {query.trim() && !results.length && <p className="material-search-empty">Tidak ada materi yang cocok. Coba kata yang lebih singkat.</p>}
        </div>
      </div>
    </dialog>
  )
}
