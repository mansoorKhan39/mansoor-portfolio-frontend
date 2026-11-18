import { Link } from 'react-router-dom'
import { Compass, ArrowRight, Server, Layers } from 'lucide-react'
import Ambient3DBackground from '../components/Ambient3DBackground'
import TiltCard3D from '../components/TiltCard3D'
import { CAREER_ROADMAP } from '../data/portfolioData'

export default function Journey() {
  const { core, supporting, engineeringRoadmap } = CAREER_ROADMAP

  return (
    <div className="min-h-screen relative pt-28 pb-24 overflow-hidden">
      <Ambient3DBackground className="fixed inset-0 w-full h-full z-0" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 space-y-14">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest mb-3" style={{ color: 'var(--text-dim)' }}>
              Career Direction &amp; Learning Roadmap
            </p>
            <h1 className="section-heading mb-3">
              Engineering <span className="chrome-text">Journey &amp; Roadmap</span>
            </h1>
            <p className="font-body max-w-2xl leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              Structured learning roadmap and long-term specialization direction—explicitly separated from already completed skills.
            </p>
          </div>
          <Link to="/skills" className="btn-outline text-xs w-fit">
            View Current Skills <ArrowRight size={14} />
          </Link>
        </div>

        {/* Core Specialization */}
        <TiltCard3D maxTilt={3}>
          <div className="card border-[var(--border-strong)] p-7 md:p-9">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider" style={{ color: 'var(--metallic-silver)' }}>
                <Compass size={15} style={{ color: 'var(--chrome-highlight)' }} />
                <span>{core.label}</span>
              </div>
              <span className="text-xs font-mono" style={{ color: 'var(--text-dim)' }}>
                Active Long-Term Focus
              </span>
            </div>

            <h2 className="font-display font-bold text-2xl md:text-3xl mb-3" style={{ color: 'var(--text-primary)' }}>
              {core.title}
            </h2>
            <p className="font-body text-sm md:text-base leading-relaxed max-w-3xl mb-6" style={{ color: 'var(--text-muted)' }}>
              {core.description}
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {core.topics.map((topic, idx) => (
                <div
                  key={topic}
                  className="px-3.5 py-2.5 rounded-xl border border-[var(--border)] font-mono text-xs flex items-center gap-2"
                  style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                >
                  <span style={{ color: 'var(--text-dim)' }}>{String(idx + 1).padStart(2, '0')}</span>
                  <span>{topic}</span>
                </div>
              ))}
            </div>
          </div>
        </TiltCard3D>

        {/* Supporting Engineering Tracks */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <Layers size={16} style={{ color: 'var(--chrome-highlight)' }} />
            <h2 className="font-display font-bold text-xl" style={{ color: 'var(--text-primary)' }}>
              Supporting Learning Tracks
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {supporting.map((track) => (
              <TiltCard3D key={track.title} maxTilt={4} className="h-full">
                <div className="card h-full hover:border-[var(--border-strong)]">
                  <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-[var(--border)]">
                    <h3 className="font-display font-bold text-lg" style={{ color: 'var(--text-primary)' }}>
                      {track.title}
                    </h3>
                    <span className="text-xs font-mono" style={{ color: 'var(--text-dim)' }}>
                      {track.stage}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-2.5 gap-y-2 text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
                    {track.topics.map((topic, idx) => (
                      <span key={topic} className="inline-flex items-center gap-2.5">
                        <span style={{ color: 'var(--text-primary)' }}>{topic}</span>
                        {idx < track.topics.length - 1 && (
                          <span aria-hidden="true" style={{ color: 'var(--text-dim)' }}>·</span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              </TiltCard3D>
            ))}
          </div>
        </section>

        {/* Systems & Cloud Engineering Roadmap */}
        <section className="card">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2.5">
              <Server size={18} style={{ color: 'var(--chrome-highlight)' }} />
              <h2 className="font-display font-bold text-xl" style={{ color: 'var(--text-primary)' }}>
                {engineeringRoadmap?.title || 'Cloud & Distributed Systems Roadmap'}
              </h2>
            </div>
            <span className="text-xs font-mono" style={{ color: 'var(--text-dim)' }}>
              Structured Infrastructure Milestone Track
            </span>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {(engineeringRoadmap?.stages || []).map((stage, idx) => (
              <div
                key={stage.level}
                className="p-5 rounded-xl border border-[var(--border)]"
                style={{ backgroundColor: 'var(--bg-secondary)' }}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="font-display font-bold text-xl chrome-text">{stage.level}</span>
                  <span className="text-xs font-mono" style={{ color: 'var(--metallic-silver)' }}>
                    {stage.status}
                  </span>
                </div>
                <p className="font-body text-sm" style={{ color: 'var(--text-muted)' }}>
                  {stage.label} · Stage {idx + 1} of 3
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
