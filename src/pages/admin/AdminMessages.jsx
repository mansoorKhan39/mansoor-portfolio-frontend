import { useState, useEffect } from 'react'
import { Trash2, Mail, MailOpen, Loader, RefreshCw } from 'lucide-react'
import toast from 'react-hot-toast'
import api from '../../api'

export default function AdminMessages() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)
  const [deleting, setDeleting] = useState(null)

  const fetchMessages = () => {
    setLoading(true)
    api.get('/api/messages')
      .then(res => setMessages(res.data))
      .catch(() => toast.error('Failed to load messages'))
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchMessages() }, [])

  const markRead = async (msg) => {
    if (msg.read) return
    try {
      await api.patch(`/api/messages/${msg._id}/read`)
      setMessages(p => p.map(m => m._id === msg._id ? { ...m, read: true } : m))
    } catch {}
  }

  const handleSelect = (msg) => {
    setSelected(msg)
    markRead(msg)
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this message?')) return
    setDeleting(id)
    try {
      await api.delete(`/api/messages/${id}`)
      toast.success('Message deleted.')
      setMessages(p => p.filter(m => m._id !== id))
      if (selected?._id === id) setSelected(null)
    } catch {
      toast.error('Failed to delete.')
    } finally {
      setDeleting(null)
    }
  }

  const unreadCount = messages.filter(m => !m.read).length

  const formatDate = (iso) => new Date(iso).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'
  })

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-white mb-1">Messages</h1>
          <p className="text-slate-500 text-sm font-mono">
            {messages.length} total{unreadCount > 0 && <span className="ml-2 text-brand-400">{unreadCount} unread</span>}
          </p>
        </div>
        <button onClick={fetchMessages} className="btn-outline text-sm py-2">
          <RefreshCw size={15} /> Refresh
        </button>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => <div key={i} className="card h-20 animate-pulse" />)}
        </div>
      ) : messages.length === 0 ? (
        <div className="text-center py-24 text-slate-500">
          <Mail size={48} className="mx-auto mb-4 opacity-30" />
          <p>No messages yet.</p>
          <p className="text-sm mt-1">Messages from your contact form will appear here.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-5 gap-6 h-[calc(100vh-220px)]">
          {/* Message list */}
          <div className="md:col-span-2 overflow-y-auto space-y-2 pr-1">
            {messages.map(msg => (
              <div
                key={msg._id}
                onClick={() => handleSelect(msg)}
                className={`card cursor-pointer transition-all hover:border-slate-700 ${selected?._id === msg._id ? 'border-brand-500/40 bg-brand-500/5' : ''} ${!msg.read ? 'border-brand-500/20' : ''}`}
              >
                <div className="flex items-start gap-3">
                  <div className={`mt-1 shrink-0 ${!msg.read ? 'text-brand-400' : 'text-slate-600'}`}>
                    {msg.read ? <MailOpen size={16} /> : <Mail size={16} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-0.5">
                      <p className={`text-sm font-medium truncate ${!msg.read ? 'text-white' : 'text-slate-300'}`}>{msg.name}</p>
                      {!msg.read && <span className="w-2 h-2 rounded-full bg-brand-400 shrink-0" />}
                    </div>
                    <p className="text-slate-400 text-xs truncate">{msg.subject || '(No subject)'}</p>
                    <p className="text-slate-600 text-xs mt-0.5 truncate">{msg.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Message detail */}
          <div className="md:col-span-3">
            {selected ? (
              <div className="card h-full overflow-y-auto">
                <div className="flex items-start justify-between gap-4 mb-6 pb-6 border-b border-slate-800">
                  <div>
                    <h2 className="font-display font-bold text-white text-xl mb-1">{selected.subject || '(No subject)'}</h2>
                    <div className="flex items-center gap-4 text-sm text-slate-400">
                      <span className="font-medium text-slate-300">{selected.name}</span>
                      <a href={`mailto:${selected.email}`} className="hover:text-brand-400 transition-colors">{selected.email}</a>
                    </div>
                    <p className="text-slate-600 text-xs mt-1 font-mono">{formatDate(selected.createdAt)}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(selected._id)}
                    disabled={deleting === selected._id}
                    className="p-2 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors shrink-0 disabled:opacity-50"
                  >
                    {deleting === selected._id ? <Loader size={16} className="animate-spin" /> : <Trash2 size={16} />}
                  </button>
                </div>

                <div className="text-slate-300 font-body leading-relaxed whitespace-pre-wrap">
                  {selected.message}
                </div>

                <div className="mt-8 pt-6 border-t border-slate-800">
                  <a
                    href={`mailto:${selected.email}?subject=Re: ${selected.subject || ''}`}
                    className="btn-primary text-sm"
                  >
                    <Mail size={16} /> Reply via Email
                  </a>
                </div>
              </div>
            ) : (
              <div className="card h-full flex items-center justify-center text-center">
                <div>
                  <MailOpen size={48} className="mx-auto mb-4 text-slate-700" />
                  <p className="text-slate-500 font-body">Select a message to read</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
