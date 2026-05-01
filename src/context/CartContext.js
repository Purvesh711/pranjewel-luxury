'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { cartService } from '@/services/cartService';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Load cart from local storage on startup
  useEffect(() => {
    const savedCart = localStorage.getItem('pranjewel_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to load cart");
      }
    }
  }, []);

  // Save cart to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('pranjewel_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    const newCart = cartService.addToCart(cart, product);
    setCart(newCart);
    setIsDrawerOpen(true); // Open the drawer immediately for the "Wow" factor
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  const subtotal = cartService.calculateSubtotal(cart);
  const tax = cartService.calculateTax(subtotal);
  const total = cartService.calculateTotal(subtotal, tax);

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      clearCart,
      isDrawerOpen,
      toggleDrawer,
      subtotal,
      tax,
      total
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
