import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import SkillBadge from '../components/SkillBadge'
import Lightbox from '../components/Lightbox'

export default function ProjectDetail({ data }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const projects = data?.projects || []
  const projectIndex = projects.findIndex((p) => p.id === id)
  const project = projects[projectIndex]

  // Scroll to top on id change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  if (!project) {
    return (
      <main className="mx-auto flex min-h-[70vh] max-w-5xl flex-col items-center justify-center px-6 py-20 text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-blueprint-amber mb-2">
          404 // Not Found
        </p>
        <h1 className="font-display text-2xl font-medium text-blueprint-line mb-4">
          Project not found
        </h1>
        <p className="font-body text-sm text-blueprint-slate mb-6">
          The project you are looking for does not exist or has been moved.
        </p>
        <Link
          to="/"
          className="rounded border border-blueprint-accent bg-blueprint-accent/10 px-5 py-2 font-mono text-xs text-blueprint-accent transition-colors hover:bg-blueprint-accent hover:text-blueprint-bgDeep"
        >
          &larr; Back to Home
        </Link>
      </main>
    )
  }

  const num = String(projectIndex + 1).padStart(2, '0')
  const images = project.images || []
  const prevProject = projectIndex > 0 ? projects[projectIndex - 1] : null
  const nextProject = projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      {/* Back link */}
      <div className="mb-8">
        <Link
          to="/#projects"
          className="inline-flex items-center gap-2 font-mono text-xs text-blueprint-accent transition-colors hover:underline"
        >
          <span>&larr;</span>
          <span>Back to projects</span>
        </Link>
      </div>

      {/* Header */}
      <header className="mb-10">
        <p className="font-mono text-xs uppercase tracking-widest text-blueprint-slate mb-2">
          Project {num} / {String(projects.length).padStart(2, '0')}
        </p>
        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-blueprint-line tracking-tight mb-4">
          {project.title}
        </h1>
        <p className="max-w-3xl text-base sm:text-lg leading-relaxed text-blueprint-slate">
          {project.summary}
        </p>

        {/* Live & Code action buttons */}
        <div className="mt-6 flex flex-wrap gap-3 font-mono text-xs">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-sm border border-blueprint-accent bg-blueprint-accent/15 px-5 py-2.5 font-medium tracking-wide text-blueprint-accent transition-colors hover:bg-blueprint-accent hover:text-blueprint-bgDeep"
            >
              View Live Demo &rarr;
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-sm border border-blueprint-line/30 bg-blueprint-line/5 px-5 py-2.5 uppercase tracking-wide text-blueprint-line transition-colors hover:border-blueprint-line hover:bg-blueprint-line/10"
            >
              GitHub Repository &rarr;
            </a>
          )}
        </div>
      </header>

      {/* Matted Screenshots Gallery (if project has images) */}
      {images.length > 0 && (
        <section aria-label="Project Screenshots" className="mb-12">
          <h2 className="font-mono text-xs uppercase tracking-widest text-blueprint-slate mb-4">
            Screenshots ({images.length})
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {images.map((img, idx) => (
              <button
                key={img.src || idx}
                type="button"
                onClick={() => setLightboxIndex(idx)}
                className="group flex flex-col overflow-hidden rounded-lg border border-blueprint-line/15 bg-blueprint-bg p-3 sm:p-4 text-left shadow-lg shadow-black/20 transition-all hover:border-blueprint-accent/60 hover:shadow-black/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blueprint-accent"
              >
                <div className="relative aspect-video w-full overflow-hidden rounded bg-blueprint-bgDeep border border-blueprint-line/10">
                  <img
                    src={img.src}
                    alt={img.alt || `${project.title} screenshot ${idx + 1}`}
                    className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                {img.alt && (
                  <p className="mt-2.5 font-mono text-[11px] text-blueprint-slate truncate">
                    {img.alt}
                  </p>
                )}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Technical Deep Dive Sections */}
      <section className="mb-12 grid gap-6 sm:grid-cols-3 border-y border-blueprint-line/10 py-10">
        <div>
          <h2 className="font-mono text-xs uppercase tracking-wider text-blueprint-accent mb-2">
            The Problem
          </h2>
          <p className="text-sm leading-relaxed text-blueprint-slate">
            {project.problem}
          </p>
        </div>

        <div>
          <h2 className="font-mono text-xs uppercase tracking-wider text-blueprint-accent mb-2">
            Key Decisions
          </h2>
          <p className="text-sm leading-relaxed text-blueprint-slate">
            {project.decisions}
          </p>
        </div>

        <div>
          <h2 className="font-mono text-xs uppercase tracking-wider text-blueprint-accent mb-2">
            What I Learned & Change
          </h2>
          <p className="text-sm leading-relaxed text-blueprint-slate">
            {project.learned}
          </p>
        </div>
      </section>

      {/* Full Tech Stack */}
      <section className="mb-14">
        <h2 className="font-mono text-xs uppercase tracking-widest text-blueprint-slate mb-4">
          Technologies & Architecture
        </h2>
        <div className="flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <SkillBadge key={tech} skill={tech} />
          ))}
        </div>
      </section>

      {/* Previous / Next Project Navigation */}
      <nav className="flex items-center justify-between border-t border-blueprint-line/10 pt-8 font-mono text-xs">
        {prevProject ? (
          <Link
            to={`/projects/${prevProject.id}`}
            className="group flex flex-col items-start text-blueprint-slate transition-colors hover:text-blueprint-line"
          >
            <span className="text-[11px] text-blueprint-slate/60 mb-0.5">&larr; Previous Project</span>
            <span className="font-medium text-blueprint-line group-hover:text-blueprint-accent">
              {prevProject.title}
            </span>
          </Link>
        ) : (
          <div />
        )}

        {nextProject && (
          <Link
            to={`/projects/${nextProject.id}`}
            className="group flex flex-col items-end text-blueprint-slate transition-colors hover:text-blueprint-line text-right"
          >
            <span className="text-[11px] text-blueprint-slate/60 mb-0.5">Next Project &rarr;</span>
            <span className="font-medium text-blueprint-line group-hover:text-blueprint-accent">
              {nextProject.title}
            </span>
          </Link>
        )}
      </nav>

      {/* Lightbox Modal */}
      <Lightbox
        images={images}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onSelectIndex={(idx) => setLightboxIndex(idx)}
        title={project.title}
      />
    </main>
  )
}
