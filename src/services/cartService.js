/**
 * Cart Service
 * Logic for managing the shopping bag and calculating totals
 */
export const cartService = {
  /**
   * Add an item to the local cart
   */
  addToCart(cart, product) {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      return cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    }
    return [...cart, { ...product, quantity: 1 }];
  },

  /**
   * Calculate the subtotal of the cart
   */
  calculateSubtotal(cart) {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  },

  /**
   * Calculate taxes (e.g., GST in India)
   */
  calculateTax(subtotal) {
    const GST_RATE = 0.03; // 3% for Jewelry
    return subtotal * GST_RATE;
  },

  /**
   * Final Total
   */
  calculateTotal(subtotal, tax) {
    return subtotal + tax;
  }
};
