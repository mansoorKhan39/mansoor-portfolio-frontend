import { useState } from 'react'
import { Mail, MapPin, Github, Linkedin, Send, CheckCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import api from '../api'

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'mansooralikhan1029@gmail.com', href: 'mailto:mansooralikhan1029@gmail.com' },
  { icon: MapPin, label: 'Location', value: 'Pakistan', href: null },
  { icon: Github, label: 'GitHub', value: 'github.com/mansoorKhan39', href: 'https://github.com/mansoorKhan39' },
  { icon: Linkedin, label: 'LinkedIn', value: 'https://www.linkedin.com/in/mansoor-ali-khan-b27a42304', href: 'https://www.linkedin.com/in/mansoor-ali-khan-b27a42304' },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill in all required fields.')
      return
    }
    setLoading(true)
    try {
      await api.post('/api/messages', form)
      setSent(true)
      toast.success('Message sent! I\'ll get back to you soon.')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch {
      toast.error('Failed to send message. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16 text-center">
          <p className="text-brand-400 font-mono text-sm mb-3">// get in touch</p>
          <h1 className="section-heading mb-4">Let's Talk</h1>
          <p className="text-slate-400 font-body max-w-xl mx-auto">
            Have a project, opportunity, or just want to say hello? My inbox is always open.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-12">
          {/* Contact info */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <h2 className="font-display font-semibold text-white text-xl mb-2">Contact Information</h2>
              <p className="text-slate-400 text-sm font-body leading-relaxed">
                I'm currently open to freelance projects, full-time roles, and interesting collaborations.
              </p>
            </div>

            <div className="space-y-4">
              {contactInfo.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-center gap-4">
                  <div className="p-2.5 rounded-lg bg-brand-500/10 border border-brand-500/20">
                    <Icon size={18} className="text-brand-400" />
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs font-mono">{label}</p>
                    {href ? (
                      <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer"
                        className="text-slate-300 text-sm hover:text-brand-400 transition-colors">
                        {value}
                      </a>
                    ) : (
                      <p className="text-slate-300 text-sm">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 bg-gradient-to-br from-brand-500/10 to-purple-500/10 rounded-2xl border border-brand-500/20">
              <p className="text-brand-400 font-mono text-xs mb-2">// status</p>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-400 animate-pulse" />
                <span className="text-white font-semibold text-sm">Available for hire</span>
              </div>
              <p className="text-slate-400 text-xs mt-2 font-body">Open to remote & on-site roles in Pakistan and internationally.</p>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-3">
            {sent ? (
              <div className="card flex flex-col items-center justify-center py-16 text-center">
                <CheckCircle size={56} className="text-brand-400 mb-4" />
                <h3 className="font-display text-2xl font-bold text-white mb-2">Message Sent!</h3>
                <p className="text-slate-400 font-body mb-6">Thanks for reaching out. I'll get back to you within 24 hours.</p>
                <button onClick={() => setSent(false)} className="btn-outline text-sm">Send Another Message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="card space-y-5">
                <h2 className="font-display font-semibold text-white text-xl mb-2">Send a Message</h2>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 text-xs font-mono mb-2">Name <span className="text-rose-400">*</span></label>
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
                    <label className="block text-slate-400 text-xs font-mono mb-2">Email <span className="text-rose-400">*</span></label>
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
                  <label className="block text-slate-400 text-xs font-mono mb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="What's this about?"
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 text-xs font-mono mb-2">Message <span className="text-rose-400">*</span></label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project or opportunity..."
                    rows={6}
                    className="input-field resize-none"
                    required
                  />
                </div>

                <button type="submit" disabled={loading} className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed">
                  {loading ? (
                    <><span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" /> Sending...</>
                  ) : (
                    <><Send size={18} /> Send Message</>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
