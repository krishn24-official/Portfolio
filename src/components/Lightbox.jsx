import { useEffect } from 'react'

export default function Lightbox({
  images = [],
  currentIndex = 0,
  onClose,
  onSelectIndex,
  title = '',
}) {
  useEffect(() => {
    if (currentIndex === null) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose?.()
      } else if (e.key === 'ArrowLeft' && images.length > 1) {
        onSelectIndex?.(currentIndex > 0 ? currentIndex - 1 : images.length - 1)
      } else if (e.key === 'ArrowRight' && images.length > 1) {
        onSelectIndex?.(currentIndex < images.length - 1 ? currentIndex + 1 : 0)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentIndex, images.length, onClose, onSelectIndex])

  if (currentIndex === null || !images[currentIndex]) return null

  const currentImage = images[currentIndex]

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title ? `${title} screenshot preview` : 'Screenshot preview'}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-blueprint-bgDeep/90 backdrop-blur-sm p-4 sm:p-6"
    >
      {/* Close button */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close image preview"
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
            onSelectIndex?.(currentIndex > 0 ? currentIndex - 1 : images.length - 1)
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
            onSelectIndex?.(currentIndex < images.length - 1 ? currentIndex + 1 : 0)
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

      {/* Matted Full-size Image Box */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-[90vh] max-w-[90vw] flex-col items-center overflow-hidden rounded-lg border border-blueprint-line/15 bg-blueprint-bg p-3 sm:p-4 shadow-2xl shadow-black/40"
      >
        <div className="overflow-hidden rounded border border-blueprint-line/10 bg-blueprint-bgDeep p-2 sm:p-3">
          <img
            src={currentImage.src}
            alt={currentImage.alt || (title ? `${title} screenshot ${currentIndex + 1}` : 'Screenshot')}
            className="max-h-[72vh] w-auto max-w-[85vw] object-contain rounded"
          />
        </div>
        <div className="flex w-full items-center justify-between pt-3 px-1 font-mono text-xs">
          <span className="text-blueprint-line truncate mr-4">
            {currentImage.alt || (title ? `${title} (${currentIndex + 1})` : `Screenshot ${currentIndex + 1}`)}
          </span>
          {images.length > 1 && (
            <span className="text-blueprint-slate shrink-0">
              {currentIndex + 1} / {images.length}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
