import { useEffect } from 'react'
import Nav from './components/Nav.jsx'
import ReadingProgress from './components/ReadingProgress.jsx'
import Hero from './components/Hero.jsx'
import Leistungen from './components/Leistungen.jsx'
import Philosophie from './components/Philosophie.jsx'
import Lookbook from './components/Lookbook.jsx'
import Team from './components/Team.jsx'
import Stimmen from './components/Stimmen.jsx'
import Stilfinder from './components/Stilfinder.jsx'
import FAQ from './components/FAQ.jsx'
import Kontakt from './components/Kontakt.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  // Smooth-scroll ONLY for in-page anchor clicks (nav, CTAs, footer).
  // Wheel/trackpad scrolling stays native 1:1 — no global scroll-behavior.
  useEffect(() => {
    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]')
      if (!a) return
      const id = a.getAttribute('href').slice(1)
      if (!id) return
      const target = document.getElementById(id)
      if (!target) return
      e.preventDefault()
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
      history.replaceState(null, '', `#${id}`)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  return (
    <>
      <a className="skip-link" href="#main">
        Zum Inhalt springen
      </a>
      <ReadingProgress />
      <Nav />
      <main id="main">
        <Hero />
        <Leistungen />
        <Philosophie />
        <Lookbook />
        <Team />
        <Stimmen />
        <Stilfinder />
        <FAQ />
        <Kontakt />
      </main>
      <Footer />
    </>
  )
}
