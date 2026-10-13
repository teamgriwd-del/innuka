import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import '../styles/Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="contact-page"
    >
      <header className="page-header container">
        <span className="subtitle">Get in Touch</span>
        <h1>Connect with Innuka</h1>
        <p>Whether you have a query about our products or want to discuss a creative collaboration.</p>
      </header>

      <section className="contact-content container">
        <div className="contact-grid">
          <div className="contact-info">
            <div className="info-item">
              <div className="info-icon"><Mail /></div>
              <div className="info-text">
                <h3>Email Us</h3>
                <p>hello@innuka.world</p>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon"><Phone /></div>
              <div className="info-text">
                <h3>Call Us</h3>
                <p>+263 77 123 4567</p>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon"><MapPin /></div>
              <div className="info-text">
                <h3>Visit Us</h3>
                <p>Creative Hub, Harare, Zimbabwe</p>
              </div>
            </div>
          </div>

          <div className="contact-form-wrapper">
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="success-message"
              >
                <h2>Message Sent!</h2>
                <p>Thank you for reaching out. We will get back to you shortly.</p>
              </motion.div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Name</label>
                  <input 
                    type="text" 
                    placeholder="Your Name" 
                    required 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input 
                    type="email" 
                    placeholder="Your Email" 
                    required 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea 
                    rows="5" 
                    placeholder="Tell us something..." 
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  ></textarea>
                </div>
                <button type="submit" className="btn-primary full-width">
                  Send Message <Send size={18} />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="map-placeholder container">
         <div className="placeholder-img map-bg">
            <div className="map-overlay">
               <span>Interactive Map Integration Coming Soon</span>
            </div>
         </div>
      </section>
    </motion.div>
  );
};

export default Contact;
