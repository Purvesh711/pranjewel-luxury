'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { BRAND } from '@/config/constants';

export default function Navbar() {
  const { cart, toggleDrawer } = useCart();
  
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      padding: '1.5rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      zIndex: 900,
      mixBlendMode: 'difference', // This makes it look magical on different backgrounds
      color: 'white'
    }}>
      <Link href="/">
        <h1 style={{ 
          fontSize: '1.2rem', 
          fontFamily: 'var(--font-serif)', 
          letterSpacing: '0.2em', 
          cursor: 'pointer' 
        }}>
          {BRAND.name.toUpperCase()}
        </h1>
      </Link>

      <button 
        onClick={toggleDrawer}
        style={{
          fontSize: '0.7rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          cursor: 'pointer',
          color: 'white',
          borderBottom: '1px solid rgba(255,255,255,0.3)',
          paddingBottom: '4px'
        }}
      >
        Bag ({itemCount})
      </button>
    </nav>
  );
}
