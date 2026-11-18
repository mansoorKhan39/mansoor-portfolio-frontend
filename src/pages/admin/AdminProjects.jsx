import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, X, Star, StarOff, Github, ExternalLink, Loader } from 'lucide-react'
import toast from 'react-hot-toast'
import api from '../../api'

const STATUS_OPTIONS = [
  'Completed',
  'In Progress',
  'Planned / Concept',
  'Verified Notebooks & Analysis',
]

const EMPTY_FORM = {
  title: '',
  subtitle: '',
  status: 'Completed',
  description: '',
  techStack: '',
  githubUrl: '',
  liveUrl: '',
  imageUrl: '',
  featured: true,
  order: 0,
}

export default function AdminProjects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(null)
  const [confirmDeleteId, setConfirmDeleteId] = useState(null)

  const fetchProjects = () => {
    setLoading(true)
    api
      .get('/api/projects')
      .then((res) => setProjects(Array.isArray(res.data) ? res.data : []))
      .catch(() => toast.error('Failed to load projects'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  const openAdd = () => {
    setEditing(null)
    setForm({ ...EMPTY_FORM, order: projects.length + 1 })
    setModal(true)
  }

  const openEdit = (project) => {
    setEditing(project._id)
    setForm({
      title: project.title || '',
      subtitle: project.subtitle || '',
      status: project.status || 'Completed',
      description: project.description || '',
      techStack: (project.techStack || []).join(', '),
      githubUrl: project.githubUrl || '',
      liveUrl: project.liveUrl || '',
      imageUrl: project.imageUrl || '',
      featured: Boolean(project.featured),
      order: project.order || 0,
    })
    setModal(true)
  }

  const closeModal = () => {
    setModal(false)
    setEditing(null)
    setForm(EMPTY_FORM)
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((p) => ({ ...p, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.title || !form.description) {
      toast.error('Title and description required')
      return
    }
    setSaving(true)
    const payload = {
      title: form.title.trim(),
      subtitle: form.subtitle.trim(),
      status: form.status || 'Completed',
      description: form.description.trim(),
      githubUrl: form.githubUrl.trim(),
      liveUrl: form.liveUrl.trim(),
      imageUrl: form.imageUrl.trim(),
      featured: Boolean(form.featured),
      order: Number(form.order) || 0,
      techStack: form.techStack
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
    }
    try {
      if (editing) {
        await api.put(`/api/projects/${editing}`, payload)
        toast.success('Project updated!')
      } else {
        await api.post('/api/projects', payload)
        toast.success('Project added!')
      }
      fetchProjects()
      closeModal()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    setDeleting(id)
    setConfirmDeleteId(null)
    try {
      await api.delete(`/api/projects/${id}`)
      toast.success('Project deleted.')
      setProjects((p) => p.filter((pr) => pr._id !== id))
    } catch {
      toast.error('Failed to delete project.')
    } finally {
      setDeleting(null)
    }
  }

  const toggleFeatured = async (project) => {
    try {
      await api.put(`/api/projects/${project._id}`, {
        ...project,
        featured: !project.featured,
        techStack: project.techStack,
      })
      setProjects((p) =>
        p.map((pr) => (pr._id === project._id ? { ...pr, featured: !pr.featured } : pr))
      )
      toast.success(project.featured ? 'Removed from homepage showcase' : 'Featured on homepage')
    } catch {
      toast.error('Update failed.')
    }
  }

  return (
    <div className="p-4 md:p-8 max-w-6xl">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
            Manage Projects
          </h1>
          <p className="text-sm font-mono tabular-nums" style={{ color: 'var(--text-dim)' }}>
            {projects.length} total · {projects.filter((p) => p.featured).length} featured on homepage
          </p>
        </div>
        <button onClick={openAdd} className="btn-primary text-sm">
          <Plus size={17} /> Add Project
        </button>
      </div>

      {loading ? (
        <div className="grid md:grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="card animate-pulse h-36" />
          ))}
        </div>
      ) : projects.length === 0 ? (
        <div className="card text-center py-20" style={{ color: 'var(--text-muted)' }}>
          <p className="mb-4">No projects yet.</p>
          <button onClick={openAdd} className="btn-primary">
            Add your first project
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-5">
          {projects.map((project) => (
            <div key={project._id} className="card hover:border-[var(--border-strong)]">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold truncate font-display" style={{ color: 'var(--text-primary)' }}>
                      {project.title}
                    </h3>
                    {project.featured && (
                      <Star size={14} className="shrink-0" style={{ color: 'var(--accent)' }} fill="currentColor" />
                    )}
                  </div>
                  <p className="text-[11px] font-mono mb-2" style={{ color: 'var(--accent)' }}>
                    {project.status || 'Completed'}
                    {project.subtitle ? ` · ${project.subtitle}` : ''}
                  </p>
                  <p className="text-sm line-clamp-2 font-body mb-3" style={{ color: 'var(--text-muted)' }}>
                    {project.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-3 text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
                    {(project.techStack || []).map((t, idx, arr) => (
                      <span key={t} className="inline-flex items-center gap-2">
                        <span>{t}</span>
                        {idx < arr.length - 1 && (
                          <span aria-hidden="true" style={{ color: 'var(--text-dim)' }}>·</span>
                        )}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono" style={{ color: 'var(--text-dim)' }}>
                    {project.githubUrl ? (
                      <a href={project.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:opacity-80" style={{ color: 'var(--text-muted)' }}>
                        <Github size={12} /> Repo Linked
                      </a>
                    ) : (
                      <span>No Repo URL</span>
                    )}
                    {project.liveUrl ? (
                      <a href={project.liveUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:opacity-80" style={{ color: 'var(--accent)' }}>
                        <ExternalLink size={12} /> Live Demo Linked
                      </a>
                    ) : (
                      <span>No Live Demo</span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 shrink-0">
                  <button
                    onClick={() => toggleFeatured(project)}
                    className={`p-2 rounded-lg transition-colors ${
                      project.featured ? 'bg-white/10' : 'hover:bg-white/5'
                    }`}
                    style={{ color: project.featured ? 'var(--accent)' : 'var(--text-dim)' }}
                    title={project.featured ? 'Remove from Homepage' : 'Feature on Homepage'}
                  >
                    {project.featured ? <Star size={16} fill="currentColor" /> : <StarOff size={16} />}
                  </button>
                  <button
                    onClick={() => openEdit(project)}
                    className="p-2 rounded-lg hover:bg-white/5 transition-colors"
                    style={{ color: 'var(--text-muted)' }}
                    title="Edit project"
                  >
                    <Pencil size={16} />
                  </button>
                  {confirmDeleteId === project._id ? (
                    <div className="flex flex-col gap-1">
                      <button
                        onClick={() => handleDelete(project._id)}
                        disabled={deleting === project._id}
                        className="px-2 py-1 rounded-lg text-[11px] font-mono bg-rose-500/20 text-rose-300 border border-rose-500/30 hover:bg-rose-500/30 transition-colors"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => setConfirmDeleteId(null)}
                        className="px-2 py-1 rounded-lg text-[11px] font-mono hover:bg-white/5 transition-colors"
                        style={{ color: 'var(--text-dim)' }}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setConfirmDeleteId(project._id)}
                      disabled={deleting === project._id}
                      className="p-2 rounded-lg hover:text-rose-400 hover:bg-rose-500/10 transition-colors disabled:opacity-50"
                      style={{ color: 'var(--text-muted)' }}
                      title="Delete project"
                    >
                      {deleting === project._id ? <Loader size={16} className="animate-spin" /> : <Trash2 size={16} />}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={closeModal} />
          <div
            className="relative border border-[var(--border-strong)] rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
            style={{ backgroundColor: 'var(--bg-card-solid)' }}
          >
            <div className="flex items-center justify-between p-6 border-b border-[var(--border)]">
              <h2 className="font-display font-bold text-xl" style={{ color: 'var(--text-primary)' }}>
                {editing ? 'Edit Project' : 'Add New Project'}
              </h2>
              <button onClick={closeModal} className="hover:opacity-80 transition-opacity" style={{ color: 'var(--text-muted)' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono mb-2" style={{ color: 'var(--text-muted)' }}>
                    Title <span className="text-rose-400">*</span>
                  </label>
                  <input name="title" value={form.title} onChange={handleChange} placeholder="Project name" className="input-field" required />
                </div>
                <div>
                  <label className="block text-xs font-mono mb-2" style={{ color: 'var(--text-muted)' }}>
                    Status
                  </label>
                  <select name="status" value={form.status} onChange={handleChange} className="input-field">
                    {STATUS_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-mono mb-2" style={{ color: 'var(--text-muted)' }}>
                    Short Subtitle <span style={{ color: 'var(--text-dim)' }}>(optional)</span>
                  </label>
                  <input name="subtitle" value={form.subtitle} onChange={handleChange} placeholder="e.g. FastAPI Microservice & Dashboard" className="input-field" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-mono mb-2" style={{ color: 'var(--text-muted)' }}>
                    Description <span className="text-rose-400">*</span>
                  </label>
                  <textarea name="description" value={form.description} onChange={handleChange} placeholder="Concise, to-the-point summary..." rows={3} className="input-field resize-none" required />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-mono mb-2" style={{ color: 'var(--text-muted)' }}>
                    Tech Stack <span style={{ color: 'var(--text-dim)' }}>(comma separated)</span>
                  </label>
                  <input name="techStack" value={form.techStack} onChange={handleChange} placeholder="Python, FastAPI, React, MongoDB" className="input-field" />
                </div>
                <div>
                  <label className="block text-xs font-mono mb-2" style={{ color: 'var(--text-muted)' }}>
                    GitHub Repo URL <span style={{ color: 'var(--text-dim)' }}>(leave blank if none)</span>
                  </label>
                  <input name="githubUrl" value={form.githubUrl} onChange={handleChange} placeholder="https://github.com/..." className="input-field" />
                </div>
                <div>
                  <label className="block text-xs font-mono mb-2" style={{ color: 'var(--text-muted)' }}>
                    Live Demo URL <span style={{ color: 'var(--text-dim)' }}>(leave blank if none)</span>
                  </label>
                  <input name="liveUrl" value={form.liveUrl} onChange={handleChange} placeholder="https://myproject.vercel.app" className="input-field" />
                </div>
                <div>
                  <label className="block text-xs font-mono mb-2" style={{ color: 'var(--text-muted)' }}>
                    Preview Image URL <span style={{ color: 'var(--text-dim)' }}>(optional)</span>
                  </label>
                  <input name="imageUrl" value={form.imageUrl} onChange={handleChange} placeholder="https://..." className="input-field" />
                </div>
                <div>
                  <label className="block text-xs font-mono mb-2" style={{ color: 'var(--text-muted)' }}>
                    Display Order
                  </label>
                  <input type="number" name="order" value={form.order} onChange={handleChange} className="input-field" min={0} />
                </div>
                <div className="md:col-span-2 flex items-center gap-3 pt-1">
                  <input type="checkbox" id="featured" name="featured" checked={form.featured} onChange={handleChange} className="w-4 h-4 accent-purple-400 cursor-pointer" />
                  <label htmlFor="featured" className="text-sm cursor-pointer select-none" style={{ color: 'var(--text-primary)' }}>
                    Feature on Homepage 3D Showcase
                  </label>
                </div>
              </div>

              <div className="flex gap-3 pt-3">
                <button type="submit" disabled={saving} className="btn-primary flex-1 justify-center disabled:opacity-60">
                  {saving ? <><Loader size={16} className="animate-spin" /> Saving...</> : editing ? 'Update Project' : 'Add Project'}
                </button>
                <button type="button" onClick={closeModal} className="btn-outline">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
