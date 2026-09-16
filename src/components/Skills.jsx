import SectionLabel from './SectionLabel'
import SkillBadge from './SkillBadge'

export default function Skills({ skills }) {
  return (
    <section id="stack" className="reveal-on-scroll border-t border-blueprint-line/10 bg-blueprint-bgDeep">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <SectionLabel tag="Fig. 05" title="Stack" />
        <div className="grid gap-8 sm:grid-cols-3">
          {skills.map((group) => (
            <div key={group.category}>
              <p className="mb-3 font-mono text-xs uppercase tracking-wide text-blueprint-slate">
                {group.category}
              </p>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <SkillBadge key={item} skill={item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
