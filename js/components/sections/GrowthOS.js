import React from 'react';

export const GrowthOS = () => {
  const tiers = [
    {
      id: 'tracking',
      name: 'Tracking Layer',
      icon: '📡',
      color: 'emerald',
      gradient: 'from-emerald-500/10 to-emerald-600/5',
      borderColor: 'border-emerald-500/20',
      features: [
        { text: '100% Event Capture', icon: '✓' },
        { text: 'Identity Lock™', icon: '🔐' },
        { text: 'Real-time Sync', icon: '⚡' },
        { text: 'Browser + Server Pipelines', icon: '🔄' }
      ]
    },
    {
      id: 'intelligence',
      name: 'Intelligence Layer',
      icon: '🧠',
      color: 'indigo',
      gradient: 'from-indigo-500/10 to-indigo-600/5',
      borderColor: 'border-indigo-500/20',
      features: [
        { text: 'AI Attribution Model', icon: '🎯' },
        { text: 'LTV Prediction', icon: '📈' },
        { text: 'Channel Analysis', icon: '🔍' },
        { text: 'Causal Weight Engine', icon: '⚖️' }
      ]
    },
    {
      id: 'decisions',
      name: 'Decision Layer',
      icon: '🚀',
      color: 'blue',
      gradient: 'from-blue-500/10 to-blue-600/5',
      borderColor: 'border-blue-500/20',
      features: [
        { text: 'Auto Budget Optimization', icon: '💰' },
        { text: 'Revenue Forecasting', icon: '🔮' },
        { text: 'AI Advisor', icon: '🤖' },
        { text: 'One-Click Actions', icon: '⚡' }
      ]
    }
  ];
  
  return (
    <section className="py-32 bg-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.03),transparent_70%)]" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-morphism mb-6">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
              3-Tier Architecture
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6">
            Growth <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">OS</span>
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto">
            Not just a pixel. A complete operating system for revenue intelligence and decision automation.
          </p>
        </div>
        
        {/* Bento Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={`glass-morphism rounded-3xl p-8 border-2 ${tier.borderColor} bg-gradient-to-br ${tier.gradient} transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-${tier.color}-500/20`}
            >
              {/* Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${
                  tier.color === 'emerald' ? 'from-emerald-500 to-emerald-600' :
                  tier.color === 'indigo' ? 'from-indigo-500 to-indigo-600' : 'from-blue-500 to-blue-600'
                } flex items-center justify-center text-3xl shadow-lg`}>
                  {tier.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{tier.name}</h3>
                  <div className={`text-xs font-mono uppercase tracking-wider ${
                    tier.color === 'emerald' ? 'text-emerald-400' :
                    tier.color === 'indigo' ? 'text-indigo-400' : 'text-blue-400'
                  }`}>
                    Layer {tier.id === 'tracking' ? '01' : tier.id === 'intelligence' ? '02' : '03'}
                  </div>
                </div>
              </div>
              
              {/* Features */}
              <div className="space-y-4">
                {tier.features.map((feature, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 group"
                  >
                    <div className={`flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br ${
                      tier.color === 'emerald' ? 'from-emerald-500/20 to-emerald-600/10' :
                      tier.color === 'indigo' ? 'from-indigo-500/20 to-indigo-600/10' : 'from-blue-500/20 to-blue-600/10'
                    } flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
                      <span className="text-sm">{feature.icon}</span>
                    </div>
                    <span className="text-slate-300 group-hover:text-white transition-colors duration-300">
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>
              
              {/* Bottom Badge */}
              <div className={`mt-8 pt-6 border-t ${
                tier.color === 'emerald' ? 'border-emerald-500/10' :
                tier.color === 'indigo' ? 'border-indigo-500/10' : 'border-blue-500/10'
              }`}>
                <div className="text-xs font-mono text-slate-500 uppercase tracking-wider">
                  Status: <span className={`${
                    tier.color === 'emerald' ? 'text-emerald-400' :
                    tier.color === 'indigo' ? 'text-indigo-400' : 'text-blue-400'
                  } font-bold`}>Active</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Integration Diagram */}
        <div className="mt-16 glass-morphism-strong rounded-3xl p-8 border-2 border-slate-700/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1 text-center md:text-left">
              <h4 className="text-2xl font-bold text-white mb-2">Unified Intelligence</h4>
              <p className="text-slate-400">All three layers work in concert, feeding data upward and actions downward.</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg">
                  <span className="text-xl">📡</span>
                </div>
                <div className="text-xs text-slate-500 font-mono">Track</div>
              </div>
              <div className="text-slate-600 text-2xl">→</div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center shadow-lg">
                  <span className="text-xl">🧠</span>
                </div>
                <div className="text-xs text-slate-500 font-mono">Analyze</div>
              </div>
              <div className="text-slate-600 text-2xl">→</div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                  <span className="text-xl">🚀</span>
                </div>
                <div className="text-xs text-slate-500 font-mono">Act</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
