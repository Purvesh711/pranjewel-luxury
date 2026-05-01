'use client';

import { BRAND } from "@/config/constants";
import ProductCard from "@/components/products/ProductCard";
import Link from "next/link";

export default function CollectionPage() {
  // Mocking 6 unique products using our existing assets
  const collection = [
    {
      id: 'ring-1',
      name: 'The Eternal Solitaire',
      price: 125000,
      is_exclusive: true,
      images: ['/products/ring-1.png', '/products/ring-2.png', '/products/ring-3.png']
    },
    {
      id: 'ring-2',
      name: 'The Heirloom Ring',
      price: 185000,
      is_exclusive: false,
      images: ['/products/ring-1.png', '/products/ring-2.png', '/products/ring-3.png']
    },
    {
      id: 'ring-3',
      name: 'Midnight Sparkle',
      price: 95000,
      is_exclusive: true,
      images: ['/products/ring-1.png', '/products/ring-2.png', '/products/ring-3.png']
    },
    {
      id: 'ring-4',
      name: 'The Royal Band',
      price: 75000,
      is_exclusive: false,
      images: ['/products/ring-1.png', '/products/ring-2.png', '/products/ring-3.png']
    },
    {
      id: 'ring-5',
      name: 'Princess Cut Dream',
      price: 210000,
      is_exclusive: true,
      images: ['/products/ring-1.png', '/products/ring-2.png', '/products/ring-3.png']
    },
    {
      id: 'ring-6',
      name: 'The Classic Vow',
      price: 55000,
      is_exclusive: false,
      images: ['/products/ring-1.png', '/products/ring-2.png', '/products/ring-3.png']
    }
  ];

  return (
    <div className="fade-in">
      {/* Mini Header / Navigation */}
      <nav style={{ 
        padding: '2rem 0', 
        borderBottom: '1px solid var(--color-border)', 
        textAlign: 'center' 
      }}>
        <Link href="/">
          <h1 style={{ fontSize: '1.5rem', cursor: 'pointer' }}>{BRAND.name}</h1>
        </Link>
      </nav>

      <section className="container section-padding">
        <header style={{ marginBottom: '4rem', textAlign: 'center' }}>
          <p style={{ letterSpacing: '0.3em', textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--color-secondary)', marginBottom: '1rem' }}>
            Curated Selection
          </p>
          <h2 style={{ fontSize: '2.5rem' }}>The Collection</h2>
        </header>

        {/* Product Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
          gap: 'var(--space-md)',
          paddingBottom: 'var(--space-xl)'
        }}>
          {collection.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <footer style={{ padding: '4rem 0', backgroundColor: 'var(--color-bg-alt)', textAlign: 'center' }}>
        <p style={{ fontSize: '0.8rem', letterSpacing: '0.1em', color: 'var(--color-text-muted)' }}>
          © 2026 {BRAND.name} LUXURY.
        </p>
      </footer>
    </div>
  );
}
