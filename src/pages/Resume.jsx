import { Download, GraduationCap, Briefcase, Code2, Award, ExternalLink } from 'lucide-react'

const education = [
  {
    degree: 'BS Software Engineering',
    institution: 'COMSATS University Islamabad',
    period: '2023 – Present',
    detail: 'CGPA: 3.06 / 4.0  •  5th Semester  •  Expected Graduation: 2027',
    color: 'text-brand-400',
    border: 'border-brand-500/30',
  },
]

const skills = [
  { label: 'Frontend', items: ['React.js', 'Next.js', 'HTML5', 'CSS3', 'Tailwind CSS', 'JavaScript', 'TypeScript'], color: 'bg-accent-500' },
  { label: 'Backend', items: ['Node.js', 'Express.js', 'REST APIs', 'MongoDB', 'Mongoose', 'JWT Auth'], color: 'bg-brand-500' },
  { label: 'AI / ML', items: ['Python', 'TensorFlow', 'Scikit-learn', 'NLTK', 'VADER', 'Pandas', 'NumPy'], color: 'bg-purple-500' },
  { label: 'Tools', items: ['Git', 'GitHub', 'VS Code', 'Postman', 'Vercel', 'Docker', 'Linux'], color: 'bg-rose-500' },
]

const projects = [
  {
    name: 'Exclusive — E-Commerce Platform',
    period: 'May 2026',
    live: 'https://exclusive-ecommerce-maah.vercel.app',
    github: 'https://github.com/mansoorKhan39/Exclusive-Ecommerce',
    color: 'border-accent-500/40 bg-accent-500/5',
    dot: 'bg-accent-400',
    points: [
      'Built production-ready MERN e-commerce app with JWT auth & Google OAuth',
      'Admin dashboard for product, order & user management with revenue overview',
      'Cart, wishlist, flash sales with countdown, reviews & ratings system',
      'Docker support, fully responsive mobile-first design',
    ],
    tags: ['MongoDB', 'Express', 'React', 'Node.js', 'JWT', 'Google OAuth', 'Docker'],
  },
  {
    name: 'TruthPulse — Fake News & Sentiment Dashboard',
    period: 'May 2026',
    live: 'https://truthpulse-aymd.vercel.app',
    github: 'https://github.com/mansoorKhan39/truthpulse',
    color: 'border-purple-500/40 bg-purple-500/5',
    dot: 'bg-purple-400',
    points: [
      'Analyzed 44,898 news articles & 160,000 tweets using NLP for fake news detection',
      'Built sentiment scoring pipeline with VADER & TextBlob',
      'Interactive React dashboard with Recharts for real-time data visualization',
      'REST API with Node.js & Express, MongoDB Atlas database',
    ],
    tags: ['React', 'Node.js', 'Python', 'NLTK', 'VADER', 'MongoDB', 'Recharts'],
  },
  {
    name: 'Personal Portfolio Website',
    period: 'May 2026',
    live: 'https://mansoor-portfolio-frontend-w3ek.vercel.app',
    github: 'https://github.com/mansoorKhan39/mansoor-portfolio-frontend',
    color: 'border-brand-500/40 bg-brand-500/5',
    dot: 'bg-brand-400',
    points: [
      'Full-stack MERN portfolio with JWT-protected admin panel',
      'Contact inbox with read/unread tracking & email reply feature',
      'Project CRUD — add, edit, delete, feature from admin dashboard',
      'Custom dark/light theme, responsive design',
    ],
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Tailwind CSS'],
  },
]

export default function Resume() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-brand-400 font-mono text-sm mb-3">// my resume</p>
            <h1 className="section-heading mb-2">Mansoor Ali Khan</h1>
            <p className="font-mono text-sm text-accent-400">MERN Stack Developer  •  AI/ML Enthusiast</p>
          </div>
          <a href="/Mansoor_Ali_Khan_CV.pdf" download className="btn-primary shrink-0">
            <Download size={17} /> Download CV (PDF)
          </a>
        </div>

        {/* Contact info bar */}
        <div className="card mb-10 flex flex-wrap gap-6">
          {[
            { label: 'Email', value: 'mansooralikhan1029@gmail.com', href: 'mailto:mansooralikhan1029@gmail.com' },
            { label: 'GitHub', value: 'github.com/mansoorKhan39', href: 'https://github.com/mansoorKhan39' },
            { label: 'LinkedIn', value: 'mansoor-ali-khan-b27a42304', href: 'https://www.linkedin.com/in/mansoor-ali-khan-b27a42304' },
            { label: 'Location', value: 'Islamabad, Pakistan', href: null },
          ].map(({ label, value, href }) => (
            <div key={label}>
              <p className="text-xs font-mono text-brand-400 mb-0.5">{label}</p>
              {href ? (
                <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer"
                  className="text-sm hover:text-brand-400 transition-colors" style={{ color: 'var(--text-muted)' }}>{value}</a>
              ) : (
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{value}</p>
              )}
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-brand-500/10 border border-brand-500/20">
              <Award size={18} className="text-brand-400" />
            </div>
            <h2 className="font-display text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Profile Summary</h2>
          </div>
          <div className="card">
            <p className="font-body leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              Passionate Software Engineering student at COMSATS University Islamabad with hands-on experience building
              full-stack web applications using the MERN stack. Skilled in developing production-ready applications with
              clean architecture, secure authentication, and responsive UI. Actively exploring Machine Learning and Data
              Science with Python. Strong problem-solver with a focus on real-world, scalable solutions.
            </p>
          </div>
        </div>

        {/* Education */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-brand-500/10 border border-brand-500/20">
              <GraduationCap size={18} className="text-brand-400" />
            </div>
            <h2 className="font-display text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Education</h2>
          </div>
          {education.map(ed => (
            <div key={ed.degree} className={`card border-l-4 ${ed.border}`}>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                <h3 className="font-display font-bold text-lg" style={{ color: 'var(--text-primary)' }}>{ed.degree}</h3>
                <span className={`text-sm font-mono ${ed.color}`}>{ed.period}</span>
              </div>
              <p className={`font-semibold text-sm mb-1 ${ed.color}`}>{ed.institution}</p>
              <p className="text-sm font-mono" style={{ color: 'var(--text-dim)' }}>{ed.detail}</p>
            </div>
          ))}
        </div>

        {/* Skills */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-brand-500/10 border border-brand-500/20">
              <Code2 size={18} className="text-brand-400" />
            </div>
            <h2 className="font-display text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Technical Skills</h2>
          </div>
          <div className="card">
            <div className="grid md:grid-cols-2 gap-6">
              {skills.map(({ label, items, color }) => (
                <div key={label}>
                  <div className="flex items-center gap-2 mb-3">
                    <div className={`w-2 h-2 rounded-full ${color}`} />
                    <span className="font-display font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{label}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {items.map(item => (
                      <span key={item} className="text-xs px-2 py-1 rounded-md font-mono border border-[var(--border)]"
                        style={{ backgroundColor: 'var(--bg-sidebar)', color: 'var(--text-muted)' }}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Projects */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-brand-500/10 border border-brand-500/20">
              <Briefcase size={18} className="text-brand-400" />
            </div>
            <h2 className="font-display text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Projects</h2>
          </div>
          <div className="space-y-4">
            {projects.map(proj => (
              <div key={proj.name} className={`card border ${proj.color}`}>
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${proj.dot}`} />
                    <h3 className="font-display font-bold" style={{ color: 'var(--text-primary)' }}>{proj.name}</h3>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs font-mono" style={{ color: 'var(--text-dim)' }}>{proj.period}</span>
                    <a href={proj.github} target="_blank" rel="noreferrer"
                      className="text-xs hover:text-brand-400 transition-colors flex items-center gap-1" style={{ color: 'var(--text-dim)' }}>
                      GitHub <ExternalLink size={11} />
                    </a>
                    <a href={proj.live} target="_blank" rel="noreferrer"
                      className="text-xs text-brand-400 hover:text-brand-300 transition-colors flex items-center gap-1">
                      Live <ExternalLink size={11} />
                    </a>
                  </div>
                </div>
                <ul className="space-y-1.5 mb-4">
                  {proj.points.map((pt, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm font-body" style={{ color: 'var(--text-muted)' }}>
                      <span className="text-brand-400 mt-1 shrink-0">→</span> {pt}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-1.5">
                  {proj.tags.map(tag => (
                    <span key={tag} className="text-xs px-2 py-0.5 rounded font-mono border border-[var(--border)]"
                      style={{ backgroundColor: 'var(--bg-sidebar)', color: 'var(--text-dim)' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Languages */}
        <div className="card">
          <h3 className="font-display font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Languages</h3>
          <div className="flex gap-8">
            {[['Urdu', 'Native'], ['English', 'Professional']].map(([lang, level]) => (
              <div key={lang}>
                <p className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{lang}</p>
                <p className="text-xs font-mono text-brand-400">{level}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
