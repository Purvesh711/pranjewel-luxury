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
  },
  /**
   * Create a new product with images
   */
  async createProduct(productData, images) {
    // 1. Insert the product
    const { data: product, error: pError } = await supabase
      .from('products')
      .insert([productData])
      .select()
      .single();

    if (pError) throw pError;

    // 2. Insert the images
    if (images && images.length > 0) {
      const imageData = images.map((url, index) => ({
        product_id: product.id,
        image_url: url,
        display_order: index + 1
      }));

      const { error: iError } = await supabase
        .from('product_images')
        .insert(imageData);

      if (iError) throw iError;
    }

    return product;
  },

  /**
   * Fetch all categories
   */
  async getCategories() {
    const { data, error } = await supabase
      .from('categories')
      .select('*');

    if (error) throw error;
    return data;
  }
};
