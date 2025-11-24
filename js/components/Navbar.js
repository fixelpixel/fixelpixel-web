import React, { useState, useEffect } from 'react';
import { trackEvent } from '../utils/analytics.js';
import { FixelDynamicLogo } from './FixelDynamicLogo.js';

export const Navbar = ({ isDark = true, toggleTheme }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [menuOpen]);
  
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [menuOpen]);
  
  const navLinks = [
    { label: 'Product', href: '#product' },
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Docs', href: '#docs' },
    { label: 'Blog', href: '#blog' }
  ];
  
  return (
    <>
      <nav
        role="navigation"
        aria-label="Main navigation"
        className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b transition-colors duration-300 ${
          isDark 
            ? 'bg-slate-950/80 border-slate-800/50' 
            : 'bg-white/80 border-slate-200'
        }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="#" className="flex items-center">
              <FixelDynamicLogo isDark={isDark} />
            </a>
            
            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-slate-400 hover:text-white transition-colors font-medium"
                >
                  {link.label}
                </a>
              ))}
            </div>
            
            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-4">
              {toggleTheme && (
                <button
                  onClick={toggleTheme}
                  className={`p-2 rounded-full transition-colors ${
                    isDark 
                      ? 'bg-slate-800 text-yellow-400 hover:bg-slate-700' 
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                  aria-label="Toggle theme"
                >
                  {isDark ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="5"></circle>
                      <line x1="12" y1="1" x2="12" y2="3"></line>
                      <line x1="12" y1="21" x2="12" y2="23"></line>
                      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                      <line x1="1" y1="12" x2="3" y2="12"></line>
                      <line x1="21" y1="12" x2="23" y2="12"></line>
                      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                    </svg>
                  )}
                </button>
              )}
              <button
                onClick={() => trackEvent('click_signin', { location: 'navbar' })}
                className="px-6 py-2 text-white font-semibold hover:text-emerald-400 transition-colors">
                Sign In
              </button>
              <button
                onClick={() => trackEvent('click_start_trial', { location: 'navbar' })}
                className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-emerald-500/50 transition-all duration-300 hover:scale-105">
                Start Free →
              </button>
            </div>
            
            {/* Mobile Hamburger */}
            <button
              onClick={() => setMenuOpen(true)}
              className="md:hidden w-10 h-10 flex items-center justify-center text-white hover:text-emerald-400 transition-colors"
              aria-label="Open navigation menu"
              aria-expanded={menuOpen}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>
      
      {/* Mobile Sidebar */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`fixed top-0 right-0 h-full w-80 bg-slate-950 border-l border-slate-800 z-50 transition-transform duration-300 ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6">
          {/* Close Button */}
          <div className="flex justify-end mb-8">
            <button
              onClick={() => setMenuOpen(false)}
              className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
              aria-label="Close navigation menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Mobile Links */}
          <div className="space-y-6">
            {navLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block text-2xl font-bold text-slate-400 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
          
          {/* Mobile CTA */}
          <div className="mt-12 space-y-4">
            <button
              onClick={() => setMenuOpen(false)}
              className="w-full px-6 py-3 text-white font-semibold border border-slate-700 rounded-xl hover:border-slate-600 transition-colors"
            >
              Sign In
            </button>
            <button
              onClick={() => setMenuOpen(false)}
              className="w-full px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold rounded-xl shadow-lg"
            >
              Start Free →
            </button>
          </div>
        </div>
      </div>
      
      {/* Backdrop */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
};
