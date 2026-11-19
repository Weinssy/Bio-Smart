import { useId, useState } from 'react'
import OsmosisIllustration from './OsmosisIllustration'
import VisualIcon from '../visual/VisualIcon'

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
          <OsmosisIllustration cellType={cellType} observation={observation} playing={playing} illustrationId={controlId} concentration={concentration} />
          <div className="lab-stage-toolbar">
            <span>Ilustrasi konseptual · Tidak berskala</span>
            <button type="button" className="lab-animation-toggle" onClick={() => setPlaying(value => !value)}><VisualIcon name={playing ? 'pause' : 'play'} />{playing ? 'Jeda animasi' : 'Putar animasi'}</button>
          </div>
          <div className="lab-observation-result" role="status" aria-atomic="true">
            <span className="lab-result-icon" aria-hidden="true"><VisualIcon name={observation.tonicity === 'isotonic' ? 'both' : observation.tonicity === 'hypotonic' ? 'inward' : 'outward'} /></span>
            <div><p>{observation.direction}</p><h3>{observation.status}</h3><span>{observation.description}</span></div>
          </div>
        </section>
        <section className="lab-controls" aria-labelledby={`${controlId}-controls`}>
          <div className="lab-controls-heading"><h2 id={`${controlId}-controls`}>Atur percobaan</h2><button type="button" className="lab-reset" onClick={resetExperiment}><VisualIcon name="reset" />Reset</button></div>
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
          <div className="lab-reading-note"><VisualIcon name="eye" /><p>Perhatikan perubahan ukuran sel dan arah panah air setelah mengubah larutan.</p></div>
        </section>
      </div>
      <aside className="lab-principle" aria-labelledby={`${controlId}-principle`}>
        <div><p className="lab-eyebrow">Apa yang sedang terjadi?</p><h2 id={`${controlId}-principle`}>Air mengikuti perbedaan konsentrasi.</h2></div>
        <div><p>Air bergerak melalui membran selektif permeabel dari larutan dengan konsentrasi zat terlarut lebih rendah ke larutan dengan konsentrasi lebih tinggi.</p><small>Model pembelajaran sederhana: acuan NaCl 0,9% digunakan untuk kedua jenis sel. Rentang respons pada simulasi bukan ambang fisiologis universal.</small></div>
      </aside>
    </div>
  )
}
