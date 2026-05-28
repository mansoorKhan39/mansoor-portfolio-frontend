import { useState, useEffect } from 'react'
import { Search, Filter, Code2 } from 'lucide-react'
import api from '../api'
import ProjectCard from '../components/ProjectCard'

export default function Projects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    api.get('/api/projects')
      .then(res => setProjects(res.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  // Build unique tech tags for filter
  const allTags = ['All', ...new Set(projects.flatMap(p => p.techStack || []))]

  const filtered = projects.filter(p => {
    const matchSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'All' || p.techStack?.includes(filter)
    return matchSearch && matchFilter
  })

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <p className="text-brand-400 font-mono text-sm mb-3">// my work</p>
          <h1 className="section-heading mb-4">All Projects</h1>
          <p className="text-slate-400 font-body max-w-xl">
            A collection of projects I've built — from full-stack web apps to machine learning experiments.
          </p>
        </div>

        {/* Search + Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search projects..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <Filter size={16} className="text-slate-500 shrink-0" />
            {allTags.slice(0, 8).map(tag => (
              <button
                key={tag}
                onClick={() => setFilter(tag)}
                className={`shrink-0 px-3 py-2 rounded-lg text-xs font-mono transition-all ${
                  filter === tag
                    ? 'bg-brand-500 text-slate-950 font-semibold'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700 border border-slate-700'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Projects grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="card animate-pulse">
                <div className="w-full h-44 bg-slate-800 rounded-xl mb-4" />
                <div className="h-5 bg-slate-800 rounded w-3/4 mb-3" />
                <div className="h-4 bg-slate-800 rounded w-full mb-2" />
                <div className="h-4 bg-slate-800 rounded w-5/6" />
              </div>
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project, i) => (
              <ProjectCard key={project._id} project={project} delay={i * 60} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <Code2 size={48} className="mx-auto mb-4 text-slate-700" />
            <p className="text-slate-500 font-body text-lg mb-2">No projects found</p>
            <p className="text-slate-600 text-sm">Try a different search or filter.</p>
          </div>
        )}

        {!loading && (
          <p className="text-center text-slate-600 text-sm mt-8 font-mono">
            {filtered.length} project{filtered.length !== 1 ? 's' : ''} shown
          </p>
        )}
      </div>
    </div>
  )
}
