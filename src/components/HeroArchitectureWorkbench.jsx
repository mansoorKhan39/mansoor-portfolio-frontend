import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Monitor,
  Server,
  FileCheck2,
  Sparkles,
  ChevronDown,
  FileCode2,
  BookOpen,
  Box,
  LayoutGrid,
} from 'lucide-react'
import TiltCard3D from './TiltCard3D'
import CodeMind3DPipeline from './CodeMind3DPipeline'
import { useTheme } from '../context/ThemeContext'

const PIPELINE_NODES = [
  {
    id: 'client-app',
    step: '01',
    label: 'Client App',
    role: 'Repository Upload & Query UI',
    icon: Monitor,
    accent: '#c2a4ff',
    moduleRef: 'frontend/src/components/ChatWorkspace.tsx',
    endpoint: 'POST /api/chat/query',
    summary:
      'Packages the developer query and session identifier into a structured request payload, then displays grounded answers alongside explicit warning indicators if any citation fails verification.',
    steps: [
      'Uploads source files or repository archive via multipart form request',
      'Submits natural-language questions scoped to the indexed repository session',
      'Renders cited file paths alongside validation status messages',
    ],
  },
  {
    id: 'fastapi',
    step: '02',
    label: 'FastAPI',
    role: 'Request Processing & Repo Parser',
    icon: Server,
    accent: '#c2a4ff',
    moduleRef: 'backend/app/routers/chat.py',
    endpoint: 'Pydantic Request / Response',
    summary:
      'Validates payloads with Pydantic schemas, filters out binary and build folders during ingestion, retrieves relevant code chunks, and enforces bounded error handling for upstream timeouts.',
    steps: [
      'Skips node_modules, .git, and binary assets while parsing directory trees',
      'Enforces upload size caps and protects against file-path traversal',
      'Returns clean bounded error responses if the AI service fails or rate-limits',
    ],
  },
  {
    id: 'citation-validator',
    step: '03',
    label: 'Citation Validator',
    role: 'Deterministic File Verification',
    icon: FileCheck2,
    accent: '#FBBF24',
    moduleRef: 'backend/app/services/citation_validator.py',
    endpoint: 'Post-Generation Check',
    summary:
      'Cross-checks every cited file path and code reference from the model output against the actual uploaded repository manifest so hallucinated paths are flagged before reaching the user.',
    steps: [
      'Parses file paths and line references emitted inside the LLM response',
      'Matches each citation against the verified repository file manifest',
      'Flags invalid or unverified citations explicitly in the response payload',
    ],
  },
  {
    id: 'gemini',
    step: '04',
    label: 'Gemini',
    role: 'Grounded AI Synthesis',
    icon: Sparkles,
    accent: '#FBBF24',
    moduleRef: 'backend/app/services/gemini_client.py',
    endpoint: 'Server-Side SDK Call',
    summary:
      'Processes scoped repository tree context strictly on the backend to explain architecture flows and symbol behavior with structured file-path citations.',
    steps: [
      'Receives scoped repository structure and matching source chunks',
      'Produces architectural answers referencing exact file paths',
      'Keeps API credentials strictly isolated on the server side',
    ],
  },
]

export default function HeroArchitectureWorkbench({ onOpenCaseStudy, caseStudySlug = 'codemind-ai' }) {
  const { dark } = useTheme()
  const [pipelineMode, setPipelineMode] = useState('3d') // '3d' | '2d'
  const [selectedId, setSelectedId] = useState('citation-validator')
  const [mobileExpandedId, setMobileExpandedId] = useState('client-app')

  const activeNode = PIPELINE_NODES.find((n) => n.id === selectedId) || PIPELINE_NODES[0]

  return (
    <div className="w-full space-y-4">
      {/* ── Mode Switcher Header ── */}
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-xs font-semibold text-[var(--text-primary)] flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-ping" />
          CodeMind AI · System Pipeline Architecture
        </span>

        <div className="flex items-center gap-1.5 p-1 rounded-xl border border-[var(--border)] bg-[#110d14]">
          <button
            type="button"
            onClick={() => setPipelineMode('3d')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono transition-colors ${
              pipelineMode === '3d'
                ? 'bg-[#1e1528] text-[var(--accent)] border border-[#c2a4ff]/40 font-semibold'
                : 'text-[var(--text-dim)] hover:text-zinc-200'
            }`}
          >
            <Box size={12} />
            <span>3D Pipeline</span>
          </button>
          <button
            type="button"
            onClick={() => setPipelineMode('2d')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono transition-colors ${
              pipelineMode === '2d'
                ? 'bg-[#1e1528] text-[var(--accent)] border border-[#c2a4ff]/40 font-semibold'
                : 'text-[var(--text-dim)] hover:text-zinc-200'
            }`}
          >
            <LayoutGrid size={12} />
            <span>2D Flow</span>
          </button>
        </div>
      </div>

      {/* ── 3D Animated Pipeline Mode ── */}
      {pipelineMode === '3d' ? (
        <CodeMind3DPipeline
          activeNodeId={selectedId}
          onNodeChange={setSelectedId}
          isDark={dark}
        />
      ) : (
        /* ── 2D Workbench Mode (Desktop 2x2 Grid) ── */
        <div className="hidden md:block">
          <TiltCard3D maxTilt={4}>
            <div
              className="rounded-2xl border border-[var(--border-strong)] overflow-hidden shadow-2xl shadow-black/50"
              style={{ backgroundColor: 'var(--bg-card-solid)' }}
            >
              {/* Window Header */}
              <div
                className="flex items-center justify-between gap-4 px-5 py-3.5 border-b border-[var(--border)]"
                style={{ backgroundColor: 'var(--bg-secondary)' }}
              >
                <span className="font-mono text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>
                  CodeMind AI · System Request Pipeline
                </span>
                <span className="font-mono text-xs" style={{ color: 'var(--accent)' }}>
                  Click a node to inspect
                </span>
              </div>

              <div className="p-5 lg:p-6 space-y-5">
                <div className="grid grid-cols-2 gap-3.5">
                  {PIPELINE_NODES.map((node) => {
                    const Icon = node.icon
                    const isActive = node.id === activeNode.id
                    return (
                      <button
                        key={node.id}
                        type="button"
                        onClick={() => setSelectedId(node.id)}
                        className="text-left p-4 rounded-xl border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
                        style={{
                          backgroundColor: isActive ? 'var(--bg-elevated)' : 'var(--bg-secondary)',
                          borderColor: isActive ? node.accent : 'var(--border)',
                          boxShadow: isActive ? `0 0 22px -10px ${node.accent}` : 'none',
                        }}
                      >
                        <div className="flex items-center justify-between gap-2 mb-2.5">
                          <div className="flex items-center gap-2.5">
                            <div
                              className="p-2 rounded-lg border"
                              style={{
                                borderColor: isActive ? node.accent : 'var(--border)',
                                backgroundColor: 'var(--bg-primary)',
                              }}
                            >
                              <Icon size={15} style={{ color: node.accent }} />
                            </div>
                            <span className="font-display font-bold text-sm" style={{ color: 'var(--text-primary)' }}>
                              {node.label}
                            </span>
                          </div>
                          <span className="font-mono text-xs tabular-nums" style={{ color: 'var(--text-dim)' }}>
                            {node.step}
                          </span>
                        </div>
                        <p className="font-body text-xs leading-snug" style={{ color: 'var(--text-muted)' }}>
                          {node.role}
                        </p>
                      </button>
                    )
                  })}
                </div>

                {/* Active Node Inspection Panel */}
                <div
                  className="rounded-xl border border-[var(--border)] p-5"
                  style={{ backgroundColor: 'var(--bg-secondary)' }}
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-3 pb-3 border-b border-[var(--border)]">
                    <div>
                      <p className="font-display font-bold text-base" style={{ color: 'var(--text-primary)' }}>
                        {activeNode.step}. {activeNode.label} — {activeNode.role}
                      </p>
                      <p className="font-mono text-xs mt-1 flex items-center gap-1.5" style={{ color: activeNode.accent }}>
                        <FileCode2 size={13} />
                        <span>{activeNode.moduleRef}</span>
                      </p>
                    </div>
                    <span
                      className="font-mono text-xs px-2.5 py-1 rounded-lg border border-[var(--border)]"
                      style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-muted)' }}
                    >
                      {activeNode.endpoint}
                    </span>
                  </div>

                  <p className="font-body text-sm leading-relaxed mb-4" style={{ color: 'var(--text-muted)' }}>
                    {activeNode.summary}
                  </p>

                  <ul className="space-y-1.5 mb-4">
                    {activeNode.steps.map((step, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs sm:text-sm font-body" style={{ color: 'var(--metallic-silver)' }}>
                        <span className="font-mono shrink-0" style={{ color: activeNode.accent }}>→</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[var(--border)] text-xs font-mono">
                    <Link
                      to={`/case-studies/${caseStudySlug}`}
                      className="inline-flex items-center gap-1.5 font-semibold hover:opacity-80 transition-opacity"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      <BookOpen size={13} /> Full CodeMind AI Case Study
                    </Link>
                    {onOpenCaseStudy && (
                      <button
                        type="button"
                        onClick={onOpenCaseStudy}
                        className="font-semibold hover:opacity-80 transition-opacity"
                        style={{ color: 'var(--accent)' }}
                      >
                        Quick Inspect Drawer →
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </TiltCard3D>
        </div>
      )}

      {/* ── MOBILE EXPERIENCE (When in 2D mode or small screens) ── */}
      {pipelineMode === '2d' && (
        <div className="md:hidden space-y-2.5">
          <div className="flex items-center justify-between px-1 mb-2">
            <span className="font-mono text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>
              CodeMind AI · Pipeline Flow
            </span>
            <span className="font-mono text-xs" style={{ color: 'var(--accent)' }}>
              Tap node to expand
            </span>
          </div>

          {PIPELINE_NODES.map((node) => {
            const Icon = node.icon
            const expanded = mobileExpandedId === node.id
            return (
              <div
                key={node.id}
                className="rounded-xl border overflow-hidden transition-colors"
                style={{
                  backgroundColor: 'var(--bg-card-solid)',
                  borderColor: expanded ? node.accent : 'var(--border)',
                }}
              >
                <button
                  type="button"
                  onClick={() => setMobileExpandedId(expanded ? '' : node.id)}
                  className="w-full flex items-center justify-between gap-3 p-4 text-left"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className="p-2 rounded-lg border shrink-0"
                      style={{ borderColor: expanded ? node.accent : 'var(--border)', backgroundColor: 'var(--bg-secondary)' }}
                    >
                      <Icon size={15} style={{ color: node.accent }} />
                    </div>
                    <div className="min-w-0">
                      <div className="font-display font-bold text-sm" style={{ color: 'var(--text-primary)' }}>
                        {node.step}. {node.label}
                      </div>
                      <div className="font-body text-xs truncate" style={{ color: 'var(--text-muted)' }}>
                        {node.role}
                      </div>
                    </div>
                  </div>
                  <ChevronDown
                    size={16}
                    className={`shrink-0 transition-transform ${expanded ? 'rotate-180' : ''}`}
                    style={{ color: 'var(--text-dim)' }}
                  />
                </button>

                {expanded && (
                  <div className="px-4 pb-4 pt-3 border-t border-[var(--border)] space-y-3" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                      <span style={{ color: node.accent }}>{node.moduleRef}</span>
                      <span style={{ color: 'var(--text-dim)' }}>{node.endpoint}</span>
                    </div>
                    <p className="text-sm font-body leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                      {node.summary}
                    </p>
                    <ul className="space-y-1.5">
                      {node.steps.map((s, i) => (
                        <li key={i} className="text-xs font-body flex items-start gap-2" style={{ color: 'var(--metallic-silver)' }}>
                          <span style={{ color: node.accent }}>→</span>
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      to={`/case-studies/${caseStudySlug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold pt-1"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      <BookOpen size={12} /> Full Case Study
                    </Link>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
