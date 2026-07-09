import SectionLabel from './SectionLabel'

export default function Skills({ skills }) {
  return (
    <section id="stack" className="border-t border-blueprint-line/10 bg-blueprint-bgDeep">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <SectionLabel tag="Fig. 03" title="Stack" />
        <div className="grid gap-8 sm:grid-cols-3">
          {skills.map((group) => (
            <div key={group.category}>
              <p className="mb-3 font-mono text-xs uppercase tracking-wide text-blueprint-slate">
                {group.category}
              </p>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-sm border border-blueprint-line/20 px-2.5 py-1 font-mono text-xs text-blueprint-line"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
