import { useState } from 'react'
import { Github, ExternalLink, BookOpen, Layers, ShieldCheck, Lock, Radio } from 'lucide-react'
import TiltCard3D from './TiltCard3D'

export default function ProjectCard({ project, delay = 0, onInspect, index = 0 }) {
  const {
    title,
    subtitle,
    description,
    summary,
    status = 'Completed',
    techStack = [],
    githubUrl,
    liveUrl,
    imageUrl,
  } = project

  const [imgError, setImgError] = useState(false)
  const displayDesc = summary || description

  const isCompleted = status.toLowerCase().includes('completed')
  const isInProgress = status.toLowerCase().includes('progress')

  return (
    <TiltCard3D maxTilt={6} className="h-full">
      <article
        className="group relative h-full flex flex-col rounded-2xl border border-[var(--border)] hover:border-[#c2a4ff]/60 transition-all duration-300 shadow-xl shadow-black/40 hover:shadow-purple-950/20 overflow-hidden"
        style={{
          backgroundColor: 'var(--bg-card-solid)',
          transitionDelay: `${delay}ms`,
        }}
      >
        {/* Subtle Ambient Hover Glow */}
        <div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background:
              'radial-gradient(400px circle at 50% 0%, rgba(194, 164, 255, 0.12), transparent 70%)',
          }}
          aria-hidden="true"
        />

        {/* ── Top Preview Image Frame ── */}
        <div
          onClick={() => onInspect?.(project)}
          className={`relative w-full h-44 overflow-hidden border-b border-[var(--border)] bg-[#0c0810] ${
            onInspect ? 'cursor-pointer' : ''
          }`}
        >
          {imageUrl && !imgError ? (
            <img
              src={imageUrl}
              alt={title}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-2 p-4 text-center bg-gradient-to-br from-[#160f22] via-[#0b080c] to-[#120d18]">
              <Layers size={26} className="text-[var(--accent)] opacity-80" />
              <span className="font-display font-semibold text-sm text-[var(--text-primary)]">
                {title}
              </span>
              <span className="text-[11px] font-mono text-[var(--text-dim)]">
                Architectural System
              </span>
            </div>
          )}

          {/* Vignette Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

          {/* Top Floating Status Chips */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
            <span className="px-2 py-0.5 rounded-md border border-white/10 bg-black/75 backdrop-blur-md text-[10px] font-mono text-[var(--accent)] font-semibold">
              0{index + 1}
            </span>

            <span
              className={`px-2.5 py-0.5 rounded-full border text-[10px] font-mono backdrop-blur-md flex items-center gap-1.5 ${
                isInProgress
                  ? 'border-amber-400/30 bg-amber-950/60 text-amber-300'
                  : 'border-emerald-400/30 bg-emerald-950/60 text-emerald-300'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isInProgress ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400'
                }`}
              />
              {status}
            </span>
          </div>
        </div>

        {/* ── Card Content Body ── */}
        <div className="flex-1 flex flex-col p-5 space-y-3">
          <div>
            {subtitle && (
              <p className="text-[11px] font-mono text-[var(--accent)] uppercase tracking-wider mb-1 line-clamp-1">
                {subtitle}
              </p>
            )}
            <h3
              onClick={() => onInspect?.(project)}
              className="font-display font-bold text-lg text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors line-clamp-1 cursor-pointer"
            >
              {title}
            </h3>
          </div>

          <p className="text-xs font-body leading-relaxed text-[var(--text-muted)] line-clamp-2 flex-1">
            {displayDesc}
          </p>

          {/* Tech Stack Badges */}
          {techStack?.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              {techStack.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 rounded-md border border-[var(--border)] bg-[#110d14] text-[10px] font-mono text-zinc-300"
                >
                  {tech}
                </span>
              ))}
              {techStack.length > 4 && (
                <span className="text-[10px] font-mono text-[var(--text-dim)] pl-1">
                  +{techStack.length - 4}
                </span>
              )}
            </div>
          )}

          {/* ── Securely Anchored Action Toolbar ── */}
          <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => onInspect?.(project)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--border)] hover:border-[#c2a4ff] bg-[#110d14] hover:bg-[#1a1224] text-xs font-mono text-[var(--text-primary)] hover:text-[var(--accent)] transition-all"
            >
              <BookOpen size={12} />
              <span>Case Study</span>
            </button>

            <div className="flex items-center gap-1.5">
              {githubUrl ? (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 rounded-lg border border-[var(--border)] hover:border-[#c2a4ff] bg-[#110d14] text-[var(--text-muted)] hover:text-white transition-colors"
                  title="Source Code Repository"
                >
                  <Github size={14} />
                </a>
              ) : (
                <span
                  className="p-1.5 rounded-lg border border-[var(--border)] bg-[#110d14]/40 text-[var(--text-dim)] cursor-not-allowed"
                  title="Repository Private"
                >
                  <Lock size={12} />
                </span>
              )}

              {liveUrl ? (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 rounded-lg border border-[var(--border)] hover:border-[#c2a4ff] bg-[#110d14] text-[var(--accent)] hover:text-white transition-colors"
                  title="Live Production Demo"
                >
                  <ExternalLink size={14} />
                </a>
              ) : (
                <span
                  className="p-1.5 rounded-lg border border-[var(--border)] bg-[#110d14]/40 text-[var(--text-dim)] cursor-not-allowed"
                  title="Internal System / No Public Demo"
                >
                  <Radio size={12} />
                </span>
              )}
            </div>
          </div>
        </div>
      </article>
    </TiltCard3D>
  )
}
