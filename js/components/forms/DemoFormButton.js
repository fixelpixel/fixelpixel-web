import React, { useState } from 'react';
import { trackEvent } from '../utils/analytics.js';
import { validateEmail, submitToAPI } from '../utils/validation.js';

export const DemoFormButton = ({ location }) => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    website: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validation
    if (!formData.name.trim()) {
      setError('Please enter your name');
      return;
    }
    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }
    if (!formData.company.trim()) {
      setError('Please enter your company name');
      return;
    }
    
    setLoading(true);
    
    try {
      await submitToAPI(formData, 'demo_request');
      setSuccess(true);
      trackEvent('demo_request_success', { location });
      setTimeout(() => {
        setShowModal(false);
        setSuccess(false);
        setFormData({
          name: '',
          email: '',
          company: '',
          website: '',
          message: ''
        });
      }, 2000);
    } catch (err) {
      setError('Something went wrong. Please try again.');
      trackEvent('demo_request_error', { location });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <>
      <button
        onClick={() => {
          setShowModal(true);
          trackEvent('click_book_demo', { location });
        }}
        aria-label="Book a demo"
        className="btn-magnetic ripple group px-8 py-4 min-h-[44px] min-w-[44px] bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold rounded-2xl border-2 border-white/20 hover:border-white/30 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white/20"
      >
        <span className="flex items-center gap-3">
          Book Demo
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </span>
      </button>
      
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          />
          
          <div className="relative glass-morphism-strong rounded-3xl p-8 max-w-lg w-full border-2 border-indigo-500/20 shadow-2xl max-h-[90vh] overflow-y-auto">
            {!success ? (
              <>
                <button
                  onClick={() => setShowModal(false)}
                  className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
                  aria-label="Close modal"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">Book Your Demo</h3>
                  <p className="text-slate-400 text-sm">We'll show you how Fixel can transform your attribution</p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label htmlFor="demo-name" className="block text-sm font-medium text-slate-300 mb-2">
                        Full Name *
                      </label>
                      <input
                        id="demo-name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    
                    <div className="col-span-2">
                      <label htmlFor="demo-email" className="block text-sm font-medium text-slate-300 mb-2">
                        Work Email *
                      </label>
                      <input
                        id="demo-email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        placeholder="john@company.com"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="demo-company" className="block text-sm font-medium text-slate-300 mb-2">
                        Company *
                      </label>
                      <input
                        id="demo-company"
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({...formData, company: e.target.value})}
                        className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        placeholder="Acme Inc."
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="demo-website" className="block text-sm font-medium text-slate-300 mb-2">
                        Website
                      </label>
                      <input
                        id="demo-website"
                        type="url"
                        value={formData.website}
                        onChange={(e) => setFormData({...formData, website: e.target.value})}
                        className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        placeholder="https://..."
                      />
                    </div>
                    
                    <div className="col-span-2">
                      <label htmlFor="demo-message" className="block text-sm font-medium text-slate-300 mb-2">
                        Tell us about your needs (optional)
                      </label>
                      <textarea
                        id="demo-message"
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        rows={3}
                        className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
                        placeholder="What are your biggest attribution challenges?"
                      />
                    </div>
                  </div>
                  
                  {error && (
                    <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-xl text-red-400 text-sm">
                      {error}
                    </div>
                  )}
                  
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-indigo-400 hover:to-indigo-500 disabled:from-slate-600 disabled:to-slate-700 text-white font-semibold rounded-xl transition-all duration-300 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Booking Demo...' : 'Book Demo'}
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-violet-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Demo Scheduled!</h3>
                <p className="text-slate-400">We'll reach out shortly to confirm your demo time</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
