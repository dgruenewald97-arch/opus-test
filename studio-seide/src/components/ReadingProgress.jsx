import { useEffect, useRef } from 'react'

// Thin top progress bar. Hidden entirely under prefers-reduced-motion (CSS).
// Writes the scroll ratio straight to the element's --p custom property via a
// ref so it never triggers a React re-render while scrolling (which would
// reconcile 60x/second and cause jank).
export default function ReadingProgress() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const h = document.documentElement
        const max = h.scrollHeight - h.clientHeight
        const ratio = max > 0 ? h.scrollTop / max : 0
        el.style.setProperty('--p', ratio.toFixed(4))
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return <div className="progress" ref={ref} aria-hidden="true" />
}
