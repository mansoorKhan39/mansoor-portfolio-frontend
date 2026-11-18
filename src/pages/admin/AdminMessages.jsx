import { useState, useEffect } from 'react'
import { Trash2, Mail, MailOpen, Loader, RefreshCw, ArrowLeft } from 'lucide-react'
import toast from 'react-hot-toast'
import api from '../../api'

export default function AdminMessages() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)
  const [deleting, setDeleting] = useState(null)
  const [confirmDeleteId, setConfirmDeleteId] = useState(null)
  const [showDetail, setShowDetail] = useState(false)

  const fetchMessages = () => {
    setLoading(true)
    api
      .get('/api/messages')
      .then((res) => setMessages(Array.isArray(res.data) ? res.data : []))
      .catch(() => toast.error('Failed to load messages'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  const markRead = async (msg) => {
    if (msg.read) return
    try {
      await api.patch(`/api/messages/${msg._id}/read`)
      setMessages((p) => p.map((m) => (m._id === msg._id ? { ...m, read: true } : m)))
    } catch {}
  }

  const handleSelect = (msg) => {
    setSelected({ ...msg, read: true })
    markRead(msg)
    setShowDetail(true)
  }

  const handleDelete = async (id) => {
    setDeleting(id)
    setConfirmDeleteId(null)
    try {
      await api.delete(`/api/messages/${id}`)
      toast.success('Message deleted.')
      setMessages((p) => p.filter((m) => m._id !== id))
      if (selected?._id === id) {
        setSelected(null)
        setShowDetail(false)
      }
    } catch {
      toast.error('Failed to delete.')
    } finally {
      setDeleting(null)
    }
  }

  const unreadCount = messages.filter((m) => !m.read).length

  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })

  return (
    <div className="p-4 md:p-8 max-w-6xl">
      <div className="flex items-center justify-between mb-6 md:mb-8">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
            Messages
          </h1>
          <p className="text-sm font-mono tabular-nums" style={{ color: 'var(--text-dim)' }}>
            {messages.length} total
            {unreadCount > 0 && (
              <span className="ml-2" style={{ color: 'var(--text-primary)' }}>
                · {unreadCount} unread
              </span>
            )}
          </p>
        </div>
        <button onClick={fetchMessages} className="btn-outline text-sm py-2">
          <RefreshCw size={15} /> Refresh
        </button>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="card h-20 animate-pulse" />
          ))}
        </div>
      ) : messages.length === 0 ? (
        <div className="card text-center py-20" style={{ color: 'var(--text-dim)' }}>
          <Mail size={44} className="mx-auto mb-4 opacity-30" />
          <p>No messages yet.</p>
        </div>
      ) : (
        <>
          {/* Mobile */}
          <div className="md:hidden">
            {showDetail && selected ? (
              <div className="card">
                <button
                  onClick={() => setShowDetail(false)}
                  className="flex items-center gap-2 hover:opacity-80 transition-opacity text-sm mb-4"
                  style={{ color: 'var(--text-muted)' }}
                >
                  <ArrowLeft size={16} /> Back to messages
                </button>
                <div className="flex items-start justify-between gap-4 mb-6 pb-4 border-b border-[var(--border)]">
                  <div>
                    <h2 className="font-display font-bold text-lg mb-1" style={{ color: 'var(--text-primary)' }}>
                      {selected.subject || '(No subject)'}
                    </h2>
                    <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{selected.name}</p>
                    <a href={`mailto:${selected.email}`} className="text-sm hover:opacity-80" style={{ color: 'var(--metallic-silver)' }}>
                      {selected.email}
                    </a>
                    <p className="text-xs mt-1 font-mono" style={{ color: 'var(--text-dim)' }}>
                      {formatDate(selected.createdAt)}
                    </p>
                  </div>
                  {confirmDeleteId === selected._id ? (
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => handleDelete(selected._id)}
                        disabled={deleting === selected._id}
                        className="px-2.5 py-1 rounded-lg text-xs font-mono bg-rose-500/20 text-rose-300 border border-rose-500/30 hover:bg-rose-500/30 transition-colors"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => setConfirmDeleteId(null)}
                        className="px-2 py-1 rounded-lg text-xs font-mono hover:bg-white/5 transition-colors"
                        style={{ color: 'var(--text-dim)' }}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setConfirmDeleteId(selected._id)}
                      disabled={deleting === selected._id}
                      className="p-2 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors shrink-0"
                      style={{ color: 'var(--text-dim)' }}
                    >
                      {deleting === selected._id ? <Loader size={16} className="animate-spin" /> : <Trash2 size={16} />}
                    </button>
                  )}
                </div>
                <p className="font-body leading-relaxed whitespace-pre-wrap text-sm" style={{ color: 'var(--text-muted)' }}>
                  {selected.message}
                </p>
                <div className="mt-6 pt-4 border-t border-[var(--border)]">
                  <a href={`mailto:${selected.email}?subject=Re: ${selected.subject || ''}`} className="btn-primary text-sm">
                    <Mail size={16} /> Reply via Email
                  </a>
                </div>
              </div>
            ) : (
              <div className="space-y-2.5">
                {messages.map((msg) => (
                  <div
                    key={msg._id}
                    onClick={() => handleSelect(msg)}
                    className={`card cursor-pointer transition-all hover:border-[var(--border-strong)] ${
                      !msg.read ? 'border-[var(--border-strong)]' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-1 shrink-0" style={{ color: !msg.read ? 'var(--chrome-highlight)' : 'var(--text-dim)' }}>
                        {msg.read ? <MailOpen size={16} /> : <Mail size={16} />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-0.5">
                          <p className="text-sm font-medium truncate" style={{ color: 'var(--text-primary)' }}>
                            {msg.name}
                          </p>
                          {!msg.read && <span className="text-[11px] font-mono shrink-0" style={{ color: 'var(--chrome-highlight)' }}>New</span>}
                        </div>
                        <p className="text-xs truncate" style={{ color: 'var(--text-muted)' }}>
                          {msg.subject || '(No subject)'}
                        </p>
                        <p className="text-xs mt-0.5 truncate" style={{ color: 'var(--text-dim)' }}>
                          {msg.message}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Desktop */}
          <div className="hidden md:grid md:grid-cols-5 gap-6" style={{ height: 'calc(100vh - 220px)' }}>
            <div className="md:col-span-2 overflow-y-auto space-y-2.5 pr-1">
              {messages.map((msg) => (
                <div
                  key={msg._id}
                  onClick={() => handleSelect(msg)}
                  className={`card cursor-pointer transition-all hover:border-[var(--border-strong)] ${
                    selected?._id === msg._id ? 'border-[var(--border-strong)] bg-white/5' : !msg.read ? 'border-[var(--border-strong)]' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1 shrink-0" style={{ color: !msg.read ? 'var(--chrome-highlight)' : 'var(--text-dim)' }}>
                      {msg.read ? <MailOpen size={16} /> : <Mail size={16} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-0.5">
                        <p className="text-sm font-medium truncate" style={{ color: 'var(--text-primary)' }}>
                          {msg.name}
                        </p>
                        {!msg.read && <span className="text-[11px] font-mono shrink-0" style={{ color: 'var(--chrome-highlight)' }}>New</span>}
                      </div>
                      <p className="text-xs truncate" style={{ color: 'var(--text-muted)' }}>
                        {msg.subject || '(No subject)'}
                      </p>
                      <p className="text-xs mt-0.5 truncate" style={{ color: 'var(--text-dim)' }}>
                        {msg.message}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="md:col-span-3">
              {selected ? (
                <div className="card h-full overflow-y-auto">
                  <div className="flex items-start justify-between gap-4 mb-6 pb-6 border-b border-[var(--border)]">
                    <div>
                      <h2 className="font-display font-bold text-xl mb-1" style={{ color: 'var(--text-primary)' }}>
                        {selected.subject || '(No subject)'}
                      </h2>
                      <div className="flex items-center gap-4 text-sm" style={{ color: 'var(--text-muted)' }}>
                        <span className="font-medium" style={{ color: 'var(--text-primary)' }}>{selected.name}</span>
                        <a href={`mailto:${selected.email}`} className="hover:opacity-80 transition-opacity">
                          {selected.email}
                        </a>
                      </div>
                      <p className="text-xs mt-1 font-mono" style={{ color: 'var(--text-dim)' }}>
                        {formatDate(selected.createdAt)}
                      </p>
                    </div>
                    {confirmDeleteId === selected._id ? (
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => handleDelete(selected._id)}
                          disabled={deleting === selected._id}
                          className="px-2.5 py-1 rounded-lg text-xs font-mono bg-rose-500/20 text-rose-300 border border-rose-500/30 hover:bg-rose-500/30 transition-colors"
                        >
                          Confirm Delete
                        </button>
                        <button
                          onClick={() => setConfirmDeleteId(null)}
                          className="px-2 py-1 rounded-lg text-xs font-mono hover:bg-white/5 transition-colors"
                          style={{ color: 'var(--text-dim)' }}
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setConfirmDeleteId(selected._id)}
                        disabled={deleting === selected._id}
                        className="p-2 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors shrink-0"
                        style={{ color: 'var(--text-dim)' }}
                      >
                        {deleting === selected._id ? <Loader size={16} className="animate-spin" /> : <Trash2 size={16} />}
                      </button>
                    )}
                  </div>
                  <div className="font-body leading-relaxed whitespace-pre-wrap" style={{ color: 'var(--text-muted)' }}>
                    {selected.message}
                  </div>
                  <div className="mt-8 pt-6 border-t border-[var(--border)]">
                    <a href={`mailto:${selected.email}?subject=Re: ${selected.subject || ''}`} className="btn-primary text-sm">
                      <Mail size={16} /> Reply via Email
                    </a>
                  </div>
                </div>
              ) : (
                <div className="card h-full flex items-center justify-center text-center">
                  <div>
                    <MailOpen size={44} className="mx-auto mb-3 opacity-30" style={{ color: 'var(--text-dim)' }} />
                    <p className="font-body" style={{ color: 'var(--text-muted)' }}>
                      Select a message to read
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
