// Form validation utilities
const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const submitToAPI = async (formData, formType) => {
  // Simulate API call - replace with actual endpoint
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Success simulation
      console.log('Form submitted:', formType, formData);
      if (window.trackEvent) {
        window.trackEvent('form_submit', { form_type: formType });
      }
      resolve({ success: true });
      
      // For error testing: reject({ error: 'API Error' });
    }, 1500);
  });
};

// Make available globally
window.validateEmail = validateEmail;
window.submitToAPI = submitToAPI;
