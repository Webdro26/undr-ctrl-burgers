import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FiArrowRight, FiMapPin } from 'react-icons/fi'

const START_FRAME = 1
const END_FRAME = 115
const TOTAL_FRAMES = 300

const FRAME_PATH = (n) =>
  `/frames/burger/frame_${String(n).padStart(4, '0')}.jpg`

export default function Hero() {
  const sectionRef = useRef(null)
  const canvasRef = useRef(null)
  const framesRef = useRef([])
  const currentFrameRef = useRef(START_FRAME)
  const rafRef = useRef(null)

  const [canvasReady, setCanvasReady] = useState(false)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const titleOpacity = useTransform(scrollYProgress, [0, 0.45, 0.78], [1, 1, 0])
  const titleY = useTransform(scrollYProgress, [0, 0.78], [0, -45])
  const stageOpacity = useTransform(scrollYProgress, [0.12, 0.32, 0.9], [0, 1, 1])

  const scrollToMenu = () =>
    document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })

  const scrollToLocation = () =>
    document.getElementById('location')?.scrollIntoView({ behavior: 'smooth' })

  const drawFrame = (index) => {
    const canvas = canvasRef.current
    const img = framesRef.current[index]
    if (!canvas || !img) return

    const rect = canvas.getBoundingClientRect()
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    canvas.width = Math.floor(rect.width * dpr)
    canvas.height = Math.floor(rect.height * dpr)

    const ctx = canvas.getContext('2d')
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.clearRect(0, 0, rect.width, rect.height)

    const isMobile = window.innerWidth <= 768
    const iw = img.naturalWidth
    const ih = img.naturalHeight

    const baseScale = Math.max(rect.width / iw, rect.height / ih)
    
    const scale = baseScale * (isMobile ? 0.82 : 1.07)

    const sw = iw * scale
    const sh = ih * scale

    const dx = (rect.width - sw) / 2
    const dy = (rect.height - sh) / 2 - (isMobile ? 72 : 26)

    ctx.drawImage(img, dx, dy, sw, sh)
    setCanvasReady(true)
  }

  useEffect(() => {
    let cancelled = false
    const images = new Array(TOTAL_FRAMES)

    const loadFrame = (index) =>
      new Promise((resolve) => {
        const img = new Image()
        img.onload = () => {
          if (!cancelled) images[index] = img
          resolve()
        }
        img.onerror = resolve
        img.src = FRAME_PATH(index)
      })

    loadFrame(START_FRAME).then(() => {
      if (cancelled) return
      framesRef.current = images
      drawFrame(START_FRAME)
      requestAnimationFrame(() => drawFrame(START_FRAME))
    })

    const priority = Array.from({ length: END_FRAME + 1 }, (_, i) => i)

    Promise.all(priority.map(loadFrame)).then(() => {
      if (cancelled) return
      framesRef.current = images
      drawFrame(currentFrameRef.current)
    })

    return () => {
      cancelled = true
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) => {
      const eased = Math.min(1, Math.max(0, v * 1.85))
      const frameIndex = Math.round(
        START_FRAME + eased * (END_FRAME - START_FRAME)
      )

      if (frameIndex === currentFrameRef.current) return

      currentFrameRef.current = frameIndex
      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => drawFrame(frameIndex))
    })

    return () => unsubscribe()
  }, [scrollYProgress])

  useEffect(() => {
    const resize = () => drawFrame(currentFrameRef.current)
    window.addEventListener('resize', resize)
    window.addEventListener('orientationchange', resize)

    setTimeout(() => drawFrame(START_FRAME), 300)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('orientationchange', resize)
    }
  }, [])

  return (
    <section id="home" ref={sectionRef} className="hero-scroll-section">
      <div className="hero-sticky">
        <div className="hero-bg" />

        <img
          src={FRAME_PATH(START_FRAME)}
          alt=""
          className={`hero-fallback-img ${canvasReady ? 'is-ready' : ''}`}
        />

        <canvas ref={canvasRef} className="hero-canvas" />

        <motion.div
          className="hero-copy premium-hero-copy"
          style={{ opacity: titleOpacity, y: titleY }}
        >
          <p className="hero-kicker">Chennai born / crafted bold</p>

          <h1 className="font-display hero-title">
            UNDR CTRL
            <br />
            <span>BURGERS DONE DIFFERENTLY.</span>
          </h1>

          <p className="hero-sub">Fresh. Bold. Made in Chennai.</p>

          <div className="hero-actions">
            <button onClick={scrollToMenu} className="btn btn-light">
              View Menu <FiArrowRight />
            </button>

            <button onClick={scrollToLocation} className="btn btn-outline">
              Visit Store <FiMapPin />
            </button>
          </div>
        </motion.div>

        <motion.div className="hero-stage-copy" style={{ opacity: stageOpacity }}>
          <h2 className="font-display chrome-text">
            EVERY LAYER
            <br />
            UNDR CTRL
          </h2>
        </motion.div>

        <div className="hero-scroll-hint">
          <span />
          <p>Scroll</p>
        </div>
      </div>
    </section>
  )
}