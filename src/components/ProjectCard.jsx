import { Link } from 'react-router-dom'
import SkillBadge from './SkillBadge'

export default function ProjectCard({ project, index }) {
  const num = String(index + 1).padStart(2, '0')
  const images = project.images || []
  const hasImages = images.length > 0

  return (
    <Link
      to={`/projects/${project.id}`}
      className="group flex flex-col justify-between rounded-sm border border-blueprint-line/15 bg-blueprint-bgDeep/30 p-5 transition-all duration-200 hover:-translate-y-1 hover:border-blueprint-accent/50 hover:bg-blueprint-bgDeep/60 hover:shadow-xl hover:shadow-black/25"
    >
      <div>
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-blueprint-slate">{num}</span>
            {project.featured && (
              <span className="rounded border border-blueprint-amber/40 bg-blueprint-amber/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-blueprint-amber">
                Featured
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="rounded border border-blueprint-accent/40 bg-blueprint-accent/10 px-2 py-0.5 text-blueprint-accent transition-all duration-200 hover:scale-105 hover:bg-blueprint-accent hover:text-blueprint-bgDeep hover:shadow-[0_0_8px_rgba(94,168,255,0.3)]"
              >
                Live
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="rounded border border-blueprint-line/20 bg-blueprint-line/5 px-2 py-0.5 text-blueprint-slate transition-all duration-200 hover:scale-105 hover:border-blueprint-line hover:text-blueprint-line"
              >
                Code
              </a>
            )}
          </div>
        </div>

        {hasImages ? (
          <div className="mb-4 aspect-[16/10] w-full overflow-hidden rounded border border-blueprint-line/15 bg-blueprint-bg p-1.5 transition-colors duration-200 group-hover:border-blueprint-accent/40">
            <div className="h-full w-full overflow-hidden rounded bg-blueprint-bgDeep">
              <img
                src={images[0].src}
                alt={images[0].alt || project.title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                loading="lazy"
              />
            </div>
          </div>
        ) : (
          <div
            style={{
              backgroundImage:
                'repeating-linear-gradient(45deg, rgba(237,238,240,0.05) 0, rgba(237,238,240,0.05) 1px, transparent 1px, transparent 8px)',
            }}
            className="mb-4 flex h-28 w-full items-center justify-center rounded border border-blueprint-line/10 bg-blueprint-bgDeep transition-colors duration-200 group-hover:border-blueprint-accent/30"
          >
            <span className="font-mono text-[10px] uppercase tracking-widest text-blueprint-slate/30">
              // {project.id}
            </span>
          </div>
        )}

        <h3 className="font-display text-lg font-medium text-blueprint-line transition-colors duration-200 group-hover:text-blueprint-accent mb-2">
          {project.title}
        </h3>

        <p className="line-clamp-2 text-sm leading-relaxed text-blueprint-slate mb-4">
          {project.summary}
        </p>
      </div>

      <div className="mt-2 flex items-center justify-between border-t border-blueprint-line/10 pt-3">
        <div className="flex flex-wrap items-center gap-1.5">
          {project.stack.slice(0, 4).map((tech) => (
            <SkillBadge key={tech} skill={tech} iconOnly={true} />
          ))}
          {project.stack.length > 4 && (
            <span className="font-mono text-[11px] text-blueprint-slate">
              +{project.stack.length - 4}
            </span>
          )}
        </div>

        <span className="font-mono text-xs text-blueprint-accent transition-transform duration-200 group-hover:translate-x-1">
          &rarr;
        </span>
      </div>
    </Link>
  )
}
