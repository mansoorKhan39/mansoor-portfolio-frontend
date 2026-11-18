import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import toast from 'react-hot-toast'
import {
  ArrowRight,
  ArrowUpRight,
  Download,
  Github,
  Linkedin,
  Mail,
  BookOpen,
  Layers,
  Send,
  Loader,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react'
import api from '../api'
import { useTheme } from '../context/ThemeContext'
import {
  PERSONAL_PROFILE,
  JOURNEY_MILESTONES,
  CASE_STUDIES,
  ENGINEERING_PRACTICES,
} from '../data/portfolioData'
import { syncProjectsFromApi } from '../utils/projectSync'
import Ambient3DBackground from '../components/Ambient3DBackground'
import TiltCard3D from '../components/TiltCard3D'
import HeroPortraitParallax from '../components/HeroPortraitParallax'
import LanyardPortraitCard from '../components/LanyardPortraitCard'
import ProjectShowcase3D from '../components/ProjectShowcase3D'
import CaseStudyDrawer from '../components/CaseStudyDrawer'
import SkillTimeline from '../components/SkillTimeline'
import VisitorCounter from '../components/VisitorCounter'

gsap.registerPlugin(ScrollTrigger)

const Hero3DBackdrop = lazy(() => import('../components/Hero3DBackdrop'))
const TechConstellation3D = lazy(() => import('../components/TechConstellation3D'))

const ROLE_ROTATION = ['Python Backend Engineer', 'AI Systems Developer', 'Full-Stack Developer']

const CAPABILITY_ROWS = [
  {
    code: '01',
    title: 'Backend Architecture & APIs',
    subtitle: 'FastAPI · Node.js · Express · REST Contracts',
    summary:
      'Modular server architectures with strict schema validation, role-based access control, JWT/OAuth security, and clean error boundaries.',
    tools: ['Python', 'FastAPI', 'Node.js', 'Express.js', 'MongoDB', 'PostgreSQL'],
  },
  {
    code: '02',
    title: 'Grounded AI & RAG Systems',
    subtitle: 'Gemini API · Repo Parsing · Citation Validation',
    summary:
      'Server-side LLM pipelines that verify generated file citations against actual codebase manifests before returning responses.',
    tools: ['Gemini API', 'Repository Parsing', 'RAG Concepts', 'Pydantic'],
  },
  {
    code: '03',
    title: 'Full-Stack Web & Mobile',
    subtitle: 'React · Three.js · Flutter · Multi-Role Platforms',
    summary:
      'Interactive 3D-enhanced React applications and cross-platform Flutter apps backed by clean REST endpoints and cloud databases.',
    tools: ['React.js', 'Three.js', 'Tailwind CSS', 'Flutter', 'Dart', 'Docker'],
  },
  {
    code: '04',
    title: 'NLP & Data Analytics',
    subtitle: 'NLTK · VADER · TextBlob · Pandas',
    summary:
      'Automated text preprocessing, sentiment scoring, fake-news analysis pipelines, and visual analytics dashboards.',
    tools: ['NLTK', 'VADER', 'TextBlob', 'Pandas', 'NumPy', 'Recharts'],
  },
]

const CORE_SKILL_TRACKS = [
  { name: 'Python & FastAPI', stage: 'Actively Used', bars: 3, color: 'var(--accent)' },
  { name: 'Node.js & Express', stage: 'Actively Used', bars: 3, color: 'var(--accent)' },
  { name: 'React & Tailwind', stage: 'Actively Used', bars: 3, color: 'var(--accent)' },
  { name: 'MongoDB & Auth (JWT/OAuth)', stage: 'Actively Used', bars: 3, color: 'var(--accent)' },
  { name: 'Gemini API & NLP (NLTK)', stage: 'Working Knowledge', bars: 2, color: 'var(--metallic-silver)' },
  { name: 'Docker, CI/CD & PostgreSQL', stage: 'Currently Learning', bars: 1, color: 'var(--accent-amber)' },
]

function pickFeaturedProjects(syncedList) {
  if (!Array.isArray(syncedList) || syncedList.length === 0) return []
  const featured = syncedList.filter((p) => p.featured !== false)
  return featured.length > 0 ? featured : syncedList
}

export default function Home() {
  const { dark } = useTheme()
  const [projects, setProjects] = useState(() => pickFeaturedProjects(CASE_STUDIES))
  const [selectedStudy, setSelectedStudy] = useState(null)
  const [openCapability, setOpenCapability] = useState('01')
  const [roleIdx, setRoleIdx] = useState(0)
  const [portraitError, setPortraitError] = useState(false)

  // Live Contact Form state on Home
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' })
  const [sendingMsg, setSendingMsg] = useState(false)
  const [sentMsg, setSentMsg] = useState(false)

  const pageRef = useRef(null)

  useEffect(() => {
    api
      .get('/api/projects')
      .then((res) => setProjects(pickFeaturedProjects(syncProjectsFromApi(res.data))))
      .catch(() => {})
  }, [])

  useEffect(() => {
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduced) return
    const timer = setInterval(() => {
      setRoleIdx((i) => (i + 1) % ROLE_ROTATION.length)
    }, 3200)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion || !pageRef.current) return

    const ctx = gsap.context(() => {
      gsap.utils.toArray('.reveal-section').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 86%',
              once: true,
            },
          }
        )
      })

      gsap.fromTo(
        '.career-spine-fill',
        { scaleY: 0, transformOrigin: 'top center' },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.career-timeline-wrap',
            start: 'top 74%',
            end: 'bottom 60%',
            scrub: 1,
          },
        }
      )
    }, pageRef)

    return () => ctx.revert()
  }, [])

  const handleQuickContact = async (e) => {
    e.preventDefault()
    if (!contactForm.name.trim() || !contactForm.email.trim() || !contactForm.message.trim()) {
      toast.error('Please fill name, email, and message')
      return
    }
    setSendingMsg(true)
    try {
      await api.post('/api/messages', {
        name: contactForm.name.trim(),
        email: contactForm.email.trim(),
        subject: 'Portfolio Quick Inquiry',
        message: contactForm.message.trim(),
      })
      toast.success('Message delivered!')
      setSentMsg(true)
      setContactForm({ name: '', email: '', message: '' })
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send message')
    } finally {
      setSendingMsg(false)
    }
  }

  const flagshipCodeMind =
    projects.find((p) => String(p.title || '').toLowerCase().includes('codemind')) ||
    projects[0] ||
    CASE_STUDIES.find((c) => c.slug === 'codemind-ai')

  return (
    <div ref={pageRef} className="min-h-screen relative">
      <Ambient3DBackground className="fixed inset-0 w-full h-full z-0" />

      {/* ── 01 · CRIMSON X + 3D INTERACTIVE HERO ── */}
      <section className="relative z-10 min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
        {/* Diagonal Glowing Crimson X Beams Backdrop */}
        <div className="crimson-x-stage opacity-80" aria-hidden="true">
          <div className="crimson-x-beam crimson-x-beam-a" />
          <div className="crimson-x-beam crimson-x-beam-b" />
        </div>

        {/* Live 3D Three.js Crimson Stage Behind Composition */}
        <div className="hidden md:block absolute inset-0 z-[1] opacity-85">
          <Suspense fallback={null}>
            <Hero3DBackdrop interactive className="w-full h-full" />
          </Suspense>
        </div>

        <div className="relative z-10 pointer-events-none max-w-7xl w-full mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            {/* Left Axis: Bold Stacked Name + Role Rotation + Compact CTAs */}
            <div className="lg:col-span-6 space-y-5 pointer-events-auto">
              <div className="min-h-[24px]">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={ROLE_ROTATION[roleIdx]}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.28 }}
                    className="font-mono text-xs md:text-sm uppercase tracking-[0.26em]"
                    style={{ color: 'var(--accent)' }}
                  >
                    {ROLE_ROTATION[roleIdx]}
                  </motion.p>
                </AnimatePresence>
              </div>

              <h1
                className="font-display font-bold tracking-tight leading-[0.94] uppercase"
                style={{ fontSize: 'clamp(2.9rem, 5.8vw, 4.9rem)', color: 'var(--text-primary)' }}
              >
                MANSOOR
                <br />
                <span className="chrome-text">ALI KHAN</span>
                <span style={{ color: 'var(--accent)' }}>.</span>
              </h1>

              <p className="font-body text-sm md:text-base leading-relaxed max-w-md" style={{ color: 'var(--text-muted)' }}>
                Python APIs, grounded AI pipelines, and full-stack software engineered at COMSATS.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a href="#projects" className="btn-primary text-xs py-3 px-6">
                  Explore 3D Work <ArrowRight size={15} />
                </a>
                {flagshipCodeMind && (
                  <button
                    type="button"
                    onClick={() => setSelectedStudy(flagshipCodeMind)}
                    className="btn-outline text-xs py-3 px-5"
                  >
                    <BookOpen size={15} /> CodeMind Flow
                  </button>
                )}
              </div>

              <p className="font-mono text-[11px] uppercase tracking-widest pt-2" style={{ color: 'var(--text-dim)' }}>
                Drag or click 3D stage · BS Software Engineering
              </p>
            </div>

            {/* Right Axis: 2.5D Holographic Parallax Depth Portrait + Mobile 3D Core */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center pointer-events-auto">
              <HeroPortraitParallax
                portraitSrc={PERSONAL_PROFILE.portrait}
                name={PERSONAL_PROFILE.name}
                specialization="Python Backend & AI Systems"
                status="AVAILABLE FOR HIGH-IMPACT BACKEND ROLES"
              />

              {/* Mobile Dedicated Interactive 3D Canvas */}
              <div className="md:hidden relative h-[240px] w-full mt-4">
                <Suspense fallback={null}>
                  <Hero3DBackdrop interactive className="w-full h-full" />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 02 · PROJECTS. (3D Coverflow Stage + Bento Grid Deck — 100% Admin Managed) ── */}
      <section
        id="projects"
        className="reveal-section relative z-10 py-24 border-t border-[var(--border)]"
        style={{ backgroundColor: dark ? 'rgba(17, 13, 20, 0.78)' : 'rgba(243, 239, 248, 0.85)' }}
      >
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          {/* Authentic High-Impact Header + Live System Highlights */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.28em] mb-2" style={{ color: 'var(--accent)' }}>
                Featured Systems · {projects.length} Live Records
              </p>
              <h2
                className="font-display font-bold uppercase tracking-tight"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 4.2rem)', color: 'var(--text-primary)' }}
              >
                PROJECTS<span style={{ color: 'var(--accent)' }}>.</span>
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <Link to="/projects" className="btn-outline text-xs py-2.5">
                All Projects <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Integrated 3D Horizon Stage + Bento Matrix */}
          <ProjectShowcase3D projects={projects} onInspect={setSelectedStudy} />
        </div>
      </section>

      {/* ── 03 · ABOUT MANSOOR. (Swinging Lanyard 3D Portrait Card + Editorial Copy) ── */}
      <section id="about" className="reveal-section relative z-10 py-24 border-t border-[var(--border)]">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Copy */}
          <div className="lg:col-span-7 space-y-6">
            <h2
              className="font-display font-bold uppercase leading-[0.96]"
              style={{ fontSize: 'clamp(2.4rem, 4.4vw, 3.8rem)', color: 'var(--text-primary)' }}
            >
              ABOUT
              <br />
              <span style={{ color: 'var(--accent)' }}>MANSOOR.</span>
            </h2>

            <p className="font-body text-sm md:text-base leading-relaxed max-w-xl" style={{ color: 'var(--text-muted)' }}>
              Software Engineering student at COMSATS Islamabad focused on designing clean APIs, secure auth systems, and grounded AI software that works reliably outside demos.
            </p>

            <ul className="space-y-2.5 text-sm font-body" style={{ color: 'var(--text-primary)' }}>
              {ENGINEERING_PRACTICES.slice(0, 3).map((item) => (
                <li key={item.title} className="flex items-center gap-2.5">
                  <CheckCircle2 size={15} style={{ color: 'var(--accent)' }} className="shrink-0" />
                  <span>
                    <strong className="font-semibold">{item.title}:</strong>{' '}
                    <span style={{ color: 'var(--text-muted)' }}>{item.tools.join(', ')}</span>
                  </span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[var(--border)]">
              <div className="flex flex-wrap items-center gap-3">
                <Link to="/about" className="btn-outline text-xs py-2">
                  Philosophy <ArrowRight size={13} />
                </Link>
                <Link to="/education" className="btn-outline text-xs py-2">
                  Education
                </Link>
                <a href={PERSONAL_PROFILE.resumePdf} download className="btn-primary text-xs py-2">
                  <Download size={13} /> CV
                </a>
              </div>
              <VisitorCounter />
            </div>
          </div>

          {/* Right Hanging Lanyard 3D Draggable Physics Portrait Card */}
          <div className="lg:col-span-5 flex justify-center">
            <LanyardPortraitCard
              portraitSrc={PERSONAL_PROFILE.portrait}
              name={PERSONAL_PROFILE.name}
              title="Python Backend & AI Systems"
              university={PERSONAL_PROFILE.university}
              degree={PERSONAL_PROFILE.degree}
            />
          </div>
        </div>
      </section>

      {/* ── 04 · CAPABILITIES / WHAT I BUILD (Crimson Arrow Accordion Rows) ── */}
      <section
        id="capabilities"
        className="reveal-section relative z-10 py-24 border-t border-[var(--border)]"
        style={{ backgroundColor: dark ? 'rgba(17, 13, 20, 0.78)' : 'rgba(243, 239, 248, 0.85)' }}
      >
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="font-mono text-xs uppercase tracking-[0.28em] mb-2" style={{ color: 'var(--accent)' }}>
              Core Engineering
            </p>
            <h2
              className="font-display font-bold uppercase"
              style={{ fontSize: 'clamp(2.4rem, 4.6vw, 3.8rem)', color: 'var(--text-primary)' }}
            >
              WHAT I <span style={{ color: 'var(--accent)' }}>BUILD.</span>
            </h2>
          </div>

          <div className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
            {CAPABILITY_ROWS.map((row) => {
              const isOpen = openCapability === row.code
              return (
                <div
                  key={row.code}
                  onClick={() => setOpenCapability(isOpen ? '' : row.code)}
                  className="py-6 px-2 sm:px-4 cursor-pointer transition-colors hover:bg-white/[0.02]"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-baseline gap-4 sm:gap-7">
                      <span className="font-mono text-xs sm:text-sm font-bold" style={{ color: 'var(--accent)' }}>
                        {row.code}
                      </span>
                      <div>
                        <h3 className="font-display font-bold text-xl sm:text-2xl" style={{ color: 'var(--text-primary)' }}>
                          {row.title}
                        </h3>
                        <p className="font-mono text-xs mt-1" style={{ color: 'var(--text-dim)' }}>
                          {row.subtitle}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      aria-label={`Toggle ${row.title}`}
                      className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 border transition-transform duration-300"
                      style={{
                        backgroundColor: isOpen ? 'var(--accent)' : 'transparent',
                        borderColor: isOpen ? 'var(--accent)' : 'var(--border-strong)',
                        color: isOpen ? '#ffffff' : 'var(--accent)',
                        transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                      }}
                    >
                      <ArrowUpRight size={17} />
                    </button>
                  </div>

                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.22 }}
                      className="mt-4 pl-8 sm:pl-12 space-y-3"
                    >
                      <p className="font-body text-sm leading-relaxed max-w-2xl" style={{ color: 'var(--text-muted)' }}>
                        {row.summary}
                      </p>
                      <div className="flex flex-wrap gap-2 text-xs font-mono" style={{ color: 'var(--text-primary)' }}>
                        {row.tools.map((t, idx) => (
                          <span key={t} className="inline-flex items-center gap-2">
                            <span>{t}</span>
                            {idx < row.tools.length - 1 && <span style={{ color: 'var(--accent)' }}>·</span>}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── 05 · JOURNEY TIMELINE (Glowing Crimson Laser Spine) ── */}
      <section id="journey" className="reveal-section relative z-10 py-24 border-t border-[var(--border)]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2
              className="font-display font-bold uppercase leading-tight"
              style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.6rem)', color: 'var(--text-primary)' }}
            >
              ENGINEERING <span style={{ color: 'var(--accent)' }}>JOURNEY.</span>
            </h2>
          </div>

          <div className="career-timeline-wrap relative">
            <div className="absolute left-3 md:left-1/2 top-0 bottom-0 -translate-x-1/2 w-[3px] bg-[var(--border)]">
              <div className="career-spine-fill career-laser-spine w-full h-full relative">
                <div className="career-laser-dot absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2" />
              </div>
            </div>

            <div className="space-y-12">
              {JOURNEY_MILESTONES.map((item) => (
                <div
                  key={item.period}
                  className="grid md:grid-cols-12 gap-4 md:gap-10 items-start pl-10 md:pl-0"
                >
                  <div className="md:col-span-5 md:text-right md:pr-8 flex md:flex-row-reverse items-baseline justify-between md:justify-start gap-4">
                    <span className="font-display font-bold text-2xl md:text-3xl shrink-0" style={{ color: 'var(--text-primary)' }}>
                      {item.period}
                    </span>
                    <div>
                      <h3 className="font-display font-semibold text-base md:text-lg" style={{ color: 'var(--text-primary)' }}>
                        {item.role}
                      </h3>
                      <p className="font-mono text-xs mt-0.5" style={{ color: 'var(--accent)' }}>
                        {item.org}
                      </p>
                    </div>
                  </div>

                  <div className="hidden md:block md:col-span-2" />

                  <div className="md:col-span-5 md:pl-4">
                    <p className="font-body text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-14">
            <Link to="/journey" className="btn-outline text-xs">
              Full Learning Roadmap <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 06 · 3D TECH SPHERE + STAGE SKILLS & TOOLKIT ── */}
      <section
        id="tech-stack"
        className="reveal-section relative z-10 py-24 border-t border-[var(--border)]"
        style={{ backgroundColor: dark ? 'rgba(17, 13, 20, 0.78)' : 'rgba(243, 239, 248, 0.85)' }}
      >
        <div className="max-w-6xl mx-auto px-6 space-y-12">
          <div className="text-center space-y-2">
            <p className="font-mono text-xs uppercase tracking-[0.28em]" style={{ color: 'var(--accent)' }}>
              3D Stack &amp; Usage Tiers
            </p>
            <h2
              className="font-display font-bold uppercase"
              style={{ fontSize: 'clamp(2.3rem, 4.5vw, 3.8rem)', color: 'var(--text-primary)' }}
            >
              ENGINEERING <span style={{ color: 'var(--accent)' }}>SKILLS.</span>
            </h2>
          </div>

          {/* Crisp 2-Column Stage Matrix (Zero Fake Percentages — Authentic Tiers) */}
          <div className="grid md:grid-cols-2 gap-4">
            {CORE_SKILL_TRACKS.map((skill) => (
              <div
                key={skill.name}
                className="rounded-xl p-4 border border-[var(--border)] flex flex-col gap-2.5"
                style={{ backgroundColor: 'var(--bg-card)' }}
              >
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-semibold text-sm font-display" style={{ color: 'var(--text-primary)' }}>
                    {skill.name}
                  </span>
                  <span style={{ color: skill.color }}>{skill.stage}</span>
                </div>
                <div className="grid grid-cols-3 gap-1.5 h-1.5">
                  {[1, 2, 3].map((step) => (
                    <span
                      key={step}
                      className="rounded-full"
                      style={{
                        backgroundColor: step <= skill.bars ? skill.color : 'rgba(255,255,255,0.08)',
                      }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Interactive 3D WebGL Crimson Tech Sphere */}
          <Suspense fallback={null}>
            <TechConstellation3D />
          </Suspense>

          {/* Horizontal Framer Motion Skill Timeline */}
          <SkillTimeline showCategoryFilters layoutPrefix="home-skills" />
        </div>
      </section>

      {/* ── 07 · CENTERED CRIMSON CONTACT STAGE (Direct Live API Form) ── */}
      <section id="contact" className="reveal-section relative z-10 py-24 border-t border-[var(--border)]">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-10 space-y-2">
            <h2
              className="font-display font-bold uppercase"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: 'var(--text-primary)' }}
            >
              CONTACT<span style={{ color: 'var(--accent)' }}>.</span>
            </h2>
            <p className="font-body text-sm" style={{ color: 'var(--text-muted)' }}>
              Open to Junior Backend / AI Engineering roles, internships &amp; collaborations.
            </p>
          </div>

          <div
            className="rounded-3xl p-6 sm:p-8 border shadow-2xl"
            style={{
              backgroundColor: 'var(--bg-card-solid)',
              borderColor: 'var(--border-strong)',
              boxShadow: '0 24px 90px -30px rgba(194, 164, 255, 0.35)',
            }}
          >
            {sentMsg ? (
              <div className="text-center py-10 space-y-4">
                <CheckCircle2 size={38} className="mx-auto" style={{ color: 'var(--accent)' }} />
                <h3 className="font-display font-bold text-xl" style={{ color: 'var(--text-primary)' }}>
                  Message Sent!
                </h3>
                <p className="font-body text-sm" style={{ color: 'var(--text-muted)' }}>
                  Thanks for reaching out — I&apos;ll get back to you soon.
                </p>
                <button
                  type="button"
                  onClick={() => setSentMsg(false)}
                  className="btn-outline text-xs"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleQuickContact} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={contactForm.name}
                    onChange={(e) => setContactForm((p) => ({ ...p, name: e.target.value }))}
                    className="input-field text-sm"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Your Email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm((p) => ({ ...p, email: e.target.value }))}
                    className="input-field text-sm"
                  />
                </div>
                <textarea
                  rows={4}
                  required
                  placeholder="Tell me about the role, project, or collaboration..."
                  value={contactForm.message}
                  onChange={(e) => setContactForm((p) => ({ ...p, message: e.target.value }))}
                  className="input-field text-sm resize-none"
                />
                <button
                  type="submit"
                  disabled={sendingMsg}
                  className="btn-primary w-full justify-center py-3 text-sm disabled:opacity-60"
                >
                  {sendingMsg ? (
                    <>
                      <Loader size={16} className="animate-spin" /> Sending...
                    </>
                  ) : (
                    <>
                      <Send size={15} /> Send Message
                    </>
                  )}
                </button>
              </form>
            )}

            <div className="mt-6 pt-5 border-t border-[var(--border)] flex flex-wrap items-center justify-center gap-6 text-xs font-mono">
              <a
                href={`mailto:${PERSONAL_PROFILE.email}`}
                className="inline-flex items-center gap-1.5 hover:opacity-80"
                style={{ color: 'var(--text-primary)' }}
              >
                <Mail size={14} style={{ color: 'var(--accent)' }} /> {PERSONAL_PROFILE.email}
              </a>
              <a
                href={PERSONAL_PROFILE.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 hover:opacity-80"
                style={{ color: 'var(--text-muted)' }}
              >
                <Github size={14} style={{ color: 'var(--accent)' }} /> GitHub
              </a>
              <a
                href={PERSONAL_PROFILE.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 hover:opacity-80"
                style={{ color: 'var(--text-muted)' }}
              >
                <Linkedin size={14} style={{ color: 'var(--accent)' }} /> LinkedIn
              </a>
              <Link
                to="/resume"
                className="inline-flex items-center gap-1.5 hover:opacity-80"
                style={{ color: 'var(--text-muted)' }}
              >
                Resume <ArrowUpRight size={13} style={{ color: 'var(--accent)' }} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CaseStudyDrawer study={selectedStudy} onClose={() => setSelectedStudy(null)} />
    </div>
  )
}
