'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { formatCurrency } from '@/utils/formatters';
import { BRAND } from '@/config/constants';

export default function CheckoutPage() {
  const { cart, total, subtotal, tax, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate order processing
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      clearCart();
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '2rem',
        backgroundColor: 'var(--color-bg)'
      }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✓</div>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', fontWeight: 300, marginBottom: '0.5rem' }}>
          Thank You
        </h1>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
          Your order has been placed successfully.
        </p>
        <p style={{ fontSize: '0.75rem', color: 'var(--color-secondary)', letterSpacing: '0.15em', marginBottom: '2rem' }}>
          ORDER #{Math.floor(100000 + Math.random() * 900000)}
        </p>
        <Link href="/">
          <button style={{
            padding: '1rem 3rem',
            border: '1px solid var(--color-border)',
            backgroundColor: 'transparent',
            fontSize: '0.75rem',
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            cursor: 'pointer'
          }}>
            Continue Shopping
          </button>
        </Link>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '2rem'
      }}>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', fontWeight: 300, marginBottom: '1rem' }}>
          Your Bag is Empty
        </h1>
        <Link href="/collection">
          <button style={{
            padding: '1rem 3rem',
            border: '1px solid var(--color-border)',
            backgroundColor: 'transparent',
            fontSize: '0.75rem',
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            cursor: 'pointer'
          }}>
            Explore Collection
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg-alt)' }}>
      {/* Minimal Header */}
      <header style={{
        padding: '1.5rem 2rem',
        borderBottom: '1px solid var(--color-border)',
        backgroundColor: 'var(--color-bg)',
        textAlign: 'center'
      }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 300, letterSpacing: '0.15em' }}>
            {BRAND.name}
          </span>
        </Link>
      </header>

      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '2rem',
        display: 'grid',
        gridTemplateColumns: '1fr 400px',
        gap: '2rem',
        alignItems: 'start'
      }}>
        {/* Left: Form */}
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.5rem' }}>

          <section style={{ backgroundColor: 'var(--color-bg)', padding: '2rem', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
            <h2 style={{ fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
              Contact
            </h2>
            <input type="email" placeholder="Email address" required
              style={{ width: '100%', padding: '0.9rem', border: '1px solid var(--color-border)', borderRadius: '4px', fontSize: '0.9rem', boxSizing: 'border-box', fontFamily: 'inherit' }}
            />
          </section>

          <section style={{ backgroundColor: 'var(--color-bg)', padding: '2rem', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
            <h2 style={{ fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
              Shipping Address
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <input type="text" placeholder="First name" required style={inputStyle} />
              <input type="text" placeholder="Last name" required style={inputStyle} />
            </div>
            <input type="text" placeholder="Address" required style={{ ...inputStyle, width: '100%', marginBottom: '1rem', boxSizing: 'border-box' }} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <input type="text" placeholder="City" required style={inputStyle} />
              <input type="text" placeholder="PIN Code" required style={inputStyle} />
            </div>
            <input type="tel" placeholder="Phone number" required style={{ ...inputStyle, width: '100%', boxSizing: 'border-box' }} />
          </section>

          <section style={{ backgroundColor: 'var(--color-bg)', padding: '2rem', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
            <h2 style={{ fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
              Payment
            </h2>
            <p style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', marginBottom: '1rem' }}>
              All transactions are secure and encrypted.
            </p>
            <input type="text" placeholder="Card number" required style={{ ...inputStyle, width: '100%', marginBottom: '1rem', boxSizing: 'border-box' }} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <input type="text" placeholder="MM / YY" required style={inputStyle} />
              <input type="text" placeholder="CVV" required style={inputStyle} />
            </div>
          </section>

          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              padding: '1.2rem',
              backgroundColor: isSubmitting ? '#666' : '#000',
              color: '#fff',
              border: 'none',
              fontSize: '0.8rem',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              borderRadius: '4px',
              transition: 'background-color 0.2s'
            }}
          >
            {isSubmitting ? 'Processing...' : `Pay ${formatCurrency(total)}`}
          </button>
        </form>

        {/* Right: Order Summary */}
        <div style={{ position: 'sticky', top: '2rem' }}>
          <div style={{ backgroundColor: 'var(--color-bg)', border: '1px solid var(--color-border)', borderRadius: '4px', padding: '2rem' }}>
            <h2 style={{ fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
              Order Summary
            </h2>
            {cart.map(item => (
              <div key={item.id} style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid var(--color-border)' }}>
                <img
                  src={item.images?.[0] || '/placeholder.png'}
                  alt={item.name}
                  style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px', border: '1px solid var(--color-border)' }}
                  onError={(e) => { e.target.style.opacity = '0.3'; }}
                />
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.2rem' }}>{item.name}</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Qty: {item.quantity}</p>
                </div>
                <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{formatCurrency(item.price * item.quantity)}</span>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
              <span>Subtotal</span><span>{formatCurrency(subtotal)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '1rem' }}>
              <span>GST (3%)</span><span>{formatCurrency(tax)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1rem', fontWeight: 700, borderTop: '1px solid var(--color-border)', paddingTop: '1rem' }}>
              <span>Total</span><span>{formatCurrency(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  padding: '0.9rem',
  border: '1px solid #ddd',
  borderRadius: '4px',
  fontSize: '0.9rem',
  fontFamily: 'inherit',
  width: '100%',
  boxSizing: 'border-box'
};
