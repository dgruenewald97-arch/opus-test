import { hero } from '../data/content.js'
import { HeroArt } from './Art.jsx'

export default function Hero() {
  return (
    <section className="hero shell section--plain" id="top" aria-labelledby="hero-title">
      <p className="kicker hero-kicker">{hero.kicker}</p>

      <div className="hero-grid">
        <h1 className="hero-masthead" id="hero-title">
          {hero.titleLines.map((line, i) => (
            <span className="line" key={i}>
              {line}
            </span>
          ))}
        </h1>

        <div className="hero-side">
          <p className="hero-lead">{hero.lead}</p>
          <div className="hero-actions">
            <a className="btn btn--accent" href={`#${hero.ctaPrimary.target}`}>
              {hero.ctaPrimary.label}
            </a>
            <a className="btn btn--ghost" href={`#${hero.ctaSecondary.target}`}>
              {hero.ctaSecondary.label}
            </a>
          </div>
        </div>
      </div>

      <figure className="hero-figure" aria-hidden="true">
        <HeroArt />
      </figure>

      <ul className="hero-stats">
        {hero.stats.map((s, i) => (
          <li key={i}>
            <span className="num">{s.value}</span>
            <span className="lbl">{s.label}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
