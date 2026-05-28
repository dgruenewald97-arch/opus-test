import { stimmen as data } from '../data/content.js'
import Reveal from './Reveal.jsx'

export default function Stimmen() {
  return (
    <section className="section" id="stimmen" aria-labelledby="stimmen-title">
      <div className="shell">
        <header className="section-head">
          <p className="kicker">{data.kicker}</p>
          <h2 className="section-title" id="stimmen-title">
            {data.title}
          </h2>
        </header>

        <div className="quotes">
          {data.quotes.map((q, i) => (
            <Reveal as="figure" className="quote" key={i} style={{ transitionDelay: `${(i % 2) * 90}ms` }}>
              <blockquote>{q.text}</blockquote>
              <figcaption className="cite">
                <b>{q.author}</b> — {q.meta}
              </figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
