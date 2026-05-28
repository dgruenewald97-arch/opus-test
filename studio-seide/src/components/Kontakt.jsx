import { kontakt as data } from '../data/content.js'
import Reveal from './Reveal.jsx'
import { MapArt } from './Art.jsx'

export default function Kontakt() {
  return (
    <section className="section" id="kontakt" aria-labelledby="kontakt-title">
      <div className="shell">
        <header className="section-head">
          <p className="kicker">{data.kicker}</p>
          <h2 className="section-title" id="kontakt-title">
            {data.title}
          </h2>
          <p className="section-intro">{data.note}</p>
        </header>

        <div className="contact-grid">
          <Reveal as="div" className="contact-card">
            <div className="contact-row">
              <span className="lbl">Adresse</span>
              <address style={{ fontStyle: 'normal' }}>
                {data.address.map((l, i) => (
                  <div key={i}>{l}</div>
                ))}
              </address>
            </div>
            <div className="contact-row">
              <span className="lbl">Telefon</span>
              <a href={`tel:${data.phone.replace(/\s/g, '')}`}>{data.phone}</a>
            </div>
            <div className="contact-row">
              <span className="lbl">E-Mail</span>
              <a href={`mailto:${data.email}`}>{data.email}</a>
            </div>
            <div className="contact-row">
              <span className="lbl">Öffnungszeiten</span>
              <ul className="hours">
                {data.hours.map((h, i) => (
                  <li key={i}>
                    <span className="day">{h.day}</span>
                    <span>{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>
            <a className="btn btn--accent" href={`mailto:${data.email}?subject=Terminanfrage`}>
              Termin per E-Mail anfragen
            </a>
          </Reveal>

          <Reveal as="figure" className="map-figure" style={{ transitionDelay: '120ms' }}>
            <MapArt />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
