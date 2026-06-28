import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const progressTimer = setInterval(() => {
      setProgress((p) => (p >= 100 ? 100 : p + 3.5))
    }, 26)

    const doneTimer = setTimeout(() => {
      onComplete?.()
    }, 2200)

    return () => {
      clearInterval(progressTimer)
      clearTimeout(doneTimer)
    }
  }, [onComplete])

  return (
    <AnimatePresence>
      <motion.div
        className="premium-loader logo-loader"
        initial={{ opacity: 1 }}
        exit={{
          opacity: 0,
          scale: 1.04,
          filter: 'blur(14px)',
          transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
        }}
      >
        <div className="logo-loader-bg" />

        <motion.div
          className="logo-loader-mark"
          initial={{ opacity: 0, scale: 0.82, filter: 'blur(18px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <img src="/images/logo/undr-ctrl-logo.jpeg" alt="UNDR CTRL" />
          <span className="logo-shine" />
        </motion.div>

        <motion.p
          className="logo-loader-text"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.6 }}
        >
          BURGERS DONE DIFFERENTLY
        </motion.p>

        <div className="loader-line">
          <i style={{ width: `${progress}%` }} />
        </div>
      </motion.div>
    </AnimatePresence>
  )
}