import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)

  useEffect(() => {
    const isTouchOrSmall = window.innerWidth < 1024 || window.matchMedia?.('(pointer: coarse)').matches
    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (isTouchOrSmall || reducedMotion) return

    const dotEl = dotRef.current
    const ringEl = ringRef.current
    if (!dotEl || !ringEl) return

    const mousePos = { x: -100, y: -100 }
    const ringPos = { x: -100, y: -100 }
    let rafId = 0

    const onMove = (e) => {
      mousePos.x = e.clientX
      mousePos.y = e.clientY

      dotEl.style.transform = `translate3d(${mousePos.x}px, ${mousePos.y}px, 0)`

      const target = e.target
      const isInteractive = target?.closest?.('button, a, input, textarea, select, [role="button"], .interactive')
      setIsHovered(!!isInteractive)
    }

    const onDown = () => setIsClicked(true)
    const onUp = () => setIsClicked(false)
    const onLeave = () => {
      dotEl.style.opacity = '0'
      ringEl.style.opacity = '0'
    }
    const onEnter = () => {
      dotEl.style.opacity = '1'
      ringEl.style.opacity = '1'
    }

    // Ultra-fluid spring interpolation for trailing liquid ring
    const loop = () => {
      ringPos.x += (mousePos.x - ringPos.x) * 0.18
      ringPos.y += (mousePos.y - ringPos.y) * 0.18

      // Subtle dynamic stretch based on velocity
      const dx = mousePos.x - ringPos.x
      const dy = mousePos.y - ringPos.y
      const vel = Math.min(Math.sqrt(dx * dx + dy * dy) * 0.005, 0.35)
      const angle = Math.atan2(dy, dx)

      ringEl.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) rotate(${angle}rad) scale(${1 + vel}, ${1 - vel * 0.5})`
      rafId = requestAnimationFrame(loop)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)
    rafId = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
    }
  }, [])

  return (
    <>
      {/* Precision Inner Glowing Core */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[100] -ml-1 -mt-1 w-2 h-2 rounded-full bg-[#c2a4ff] shadow-[0_0_12px_#c2a4ff] transition-opacity duration-200 hidden lg:block"
        style={{ willChange: 'transform' }}
        aria-hidden="true"
      />

      {/* Trailing Fluid Liquid Aura */}
      <div
        ref={ringRef}
        className={`pointer-events-none fixed top-0 left-0 z-[99] rounded-full border transition-[width,height,margin,background-color,border-color] duration-300 ease-out hidden lg:block ${
          isClicked
            ? '-ml-5 -mt-5 w-10 h-10 border-[#f5c26b] bg-[#f5c26b]/20 backdrop-blur-[1px] shadow-[0_0_25px_rgba(245,194,107,0.4)]'
            : isHovered
            ? '-ml-7 -mt-7 w-14 h-14 border-[#c2a4ff]/60 bg-[#c2a4ff]/15 backdrop-blur-[2px] shadow-[0_0_30px_rgba(194,164,255,0.35)]'
            : '-ml-4 -mt-4 w-8 h-8 border-[#c2a4ff]/30 bg-[#c2a4ff]/5 backdrop-blur-[0.5px] shadow-[0_0_15px_rgba(194,164,255,0.15)]'
        }`}
        style={{ willChange: 'transform' }}
        aria-hidden="true"
      />
    </>
  )
}
