/**
 * Tracking Service
 * Handles Meta Pixel and UTM parameters for Instagram Marketing
 */
export const trackingService = {
  /**
   * Initialize Meta Pixel
   */
  initPixel(pixelId) {
    if (typeof window === 'undefined') return;
    
    // Standard Pixel Initialization Snippet
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    
    fbq('init', pixelId);
    fbq('track', 'PageView');
  },

  /**
   * Track a product view from Instagram
   */
  trackProductView(product) {
    if (typeof fbq === 'undefined') return;
    fbq('track', 'ViewContent', {
      content_name: product.name,
      content_category: 'Jewelry',
      content_ids: [product.id],
      content_type: 'product',
      value: product.price,
      currency: 'INR'
    });
  },

  /**
   * Capture UTM parameters from the URL
   */
  getUTMParams() {
    if (typeof window === 'undefined') return {};
    const urlParams = new URLSearchParams(window.location.search);
    return {
      source: urlParams.get('utm_source'),
      medium: urlParams.get('utm_medium'),
      campaign: urlParams.get('utm_campaign')
    };
  }
};
