import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import '../styles/Home.css';
import ctaBackground from '../assets/download.jpg';

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="home-page"
    >
      <Hero />

      <section className="intro-section container">
        <div className="section-header">
          <span className="subtitle">The Vision</span>
          <h2>A Fusion of Heritage and Future</h2>
        </div>
        <div className="intro-grid">
          <div className="intro-image">
             <div className="placeholder-img gold-gradient"></div>
          </div>
          <div className="intro-text">
            <p>
              Innuka represents the peak of modern African creativity. Founded by King Ishmael,
              the brand bridges the gap between ancient traditions and futuristic possibilities.
              Our designs are not just products; they are statements of identity, resilience, and luxury.       
            </p>
            <p>
              Every element of the Innuka ecosystem is meticulously crafted to inspire and elevate.
              Join us as we redefine the boundaries of what is possible.
            </p>
          </div>
        </div>
      </section>

      <section className="featured-highlights container">
        <div className="section-header centered">
          <span className="subtitle">Curated Offerings</span>
          <h2>Featured Highlights</h2>
        </div>
        <div className="highlights-grid">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="highlight-card"
            >
              <div className="card-image-wrapper">
                 <div className={`placeholder-img highlight-${i}`}></div>
              </div>
              <div className="card-content">
                <h3>Innovation {i}</h3>
                <p>Redefining luxury through bespoke craftsmanship and cultural storytelling.</p>
                <a href="/products" className="text-link">Explore More &rarr;</a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3-Step Process Section */}
      <section className="process-section">
        <div className="container">
          <div className="section-header centered">
            <span className="subtitle">How it works</span>
            <h2>Your Path to Success</h2>
          </div>
          <div className="process-grid">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="process-step"
            >
              <div className="step-badge">1</div>
              <h3>REGISTER</h3>
              <p>Complete a quick and easy online registration to kickstart your entrepreneurial journey.</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="process-step"
            >
              <div className="step-badge">2</div>
              <h3>EARN RETAIL PROFIT</h3>
              <p>Start earning immediate retail profit on what you sell.</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="process-step"
            >
              <div className="step-badge">3</div>
              <h3>EARN CASH REWARDS</h3>
              <p>Earn multiple cash rewards by investing and growing your INUKA business.</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section 
        className="cta-banner"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${ctaBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          width: '100%',
          minHeight: '400px',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <div className="container">
          <h2>Ready to Step into the Future?</h2>
          <p>Be part of the Innuka legacy. Discover exclusivity and innovation.</p>
          <button className="btn-primary">Explore the Collection</button>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;
