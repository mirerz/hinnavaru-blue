import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import Registry from './pages/Registry'
import Sponsor from './pages/Sponsor'
import LiveLagoon from './pages/LiveLagoon'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="projects" element={<Projects />} />
        <Route path="registry" element={<Registry />} />
        <Route path="sponsor" element={<Sponsor />} />
        <Route path="live-lagoon" element={<LiveLagoon />} />
      </Route>
    </Routes>
  )
}
