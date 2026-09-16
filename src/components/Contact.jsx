import { useState } from 'react'
import SectionLabel from './SectionLabel'

export default function Contact({ email, socials }) {
  const [copied, setCopied] = useState(false)

  const handleCopyEmail = (e) => {
    e.preventDefault()
    if (navigator.clipboard && email) {
      navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <section id="contact" className="reveal-on-scroll border-t border-blueprint-line/10 bg-blueprint-bgDeep">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <SectionLabel tag="Fig. 07" title="Contact" />
        <p className="max-w-lg text-base leading-relaxed text-blueprint-slate">
          Have a project in mind, or an open role that fits? I'm easiest to reach by email.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <button
            type="button"
            onClick={handleCopyEmail}
            title="Click to copy email address"
            className="rounded-sm border border-blueprint-accent bg-blueprint-accent/10 px-5 py-2.5 font-mono text-xs tracking-wide text-blueprint-accent transition-all duration-200 hover:-translate-y-0.5 hover:bg-blueprint-accent hover:text-blueprint-bgDeep hover:shadow-[0_0_16px_rgba(94,168,255,0.35)] active:scale-[0.98] cursor-pointer"
          >
            {copied ? 'Copied ✓' : email}
          </button>
          <a
            href={socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-sm border border-blueprint-line/30 px-5 py-2.5 font-mono text-xs uppercase tracking-wide text-blueprint-line transition-all duration-200 hover:-translate-y-0.5 hover:border-blueprint-line hover:shadow-[0_0_14px_rgba(237,238,240,0.15)] active:scale-[0.98]"
          >
            GitHub
          </a>
          <a
            href={socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-sm border border-blueprint-line/30 px-5 py-2.5 font-mono text-xs uppercase tracking-wide text-blueprint-line transition-all duration-200 hover:-translate-y-0.5 hover:border-blueprint-line hover:shadow-[0_0_14px_rgba(237,238,240,0.15)] active:scale-[0.98]"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  )
}
