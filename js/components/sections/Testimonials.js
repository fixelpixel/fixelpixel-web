import React from 'react';

export const Testimonials = ({ isDark = true }) => {
  const testimonials = [
    {
      quote: "We discovered $1.2M in revenue that GA4 couldn't see. Fixel paid for itself in 3 days.",
      name: "Sarah Chen",
      role: "CMO",
      company: "NovaTech",
      metric: "+105%",
      metricLabel: "ROAS"
    },
    {
      quote: "Finally, we stopped pouring money into 'well-performing' campaigns that were actually losing us money.",
      name: "Marcus Williams",
      role: "Growth Lead",
      company: "Stride",
      metric: "$1.2M",
      metricLabel: "Recovered"
    },
    {
      quote: "iOS 14 killed our tracking. Fixel brought it back. 87% of 'lost' users recovered.",
      name: "Elena Rodriguez",
      role: "CEO",
      company: "BeautyBox",
      metric: "87%",
      metricLabel: "iOS Coverage"
    }
  ];
  
  return (
    <section className={`py-24 relative overflow-hidden ${
      isDark ? 'bg-slate-900' : 'bg-slate-50'
    }`}>
      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-black mb-4 ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            They Stopped <span className={`${
              isDark ? 'text-red-400' : 'text-red-600'
            }`}>Guessing</span>
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}>
            Growth teams who switched from "modeled" to measured.
          </p>
        </div>
        
        {/* Testimonial Grid - 3 columns */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] ${
                isDark 
                  ? 'bg-slate-800/50 border border-slate-700/50 hover:border-slate-600' 
                  : 'bg-white border border-slate-200 shadow-lg hover:shadow-xl'
              }`}
            >
              {/* Metric Badge */}
              <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4 ${
                isDark ? 'bg-teal-500/10' : 'bg-teal-50'
              }`}>
                <span className={`text-xl font-black ${
                  isDark ? 'text-teal-400' : 'text-teal-600'
                }`}>{t.metric}</span>
                <span className={`text-xs font-mono uppercase ${
                  isDark ? 'text-teal-400/70' : 'text-teal-600/70'
                }`}>{t.metricLabel}</span>
              </div>
              
              {/* Quote */}
              <p className={`text-base leading-relaxed mb-6 ${
                isDark ? 'text-slate-300' : 'text-slate-700'
              }`}>
                "{t.quote}"
              </p>
              
              {/* Author */}
              <div className={`pt-4 border-t ${
                isDark ? 'border-slate-700/50' : 'border-slate-200'
              }`}>
                <div className={`font-semibold ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>{t.name}</div>
                <div className={`text-sm ${
                  isDark ? 'text-slate-500' : 'text-slate-600'
                }`}>{t.role}, {t.company}</div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Trust Bar */}
        <div className={`mt-12 pt-8 border-t text-center ${
          isDark ? 'border-slate-800' : 'border-slate-200'
        }`}>
          <p className={`text-sm font-mono uppercase tracking-wider ${
            isDark ? 'text-slate-600' : 'text-slate-500'
          }`}>
            Trusted by 200+ eCommerce brands • $50M+ revenue recovered
          </p>
        </div>
      </div>
    </section>
  );
};
