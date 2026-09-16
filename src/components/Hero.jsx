import TitleBlock from './TitleBlock'

export default function Hero({ name, role, tagline, location, socials }) {
  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-blueprint-line/10 bg-grid-overlay"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-12 px-6 py-24 sm:py-32 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-blueprint-accent">
            Fig. 01 — Introduction
          </p>
          <h1 className="font-display text-4xl font-semibold leading-tight text-blueprint-line sm:text-5xl">
            {name}
          </h1>
          <p className="mt-2 font-mono text-lg text-blueprint-accent">{role}</p>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-blueprint-slate">
            {tagline}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="rounded-sm border border-blueprint-accent bg-blueprint-accent/10 px-5 py-2.5 font-mono text-xs uppercase tracking-wide text-blueprint-accent transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.02] hover:bg-blueprint-accent hover:text-blueprint-bgDeep hover:shadow-[0_0_16px_rgba(94,168,255,0.35)] active:scale-[0.98]"
            >
              View projects
            </a>
            <a
              href={socials.resume}
              className="rounded-sm border border-blueprint-line/30 px-5 py-2.5 font-mono text-xs uppercase tracking-wide text-blueprint-line transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.02] hover:border-blueprint-line hover:shadow-[0_0_14px_rgba(237,238,240,0.15)] active:scale-[0.98]"
            >
              Download résumé
            </a>
          </div>
        </div>

        <TitleBlock name={name} role={role} location={location} />
      </div>
    </section>
  )
}
