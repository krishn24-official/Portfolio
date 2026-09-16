import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { fetchPortfolioData } from './store/portfolioActions'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ChatWidget from './components/ChatWidget'
import Home from './pages/Home'
import ProjectDetail from './pages/ProjectDetail'

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
    <BrowserRouter>
      <div className="min-h-screen bg-blueprint-bg flex flex-col justify-between">
        <div>
          <Navbar name={data.name} />
          <Routes>
            <Route path="/" element={<Home data={data} />} />
            <Route path="/projects/:id" element={<ProjectDetail data={data} />} />
            <Route path="*" element={<Home data={data} />} />
          </Routes>
        </div>
        <Footer name={data.name} />
        <ChatWidget name={data.name} />
      </div>
    </BrowserRouter>
  )
}
