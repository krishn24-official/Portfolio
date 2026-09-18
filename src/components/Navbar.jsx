import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const links = [
  { label: 'About', hash: '#about', id: 'about' },
  { label: 'Experience', hash: '#experience', id: 'experience' },
  { label: 'Education', hash: '#education', id: 'education' },
  { label: 'Stack', hash: '#stack', id: 'stack' },
  { label: 'Projects', hash: '#projects', id: 'projects' },
  { label: 'Contact', hash: '#contact', id: 'contact' },
]

export default function Navbar({ name }) {
  const location = useLocation()
  const navigate = useNavigate()
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    if (location.pathname !== '/') {
      setActiveSection('')
      return
    }

    const sectionElements = links
      .map((l) => document.getElementById(l.id))
      .filter(Boolean)

    if (sectionElements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0.1,
      }
    )

    sectionElements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [location.pathname])

  const handleNavClick = (e, hash) => {
    e.preventDefault()
    if (location.pathname === '/') {
      const element = document.querySelector(hash)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
        window.history.pushState(null, '', hash)
      }
    } else {
      navigate(`/${hash}`)
    }
  }

  const handleBrandClick = (e) => {
    e.preventDefault()
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      window.history.pushState(null, '', '/')
    } else {
      navigate('/')
    }
  }

  const initials = name
    ? name
        .split(' ')
        .map((n) => n[0])
        .join('')
    : 'KT'

  return (
    <header className="sticky top-0 z-40 border-b border-blueprint-line/10 bg-blueprint-bg/90 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <a
          href="/"
          onClick={handleBrandClick}
          className="font-mono text-sm tracking-wide text-blueprint-line transition-all duration-200 hover:-translate-y-0.5 hover:text-blueprint-accent"
        >
          {initials}
          <span className="text-blueprint-accent">.</span>
        </a>
        <ul className="flex flex-wrap items-center gap-4 sm:gap-6">
          {links.map((link) => {
            const isActive = activeSection === link.id
            return (
              <li key={link.hash} className="relative">
                <a
                  href={`/${link.hash}`}
                  onClick={(e) => handleNavClick(e, link.hash)}
                  className={`group relative py-1 font-mono text-xs uppercase tracking-wide transition-colors duration-200 ${
                    isActive
                      ? 'text-blueprint-accent'
                      : 'text-blueprint-slate hover:text-blueprint-line'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute bottom-0 left-0 h-[2px] w-full bg-blueprint-accent transition-transform duration-200 origin-left ${
                      isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </a>
              </li>
            )
          })}
        </ul>
      </nav>
    </header>
  )
}
