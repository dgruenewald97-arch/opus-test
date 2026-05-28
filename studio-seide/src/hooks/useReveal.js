import { useEffect, useRef } from 'react'

// Scroll-reveal via IntersectionObserver — no animation library.
// Falls prefers-reduced-motion gesetzt ist oder IO fehlt, wird der Inhalt
// sofort sichtbar gemacht (graceful, niemals versteckt hängen bleiben).
export function useReveal(options = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduce || typeof IntersectionObserver === 'undefined') {
      el.classList.add('is-in')
      return
    }

    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in')
            obs.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px', ...options }
    )

    io.observe(el)
    return () => io.disconnect()
  }, [])

  return ref
}
