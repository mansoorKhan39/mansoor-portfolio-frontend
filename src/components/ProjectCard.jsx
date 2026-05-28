import { Github, ExternalLink, Star } from 'lucide-react'

export default function ProjectCard({ project, delay = 0 }) {
  const { title, description, techStack, githubUrl, liveUrl, imageUrl, featured } = project

  return (
    <div
      className="card group hover:border-brand-500/30 hover:-translate-y-1 transition-all duration-300 flex flex-col hover:shadow-xl hover:shadow-brand-500/5"
      style={{ transitionDelay: `${delay}ms` }}
    >
      {imageUrl ? (
        <div className="relative w-full h-44 rounded-xl overflow-hidden mb-4 bg-slate-800">
          <img src={imageUrl} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          {featured && (
            <div className="absolute top-3 right-3 flex items-center gap-1 bg-brand-500/90 text-slate-950 text-xs font-semibold px-2 py-1 rounded-full">
              <Star size={11} fill="currentColor" /> Featured
            </div>
          )}
        </div>
      ) : (
        <div className="relative w-full h-44 rounded-xl mb-4 bg-gradient-to-br from-slate-800 to-[#0a0f1a] flex items-center justify-center border border-slate-700/50">
          <span className="font-display font-bold text-4xl text-slate-700">{title.charAt(0)}</span>
          {featured && (
            <div className="absolute top-3 right-3 flex items-center gap-1 bg-brand-500/90 text-slate-950 text-xs font-semibold px-2 py-1 rounded-full">
              <Star size={11} fill="currentColor" /> Featured
            </div>
          )}
        </div>
      )}

      <div className="flex-1 flex flex-col">
        <h3 className="font-display font-semibold text-white text-lg mb-2 group-hover:text-brand-400 transition-colors">{title}</h3>
        <p className="text-slate-400 text-sm font-body leading-relaxed mb-4 flex-1 line-clamp-3">{description}</p>

        {techStack?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {techStack.map(tech => (
              <span key={tech} className="text-xs px-2 py-0.5 bg-slate-800 text-slate-400 rounded font-mono border border-slate-700/50">
                {tech}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center gap-3 pt-2 border-t border-slate-800">
          {githubUrl && (
            <a href={githubUrl} target="_blank" rel="noreferrer"
              className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors text-sm">
              <Github size={15} /> Code
            </a>
          )}
          {liveUrl && (
            <a href={liveUrl} target="_blank" rel="noreferrer"
              className="flex items-center gap-1.5 text-brand-400 hover:text-brand-300 transition-colors text-sm ml-auto">
              Live Demo <ExternalLink size={15} />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
