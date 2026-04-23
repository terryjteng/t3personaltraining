import { useEffect } from 'react'

export default function ScrollProgress() {
  useEffect(() => {
    const bar = document.getElementById('scroll-progress')
    if (!bar) return

    function update() {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement
      const pct = scrollHeight === clientHeight
        ? 0
        : (scrollTop / (scrollHeight - clientHeight)) * 100
      bar.style.width = `${pct}%`
    }

    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update, { passive: true })
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return <div id="scroll-progress" aria-hidden="true" />
}
