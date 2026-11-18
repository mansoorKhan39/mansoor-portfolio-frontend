import { useEffect, useState } from 'react'
import { Globe, Monitor, Smartphone, RefreshCw, TrendingUp, MousePointer } from 'lucide-react'
import api from '../../api'

export default function AdminAnalytics() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchAnalytics = () => {
    setLoading(true)
    api
      .get('/api/visits/analytics')
      .then((res) => setData(res.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchAnalytics()
  }, [])

  const deviceIcons = { Desktop: Monitor, Mobile: Smartphone, Tablet: Smartphone }

  const formatTime = (iso) =>
    new Date(iso).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })

  const total = data?.total || 0

  return (
    <div className="p-4 md:p-8 max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
            Analytics
          </h1>
          <p className="text-sm font-mono" style={{ color: 'var(--text-dim)' }}>
            Visitor insights for your portfolio
          </p>
        </div>
        <button onClick={fetchAnalytics} className="btn-outline text-sm py-2">
          <RefreshCw size={15} /> Refresh
        </button>
      </div>

      {loading ? (
        <div className="grid md:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="card h-32 animate-pulse" />
          ))}
        </div>
      ) : (
        <>
          <div className="card border-[var(--border-strong)] mb-6">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-2xl border border-[var(--border)]" style={{ backgroundColor: 'var(--bg-sidebar)' }}>
                <TrendingUp size={26} style={{ color: 'var(--chrome-highlight)' }} />
              </div>
              <div>
                <p className="text-xs font-mono" style={{ color: 'var(--text-dim)' }}>
                  Total Portfolio Visits
                </p>
                <p className="font-display text-4xl md:text-5xl font-bold tabular-nums" style={{ color: 'var(--text-primary)' }}>
                  {total.toLocaleString()}
                </p>
                <p className="text-xs font-mono mt-1" style={{ color: 'var(--metallic-silver)' }}>All time</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {/* Countries */}
            <div className="card">
              <div className="flex items-center gap-2 mb-4">
                <Globe size={18} style={{ color: 'var(--chrome-highlight)' }} />
                <h3 className="font-display font-bold" style={{ color: 'var(--text-primary)' }}>
                  Top Countries
                </h3>
              </div>
              {Object.entries(data?.countries || {}).length === 0 ? (
                <p className="text-sm" style={{ color: 'var(--text-dim)' }}>No data yet</p>
              ) : (
                <div className="space-y-3">
                  {Object.entries(data?.countries || {}).map(([country, count]) => (
                    <div key={country}>
                      <div className="flex justify-between mb-1 text-sm">
                        <span style={{ color: 'var(--text-muted)' }}>{country}</span>
                        <span className="font-mono font-bold tabular-nums" style={{ color: 'var(--text-primary)' }}>{count}</span>
                      </div>
                      <div className="h-1.5 rounded-full" style={{ backgroundColor: 'var(--border)' }}>
                        <div
                          className="h-1.5 rounded-full transition-all duration-700"
                          style={{
                            width: `${total ? Math.round((count / total) * 100) : 0}%`,
                            background: 'linear-gradient(90deg, var(--text-dim), var(--chrome-highlight))',
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Devices */}
            <div className="card">
              <div className="flex items-center gap-2 mb-4">
                <Monitor size={18} style={{ color: 'var(--chrome-highlight)' }} />
                <h3 className="font-display font-bold" style={{ color: 'var(--text-primary)' }}>
                  Devices
                </h3>
              </div>
              <div className="space-y-2.5">
                {Object.entries(data?.devices || {}).map(([device, count]) => {
                  const Icon = deviceIcons[device] || Monitor
                  return (
                    <div
                      key={device}
                      className="flex items-center justify-between p-3 rounded-xl border border-[var(--border)]"
                      style={{ backgroundColor: 'var(--bg-sidebar)' }}
                    >
                      <div className="flex items-center gap-2">
                        <Icon size={16} style={{ color: 'var(--metallic-silver)' }} />
                        <span className="text-sm" style={{ color: 'var(--text-primary)' }}>{device}</span>
                      </div>
                      <div className="text-right tabular-nums">
                        <span className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>{count}</span>
                        <span className="text-xs ml-1.5 font-mono" style={{ color: 'var(--text-dim)' }}>
                          ({total ? Math.round((count / total) * 100) : 0}%)
                        </span>
                      </div>
                    </div>
                  )
                })}
                {Object.keys(data?.devices || {}).length === 0 && (
                  <p className="text-sm" style={{ color: 'var(--text-dim)' }}>No data yet</p>
                )}
              </div>
            </div>

            {/* Pages */}
            <div className="card">
              <div className="flex items-center gap-2 mb-4">
                <MousePointer size={18} style={{ color: 'var(--chrome-highlight)' }} />
                <h3 className="font-display font-bold" style={{ color: 'var(--text-primary)' }}>
                  Pages Visited
                </h3>
              </div>
              <div className="space-y-3">
                {Object.entries(data?.pages || {})
                  .sort((a, b) => b[1] - a[1])
                  .map(([page, count]) => (
                    <div key={page}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-mono" style={{ color: 'var(--text-muted)' }}>{page}</span>
                        <span className="text-sm font-mono font-bold tabular-nums" style={{ color: 'var(--text-primary)' }}>{count}</span>
                      </div>
                      <div className="h-1.5 rounded-full" style={{ backgroundColor: 'var(--border)' }}>
                        <div
                          className="h-1.5 rounded-full transition-all duration-700"
                          style={{
                            width: `${total ? Math.round((count / total) * 100) : 0}%`,
                            background: 'linear-gradient(90deg, var(--text-dim), var(--chrome-highlight))',
                          }}
                        />
                      </div>
                    </div>
                  ))}
                {Object.keys(data?.pages || {}).length === 0 && (
                  <p className="text-sm" style={{ color: 'var(--text-dim)' }}>No data yet</p>
                )}
              </div>
            </div>

            {/* Browsers */}
            <div className="card">
              <div className="flex items-center gap-2 mb-4">
                <Globe size={18} style={{ color: 'var(--chrome-highlight)' }} />
                <h3 className="font-display font-bold" style={{ color: 'var(--text-primary)' }}>
                  Browsers
                </h3>
              </div>
              <div className="space-y-3">
                {Object.entries(data?.browsers || {})
                  .sort((a, b) => b[1] - a[1])
                  .map(([browser, count]) => (
                    <div key={browser}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm" style={{ color: 'var(--text-muted)' }}>{browser}</span>
                        <span className="text-sm font-mono font-bold tabular-nums" style={{ color: 'var(--text-primary)' }}>{count}</span>
                      </div>
                      <div className="h-1.5 rounded-full" style={{ backgroundColor: 'var(--border)' }}>
                        <div
                          className="h-1.5 rounded-full transition-all duration-700"
                          style={{
                            width: `${total ? Math.round((count / total) * 100) : 0}%`,
                            background: 'linear-gradient(90deg, var(--text-dim), var(--chrome-highlight))',
                          }}
                        />
                      </div>
                    </div>
                  ))}
                {Object.keys(data?.browsers || {}).length === 0 && (
                  <p className="text-sm" style={{ color: 'var(--text-dim)' }}>No data yet</p>
                )}
              </div>
            </div>
          </div>

          {/* Recent Visitors Table */}
          <div className="card">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp size={18} style={{ color: 'var(--chrome-highlight)' }} />
              <h3 className="font-display font-bold" style={{ color: 'var(--text-primary)' }}>
                Recent Visitors
              </h3>
              <span className="text-xs font-mono ml-auto" style={{ color: 'var(--text-dim)' }}>
                last 20
              </span>
            </div>

            {data?.recent?.length === 0 ? (
              <p className="text-sm text-center py-8" style={{ color: 'var(--text-dim)' }}>
                No visitors yet.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm tabular-nums">
                  <thead>
                    <tr className="border-b border-[var(--border)]">
                      <th className="text-left py-2.5 px-3 font-mono text-xs" style={{ color: 'var(--text-dim)' }}>Time</th>
                      <th className="text-left py-2.5 px-3 font-mono text-xs" style={{ color: 'var(--text-dim)' }}>Country</th>
                      <th className="text-left py-2.5 px-3 font-mono text-xs" style={{ color: 'var(--text-dim)' }}>City</th>
                      <th className="text-left py-2.5 px-3 font-mono text-xs" style={{ color: 'var(--text-dim)' }}>Device</th>
                      <th className="text-left py-2.5 px-3 font-mono text-xs" style={{ color: 'var(--text-dim)' }}>Browser</th>
                      <th className="text-left py-2.5 px-3 font-mono text-xs" style={{ color: 'var(--text-dim)' }}>Page</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(data?.recent || []).map((v, i) => (
                      <tr key={i} className="border-b border-[var(--border)] hover:bg-white/5 transition-colors">
                        <td className="py-2.5 px-3 font-mono text-xs" style={{ color: 'var(--text-muted)' }}>
                          {formatTime(v.visitedAt)}
                        </td>
                        <td className="py-2.5 px-3 text-xs" style={{ color: 'var(--text-primary)' }}>{v.country}</td>
                        <td className="py-2.5 px-3 text-xs" style={{ color: 'var(--text-muted)' }}>{v.city}</td>
                        <td className="py-2.5 px-3 text-xs font-mono" style={{ color: 'var(--text-primary)' }}>{v.device}</td>
                        <td className="py-2.5 px-3 text-xs" style={{ color: 'var(--text-muted)' }}>{v.browser}</td>
                        <td className="py-2.5 px-3 font-mono text-xs" style={{ color: 'var(--text-muted)' }}>{v.page}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
