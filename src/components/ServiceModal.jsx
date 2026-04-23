import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import './ServiceModal.css'

export default function ServiceModal({ service, onClose }) {
  const dialogRef = useRef(null)

  /* Focus first focusable element when modal opens */
  useEffect(() => {
    if (!service) return
    const el = dialogRef.current
    if (!el) return

    const prev = document.activeElement
    const focusable = el.querySelectorAll(
      'button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])'
    )
    focusable[0]?.focus()

    /* Lock body scroll */
    document.body.style.overflow = 'hidden'

    /* Focus trap */
    function trapFocus(e) {
      if (e.key !== 'Tab') return
      const first = focusable[0]
      const last  = focusable[focusable.length - 1]
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last?.focus() }
      } else {
        if (document.activeElement === last)  { e.preventDefault(); first?.focus() }
      }
    }

    document.addEventListener('keydown', trapFocus)
    return () => {
      document.removeEventListener('keydown', trapFocus)
      document.body.style.overflow = ''
      prev?.focus()
    }
  }, [service])

  /* Close on ESC */
  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  if (!service) return null

  return createPortal(
    <div
      className="modal-backdrop"
      role="presentation"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div
        ref={dialogRef}
        className="modal-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="modal-header">
          <div className="modal-icon" aria-hidden="true">
            <i className={service.icon} />
          </div>
          <h2 id="modal-title">{service.title}</h2>
          <button
            className="modal-close"
            onClick={onClose}
            aria-label="Close dialog"
          >
            <i className="fa-solid fa-xmark" />
          </button>
        </div>

        <p className="modal-body">{service.detail}</p>

        <div className="modal-footer">
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLScrRgv5In0vBZ8evR5dWAn5iG9RBrJj6JnEGplL6pCb-TF68A/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Get Started →
          </a>
          <button className="btn btn-outline" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>,
    document.body
  )
}
