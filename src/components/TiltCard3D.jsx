import { useRef, useState } from 'react'

export default function TiltCard3D({ children, className = '', maxTilt = 6, style = {} }) {
  const cardRef = useRef(null)
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, gx: 50, gy: 50, active: false })

  const handleMouseMove = (e) => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    const ry = (px - 0.5) * maxTilt * 2
    const rx = -(py - 0.5) * maxTilt * 2
    setTilt({ rx, ry, gx: px * 100, gy: py * 100, active: true })
  }

  const handleMouseLeave = () => {
    setTilt({ rx: 0, ry: 0, gx: 50, gy: 50, active: false })
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative transition-transform duration-200 ease-out will-change-transform ${className}`}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translateY(${tilt.active ? -3 : 0}px)`,
        ...style,
      }}
    >
      {/* Subtle cursor-following workbench spotlight */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-200"
        style={{
          opacity: tilt.active ? 1 : 0,
          background: `radial-gradient(420px circle at ${tilt.gx}% ${tilt.gy}%, rgba(52, 211, 153, 0.11), rgba(251, 191, 36, 0.04) 44%, transparent 72%)`,
        }}
      />
      {children}
    </div>
  )
}
