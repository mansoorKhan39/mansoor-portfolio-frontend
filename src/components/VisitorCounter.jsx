import { useEffect, useState } from 'react'
import { Eye } from 'lucide-react'
import api from '../api'

export default function VisitorCounter() {
  const [count, setCount] = useState(null)

  useEffect(() => {
    const tracked = sessionStorage.getItem('visited')
    if (!tracked) {
      api.post('/api/visits/track', { page: window.location.pathname })
        .then((res) => {
          setCount(res.data.count)
          sessionStorage.setItem('visited', 'true')
        })
        .catch(() => {})
    } else {
      api.get('/api/visits')
        .then((res) => setCount(res.data.count))
        .catch(() => {})
    }
  }, [])

  if (count === null) return null

  return (
    <div
      className="inline-flex items-center gap-2 text-xs font-mono tabular-nums"
      style={{ color: 'var(--text-dim)' }}
    >
      <Eye size={14} style={{ color: 'var(--metallic-silver)' }} />
      <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
        {count.toLocaleString()}
      </span>
      <span>total visits</span>
    </div>
  )
}
