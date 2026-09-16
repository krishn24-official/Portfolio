import SectionLabel from './SectionLabel'

export default function Education({ education = [] }) {
  if (!education || education.length === 0) return null

  return (
    <section id="education" className="reveal-on-scroll border-t border-blueprint-line/10 bg-blueprint-bg">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <SectionLabel tag="Fig. 04" title="Education" />
        <div className="space-y-6">
          {education.map((edu, idx) => (
            <div
              key={idx}
              className="rounded-sm border border-blueprint-line/15 bg-blueprint-bgDeep/50 p-6 sm:p-8 transition-all duration-200 hover:-translate-y-0.5 hover:border-blueprint-accent/50 hover:shadow-lg hover:shadow-black/25"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                <div>
                  <h3 className="font-display text-lg font-semibold text-blueprint-line">
                    {edu.degree}
                  </h3>
                  <p className="font-mono text-xs uppercase tracking-wider text-blueprint-accent">
                    {edu.institution}
                  </p>
                </div>
                <div className="flex items-center gap-3 font-mono text-xs">
                  <span className="rounded border border-blueprint-accent/30 bg-blueprint-accent/10 px-2.5 py-0.5 text-blueprint-accent transition-all duration-200 hover:border-blueprint-accent hover:bg-blueprint-accent/20 hover:shadow-[0_0_10px_rgba(94,168,255,0.25)]">
                    {edu.detail}
                  </span>
                  <span className="text-blueprint-slate">
                    {edu.duration}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
