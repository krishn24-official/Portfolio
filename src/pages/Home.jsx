import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Hero from '../components/Hero'
import About from '../components/About'
import Experience from '../components/Experience'
import Education from '../components/Education'
import Skills from '../components/Skills'
import Projects from '../components/Projects'
import Contact from '../components/Contact'

export default function Home({ data }) {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      // Small timeout to ensure DOM has rendered
      const timeout = setTimeout(() => {
        const element = document.querySelector(location.hash)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 80)
      return () => clearTimeout(timeout)
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [location.hash, location.pathname])

  // Global section reveal observer (animates once only)
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
        el.classList.add('is-visible')
      })
      return
    }

    const sections = document.querySelectorAll('.reveal-on-scroll')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px',
      }
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const openChat = () => {
    window.dispatchEvent(new CustomEvent('open-portfolio-chat'))
  }

  return (
    <main id="top">
      <Hero
        name={data.name}
        role={data.role}
        tagline={data.tagline}
        location={data.location}
        socials={data.socials}
      />

      {/* Chatbot Intro Callout */}
      <div className="border-b border-blueprint-line/10 bg-blueprint-bgDeep/40">
        <div className="mx-auto max-w-5xl px-6 py-4">
          <button
            type="button"
            onClick={openChat}
            className="group flex w-full items-center justify-between rounded-sm border border-blueprint-accent/30 bg-blueprint-accent/5 px-4 py-3 font-mono text-xs text-blueprint-slate transition-all duration-200 hover:border-blueprint-accent/70 hover:bg-blueprint-accent/10 hover:text-blueprint-line hover:shadow-[0_0_16px_rgba(94,168,255,0.15)] cursor-pointer"
          >
            <span className="flex items-center gap-2.5">
              <span className="inline-block text-sm animate-icon-breathe">💬</span>
              <span className="animate-soft-pulse">
                Ask my AI assistant about my projects, experience, skills, or resume.
              </span>
            </span>
            <span className="font-mono text-blueprint-accent transition-transform duration-200 group-hover:translate-x-1">
              Ask AI &rarr;
            </span>
          </button>
        </div>
      </div>

      <About about={data.about} />
      <Experience experience={data.experience} />
      <Education education={data.education} />
      <Skills skills={data.skills} />
      <Projects projects={data.projects} />
      <Contact email={data.email} socials={data.socials} />
    </main>
  )
}
