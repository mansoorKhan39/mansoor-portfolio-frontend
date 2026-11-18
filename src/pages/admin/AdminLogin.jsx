import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react'
import toast from 'react-hot-toast'
import { useAuth } from '../../context/AuthContext'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!password) return
    setLoading(true)
    try {
      await login(password)
      toast.success('Welcome back, Mansoor!')
      navigate('/admin')
    } catch {
      toast.error('Invalid password. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="relative z-10 w-full max-w-sm mx-4">
        <div className="text-center mb-8">
          <div
            className="inline-flex p-4 rounded-2xl border border-[var(--border)] mb-4"
            style={{ backgroundColor: 'var(--bg-card)' }}
          >
            <Lock size={24} style={{ color: 'var(--chrome-highlight)' }} />
          </div>
          <h1 className="font-display text-2xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
            Admin Access
          </h1>
          <p className="text-sm font-body" style={{ color: 'var(--text-muted)' }}>
            Enter your password to continue
          </p>
        </div>

        <form onSubmit={handleSubmit} className="card space-y-4">
          <div>
            <label className="block text-xs font-mono mb-2" style={{ color: 'var(--text-muted)' }}>
              Password
            </label>
            <div className="relative">
              <input
                type={show ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="input-field pr-10"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-3 top-1/2 -translate-y-1/2 hover:opacity-80 transition-opacity"
                style={{ color: 'var(--text-dim)' }}
                aria-label={show ? 'Hide password' : 'Show password'}
              >
                {show ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !password}
            className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
              'Login'
            )}
          </button>
        </form>

        <p className="text-center text-xs mt-6 font-mono">
          <Link to="/" className="inline-flex items-center gap-1.5 hover:opacity-80 transition-opacity" style={{ color: 'var(--text-dim)' }}>
            <ArrowLeft size={13} /> Back to portfolio
          </Link>
        </p>
      </div>
    </div>
  )
}
