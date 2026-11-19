const ions = [
  [105, 114], [495, 258], [517, 119], [113, 297], [255, 51], [458, 343],
  [420, 79], [151, 355], [566, 177], [55, 234], [175, 79], [507, 309],
  [300, 354], [518, 69], [75, 166], [555, 268], [353, 75], [66, 317],
  [449, 120], [203, 321], [222, 90], [540, 220], [114, 68], [388, 331],
  [42, 130], [578, 227], [327, 44], [84, 349], [573, 318], [384, 47],
]

const wallPath = 'M-117-64Q-116-99-76-104L83-93Q119-91 126-56L121 57Q119 93 84 101L-73 96Q-116 92-124 49Z'
const membranePath = 'M-108-57Q-109-88-74-92L79-81Q110-80 114-50L110 53Q107 81 77 89L-71 83Q-106 79-112 43Z'
const flowPairs = [{ side: -1, y: 193 }, { side: 1, y: 208 }]
const crenatedOutline = Array.from({ length: 28 }, (_, index) => {
  const angle = index * Math.PI / 14
  const radius = index % 2 ? 82 : 98
  return [Math.cos(angle) * radius, Math.sin(angle) * radius * .85]
})

const crenatedPath = crenatedOutline.map(([x, y], index) => {
  const [nextX, nextY] = crenatedOutline[(index + 1) % crenatedOutline.length]
  return `${index === 0 ? `M${x},${y} ` : ''}Q${x},${y} ${(x + nextX) / 2},${(y + nextY) / 2}`
}).join(' ') + 'Z'

function Callout({ number, x, y, line }) {
  return (
    <g className="lab-callout" aria-hidden="true">
      <path d={line} />
      <circle cx={x} cy={y} r="15" />
      <text x={x} y={y} dy=".35em">{number}</text>
    </g>
  )
}

export default function OsmosisIllustration({ cellType, observation, playing, illustrationId, concentration }) {
  const plant = cellType === 'plant'
  const { tonicity, scale, lysed } = observation
  const swollen = tonicity === 'hypotonic'
  const crenated = tonicity === 'hypertonic'
  const paint = name => `url(#${illustrationId}-${name})`
  const membraneEdge = (plant ? 112 : 96) * scale
  const labels = plant ? ['Dinding sel', 'Membran sel', 'Vakuola'] : [lysed ? 'Fragmen membran' : 'Membran eritrosit']
  const xCenter = 310
  const yCenter = 201

  return (
    <figure className="lab-stage" data-playing={playing}>
      <svg className="lab-cell-illustration" viewBox="0 0 620 400" width="620" height="400" role="img" aria-labelledby={`${illustrationId}-title`} aria-describedby={`${illustrationId}-description`}>
        <title id={`${illustrationId}-title`}>{plant ? 'Sel tumbuhan' : 'Eritrosit'} dalam larutan {observation.label.toLowerCase()}</title>
        <desc id={`${illustrationId}-description`}>{observation.direction}. {observation.description} Ilustrasi konseptual, tidak berskala.</desc>
        <defs>
          <radialGradient id={`${illustrationId}-fluid`} cx="48%" cy="45%" r="66%">
            <stop stopColor="#f1f9ed" /><stop offset=".61" stopColor="#d8ece1" /><stop offset="1" stopColor="#b7d9d0" />
          </radialGradient>
          <radialGradient id={`${illustrationId}-red-cell`} cx={swollen ? '38%' : '49%'} cy={swollen ? '34%' : '48%'} r="68%">
            {swollen
              ? <><stop stopColor="#f8c1ae" /><stop offset=".6" stopColor="#dc8c86" /><stop offset="1" stopColor="#ba616f" /></>
              : <><stop stopColor="#eec4b1" /><stop offset=".38" stopColor="#aa596a" /><stop offset=".76" stopColor="#e59a8c" /><stop offset="1" stopColor="#a85063" /></>}
          </radialGradient>
          <linearGradient id={`${illustrationId}-wall`} x2="1" y2="1">
            <stop stopColor="#e8edb5" /><stop offset="1" stopColor="#a0c28a" />
          </linearGradient>
          <radialGradient id={`${illustrationId}-vacuole`} cx="36%" cy="26%" r="77%">
            <stop stopColor="#edf7e7" /><stop offset="1" stopColor="#87bdac" />
          </radialGradient>
          <marker id={`${illustrationId}-arrow`} markerWidth="14" markerHeight="14" markerUnits="userSpaceOnUse" refX="11" refY="7" orient="auto" viewBox="0 0 14 14">
            <path d="M1 1 12 7 1 13" fill="none" stroke="#17656b" strokeWidth="2.7" strokeLinecap="round" strokeLinejoin="round" />
          </marker>
        </defs>

        <path d="M0 0h620v400H0Z" fill={paint('fluid')} />
        <g fill="none" stroke="#f9fffa" strokeWidth="1.5" opacity=".6" aria-hidden="true">
          <path d="M-42 161C82-20 257-11 400 2s186 80 260 21M-21 365c107-39 154-21 271 26 132 53 281-5 394-61M-46 385q125-62 275 18 165 60 420-66M469-31q70 116 187 103" />
        </g>
        <g aria-hidden="true">
          {ions.slice(0, Math.ceil(concentration / 5 * ions.length)).map(([x, y], index) => (
            <circle key={x + ',' + y} cx={x} cy={y} r={index % 2 ? 4 : 5.5} fill="#527860" fillOpacity={index % 2 ? '.45' : '.22'} stroke="#527860" strokeWidth="1.3" />
          ))}
        </g>

        <g transform={`translate(${xCenter} ${yCenter})`}>
          <ellipse cy="105" rx={plant ? '132' : '106'} ry="19" fill="#537e73" opacity=".12" />
          {plant && <>
            <path d={wallPath} fill={paint('wall')} stroke="#5f824e" strokeWidth="4" />
            <path d={membranePath} fill="#f1f5df" stroke="#9ab585" strokeWidth="2" />
          </>}
          <g className="lab-cell-body" style={{ transform: `scale(${scale})` }}>
            {plant ? <>
              <path d={membranePath} fill="#b8d39a" stroke="#48734f" strokeWidth="3" />
              <path d={swollen
                ? 'M-84-40Q-70-77-27-75L58-69Q87-57 88-24l-1 65Q78 72 40 73l-67-3Q-83 67-89 34Z'
                : 'M-74-29Q-62-60-21-60l61 3q37 6 38 35l-1 61q-7 23-42 23l-60-4q-46-5-53-32Z'}
                fill={paint('vacuole')} stroke="#629d88" strokeWidth="2.7" />
              <path d="M-72-29q19-20 45-20" fill="none" stroke="#f6fff1" strokeWidth="4" strokeLinecap="round" opacity=".68" />
              <g fill="#709d61" stroke="#457756" strokeWidth="1.4">
                <ellipse cx="-69" cy="54" rx="15" ry="7" transform="rotate(25 -69 54)" />
                <ellipse cx="84" cy="42" rx="14" ry="6" transform="rotate(-50 84 42)" />
                <ellipse cx="1" cy="-74" rx="14" ry="6" />
              </g>
              <circle cx="-82" cy="-40" r="14" fill="#8bab74" stroke="#537b58" strokeWidth="2" />
              <circle cx="-84" cy="-43" r="5" fill="#5a865d" />
            </> : lysed ? <>
              <path d="M-78-35Q-93 6-67 38l19-23q-14-16-5-37zM14-77q52 4 74 44l-23 11q-13-26-48-31zM27 54q30-10 49-36l16 13Q83 68 40 79zM-48 60q2 15 23 19l9-16-18-18z" fill={paint('red-cell')} stroke="#9d5060" strokeWidth="2.5" />
              <g fill="#c8737b" opacity=".65"><circle cx="-15" cy="-9" r="7" /><circle cx="40" cy="15" r="5" /><circle cx="8" cy="52" r="4" /></g>
            </> : <>
              {crenated
                ? <path d={crenatedPath} fill={paint('red-cell')} stroke="#944755" strokeWidth="3" />
                : <ellipse rx="96" ry={swollen ? '84' : '71'} fill={paint('red-cell')} stroke="#944755" strokeWidth="3" />}
              <path d={swollen ? 'M-65-37q23-30 52-32' : 'M-69-34q23-23 49-25'} fill="none" stroke="#ffdeca" strokeWidth="5" opacity=".85" strokeLinecap="round" />
              {!swollen && <path d="M-43 18q38 33 84 0" fill="none" stroke="#f6c0af" opacity=".48" strokeWidth="4" strokeLinecap="round" />}
            </>}
          </g>
        </g>

        <g aria-hidden="true">
          {flowPairs.map(({ side, y }, index) => {
            const inward = tonicity === 'isotonic' ? index === 0 : swollen
            const outside = xCenter + side * (plant ? 161 : Math.max(146, membraneEdge + 42))
            const inside = xCenter + side * (membraneEdge - 21)
            const [from, to] = inward ? [outside, inside] : [inside, outside]
            return (
              <g key={side}>
                <path d={`M${from} ${y}H${to}`} stroke="#f5fff9" strokeWidth="10" strokeLinecap="round" />
                <path d={`M${from} ${y}H${to}`} stroke="#17656b" strokeWidth="3" strokeLinecap="round" markerEnd={paint('arrow')} />
                <circle className="lab-flow-particle" cx={from} cy={y} r="5" fill="#f7fff9" stroke="#17656b" strokeWidth="2" style={{ '--flow-x': `${(to - from) * .86}px`, animationDelay: `${index * -.65}s` }} />
              </g>
            )
          })}
        </g>
        {plant ? <>
          <Callout number="1" x="159" y="119" line="M159 119l29-7 26 12" />
          <Callout number="2" x="452" y="282" line={`M452 282h-23l${-119 + 97 * scale} ${-81 + 59 * scale}`} />
          <Callout number="3" x="310" y="335" line={`M310 335V${yCenter + 50 * scale}`} />
        </> : <Callout number="1" x="422" y="99" line={`M422 99h-43L${xCenter + (lysed ? 49 : 48 * scale)} ${yCenter - (lysed ? 54 : 54 * scale)}`} />}
      </svg>
      <figcaption className="lab-figure-caption">
        <span><span className="lab-key-arrow" aria-hidden="true">→</span> Arah perpindahan air</span>
        <span><span className="lab-key-ion" aria-hidden="true" /> Ion NaCl terlarut</span>
        {labels.map((label, index) => <span key={label}><span className="lab-key-number" aria-hidden="true">{index + 1}</span> {label}</span>)}
      </figcaption>
    </figure>
  )
}
