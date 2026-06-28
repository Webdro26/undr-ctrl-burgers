// Ticker strip between sections
export default function Marquee({ items }) {
  const doubled = [...items, ...items]
  return (
    <div style={{
      background: '#0a0a0a',
      borderTop: '1px solid rgba(255,255,255,0.05)',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
      overflow: 'hidden',
      padding: '1rem 0',
      whiteSpace: 'nowrap',
    }}>
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span key={i} style={{
            display: 'inline-flex', alignItems: 'center', gap: '1.5rem',
            paddingRight: '3rem',
          }}>
            <span className="font-display chrome-text"
              style={{ fontSize: 'clamp(1.1rem,2.5vw,1.5rem)', letterSpacing: '.08em' }}>
              {item}
            </span>
            <span style={{ color: '#2a2a2a', fontSize: '0.5rem' }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  )
}
