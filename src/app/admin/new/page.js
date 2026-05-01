'use client';

import { useState, useEffect } from 'react';
import { productService } from '@/services/productService';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NewProductPage() {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category_id: '',
    description: '',
    is_exclusive: false,
    metal: '18k Yellow Gold',
    stones: 'Diamonds'
  });

  const [imageUrls, setImageUrls] = useState(['', '', '']);

  useEffect(() => {
    async function loadCategories() {
      const data = await productService.getCategories();
      setCategories(data);
      if (data.length > 0) {
        setFormData(prev => ({ ...prev, category_id: data[0].id }));
      }
    }
    loadCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const productToSave = {
        name: formData.name,
        price: parseFloat(formData.price),
        category_id: formData.category_id,
        description: formData.description,
        is_exclusive: formData.is_exclusive,
        specifications: {
          metal: formData.metal,
          stones: formData.stones
        }
      };

      // Filter out empty URLs
      const validImages = imageUrls.filter(url => url.trim() !== '');

      await productService.createProduct(productToSave, validImages);
      alert("Jewelry piece added successfully!");
      router.push('/admin');
    } catch (error) {
      console.error("Failed to save product:", error);
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', color: '#1a1a1a' }}>
      <header style={{ marginBottom: '2rem' }}>
        <Link href="/admin" style={{ fontSize: '0.8rem', textDecoration: 'underline', color: '#666' }}>← Back to Inventory</Link>
        <h1 style={{ fontSize: '2rem', marginTop: '1rem', fontFamily: 'var(--font-serif)' }}>Add New Masterpiece</h1>
      </header>

      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.5rem', backgroundColor: '#fff', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
        
        <div>
          <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.5rem' }}>PRODUCT NAME</label>
          <input 
            type="text" 
            required 
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            placeholder="e.g. The Eternal Solitaire"
            style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '4px' }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.5rem' }}>PRICE (INR)</label>
            <input 
              type="number" 
              required 
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: e.target.value})}
              placeholder="125000"
              style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '4px' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.5rem' }}>CATEGORY</label>
            <select 
              value={formData.category_id}
              onChange={(e) => setFormData({...formData, category_id: e.target.value})}
              style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '4px' }}
            >
              {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.5rem' }}>STORY / DESCRIPTION</label>
          <textarea 
            rows="4" 
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            placeholder="Describe the craftsmanship and inspiration..."
            style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '4px', fontFamily: 'inherit' }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.5rem' }}>METAL TYPE</label>
            <input 
              type="text" 
              value={formData.metal}
              onChange={(e) => setFormData({...formData, metal: e.target.value})}
              style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '4px' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.5rem' }}>STONE DETAILS</label>
            <input 
              type="text" 
              value={formData.stones}
              onChange={(e) => setFormData({...formData, stones: e.target.value})}
              style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '4px' }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <input 
            type="checkbox" 
            checked={formData.is_exclusive}
            onChange={(e) => setFormData({...formData, is_exclusive: e.target.checked})}
            id="exclusive"
          />
          <label htmlFor="exclusive" style={{ fontSize: '0.8rem', fontWeight: '600' }}>MARK AS EXCLUSIVE COLLECTION</label>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '1rem' }}>IMAGE URLS (3 Views for the Magical Morph)</label>
          {imageUrls.map((url, index) => (
            <input 
              key={index}
              type="text" 
              value={url}
              onChange={(e) => {
                const newUrls = [...imageUrls];
                newUrls[index] = e.target.value;
                setImageUrls(newUrls);
              }}
              placeholder={`View ${index + 1} Image URL`}
              style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '4px', marginBottom: '0.5rem' }}
            />
          ))}
        </div>

        <button 
          type="submit" 
          disabled={loading}
          style={{
            marginTop: '1rem',
            padding: '1.2rem',
            backgroundColor: '#000',
            color: '#fff',
            border: 'none',
            fontSize: '0.9rem',
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            cursor: 'pointer',
            opacity: loading ? 0.5 : 1
          }}
        >
          {loading ? 'Creating Piece...' : 'Publish to Collection'}
        </button>
      </form>
    </div>
  );
}
