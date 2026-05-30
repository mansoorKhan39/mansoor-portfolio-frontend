import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, X, Star, StarOff, Github, ExternalLink, Loader } from 'lucide-react'
import toast from 'react-hot-toast'
import api from '../../api'

const EMPTY_FORM = {
  title: '', description: '', techStack: '', githubUrl: '', liveUrl: '', imageUrl: '', featured: false, order: 0,
}

export default function AdminProjects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(null)

  const fetchProjects = () => {
    setLoading(true)
    api.get('/api/projects')
      .then(res => setProjects(res.data))
      .catch(() => toast.error('Failed to load projects'))
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchProjects() }, [])

  const openAdd = () => {
    setEditing(null)
    setForm(EMPTY_FORM)
    setModal(true)
  }

  const openEdit = (project) => {
    setEditing(project._id)
    setForm({
      title: project.title,
      description: project.description,
      techStack: (project.techStack || []).join(', '),
      githubUrl: project.githubUrl || '',
      liveUrl: project.liveUrl || '',
      imageUrl: project.imageUrl || '',
      featured: project.featured || false,
      order: project.order || 0,
    })
    setModal(true)
  }

  const closeModal = () => { setModal(false); setEditing(null); setForm(EMPTY_FORM) }

  const handleChange = e => {
    const { name, value, type, checked } = e.target
    setForm(p => ({ ...p, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (!form.title || !form.description) { toast.error('Title and description required'); return }
    setSaving(true)
    const payload = {
      ...form,
      techStack: form.techStack.split(',').map(s => s.trim()).filter(Boolean),
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

  const handleDelete = async (id, title) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return
    setDeleting(id)
    try {
      await api.delete(`/api/projects/${id}`)
      toast.success('Project deleted.')
      setProjects(p => p.filter(pr => pr._id !== id))
    } catch {
      toast.error('Failed to delete project.')
    } finally {
      setDeleting(null)
    }
  }

  const toggleFeatured = async (project) => {
    try {
      await api.put(`/api/projects/${project._id}`, { ...project, featured: !project.featured, techStack: project.techStack })
      setProjects(p => p.map(pr => pr._id === project._id ? { ...pr, featured: !pr.featured } : pr))
      toast.success(project.featured ? 'Removed from featured' : 'Marked as featured')
    } catch {
      toast.error('Update failed.')
    }
  }

  return (
    <div className="p-4 md:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-white mb-1">Projects</h1>
          <p className="text-slate-500 text-sm font-mono">{projects.length} total</p>
        </div>
        <button onClick={openAdd} className="btn-primary">
          <Plus size={18} /> Add Project
        </button>
      </div>

      {loading ? (
        <div className="grid md:grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => <div key={i} className="card animate-pulse h-32" />)}
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-24 text-slate-500">
          <p className="mb-4">No projects yet.</p>
          <button onClick={openAdd} className="btn-primary">Add your first project</button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {projects.map(project => (
            <div key={project._id} className="card hover:border-slate-700 transition-all">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-white truncate font-display">{project.title}</h3>
                    {project.featured && <Star size={14} className="text-brand-400 shrink-0" fill="currentColor" />}
                  </div>
                  <p className="text-slate-400 text-sm line-clamp-2 font-body mb-3">{project.description}</p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {(project.techStack || []).map(t => (
                      <span key={t} className="text-xs px-2 py-0.5 bg-slate-800 text-slate-400 rounded font-mono">{t}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-brand-400"><Github size={12} /> GitHub</a>}
                    {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-brand-400"><ExternalLink size={12} /> Live</a>}
                  </div>
                </div>
                <div className="flex flex-col gap-2 shrink-0">
                  <button onClick={() => toggleFeatured(project)} className={`p-2 rounded-lg transition-colors ${project.featured ? 'text-brand-400 bg-brand-500/10' : 'text-slate-600 hover:text-brand-400 hover:bg-slate-800'}`} title={project.featured ? 'Unfeature' : 'Feature'}>
                    {project.featured ? <Star size={16} fill="currentColor" /> : <StarOff size={16} />}
                  </button>
                  <button onClick={() => openEdit(project)} className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
                    <Pencil size={16} />
                  </button>
                  <button onClick={() => handleDelete(project._id, project.title)} disabled={deleting === project._id} className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors disabled:opacity-50">
                    {deleting === project._id ? <Loader size={16} className="animate-spin" /> : <Trash2 size={16} />}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={closeModal} />
          <div className="relative bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-slate-800">
              <h2 className="font-display font-bold text-xl text-white">{editing ? 'Edit Project' : 'Add New Project'}</h2>
              <button onClick={closeModal} className="text-slate-400 hover:text-white transition-colors"><X size={20} /></button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-slate-400 text-xs font-mono mb-2">Title <span className="text-rose-400">*</span></label>
                  <input name="title" value={form.title} onChange={handleChange} placeholder="Project name" className="input-field" required />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-slate-400 text-xs font-mono mb-2">Description <span className="text-rose-400">*</span></label>
                  <textarea name="description" value={form.description} onChange={handleChange} placeholder="Describe the project..." rows={3} className="input-field resize-none" required />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-slate-400 text-xs font-mono mb-2">Tech Stack <span className="text-slate-600">(comma separated)</span></label>
                  <input name="techStack" value={form.techStack} onChange={handleChange} placeholder="React, Node.js, MongoDB, ..." className="input-field" />
                </div>
                <div>
                  <label className="block text-slate-400 text-xs font-mono mb-2">GitHub URL</label>
                  <input name="githubUrl" value={form.githubUrl} onChange={handleChange} placeholder="https://github.com/..." className="input-field" />
                </div>
                <div>
                  <label className="block text-slate-400 text-xs font-mono mb-2">Live URL</label>
                  <input name="liveUrl" value={form.liveUrl} onChange={handleChange} placeholder="https://myproject.vercel.app" className="input-field" />
                </div>
                <div>
                  <label className="block text-slate-400 text-xs font-mono mb-2">Image URL</label>
                  <input name="imageUrl" value={form.imageUrl} onChange={handleChange} placeholder="https://..." className="input-field" />
                </div>
                <div>
                  <label className="block text-slate-400 text-xs font-mono mb-2">Display Order</label>
                  <input type="number" name="order" value={form.order} onChange={handleChange} className="input-field" min={0} />
                </div>
                <div className="md:col-span-2 flex items-center gap-3">
                  <input type="checkbox" id="featured" name="featured" checked={form.featured} onChange={handleChange} className="w-4 h-4 accent-brand-500 cursor-pointer" />
                  <label htmlFor="featured" className="text-slate-300 text-sm cursor-pointer select-none">Mark as featured project (shows on homepage)</label>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
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
