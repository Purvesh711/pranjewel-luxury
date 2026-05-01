'use client';

import { useEffect, useState } from 'react';
import { BRAND } from "@/config/constants";
import ProductCard from "@/components/products/ProductCard";
import Link from "next/link";
import { productService } from "@/services/productService";

export default function Home() {
  const [signatureRing, setSignatureRing] = useState(null);

  useEffect(() => {
    async function loadFeatured() {
      try {
        const data = await productService.getAllProducts();
        const exclusive = data.find(p => p.is_exclusive) || data[0];
        
        if (exclusive) {
          setSignatureRing({
            ...exclusive,
            images: exclusive.product_images
              .sort((a, b) => a.display_order - b.display_order)
              .map(img => img.image_url)
          });
        }
      } catch (error) {
        console.error("Error loading featured piece:", error);
      }
    }
    loadFeatured();
  }, []);

  return (
    <div className="fade-in" style={{ overflowX: 'hidden' }}>
      {/* Hero Section */}
      <section style={{ 
        height: '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center',
        textAlign: 'center',
        padding: '0 20px',
        background: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("https://images.prodia.xyz/8f4b005c-76e3-4fec-86be-7301c8098c8c.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white'
      }}>
        <h1 style={{ 
          fontSize: 'clamp(2.5rem, 10vw, 5rem)', 
          color: 'white', 
          marginBottom: '1rem', 
          fontWeight: '300',
          width: '100%',
          maxWidth: '90vw'
        }}>
          {BRAND.name}
        </h1>
        <p style={{ 
          fontSize: 'clamp(0.7rem, 2vw, 1rem)', 
          letterSpacing: 'clamp(0.2em, 5vw, 0.5em)', 
          textTransform: 'uppercase', 
          marginBottom: '3rem', 
          opacity: 0.8,
          width: '100%',
          maxWidth: '90vw'
        }}>
          {BRAND.tagline}
        </p>
        <Link href="/collection">
          <button style={{
            padding: '1.2rem 4rem',
            border: '1px solid white',
            color: 'white',
            textTransform: 'uppercase',
            letterSpacing: '0.3em',
            backgroundColor: 'transparent',
            fontSize: '0.7rem',
            cursor: 'pointer',
            maxWidth: '100%'
          }}>
            Explore Collection
          </button>
        </Link>
      </section>

      {/* Signature Section */}
      <section className="container section-padding">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', marginBottom: '0.5rem' }}>The Signature Piece</h2>
          <div style={{ width: '40px', height: '1px', backgroundColor: 'var(--color-secondary)', margin: '0 auto' }}></div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', padding: '0 10px' }}>
          <div style={{ width: '100%', maxWidth: '500px' }}>
            {signatureRing && <ProductCard product={signatureRing} />}
          </div>
        </div>
      </section>

      {/* Footer Placeholder */}
      <footer style={{ padding: '4rem 0', backgroundColor: 'var(--color-bg-alt)', textAlign: 'center' }}>
        <p style={{ fontSize: '0.8rem', letterSpacing: '0.1em', color: 'var(--color-text-muted)' }}>
          © 2026 {BRAND.name} LUXURY. ALL RIGHTS RESERVED.
        </p>
      </footer>
    </div>
  );
}
