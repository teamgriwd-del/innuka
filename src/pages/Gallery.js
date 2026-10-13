import React from 'react';
import { motion } from 'framer-motion';
import '../styles/Gallery.css';
import { images } from '../assets/index';

const GALLERY_ITEMS = [
  { id: 1, type: 'large', image: 'hair_1.jpg', focus: '23% 45%', zoom: 1.15, title: 'Mohlolo Hair', caption: 'Natural + Pure' },
  { id: 2, type: 'small', image: 'hero.jpg', focus: 'center', zoom: 1, title: 'The Pedestal', caption: 'Brand Direction' },
  { id: 3, type: 'small', image: 'fragrance_men_1.jpg', focus: '32% 66%', zoom: 1.95, title: 'Exclusive Range', caption: 'Fragrances for Men' },
  { id: 4, type: 'medium', image: 'fragrance_women_2.jpg', focus: '66% 82%', zoom: 1.75, title: 'Signature Range', caption: 'Extrait de Parfum' },
  { id: 5, type: 'large', image: 'hero_3.jpg', focus: 'center', zoom: 1, title: 'Golden Thread', caption: 'Creative Direction' },
  { id: 6, type: 'medium', image: 'makeup_6.jpg', focus: '85% 36%', zoom: 1.85, title: 'Mineral Blusher', caption: 'Reflecting Pearls' },
  { id: 7, type: 'small', image: 'soap_4.jpg', focus: '45% 90%', zoom: 2.3, title: 'Essential Oils', caption: 'Therapeutic Blends' },
  { id: 8, type: 'small', image: 'hero_2.jpg', focus: 'center', zoom: 1, title: 'Gold Dust', caption: 'Brand Direction' },
];
const Gallery = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="gallery-page"
    >
      <header className="page-header container">
        <span className="subtitle">Visuals</span>
        <h1>The Innuka Universe</h1>
        <p className="header-desc">A curated glimpse into our world of innovation and culture.</p>
      </header>

      <div className="gallery-masonry container">
        {GALLERY_ITEMS.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className={`gallery-item ${item.type}`}
          >
            <img
              src={images[item.image]}
              alt={item.title}
              loading="lazy"
              style={{ '--focus': item.focus, '--zoom': item.zoom }}
            />
            <div className="gallery-hover-info">
              <span>{item.title}</span>
              <small>{item.caption}</small>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Gallery;
