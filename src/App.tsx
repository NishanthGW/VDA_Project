import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TopBar from './components/TopBar';
import Home from './home';
import Achievements from './components/achievements';
import Career from './components/career';
import About from './components/about';
import Events from './components/events';
import TrialClass from './components/trialClass';
import Branch from './components/branches';
import Floor from './components/floor';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-black">
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
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;