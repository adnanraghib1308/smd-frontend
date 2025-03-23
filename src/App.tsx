import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Contests from './pages/Contests';
import ContestDetails from './pages/ContestDetails';
import Submit from './pages/Submit';
import BabyProfile from './pages/BabyProfile';
import Leaderboard from './pages/Leaderboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contests" element={<Contests />} />
          <Route path="/contest/:contestId" element={<ContestDetails />} />
          <Route path="/submit" element={<Submit />} />
          <Route path="/baby" element={<BabyProfile />} />
          <Route path="/leaderboard/:contestId" element={<Leaderboard />} />
        </Routes>
        <Toaster position="bottom-right" />
      </div>
    </Router>
  );
}

export default App;