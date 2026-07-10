import SectionLabel from './SectionLabel'

export default function Contact({ email, socials }) {
  return (
    <section id="contact" className="border-t border-blueprint-line/10 bg-blueprint-bgDeep">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <SectionLabel tag="Fig. 05" title="Contact" />
        <p className="max-w-lg text-base leading-relaxed text-blueprint-slate">
          Have a project in mind, or an open role that fits? I'm easiest to reach by email.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href={`https://mail.google.com/mail/?view=cm&to=${email}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-sm border border-blueprint-accent bg-blueprint-accent/10 px-5 py-2.5 font-mono text-xs tracking-wide text-blueprint-accent transition-colors hover:bg-blueprint-accent hover:text-blueprint-bgDeep"
          >
            {email}
          </a>
          <a
            href={socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-sm border border-blueprint-line/30 px-5 py-2.5 font-mono text-xs uppercase tracking-wide text-blueprint-line transition-colors hover:border-blueprint-line"
          >
            GitHub
          </a>
          <a
            href={socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-sm border border-blueprint-line/30 px-5 py-2.5 font-mono text-xs uppercase tracking-wide text-blueprint-line transition-colors hover:border-blueprint-line"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  )
}
