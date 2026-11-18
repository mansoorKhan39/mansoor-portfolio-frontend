import { useState } from 'react'
import { Mail, MapPin, Github, Linkedin, Send, CheckCircle, Briefcase, ArrowUpRight, Globe } from 'lucide-react'
import toast from 'react-hot-toast'
import api from '../api'
import Ambient3DBackground from '../components/Ambient3DBackground'
import TiltCard3D from '../components/TiltCard3D'
import { PERSONAL_PROFILE, OPEN_OPPORTUNITIES } from '../data/portfolioData'

const contactInfo = [
  { icon: Mail, label: 'Email', value: PERSONAL_PROFILE.email, href: `mailto:${PERSONAL_PROFILE.email}` },
  { icon: MapPin, label: 'Location', value: PERSONAL_PROFILE.location, href: null },
  { icon: Github, label: 'GitHub', value: 'github.com/mansoorKhan39', href: PERSONAL_PROFILE.github },
  { icon: Linkedin, label: 'LinkedIn', value: 'linkedin.com/in/mansoor-ali-khan-b27a42304', href: PERSONAL_PROFILE.linkedin },
  { icon: Globe, label: 'Previous Portfolio', value: 'mansoor-portfolio-frontend-w3ek.vercel.app', href: PERSONAL_PROFILE.existingPortfolio },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill in all required fields.')
      return
    }
    setLoading(true)
    try {
      await api.post('/api/messages', form)
      setSent(true)
      toast.success("Message sent! I'll get back to you soon.")
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch {
      toast.error('Failed to send message. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative pt-28 pb-24 overflow-hidden">
      <Ambient3DBackground className="fixed inset-0 w-full h-full z-0" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="mb-14 text-center">
          <p className="font-mono text-xs uppercase tracking-widest mb-3" style={{ color: 'var(--text-dim)' }}>
            Get In Touch
          </p>
          <h1 className="section-heading mb-4">
            Let&apos;s <span className="chrome-text">Connect</span>
          </h1>
          <p className="font-body max-w-xl mx-auto" style={{ color: 'var(--text-muted)' }}>
            Reach out regarding junior engineering roles, internships, backend/AI projects, or technical collaborations.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-10 items-start">
          {/* Contact info + Opportunities */}
          <div className="md:col-span-2 space-y-6">
            <div className="card space-y-5">
              <div>
                <h2 className="font-display font-bold text-xl mb-2" style={{ color: 'var(--text-primary)' }}>
                  Contact Information
                </h2>
                <p className="text-sm font-body leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  {PERSONAL_PROFILE.degree} ({PERSONAL_PROFILE.semester}) at {PERSONAL_PROFILE.university}.
                </p>
              </div>

              <div className="space-y-4">
                {contactInfo.map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-center gap-3.5">
                    <div className="p-2.5 rounded-xl border border-[var(--border)] shrink-0" style={{ backgroundColor: 'var(--bg-sidebar)' }}>
                      <Icon size={17} style={{ color: 'var(--chrome-highlight)' }} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-mono" style={{ color: 'var(--text-dim)' }}>
                        {label}
                      </p>
                      {href ? (
                        <a
                          href={href}
                          target={href.startsWith('http') ? '_blank' : undefined}
                          rel="noreferrer"
                          className="text-sm hover:opacity-80 transition-opacity truncate inline-flex items-center gap-1 max-w-full"
                          style={{ color: 'var(--text-primary)' }}
                        >
                          <span className="truncate">{value}</span>
                          {href.startsWith('http') && <ArrowUpRight size={12} className="shrink-0" />}
                        </a>
                      ) : (
                        <p className="text-sm truncate" style={{ color: 'var(--text-primary)' }}>
                          {value}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card border-[var(--border-strong)]">
              <div className="flex items-center gap-2.5 mb-3">
                <Briefcase size={16} style={{ color: 'var(--chrome-highlight)' }} />
                <span className="font-display font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
                  Open Opportunities
                </span>
              </div>
              <ul className="space-y-1.5 text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
                {OPEN_OPPORTUNITIES.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span style={{ color: 'var(--text-dim)' }}>·</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-3">
            <TiltCard3D maxTilt={3}>
              {sent ? (
                <div className="card flex flex-col items-center justify-center py-16 text-center">
                  <CheckCircle size={52} className="mb-4" style={{ color: 'var(--chrome-highlight)' }} />
                  <h3 className="font-display text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                    Message Sent!
                  </h3>
                  <p className="font-body mb-6 max-w-sm" style={{ color: 'var(--text-muted)' }}>
                    Thanks for reaching out. Your message has been saved and I&apos;ll respond soon.
                  </p>
                  <button onClick={() => setSent(false)} className="btn-outline text-sm">
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="card space-y-5">
                  <h2 className="font-display font-bold text-xl mb-1" style={{ color: 'var(--text-primary)' }}>
                    Send a Message
                  </h2>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono mb-2" style={{ color: 'var(--text-muted)' }}>
                        Name <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className="input-field"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono mb-2" style={{ color: 'var(--text-muted)' }}>
                        Email <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className="input-field"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono mb-2" style={{ color: 'var(--text-muted)' }}>
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      placeholder="Role, internship, or collaboration topic"
                      className="input-field"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono mb-2" style={{ color: 'var(--text-muted)' }}>
                      Message <span className="text-rose-400">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Share details about the role, project, or collaboration..."
                      rows={6}
                      className="input-field resize-none"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={17} /> Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </TiltCard3D>
          </div>
        </div>
      </div>
    </div>
  )
}
