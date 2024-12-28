import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Subscription from './pages/Subscription';
import Revenue from './pages/Revenue';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-r from-teal-50 to-teal-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/report" element={<Revenue />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
