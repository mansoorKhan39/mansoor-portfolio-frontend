import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

export default function PreloaderIntro() {
  const prefersReducedMotion = useReducedMotion()
  const [visible, setVisible] = useState(() => {
    try {
      return !sessionStorage.getItem('portfolio_intro_seen')
    } catch {
      return false
    }
  })
  const [percent, setPercent] = useState(0)

  useEffect(() => {
    if (!visible) return
    if (prefersReducedMotion) {
      setVisible(false)
      try {
        sessionStorage.setItem('portfolio_intro_seen', '1')
      } catch {}
      return
    }

    let current = 0
    const interval = setInterval(() => {
      current = Math.min(100, current + (current < 65 ? 9 : 14))
      setPercent(current)
      if (current >= 100) {
        clearInterval(interval)
        setTimeout(() => {
          setVisible(false)
          try {
            sessionStorage.setItem('portfolio_intro_seen', '1')
          } catch {}
        }, 220)
      }
    }, 45)

    return () => clearInterval(interval)
  }, [visible, prefersReducedMotion])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] bg-[#0b080c] flex flex-col justify-between p-8 md:p-12 select-none"
        >
          <div className="flex items-start justify-between">
            <span className="font-display font-bold text-6xl md:text-8xl tabular-nums leading-none text-[#eae5ec]">
              {percent}
              <span style={{ color: '#c2a4ff' }} className="text-3xl md:text-5xl ml-1">%</span>
            </span>
            <button
              type="button"
              onClick={() => {
                setVisible(false)
                try {
                  sessionStorage.setItem('portfolio_intro_seen', '1')
                } catch {}
              }}
              className="font-mono text-xs uppercase tracking-widest text-[#9287a0] hover:text-[#eae5ec] transition-colors"
            >
              Skip →
            </button>
          </div>

          <div className="text-center space-y-2">
            <p className="font-mono text-xs md:text-sm uppercase tracking-[0.35em] text-[#c6bdd1]">
              EVERY SYSTEM ENGINEERED FOR RELIABILITY
            </p>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em]" style={{ color: '#c2a4ff' }}>
              Mansoor Ali Khan · Portfolio
            </p>
          </div>

          <div className="w-full h-[2px] bg-white/10 overflow-hidden rounded-full">
            <div
              className="h-full transition-all duration-75"
              style={{
                width: `${percent}%`,
                backgroundColor: '#c2a4ff',
                boxShadow: '0 0 18px #c2a4ff',
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
