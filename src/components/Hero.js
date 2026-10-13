import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import '../styles/Hero.css';
import heroImage from '../assets/hero_3.jpg';

const Hero = () => {
  return (
    <section className="hero">
      <div 
        className="hero-overlay" 
        style={{ 
          backgroundImage: `url(${heroImage})`,
          opacity: 0.85
        }}
      ></div>
      <div className="container hero-content">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="hero-text"
        >
          <span className="hero-badge">A Legacy of Innovation</span>
          <h1>Defining the Future of <br /><span className="text-gradient">African Luxury</span></h1>
          <p>
            Experience the fusion of deep-rooted culture and futuristic design.
            Innuka by King Ishmael is more than a brand—it's a movement.
          </p>
          <div className="hero-ctas">
            <button className="btn-primary">
              Discover Innuka <ArrowRight size={18} />
            </button>
            <button className="btn-secondary">Explore Catalog</button>
          </div>
        </motion.div>
      </div>

      <div className="hero-scroll-indicator">
        <div className="mouse">
          <div className="wheel"></div>
        </div>
        <span>Scroll</span>
      </div>
    </section>
  );
};

export default Hero;
