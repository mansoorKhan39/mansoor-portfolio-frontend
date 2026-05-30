import { useEffect, useState } from 'react'
import { Eye } from 'lucide-react'
import api from '../api'

export default function VisitorCounter() {
  const [count, setCount] = useState(null)

  useEffect(() => {
    // Track visit once per session
    const tracked = sessionStorage.getItem('visited')
    if (!tracked) {
      api.post('/api/visits/track')
        .then(res => { setCount(res.data.count); sessionStorage.setItem('visited', 'true') })
        .catch(() => {})
    } else {
      api.get('/api/visits')
        .then(res => setCount(res.data.count))
        .catch(() => {})
    }
  }, [])

  if (count === null) return null

  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border)] text-sm font-mono"
      style={{ backgroundColor: 'var(--bg-card)', color: 'var(--text-muted)' }}>
      <Eye size={14} className="text-brand-400" />
      <span className="text-brand-400 font-bold">{count.toLocaleString()}</span>
      <span>total visits</span>
    </div>
  )
}
