import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Download, Compass, Layers, CheckCircle2, MapPin, GraduationCap } from 'lucide-react'
import Ambient3DBackground from '../components/Ambient3DBackground'
import LanyardPortraitCard from '../components/LanyardPortraitCard'
import TiltCard3D from '../components/TiltCard3D'
import {
  PERSONAL_PROFILE,
  ABOUT_NARRATIVE,
  ENGINEERING_PHILOSOPHY,
  OPEN_OPPORTUNITIES,
} from '../data/portfolioData'

export default function About() {
  const [portraitError, setPortraitError] = useState(false)

  return (
    <div className="min-h-screen relative pt-28 pb-24 overflow-hidden">
      <Ambient3DBackground className="fixed inset-0 w-full h-full z-0" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 space-y-20">
        {/* Top Narrative + Portrait */}
        <section className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <div className="lg:col-span-7 space-y-6">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest mb-3" style={{ color: 'var(--text-dim)' }}>
                01. About Me
              </p>
              <h1 className="section-heading mb-4">
                Software Engineering Student &amp;{' '}
                <span className="chrome-text">Backend-Focused Developer</span>
              </h1>
              <p className="font-mono text-xs sm:text-sm" style={{ color: 'var(--metallic-silver)' }}>
                {PERSONAL_PROFILE.positioning}
              </p>
            </div>

            <div className="space-y-4 font-body text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              {ABOUT_NARRATIVE.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link to="/case-studies" className="btn-primary text-sm">
                Explore Case Studies <ArrowRight size={15} />
              </Link>
              <Link to="/skills" className="btn-outline text-sm">
                View Categorized Skills
              </Link>
              <a href={PERSONAL_PROFILE.resumePdf} download className="btn-outline text-sm">
                <Download size={15} /> Download CV
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col items-center">
            <LanyardPortraitCard
              portraitSrc={PERSONAL_PROFILE.portrait}
              name={PERSONAL_PROFILE.name}
              title={PERSONAL_PROFILE.positioning}
              university={PERSONAL_PROFILE.university}
              degree={PERSONAL_PROFILE.degree}
            />

            <div className="w-full max-w-[320px] mt-4 p-4 rounded-2xl border border-[var(--border)] bg-[var(--bg-card-solid)] space-y-2.5 text-left text-xs font-mono">
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5" style={{ color: 'var(--text-dim)' }}>
                  <GraduationCap size={13} /> University
                </span>
                <span style={{ color: 'var(--text-primary)' }}>COMSATS Islamabad</span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5" style={{ color: 'var(--text-dim)' }}>
                  <MapPin size={13} /> Location
                </span>
                <span style={{ color: 'var(--text-primary)' }}>{PERSONAL_PROFILE.location}</span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5" style={{ color: 'var(--text-dim)' }}>
                  <Compass size={13} /> Primary Track
                </span>
                <span style={{ color: 'var(--accent)' }}>{PERSONAL_PROFILE.specialization}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Engineering Philosophy */}
        <section>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--text-dim)' }}>
                02. Engineering Philosophy
              </p>
              <h2 className="section-heading">How I Approach Systems</h2>
            </div>
            <Link to="/journey" className="btn-outline text-xs w-fit">
              View Learning Roadmap <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {ENGINEERING_PHILOSOPHY.map((item) => (
              <TiltCard3D key={item.index} maxTilt={5} className="h-full">
                <div className="card h-full flex flex-col justify-between hover:border-[var(--border-strong)]">
                  <div>
                    <span className="font-mono text-xs block mb-3" style={{ color: 'var(--text-dim)' }}>
                      {item.index}
                    </span>
                    <h3 className="font-display font-bold text-base mb-2 leading-snug" style={{ color: 'var(--text-primary)' }}>
                      {item.title}
                    </h3>
                    <p className="text-sm font-body leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                      {item.detail}
                    </p>
                  </div>
                </div>
              </TiltCard3D>
            ))}
          </div>
        </section>

        {/* Open Opportunities */}
        <section className="card border-[var(--border-strong)]">
          <div className="grid md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-5">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider mb-2" style={{ color: 'var(--text-dim)' }}>
                <Layers size={14} style={{ color: 'var(--chrome-highlight)' }} />
                <span>03. Early-Career Availability</span>
              </div>
              <h2 className="font-display font-bold text-2xl mb-3" style={{ color: 'var(--text-primary)' }}>
                Opportunities I&apos;m Open To
              </h2>
              <p className="text-sm font-body leading-relaxed mb-5" style={{ color: 'var(--text-muted)' }}>
                Seeking junior roles, internships, and technical collaborations aligned with backend systems, APIs, and AI-enabled software.
              </p>
              <Link to="/contact" className="btn-primary text-xs">
                Get In Touch <ArrowRight size={14} />
              </Link>
            </div>

            <div className="md:col-span-7 grid sm:grid-cols-2 gap-3">
              {OPEN_OPPORTUNITIES.map((role) => (
                <div
                  key={role}
                  className="flex items-center gap-2.5 px-4 py-3 rounded-xl border border-[var(--border)] text-sm font-body"
                  style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                >
                  <CheckCircle2 size={14} className="shrink-0" style={{ color: 'var(--metallic-silver)' }} />
                  <span>{role}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
