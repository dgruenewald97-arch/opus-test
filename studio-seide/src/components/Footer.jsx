import { brand, footer, nav } from '../data/content.js'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer-top">
          <p className="footer-brand">
            STUDIO<br />
            <span>SEIDE</span>
          </p>

          <ul className="footer-links" aria-label="Seiten">
            {nav.map((n) => (
              <li key={n.id}>
                <a href={`#${n.id}`}>{n.label}</a>
              </li>
            ))}
          </ul>

          <ul className="footer-links" aria-label="Rechtliches & Social">
            {footer.social.map((s) => (
              <li key={s.label}>
                <a href={s.href}>{s.label} ↗</a>
              </li>
            ))}
            {footer.legalLinks.map((l) => (
              <li key={l}>
                <a href="#">{l}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-bottom">
          <span>
            © {year} {brand.name} — {brand.claim}, {brand.city}.
          </span>
          <span>{footer.credit}</span>
        </div>
      </div>
    </footer>
  )
}
