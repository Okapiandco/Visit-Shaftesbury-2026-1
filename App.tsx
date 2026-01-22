import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
import Transport from './pages/Transport';
import HistoryPage from './pages/History';
import AdminDashboard from './pages/AdminDashboard';
import EatDrink from './pages/EatDrink';
import Stay from './pages/Stay';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Sitemap from './pages/Sitemap';
import GoldHill from './pages/GoldHill';
import ShaftesburyAbbey from './pages/ShaftesburyAbbey';
import CastleHill from './pages/CastleHill';
import ParkWalk from './pages/ParkWalk';
import GoldHillMuseum from './pages/GoldHillMuseum';
import ShaftesburyArtsCentre from './pages/ShaftesburyArtsCentre';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        {/* main-content id for skip-link accessibility */}
        <main id="main-content" className="flex-grow outline-none" tabIndex={-1}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:id" element={<EventDetail />} />
            <Route path="/plan" element={<Transport />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/eat-drink" element={<EatDrink />} />
            <Route path="/stay" element={<Stay />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/sitemap" element={<Sitemap />} />
            {/* Landmark Pages */}
            <Route path="/gold-hill" element={<GoldHill />} />
            <Route path="/shaftesbury-abbey" element={<ShaftesburyAbbey />} />
            <Route path="/castle-hill" element={<CastleHill />} />
            <Route path="/park-walk" element={<ParkWalk />} />
            <Route path="/gold-hill-museum" element={<GoldHillMuseum />} />
            <Route path="/shaftesbury-arts-centre" element={<ShaftesburyArtsCentre />} />
            {/* Placeholder routes for navigation items */}
            <Route path="/explore" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;