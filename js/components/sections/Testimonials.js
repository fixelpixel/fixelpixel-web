import React from 'react';

export const Testimonials = ({ isDark = true }) => {
  const testimonials = [
    {
      quote: "Fixel revealed 42% of revenue we didn't know existed. Our Google Ads ROAS went from 2.1x to 4.3x in 60 days.",
      name: "Sarah Chen",
      role: "CMO",
      company: "NovaTech",
      avatar: "👩‍💼",
      stat: "+105% ROAS"
    },
    {
      quote: "We were flying blind with modeled conversions. Fixel showed us our actual customer journey—game changer.",
      name: "Marcus Williams",
      role: "Growth Lead",
      company: "Stride Footwear",
      avatar: "👨‍💻",
      stat: "$1.2M Recovered"
    },
    {
      quote: "The Dual-Pipeline Sync is genius. We finally trust our attribution data. No more guessing, just facts.",
      name: "Elena Rodriguez",
      role: "CEO",
      company: "BeautyBox",
      avatar: "👩‍🔬",
      stat: "99.2% Sync Rate"
    },
    {
      quote: "Identity Lock changed everything. We can track users across iOS Safari, sessions, even after cookie deletion.",
      name: "Tom Anderson",
      role: "Data Director",
      company: "HomeGoods Plus",
      avatar: "👨‍🎓",
      stat: "87% iOS Coverage"
    }
  ];
  
  return (
    <section className={`py-32 relative overflow-hidden ${
      isDark ? 'bg-slate-950' : 'bg-white'
    }`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.03),transparent_70%)]" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-morphism mb-6">
            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
            <span className="text-xs font-mono text-indigo-400 uppercase tracking-wider">
              Social Proof
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6">
            Built by <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400">Practitioners</span>
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto">
            Trusted by growth teams who refuse to waste ad spend on broken attribution.
          </p>
        </div>
        
        {/* Testimonial Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {testimonials.map((testimonial, i) => (
            <div
              key={i}
              className="glass-morphism rounded-3xl p-8 border border-slate-700/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-indigo-500/10 hover:border-indigo-500/30"
            >
              {/* Quote */}
              <div className="mb-6">
                <div className="text-6xl text-indigo-500/20 mb-4 leading-none">"</div>
                <p className="text-lg text-slate-300 leading-relaxed">
                  {testimonial.quote}
                </p>
              </div>
              
              {/* Author */}
              <div className="flex items-center justify-between border-t border-slate-700/50 pt-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-indigo-600/10 flex items-center justify-center text-3xl">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-white">{testimonial.name}</div>
                    <div className="text-sm text-slate-500">
                      {testimonial.role}, {testimonial.company}
                    </div>
                  </div>
                </div>
                
                {/* Stat Badge */}
                <div className="glass-morphism px-4 py-2 rounded-xl border border-emerald-500/20">
                  <div className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-1">Result</div>
                  <div className="text-sm font-bold text-emerald-400">{testimonial.stat}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* CTA Banner */}
        <div className="mt-16 glass-morphism-strong rounded-3xl p-12 text-center border-2 border-indigo-500/20 bg-gradient-to-br from-indigo-500/5 to-blue-500/5">
          <h3 className="text-4xl font-black text-white mb-4">
            Join 200+ Growth Teams
          </h3>
          <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
            Stop guessing. Start growing with AI-powered attribution that actually works.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-emerald-500/50 transition-all duration-300 hover:scale-105">
              Start Free Trial →
            </button>
            <button className="px-8 py-4 glass-morphism text-white font-bold rounded-2xl border border-slate-700 hover:border-indigo-500/50 transition-all duration-300 hover:scale-105">
              Book a Demo
            </button>
          </div>
          <div className="mt-6 flex items-center justify-center gap-8 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <span className="text-emerald-400">✓</span>
              <span>No credit card</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-400">✓</span>
              <span>14-day free trial</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-400">✓</span>
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
