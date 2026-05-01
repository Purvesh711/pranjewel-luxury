'use client';

import { useCart } from '@/context/CartContext';
import styles from './CartDrawer.module.css';
import { formatCurrency } from '@/utils/formatters';

export default function CartDrawer() {
  const { 
    cart, 
    isDrawerOpen, 
    toggleDrawer, 
    removeFromCart, 
    subtotal, 
    tax, 
    total 
  } = useCart();

  return (
    <>
      {/* Background Overlay */}
      <div 
        className={`${styles.overlay} ${isDrawerOpen ? styles.open : ''}`}
        onClick={toggleDrawer}
      ></div>

      {/* The Drawer Panel */}
      <div className={`${styles.drawer} ${isDrawerOpen ? styles.open : ''}`}>
        <div className={styles.header}>
          <h2>Shopping Bag</h2>
          <button className={styles.closeButton} onClick={toggleDrawer}>✕</button>
        </div>

        <div className={styles.content}>
          {cart.length === 0 ? (
            <div className={styles.emptyState}>
              <p>Your bag is currently empty.</p>
              <button 
                onClick={toggleDrawer}
                style={{ marginTop: '1rem', textDecoration: 'underline', color: 'var(--color-secondary)' }}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className={styles.cartItem}>
                <img src={item.images[0]} alt={item.name} className={styles.itemImage} />
                <div className={styles.itemInfo}>
                  <h3 className={styles.itemName}>{item.name}</h3>
                  <p className={styles.itemPrice}>{formatCurrency(item.price)}</p>
                  <button 
                    className={styles.removeButton}
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className={styles.footer}>
            <div className={styles.summaryRow}>
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>GST (3%)</span>
              <span>{formatCurrency(tax)}</span>
            </div>
            <div className={styles.totalRow}>
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>
            <button className={styles.checkoutButton}>
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}
