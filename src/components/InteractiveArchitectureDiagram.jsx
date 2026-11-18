import { useState } from 'react'
import { ArrowRight, Layers } from 'lucide-react'

export default function InteractiveArchitectureDiagram({ nodes = [], dataFlow = '' }) {
  const [activeId, setActiveId] = useState(nodes[0]?.id || null)
  const activeNode = nodes.find((n) => n.id === activeId) || nodes[0]

  if (!nodes.length) return null

  return (
    <div className="rounded-2xl border border-[var(--border)] p-5 md:p-6" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
          <Layers size={14} style={{ color: 'var(--chrome-highlight)' }} />
          <span>Interactive System Architecture</span>
        </div>
        <span className="text-[11px] font-mono" style={{ color: 'var(--text-dim)' }}>
          Select a node to inspect responsibility
        </span>
      </div>

      {/* Node Flow Chain */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 mb-5">
        {nodes.map((node, index) => {
          const isSelected = activeNode?.id === node.id
          return (
            <div key={node.id} className="flex-1 flex flex-col md:flex-row items-center gap-3 min-w-0">
              <button
                type="button"
                onClick={() => setActiveId(node.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                  isSelected ? 'border-[var(--border-strong)] shadow-lg shadow-black/20' : 'border-[var(--border)] hover:border-[var(--border-strong)]'
                }`}
                style={{
                  backgroundColor: isSelected ? 'var(--bg-elevated)' : 'var(--bg-card)',
                }}
              >
                <div className="text-[11px] font-mono uppercase tracking-wider mb-1" style={{ color: 'var(--text-dim)' }}>
                  {node.layer}
                </div>
                <div className="font-display font-semibold text-sm leading-snug" style={{ color: 'var(--text-primary)' }}>
                  {node.label}
                </div>
              </button>

              {index < nodes.length - 1 && (
                <ArrowRight
                  size={15}
                  className="shrink-0 rotate-90 md:rotate-0"
                  style={{ color: 'var(--text-dim)' }}
                  aria-hidden="true"
                />
              )}
            </div>
          )
        })}
      </div>

      {/* Selected Node Detail + Data Flow */}
      {activeNode && (
        <div className="rounded-xl border border-[var(--border)] p-4 mb-4" style={{ backgroundColor: 'var(--bg-card)' }}>
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="font-display font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
              {activeNode.label}
            </span>
            <span className="text-xs font-mono" style={{ color: 'var(--text-dim)' }}>
              {activeNode.layer} Layer
            </span>
          </div>
          <p className="text-sm font-body leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            {activeNode.detail}
          </p>
        </div>
      )}

      {dataFlow && (
        <div className="pt-3 border-t border-[var(--border)]">
          <p className="text-[11px] font-mono uppercase tracking-wider mb-1" style={{ color: 'var(--text-dim)' }}>
            End-to-End Request &amp; Data Flow
          </p>
          <p className="text-xs font-mono leading-relaxed" style={{ color: 'var(--metallic-silver)' }}>
            {dataFlow}
          </p>
        </div>
      )}
    </div>
  )
}
