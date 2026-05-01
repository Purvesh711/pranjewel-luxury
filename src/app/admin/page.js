'use client';

import { useEffect, useState } from 'react';
import { productService } from '@/services/productService';
import { formatCurrency } from '@/utils/formatters';
import Link from 'next/link';

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchInventory() {
      try {
        const data = await productService.getAllProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch inventory:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchInventory();
  }, []);

  return (
    <div style={{ padding: '2rem', minHeight: '100vh', backgroundColor: '#f9f9f9', color: '#1a1a1a' }}>
      {/* Admin Header */}
      <header style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '3rem',
        borderBottom: '1px solid #ddd',
        paddingBottom: '1rem'
      }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-serif)' }}>Inventory Control</h1>
          <p style={{ fontSize: '0.8rem', color: '#666' }}>Managing the PranJewel Collection</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link href="/admin/new">
            <button style={{
              padding: '0.8rem 1.5rem',
              backgroundColor: '#000',
              color: '#fff',
              fontSize: '0.8rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              cursor: 'pointer'
            }}>
              + Add New Piece
            </button>
          </Link>
          <Link href="/">
            <button style={{
              padding: '0.8rem 1.5rem',
              border: '1px solid #000',
              backgroundColor: 'transparent',
              fontSize: '0.8rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              cursor: 'pointer'
            }}>
              Back to Store
            </button>
          </Link>
        </div>
      </header>

      {/* Inventory Table */}
      {loading ? (
        <p>Loading inventory...</p>
      ) : (
        <div style={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ backgroundColor: '#f4f4f4', borderBottom: '1px solid #ddd' }}>
                <th style={{ padding: '1rem' }}>Product</th>
                <th style={{ padding: '1rem' }}>Price</th>
                <th style={{ padding: '1rem' }}>Status</th>
                <th style={{ padding: '1rem' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ fontWeight: '600' }}>{product.name}</div>
                    <div style={{ fontSize: '0.7rem', color: '#888' }}>ID: {product.id.substring(0, 8)}</div>
                  </td>
                  <td style={{ padding: '1rem' }}>{formatCurrency(product.price)}</td>
                  <td style={{ padding: '1rem' }}>
                    {product.is_exclusive ? (
                      <span style={{ fontSize: '0.7rem', backgroundColor: 'var(--color-secondary)', color: '#fff', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>Exclusive</span>
                    ) : (
                      <span style={{ fontSize: '0.7rem', backgroundColor: '#eee', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>Standard</span>
                    )}
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <button style={{ color: '#0066cc', marginRight: '1rem', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.8rem' }}>Edit</button>
                    <button style={{ color: '#cc0000', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.8rem' }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
