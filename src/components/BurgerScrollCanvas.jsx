import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const TOTAL_FRAMES = 300
const FRAME_PATH = (n) => `/frames/burger/frame_${String(n).padStart(4, '0')}.jpg`

export default function BurgerScrollCanvas() {
  const canvasRef = useRef(null)
  const sectionRef = useRef(null)
  const framesRef = useRef([])
  const currentFrameRef = useRef(0)
  const rafRef = useRef(null)
  const [loadProgress, setLoadProgress] = useState(0)
  const [loaded, setLoaded] = useState(false)

  // Preload all frames
  useEffect(() => {
    let loaded = 0
    const images = []

    const load = (i) => new Promise((resolve) => {
      const img = new Image()
      img.onload = () => {
        images[i] = img
        loaded++
        setLoadProgress(Math.round((loaded / TOTAL_FRAMES) * 100))
        if (loaded === TOTAL_FRAMES) {
          framesRef.current = images
          setLoaded(true)
        }
        resolve()
      }
      img.onerror = () => { loaded++; resolve() }
      img.src = FRAME_PATH(i + 1)
    })

    // Load first few frames first for fast start
    const priority = [0,1,2,3,4,5,6,7,8,9]
    Promise.all(priority.map(load)).then(() => {
      // Then load rest in background
      const rest = Array.from({ length: TOTAL_FRAMES }, (_, i) => i).filter(i => !priority.includes(i))
      rest.forEach(load)
    })
  }, [])

  // Draw frame on canvas
  const drawFrame = (frameIndex) => {
    const canvas = canvasRef.current
    const img = framesRef.current[frameIndex]
    if (!canvas || !img) return

    const ctx = canvas.getContext('2d')
    canvas.width = canvas.offsetWidth * window.devicePixelRatio
    canvas.height = canvas.offsetHeight * window.devicePixelRatio
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

    const cw = canvas.offsetWidth
    const ch = canvas.offsetHeight
    const iw = img.naturalWidth
    const ih = img.naturalHeight

    // Cover fit
    const scale = Math.max(cw / iw, ch / ih)
    const sw = iw * scale
    const sh = ih * scale
    const sx = (cw - sw) / 2
    const sy = (ch - sh) / 2

    ctx.clearRect(0, 0, cw, ch)
    ctx.drawImage(img, sx, sy, sw, sh)
  }

  // Scroll handler
  useEffect(() => {
    if (!loaded) return

    const onScroll = () => {
      const section = sectionRef.current
      if (!section) return

      const rect = section.getBoundingClientRect()
      const sectionTop = -rect.top
      const sectionHeight = section.offsetHeight - window.innerHeight
      const progress = Math.max(0, Math.min(1, sectionTop / sectionHeight))

      const frameIndex = Math.min(
        Math.floor(progress * (TOTAL_FRAMES - 1)),
        TOTAL_FRAMES - 1
      )

      if (frameIndex !== currentFrameRef.current) {
        currentFrameRef.current = frameIndex
        cancelAnimationFrame(rafRef.current)
        rafRef.current = requestAnimationFrame(() => drawFrame(frameIndex))
      }
    }

    // Draw first frame immediately
    drawFrame(0)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [loaded])

  // Resize handler
  useEffect(() => {
    const onResize = () => drawFrame(currentFrameRef.current)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{ height: '300vh', position: 'relative' }}
    >
      {/* Sticky canvas wrapper */}
      <div style={{
        position: 'sticky', top: 0,
        width: '100vw', height: '100vh',
        overflow: 'hidden',
        background: '#050505',
      }}>
        {/* Loading state */}
        {!loaded && (
          <div style={{
            position: 'absolute', inset: 0, zIndex: 10,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            gap: '1rem', background: '#050505',
          }}>
            <div className="font-display chrome-text" style={{ fontSize: '1rem', letterSpacing: '0.3em' }}>
              LOADING
            </div>
            <div style={{ width: '200px', height: '1px', background: '#1a1a1a' }}>
              <div style={{
                height: '100%',
                background: 'linear-gradient(90deg, #666, #e8e8e8, #666)',
                width: `${loadProgress}%`,
                transition: 'width 0.1s',
              }} />
            </div>
            <div style={{ color: '#333', fontSize: '0.7rem', fontFamily: 'monospace' }}>
              {loadProgress}%
            </div>
          </div>
        )}

        {/* Canvas */}
        <canvas
          ref={canvasRef}
          style={{
            width: '100%', height: '100%',
            display: 'block',
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.5s ease',
          }}
        />

        {/* Overlaid text — fades in then out */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
          padding: 'clamp(2rem, 5vw, 4rem)',
        }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.4,0,0.2,1] }}
          >
            <p style={{
              color: 'rgba(255,255,255,0.35)', fontSize: '0.7rem',
              letterSpacing: '0.4em', textTransform: 'uppercase',
              fontWeight: 600, marginBottom: '0.5rem',
            }}>
              Scroll to experience
            </p>
            <h2 className="font-display" style={{
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              lineHeight: 0.9,
              background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.3) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              BUILT<br />DIFFERENT
            </h2>
          </motion.div>
        </div>

        {/* Gradient vignette */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(5,5,5,0.6) 100%)',
        }} />

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={loaded ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
          style={{
            position: 'absolute', bottom: '2rem', right: '2rem',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
          }}
        >
          <div style={{
            width: '1px', height: '50px',
            background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.4))',
          }} />
          <div style={{
            color: 'rgba(255,255,255,0.3)',
            fontSize: '0.6rem', letterSpacing: '0.3em',
            writingMode: 'vertical-rl', textTransform: 'uppercase',
          }}>
            Scroll
          </div>
        </motion.div>
      </div>
    </section>
  )
}
