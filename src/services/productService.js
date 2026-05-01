import { supabase } from '@/lib/supabase';

/**
 * Product Service
 * Handles all logic for fetching jewelry data
 */
export const productService = {
  /**
   * Fetch all products with their categories
   */
  async getAllProducts() {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        categories (name, slug),
        product_images (image_url, display_order)
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  /**
   * Fetch a single product by its slug (name)
   */
  async getProductBySlug(slug) {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        categories (name, slug),
        product_images (image_url, display_order)
      `)
      .eq('slug', slug)
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Fetch products by category
   */
  async getProductsByCategory(categorySlug) {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        categories!inner(slug),
        product_images (image_url, display_order)
      `)
      .eq('categories.slug', categorySlug);

    if (error) throw error;
    return data;
  }
};
