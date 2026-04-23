import { useReveal } from '../hooks/useReveal'
import './ServiceCard.css'

export default function ServiceCard({ service, onOpen, delay = 0 }) {
  const [ref, revealed] = useReveal()

  return (
    <div
      ref={ref}
      className={['svc-card', revealed && 'revealed'].filter(Boolean).join(' ')}
      style={{ transitionDelay: revealed ? `${delay}ms` : '0ms' }}
      role="button"
      tabIndex={0}
      aria-haspopup="dialog"
      onClick={() => onOpen(service)}
      onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), onOpen(service))}
    >
      <div className="svc-icon" aria-hidden="true">
        <i className={service.icon} />
      </div>
      <h3>{service.title}</h3>
      <p>{service.tagline}</p>
      <span className="svc-learn" aria-hidden="true">Learn more →</span>
    </div>
  )
}
