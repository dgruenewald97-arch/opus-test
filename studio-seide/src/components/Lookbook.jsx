import { lookbook as data } from '../data/content.js'
import Reveal from './Reveal.jsx'
import { PlateArt } from './Art.jsx'

export default function Lookbook() {
  return (
    <section className="section" id="lookbook" aria-labelledby="lookbook-title">
      <div className="shell">
        <header className="section-head">
          <p className="kicker">{data.kicker}</p>
          <h2 className="section-title" id="lookbook-title">
            {data.title}
          </h2>
          <p className="section-intro">{data.intro}</p>
        </header>

        <div className="plates">
          {data.plates.map((plate, i) => (
            <Reveal
              as="figure"
              className="plate"
              key={plate.id}
              style={{ transitionDelay: `${(i % 3) * 70}ms` }}
            >
              <div aria-hidden="true">
                <PlateArt tone={plate.tone} seed={plate.id} />
              </div>
              <figcaption>
                <span>{plate.name}</span>
                <span className="tag">{plate.tag}</span>
              </figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
