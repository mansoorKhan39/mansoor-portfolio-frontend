import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  Github,
  ExternalLink,
  AlertTriangle,
  CheckCircle2,
  Cpu,
  Database,
  Terminal,
  ArrowLeft,
} from 'lucide-react'
import api from '../api'
import Ambient3DBackground from '../components/Ambient3DBackground'
import InteractiveArchitectureDiagram from '../components/InteractiveArchitectureDiagram'
import { CASE_STUDIES } from '../data/portfolioData'
import { syncProjectsFromApi } from '../utils/projectSync'

export default function CaseStudies() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [studies, setStudies] = useState(CASE_STUDIES)
  const [activeSlug, setActiveSlug] = useState(slug || CASE_STUDIES[0].slug)

  useEffect(() => {
    api
      .get('/api/projects')
      .then((res) => {
        const synced = syncProjectsFromApi(res.data)
        if (synced.length > 0) {
          setStudies(synced)
          if (!slug || !synced.some((c) => c.slug === slug)) {
            setActiveSlug(synced[0].slug)
          }
        } else {
          setStudies([])
        }
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    if (slug && studies.some((c) => c.slug === slug)) {
      setActiveSlug(slug)
    }
  }, [slug, studies])

  const study = studies.find((c) => c.slug === activeSlug) || studies[0] || CASE_STUDIES[0]

  const selectStudy = (nextSlug) => {
    setActiveSlug(nextSlug)
    navigate(`/case-studies/${nextSlug}`, { replace: true })
  }

  return (
    <div className="min-h-screen relative pt-28 pb-24 overflow-hidden">
      <Ambient3DBackground className="fixed inset-0 w-full h-full z-0" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest mb-3" style={{ color: 'var(--text-dim)' }}>
              System Architecture &amp; Breakdown
            </p>
            <h1 className="section-heading mb-3">
              Technical <span className="chrome-text">Case Studies</span>
            </h1>
            <p className="font-body max-w-2xl leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              Architectural walkthroughs, schemas, API contracts, and system breakdowns.
            </p>
          </div>
          <Link to="/projects" className="btn-outline text-xs w-fit">
            <ArrowLeft size={14} /> All Projects
          </Link>
        </div>

        {/* Case Study Selector Tabs */}
        <div className="flex flex-wrap gap-2.5 mb-10">
          {studies.map((cs) => {
            const active = cs.slug === study.slug
            return (
              <button
                key={cs.slug}
                type="button"
                onClick={() => selectStudy(cs.slug)}
                className="px-4 py-2.5 rounded-xl border text-left transition-all"
                style={{
                  backgroundColor: active ? 'var(--btn-primary-bg)' : 'var(--bg-card)',
                  color: active ? 'var(--btn-primary-text)' : 'var(--text-primary)',
                  borderColor: active ? 'var(--btn-primary-bg)' : 'var(--border)',
                }}
              >
                <div className="font-display font-bold text-sm leading-tight">{cs.title}</div>
                <div
                  className="text-[11px] font-mono mt-0.5"
                  style={{ opacity: active ? 0.78 : 0.65 }}
                >
                  {cs.status}
                </div>
              </button>
            )
          })}
        </div>

        {/* Active Study Complete Breakdown */}
        <div className="space-y-8">
          <div className="card border-[var(--border-strong)]">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-[var(--border)]">
              <div>
                <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono mb-2" style={{ color: 'var(--text-dim)' }}>
                  <span>Status: <strong style={{ color: 'var(--text-primary)' }}>{study.status}</strong></span>
                  <span aria-hidden="true">·</span>
                  <span>{study.subtitle}</span>
                </div>
                <h2 className="font-display text-3xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
                  {study.title}
                </h2>
                <p className="font-body text-sm md:text-base leading-relaxed max-w-3xl" style={{ color: 'var(--text-muted)' }}>
                  {study.overview}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
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
                    <Github size={14} /> GitHub
                  </a>
                ) : (
                  <span className="px-3.5 py-2 rounded-xl border border-dashed border-[var(--border)] text-xs font-mono" style={{ color: 'var(--text-dim)' }}>
                    Repo Private
                  </span>
                )}
              </div>
            </div>

            <div className="pt-5 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
              {(study.techStack || []).map((tech, idx) => (
                <span key={tech} className="inline-flex items-center gap-2.5">
                  <span>{tech}</span>
                  {idx < (study.techStack || []).length - 1 && <span aria-hidden="true" style={{ color: 'var(--text-dim)' }}>·</span>}
                </span>
              ))}
            </div>
          </div>

          {/* Problem / Solution / Contribution */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="card">
              <p className="text-xs font-mono uppercase tracking-wider mb-2" style={{ color: 'var(--text-dim)' }}>
                Problem Definition
              </p>
              <p className="text-sm font-body leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                {study.problemDefinition}
              </p>
            </div>
            <div className="card">
              <p className="text-xs font-mono uppercase tracking-wider mb-2" style={{ color: 'var(--text-dim)' }}>
                Solution Implemented
              </p>
              <p className="text-sm font-body leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                {study.solution}
              </p>
            </div>
            <div className="card">
              <p className="text-xs font-mono uppercase tracking-wider mb-2" style={{ color: 'var(--text-dim)' }}>
                My Contribution
              </p>
              <p className="text-sm font-body leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                {study.myContribution}
              </p>
            </div>
          </div>

          {/* Interactive Architecture Flow Diagram */}
          <InteractiveArchitectureDiagram nodes={study.architectureNodes} dataFlow={study.dataFlow} />

          {/* Features & Architecture Split */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 size={16} style={{ color: 'var(--chrome-highlight)' }} />
                <h3 className="font-display font-bold text-lg" style={{ color: 'var(--text-primary)' }}>
                  Features &amp; Functional Scope
                </h3>
              </div>
              <ul className="space-y-2.5">
                {(study.features || []).map((feat, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm font-body" style={{ color: 'var(--text-muted)' }}>
                    <span className="font-mono text-xs mt-0.5" style={{ color: 'var(--text-dim)' }}>—</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card space-y-5">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Cpu size={16} style={{ color: 'var(--chrome-highlight)' }} />
                  <h3 className="font-display font-bold text-lg" style={{ color: 'var(--text-primary)' }}>
                    Technology Selection
                  </h3>
                </div>
                <p className="text-sm font-body leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  {study.technologySelection}
                </p>
              </div>
              <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-[var(--border)]">
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

          {/* Schema & API Endpoints */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card">
              <div className="flex items-center gap-2 mb-4">
                <Database size={16} style={{ color: 'var(--chrome-highlight)' }} />
                <h3 className="font-display font-bold text-lg" style={{ color: 'var(--text-primary)' }}>
                  Database Schema Overview
                </h3>
              </div>
              <div className="space-y-2.5">
                {(study.databaseSchema || []).map((line, i) => (
                  <pre
                    key={i}
                    className="p-3 rounded-xl border border-[var(--border)] text-xs font-mono whitespace-pre-wrap"
                    style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--metallic-silver)' }}
                  >
                    {line}
                  </pre>
                ))}
              </div>
            </div>

            <div className="card">
              <div className="flex items-center gap-2 mb-4">
                <Terminal size={16} style={{ color: 'var(--chrome-highlight)' }} />
                <h3 className="font-display font-bold text-lg" style={{ color: 'var(--text-primary)' }}>
                  API Endpoints Sample
                </h3>
              </div>
              <div className="space-y-2.5">
                {(study.apiSample || []).map((ep, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl border border-[var(--border)] text-xs"
                    style={{ backgroundColor: 'var(--bg-secondary)' }}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1 font-mono">
                      <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                        {ep.method} {ep.route}
                      </span>
                      <span style={{ color: 'var(--text-dim)' }}>{ep.auth}</span>
                    </div>
                    <p className="font-body" style={{ color: 'var(--text-muted)' }}>{ep.purpose}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Deep Engineering Notes */}
          <div className="grid md:grid-cols-3 gap-5">
            {[
              ['Auth & Security', study.authAndSecurity],
              ['Implementation Decisions', study.implementationDecisions],
              ['Testing Strategy', study.testingStrategy],
              ['Debugging Challenges', study.debuggingChallenges],
              ['Security Considerations', study.securityConsiderations],
              ['Performance Considerations', study.performanceConsiderations],
            ].map(([label, text]) => (
              <div key={label} className="card">
                <p className="text-xs font-mono uppercase tracking-wider mb-2" style={{ color: 'var(--text-dim)' }}>
                  {label}
                </p>
                <p className="text-sm font-body leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  {text}
                </p>
              </div>
            ))}
          </div>

          {/* Limitations & Future Improvements */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card border-[var(--border-strong)]">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle size={16} style={{ color: 'var(--metallic-silver)' }} />
                <h3 className="font-display font-bold text-lg" style={{ color: 'var(--text-primary)' }}>
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
              <h3 className="font-display font-bold text-lg mb-3" style={{ color: 'var(--text-primary)' }}>
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
