import { useReveal } from '../hooks/useReveal.js'

// Thin wrapper that fades/raises its children into view on scroll.
// `as` lets us keep semantic tags (section, article, li …).
export default function Reveal({ as: Tag = 'div', className = '', style, children, ...rest }) {
  const ref = useReveal()
  return (
    <Tag ref={ref} className={`reveal ${className}`.trim()} style={style} {...rest}>
      {children}
    </Tag>
  )
}
