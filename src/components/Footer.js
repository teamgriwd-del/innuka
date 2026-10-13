import React from 'react';
import { Instagram, Twitter, Facebook, Mail } from 'lucide-react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h2 className="footer-logo">INNUKA</h2>
            <p>Elevating African culture through innovation and premium design. By King Ishmael.</p>
            <div className="social-links">
              <a href="#"><Instagram size={20} /></a>
              <a href="#"><Twitter size={20} /></a>
              <a href="#"><Facebook size={20} /></a>
            </div>
          </div>
          
          <div className="footer-links">
            <h3>Explore</h3>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/about">Our Story</a></li>
              <li><a href="/products">Offerings</a></li>
              <li><a href="/gallery">Gallery</a></li>
            </ul>
          </div>

          <div className="footer-newsletter">
            <h3>Newsletter</h3>
            <p>Subscribe to get updates on new drops and events.</p>
            <form className="newsletter-form">
              <input type="email" placeholder="Email Address" required />
              <button type="submit">Join</button>
            </form>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Innuka by King Ishmael. All rights reserved.</p>
          <div className="footer-meta">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
