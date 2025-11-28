import React from 'react';

export const FinalCTA = ({ TrialFormButton, DemoFormButton, isDark = true }) => {
  return (
    <section className={`py-32 relative overflow-hidden ${
      isDark
        ? 'bg-gradient-to-b from-slate-900 to-slate-950'
        : 'bg-gradient-to-b from-slate-50 to-white'
    }`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1),transparent_70%)]" />
      
      <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10">
        <div className={`rounded-3xl p-12 md:p-16 text-center border-2 border-teal-500/20 bg-gradient-to-br from-teal-500/5 to-indigo-500/5 ${
          isDark ? 'glass-morphism-strong' : 'bg-white shadow-2xl'
        }`}>
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 ${
            isDark ? 'glass-morphism' : 'glass-morphism-light'
          }`}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
            </span>
            <span className={`text-xs font-mono tracking-wider uppercase ${
              isDark ? 'text-emerald-300' : 'text-emerald-700'
            }`}>
              Limited Time Offer
            </span>
          </div>
          
          <h2 className={`text-4xl sm:text-5xl md:text-6xl font-black mb-6 ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            Ready to See the <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-indigo-400">Truth</span>?
          </h2>
          
          <p className={`text-lg sm:text-xl mb-12 max-w-2xl mx-auto ${
            isDark ? 'text-slate-300' : 'text-slate-600'
          }`}>
            Join 2,000+ growth teams who stopped guessing and started growing with AI-powered attribution.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <TrialFormButton location="final_cta" />
            <DemoFormButton location="final_cta" variant="secondary" />
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <span className="text-teal-400 text-lg">✓</span>
              <span>14-day free trial</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-teal-400 text-lg">✓</span>
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-teal-400 text-lg">✓</span>
              <span>Setup in 5 minutes</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-teal-400 text-lg">✓</span>
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
