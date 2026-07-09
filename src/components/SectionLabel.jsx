export default function SectionLabel({ tag, title }) {
  return (
    <div className="mb-10 flex items-baseline gap-4">
      <span className="font-mono text-xs uppercase tracking-[0.2em] text-blueprint-accent">
        {tag}
      </span>
      <span className="h-px flex-1 bg-blueprint-line/20" aria-hidden="true" />
      <h2 className="font-display text-2xl font-medium text-blueprint-line sm:text-3xl">
        {title}
      </h2>
    </div>
  )
}
