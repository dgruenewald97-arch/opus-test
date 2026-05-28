import { useEffect, useState } from 'react'
import { brand, nav } from '../data/content.js'

export default function Nav() {
  const [open, setOpen] = useState(false)

  // Close the mobile menu on Escape for keyboard users.
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="site-header">
      <div className="shell">
        <nav className="nav" data-open={open} aria-label="Hauptnavigation">
          <a className="brandmark" href="#top" onClick={() => setOpen(false)}>
            STUDIO&nbsp;<span>SEIDE</span>
          </a>

          <button
            className="nav-toggle"
            aria-expanded={open}
            aria-controls="primary-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Menü {open ? 'schließen' : 'öffnen'}</span>
            {open ? '✕' : '☰'}
          </button>

          <ul className="nav-links" id="primary-nav">
            {nav.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} onClick={() => setOpen(false)}>
                  {item.label}
                </a>
              </li>
            ))}
            <li className="nav-cta">
              <a className="btn btn--accent" href="#kontakt" onClick={() => setOpen(false)}>
                Termin
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
