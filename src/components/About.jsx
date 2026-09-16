import SectionLabel from './SectionLabel'

export default function About({ about }) {
  return (
    <section id="about" className="reveal-on-scroll mx-auto max-w-5xl px-6 py-20">
      <SectionLabel tag="Fig. 02" title="About" />
      <p className="max-w-2xl whitespace-pre-line text-base leading-[1.85] text-blueprint-slate">
        {about}
      </p>
    </section>
  )
}
