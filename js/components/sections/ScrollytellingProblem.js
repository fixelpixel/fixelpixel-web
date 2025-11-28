import React, { useRef, useState, useEffect } from 'react';
import { trackEvent } from '../../utils/analytics.js';

export const ScrollytellingProblem = ({ isDark = true }) => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const currentRef = sectionRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (!entry.target.dataset.tracked) {
            trackEvent('view_section', { section: 'scrollytelling_problem' });
            entry.target.dataset.tracked = 'true';
          }
        }
      },
      { threshold: 0.2 }
    );
    
    if (currentRef) {
      observer.observe(currentRef);
    }
    
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);
  
  const problems = [
    {
      icon: '🧩',
      title: 'Fragmented Reality',
      stat: '5 Platforms',
      statLabel: '0 Truths',
      description: 'Meta says 10 sales. Google says 12. Shopify says 8. Every platform claims credit for the same sale. You have no single source of truth.',
      illusion: 'Conflicting reports',
      truth: 'Unified Data Layer'
    },
    {
      icon: '📉',
      title: 'Signal Decay',
      stat: '30-40%',
      statLabel: 'Data Loss',
      description: 'iOS 17, AdBlockers, and cookie restrictions are killing browser tracking. Your pixels are firing blanks.',
      illusion: 'Browser tracking',
      truth: 'Server-Side API'
    },
    {
      icon: '🙈',
      title: 'Blind Optimization',
      stat: '???',
      statLabel: 'Wasted Ad Spend',
      description: 'Without accurate data, your AI ad algorithms are flying blind. You are scaling losers and cutting winners.',
      illusion: 'Guesswork',
      truth: 'AI-Guided Growth'
    }
  ];
  
  return (
    <section 
      ref={sectionRef}
      className={`py-32 relative overflow-hidden ${
        isDark
          ? 'bg-gradient-to-b from-slate-950 to-slate-900'
          : 'bg-gradient-to-b from-white to-slate-50'
      }`}
    >
      {/* Background grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: isDark
            ? 'linear-gradient(rgba(16,185,129,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.1) 1px, transparent 1px)'
            : 'linear-gradient(rgba(5,150,105,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(5,150,105,0.08) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-black mb-4 ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            You're Optimizing Toward a <span className={`${
              isDark ? 'text-red-400' : 'text-red-600'
            }`}>Lie</span>
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}>
            Traditional analytics can't see what's actually happening. Here's what they're hiding.
          </p>
        </div>
        
        {/* Problem Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {problems.map((problem, index) => (
            <div
              key={problem.title}
              className={`rounded-2xl p-6 transition-all duration-500 ${
                isDark 
                  ? 'bg-slate-800/50 border border-slate-700/50 hover:border-slate-600' 
                  : 'bg-white border border-slate-200 shadow-lg hover:shadow-xl'
              } ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`}
              style={{
                transitionDelay: `${index * 100}ms`
              }}
            >
              {/* Icon */}
              <div className="text-6xl mb-6 animate-float" style={{
                animationDelay: `${index * 0.2}s`
              }}>
                {problem.icon}
              </div>
              
              {/* Title */}
              <h3 className={`text-2xl font-bold mb-2 ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                {problem.title}
              </h3>
              
              {/* Stat */}
              <div className="mb-6">
                <div className={`text-4xl font-black mb-1 ${
                  isDark ? 'text-red-400' : 'text-red-600'
                }`}>
                  {problem.stat}
                </div>
                <div className={`text-sm font-mono uppercase tracking-wider ${
                  isDark ? 'text-slate-500' : 'text-slate-600'
                }`}>
                  {problem.statLabel}
                </div>
              </div>
              
              {/* Description */}
              <p className={`mb-6 leading-relaxed ${
                isDark ? 'text-slate-400' : 'text-slate-600'
              }`}>
                {problem.description}
              </p>
              
              {/* Comparison */}
              <div className={`space-y-3 pt-6 border-t ${
                isDark ? 'border-slate-700/50' : 'border-slate-200'
              }`}>
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center">
                    <span className={isDark ? 'text-red-400 text-xs' : 'text-red-600 text-xs'}>✗</span>
                  </div>
                  <span className={`text-sm line-through ${
                    isDark ? 'text-slate-500' : 'text-slate-500'
                  }`}>
                    {problem.illusion}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-500/20 flex items-center justify-center">
                    <span className={isDark ? 'text-teal-400 text-xs' : 'text-teal-600 text-xs'}>✓</span>
                  </div>
                  <span className={`text-sm font-medium ${
                    isDark ? 'text-teal-400' : 'text-emerald-700'
                  }`}>
                    {problem.truth}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Comparison Table */}
        <div 
          className={`rounded-3xl p-8 md:p-12 transition-all duration-1000 ${
            isDark ? 'glass-morphism-strong' : 'bg-white shadow-lg border border-slate-200'
          } ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: '400ms' }}
        >
          <div className="text-center mb-12">
            <h3 className={`text-3xl font-bold mb-3 ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              Illusion vs Truth
            </h3>
            <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>
              What traditional analytics show you vs what Fixel Pixel reveals
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Illusion Mode */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <h4 className={`text-xl font-bold ${
                  isDark ? 'text-red-400' : 'text-red-600'
                }`}>Illusion Mode</h4>
              </div>
              {[
                { label: 'Event Capture', value: '60%' },
                { label: 'Attribution Accuracy', value: '47%' },
                { label: 'Signal Drift', value: '35%' },
                { label: 'Data Integrity', value: '65%' }
              ].map((metric) => (
                <div key={metric.label} className={`flex items-center justify-between p-4 rounded-xl border ${
                  isDark
                    ? 'bg-slate-900/50 border-red-500/10'
                    : 'bg-red-50 border-red-200/50'
                }`}>
                  <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>{metric.label}</span>
                  <span className={`font-mono font-bold ${
                    isDark ? 'text-red-400' : 'text-red-600'
                  }`}>{metric.value}</span>
                </div>
              ))}
            </div>
            
            {/* Truth Mode */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 rounded-full bg-teal-500" />
                <h4 className={`text-xl font-bold ${
                  isDark ? 'text-teal-400' : 'text-emerald-700'
                }`}>Truth Mode</h4>
              </div>
              {[
                { label: 'Event Capture', value: '98%' },
                { label: 'Attribution Accuracy', value: '94%' },
                { label: 'Signal Drift', value: '2%' },
                { label: 'Data Integrity', value: '99%' }
              ].map((metric) => (
                <div key={metric.label} className={`flex items-center justify-between p-4 rounded-xl border ${
                  isDark
                    ? 'bg-slate-900/50 border-teal-500/10'
                    : 'bg-emerald-50 border-emerald-200/50'
                }`}>
                  <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>{metric.label}</span>
                  <span className={`font-mono font-bold ${
                    isDark ? 'text-teal-400' : 'text-emerald-700'
                  }`}>{metric.value}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* CTA */}
          <div className="mt-12 text-center">
            <button className="px-8 py-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-bold rounded-xl hover:scale-105 transition-all duration-300 shadow-[0_20px_60px_rgba(16,185,129,0.4)]">
              See Your Truth →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
