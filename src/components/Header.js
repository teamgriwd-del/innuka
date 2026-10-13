import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import '../styles/Header.css';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <Link to="/" className="logo">
          INNUKA <span className="logo-sub">by King Ishmael</span>
        </Link>

        <nav className={`nav ${isOpen ? 'open' : ''}`}>
          <ul className="nav-links">
            <li><Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link></li>
            <li><Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>About</Link></li>
            <li><Link to="/products" className={location.pathname === '/products' ? 'active' : ''}>Products</Link></li>
            <li><Link to="/gallery" className={location.pathname === '/gallery' ? 'active' : ''}>Gallery</Link></li>
            <li><Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>Contact</Link></li>
          </ul>
        </nav>

        <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  );
};

export default Header;
