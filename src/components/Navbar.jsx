import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = ['Menu', 'About', 'Location', 'Contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    setMenuOpen(false)
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.nav
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55 }}
        className={`premium-navbar ${scrolled ? 'scrolled' : ''}`}
      >
        <button className="nav-logo-btn" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <img src="/images/logo/undr-ctrl-logo.jpeg" alt="Undr Ctrl" className="nav-logo-img" />
        </button>

        <div className="nav-right">
          <div className="nav-links">
            {links.map((l) => (
              <button key={l} onClick={() => scrollTo(l)}>
                {l}
              </button>
            ))}
          </div>

          <button onClick={() => scrollTo('Menu')} className="nav-order-btn">
            Order Now
          </button>
        </div>

        <button onClick={() => setMenuOpen(!menuOpen)} className="nav-mobile">
          <span />
          <span />
          <span />
        </button>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="mobile-menu-panel"
          >
            <img src="/images/logo/undr-ctrl-logo.jpeg" alt="Undr Ctrl" className="mobile-menu-logo" />

            {links.map((l) => (
              <button key={l} onClick={() => scrollTo(l)}>
                {l}
              </button>
            ))}

            <button onClick={() => scrollTo('Menu')} className="mobile-order-btn">
              Order Now
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}