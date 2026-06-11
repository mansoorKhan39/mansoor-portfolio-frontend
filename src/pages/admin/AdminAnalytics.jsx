import { useEffect, useState } from 'react'
import { Globe, Monitor, Smartphone, Chrome, RefreshCw, TrendingUp, MousePointer } from 'lucide-react'
import api from '../../api'

export default function AdminAnalytics() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetch = () => {
    setLoading(true)
    api.get('/api/visits/analytics')
      .then(res => setData(res.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetch() }, [])

  const deviceIcons = { Desktop: Monitor, Mobile: Smartphone, Tablet: Smartphone }
  const deviceColors = { Desktop: 'text-blue-400', Mobile: 'text-brand-400', Tablet: 'text-purple-400' }
  const deviceBg = { Desktop: 'bg-blue-500/10 border-blue-500/20', Mobile: 'bg-brand-500/10 border-brand-500/20', Tablet: 'bg-purple-500/10 border-purple-500/20' }

  const formatTime = (iso) => new Date(iso).toLocaleString('en-US', {
    month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
  })

  const total = data?.total || 0

  return (
    <div className="p-4 md:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-white mb-1">Analytics</h1>
          <p className="text-slate-500 text-sm font-mono">Visitor insights for your portfolio</p>
        </div>
        <button onClick={fetch} className="btn-outline text-sm py-2">
          <RefreshCw size={15} /> Refresh
        </button>
      </div>

      {loading ? (
        <div className="grid md:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => <div key={i} className="card h-32 animate-pulse" />)}
        </div>
      ) : (
        <>
          {/* Total visits big card */}
          <div className="card border-brand-500/30 bg-gradient-to-br from-brand-500/10 to-transparent mb-6">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-2xl bg-brand-500/20 border border-brand-500/30">
                <TrendingUp size={28} className="text-brand-400" />
              </div>
              <div>
                <p className="text-slate-500 text-sm font-mono">Total Portfolio Visits</p>
                <p className="font-display text-5xl font-bold text-white">{total.toLocaleString()}</p>
                <p className="text-brand-400 text-xs font-mono mt-1">all time</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-6">
            {/* Countries */}
            <div className="card">
              <div className="flex items-center gap-2 mb-4">
                <Globe size={18} className="text-brand-400" />
                <h3 className="font-display font-semibold text-white">Top Countries</h3>
              </div>
              {Object.entries(data?.countries || {}).length === 0 ? (
                <p className="text-slate-600 text-sm">No data yet</p>
              ) : (
                <div className="space-y-3">
                  {Object.entries(data?.countries || {}).map(([country, count]) => (
                    <div key={country}>
                      <div className="flex justify-between mb-1">
                        <span className="text-slate-300 text-sm">{country}</span>
                        <span className="text-brand-400 text-sm font-mono font-bold">{count}</span>
                      </div>
                      <div className="h-1.5 bg-slate-800 rounded-full">
                        <div
                          className="h-1.5 bg-brand-500 rounded-full transition-all duration-700"
                          style={{ width: `${Math.round((count / total) * 100)}%` }}
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
                <Monitor size={18} className="text-accent-400" />
                <h3 className="font-display font-semibold text-white">Devices</h3>
              </div>
              <div className="space-y-3">
                {Object.entries(data?.devices || {}).map(([device, count]) => {
                  const Icon = deviceIcons[device] || Monitor
                  return (
                    <div key={device} className={`flex items-center justify-between p-3 rounded-lg border ${deviceBg[device] || 'bg-slate-800/50 border-slate-700'}`}>
                      <div className="flex items-center gap-2">
                        <Icon size={16} className={deviceColors[device] || 'text-slate-400'} />
                        <span className="text-slate-300 text-sm">{device}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-white text-sm">{count}</span>
                        <span className="text-slate-500 text-xs ml-1">({Math.round((count/total)*100)}%)</span>
                      </div>
                    </div>
                  )
                })}
                {Object.keys(data?.devices || {}).length === 0 && (
                  <p className="text-slate-600 text-sm">No data yet</p>
                )}
              </div>
            </div>

            {/* Pages */}
            <div className="card">
              <div className="flex items-center gap-2 mb-4">
                <MousePointer size={18} className="text-purple-400" />
                <h3 className="font-display font-semibold text-white">Pages Visited</h3>
              </div>
              <div className="space-y-3">
                {Object.entries(data?.pages || {})
                  .sort((a, b) => b[1] - a[1])
                  .map(([page, count]) => (
                  <div key={page}>
                    <div className="flex justify-between mb-1">
                      <span className="text-slate-300 text-sm font-mono">{page}</span>
                      <span className="text-purple-400 text-sm font-mono font-bold">{count}</span>
                    </div>
                    <div className="h-1.5 bg-slate-800 rounded-full">
                      <div
                        className="h-1.5 bg-purple-500 rounded-full transition-all duration-700"
                        style={{ width: `${Math.round((count / total) * 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
                {Object.keys(data?.pages || {}).length === 0 && (
                  <p className="text-slate-600 text-sm">No data yet</p>
                )}
              </div>
            </div>
          </div>

          {/* Recent Visitors Table */}
          <div className="card">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp size={18} className="text-brand-400" />
              <h3 className="font-display font-semibold text-white">Recent Visitors</h3>
              <span className="text-xs text-slate-500 font-mono ml-auto">last 20</span>
            </div>

            {data?.recent?.length === 0 ? (
              <p className="text-slate-600 text-sm text-center py-8">No visitors yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-800">
                      <th className="text-left py-2 px-3 text-slate-500 font-mono text-xs">Time</th>
                      <th className="text-left py-2 px-3 text-slate-500 font-mono text-xs">Country</th>
                      <th className="text-left py-2 px-3 text-slate-500 font-mono text-xs">City</th>
                      <th className="text-left py-2 px-3 text-slate-500 font-mono text-xs">Device</th>
                      <th className="text-left py-2 px-3 text-slate-500 font-mono text-xs">Browser</th>
                      <th className="text-left py-2 px-3 text-slate-500 font-mono text-xs">Page</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(data?.recent || []).map((v, i) => (
                      <tr key={i} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                        <td className="py-2 px-3 text-slate-400 font-mono text-xs">{formatTime(v.visitedAt)}</td>
                        <td className="py-2 px-3">
                          <span className="text-slate-300 text-xs">{v.country}</span>
                        </td>
                        <td className="py-2 px-3 text-slate-400 text-xs">{v.city}</td>
                        <td className="py-2 px-3">
                          <span className={`text-xs font-mono px-2 py-0.5 rounded-full ${
                            v.device === 'Mobile' ? 'bg-brand-500/20 text-brand-400' :
                            v.device === 'Desktop' ? 'bg-blue-500/20 text-blue-400' :
                            'bg-purple-500/20 text-purple-400'
                          }`}>{v.device}</span>
                        </td>
                        <td className="py-2 px-3 text-slate-400 text-xs">{v.browser}</td>
                        <td className="py-2 px-3 text-slate-400 font-mono text-xs">{v.page}</td>
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
