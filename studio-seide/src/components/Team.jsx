import { team as data } from '../data/content.js'
import Reveal from './Reveal.jsx'
import { AvatarArt } from './Art.jsx'

export default function Team() {
  return (
    <section className="section" id="team" aria-labelledby="team-title">
      <div className="shell">
        <header className="section-head">
          <p className="kicker">{data.kicker}</p>
          <h2 className="section-title" id="team-title">
            {data.title}
          </h2>
          <p className="section-intro">{data.intro}</p>
        </header>

        <div className="team-grid">
          {data.members.map((m, i) => (
            <Reveal as="article" className="member" key={m.name} style={{ transitionDelay: `${(i % 3) * 70}ms` }}>
              <div aria-hidden="true">
                <AvatarArt tone={m.tone} initials={m.initials} />
              </div>
              <div className="body">
                <h3 className="name">{m.name}</h3>
                <p className="role">{m.role}</p>
                <p className="focus">{m.focus}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
