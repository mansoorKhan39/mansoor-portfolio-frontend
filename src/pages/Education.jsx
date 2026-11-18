import { Link } from 'react-router-dom'
import { GraduationCap, BookOpen, CheckCircle2, ArrowRight, MapPin } from 'lucide-react'
import Ambient3DBackground from '../components/Ambient3DBackground'
import TiltCard3D from '../components/TiltCard3D'
import { EDUCATION_INFO, OPEN_OPPORTUNITIES } from '../data/portfolioData'

export default function Education() {
  return (
    <div className="min-h-screen relative pt-28 pb-24 overflow-hidden">
      <Ambient3DBackground className="fixed inset-0 w-full h-full z-0" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 space-y-12">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest mb-3" style={{ color: 'var(--text-dim)' }}>
            Academic Background
          </p>
          <h1 className="section-heading mb-3">
            Education &amp; <span className="chrome-text">Relevant Coursework</span>
          </h1>
          <p className="font-body max-w-2xl leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            Undergraduate academic foundation in software engineering, systems design, and quantitative reasoning.
          </p>
        </div>

        {/* Main Degree Card (Zero CGPA) */}
        <TiltCard3D maxTilt={3}>
          <div className="card border-[var(--border-strong)] p-7 md:p-9">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-[var(--border)]">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl border border-[var(--border)] shrink-0" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                  <GraduationCap size={24} style={{ color: 'var(--chrome-highlight)' }} />
                </div>
                <div>
                  <h2 className="font-display font-bold text-2xl mb-1" style={{ color: 'var(--text-primary)' }}>
                    {EDUCATION_INFO.degree}
                  </h2>
                  <p className="font-body font-medium text-base mb-2" style={{ color: 'var(--metallic-silver)' }}>
                    {EDUCATION_INFO.institution}
                  </p>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono" style={{ color: 'var(--text-dim)' }}>
                    <span className="inline-flex items-center gap-1">
                      <MapPin size={12} /> {EDUCATION_INFO.location}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>Current Standing: {EDUCATION_INFO.semester}</span>
                  </div>
                </div>
              </div>

              <div className="text-left md:text-right shrink-0">
                <p className="text-xs font-mono uppercase tracking-wider mb-1" style={{ color: 'var(--text-dim)' }}>
                  Expected Graduation
                </p>
                <p className="font-display font-bold text-lg" style={{ color: 'var(--text-primary)' }}>
                  {EDUCATION_INFO.expectedGraduation}
                </p>
              </div>
            </div>

            {/* Coursework */}
            <div className="pt-6">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen size={15} style={{ color: 'var(--chrome-highlight)' }} />
                <h3 className="font-display font-bold text-base" style={{ color: 'var(--text-primary)' }}>
                  Relevant Coursework
                </h3>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {EDUCATION_INFO.coursework.map((course, idx) => (
                  <div
                    key={course}
                    className="px-4 py-3 rounded-xl border border-[var(--border)] flex items-center gap-3 text-sm font-body"
                    style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                  >
                    <span className="font-mono text-xs shrink-0" style={{ color: 'var(--text-dim)' }}>
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span>{course}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TiltCard3D>

        {/* Opportunities & Collaboration */}
        <div className="card">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="font-display font-bold text-xl mb-1" style={{ color: 'var(--text-primary)' }}>
                Early-Career Roles &amp; Collaborations
              </h2>
              <p className="text-sm font-body" style={{ color: 'var(--text-muted)' }}>
                Open to structured junior engineering roles, internships, and technical collaborations alongside my studies.
              </p>
            </div>
            <Link to="/contact" className="btn-primary text-xs w-fit shrink-0">
              Discuss an Opportunity <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
            {OPEN_OPPORTUNITIES.map((item) => (
              <div
                key={item}
                className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-[var(--border)] text-xs font-mono"
                style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
              >
                <CheckCircle2 size={13} className="shrink-0" style={{ color: 'var(--metallic-silver)' }} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
