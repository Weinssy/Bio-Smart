import { useState } from 'react'
import { Link } from 'react-router-dom'
import materiData from '../../data/materiData.json'
import './MembraneSpecimen.css'

const parts = materiData.modules[0].subtopics[0].content.find(block => block.type === 'interactiveImage').parts
const labels = ['Fosfolipid', 'Protein integral', 'Kolesterol', 'Rantai karbohidrat']
const positions = [[139, 196], [354, 225], [483, 223], [580, 115]]
const lipids = Array.from({ length: 18 }, (_, index) => 61 + index * 35).filter(x => x < 298 || x > 409)

export default function MembraneSpecimen() {
  const [selected, setSelected] = useState(0)
  const part = parts[selected]

  return (
    <figure className="membrane-specimen" aria-labelledby="membrane-caption">
      <div className="membrane-heading"><span>Objek pengamatan</span><span>Biologi sel / 01</span></div>
      <div className="membrane-title"><span>Struktur membran sel</span><small>Penampang skematis · tidak berskala</small></div>
      <svg className="membrane-drawing" viewBox="0 0 720 370" width="720" height="370" role="img" aria-labelledby="membrane-svg-title membrane-svg-description">
        <title id="membrane-svg-title">Model mosaik cair membran sel</title>
        <desc id="membrane-svg-description">Dua lapis fosfolipid, protein yang menembus membran, kolesterol di antara ekor lipid, dan rantai karbohidrat pada permukaan luar. Pilih komponen melalui tombol di bawah diagram.</desc>
        <defs>
          <linearGradient id="membrane-lipid-depth" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#d5e9db" /><stop offset=".5" stopColor="#eef3df" /><stop offset="1" stopColor="#d5e9db" /></linearGradient>
          <linearGradient id="membrane-protein-depth" x1="0" x2="1"><stop stopColor="#235d68" /><stop offset=".5" stopColor="#4a8790" /><stop offset="1" stopColor="#235d68" /></linearGradient>
        </defs>
        <text x="42" y="45" className="membrane-region-label">Lingkungan luar sel</text>
        <text x="42" y="338" className="membrane-region-label">Sitoplasma</text>
        <path d="M43 169 Q358 141 677 169 L677 276 Q358 248 43 276Z" fill="url(#membrane-lipid-depth)" />
        <g className={selected === 0 ? 'membrane-part emphasized' : 'membrane-part'}>
          {lipids.map(x => {
            const y = 169 - 22 * Math.sin((x - 43) / 634 * Math.PI)
            return <g key={x}>
              <path d={`M${x - 4} ${y + 9} l-5 28 8 13 -6 17 M${x + 4} ${y + 9} l7 24 -6 16 6 18 M${x - 4} ${y + 97} l-5 -24 8 -12 -6 -13 M${x + 4} ${y + 97} l7 -23 -6 -14 6 -12`} fill="none" stroke="#6f9e7d" strokeWidth="3" strokeLinecap="round" />
              <ellipse cx={x} cy={y} rx="13" ry="12" fill="#347b57" stroke="#21573d" strokeWidth="1.5" />
              <ellipse cx={x} cy={y + 107} rx="13" ry="12" fill="#347b57" stroke="#21573d" strokeWidth="1.5" />
              <ellipse cx={x - 3} cy={y - 3} rx="5" ry="3" fill="#91bc9c" />
            </g>
          })}
        </g>
        <g className={selected === 1 ? 'membrane-part emphasized' : 'membrane-part'} fill="url(#membrane-protein-depth)" stroke="#164c57" strokeWidth="2">
          <path d="M315 131 Q291 174 307 207 Q293 240 315 281 Q328 290 341 277 Q326 223 341 148 Q335 128 315 131Z" />
          <path d="M391 131 Q414 174 399 207 Q414 240 391 281 Q378 290 365 277 Q380 223 365 148 Q371 128 391 131Z" />
        </g>
        <g className={selected === 2 ? 'membrane-part emphasized' : 'membrane-part'} fill="#c58b38" stroke="#81551e" strokeWidth="1.5">
          {[185, 475, 615].map(x => <g key={x} transform={`translate(${x} 212)`}><path d="M0 -12 l7 -4 7 4 v8 l-7 4 -7 -4Z M7 0 l7 -4 7 4 v8 l-7 4 -7 -4Z M0 12 l7 -4 7 4 v8 l-7 4 -7 -4Z" /><path d="M7 -16 v-10" fill="none" strokeWidth="3" /></g>)}
        </g>
        <g className={selected === 3 ? 'membrane-part emphasized' : 'membrane-part'}>
          <path d="M558 170 Q537 149 551 136 Q565 126 582 139 Q602 150 585 171Z" fill="#4a8790" stroke="#164c57" strokeWidth="2" />
          <path d="M567 138 V101 L543 80 M567 101 L590 79 V59 M590 79 L615 68" stroke="#996727" strokeWidth="4" fill="none" strokeLinecap="round" />
          {[[567,101],[543,80],[590,79],[590,59],[615,68]].map(([x,y]) => <path key={`${x}-${y}`} d={`M${x} ${y-7} l6 3.5 v7 l-6 3.5 -6 -3.5 v-7Z`} fill="#d5a351" stroke="#81551e" strokeWidth="1.5" />)}
        </g>
        {positions.map(([x, y], index) => <g key={index} className={`membrane-marker ${selected === index ? 'selected' : ''}`} transform={`translate(${x} ${y})`} aria-hidden="true"><circle r="17" /><text textAnchor="middle" dominantBaseline="central">{index + 1}</text></g>)}
      </svg>
      <div className="membrane-selector" role="group" aria-label="Pilih komponen membran">
        {parts.map((item, index) => <button key={item.id} type="button" aria-pressed={selected === index} aria-controls="membrane-detail" onClick={() => setSelected(index)}><span aria-hidden="true">{index + 1}</span>{labels[index]}</button>)}
      </div>
      <div className="membrane-detail" id="membrane-detail" role="status" aria-live="polite" aria-atomic="true"><strong>{part.label}</strong><p>{part.description}</p></div>
      <figcaption id="membrane-caption"><span>Pilih komponen untuk mengamatinya.</span><Link to="/materi/mod-1?topik=sub-1-1">Baca materi membran <span aria-hidden="true">↗</span></Link></figcaption>
    </figure>
  )
}
