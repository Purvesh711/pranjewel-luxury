'use client';

import { useState } from 'react';
import styles from './ProductCard.module.css';
import { formatCurrency } from '@/utils/formatters';

export default function ProductCard({ product }) {
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Default fallback images if none provided
  const images = product.images || [
    '/products/ring-1.png',
    '/products/ring-2.png',
    '/products/ring-3.png'
  ];

  const handleMouseMove = (e) => {
    const { left, width } = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left;
    const percent = x / width;

    // Split the card into 3 zones for the 3 images
    if (percent < 0.33) {
      setActiveIndex(0);
    } else if (percent < 0.66) {
      setActiveIndex(1);
    } else {
      setActiveIndex(2);
    }
  };

  const handleMouseLeave = () => {
    setActiveIndex(0); // Reset to first image
  };

  return (
    <div className={styles.wrapper}>
      <div 
        className={styles.card}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchMove={(e) => {
          const touch = e.touches[0];
          const rect = e.currentTarget.getBoundingClientRect();
          const x = touch.clientX - rect.left;
          const percent = x / rect.width;
          if (percent < 0.33) setActiveIndex(0);
          else if (percent < 0.66) setActiveIndex(1);
          else setActiveIndex(2);
        }}
      >
        {product.is_exclusive && (
          <div className={styles.exclusiveBadge}>Exclusive</div>
        )}
        
        <div className={styles.imageContainer}>
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`${product.name} view ${index + 1}`}
              className={`${styles.image} ${activeIndex === index ? styles.active : ''}`}
            />
          ))}
        </div>
      </div>
      
      <div className={styles.info}>
        <h3 className={styles.name}>{product.name}</h3>
        <p className={styles.price}>{formatCurrency(product.price)}</p>
      </div>
    </div>
  );
}
