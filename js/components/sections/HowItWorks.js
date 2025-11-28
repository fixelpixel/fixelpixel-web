import React from 'react';

export const HowItWorks = ({ isDark = true }) => {
  const steps = [
    {
      number: '01',
      title: 'Install Pixel',
      description: 'One script tag. 5 minutes. Works with Shopify, WooCommerce, custom stacks.',
      icon: '⚡',
      color: 'teal'
    },
    {
      number: '02', 
      title: 'We Capture Everything',
      description: 'Server-side tracking + first-party cookies. iOS, Safari, ad-blockers — nothing escapes.',
      icon: '🎯',
      color: 'indigo'
    },
    {
      number: '03',
      title: 'See Real Attribution',
      description: 'AI weighs every touchpoint. No black-box guessing. Know exactly which ads drive revenue.',
      icon: '📊',
      color: 'emerald'
    }
  ];

  return (
    <section className={`py-24 relative overflow-hidden ${
      isDark ? 'bg-slate-900' : 'bg-white'
    }`}>
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-black mb-4 ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            How It <span className={`${
              isDark ? 'text-teal-400' : 'text-teal-600'
            }`}>Works</span>
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}>
            From broken analytics to crystal-clear attribution in 3 steps.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-6">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className={`flex items-start gap-6 p-6 rounded-2xl transition-all duration-300 ${
                isDark 
                  ? 'bg-slate-800/50 border border-slate-700/50 hover:border-slate-600' 
                  : 'bg-slate-50 border border-slate-200 hover:border-slate-300 hover:shadow-lg'
              }`}
            >
              {/* Number */}
              <div className={`flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center text-2xl font-black ${
                step.color === 'teal' 
                  ? (isDark ? 'bg-teal-500/10 text-teal-400' : 'bg-teal-50 text-teal-600')
                  : step.color === 'indigo'
                  ? (isDark ? 'bg-indigo-500/10 text-indigo-400' : 'bg-indigo-50 text-indigo-600')
                  : (isDark ? 'bg-emerald-500/10 text-emerald-400' : 'bg-emerald-50 text-emerald-600')
              }`}>
                {step.icon}
              </div>
              
              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className={`text-xs font-mono uppercase tracking-wider ${
                    isDark ? 'text-slate-600' : 'text-slate-500'
                  }`}>Step {step.number}</span>
                </div>
                <h3 className={`text-xl font-bold mb-2 ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>{step.title}</h3>
                <p className={`${
                  isDark ? 'text-slate-400' : 'text-slate-600'
                }`}>{step.description}</p>
              </div>

              {/* Arrow (except last) */}
              {i < steps.length - 1 && (
                <div className={`hidden md:flex items-center justify-center w-8 ${
                  isDark ? 'text-slate-700' : 'text-slate-300'
                }`}>
                  <svg className="w-6 h-6 rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className={`mt-12 grid grid-cols-3 gap-4 p-6 rounded-2xl ${
          isDark 
            ? 'bg-slate-800/30 border border-slate-700/30' 
            : 'bg-slate-50 border border-slate-200'
        }`}>
          <div className="text-center">
            <div className={`text-2xl md:text-3xl font-black ${
              isDark ? 'text-teal-400' : 'text-teal-600'
            }`}>5 min</div>
            <div className={`text-xs uppercase tracking-wider ${
              isDark ? 'text-slate-600' : 'text-slate-500'
            }`}>Setup Time</div>
          </div>
          <div className="text-center">
            <div className={`text-2xl md:text-3xl font-black ${
              isDark ? 'text-indigo-400' : 'text-indigo-600'
            }`}>99.1%</div>
            <div className={`text-xs uppercase tracking-wider ${
              isDark ? 'text-slate-600' : 'text-slate-500'
            }`}>Data Accuracy</div>
          </div>
          <div className="text-center">
            <div className={`text-2xl md:text-3xl font-black ${
              isDark ? 'text-emerald-400' : 'text-emerald-600'
            }`}>+2.1x</div>
            <div className={`text-xs uppercase tracking-wider ${
              isDark ? 'text-slate-600' : 'text-slate-500'
            }`}>Avg ROAS Lift</div>
          </div>
        </div>
      </div>
    </section>
  );
};
