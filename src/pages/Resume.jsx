import { Download, GraduationCap, Briefcase, Code2, Award, ExternalLink, CheckCircle2, Languages } from 'lucide-react'
import Ambient3DBackground from '../components/Ambient3DBackground'
import TiltCard3D from '../components/TiltCard3D'
import {
  PERSONAL_PROFILE,
  ABOUT_NARRATIVE,
  EDUCATION_INFO,
  SKILL_CATEGORIES,
  CASE_STUDIES,
  CAREER_ROADMAP,
  OPEN_OPPORTUNITIES,
} from '../data/portfolioData'

export default function Resume() {
  return (
    <div className="min-h-screen relative pt-28 pb-24 overflow-hidden">
      <Ambient3DBackground className="fixed inset-0 w-full h-full z-0" />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest mb-3" style={{ color: 'var(--text-dim)' }}>
              Verified Curriculum Vitae
            </p>
            <h1 className="section-heading mb-2">
              Mansoor <span className="chrome-text">Ali Khan</span>
            </h1>
            <p className="font-mono text-xs sm:text-sm" style={{ color: 'var(--metallic-silver)' }}>
              {PERSONAL_PROFILE.positioning}
            </p>
          </div>
          <a href={PERSONAL_PROFILE.resumePdf} download className="btn-primary shrink-0">
            <Download size={16} /> Download CV (PDF)
          </a>
        </div>

        {/* Contact info bar */}
        <div className="card mb-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { label: 'Email', value: PERSONAL_PROFILE.email, href: `mailto:${PERSONAL_PROFILE.email}` },
            { label: 'GitHub', value: 'github.com/mansoorKhan39', href: PERSONAL_PROFILE.github },
            { label: 'LinkedIn', value: 'mansoor-ali-khan-b27a42304', href: PERSONAL_PROFILE.linkedin },
            { label: 'Location', value: PERSONAL_PROFILE.location, href: null },
          ].map(({ label, value, href }) => (
            <div key={label} className="min-w-0">
              <p className="text-xs font-mono mb-1" style={{ color: 'var(--text-dim)' }}>{label}</p>
              {href ? (
                <a
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  className="text-sm hover:opacity-80 transition-opacity truncate block"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {value}
                </a>
              ) : (
                <p className="text-sm truncate" style={{ color: 'var(--text-primary)' }}>
                  {value}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Profile Summary */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl border border-[var(--border)]" style={{ backgroundColor: 'var(--bg-card)' }}>
              <Award size={18} style={{ color: 'var(--chrome-highlight)' }} />
            </div>
            <h2 className="font-display text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
              Profile Summary
            </h2>
          </div>
          <div className="card space-y-3">
            <p className="font-body leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              {ABOUT_NARRATIVE[0]} {ABOUT_NARRATIVE[2]}
            </p>
          </div>
        </div>

        {/* Education (Zero CGPA) */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl border border-[var(--border)]" style={{ backgroundColor: 'var(--bg-card)' }}>
              <GraduationCap size={18} style={{ color: 'var(--chrome-highlight)' }} />
            </div>
            <h2 className="font-display text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
              Education
            </h2>
          </div>
          <div className="card border-[var(--border-strong)]">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
              <h3 className="font-display font-bold text-lg" style={{ color: 'var(--text-primary)' }}>
                {EDUCATION_INFO.degree}
              </h3>
              <span className="text-sm font-mono" style={{ color: 'var(--metallic-silver)' }}>
                {EDUCATION_INFO.semester} · Expected {EDUCATION_INFO.expectedGraduation}
              </span>
            </div>
            <p className="font-semibold text-sm mb-3" style={{ color: 'var(--text-primary)' }}>
              {EDUCATION_INFO.institution} — {EDUCATION_INFO.location}
            </p>
            <p className="text-xs font-mono leading-relaxed" style={{ color: 'var(--text-dim)' }}>
              Coursework: {EDUCATION_INFO.coursework.join(' · ')}
            </p>
          </div>
        </div>

        {/* Skills (Categorized by Honest Tiers, Zero Percentages) */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl border border-[var(--border)]" style={{ backgroundColor: 'var(--bg-card)' }}>
              <Code2 size={18} style={{ color: 'var(--chrome-highlight)' }} />
            </div>
            <h2 className="font-display text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
              Technical Skills
            </h2>
          </div>
          <div className="card">
            <div className="grid md:grid-cols-2 gap-6">
              {SKILL_CATEGORIES.map(({ category, items }) => (
                <div key={category}>
                  <p className="font-display font-semibold text-sm mb-2" style={{ color: 'var(--text-primary)' }}>
                    {category}
                  </p>
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
                    {items.map((item, idx) => (
                      <span key={item.name} className="inline-flex items-center gap-2">
                        <span>
                          {item.name}{' '}
                          <span style={{ color: 'var(--text-dim)' }}>({item.tier})</span>
                        </span>
                        {idx < items.length - 1 && (
                          <span aria-hidden="true" style={{ color: 'var(--text-dim)' }}>·</span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Verified Projects */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl border border-[var(--border)]" style={{ backgroundColor: 'var(--bg-card)' }}>
              <Briefcase size={18} style={{ color: 'var(--chrome-highlight)' }} />
            </div>
            <h2 className="font-display text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
              Verified Projects
            </h2>
          </div>
          <div className="space-y-4">
            {CASE_STUDIES.slice(0, 5).map((proj) => (
              <TiltCard3D key={proj.slug} maxTilt={3}>
                <div className="card hover:border-[var(--border-strong)]">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 mb-3">
                    <div>
                      <h3 className="font-display font-bold text-base" style={{ color: 'var(--text-primary)' }}>
                        {proj.title} — {proj.subtitle}
                      </h3>
                      <p className="text-xs font-mono mt-0.5" style={{ color: 'var(--text-dim)' }}>
                        Status: {proj.status}
                      </p>
                    </div>
                    <div className="flex items-center gap-4 shrink-0 text-xs font-mono">
                      {proj.githubUrl ? (
                        <a
                          href={proj.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:opacity-80 transition-opacity inline-flex items-center gap-1"
                          style={{ color: 'var(--text-muted)' }}
                        >
                          GitHub <ExternalLink size={11} />
                        </a>
                      ) : (
                        <span style={{ color: 'var(--text-dim)' }}>[Repo Placeholder]</span>
                      )}
                      {proj.liveUrl && (
                        <a
                          href={proj.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:opacity-80 transition-opacity inline-flex items-center gap-1 font-semibold"
                          style={{ color: 'var(--text-primary)' }}
                        >
                          Live <ExternalLink size={11} />
                        </a>
                      )}
                    </div>
                  </div>

                  <ul className="space-y-1.5 mb-4">
                    {proj.features.slice(0, 3).map((pt, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm font-body" style={{ color: 'var(--text-muted)' }}>
                        <span className="mt-0.5 shrink-0" style={{ color: 'var(--metallic-silver)' }}>→</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-mono" style={{ color: 'var(--text-dim)' }}>
                    {proj.techStack.map((tag, idx) => (
                      <span key={tag} className="inline-flex items-center gap-2">
                        <span style={{ color: 'var(--text-muted)' }}>{tag}</span>
                        {idx < proj.techStack.length - 1 && <span aria-hidden="true">·</span>}
                      </span>
                    ))}
                  </div>
                </div>
              </TiltCard3D>
            ))}
          </div>
        </div>

        {/* Languages & Open Opportunities */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="card">
            <div className="flex items-center gap-2 mb-4">
              <Languages size={16} style={{ color: 'var(--chrome-highlight)' }} />
              <h3 className="font-display font-bold" style={{ color: 'var(--text-primary)' }}>
                Languages
              </h3>
            </div>
            <div className="space-y-3">
              {[
                ['English', 'Professional Working Proficiency'],
                ['Urdu', 'Native / Bilingual'],
              ].map(([lang, note]) => (
                <div key={lang}>
                  <p className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{lang}</p>
                  <p className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>{note}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h3 className="font-display font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
              Target Opportunities
            </h3>
            <div className="space-y-2">
              {OPEN_OPPORTUNITIES.map((role) => (
                <div key={role} className="flex items-center gap-2 text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
                  <CheckCircle2 size={12} style={{ color: 'var(--metallic-silver)' }} />
                  <span>{role}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
