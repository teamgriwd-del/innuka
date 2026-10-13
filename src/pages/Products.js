import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, X, Maximize2 } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../styles/Products.css';

// Import the generated manifest and images index
import { PRODUCTS_DATA as RAW_PRODUCTS } from '../assets/products_manifest';
import { images } from '../assets/index';

const PRODUCTS_DATA = RAW_PRODUCTS.map(p => ({
  ...p,
  image: images[p.imageName]
}));

const Products = () => {
  const [filter, setFilter] = useState('All');
  const [selectedImage, setSelectedImage] = useState(null);
  
  // Extract unique categories from data
  const categories = ['All', ...new Set(PRODUCTS_DATA.map(p => p.category))];

  const filteredProducts = filter === 'All' 
    ? PRODUCTS_DATA 
    : PRODUCTS_DATA.filter(p => p.category === filter);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="products-page"
    >
      <header className="page-header container">
        <span className="subtitle">Catalogue</span>
        <h1>Our Offerings</h1>
        
        <div className="filter-bar">
          {categories.map(cat => (
            <button 
              key={cat}
              className={`filter-btn ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      {/* Full-screen Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="image-modal-overlay"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="image-modal-content"
              onClick={e => e.stopPropagation()}
            >
              <button className="modal-close" onClick={() => setSelectedImage(null)}>
                <X size={24} />
              </button>
              <img src={selectedImage} alt="Full view" className="full-view-image" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="products-grid container">
        <AnimatePresence mode="popLayout">
          {filteredProducts.map(product => (
            <motion.div
              layout
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="product-card"
            >
              <div className="product-image">
                <div className="image-actions">
                  <button className="expand-btn" onClick={() => setSelectedImage(product.image)}>
                    <Maximize2 size={20} />
                  </button>
                </div>
                
                {/* Swipeable Carousel for Product Image */}
                <Swiper
                  modules={[Navigation, Pagination]}
                  spaceBetween={0}
                  slidesPerView={1}
                  navigation
                  pagination={{ clickable: true }}
                  className="product-swiper"
                >
                  <SwiperSlide>
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      onClick={() => setSelectedImage(product.image)}
                      style={{ cursor: 'pointer' }}
                    />
                  </SwiperSlide>
                  {/* You can add secondary images here if available */}
                </Swiper>

                <div className="product-badge">{product.category}</div>
              </div>
              <div className="product-info">
                <div className="product-header">
                  <h3>{product.name}</h3>
                  <span className="price">{product.price}</span>
                </div>
                <p>{product.desc}</p>
                <button className="add-to-cart">
                  Inquire Now <ShoppingBag size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </section>
    </motion.div>
  );
};

export default Products;

