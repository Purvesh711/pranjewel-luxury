'use client';

import { useEffect, useState } from 'react';
import { productService } from '@/services/productService';
import { formatCurrency } from '@/utils/formatters';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [toast, setToast] = useState(null);
  const router = useRouter();

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  async function fetchInventory() {
    try {
      const data = await productService.getAllProducts();
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch inventory:", error);
      showToast("Failed to load inventory.", "error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchInventory();
  }, []);

  const handleDelete = async (productId, productName) => {
    if (!confirm(`Are you sure you want to delete "${productName}"? This cannot be undone.`)) return;

    setDeletingId(productId);
    try {
      await productService.deleteProduct(productId);
      setProducts(prev => prev.filter(p => p.id !== productId));
      showToast(`"${productName}" has been removed from the collection.`, 'success');
    } catch (error) {
      console.error("Failed to delete product:", error);
      showToast("Failed to delete product: " + error.message, 'error');
    } finally {
      setDeletingId(null);
    }
  };

  const handleEdit = (productId) => {
    router.push(`/admin/edit/${productId}`);
  };

  return (
    <div style={{ padding: '2rem', minHeight: '100vh', backgroundColor: '#f9f9f9', color: '#1a1a1a', position: 'relative' }}>

      {/* Toast Notification */}
      {toast && (
        <div style={{
          position: 'fixed',
          top: '1.5rem',
          right: '1.5rem',
          zIndex: 9999,
          padding: '0.85rem 1.4rem',
          borderRadius: '8px',
          fontSize: '0.85rem',
          fontWeight: '500',
          backgroundColor: toast.type === 'success' ? '#1a3a2a' : '#3a1a1a',
          color: toast.type === 'success' ? '#74c69d' : '#e07070',
          border: `1px solid ${toast.type === 'success' ? '#2d6a4f' : '#6a2d2d'}`,
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          animation: 'fadeIn 0.3s ease'
        }}>
          {toast.type === 'success' ? '✓' : '✕'} {toast.message}
        </div>
      )}

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
          <p style={{ fontSize: '0.8rem', color: '#666' }}>Managing the PranJewel Collection — {products.length} piece{products.length !== 1 ? 's' : ''}</p>
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
              cursor: 'pointer',
              border: 'none'
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
        <p style={{ textAlign: 'center', padding: '4rem', opacity: 0.5 }}>Loading inventory...</p>
      ) : products.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem', opacity: 0.5 }}>
          <p>No pieces in the collection yet.</p>
          <Link href="/admin/new" style={{ textDecoration: 'underline', fontSize: '0.85rem', marginTop: '1rem', display: 'inline-block' }}>
            Add your first piece →
          </Link>
        </div>
      ) : (
        <div style={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ backgroundColor: '#f4f4f4', borderBottom: '1px solid #ddd' }}>
                <th style={{ padding: '1rem' }}>Product</th>
                <th style={{ padding: '1rem' }}>Price</th>
                <th style={{ padding: '1rem' }}>Status</th>
                <th style={{ padding: '1rem' }}>Images</th>
                <th style={{ padding: '1rem' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ fontWeight: '600' }}>{product.name}</div>
                    <div style={{ fontSize: '0.7rem', color: '#888', marginTop: '2px' }}>ID: {product.id.substring(0, 8)}...</div>
                  </td>
                  <td style={{ padding: '1rem' }}>{formatCurrency(product.price)}</td>
                  <td style={{ padding: '1rem' }}>
                    {product.is_exclusive ? (
                      <span style={{ fontSize: '0.7rem', backgroundColor: 'var(--color-secondary)', color: '#fff', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>Exclusive</span>
                    ) : (
                      <span style={{ fontSize: '0.7rem', backgroundColor: '#eee', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>Standard</span>
                    )}
                  </td>
                  <td style={{ padding: '1rem', fontSize: '0.8rem', color: '#888' }}>
                    {product.product_images?.length || 0} image{product.product_images?.length !== 1 ? 's' : ''}
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <button
                      onClick={() => handleEdit(product.id)}
                      style={{
                        color: '#0066cc',
                        marginRight: '1rem',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '0.8rem',
                        textDecoration: 'underline'
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.id, product.name)}
                      disabled={deletingId === product.id}
                      style={{
                        color: deletingId === product.id ? '#999' : '#cc0000',
                        background: 'none',
                        border: 'none',
                        cursor: deletingId === product.id ? 'not-allowed' : 'pointer',
                        fontSize: '0.8rem',
                        textDecoration: 'underline'
                      }}
                    >
                      {deletingId === product.id ? 'Deleting...' : 'Delete'}
                    </button>
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
