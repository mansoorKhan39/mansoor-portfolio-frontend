import { useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Sparkles, Terminal, ShieldCheck } from 'lucide-react'

export default function HeroPortraitParallax({
  portraitSrc = '/mansoor.png',
  name = 'Mansoor Ali Khan',
  specialization = 'Python Backend Engineering & AI Systems',
  status = 'AVAILABLE FOR HIGH-IMPACT BACKEND ROLES',
}) {
  const prefersReducedMotion = useReducedMotion()
  const cardRef = useRef(null)
  const [coords, setCoords] = useState({ px: 0, py: 0, active: false })

  const handleMouseMove = (e) => {
    if (prefersReducedMotion) return
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    // Normalize coordinates from -1 to 1
    const px = ((e.clientX - rect.left) / rect.width - 0.5) * 2
    const py = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    setCoords({ px, py, active: true })
  }

  const handleMouseLeave = () => {
    setCoords({ px: 0, py: 0, active: false })
  }

  // Layer offsets for 2.5D holographic parallax illusion
  const bgX = -coords.px * 18
  const bgY = -coords.py * 16

  const midX = coords.px * 6
  const midY = coords.py * 6

  const fgX = coords.px * 24
  const fgY = coords.py * 20

  const rotY = coords.px * 9
  const rotX = -coords.py * 8

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[340px] sm:max-w-[370px] aspect-[4/5.2] select-none rounded-3xl p-1"
      style={{
        perspective: '1200px',
      }}
    >
      {/* ── Holographic 2.5D Multi-plane Stage ── */}
      <motion.div
        animate={{
          rotateX: prefersReducedMotion ? 0 : rotX,
          rotateY: prefersReducedMotion ? 0 : rotY,
          scale: coords.active ? 1.02 : 1.0,
        }}
        transition={{ type: 'spring', stiffness: 280, damping: 25 }}
        style={{
          transformStyle: 'preserve-3d',
          backgroundColor: 'var(--bg-card-solid)',
        }}
        className="relative w-full h-full rounded-3xl border border-[var(--border-strong)] overflow-hidden shadow-2xl shadow-black/80 flex flex-col justify-between p-6"
      >
        {/* ── LAYER 1 (Deep Background: Crossed Lilac X Beams + Cyber Grid) ── */}
        <motion.div
          animate={{
            x: prefersReducedMotion ? 0 : bgX,
            y: prefersReducedMotion ? 0 : bgY,
          }}
          transition={{ type: 'spring', stiffness: 220, damping: 24 }}
          style={{ transform: 'translateZ(-30px)' }}
          className="pointer-events-none absolute inset-0 overflow-hidden"
          aria-hidden="true"
        >
          {/* Diagonal Crossed Glowing Lilac X Beams */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-12 bg-gradient-to-r from-transparent via-[#c2a4ff]/25 to-transparent blur-md"
            style={{ transform: 'translate(-50%, -50%) rotate(42deg)' }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-12 bg-gradient-to-r from-transparent via-[#c2a4ff]/25 to-transparent blur-md"
            style={{ transform: 'translate(-50%, -50%) rotate(-42deg)' }}
          />
          {/* Ambient Cyber Dot Grid */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'radial-gradient(#c2a4ff 1px, transparent 1px)',
              backgroundSize: '16px 16px',
            }}
          />
        </motion.div>

        {/* ── LAYER 2 (Midground: Glass Frame, Technical Crosshairs & Header) ── */}
        <motion.div
          animate={{
            x: prefersReducedMotion ? 0 : midX,
            y: prefersReducedMotion ? 0 : midY,
          }}
          transition={{ type: 'spring', stiffness: 260, damping: 26 }}
          style={{ transform: 'translateZ(0px)' }}
          className="relative z-10 flex items-center justify-between border-b border-[var(--border)] pb-3 text-[11px] font-mono"
        >
          <div className="flex items-center gap-2 text-[var(--accent)] font-semibold">
            <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-ping" />
            <span>CORE SPEC</span>
          </div>
          <span className="text-[var(--text-dim)] flex items-center gap-1">
            <ShieldCheck size={12} className="text-[#f5c26b]" /> VERIFIED 2026
          </span>
        </motion.div>

        {/* ── LAYER 3 (Foreground: 3D Floating Portrait & Holographic Badge) ── */}
        <motion.div
          animate={{
            x: prefersReducedMotion ? 0 : fgX,
            y: prefersReducedMotion ? 0 : fgY,
            scale: coords.active ? 1.04 : 1.0,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
          style={{ transform: 'translateZ(36px)' }}
          className="relative z-20 my-auto flex flex-col items-center"
        >
          {/* Portrait Image with Cyber Ring Halo */}
          <div className="relative w-44 h-44 sm:w-48 sm:h-48 rounded-2xl overflow-hidden border-2 border-[var(--border-strong)] bg-[#0d0912] shadow-2xl shadow-purple-950/40 group">
            <img
              src={portraitSrc}
              alt={name}
              className="w-full h-full object-cover object-top filter contrast-[1.05]"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
            />

            {/* Glowing Corner Accents */}
            <div className="absolute top-1 left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-[var(--accent)]" />
            <div className="absolute top-1 right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-[var(--accent)]" />
            <div className="absolute bottom-1 left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-[var(--accent)]" />
            <div className="absolute bottom-1 right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-[var(--accent)]" />

            {/* Subtle Gradient Fog */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0b080c] via-transparent to-transparent opacity-60" />
          </div>

          {/* Floating Pill on Portrait */}
          <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[var(--border-strong)] bg-[#110d14]/90 backdrop-blur-md text-[11px] font-mono text-[var(--accent)]">
            <Terminal size={12} />
            <span>{specialization}</span>
          </div>
        </motion.div>

        {/* ── LAYER 4 (Footer Status & Cursor-Following Spotlight) ── */}
        <motion.div
          animate={{
            x: prefersReducedMotion ? 0 : midX,
            y: prefersReducedMotion ? 0 : midY,
          }}
          transition={{ type: 'spring', stiffness: 260, damping: 26 }}
          style={{ transform: 'translateZ(15px)' }}
          className="relative z-10 pt-3 border-t border-[var(--border)] text-center"
        >
          <p className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-dim)] flex items-center justify-center gap-1.5">
            <Sparkles size={11} className="text-[#f5c26b]" />
            {status}
          </p>
        </motion.div>

        {/* Cursor-Following Lens Glare */}
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl transition-opacity duration-300"
          style={{
            opacity: coords.active ? 1 : 0,
            background: `radial-gradient(400px circle at ${(coords.px + 1) * 50}% ${(coords.py + 1) * 50}%, rgba(194, 164, 255, 0.12), transparent 70%)`,
          }}
        />
      </motion.div>
    </div>
  )
}
