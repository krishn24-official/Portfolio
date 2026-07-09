import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPortfolioData } from './store/portfolioActions'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  const dispatch = useDispatch()
  const { loading, data, error } = useSelector((state) => state.portfolio)

  useEffect(() => {
    dispatch(fetchPortfolioData())
  }, [dispatch])

  if (loading || !data) {
    return <Loader />
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-blueprint-bg px-6 text-center">
        <div className="font-mono text-sm text-blueprint-slate">
          <p className="mb-2 text-blueprint-amber">Couldn't load portfolio data.</p>
          <p>{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-blueprint-bg">
      <Navbar name={data.name} />
      <Hero
        name={data.name}
        role={data.role}
        tagline={data.tagline}
        location={data.location}
        socials={data.socials}
      />
      <About about={data.about} />
      <Skills skills={data.skills} />
      <Projects projects={data.projects} />
      <Contact email={data.email} socials={data.socials} />
      <Footer name={data.name} />
    </div>
  )
}
