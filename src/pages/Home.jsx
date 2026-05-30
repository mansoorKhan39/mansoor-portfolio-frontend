import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Download, Github, Linkedin, Mail, Code2, Brain, Database, Globe, Cpu, Sparkles } from 'lucide-react'
import api from '../api'
import ProjectCard from '../components/ProjectCard'
import { useTyping } from '../hooks/useTyping'

const skills = [
  {
    category: 'Frontend', icon: Globe, color: 'text-accent-400', bg: 'bg-accent-500/10 border-accent-500/20',
    items: [
      { name: 'React.js', level: 85 },
      { name: 'Tailwind CSS', level: 90 },
      { name: 'JavaScript', level: 80 },
      { name: 'HTML5 / CSS3', level: 92 },
    ],
  },
  {
    category: 'Backend', icon: Database, color: 'text-brand-400', bg: 'bg-brand-500/10 border-brand-500/20',
    items: [
      { name: 'Node.js', level: 80 },
      { name: 'Express.js', level: 82 },
      { name: 'MongoDB', level: 78 },
      { name: 'REST APIs', level: 85 },
    ],
  },
  {
    category: 'AI / ML', icon: Brain, color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/20',
    items: [
      { name: 'Python', level: 75 },
      { name: 'Scikit-learn', level: 65 },
      { name: 'NLTK / NLP', level: 70 },
      { name: 'Pandas', level: 72 },
    ],
  },
  {
    category: 'Tools', icon: Cpu, color: 'text-rose-400', bg: 'bg-rose-500/10 border-rose-500/20',
    items: [
      { name: 'Git & GitHub', level: 88 },
      { name: 'VS Code', level: 92 },
      { name: 'Postman', level: 80 },
      { name: 'Vercel', level: 85 },
    ],
  },
]

const stats = [
  { label: 'Projects Built', value: '20+' },
  { label: 'Technologies', value: '15+' },
  { label: 'GitHub Repos', value: '30+' },
  { label: 'Years Learning', value: '3+' },
]

function useInView(ref, threshold = 0.1) {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [ref, threshold])
  return inView
}

function SkillBar({ name, level, color, delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref)
  return (
    <div ref={ref} className="mb-3">
      <div className="flex justify-between mb-1">
        <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>{name}</span>
        <span className="text-xs font-mono text-brand-400">{level}%</span>
      </div>
      <div className="h-1.5 rounded-full" style={{ backgroundColor: 'var(--border)' }}>
        <div
          className={`h-1.5 rounded-full transition-all duration-1000 ease-out ${color}`}
          style={{ width: inView ? `${level}%` : '0%', transitionDelay: `${delay}ms` }}
        />
      </div>
    </div>
  )
}

const skillColors = {
  'Frontend': 'bg-accent-400',
  'Backend': 'bg-brand-400',
  'AI / ML': 'bg-purple-400',
  'Tools': 'bg-rose-400',
}

export default function Home() {
  const [featuredProjects, setFeaturedProjects] = useState([])
  const aboutRef = useRef(null)
  const skillsRef = useRef(null)
  const projectsRef = useRef(null)
  const aboutInView = useInView(aboutRef)
  const skillsInView = useInView(skillsRef)
  const projectsInView = useInView(projectsRef)

  const typedText = useTyping([
    'MERN Stack Developer',
    'AI/ML Enthusiast',
    'Full-Stack Engineer',
    'React Developer',
    'Problem Solver',
  ])

  useEffect(() => {
    api.get('/api/projects').then(res => {
      const featured = res.data.filter(p => p.featured).slice(0, 3)
      setFeaturedProjects(featured.length ? featured : res.data.slice(0, 3))
    }).catch(() => {})
  }, [])

  return (
    <div className="min-h-screen">
      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b10_1px,transparent_1px),linear-gradient(to_bottom,#1e293b10_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-brand-500/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-500/8 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />

        <div className="relative max-w-6xl mx-auto px-6 py-20 w-full">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500/10 border border-brand-500/20 mb-8 animate-fade-up">
                <Sparkles size={14} className="text-brand-400" />
                <span className="text-brand-400 text-sm font-mono">Available for opportunities</span>
              </div>

              <h1 className="font-display text-5xl md:text-6xl font-bold tracking-tight leading-tight mb-4 animate-fade-up animate-delay-100">
                Hi, I'm<br />
                <span className="gradient-text">Mansoor</span><br />
                <span className="text-4xl md:text-5xl" style={{ color: 'var(--text-muted)' }}>Ali Khan</span>
              </h1>

              {/* Typing animation */}
              <div className="flex items-center gap-3 mb-4 animate-fade-up animate-delay-200">
                <div className="h-px flex-1 bg-gradient-to-r from-brand-500/50 to-transparent max-w-[60px]" />
                <p className="text-accent-400 font-mono text-sm typing-cursor min-h-[20px]">
                  {typedText}
                </p>
              </div>

              <p className="font-body leading-relaxed max-w-lg mb-8 animate-fade-up animate-delay-300" style={{ color: 'var(--text-muted)' }}>
                I build full-stack web applications and explore the intersection of software engineering and artificial intelligence. Passionate about creating elegant solutions to complex problems.
              </p>

              <div className="flex flex-wrap gap-3 mb-8 animate-fade-up animate-delay-400">
                <Link to="/projects" className="btn-primary">View Projects <ArrowRight size={17} /></Link>
                <Link to="/contact" className="btn-outline">Hire Me <Mail size={17} /></Link>
                <Link to="/resume" className="btn-outline">Resume <ArrowRight size={17} /></Link>
              </div>

              <div className="flex items-center gap-5 animate-fade-up animate-delay-500">
                <a href="https://github.com/mansoorKhan39" target="_blank" rel="noreferrer"
                  className="flex items-center gap-2 transition-colors text-sm hover:text-brand-400" style={{ color: 'var(--text-dim)' }}>
                  <Github size={18} /> GitHub
                </a>
                <span className="w-px h-4 bg-slate-700" />
                <a href="https://www.linkedin.com/in/mansoor-ali-khan-b27a42304" target="_blank" rel="noreferrer"
                  className="flex items-center gap-2 transition-colors text-sm hover:text-brand-400" style={{ color: 'var(--text-dim)' }}>
                  <Linkedin size={18} /> LinkedIn
                </a>
                <span className="w-px h-4 bg-slate-700" />
                <a href="mailto:mansooralikhan1029@gmail.com"
                  className="flex items-center gap-2 transition-colors text-sm hover:text-brand-400" style={{ color: 'var(--text-dim)' }}>
                  <Mail size={18} /> Email
                </a>
              </div>
            </div>

            {/* Photo */}
            <div className="flex justify-center items-center animate-fade-in animate-delay-300">
              <div className="relative">
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-brand-500/20 animate-spin-slow" style={{ margin: '-20px' }} />
                <div className="absolute inset-0 rounded-full ring-pulse" style={{
                  background: 'conic-gradient(from 0deg, #f59e0b33, #3b82f633, #f59e0b33, #3b82f633, #f59e0b33)',
                  filter: 'blur(8px)', margin: '-6px', borderRadius: '50%',
                }} />
                <div className="relative w-72 h-72 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-[var(--bg-card)] shadow-2xl animate-float">
                  <img src="/mansoor.png" alt="Mansoor Ali Khan" className="w-full h-full object-cover object-top"
                    style={{ filter: 'contrast(1.05) brightness(1.02)' }} />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-t from-[var(--bg-primary)]/30 via-transparent to-transparent" />
                </div>
                <div className="absolute -bottom-2 -left-6 border border-[var(--border)] rounded-xl px-3 py-2 shadow-xl animate-float" style={{ backgroundColor: 'var(--bg-card)', animationDelay: '1s' }}>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-brand-400 animate-pulse" />
                    <span className="text-xs font-mono" style={{ color: 'var(--text-primary)' }}>Open to work</span>
                  </div>
                </div>
                <div className="absolute -top-2 -right-6 border border-[var(--border)] rounded-xl px-3 py-2 shadow-xl animate-float" style={{ backgroundColor: 'var(--bg-card)', animationDelay: '2s' }}>
                  <div className="flex items-center gap-2">
                    <Code2 size={12} className="text-accent-400" />
                    <span className="text-xs font-mono" style={{ color: 'var(--text-primary)' }}>MERN Stack</span>
                  </div>
                </div>
                <div className="absolute top-1/2 -right-8 border border-brand-500/30 rounded-xl px-3 py-2 shadow-xl animate-float" style={{ backgroundColor: 'var(--bg-card)', animationDelay: '0.5s' }}>
                  <div className="flex items-center gap-2">
                    <Brain size={12} className="text-purple-400" />
                    <span className="text-xs font-mono" style={{ color: 'var(--text-primary)' }}>AI / ML</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-16 border-y border-[var(--border)]" style={{ backgroundColor: 'var(--bg-card)' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map(({ label, value }) => (
              <div key={label} className="text-center">
                <div className="font-display text-4xl font-bold gradient-text mb-2">{value}</div>
                <div className="text-sm font-body" style={{ color: 'var(--text-dim)' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section ref={aboutRef} className="py-24">
        <div className={`max-w-6xl mx-auto px-6 transition-all duration-700 ${aboutInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-brand-400 font-mono text-sm mb-4">// about me</p>
              <h2 className="section-heading mb-6">Crafting Digital<br /><span className="gradient-text">Experiences</span></h2>
              <div className="space-y-4 font-body leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                <p>I'm a passionate full-stack developer with strong expertise in the MERN stack. I love transforming ideas into production-ready applications.</p>
                <p>Beyond web development, I'm deeply interested in AI and Machine Learning. I work with Python-based ML frameworks to build intelligent systems.</p>
                <p>I believe in clean code, intuitive design, and continuous learning.</p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                {['Problem Solver', 'Team Player', 'Fast Learner', 'Clean Code'].map(t => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
            </div>

            {/* Code visual */}
            <div className="relative">
              <div className="rounded-2xl border border-[var(--border)] overflow-hidden shadow-2xl" style={{ backgroundColor: 'var(--bg-card)' }}>
                <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--border)]" style={{ backgroundColor: 'var(--bg-sidebar)' }}>
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-brand-400/80" />
                  <span className="ml-2 text-xs font-mono" style={{ color: 'var(--text-dim)' }}>mansoor.js</span>
                </div>
                <pre className="p-6 text-sm font-mono leading-relaxed overflow-x-auto">
                  <code>
                    <span style={{ color: 'var(--text-dim)' }}>{'// Developer Profile\n'}</span>
                    <span className="text-purple-400">const </span>
                    <span className="text-accent-400">mansoor</span>
                    <span style={{ color: 'var(--text-primary)' }}> = {'{\n'}</span>
                    <span className="text-brand-400">{'  name'}</span>
                    <span style={{ color: 'var(--text-primary)' }}>: </span>
                    <span className="text-yellow-300">'Mansoor Ali Khan'</span>
                    <span style={{ color: 'var(--text-primary)' }}>,{'\n'}</span>
                    <span className="text-brand-400">{'  role'}</span>
                    <span style={{ color: 'var(--text-primary)' }}>: </span>
                    <span className="text-yellow-300">'MERN Stack Dev'</span>
                    <span style={{ color: 'var(--text-primary)' }}>,{'\n'}</span>
                    <span className="text-brand-400">{'  stack'}</span>
                    <span style={{ color: 'var(--text-primary)' }}>: [</span>
                    <span className="text-yellow-300">'Mongo'</span>
                    <span style={{ color: 'var(--text-primary)' }}>, </span>
                    <span className="text-yellow-300">'Express'</span>
                    <span style={{ color: 'var(--text-primary)' }}>,{'\n'}</span>
                    <span style={{ color: 'var(--text-primary)' }}>{'           '}</span>
                    <span className="text-yellow-300">'React'</span>
                    <span style={{ color: 'var(--text-primary)' }}>, </span>
                    <span className="text-yellow-300">'Node'</span>
                    <span style={{ color: 'var(--text-primary)' }}>],{'\n'}</span>
                    <span className="text-brand-400">{'  ai_ml'}</span>
                    <span style={{ color: 'var(--text-primary)' }}>: </span>
                    <span className="text-orange-400">true</span>
                    <span style={{ color: 'var(--text-primary)' }}>,{'\n'}</span>
                    <span className="text-brand-400">{'  available'}</span>
                    <span style={{ color: 'var(--text-primary)' }}>: </span>
                    <span className="text-orange-400">true</span>
                    <span style={{ color: 'var(--text-primary)' }}>{'\n};\n\n'}</span>
                    <span style={{ color: 'var(--text-dim)' }}>{"// Let's build together 🚀"}</span>
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SKILLS WITH PROGRESS BARS ── */}
      <section ref={skillsRef} className="py-24" style={{ backgroundColor: 'var(--bg-card)' }}>
        <div className={`max-w-6xl mx-auto px-6 transition-all duration-700 ${skillsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-16">
            <p className="text-brand-400 font-mono text-sm mb-4">// skills & technologies</p>
            <h2 className="section-heading">What I Work With</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map(({ category, icon: Icon, color, bg, items }, i) => (
              <div key={category} className="card hover:border-slate-700 transition-all duration-300 hover:-translate-y-1">
                <div className={`inline-flex p-2.5 rounded-lg border ${bg} mb-4`}>
                  <Icon size={20} className={color} />
                </div>
                <h3 className="font-display font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>{category}</h3>
                <div className="space-y-1">
                  {items.map((item, j) => (
                    <SkillBar
                      key={item.name}
                      name={item.name}
                      level={item.level}
                      color={skillColors[category]}
                      delay={j * 100}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PROJECTS ── */}
      <section ref={projectsRef} className="py-24">
        <div className={`max-w-6xl mx-auto px-6 transition-all duration-700 ${projectsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-end justify-between mb-16">
            <div>
              <p className="text-brand-400 font-mono text-sm mb-4">// featured work</p>
              <h2 className="section-heading">Recent Projects</h2>
            </div>
            <Link to="/projects" className="btn-outline text-sm hidden md:inline-flex">All Projects <ArrowRight size={16} /></Link>
          </div>

          {featuredProjects.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProjects.map((project, i) => (
                <ProjectCard key={project._id} project={project} delay={i * 100} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16" style={{ color: 'var(--text-dim)' }}>
              <Code2 size={40} className="mx-auto mb-4 opacity-30" />
              <p className="font-body">Add projects from admin panel</p>
            </div>
          )}

          <div className="text-center mt-10 md:hidden">
            <Link to="/projects" className="btn-outline">All Projects <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 border-t border-[var(--border)]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="relative rounded-3xl p-12 overflow-hidden border border-brand-500/20" style={{ backgroundColor: 'var(--bg-card)' }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-brand-500/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 via-transparent to-accent-500/5" />
            <div className="relative">
              <Sparkles className="mx-auto mb-4 text-brand-400" size={32} />
              <h2 className="font-display text-4xl font-bold mb-4">Let's Build Something <span className="gradient-text">Amazing</span></h2>
              <p className="font-body mb-8 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                Have a project in mind or looking for a developer? I'm open to freelance work, collaborations, and full-time opportunities.
              </p>
              <Link to="/contact" className="btn-primary text-base">Start a Conversation <ArrowRight size={18} /></Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] py-8" style={{ backgroundColor: 'var(--bg-card)' }}>
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm font-mono" style={{ color: 'var(--text-dim)' }}>© 2024 Mansoor Ali Khan. Built with MERN stack.</p>
          <div className="flex items-center gap-6">
            <a href="https://github.com/mansoorKhan39" target="_blank" rel="noreferrer" className="transition-colors text-sm hover:text-brand-400" style={{ color: 'var(--text-dim)' }}>GitHub</a>
            <a href="https://www.linkedin.com/in/mansoor-ali-khan-b27a42304" target="_blank" rel="noreferrer" className="transition-colors text-sm hover:text-brand-400" style={{ color: 'var(--text-dim)' }}>LinkedIn</a>
            <Link to="/admin" className="transition-colors text-xs hover:text-slate-500" style={{ color: 'var(--text-dim)' }}>Admin</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
