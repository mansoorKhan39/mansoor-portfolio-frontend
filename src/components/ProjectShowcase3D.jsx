import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Github,
  BookOpen,
  Layers,
  Box,
  LayoutGrid,
  Lock,
  Radio,
  Sparkles,
} from 'lucide-react'
import ProjectCard from './ProjectCard'

const CATEGORIES = [
  { id: 'all', label: 'All Systems' },
  { id: 'backend-ai', label: 'Backend & AI' },
  { id: 'fullstack', label: 'Full-Stack' },
  { id: 'data', label: 'Data & Analytics' },
]

function matchesCategory(project, catId) {
  if (catId === 'all') return true
  const text = `${project.title} ${project.subtitle} ${(project.techStack || []).join(' ')}`.toLowerCase()
  if (catId === 'backend-ai') {
    return text.includes('fastapi') || text.includes('gemini') || text.includes('ai') || text.includes('python') || text.includes('codemind')
  }
  if (catId === 'fullstack') {
    return text.includes('flutter') || text.includes('fixonway') || text.includes('exclusive') || text.includes('mern') || text.includes('react')
  }
  if (catId === 'data') {
    return text.includes('truthpulse') || text.includes('datask') || text.includes('nlp') || text.includes('sentimart') || text.includes('pandas')
  }
  return true
}

export default function ProjectShowcase3D({ projects = [], onInspect }) {
  const prefersReducedMotion = useReducedMotion()
  const [activeCategory, setActiveCategory] = useState('all')
  const [viewMode, setViewMode] = useState('3d') // '3d' | 'bento'
  const [activeIndex, setActiveIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640)
    handleResize()
    window.addEventListener('resize', handleResize, { passive: true })
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Filter projects by category
  const filteredProjects = projects.filter((p) => matchesCategory(p, activeCategory))
  const count = filteredProjects.length
  const safeIndex = count > 0 ? Math.min(activeIndex, count - 1) : 0

  // Reset active index when category changes
  useEffect(() => {
    setActiveIndex(0)
  }, [activeCategory])

  const step = (dir) => {
    if (count === 0) return
    setActiveIndex((safeIndex + dir + count) % count)
  }

  const activeProject = filteredProjects[safeIndex]

  return (
    <div className="space-y-6">
      {/* ── Top Toolbar: Category Filters + View Mode Switcher ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[var(--border)]">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isSelected = activeCategory === cat.id
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`relative px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all whitespace-nowrap ${
                  isSelected
                    ? 'text-[var(--accent)] font-semibold border border-[#c2a4ff]/40 shadow-sm shadow-purple-950/40'
                    : 'text-[var(--text-dim)] hover:text-zinc-200 border border-transparent'
                }`}
                style={{
                  backgroundColor: isSelected ? '#191122' : 'transparent',
                }}
              >
                {cat.label}
              </button>
            )
          })}
        </div>

        {/* View Mode Toggle Switch */}
        <div className="flex items-center gap-1 p-1 rounded-xl border border-[var(--border)] bg-[#110d14] shrink-0 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setViewMode('3d')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
              viewMode === '3d'
                ? 'bg-[#1e1528] text-[var(--accent)] border border-[#c2a4ff]/40 font-semibold shadow-inner'
                : 'text-[var(--text-dim)] hover:text-zinc-200'
            }`}
          >
            <Box size={13} />
            <span>3D Horizon</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('bento')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
              viewMode === 'bento'
                ? 'bg-[#1e1528] text-[var(--accent)] border border-[#c2a4ff]/40 font-semibold shadow-inner'
                : 'text-[var(--text-dim)] hover:text-zinc-200'
            }`}
          >
            <LayoutGrid size={13} />
            <span>Bento Deck</span>
          </button>
        </div>
      </div>

      {/* ── Empty State Fallback ── */}
      {count === 0 ? (
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card-solid)] p-12 text-center">
          <p className="font-mono text-xs text-[var(--text-dim)]">
            No projects in this category yet.
          </p>
        </div>
      ) : viewMode === '3d' ? (
        /* ── 3D HORIZON STAGE (100% Rigid CSS 3D Transforms — Zero Floating Icons) ── */
        <div className="space-y-4">
          <div
            ref={containerRef}
            className="relative h-[480px] sm:h-[510px] w-full flex items-center justify-center overflow-hidden rounded-3xl border border-[var(--border)] p-4 sm:p-6"
            style={{
              perspective: '1400px',
              background:
                'radial-gradient(circle at 50% 40%, rgba(194, 164, 255, 0.12), rgba(11, 8, 12, 0.98) 70%)',
            }}
          >
            {/* Perspective Horizon Floor Ring */}
            <div
              className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 w-[85%] h-20 rounded-[100%] border border-[#c2a4ff]/20 opacity-40 blur-[0.5px]"
              style={{ transform: 'translateX(-50%) rotateX(76deg)' }}
              aria-hidden="true"
            />

            {/* 3D Curved Arc Cards Deck */}
            <div
              className="relative w-full max-w-5xl h-[420px] flex items-center justify-center"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {filteredProjects.map((project, idx) => {
                let offset = idx - safeIndex
                if (count > 2) {
                  if (offset > count / 2) offset -= count
                  if (offset < -count / 2) offset += count
                }

                const absOffset = Math.abs(offset)
                if (absOffset > 2) return null

                const isCenter = offset === 0
                const translateX = offset * (isMobile ? 220 : 310)
                const translateZ = isCenter ? 75 : -absOffset * 150
                const rotateY = offset * -28
                const scale = isCenter ? 1.0 : absOffset === 1 ? 0.85 : 0.72
                const opacity = isCenter ? 1.0 : absOffset === 1 ? 0.65 : 0.3

                const isDone = (project.status || '').toLowerCase().includes('completed')
                const isInProg = (project.status || '').toLowerCase().includes('progress')

                return (
                  <motion.article
                    key={project._id || project.title || idx}
                    onClick={() => (isCenter ? onInspect?.(project) : setActiveIndex(idx))}
                    initial={false}
                    animate={{
                      x: translateX,
                      z: translateZ,
                      rotateY: prefersReducedMotion ? 0 : rotateY,
                      scale,
                      opacity,
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 270,
                      damping: 28,
                    }}
                    style={{
                      zIndex: 30 - absOffset * 10,
                      transformStyle: 'preserve-3d',
                      backgroundColor: 'var(--bg-card-solid)',
                      borderColor: isCenter ? '#c2a4ff' : 'var(--border)',
                      boxShadow: isCenter
                        ? '0 24px 70px -15px rgba(194, 164, 255, 0.35)'
                        : '0 16px 40px -10px rgba(0,0,0,0.8)',
                    }}
                    className={`absolute w-[86vw] max-w-[340px] sm:w-[350px] md:w-[380px] rounded-2xl border overflow-hidden cursor-pointer select-none transition-colors ${
                      isCenter ? 'ring-1 ring-[#c2a4ff]/50' : 'hover:border-zinc-500'
                    }`}
                  >
                    {/* Top Image Preview Banner */}
                    <div className="relative h-44 bg-black border-b border-[var(--border)] overflow-hidden">
                      {project.imageUrl ? (
                        <img
                          src={project.imageUrl}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center gap-1.5 bg-gradient-to-br from-[#1d1428] via-[#0b080c] to-[#120d18]">
                          <Layers size={26} className="text-[var(--accent)] opacity-80" />
                          <span className="font-display font-semibold text-xs text-[var(--text-primary)]">
                            {project.title}
                          </span>
                        </div>
                      )}

                      {/* Vignette */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

                      {/* Top Chips */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono pointer-events-none">
                        <span className="px-2 py-0.5 rounded-md border border-white/10 bg-black/80 backdrop-blur-md text-[var(--accent)] font-bold">
                          0{idx + 1}
                        </span>
                        <span
                          className={`px-2.5 py-0.5 rounded-full border text-[10px] backdrop-blur-md flex items-center gap-1.5 ${
                            isInProg
                              ? 'border-amber-400/30 bg-amber-950/70 text-amber-300'
                              : 'border-emerald-400/30 bg-emerald-950/70 text-emerald-300'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isInProg ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400'
                            }`}
                          />
                          {project.status || 'Completed'}
                        </span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-5 space-y-3">
                      <div>
                        {project.subtitle && (
                          <p className="text-[10px] font-mono uppercase tracking-wider text-[var(--accent)] mb-0.5 truncate">
                            {project.subtitle}
                          </p>
                        )}
                        <h3 className="font-display font-bold text-lg text-[var(--text-primary)] truncate">
                          {project.title}
                        </h3>
                        <p className="font-body text-xs text-[var(--text-muted)] line-clamp-2 mt-1 leading-relaxed">
                          {project.summary || project.description}
                        </p>
                      </div>

                      {/* Tech Stack Pills */}
                      <div className="flex flex-wrap items-center gap-1 pt-0.5">
                        {(project.techStack || []).slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 rounded-md border border-[var(--border)] bg-[#110d14] text-[10px] font-mono text-zinc-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* ── Securely Locked Action Toolbar (Zero Floating Bugs) ── */}
                      <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between gap-2">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            onInspect?.(project)
                          }}
                          className="btn-primary text-xs py-1.5 px-3 flex items-center gap-1.5"
                        >
                          <BookOpen size={12} />
                          <span>Case Study</span>
                        </button>

                        <div className="flex items-center gap-1.5">
                          {project.githubUrl ? (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="p-2 rounded-lg border border-[var(--border)] hover:border-[#c2a4ff] bg-[#110d14] text-[var(--text-muted)] hover:text-white transition-colors"
                              title="Source Code Repository"
                            >
                              <Github size={13} />
                            </a>
                          ) : (
                            <span
                              className="p-2 rounded-lg border border-[var(--border)] bg-[#110d14]/40 text-[var(--text-dim)]"
                              title="Repository Private"
                            >
                              <Lock size={12} />
                            </span>
                          )}

                          {project.liveUrl ? (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="p-2 rounded-lg border border-[var(--border)] hover:border-[#c2a4ff] bg-[#110d14] text-[var(--accent)] hover:text-white transition-colors"
                              title="Live Production Demo"
                            >
                              <ExternalLink size={13} />
                            </a>
                          ) : (
                            <span
                              className="p-2 rounded-lg border border-[var(--border)] bg-[#110d14]/40 text-[var(--text-dim)]"
                              title="Internal Architecture / No Public Demo"
                            >
                              <Radio size={12} />
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.article>
                )
              })}
            </div>

            {/* Desktop Stage Lateral Step Buttons */}
            <div className="hidden sm:flex pointer-events-none absolute inset-y-0 left-4 right-4 items-center justify-between z-30">
              <button
                type="button"
                onClick={() => step(-1)}
                className="pointer-events-auto p-2.5 rounded-full border border-[var(--border-strong)] bg-[#110d14]/90 backdrop-blur-md text-white hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all shadow-xl"
                aria-label="Previous project"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                className="pointer-events-auto p-2.5 rounded-full border border-[var(--border-strong)] bg-[#110d14]/90 backdrop-blur-md text-white hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all shadow-xl"
                aria-label="Next project"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Clean Controls positioned strictly below stage */}
          <div className="flex items-center justify-between px-2 pt-1 text-xs font-mono">
            <span className="text-[var(--text-dim)] flex items-center gap-1.5">
              <Sparkles size={12} className="text-[var(--accent)]" />
              <span>
                {activeProject?.title} ({safeIndex + 1} of {count})
              </span>
            </span>

            {/* Pagination Controls */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => step(-1)}
                className="p-1.5 rounded-lg border border-[var(--border)] bg-[#110d14] text-[var(--text-muted)] hover:text-white"
                aria-label="Previous project"
              >
                <ChevronLeft size={15} />
              </button>

              <div className="flex items-center gap-1.5">
                {filteredProjects.map((p, idx) => (
                  <button
                    key={p._id || idx}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === safeIndex
                        ? 'w-6 bg-[var(--accent)]'
                        : 'w-1.5 bg-[var(--border)] hover:bg-[var(--border-strong)]'
                    }`}
                    aria-label={`Go to project ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={() => step(1)}
                className="p-1.5 rounded-lg border border-[var(--border)] bg-[#110d14] text-[var(--text-muted)] hover:text-white"
                aria-label="Next project"
              >
                <ChevronRight size={15} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* ── BENTO MATRIX DECK ── */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProjects.map((proj, idx) => (
            <ProjectCard
              key={proj._id || proj.title || idx}
              project={proj}
              onInspect={onInspect}
              index={idx}
            />
          ))}
        </div>
      )}
    </div>
  )
}
