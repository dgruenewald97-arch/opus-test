import { faq as data } from '../data/content.js'

export default function FAQ() {
  return (
    <section className="section" id="faq" aria-labelledby="faq-title">
      <div className="shell">
        <header className="section-head">
          <p className="kicker">{data.kicker}</p>
          <h2 className="section-title" id="faq-title">
            {data.title}
          </h2>
        </header>

        <div className="faq-list">
          {data.items.map((item, i) => (
            <details className="faq-item" key={i}>
              <summary>
                {item.q}
                <span className="ic" aria-hidden="true" />
              </summary>
              <p className="answer">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
