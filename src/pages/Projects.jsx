import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search, Filter, Code2, Sparkles, ArrowRight } from 'lucide-react'
import api from '../api'
import { CASE_STUDIES, EXPERIMENTAL_CONCEPTS } from '../data/portfolioData'
import { syncProjectsFromApi, buildFallbackStudy } from '../utils/projectSync'
import ProjectCard from '../components/ProjectCard'
import CaseStudyDrawer from '../components/CaseStudyDrawer'
import Ambient3DBackground from '../components/Ambient3DBackground'
import TiltCard3D from '../components/TiltCard3D'

const STATUS_TABS = ['All', 'Completed', 'In Progress', 'Planned / Concept', 'Verified Notebooks & Analysis']

export default function Projects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [techFilter, setTechFilter] = useState('All')
  const [selectedStudy, setSelectedStudy] = useState(null)

  useEffect(() => {
    api
      .get('/api/projects')
      .then((res) => setProjects(syncProjectsFromApi(res.data)))
      .catch(() => setProjects(CASE_STUDIES))
      .finally(() => setLoading(false))
  }, [])

  const allTags = ['All', ...new Set(projects.flatMap((p) => p.techStack || []))]

  const filtered = projects.filter((p) => {
    const text = `${p.title || ''} ${p.subtitle || ''} ${p.summary || ''} ${p.description || ''}`.toLowerCase()
    const matchSearch = text.includes(search.toLowerCase())
    const matchStatus = statusFilter === 'All' || (p.status || 'Completed') === statusFilter
    const matchTech = techFilter === 'All' || p.techStack?.includes(techFilter)
    return matchSearch && matchStatus && matchTech
  })

  const openInspector = (project) => {
    if (project.architectureNodes) {
      setSelectedStudy(project)
      return
    }
    setSelectedStudy(buildFallbackStudy(project))
  }

  return (
    <div className="min-h-screen relative pt-28 pb-24 overflow-hidden">
      <Ambient3DBackground className="fixed inset-0 w-full h-full z-0" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest mb-3" style={{ color: 'var(--text-dim)' }}>
              Verified Portfolio Work
            </p>
            <h1 className="section-heading mb-4">
              Projects &amp; <span className="chrome-text">Systems</span>
            </h1>
            <p className="font-body max-w-2xl leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              Real backend systems, AI-powered tools, NLP analytics dashboards, and full-stack platforms—labeled clearly by current engineering status.
            </p>
          </div>
          <Link to="/case-studies" className="btn-outline text-xs w-fit">
            Full Architecture Case Studies <ArrowRight size={14} />
          </Link>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-5">
          {STATUS_TABS.map((tab) => {
            const active = statusFilter === tab
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setStatusFilter(tab)}
                className="px-3.5 py-2 rounded-xl text-xs font-mono border transition-colors"
                style={{
                  backgroundColor: active ? 'var(--btn-primary-bg)' : 'var(--bg-card)',
                  color: active ? 'var(--btn-primary-text)' : 'var(--text-muted)',
                  borderColor: active ? 'var(--btn-primary-bg)' : 'var(--border)',
                  fontWeight: active ? 600 : 400,
                }}
              >
                {tab}
              </button>
            )
          })}
        </div>

        {/* Search + Tech Tag Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-dim)' }} />
            <input
              type="text"
              placeholder="Search projects, architectures, or keywords..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <Filter size={15} className="shrink-0" style={{ color: 'var(--text-dim)' }} />
            {allTags.slice(0, 8).map((tag) => {
              const active = techFilter === tag
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setTechFilter(tag)}
                  className="shrink-0 whitespace-nowrap px-3.5 py-2 rounded-xl text-xs font-mono border transition-colors"
                  style={{
                    backgroundColor: active ? 'var(--bg-elevated)' : 'var(--bg-card)',
                    color: active ? 'var(--text-primary)' : 'var(--text-muted)',
                    borderColor: active ? 'var(--border-strong)' : 'var(--border)',
                  }}
                >
                  {tag}
                </button>
              )
            })}
          </div>
        </div>

        {/* Main Projects Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="card animate-pulse">
                <div className="w-full h-44 rounded-xl mb-5" style={{ backgroundColor: 'var(--border)' }} />
                <div className="h-5 rounded w-3/4 mb-3" style={{ backgroundColor: 'var(--border)' }} />
                <div className="h-4 rounded w-full mb-2" style={{ backgroundColor: 'var(--border)' }} />
                <div className="h-4 rounded w-5/6" style={{ backgroundColor: 'var(--border)' }} />
              </div>
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project, i) => (
              <ProjectCard
                key={project._id || project.title}
                project={project}
                index={i}
                delay={i * 55}
                onInspect={openInspector}
              />
            ))}
          </div>
        ) : (
          <div className="card text-center py-20">
            <Code2 size={44} className="mx-auto mb-4 opacity-40" style={{ color: 'var(--text-dim)' }} />
            <p className="font-body text-lg mb-2" style={{ color: 'var(--text-primary)' }}>
              No projects match your current filter
            </p>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              Reset the status tab or search term to view all verified projects.
            </p>
          </div>
        )}

        {!loading && (
          <p className="text-center text-xs mt-10 font-mono tabular-nums" style={{ color: 'var(--text-dim)' }}>
            {filtered.length} verified project{filtered.length !== 1 ? 's' : ''} shown
          </p>
        )}

        {/* Clearly Separated Experimental & Upcoming Concepts Section */}
        <section className="mt-20 pt-14 border-t border-[var(--border)]">
          <div className="mb-8">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider mb-2" style={{ color: 'var(--text-dim)' }}>
              <Sparkles size={14} style={{ color: 'var(--metallic-silver)' }} />
              <span>Separate From Completed Work</span>
            </div>
            <h2 className="font-display font-bold text-2xl md:text-3xl mb-2" style={{ color: 'var(--text-primary)' }}>
              Upcoming &amp; Experimental Concepts
            </h2>
            <p className="font-body text-sm max-w-2xl" style={{ color: 'var(--text-muted)' }}>
              Early-stage proposals, SRS specifications, and academic concepts that are not presented as shipped production applications.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {EXPERIMENTAL_CONCEPTS.map((concept) => (
              <TiltCard3D key={concept.name} maxTilt={4} className="h-full">
                <div className="card h-full border-dashed hover:border-[var(--border-strong)]">
                  <p className="text-[11px] font-mono mb-2" style={{ color: 'var(--text-dim)' }}>
                    {concept.status}
                  </p>
                  <h3 className="font-display font-bold text-lg mb-2" style={{ color: 'var(--text-primary)' }}>
                    {concept.name}
                  </h3>
                  <p className="text-sm font-body leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                    {concept.summary}
                  </p>
                </div>
              </TiltCard3D>
            ))}
          </div>
        </section>
      </div>

      <CaseStudyDrawer study={selectedStudy} onClose={() => setSelectedStudy(null)} />
    </div>
  )
}
