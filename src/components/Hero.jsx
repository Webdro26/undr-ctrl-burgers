import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FiArrowRight, FiMapPin } from 'react-icons/fi'

const TOTAL_FRAMES = 300
const START_FRAME = 1
const END_FRAME = 115

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

  const titleOpacity = useTransform(scrollYProgress, [0, 0.38, 0.78], [1, 1, 0])
  const titleY = useTransform(scrollYProgress, [0, 0.78], [0, -45])

  const stageOpacity = useTransform(scrollYProgress, [0.1, 0.28, 0.9], [0, 1, 1])
  const stageY = useTransform(scrollYProgress, [0.1, 0.5], [20, 0])

  const scrollToMenu = () =>
    document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })

  const scrollToLocation = () =>
    document.getElementById('location')?.scrollIntoView({ behavior: 'smooth' })

  const drawFrame = (index) => {
    const canvas = canvasRef.current
    const img = framesRef.current[index]
    if (!canvas || !img) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const rect = canvas.getBoundingClientRect()

    canvas.width = Math.floor(rect.width * dpr)
    canvas.height = Math.floor(rect.height * dpr)

    const ctx = canvas.getContext('2d')
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.clearRect(0, 0, rect.width, rect.height)

    const iw = img.naturalWidth
    const ih = img.naturalHeight

    const isMobile = window.innerWidth < 768

    const baseScale = Math.max(rect.width / iw, rect.height / ih)
    const safeScale = isMobile ? 1.05 : 1.06

    const scale = baseScale * safeScale
    const sw = iw * scale
    const sh = ih * scale

    const dx = (rect.width - sw) / 2
    const dy = (rect.height - sh) / 2 - (isMobile ? 0 : 28)

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

    // Load first frame immediately
    loadFrame(START_FRAME).then(() => {
  if (cancelled) return

  framesRef.current = images
  currentFrameRef.current = START_FRAME

  setTimeout(() => {
    drawFrame(START_FRAME)
  }, 100)

  setTimeout(() => {
    drawFrame(START_FRAME)
  }, 400)
})

    // Then load important animation frames
    const priorityFrames = Array.from({ length: 130 }, (_, i) => i)

    Promise.all(priorityFrames.map(loadFrame)).then(() => {
      if (cancelled) return
      framesRef.current = images
      drawFrame(currentFrameRef.current)

      // Load remaining frames quietly
      Array.from({ length: TOTAL_FRAMES }, (_, i) => i)
        .filter((i) => !priorityFrames.includes(i))
        .forEach(loadFrame)
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

      rafRef.current = requestAnimationFrame(() => {
        drawFrame(frameIndex)
      })
    })

    return () => unsubscribe()
  }, [scrollYProgress])

  useEffect(() => {
    const resize = () => drawFrame(currentFrameRef.current)
    window.addEventListener('resize', resize)
    window.addEventListener('orientationchange', resize)
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
  className="hero-fallback-img"
/>

        <canvas ref={canvasRef} className="hero-canvas" />

        <motion.div
          className="hero-copy premium-hero-copy"
          style={{ opacity: titleOpacity, y: titleY }}
        >
          <motion.p
            className="hero-kicker"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Chennai born / crafted bold
          </motion.p>

          <motion.h1
            className="font-display hero-title"
            initial={{ opacity: 0, y: 35, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            UNDR CTRL
            <br />
            <span>BURGERS DONE DIFFERENTLY.</span>
          </motion.h1>

          <motion.p
            className="hero-sub"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.28 }}
          >
            Fresh. Bold. Made in Chennai.
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.42 }}
          >
            <button onClick={scrollToMenu} className="btn btn-light">
              View Menu <FiArrowRight />
            </button>

            <button onClick={scrollToLocation} className="btn btn-outline">
              Visit Store <FiMapPin />
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-stage-copy"
          style={{ opacity: stageOpacity, y: stageY }}
        >
          <h2 className="font-display chrome-text">
            EVERY LAYER
            <br />
            UNDER CTRL
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