import { leistungen as data } from '../data/content.js'
import Reveal from './Reveal.jsx'

export default function Leistungen() {
  return (
    <section className="section" id="leistungen" aria-labelledby="leistungen-title">
      <div className="shell">
        <header className="section-head">
          <p className="kicker">{data.kicker}</p>
          <h2 className="section-title" id="leistungen-title">
            {data.title}
          </h2>
          <p className="section-intro">{data.intro}</p>
        </header>

        <div className="svc-grid">
          {data.groups.map((group, gi) => (
            <Reveal as="div" className="svc-group" key={group.name} style={{ transitionDelay: `${gi * 80}ms` }}>
              <h3>
                {group.name}
                <span>0{gi + 1}</span>
              </h3>
              {group.items.map((item) => (
                <div className="svc-item" key={item.title}>
                  <span className="t">{item.title}</span>
                  <span className="p">{item.price}</span>
                  <span className="d">{item.desc}</span>
                </div>
              ))}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
