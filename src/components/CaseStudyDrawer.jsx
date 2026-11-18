import { useEffect } from 'react'
import { X, Github, ExternalLink, AlertTriangle, CheckCircle2, Cpu, Shield, Database, Terminal } from 'lucide-react'
import InteractiveArchitectureDiagram from './InteractiveArchitectureDiagram'

export default function CaseStudyDrawer({ study, onClose }) {
  useEffect(() => {
    if (!study) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [study, onClose])

  if (!study) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/80 backdrop-blur-md"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${study.title} Technical Case Study`}
    >
      <div
        className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl border border-[var(--border-strong)] shadow-2xl"
        style={{ backgroundColor: 'var(--bg-card-solid)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Drawer Header */}
        <div
          className="sticky top-0 z-20 flex items-start justify-between gap-4 px-6 py-5 border-b border-[var(--border)] backdrop-blur-md"
          style={{ backgroundColor: 'var(--bg-card)' }}
        >
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono mb-1.5" style={{ color: 'var(--text-muted)' }}>
              <span>Case Study</span>
              <span aria-hidden="true" style={{ color: 'var(--text-dim)' }}>·</span>
              <span style={{ color: 'var(--text-primary)' }}>Status: {study.status}</span>
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
              {study.title}
            </h2>
            <p className="text-sm font-body mt-0.5" style={{ color: 'var(--text-muted)' }}>
              {study.subtitle}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl border border-[var(--border)] hover:border-[var(--border-strong)] transition-colors shrink-0"
            style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
            aria-label="Close case study"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6 md:p-8 space-y-8">
          {/* Action Links & Honest Missing-Link Placeholders */}
          <div className="flex flex-wrap items-center gap-3 pb-6 border-b border-[var(--border)]">
            {study.liveUrl ? (
              <a href={study.liveUrl} target="_blank" rel="noreferrer" className="btn-primary text-xs">
                Live Demo <ExternalLink size={14} />
              </a>
            ) : (
              <span className="px-3.5 py-2 rounded-xl border border-dashed border-[var(--border)] text-xs font-mono" style={{ color: 'var(--text-dim)' }}>
                No Live Demo
              </span>
            )}

            {study.githubUrl ? (
              <a href={study.githubUrl} target="_blank" rel="noreferrer" className="btn-outline text-xs">
                <Github size={14} /> GitHub Repository
              </a>
            ) : (
              <span className="px-3.5 py-2 rounded-xl border border-dashed border-[var(--border)] text-xs font-mono" style={{ color: 'var(--text-dim)' }}>
                Repo Private
              </span>
            )}

            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-mono sm:ml-auto" style={{ color: 'var(--text-muted)' }}>
              {(study.techStack || []).map((t, idx) => (
                <span key={t} className="inline-flex items-center gap-2">
                  <span>{t}</span>
                  {idx < (study.techStack || []).length - 1 && <span aria-hidden="true" style={{ color: 'var(--text-dim)' }}>·</span>}
                </span>
              ))}
            </div>
          </div>

          {/* 1. Overview & 2. Problem / Solution */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card">
              <p className="text-xs font-mono uppercase tracking-wider mb-2" style={{ color: 'var(--text-dim)' }}>
                01. Project Overview
              </p>
              <p className="text-sm font-body leading-relaxed mb-4" style={{ color: 'var(--text-muted)' }}>
                {study.overview}
              </p>
              <p className="text-xs font-mono uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-dim)' }}>
                My Contribution
              </p>
              <p className="text-sm font-body leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                {study.myContribution}
              </p>
            </div>

            <div className="card space-y-4">
              <div>
                <p className="text-xs font-mono uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-dim)' }}>
                  02. Problem Definition
                </p>
                <p className="text-sm font-body leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  {study.problemDefinition}
                </p>
              </div>
              <div className="pt-3 border-t border-[var(--border)]">
                <p className="text-xs font-mono uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-dim)' }}>
                  03. Engineered Solution
                </p>
                <p className="text-sm font-body leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  {study.solution}
                </p>
              </div>
            </div>
          </div>

          {/* 3. Interactive System Architecture Diagram */}
          <InteractiveArchitectureDiagram nodes={study.architectureNodes} dataFlow={study.dataFlow} />

          {/* 4. Documented Capabilities & Technology Selection */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 size={15} style={{ color: 'var(--chrome-highlight)' }} />
                <h3 className="font-display font-bold text-base" style={{ color: 'var(--text-primary)' }}>
                  Features &amp; Documented Scope
                </h3>
              </div>
              <ul className="space-y-2">
                {(study.features || []).map((feat, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm font-body" style={{ color: 'var(--text-muted)' }}>
                    <span className="mt-0.5 shrink-0 font-mono text-xs" style={{ color: 'var(--text-dim)' }}>—</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Cpu size={15} style={{ color: 'var(--chrome-highlight)' }} />
                  <h3 className="font-display font-bold text-base" style={{ color: 'var(--text-primary)' }}>
                    Technology Selection
                  </h3>
                </div>
                <p className="text-sm font-body leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  {study.technologySelection}
                </p>
              </div>
              <div className="pt-3 border-t border-[var(--border)] grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-mono mb-1" style={{ color: 'var(--text-dim)' }}>Frontend Architecture</p>
                  <p className="text-xs font-body leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                    {study.frontendArchitecture}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-mono mb-1" style={{ color: 'var(--text-dim)' }}>Backend Architecture</p>
                  <p className="text-xs font-body leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                    {study.backendArchitecture}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 5. Database Schema & API Endpoints Sample */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card">
              <div className="flex items-center gap-2 mb-3">
                <Database size={15} style={{ color: 'var(--chrome-highlight)' }} />
                <h3 className="font-display font-bold text-base" style={{ color: 'var(--text-primary)' }}>
                  Database Schema Overview
                </h3>
              </div>
              <div className="space-y-2">
                {(study.databaseSchema || []).map((schemaLine, idx) => (
                  <pre
                    key={idx}
                    className="p-3 rounded-xl border border-[var(--border)] text-xs font-mono overflow-x-auto whitespace-pre-wrap"
                    style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--metallic-silver)' }}
                  >
                    {schemaLine}
                  </pre>
                ))}
              </div>
            </div>

            <div className="card">
              <div className="flex items-center gap-2 mb-3">
                <Terminal size={15} style={{ color: 'var(--chrome-highlight)' }} />
                <h3 className="font-display font-bold text-base" style={{ color: 'var(--text-primary)' }}>
                  API Endpoints Sample
                </h3>
              </div>
              <div className="space-y-2.5">
                {(study.apiSample || []).map((ep, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl border border-[var(--border)] text-xs"
                    style={{ backgroundColor: 'var(--bg-secondary)' }}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1 font-mono">
                      <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                        {ep.method} {ep.route}
                      </span>
                      <span style={{ color: 'var(--text-dim)' }}>{ep.auth}</span>
                    </div>
                    <p className="font-body" style={{ color: 'var(--text-muted)' }}>
                      {ep.purpose}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 6. Auth, Decisions, Testing, Debugging, Security & Performance */}
          <div className="grid md:grid-cols-3 gap-5">
            {[
              ['Auth & Security', study.authAndSecurity, Shield],
              ['Implementation Decisions', study.implementationDecisions, Cpu],
              ['Testing Strategy', study.testingStrategy, CheckCircle2],
              ['Debugging Challenges', study.debuggingChallenges, AlertTriangle],
              ['Security Considerations', study.securityConsiderations, Shield],
              ['Performance Considerations', study.performanceConsiderations, Cpu],
            ].map(([label, text]) => (
              <div key={label} className="card">
                <p className="text-xs font-mono uppercase tracking-wider mb-2" style={{ color: 'var(--text-dim)' }}>
                  {label}
                </p>
                <p className="text-xs md:text-sm font-body leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  {text}
                </p>
              </div>
            ))}
          </div>

          {/* 7. Honest Current Limitations & Future Improvements */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card border-[var(--border-strong)]">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle size={15} style={{ color: 'var(--metallic-silver)' }} />
                <h3 className="font-display font-bold text-base" style={{ color: 'var(--text-primary)' }}>
                  Current Limitations
                </h3>
              </div>
              <ul className="space-y-2">
                {(study.limitations || []).map((item, idx) => (
                  <li key={idx} className="text-sm font-body leading-relaxed flex items-start gap-2" style={{ color: 'var(--text-muted)' }}>
                    <span className="font-mono text-xs mt-0.5" style={{ color: 'var(--text-dim)' }}>·</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card">
              <h3 className="font-display font-bold text-base mb-3" style={{ color: 'var(--text-primary)' }}>
                Future Improvements
              </h3>
              <ul className="space-y-2">
                {(study.futureImprovements || []).map((item, idx) => (
                  <li key={idx} className="text-sm font-body leading-relaxed flex items-start gap-2" style={{ color: 'var(--text-muted)' }}>
                    <span className="font-mono text-xs mt-0.5" style={{ color: 'var(--text-dim)' }}>→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
