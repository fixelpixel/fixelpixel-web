// Analytics utilities
const trackEvent = (eventName, eventData = {}) => {
  // Google Analytics 4
  if (typeof gtag !== 'undefined') {
    gtag('event', eventName, eventData);
  }
  
  // Facebook Pixel
  if (typeof fbq !== 'undefined') {
    fbq('track', eventName, eventData);
  }
  
  // Console log for debugging
  console.log('Analytics Event:', eventName, eventData);
};

// Make available globally
window.trackEvent = trackEvent;
