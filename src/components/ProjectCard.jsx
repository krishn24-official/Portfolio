import { useState, useEffect } from 'react'

export default function ProjectCard({ project, index }) {
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const num = String(index + 1).padStart(2, '0')
  const images = project.images || []

  // Close lightbox on Escape and navigate with Arrow keys
  useEffect(() => {
    if (lightboxIndex === null) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setLightboxIndex(null)
      } else if (e.key === 'ArrowLeft' && images.length > 1) {
        setLightboxIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))
      } else if (e.key === 'ArrowRight' && images.length > 1) {
        setLightboxIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxIndex, images.length])

  return (
    <>
      <article className="group border border-blueprint-line/15 p-6 transition-colors hover:border-blueprint-accent/50">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-xs text-blueprint-slate">{num}</p>
            <h3 className="font-display text-xl font-medium text-blueprint-line">
              {project.title}
            </h3>
          </div>
          <div className="flex shrink-0 gap-3 font-mono text-xs uppercase tracking-wide">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                className="text-blueprint-accent hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Live
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                className="text-blueprint-slate hover:text-blueprint-line hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Code
              </a>
            )}
          </div>
        </div>

        <p className="text-sm leading-relaxed text-blueprint-slate">{project.summary}</p>

        {/* Thumbnail Strip (only rendered if project has images) */}
        {images.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {images.slice(0, 3).map((img, idx) => (
              <button
                key={img.src || idx}
                type="button"
                onClick={() => setLightboxIndex(idx)}
                aria-label={`View screenshot ${idx + 1} of ${project.title}`}
                className="group/thumb relative h-16 w-24 sm:h-20 sm:w-28 overflow-hidden rounded border border-blueprint-line/15 bg-blueprint-bgDeep transition-all hover:border-blueprint-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blueprint-accent"
              >
                <img
                  src={img.src}
                  alt={img.alt || `${project.title} screenshot ${idx + 1}`}
                  className="h-full w-full object-cover transition-transform duration-200 group-hover/thumb:scale-105"
                  loading="lazy"
                />
                {idx === 2 && images.length > 3 && (
                  <div className="absolute inset-0 flex items-center justify-center bg-blueprint-bgDeep/80 font-mono text-xs font-semibold text-blueprint-accent">
                    +{images.length - 3}
                  </div>
                )}
              </button>
            ))}
          </div>
        )}

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

      {/* Lightbox Modal */}
      {lightboxIndex !== null && images[lightboxIndex] && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} screenshot preview`}
          onClick={() => setLightboxIndex(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-blueprint-bgDeep/90 backdrop-blur-sm p-4 sm:p-6"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={() => setLightboxIndex(null)}
            aria-label="Close screenshot preview"
            className="absolute top-4 right-4 sm:top-6 sm:right-6 rounded-full bg-blueprint-bg border border-blueprint-line/20 p-2 text-blueprint-slate hover:text-blueprint-line hover:border-blueprint-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blueprint-accent"
          >
            <svg
              className="h-5 w-5 stroke-current"
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Prev button */}
          {images.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setLightboxIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))
              }}
              aria-label="Previous image"
              className="absolute left-2 sm:left-6 rounded-full bg-blueprint-bg border border-blueprint-line/20 p-2 sm:p-2.5 text-blueprint-slate hover:text-blueprint-line hover:border-blueprint-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blueprint-accent"
            >
              <svg
                className="h-5 w-5 stroke-current"
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
          )}

          {/* Next button */}
          {images.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setLightboxIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))
              }}
              aria-label="Next image"
              className="absolute right-2 sm:right-6 rounded-full bg-blueprint-bg border border-blueprint-line/20 p-2 sm:p-2.5 text-blueprint-slate hover:text-blueprint-line hover:border-blueprint-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blueprint-accent"
            >
              <svg
                className="h-5 w-5 stroke-current"
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          )}

          {/* Modal Content Box */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex max-h-[90vh] max-w-[90vw] flex-col items-center overflow-hidden rounded-lg border border-blueprint-line/20 bg-blueprint-bg shadow-2xl"
          >
            <div className="overflow-hidden bg-blueprint-bgDeep">
              <img
                src={images[lightboxIndex].src}
                alt={images[lightboxIndex].alt || `${project.title} screenshot ${lightboxIndex + 1}`}
                className="max-h-[75vh] w-auto max-w-[85vw] object-contain"
              />
            </div>
            <div className="flex w-full items-center justify-between border-t border-blueprint-line/10 px-4 py-2.5 bg-blueprint-bg">
              <span className="font-mono text-xs text-blueprint-line truncate mr-4">
                {images[lightboxIndex].alt || `${project.title} (${lightboxIndex + 1})`}
              </span>
              {images.length > 1 && (
                <span className="font-mono text-xs text-blueprint-slate shrink-0">
                  {lightboxIndex + 1} / {images.length}
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
