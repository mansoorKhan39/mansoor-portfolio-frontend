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
    ])
      .then(([projRes, msgRes, visitRes]) => {
        const messages = Array.isArray(msgRes.data) ? msgRes.data : []
        const projects = Array.isArray(projRes.data) ? projRes.data : []
        setStats({
          projects: projects.length,
          messages: messages.length,
          unread: messages.filter((m) => !m.read).length,
          visits: visitRes.data?.count || 0,
        })
        setRecentMessages(messages.slice(0, 4))
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const cards = [
    { label: 'Total Visits', value: stats.visits, icon: Users, to: '/admin/analytics' },
    { label: 'Total Projects', value: stats.projects, icon: FolderKanban, to: '/admin/projects' },
    { label: 'Total Messages', value: stats.messages, icon: MessageSquare, to: '/admin/messages' },
    { label: 'Unread Messages', value: stats.unread, icon: Eye, to: '/admin/messages' },
  ]

  return (
    <div className="p-4 md:p-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
          Dashboard
        </h1>
        <p className="font-body text-sm" style={{ color: 'var(--text-muted)' }}>
          Welcome back, Mansoor
        </p>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {cards.map(({ label, value, icon: Icon, to }) => (
          <Link key={label} to={to} className="card hover:border-[var(--border-strong)] transition-all hover:-translate-y-0.5 group">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-mono mb-1" style={{ color: 'var(--text-dim)' }}>
                  {label}
                </p>
                <p className="font-display text-3xl font-bold tabular-nums" style={{ color: 'var(--text-primary)' }}>
                  {loading ? '—' : value.toLocaleString()}
                </p>
              </div>
              <div className="p-2.5 rounded-xl border border-[var(--border)]" style={{ backgroundColor: 'var(--bg-sidebar)' }}>
                <Icon size={18} style={{ color: 'var(--chrome-highlight)' }} />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-4 group-hover:opacity-100 opacity-75 transition-opacity text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
              Manage <ArrowRight size={12} />
            </div>
          </Link>
        ))}
      </div>

      {/* Quick actions + Recent Messages */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="font-display font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            Quick Actions
          </h2>
          <div className="space-y-2.5">
            <Link
              to="/admin/projects"
              className="flex items-center gap-3 p-3.5 rounded-xl border border-[var(--border)] hover:border-[var(--border-strong)] transition-colors text-sm"
              style={{ backgroundColor: 'var(--bg-sidebar)', color: 'var(--text-primary)' }}
            >
              <Plus size={16} style={{ color: 'var(--chrome-highlight)' }} />
              Add New Project
            </Link>
            <Link
              to="/admin/messages"
              className="flex items-center gap-3 p-3.5 rounded-xl border border-[var(--border)] hover:border-[var(--border-strong)] transition-colors text-sm"
              style={{ backgroundColor: 'var(--bg-sidebar)', color: 'var(--text-primary)' }}
            >
              <MessageSquare size={16} style={{ color: 'var(--chrome-highlight)' }} />
              View Messages
              {stats.unread > 0 && (
                <span className="ml-auto text-xs font-mono font-semibold tabular-nums" style={{ color: 'var(--text-primary)' }}>
                  {stats.unread} unread
                </span>
              )}
            </Link>
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 p-3.5 rounded-xl border border-[var(--border)] hover:border-[var(--border-strong)] transition-colors text-sm"
              style={{ backgroundColor: 'var(--bg-sidebar)', color: 'var(--text-primary)' }}
            >
              <Eye size={16} style={{ color: 'var(--chrome-highlight)' }} />
              Preview Portfolio
            </a>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-bold" style={{ color: 'var(--text-primary)' }}>
              Recent Messages
            </h2>
            <Link to="/admin/messages" className="text-xs hover:opacity-80 transition-opacity font-mono" style={{ color: 'var(--text-primary)' }}>
              View all →
            </Link>
          </div>
          {loading ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-14 rounded-xl animate-pulse" style={{ backgroundColor: 'var(--border)' }} />
              ))}
            </div>
          ) : recentMessages.length > 0 ? (
            <div className="space-y-2.5">
              {recentMessages.map((msg) => (
                <div
                  key={msg._id}
                  className="flex items-start gap-3 p-3 rounded-xl border border-[var(--border)]"
                  style={{ backgroundColor: 'var(--bg-sidebar)' }}
                >
                  <div
                    className="w-8 h-8 rounded-lg border border-[var(--border)] flex items-center justify-center font-bold text-sm shrink-0"
                    style={{ backgroundColor: 'var(--bg-card)', color: 'var(--text-primary)' }}
                  >
                    {msg.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-medium truncate" style={{ color: 'var(--text-primary)' }}>
                        {msg.name}
                      </p>
                      {!msg.read && (
                        <span className="text-[11px] font-mono shrink-0" style={{ color: 'var(--chrome-highlight)' }}>
                          Unread
                        </span>
                      )}
                    </div>
                    <p className="text-xs truncate" style={{ color: 'var(--text-muted)' }}>
                      {msg.subject || msg.message}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm font-body text-center py-6" style={{ color: 'var(--text-dim)' }}>
              No messages yet.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
