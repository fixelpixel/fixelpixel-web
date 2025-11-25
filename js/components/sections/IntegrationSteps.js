import React from 'react';

export const IntegrationSteps = ({ isDark = true }) => {
  const steps = [
    {
      number: "01",
      title: "Install Pixel",
      description: "One-click install for Shopify, WordPress, or GTM. No coding required.",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
      )
    },
    {
      number: "02",
      title: "Auto-Discovery",
      description: "Fixel scans your site and maps all conversion events automatically.",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      )
    },
    {
      number: "03",
      title: "Profit",
      description: "Watch your ROAS climb as signals feed back into ad platforms.",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    }
  ];

  const platforms = [
    { name: "Shopify", color: "#96bf48" },
    { name: "WordPress", color: "#21759b" },
    { name: "GTM", color: "#4285f4" },
    { name: "WooCommerce", color: "#96588a" },
    { name: "Magento", color: "#ee672f" },
    { name: "Custom", color: "#64748b" }
  ];

  return (
    <section className={`py-24 relative overflow-hidden ${
      isDark ? 'bg-slate-950' : 'bg-white'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            Setup in 5 minutes
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}>
            Integrates seamlessly with your existing stack. No developer needed.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {steps.map((step, index) => (
            <div key={index} className={`relative p-8 rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${
              isDark 
                ? 'bg-slate-900/50 border-slate-800 hover:border-emerald-500/30' 
                : 'bg-white border-slate-200 shadow-lg hover:shadow-xl'
            }`}>
              <div className={`absolute -top-4 -left-4 w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl shadow-lg ${
                isDark 
                  ? 'bg-slate-800 text-emerald-400 border border-slate-700' 
                  : 'bg-white text-emerald-600 border border-slate-100'
              }`}>
                {step.number}
              </div>
              
              <div className={`mb-6 mt-2 ${
                isDark ? 'text-emerald-400' : 'text-emerald-600'
              }`}>
                {step.icon}
              </div>
              
              <h3 className={`text-xl font-bold mb-3 ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                {step.title}
              </h3>
              
              <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Platforms */}
        <div className="text-center">
          <p className={`text-sm font-mono uppercase tracking-wider mb-8 ${
            isDark ? 'text-slate-500' : 'text-slate-400'
          }`}>
            Supported Platforms
          </p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
            {platforms.map((platform) => (
              <div key={platform.name} className={`px-6 py-3 rounded-full border flex items-center gap-2 ${
                isDark 
                  ? 'bg-slate-900 border-slate-800 text-slate-300' 
                  : 'bg-slate-50 border-slate-200 text-slate-600'
              }`}>
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: platform.color }}></div>
                <span className="font-semibold">{platform.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
