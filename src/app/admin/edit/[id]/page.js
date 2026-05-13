'use client';

import { useState, useEffect } from 'react';
import { productService } from '@/services/productService';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id;

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [imageUrls, setImageUrls] = useState(['', '', '']);

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category_id: '',
    description: '',
    is_exclusive: false,
    metal: '',
    stones: ''
  });

  useEffect(() => {
    async function loadData() {
      try {
        const [allProducts, cats] = await Promise.all([
          productService.getAllProducts(),
          productService.getCategories()
        ]);

        setCategories(cats);

        const product = allProducts.find(p => p.id === productId);
        if (!product) {
          alert('Product not found.');
          router.push('/admin');
          return;
        }

        setFormData({
          name: product.name || '',
          price: String(product.price || ''),
          category_id: product.category_id || (cats[0]?.id || ''),
          description: product.description || '',
          is_exclusive: product.is_exclusive || false,
          metal: product.specifications?.metal || '',
          stones: product.specifications?.stones || ''
        });

        // Populate existing image URLs
        const existingImages = product.product_images
          ?.sort((a, b) => a.display_order - b.display_order)
          .map(img => img.image_url) || [];
        const padded = [...existingImages, '', '', ''].slice(0, 3);
        setImageUrls(padded);

      } catch (error) {
        console.error('Failed to load product:', error);
        alert('Failed to load product: ' + error.message);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      // 1. Update product fields
      const { error: updateError } = await (await import('@/lib/supabase')).supabase
        .from('products')
        .update({
          name: formData.name,
          price: parseFloat(formData.price),
          category_id: formData.category_id,
          description: formData.description,
          is_exclusive: formData.is_exclusive,
          specifications: {
            metal: formData.metal,
            stones: formData.stones
          }
        })
        .eq('id', productId);

      if (updateError) throw updateError;

      // 2. Replace images — delete old, insert new
      const { supabase } = await import('@/lib/supabase');
      await supabase.from('product_images').delete().eq('product_id', productId);

      const validImages = imageUrls.filter(url => url.trim() !== '');
      if (validImages.length > 0) {
        await supabase.from('product_images').insert(
          validImages.map((url, index) => ({
            product_id: productId,
            image_url: url,
            display_order: index + 1
          }))
        );
      }

      alert('Product updated successfully!');
      router.push('/admin');
    } catch (error) {
      console.error('Failed to update product:', error);
      alert('Error: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '4rem', textAlign: 'center', opacity: 0.5 }}>
        Loading product...
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', color: '#1a1a1a' }}>
      <header style={{ marginBottom: '2rem' }}>
        <Link href="/admin" style={{ fontSize: '0.8rem', textDecoration: 'underline', color: '#666' }}>← Back to Inventory</Link>
        <h1 style={{ fontSize: '2rem', marginTop: '1rem', fontFamily: 'var(--font-serif)' }}>Edit Piece</h1>
      </header>

      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.5rem', backgroundColor: '#fff', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>

        <div>
          <label style={labelStyle}>PRODUCT NAME</label>
          <input type="text" required value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            style={inputStyle} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={labelStyle}>PRICE (INR)</label>
            <input type="number" required value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>CATEGORY</label>
            <select value={formData.category_id}
              onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
              style={inputStyle}>
              {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label style={labelStyle}>STORY / DESCRIPTION</label>
          <textarea rows="4" value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            style={{ ...inputStyle, fontFamily: 'inherit', resize: 'vertical' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={labelStyle}>METAL TYPE</label>
            <input type="text" value={formData.metal}
              onChange={(e) => setFormData({ ...formData, metal: e.target.value })}
              style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>STONE DETAILS</label>
            <input type="text" value={formData.stones}
              onChange={(e) => setFormData({ ...formData, stones: e.target.value })}
              style={inputStyle} />
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <input type="checkbox" id="exclusive" checked={formData.is_exclusive}
            onChange={(e) => setFormData({ ...formData, is_exclusive: e.target.checked })} />
          <label htmlFor="exclusive" style={{ fontSize: '0.8rem', fontWeight: '600' }}>MARK AS EXCLUSIVE COLLECTION</label>
        </div>

        <div>
          <label style={labelStyle}>IMAGE URLS (3 Views for the Magical Morph)</label>
          {imageUrls.map((url, index) => (
            <input key={index} type="text" value={url}
              onChange={(e) => {
                const newUrls = [...imageUrls];
                newUrls[index] = e.target.value;
                setImageUrls(newUrls);
              }}
              placeholder={`View ${index + 1} Image URL`}
              style={{ ...inputStyle, marginBottom: '0.5rem' }} />
          ))}
        </div>

        <button type="submit" disabled={saving}
          style={{
            marginTop: '1rem',
            padding: '1.2rem',
            backgroundColor: saving ? '#666' : '#000',
            color: '#fff',
            border: 'none',
            fontSize: '0.9rem',
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            cursor: saving ? 'not-allowed' : 'pointer'
          }}>
          {saving ? 'Saving Changes...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
}

const labelStyle = {
  display: 'block',
  fontSize: '0.8rem',
  fontWeight: '600',
  marginBottom: '0.5rem'
};

const inputStyle = {
  width: '100%',
  padding: '0.8rem',
  border: '1px solid #ddd',
  borderRadius: '4px',
  fontSize: '0.9rem',
  boxSizing: 'border-box'
};
