import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Layers, Sparkles, Terminal, Compass } from 'lucide-react'
import { SKILL_CATEGORIES } from '../data/portfolioData'

const STAGE_ORDER = ['Actively Used', 'Working Knowledge', 'Currently Learning']

const STAGE_META = {
  'Actively Used': {
    code: 'Stage 01',
    shortLabel: 'Actively Used',
    color: 'var(--accent)',
    dotBg: 'var(--accent)',
    softBg: 'rgba(194, 164, 255, 0.14)',
    borderActive: 'rgba(194, 164, 255, 0.48)',
    summary: 'Applied directly across recent full-stack, mobile, and Python projects.',
    Icon: Terminal,
  },
  'Working Knowledge': {
    code: 'Stage 02',
    shortLabel: 'Working Knowledge',
    color: 'var(--metallic-silver)',
    dotBg: 'var(--metallic-silver)',
    softBg: 'rgba(223, 216, 234, 0.10)',
    borderActive: 'rgba(223, 216, 234, 0.40)',
    summary: 'Practiced across notebooks, NLP pipelines, and functional prototypes.',
    Icon: Layers,
  },
  'Currently Learning': {
    code: 'Stage 03',
    shortLabel: 'Currently Learning',
    color: 'var(--accent-amber)',
    dotBg: 'var(--accent-amber)',
    softBg: 'rgba(245, 194, 107, 0.13)',
    borderActive: 'rgba(245, 194, 107, 0.46)',
    summary: 'Active study and early implementation along core specialization tracks.',
    Icon: Compass,
  },
}

export default function SkillTimeline({
  showCategoryFilters = true,
  layoutPrefix = 'skill-timeline',
}) {
  const prefersReducedMotion = useReducedMotion()
  const [stageFilter, setStageFilter] = useState('All')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [activeKey, setActiveKey] = useState(null)
  const [hoveredKey, setHoveredKey] = useState(null)

  const trackRef = useRef(null)
  const nodeRefs = useRef({})

  // Flatten and order skills along usage-stage progression
  const allNodes = useMemo(() => {
    const items = []
    SKILL_CATEGORIES.forEach((group) => {
      group.items.forEach((item) => {
        items.push({
          key: `${group.category}::${item.name}`,
          name: item.name,
          tier: item.tier,
          category: group.category,
          context:
            item.context ||
            `Applied ${item.name} in ${group.category.toLowerCase()} engineering workflows.`,
          appliedIn: Array.isArray(item.appliedIn) ? item.appliedIn : [],
        })
      })
    })

    return items.sort((a, b) => {
      const stageDiff = STAGE_ORDER.indexOf(a.tier) - STAGE_ORDER.indexOf(b.tier)
      return stageDiff !== 0 ? stageDiff : 0
    })
  }, [])

  const stageCounts = useMemo(() => {
    const base =
      categoryFilter === 'All'
        ? allNodes
        : allNodes.filter((n) => n.category === categoryFilter)
    return {
      All: base.length,
      'Actively Used': base.filter((n) => n.tier === 'Actively Used').length,
      'Working Knowledge': base.filter((n) => n.tier === 'Working Knowledge').length,
      'Currently Learning': base.filter((n) => n.tier === 'Currently Learning').length,
    }
  }, [allNodes, categoryFilter])

  const visibleNodes = useMemo(() => {
    return allNodes.filter((node) => {
      const matchStage = stageFilter === 'All' || node.tier === stageFilter
      const matchCategory = categoryFilter === 'All' || node.category === categoryFilter
      return matchStage && matchCategory
    })
  }, [allNodes, stageFilter, categoryFilter])

  // Ensure activeKey always points to a valid visible node
  useEffect(() => {
    if (visibleNodes.length === 0) {
      setActiveKey(null)
      return
    }
    const stillVisible = visibleNodes.some((n) => n.key === activeKey)
    if (!stillVisible) {
      setActiveKey(visibleNodes[0].key)
    }
  }, [visibleNodes, activeKey])

  const inspectedKey = hoveredKey && visibleNodes.some((n) => n.key === hoveredKey)
    ? hoveredKey
    : activeKey

  const activeIndex = visibleNodes.findIndex((n) => n.key === inspectedKey)
  const inspectedNode = activeIndex >= 0 ? visibleNodes[activeIndex] : visibleNodes[0] || null

  const scrollTrackBy = (delta) => {
    if (!trackRef.current) return
    trackRef.current.scrollBy({
      left: delta,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    })
  }

  const selectAndScrollNode = (nodeKey) => {
    setActiveKey(nodeKey)
    setHoveredKey(null)
    const el = nodeRefs.current[nodeKey]
    if (el && el.scrollIntoView) {
      el.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        inline: 'center',
        block: 'nearest',
      })
    }
  }

  const stepNode = (dir) => {
    if (visibleNodes.length === 0) return
    const current = activeIndex >= 0 ? activeIndex : 0
    const nextIdx = (current + dir + visibleNodes.length) % visibleNodes.length
    selectAndScrollNode(visibleNodes[nextIdx].key)
  }

  const inspectedMeta = inspectedNode ? STAGE_META[inspectedNode.tier] : STAGE_META['Actively Used']

  return (
    <div className="space-y-6">
      {/* ── Top Bar: Usage Stage Filter Tabs + Horizontal Scroll Controls ── */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div
          className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl border border-[var(--border)] w-fit"
          style={{ backgroundColor: 'var(--bg-secondary)' }}
          role="tablist"
          aria-label="Filter skills by usage stage"
        >
          {['All', ...STAGE_ORDER].map((stage) => {
            const active = stageFilter === stage
            const meta = STAGE_META[stage]
            const label = stage === 'All' ? 'All Stages' : stage
            return (
              <button
                key={stage}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setStageFilter(stage)}
                className="relative px-3.5 py-2 rounded-xl text-xs font-mono transition-colors flex items-center gap-2"
                style={{
                  color: active ? 'var(--text-primary)' : 'var(--text-dim)',
                }}
              >
                {active && (
                  <motion.span
                    layoutId={`${layoutPrefix}-stage-pill`}
                    transition={
                      prefersReducedMotion
                        ? { duration: 0 }
                        : { type: 'spring', stiffness: 420, damping: 34 }
                    }
                    className="absolute inset-0 rounded-xl border border-[var(--border-strong)]"
                    style={{ backgroundColor: 'var(--bg-card-solid)' }}
                  />
                )}
                <span className="relative z-10 inline-flex items-center gap-2">
                  {meta && (
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: meta.dotBg }}
                      aria-hidden="true"
                    />
                  )}
                  <span className={active ? 'font-semibold' : ''}>{label}</span>
                  <span className="text-[10px] tabular-nums opacity-75">
                    ({stageCounts[stage] ?? 0})
                  </span>
                </span>
              </button>
            )
          })}
        </div>

        {/* Scroll Stepper Controls */}
        <div className="flex items-center justify-between lg:justify-end gap-3">
          <span className="text-xs font-mono" style={{ color: 'var(--text-dim)' }}>
            Hover or select any node for technical context
          </span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => scrollTrackBy(-340)}
              className="p-2 rounded-xl border border-[var(--border)] hover:border-[var(--border-strong)] transition-colors"
              style={{ backgroundColor: 'var(--bg-card-solid)', color: 'var(--text-primary)' }}
              aria-label="Scroll timeline left"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              onClick={() => scrollTrackBy(340)}
              className="p-2 rounded-xl border border-[var(--border)] hover:border-[var(--border-strong)] transition-colors"
              style={{ backgroundColor: 'var(--bg-card-solid)', color: 'var(--text-primary)' }}
              aria-label="Scroll timeline right"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* ── Optional Category Filter Row ── */}
      {showCategoryFilters && (
        <div className="flex flex-wrap items-center gap-1.5">
          {['All', ...SKILL_CATEGORIES.map((c) => c.category)].map((cat) => {
            const active = categoryFilter === cat
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setCategoryFilter(cat)}
                className="px-3 py-1.5 rounded-lg text-[11px] font-mono border transition-colors"
                style={{
                  backgroundColor: active ? 'var(--bg-elevated)' : 'transparent',
                  color: active ? 'var(--text-primary)' : 'var(--text-dim)',
                  borderColor: active ? 'var(--border-strong)' : 'var(--border)',
                  fontWeight: active ? 600 : 400,
                }}
              >
                {cat === 'All' ? 'All Categories' : cat}
              </button>
            )
          })}
        </div>
      )}

      {/* ── Horizontal Interactive Timeline Container ── */}
      <div
        className="relative rounded-2xl border border-[var(--border)] overflow-hidden"
        style={{ backgroundColor: 'var(--bg-secondary)' }}
      >
        {/* Subtle edge fades on desktop */}
        <div
          className="hidden md:block pointer-events-none absolute left-0 top-0 bottom-0 w-8 z-20"
          style={{ background: 'linear-gradient(90deg, var(--bg-secondary) 0%, transparent 100%)' }}
          aria-hidden="true"
        />
        <div
          className="hidden md:block pointer-events-none absolute right-0 top-0 bottom-0 w-8 z-20"
          style={{ background: 'linear-gradient(270deg, var(--bg-secondary) 0%, transparent 100%)' }}
          aria-hidden="true"
        />

        {visibleNodes.length === 0 ? (
          <div className="py-16 px-6 text-center">
            <p className="font-mono text-xs mb-3" style={{ color: 'var(--text-dim)' }}>
              No skills match the selected stage and category combination.
            </p>
            <button
              type="button"
              onClick={() => {
                setStageFilter('All')
                setCategoryFilter('All')
              }}
              className="btn-outline text-xs py-1.5 px-3"
            >
              Reset Timeline Filters
            </button>
          </div>
        ) : (
          <div
            ref={trackRef}
            className="relative overflow-x-auto px-6 md:px-10 pt-8 pb-9 scroll-smooth"
            style={{ scrollbarWidth: 'thin' }}
          >
            <div className="relative inline-flex items-stretch gap-4 min-w-full">
              {/* Continuous Horizontal Timeline Spine */}
              <div
                className="pointer-events-none absolute left-0 right-0 top-[22px] h-[2px]"
                style={{
                  background:
                    'linear-gradient(90deg, rgba(194,164,255,0.52) 0%, rgba(223,216,234,0.32) 55%, rgba(245,194,107,0.52) 100%)',
                }}
                aria-hidden="true"
              />

              {visibleNodes.map((node, index) => {
                const prevTier = index > 0 ? visibleNodes[index - 1].tier : null
                const isStageBoundary = index === 0 || prevTier !== node.tier
                const meta = STAGE_META[node.tier]
                const isSelected = inspectedNode?.key === node.key
                const isHovered = hoveredKey === node.key

                return (
                  <div key={node.key} className="relative flex flex-col items-start shrink-0">
                    {/* Stage Milestone Marker Along Timeline Spine */}
                    <div className="h-[44px] flex items-center gap-2.5 mb-2 relative z-10 w-full">
                      <span
                        className="relative flex items-center justify-center w-4 h-4 rounded-full border-2 transition-transform duration-200"
                        style={{
                          backgroundColor: isSelected ? meta.dotBg : 'var(--bg-primary)',
                          borderColor: meta.dotBg,
                          transform: isSelected ? 'scale(1.2)' : 'scale(1)',
                          boxShadow: isSelected ? '0 0 0 4px var(--accent-soft)' : 'none',
                        }}
                        aria-hidden="true"
                      />
                      {isStageBoundary && (
                        <span
                          className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-md border whitespace-nowrap"
                          style={{
                            backgroundColor: 'var(--bg-card-solid)',
                            borderColor: 'var(--border)',
                            color: meta.color,
                          }}
                        >
                          {meta.code} · {meta.shortLabel}
                        </span>
                      )}
                    </div>

                    {/* Vertical Stem Connecting Spine Node to Card */}
                    <div
                      className="w-[1px] h-4 ml-[7px] transition-colors duration-200"
                      style={{
                        backgroundColor: isSelected ? meta.dotBg : 'var(--border)',
                      }}
                      aria-hidden="true"
                    />

                    {/* Interactive Skill Node Card */}
                    <motion.button
                      ref={(el) => {
                        nodeRefs.current[node.key] = el
                      }}
                      type="button"
                      layout={!prefersReducedMotion}
                      initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={
                        prefersReducedMotion
                          ? { duration: 0 }
                          : { duration: 0.28, delay: Math.min(index * 0.015, 0.25) }
                      }
                      whileHover={prefersReducedMotion ? undefined : { y: -4 }}
                      onMouseEnter={() => setHoveredKey(node.key)}
                      onMouseLeave={() => setHoveredKey(null)}
                      onFocus={() => setActiveKey(node.key)}
                      onClick={() => selectAndScrollNode(node.key)}
                      aria-pressed={isSelected}
                      className="group text-left w-[228px] sm:w-[244px] rounded-2xl p-4 border transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400/60"
                      style={{
                        backgroundColor: isSelected ? 'var(--bg-elevated)' : 'var(--bg-card-solid)',
                        borderColor: isSelected ? meta.borderActive : 'var(--border)',
                        boxShadow: isSelected
                          ? '0 12px 28px -12px rgba(0, 0, 0, 0.65)'
                          : 'none',
                      }}
                    >
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span
                          className="text-[10px] font-mono uppercase tracking-wider truncate"
                          style={{ color: 'var(--text-dim)' }}
                        >
                          {node.category}
                        </span>
                        <span
                          className="text-[10px] font-mono tabular-nums shrink-0"
                          style={{ color: meta.color }}
                        >
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>

                      <h3
                        className="font-display font-bold text-base leading-snug mb-1.5"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {node.name}
                      </h3>

                      <div className="flex items-center gap-1.5 text-[11px] font-mono" style={{ color: meta.color }}>
                        <span
                          className="w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ backgroundColor: meta.dotBg }}
                          aria-hidden="true"
                        />
                        <span>{node.tier}</span>
                      </div>

                      {/* Subtle Inline Hover Reveal Preview inside the Node */}
                      <AnimatePresence initial={false}>
                        {(isHovered || isSelected) && (
                          <motion.div
                            key="node-preview"
                            initial={prefersReducedMotion ? false : { opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={prefersReducedMotion ? undefined : { opacity: 0, height: 0 }}
                            transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="mt-3 pt-2.5 border-t border-[var(--border)]">
                              <p
                                className="text-xs font-body leading-relaxed line-clamp-2"
                                style={{ color: 'var(--text-muted)' }}
                              >
                                {node.context}
                              </p>
                              {node.appliedIn.length > 0 && (
                                <p
                                  className="mt-1.5 text-[10px] font-mono truncate"
                                  style={{ color: 'var(--text-dim)' }}
                                >
                                  Used in: {node.appliedIn.slice(0, 2).join(' · ')}
                                </p>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {/* ── Unclipped Technical Context Inspector Panel (Updates Live on Hover/Focus/Tap) ── */}
      {inspectedNode && (
        <div
          className="rounded-2xl border p-5 md:p-6 transition-colors"
          style={{
            backgroundColor: 'var(--bg-card-solid)',
            borderColor: inspectedMeta.borderActive,
          }}
          aria-live="polite"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={inspectedNode.key}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, y: -4 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.18 }}
              className="grid md:grid-cols-12 gap-5 items-start"
            >
              <div className="md:col-span-8 space-y-2.5">
                <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono">
                  <span
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-[var(--border)]"
                    style={{ backgroundColor: inspectedMeta.softBg, color: inspectedMeta.color }}
                  >
                    <Sparkles size={12} />
                    {inspectedNode.tier}
                  </span>
                  <span style={{ color: 'var(--text-dim)' }}>·</span>
                  <span style={{ color: 'var(--metallic-silver)' }}>{inspectedNode.category}</span>
                  <span style={{ color: 'var(--text-dim)' }}>·</span>
                  <span className="tabular-nums" style={{ color: 'var(--text-dim)' }}>
                    Node {String(activeIndex + 1).padStart(2, '0')} of{' '}
                    {String(visibleNodes.length).padStart(2, '0')}
                  </span>
                </div>

                <h4
                  className="font-display font-bold text-xl md:text-2xl"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {inspectedNode.name}
                </h4>

                <p
                  className="font-body text-sm md:text-base leading-relaxed"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {inspectedNode.context}
                </p>
              </div>

              <div className="md:col-span-4 flex flex-col justify-between gap-4 md:border-l md:border-[var(--border)] md:pl-5">
                <div>
                  <p
                    className="text-[11px] font-mono uppercase tracking-wider mb-2"
                    style={{ color: 'var(--text-dim)' }}
                  >
                    Applied Across
                  </p>
                  <div className="flex flex-wrap items-center gap-1.5">
                    {inspectedNode.appliedIn.map((refName) => (
                      <span
                        key={refName}
                        className="text-xs font-mono px-2.5 py-1 rounded-lg border border-[var(--border)]"
                        style={{
                          backgroundColor: 'var(--bg-secondary)',
                          color: 'var(--text-primary)',
                        }}
                      >
                        {refName}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2 pt-2 border-t border-[var(--border)]">
                  <span className="text-[11px] font-mono" style={{ color: 'var(--text-dim)' }}>
                    {inspectedMeta.code}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => stepNode(-1)}
                      className="px-2.5 py-1 rounded-lg border border-[var(--border)] hover:border-[var(--border-strong)] text-xs font-mono transition-colors"
                      style={{ color: 'var(--text-primary)' }}
                      aria-label="Previous skill node"
                    >
                      Prev
                    </button>
                    <button
                      type="button"
                      onClick={() => stepNode(1)}
                      className="px-2.5 py-1 rounded-lg border border-[var(--border)] hover:border-[var(--border-strong)] text-xs font-mono transition-colors"
                      style={{ color: 'var(--text-primary)' }}
                      aria-label="Next skill node"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}
