import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import TopBar from './components/TopBar';
import SEO from './components/SEO';
import ScrollToTop from './components/ScrollToTop';
import Home from './home';
import Achievements from './components/achievements';
import Career from './components/career';
import About from './components/about';
import Events from './components/events';
import TrialClass from './components/trialClass';
import Branch from './components/branches';
import Floor from './components/floor';
import Batch from './components/batch';

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen bg-black">
          <SEO />
          <TopBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/career" element={<Career />} />
            <Route path="/about" element={<About />} />
            <Route path="/events" element={<Events />} />
            <Route path="/floor" element={<Floor />} />
            <Route path="/branches" element={<Branch />} />
            <Route path="/trial-class" element={<TrialClass />} />
            <Route path="/batch" element={<Batch />} />
          </Routes>
        </div>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;