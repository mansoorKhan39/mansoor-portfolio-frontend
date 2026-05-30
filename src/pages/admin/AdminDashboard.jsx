import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FolderKanban, MessageSquare, Eye, Plus, ArrowRight, Users } from 'lucide-react'
import api from '../../api'

export default function AdminDashboard() {
  const [stats, setStats] = useState({ projects: 0, messages: 0, unread: 0, visits: 0 })
  const [recentMessages, setRecentMessages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      api.get('/api/projects'),
      api.get('/api/messages'),
      api.get('/api/visits'),
    ]).then(([projRes, msgRes, visitRes]) => {
      const messages = msgRes.data
      setStats({
        projects: projRes.data.length,
        messages: messages.length,
        unread: messages.filter(m => !m.read).length,
        visits: visitRes.data.count,
      })
      setRecentMessages(messages.slice(0, 4))
    }).catch(() => {}).finally(() => setLoading(false))
  }, [])

  const cards = [
    { label: 'Total Visits', value: stats.visits, icon: Users, color: 'text-brand-400', bg: 'bg-brand-500/10 border-brand-500/20', to: '/admin' },
    { label: 'Total Projects', value: stats.projects, icon: FolderKanban, color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20', to: '/admin/projects' },
    { label: 'Total Messages', value: stats.messages, icon: MessageSquare, color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/20', to: '/admin/messages' },
    { label: 'Unread Messages', value: stats.unread, icon: Eye, color: 'text-rose-400', bg: 'bg-rose-500/10 border-rose-500/20', to: '/admin/messages' },
  ]

  return (
    <div className="p-4 md:p-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-white mb-1">Dashboard</h1>
        <p className="text-slate-500 font-body text-sm">Welcome back, Mansoor 👋</p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-10">
        {cards.map(({ label, value, icon: Icon, color, bg, to }) => (
          <Link key={label} to={to} className="card hover:border-slate-700 transition-all hover:-translate-y-0.5 group">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-slate-500 text-sm font-mono mb-1">{label}</p>
                <p className="font-display text-4xl font-bold text-white">
                  {loading ? <span className="text-slate-700">—</span> : value}
                </p>
              </div>
              <div className={`p-2.5 rounded-lg border ${bg}`}>
                <Icon size={20} className={color} />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-4 text-slate-600 group-hover:text-brand-400 transition-colors text-xs font-mono">
              Manage <ArrowRight size={12} />
            </div>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <div className="card">
          <h2 className="font-display font-semibold text-white mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link to="/admin/projects" className="flex items-center gap-3 p-3 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors text-sm text-slate-300">
              <Plus size={16} className="text-brand-400" />
              Add New Project
            </Link>
            <Link to="/admin/messages" className="flex items-center gap-3 p-3 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors text-sm text-slate-300">
              <MessageSquare size={16} className="text-blue-400" />
              View Messages {stats.unread > 0 && <span className="ml-auto bg-brand-500 text-slate-950 text-xs font-bold px-2 py-0.5 rounded-full">{stats.unread}</span>}
            </Link>
            <a href="/" target="_blank" rel="noreferrer" className="flex items-center gap-3 p-3 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors text-sm text-slate-300">
              <Eye size={16} className="text-purple-400" />
              Preview Portfolio
            </a>
          </div>
        </div>

        {/* Recent messages */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-semibold text-white">Recent Messages</h2>
            <Link to="/admin/messages" className="text-brand-400 text-xs hover:text-brand-300 transition-colors font-mono">View all →</Link>
          </div>
          {loading ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => <div key={i} className="h-12 bg-slate-800 rounded-lg animate-pulse" />)}
            </div>
          ) : recentMessages.length > 0 ? (
            <div className="space-y-3">
              {recentMessages.map(msg => (
                <div key={msg._id} className="flex items-start gap-3 p-3 bg-slate-800 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-brand-500/20 flex items-center justify-center text-brand-400 font-bold text-sm shrink-0">
                    {msg.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-slate-300 text-sm font-medium truncate">{msg.name}</p>
                      {!msg.read && <span className="w-2 h-2 rounded-full bg-brand-400 shrink-0" />}
                    </div>
                    <p className="text-slate-500 text-xs truncate">{msg.subject || msg.message}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-600 text-sm font-body text-center py-4">No messages yet.</p>
          )}
        </div>
      </div>
    </div>
  )
}
