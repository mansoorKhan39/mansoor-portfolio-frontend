import { useRef, useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Award, Sparkles, CheckCircle2 } from 'lucide-react'

export default function LanyardPortraitCard({
  portraitSrc = '/mansoor.png',
  name = 'Mansoor Ali Khan',
  title = 'Python Backend Engineer & AI Systems',
  university = 'COMSATS University Islamabad',
  degree = 'BS Software Engineering',
  className = '',
}) {
  const containerRef = useRef(null)
  const [isInteracted, setIsInteracted] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [wirePoints, setWirePoints] = useState({
    x1: 100,
    y1: 0,
    x2: 140,
    y2: 0,
    clipX: 120,
    clipY: 55,
  })

  // Framer Motion spring physics for realistic lanyard hanging
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)

  // Spring physics: realistic pendulum damping
  const springConfig = { stiffness: 220, damping: 14, mass: 1.1 }
  const x = useSpring(rawX, springConfig)
  const y = useSpring(rawY, springConfig)

  // Dynamic 3D tilt angles calculated from displacement
  const rotateZ = useTransform(x, [-120, 0, 120], [-18, 0, 18])
  const rotateX = useTransform(y, [-50, 0, 90], [14, 0, -18])
  const rotateY = useTransform(x, [-120, 0, 120], [-12, 0, 12])

  // Update SVG lanyard cord paths in real time while dragging or springing
  useEffect(() => {
    const unsubscribeX = x.on('change', (latestX) => {
      const latestY = y.get()
      setWirePoints((prev) => ({
        ...prev,
        clipX: 120 + latestX * 0.45,
        clipY: 55 + latestY * 0.65,
      }))
    })

    const unsubscribeY = y.on('change', (latestY) => {
      const latestX = x.get()
      setWirePoints((prev) => ({
        ...prev,
        clipX: 120 + latestX * 0.45,
        clipY: 55 + latestY * 0.65,
      }))
    })

    return () => {
      unsubscribeX()
      unsubscribeY()
    }
  }, [x, y])

  const handleDragStart = () => {
    setIsDragging(true)
    setIsInteracted(true)
  }

  const handleDragEnd = () => {
    setIsDragging(false)
    rawX.set(0)
    rawY.set(0)
  }

  return (
    <div
      ref={containerRef}
      className={`relative flex flex-col items-center select-none pt-2 pb-6 ${className}`}
      style={{ perspective: 1200 }}
    >
      {/* ── Fixed Wall Anchor Mount ── */}
      <div className="relative z-20 flex flex-col items-center">
        <div
          className="w-10 h-3 rounded-full border border-[var(--border-strong)] shadow-md flex items-center justify-center"
          style={{ backgroundColor: 'var(--bg-card-solid)' }}
        >
          <div className="w-4 h-1 rounded-full bg-[#c2a4ff]/60" />
        </div>
        <div className="w-1.5 h-2 bg-gradient-to-b from-[#8f74c7] to-[#513c7a] rounded-sm -mt-0.5" />
      </div>

      {/* ── Dynamic Hanging Lanyard Cords (SVG Canvas) ── */}
      <svg
        className="pointer-events-none absolute top-4 left-1/2 -translate-x-1/2 z-10 overflow-visible"
        width="240"
        height="80"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="lanyardStrap" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c2a4ff" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#7a5cb8" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#412f68" stopOpacity="0.9" />
          </linearGradient>
        </defs>

        {/* Left Strap */}
        <path
          d={`M ${wirePoints.x1} ${wirePoints.y1} Q ${(wirePoints.x1 + wirePoints.clipX) / 2 - 6} ${(wirePoints.y1 + wirePoints.clipY) / 2} ${wirePoints.clipX - 4} ${wirePoints.clipY}`}
          fill="none"
          stroke="url(#lanyardStrap)"
          strokeWidth="2.8"
          strokeLinecap="round"
        />

        {/* Right Strap */}
        <path
          d={`M ${wirePoints.x2} ${wirePoints.y2} Q ${(wirePoints.x2 + wirePoints.clipX) / 2 + 6} ${(wirePoints.y2 + wirePoints.clipY) / 2} ${wirePoints.clipX + 4} ${wirePoints.clipY}`}
          fill="none"
          stroke="url(#lanyardStrap)"
          strokeWidth="2.8"
          strokeLinecap="round"
        />

        {/* Metal Lanyard Swivel Clip */}
        <g transform={`translate(${wirePoints.clipX}, ${wirePoints.clipY})`}>
          <circle cx="0" cy="0" r="4.5" fill="#141018" stroke="#c2a4ff" strokeWidth="1.8" />
          <rect x="-3" y="3" width="6" height="7" rx="1.5" fill="#a892df" stroke="#141018" strokeWidth="0.8" />
          <path d="M -3 10 L 0 14 L 3 10 Z" fill="#c2a4ff" />
        </g>
      </svg>

      {/* ── Interactive Draggable Physics ID Badge Card ── */}
      <motion.div
        drag
        dragConstraints={{ left: -140, right: 140, top: -45, bottom: 85 }}
        dragElastic={0.45}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        style={{
          x,
          y,
          rotateZ,
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          cursor: isDragging ? 'grabbing' : 'grab',
        }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="relative z-20 mt-10 w-[295px] sm:w-[320px] rounded-3xl border border-[var(--border-strong)] p-5 shadow-2xl shadow-black/70 backdrop-blur-xl transition-shadow"
        css={{
          backgroundColor: 'var(--bg-card-solid)',
        }}
      >
        {/* Top Punch Hole for Clip */}
        <div className="mx-auto -mt-8 mb-4 w-12 h-3 rounded-full border border-[var(--border)] bg-[#110d14] flex items-center justify-center">
          <div className="w-5 h-1 rounded-full bg-white/20" />
        </div>

        {/* Lanyard Top Tag */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-[var(--border)] text-[10px] font-mono uppercase tracking-widest text-[var(--text-dim)]">
          <span className="flex items-center gap-1.5 text-[var(--accent)] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
            ENGINEERING ID
          </span>
          <span>#SE-2024-CUI</span>
        </div>

        {/* Portrait Image Frame */}
        <div className="relative aspect-[4/4.2] rounded-2xl overflow-hidden border border-[var(--border)] bg-[#0d0912] mb-4 group">
          <img
            src={portraitSrc}
            alt={name}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />

          {/* Cyber Vignette & Scanlines */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0b080c] via-transparent to-transparent opacity-80" />
          <div
            className="pointer-events-none absolute inset-0 opacity-15"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #c2a4ff 3px)',
            }}
          />

          {/* Floating Verified Badge */}
          <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between px-3 py-1.5 rounded-xl border border-[var(--border)] bg-[#110d14]/90 backdrop-blur-md text-[11px] font-mono">
            <span className="text-[var(--accent)] flex items-center gap-1 font-semibold">
              <CheckCircle2 size={13} /> Grounded AI
            </span>
            <span className="text-[var(--text-dim)]">COMSATS</span>
          </div>
        </div>

        {/* Name & Academic Credentials */}
        <div className="space-y-1.5 text-center">
          <h3 className="font-display font-bold text-lg text-[var(--text-primary)] tracking-wide">
            {name}
          </h3>
          <p className="font-mono text-xs text-[var(--accent)] font-medium">
            {title}
          </p>
          <p className="font-body text-xs text-[var(--text-muted)] pt-0.5">
            {degree} · {university}
          </p>
        </div>

        {/* Interactive Physics Hint Pill */}
        <div className="mt-4 pt-3 border-t border-[var(--border)] flex items-center justify-center gap-2">
          <span
            className="inline-flex items-center gap-1.5 text-[11px] font-mono px-3 py-1 rounded-full border border-[var(--border)] bg-[#141018] text-[var(--text-dim)] transition-colors"
          >
            <Sparkles size={11} className="text-[var(--accent)]" />
            {isDragging
              ? 'Release to test spring inertia'
              : isInteracted
              ? 'Elastic pendulum snap active'
              : 'Drag & pull badge to test physics'}
          </span>
        </div>
      </motion.div>
    </div>
  )
}
