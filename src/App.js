import React, { useEffect } from 'react';
import './index.css';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import MusicVisualizer from './components/MusicVisualizer';
import AIModelSection from './components/AIModelSection';
import UploadSection from './components/UploadSection';
import Footer from './components/Footer';
import ParticleBackground from './components/ParticleBackground';
import Navbar from './components/Navbar';

function App() {
  useEffect(() => {
    // Smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  return (
    <div className="overflow-hidden bg-gradient-to-b from-cyberpunk-dark via-cyberpunk-darkGray to-cyberpunk-dark">
      <ParticleBackground />
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <MusicVisualizer />
      <AIModelSection />
      <UploadSection />
      <Footer />
    </div>
  );
}

export default App;
