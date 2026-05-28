import { philosophie as data } from '../data/content.js'
import Reveal from './Reveal.jsx'

export default function Philosophie() {
  return (
    <section className="section" id="philosophie" aria-labelledby="philo-title">
      <div className="shell">
        <header className="section-head">
          <p className="kicker">{data.kicker}</p>
          <h2 className="section-title" id="philo-title">
            {data.title}
          </h2>
        </header>

        <div className="philo-grid">
          <Reveal as="div" className="philo-body">
            {data.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </Reveal>

          <Reveal as="ul" className="pillars" style={{ transitionDelay: '120ms' }}>
            {data.pillars.map((pl) => (
              <li className="pillar" key={pl.title}>
                <h4>{pl.title}</h4>
                <p>{pl.text}</p>
              </li>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
