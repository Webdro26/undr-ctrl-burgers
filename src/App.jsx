import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Menu from './components/Menu'
import About from './components/About'
import { Instagram, Location, Contact, Footer } from './components/Sections'

const TICKER = [
  'OG SMASH BURGER','OKLAHOMA ONION','SWISS CHEESE',
  'RED DRAGON','PINEAPPLE CANDY','BHUT JOLOKIA',
  'KING LOADED FRIES','CHOCO BROWNIE SHAKE',
]

export default function App() {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <Marquee items={TICKER} />
        <Marquee items={['FRESH DAILY','HAND-PRESSED','IN-HOUSE SAUCES','MADE IN CHENNAI','NO SHORTCUTS','ONLY STANDARDS']} />
        <Menu />
        <About />
        <Instagram />
        <Location />
        <Contact />
      </main>

      <Footer />

      <AnimatePresence>
        {!loaded && <Loader onComplete={() => setLoaded(true)} />}
      </AnimatePresence>
    </>
  )
}