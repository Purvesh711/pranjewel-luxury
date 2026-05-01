'use client';

import { useEffect, useState } from 'react';
import { BRAND } from "@/config/constants";
import ProductCard from "@/components/products/ProductCard";
import Link from "next/link";
import { productService } from "@/services/productService";

export default function CollectionPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await productService.getAllProducts();
        
        // Transform Supabase data into the format our ProductCard expects
        const formattedProducts = data.map(p => ({
          ...p,
          images: p.product_images
            .sort((a, b) => a.display_order - b.display_order)
            .map(img => img.image_url)
        }));
        
        setProducts(formattedProducts);
      } catch (error) {
        console.error("Error loading jewelry:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  return (
    <div className="fade-in">
      <nav style={{ padding: '2rem 0', borderBottom: '1px solid var(--color-border)', textAlign: 'center' }}>
        <Link href="/">
          <h1 style={{ fontSize: '1.5rem', cursor: 'pointer' }}>{BRAND.name}</h1>
        </Link>
      </nav>

      <section className="container section-padding">
        <header style={{ marginBottom: '4rem', textAlign: 'center' }}>
          <p style={{ letterSpacing: '0.3em', textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--color-secondary)', marginBottom: '1rem' }}>
            Live Collection
          </p>
          <h2 style={{ fontSize: '2.5rem' }}>The Collection</h2>
        </header>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem', opacity: 0.5 }}>
            <p className="shimmer" style={{ display: 'inline-block', padding: '1rem 2rem' }}>Loading Collection...</p>
          </div>
        ) : (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
            gap: 'var(--space-md)',
            paddingBottom: 'var(--space-xl)'
          }}>
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      <footer style={{ padding: '4rem 0', backgroundColor: 'var(--color-bg-alt)', textAlign: 'center' }}>
        <p style={{ fontSize: '0.8rem', letterSpacing: '0.1em', color: 'var(--color-text-muted)' }}>
          © 2026 {BRAND.name} LUXURY.
        </p>
      </footer>
    </div>
  );
}
