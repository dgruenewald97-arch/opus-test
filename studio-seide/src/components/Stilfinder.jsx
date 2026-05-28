import { useState } from 'react'
import { stilfinder as data } from '../data/content.js'

export default function Stilfinder() {
  const total = data.questions.length
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [done, setDone] = useState(false)

  const current = data.questions[step]
  const picked = answers[current?.id]

  function choose(qid, value) {
    setAnswers((a) => ({ ...a, [qid]: value }))
  }

  function next() {
    if (step < total - 1) setStep((s) => s + 1)
    else setDone(true)
  }
  function back() {
    if (done) setDone(false)
    else if (step > 0) setStep((s) => s - 1)
  }
  function restart() {
    setAnswers({})
    setStep(0)
    setDone(false)
  }

  const result = done ? data.recommend(answers) : null

  return (
    <section className="section" id="stilfinder" aria-labelledby="finder-title">
      <div className="shell">
        <header className="section-head">
          <p className="kicker">{data.kicker}</p>
          <h2 className="section-title" id="finder-title">
            {data.title}
          </h2>
          <p className="section-intro">{data.intro}</p>
        </header>

        <div className="finder">
          <div className="finder-inner">
            {/* --- Left: the questionnaire ----------------------------------- */}
            <div className="finder-form">
              <div className="finder-progress" aria-hidden="true">
                {data.questions.map((_, i) => (
                  <span key={i} className={i <= (done ? total : step) ? 'on' : ''} />
                ))}
              </div>

              {!done ? (
                <fieldset key={current.id}>
                  <legend>{current.label}</legend>
                  <p className="sr-only" aria-live="polite">
                    Frage {step + 1} von {total}
                  </p>
                  <div className="opt-list" role="radiogroup" aria-label={current.label}>
                    {current.options.map((opt) => {
                      const checked = picked === opt.value
                      return (
                        <label className={`opt ${checked ? 'checked' : ''}`} key={opt.value}>
                          <input
                            type="radio"
                            name={current.id}
                            value={opt.value}
                            checked={checked}
                            onChange={() => choose(current.id, opt.value)}
                          />
                          <span>{opt.label}</span>
                        </label>
                      )
                    })}
                  </div>

                  <div className="finder-nav">
                    <button
                      type="button"
                      className="btn btn--ghost"
                      onClick={back}
                      disabled={step === 0}
                      style={step === 0 ? { opacity: 0.4, pointerEvents: 'none' } : undefined}
                    >
                      Zurück
                    </button>
                    <button type="button" className="btn" onClick={next} disabled={!picked}
                      style={!picked ? { opacity: 0.4, pointerEvents: 'none' } : undefined}>
                      {step < total - 1 ? 'Weiter' : 'Empfehlung zeigen'}
                    </button>
                  </div>
                </fieldset>
              ) : (
                <div>
                  <legend className="sr-only">Fertig</legend>
                  <p style={{ color: 'var(--muted)', marginBottom: '1rem' }}>
                    Danke! Auf Basis deiner Antworten empfehlen wir rechts einen Startpunkt.
                  </p>
                  <div className="finder-nav">
                    <button type="button" className="btn btn--ghost" onClick={back}>
                      Zurück
                    </button>
                    <button type="button" className="btn btn--ghost" onClick={restart}>
                      Neu starten
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* --- Right: live recommendation -------------------------------- */}
            <div className="finder-result" aria-live="polite">
              {result ? (
                <>
                  <span className="res-kicker">Unsere Empfehlung</span>
                  <h3>{result.service}</h3>
                  <p className="res-meta">
                    Bei <b style={{ color: '#fff' }}>{result.stylist}</b> · {result.timeNote}
                  </p>
                  <p className="res-why">{result.why}</p>
                  <a className="btn btn--accent" href="#kontakt">
                    Diesen Termin anfragen
                  </a>
                </>
              ) : (
                <>
                  <span className="res-kicker">Stilfinder</span>
                  <h3>Beantworte links drei kurze Fragen.</h3>
                  <p className="res-meta">
                    Wir schlagen dir eine passende Leistung und eine:n Stylist:in vor — ganz
                    unverbindlich.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
