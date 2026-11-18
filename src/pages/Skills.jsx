import { lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Ambient3DBackground from '../components/Ambient3DBackground'
import SkillTimeline from '../components/SkillTimeline'

const TechConstellation3D = lazy(() => import('../components/TechConstellation3D'))

const STAGE_NOTES = [
  {
    tier: 'Actively Used',
    dotColor: 'var(--accent)',
    textColor: 'var(--accent)',
    note: 'Applied directly across recent full-stack, mobile, and Python projects.',
  },
  {
    tier: 'Working Knowledge',
    dotColor: 'var(--metallic-silver)',
    textColor: 'var(--metallic-silver)',
    note: 'Practiced across notebooks, data pipelines, and functional prototypes.',
  },
  {
    tier: 'Currently Learning',
    dotColor: 'var(--accent-amber)',
    textColor: 'var(--accent-amber)',
    note: 'Under active study and early implementation along core tracks.',
  },
]

export default function Skills() {
  return (
    <div className="min-h-screen relative pt-28 pb-24 overflow-hidden">
      <Ambient3DBackground className="fixed inset-0 w-full h-full z-0" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest mb-3" style={{ color: 'var(--accent)' }}>
              3D Stack &amp; Timeline
            </p>
            <h1 className="section-heading mb-3">
              Interactive Skill <span className="chrome-text">Universe</span>
            </h1>
            <p className="font-body max-w-xl leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              Orbit the 3D sphere or scrub the horizontal stage timeline—hover any node for verified project context.
            </p>
          </div>
          <Link to="/journey" className="btn-outline text-xs w-fit">
            Learning Roadmap <ArrowRight size={14} />
          </Link>
        </div>

        {/* Usage Stage Legend */}
        <div className="grid md:grid-cols-3 gap-4">
          {STAGE_NOTES.map((item) => (
            <div key={item.tier} className="card py-4 px-5">
              <div className="flex items-center gap-2 mb-1.5">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: item.dotColor }}
                  aria-hidden="true"
                />
                <p className="font-mono text-xs font-semibold" style={{ color: item.textColor }}>
                  {item.tier}
                </p>
              </div>
              <p className="text-xs font-body leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                {item.note}
              </p>
            </div>
          ))}
        </div>

        {/* Interactive 3D Tech Sphere */}
        <Suspense fallback={null}>
          <TechConstellation3D />
        </Suspense>

        {/* Interactive Horizontal Skill Timeline */}
        <SkillTimeline showCategoryFilters layoutPrefix="skills-page" />
      </div>
    </div>
  )
}
