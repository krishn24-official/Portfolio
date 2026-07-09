export default function ProjectCard({ project, index }) {
  const num = String(index + 1).padStart(2, '0')

  return (
    <article className="group border border-blueprint-line/15 p-6 transition-colors hover:border-blueprint-accent/50">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs text-blueprint-slate">{num}</p>
          <h3 className="font-display text-xl font-medium text-blueprint-line">
            {project.title}
          </h3>
        </div>
        <div className="flex shrink-0 gap-3 font-mono text-xs uppercase tracking-wide">
          <a
            href={project.liveUrl}
            className="text-blueprint-accent hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Live
          </a>
          <a
            href={project.repoUrl}
            className="text-blueprint-slate hover:text-blueprint-line hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Code
          </a>
        </div>
      </div>

      <p className="text-sm leading-relaxed text-blueprint-slate">{project.summary}</p>

      <dl className="mt-5 space-y-3 border-t border-blueprint-line/10 pt-5 text-sm">
        <div>
          <dt className="font-mono text-xs uppercase tracking-wide text-blueprint-accent">
            Problem
          </dt>
          <dd className="mt-1 text-blueprint-slate">{project.problem}</dd>
        </div>
        <div>
          <dt className="font-mono text-xs uppercase tracking-wide text-blueprint-accent">
            Key decisions
          </dt>
          <dd className="mt-1 text-blueprint-slate">{project.decisions}</dd>
        </div>
        <div>
          <dt className="font-mono text-xs uppercase tracking-wide text-blueprint-accent">
            What I'd change
          </dt>
          <dd className="mt-1 text-blueprint-slate">{project.learned}</dd>
        </div>
      </dl>

      <ul className="mt-5 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <li
            key={tech}
            className="rounded-sm bg-blueprint-line/5 px-2 py-1 font-mono text-[11px] text-blueprint-slate"
          >
            {tech}
          </li>
        ))}
      </ul>
    </article>
  )
}
