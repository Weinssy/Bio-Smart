const paths = {
  plus: 'M5 12h14M12 5v14',
  minus: 'M5 12h14',
  reset: 'M3 11a9 9 0 1 1 2.5 6.8M3 5v6h6',
  play: 'M8 5v14l11-7Z',
  pause: 'M9 5v14M15 5v14',
  inward: 'M3 12h15m-6-5 6 5-6 5',
  outward: 'M21 12H6m6-5-6 5 6 5',
  both: 'M3 8h18l-4-4M21 16H3l4 4',
  eye: 'M2 12s4-6 10-6 10 6 10 6-4 6-10 6-10-6-10-6Z M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z',
}

export default function VisualIcon({ name }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={paths[name]} />
    </svg>
  )
}
