import React from 'react';
import { motion } from 'framer-motion';
import '../styles/About.css';
import kingIshmael from '../assets/king_ishmael.webp';

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.5 }}
      className="about-page"
    >
      <section className="about-hero container">
        <div className="section-header centered">
          <span className="subtitle">The Story</span>
          <h1>By King Ishmael</h1>
        </div>
        <div className="about-content">
          <div className="about-main-image">
            <img src={kingIshmael} alt="King Ishmael, founder of Innuka" />
          </div>
          <div className="about-text-content">
            <h2>Visionary Innovation</h2>
            <p>
              Innuka was born from a singular vision: to create a global brand that celebrates 
              the richness of African heritage while pushing the boundaries of modern innovation. 
              Founded by King Ishmael, the brand embodies a philosophy of excellence, resilience, 
              and creative audacity.
            </p>
            <p>
              Our journey is rooted in the belief that culture is the ultimate engine of creativity. 
              By merging ancestral wisdom with futuristic technology, we craft experiences that 
              resonate on a deep, human level.
            </p>
          </div>
        </div>
      </section>

      <section className="values-section container">
        <div className="values-grid">
          <div className="value-item">
            <h3>Culture</h3>
            <p>Honoring our roots through authentic storytelling and traditional craftsmanship.</p>
          </div>
          <div className="value-item">
            <h3>Innovation</h3>
            <p>Constantly redefining what is possible through futuristic design and thinking.</p>
          </div>
          <div className="value-item">
            <h3>Quality</h3>
            <p>A relentless pursuit of excellence in every detail, from concept to creation.</p>
          </div>
        </div>
      </section>

      <section className="mission-vision container">
        <div className="mv-card">
          <div className="mv-item">
            <h2>Mission</h2>
            <p>To empower and inspire a global audience by elevating African creative excellence to the world stage.</p>
          </div>
          <div className="mv-divider"></div>
          <div className="mv-item">
            <h2>Vision</h2>
            <p>To become the world's leading symbol of innovative African luxury and cultural influence.</p>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default About;
