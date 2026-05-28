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
