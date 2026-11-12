import { useId, useState } from 'react'

const presets = [
  { value: 0.1, label: 'Hipotonik', detail: '0,1%' },
  { value: 0.9, label: 'Isotonik', detail: '0,9%' },
  { value: 4, label: 'Hipertonik', detail: '4,0%' },
]
const formatConcentration = value => value.toFixed(1).replace('.', ',')

function getObservation(concentration, cellType) {
  const plant = cellType === 'plant'
  if (concentration < 0.8) {
    const lysed = !plant && concentration <= 0.2
    return {
      tonicity: 'hypotonic', label: 'Hipotonik', direction: 'Air masuk ke sel',
      status: plant ? 'Sel turgid' : lysed ? 'Hemolisis' : 'Sel membengkak',
      description: plant ? 'Air masuk dan vakuola membesar. Dinding sel menahan tekanan turgor.' : lysed ? 'Pada model ini, masuknya air berlebih menyebabkan eritrosit pecah.' : 'Air masuk melalui membran sehingga volume sel meningkat.',
      scale: plant ? 1 : 1 + ((0.9 - concentration) / 0.9) * 0.35,
      lysed,
    }
  }
  if (concentration > 1.2) {
    return {
      tonicity: 'hypertonic', label: 'Hipertonik', direction: 'Air keluar dari sel',
      status: plant ? 'Plasmolisis' : 'Krenasi',
      description: plant ? 'Air keluar dan protoplas menyusut, menjauh dari dinding sel yang tetap.' : 'Air keluar melalui membran. Eritrosit menyusut dan permukaannya berlekuk.',
      scale: Math.max(0.55, 1 - Math.min(1, (concentration - 0.9) / 4) * 0.45), lysed: false,
    }
  }
  return {
    tonicity: 'isotonic', label: 'Isotonik', direction: 'Air masuk = air keluar', status: 'Ukuran sel stabil',
    description: 'Air tetap bergerak melintasi membran. Laju masuk dan keluar seimbang sehingga tidak ada perpindahan netto.',
    scale: 1, lysed: false,
  }
}

function CellIllustration({ cellType, observation, playing, illustrationId }) {
  const plant = cellType === 'plant'
  const { tonicity, scale, lysed } = observation
  const flows = [
    { x1: 134, y1: 220, x2: 194, y2: 220, inward: true },
    { x1: 486, y1: 220, x2: 426, y2: 220, inward: false },
    { x1: 310, y1: 44, x2: 310, y2: 104, inward: true },
    { x1: 310, y1: 396, x2: 310, y2: 336, inward: false },
  ]
  const crenated = Array.from({ length: 32 }, (_, i) => {
    const angle = i * Math.PI / 16
    const radius = i % 2 ? 83 : 96
    return `${Math.cos(angle) * radius},${Math.sin(angle) * radius * 0.88}`
  }).join(' ')

  return (
    <div className="lab-stage" data-playing={playing}>
      <svg className="lab-cell-illustration" viewBox="0 0 620 440" width="620" height="440" role="img" aria-labelledby={`${illustrationId}-title ${illustrationId}-description`}>
        <title id={`${illustrationId}-title`}>{plant ? 'Sel tumbuhan' : 'Eritrosit'} dalam larutan {observation.label.toLowerCase()}</title>
        <desc id={`${illustrationId}-description`}>{observation.direction}. {observation.description} Ilustrasi konseptual, tidak berskala.</desc>
        <defs>
          <radialGradient id={`${illustrationId}-cell`}>
            <stop offset="0%" stopColor="#f2b8b3" /><stop offset="52%" stopColor="#e2a09c" /><stop offset="77%" stopColor="#bd5d69" /><stop offset="100%" stopColor="#a74456" />
          </radialGradient>
          <marker id={`${illustrationId}-arrow`} markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto" viewBox="0 0 6 6"><path d="M0 0 6 3 0 6" fill="#367e78" /></marker>
        </defs>
        <circle cx="310" cy="220" r="199" fill="#f5f9f6" stroke="#d5e1da" />
        <circle cx="310" cy="220" r="184" fill="#eaf3ee" stroke="#c7dacf" />
        <g fill="#6d9c96" opacity=".65" aria-hidden="true">
          {[[188, 114], [414, 103], [448, 300], [180, 319], [383, 355], [237, 64], [470, 158], [142, 274], [235, 362]].map(([x, y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r="3" />)}
        </g>
        {plant && <g>
          <rect x="199" y="109" width="222" height="222" rx="31" fill="#dfedcc" stroke="#587747" strokeWidth="6" />
          <rect x="207" y="117" width="206" height="206" rx="25" fill="#f2f7e9" stroke="#a9bd8c" />
        </g>}
        <g className="lab-cell-body" style={{ transform: `translate(310px, 220px) scale(${scale})` }}>
          {plant ? <>
            <rect x="-95" y="-95" width="190" height="190" rx="24" fill="#b9d598" stroke="#6c9053" strokeWidth="3" />
            <rect x="-69" y="-67" width="138" height="134" rx="37" fill="#d8e9e3" stroke="#85b1a0" strokeWidth="2" />
            <ellipse cx="-68" cy="-46" rx="12" ry="8" fill="#668c49" transform="rotate(-30 -68 -46)" />
            <ellipse cx="67" cy="41" rx="12" ry="8" fill="#668c49" transform="rotate(-30 67 41)" />
            <ellipse cx="53" cy="-68" rx="12" ry="8" fill="#668c49" />
            <circle cx="-67" cy="57" r="13" fill="#a0b781" stroke="#66824d" strokeWidth="2" />
            <text x="0" y="5" className="lab-svg-cell-label">Vakuola</text>
          </> : lysed ? <g fill="#bd5d69" stroke="#a74456" strokeWidth="2">
            <path d="M-62-57 Q-95-12-65 20 L-43 3 Q-57-22-42-44Z" /><path d="M29-62 Q80-48 82-5 L59 1 Q54-29 19-41Z" /><path d="M-27 46 Q11 74 51 39 L65 60 Q6 105-42 66Z" />
            <circle cx="-13" cy="-10" r="9" opacity=".55" /><circle cx="28" cy="21" r="6" opacity=".55" />
          </g> : <>
            {tonicity === 'hypertonic' ? <polygon points={crenated} fill={`url(#${illustrationId}-cell)`} stroke="#a74456" strokeWidth="3" strokeLinejoin="round" /> : <ellipse rx="96" ry="84" fill={`url(#${illustrationId}-cell)`} stroke="#a74456" strokeWidth="3" />}
            <ellipse rx="43" ry="33" fill="#edb5ad" opacity=".7" />
            <path d="M-69-35 Q-38-65-6-61" stroke="#f8d7cc" strokeWidth="5" fill="none" strokeLinecap="round" opacity=".6" />
          </>}
        </g>
        <g stroke="#367e78" strokeWidth="2" fill="none" aria-hidden="true">
          {flows.map((flow, index) => {
            const inward = tonicity === 'isotonic' ? flow.inward : tonicity === 'hypotonic'
            const [x1, y1, x2, y2] = inward ? [flow.x1, flow.y1, flow.x2, flow.y2] : [flow.x2, flow.y2, flow.x1, flow.y1]
            return <g key={index}>
              <path d={`M${x1} ${y1} L${x2} ${y2}`} markerEnd={`url(#${illustrationId}-arrow)`} />
              <circle className="lab-flow-particle" cx={x1} cy={y1} r="4" fill="#367e78" stroke="none" style={{ '--flow-x': `${(x2 - x1) * .7}px`, '--flow-y': `${(y2 - y1) * .7}px`, animationDelay: `${index * -.45}s` }} />
            </g>
          })}
        </g>
        <text x="101" y="192" className="lab-svg-water-label" textAnchor="middle">H₂O</text>
        <text x="519" y="192" className="lab-svg-water-label" textAnchor="middle">H₂O</text>
      </svg>
    </div>
  )
}

export default function LabSimulation() {
  const [concentration, setConcentration] = useState(0.9)
  const [cellType, setCellType] = useState('animal')
  const [playing, setPlaying] = useState(false)
  const controlId = useId()
  const observation = getObservation(concentration, cellType)

  function resetExperiment() {
    setConcentration(0.9)
    setCellType('animal')
    setPlaying(false)
  }

  return (
    <div className="lab-simulation osmosis-lab">
      <div className="lab-workspace">
        <section className="lab-observation" aria-labelledby={`${controlId}-observation`}>
          <div className="lab-observation-heading">
            <div><p className="lab-eyebrow">Simulasi osmosis</p><h2 id={`${controlId}-observation`}>Ruang pengamatan</h2></div>
            <span className="lab-solution-label">{observation.label}</span>
          </div>
          <CellIllustration cellType={cellType} observation={observation} playing={playing} illustrationId={controlId} />
          <div className="lab-stage-toolbar">
            <span>Ilustrasi konseptual · Tidak berskala</span>
            <button type="button" className="lab-animation-toggle" onClick={() => setPlaying(value => !value)}><span className="material-symbols-outlined" aria-hidden="true">{playing ? 'pause' : 'play_arrow'}</span>{playing ? 'Jeda animasi' : 'Putar animasi'}</button>
          </div>
          <div className="lab-observation-result" role="status" aria-atomic="true">
            <span className="lab-result-icon material-symbols-outlined" aria-hidden="true">{observation.tonicity === 'isotonic' ? 'sync_alt' : observation.tonicity === 'hypotonic' ? 'login' : 'logout'}</span>
            <div><p>{observation.direction}</p><h3>{observation.status}</h3><span>{observation.description}</span></div>
          </div>
        </section>
        <section className="lab-controls" aria-labelledby={`${controlId}-controls`}>
          <div className="lab-controls-heading"><h2 id={`${controlId}-controls`}>Atur percobaan</h2><button type="button" className="lab-reset" onClick={resetExperiment}><span className="material-symbols-outlined" aria-hidden="true">restart_alt</span>Reset</button></div>
          <fieldset className="lab-specimen-options"><legend>1. Pilih spesimen</legend>
            {[{ value: 'animal', label: 'Sel hewan', detail: 'Eritrosit' }, { value: 'plant', label: 'Sel tumbuhan', detail: 'Dengan dinding sel' }].map(option => <label key={option.value} className="lab-specimen-option" htmlFor={`${controlId}-${option.value}`}>
              <input type="radio" name={`${controlId}-specimen`} id={`${controlId}-${option.value}`} checked={cellType === option.value} onChange={() => setCellType(option.value)} value={option.value} />
              <span><strong>{option.label}</strong><small>{option.detail}</small></span>
            </label>)}
          </fieldset>
          <div className="lab-concentration-control">
            <label htmlFor={`${controlId}-concentration`}>2. Ubah konsentrasi NaCl</label>
            <div className="lab-concentration-readout"><output htmlFor={`${controlId}-concentration`} aria-live="off">{formatConcentration(concentration)}<span>%</span></output><span>larutan di luar sel</span></div>
            <input className="lab-range" id={`${controlId}-concentration`} type="range" min="0" max="5" step="0.1" value={concentration} onChange={event => setConcentration(Number(event.target.value))} aria-valuetext={`${formatConcentration(concentration)} persen NaCl`} aria-describedby={`${controlId}-reference`} style={{ '--range-fill': `${concentration / 5 * 100}%` }} />
            <div className="lab-range-labels"><span>0% · Aquades</span><span>5% · Pekat</span></div>
            <p className="lab-reference" id={`${controlId}-reference`}>Acuan model: 0,9% NaCl</p>
          </div>
          <fieldset className="lab-preset-options"><legend>Atau coba larutan berikut</legend>
            <div>{presets.map(preset => <button type="button" key={preset.value} onClick={() => setConcentration(preset.value)} aria-pressed={concentration === preset.value}><span>{preset.label}</span><strong>{preset.detail}</strong></button>)}</div>
          </fieldset>
          <div className="lab-reading-note"><span className="material-symbols-outlined" aria-hidden="true">visibility</span><p>Perhatikan perubahan ukuran sel dan arah panah air setelah mengubah larutan.</p></div>
        </section>
      </div>
      <aside className="lab-principle" aria-labelledby={`${controlId}-principle`}>
        <div><p className="lab-eyebrow">Apa yang sedang terjadi?</p><h2 id={`${controlId}-principle`}>Air mengikuti perbedaan konsentrasi.</h2></div>
        <div><p>Air bergerak melalui membran selektif permeabel dari larutan dengan konsentrasi zat terlarut lebih rendah ke larutan dengan konsentrasi lebih tinggi.</p><small>Model pembelajaran sederhana: acuan NaCl 0,9% digunakan untuk kedua jenis sel. Rentang respons pada simulasi bukan ambang fisiologis universal.</small></div>
      </aside>
    </div>
  )
}
