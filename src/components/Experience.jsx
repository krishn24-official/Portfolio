import { useState, useEffect, useRef } from 'react'
import SectionLabel from './SectionLabel'

export default function Experience({ experience = [] }) {
  const [bulletsVisible, setBulletsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      setBulletsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setBulletsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  if (!experience || experience.length === 0) return null

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="reveal-on-scroll border-t border-blueprint-line/10 bg-blueprint-bgDeep"
    >
      <div className="mx-auto max-w-5xl px-6 py-20">
        <SectionLabel tag="Fig. 03" title="Experience" />
        <div className="space-y-8">
          {experience.map((exp, idx) => (
            <div
              key={idx}
              className="rounded-sm border border-blueprint-line/15 bg-blueprint-bg/60 p-6 sm:p-8 transition-all duration-200 hover:-translate-y-0.5 hover:border-blueprint-accent/50 hover:shadow-lg hover:shadow-black/25"
            >
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between mb-4">
                <div>
                  <h3 className="font-display text-lg font-semibold text-blueprint-line">
                    {exp.title}
                  </h3>
                  <p className="font-mono text-xs uppercase tracking-wider text-blueprint-accent">
                    {exp.company}
                  </p>
                </div>
                <span className="font-mono text-xs text-blueprint-slate shrink-0">
                  {exp.duration}
                </span>
              </div>
              <ul className="space-y-2.5">
                {exp.bullets.map((bullet, bIdx) => (
                  <li
                    key={bIdx}
                    style={{
                      transitionDelay: `${bIdx * 70}ms`,
                    }}
                    className={`flex items-start gap-3 text-sm text-blueprint-slate leading-relaxed transition-all duration-300 ${
                      bulletsVisible
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-2'
                    }`}
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blueprint-accent" />
                    <span>{bullet}</span>
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
