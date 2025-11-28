import React, { useState, useEffect } from 'react';

export const EchoLoop = ({ isDark = true }) => {
  const [activeFlow, setActiveFlow] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFlow(prev => (prev + 1) % 3);
    }, 2000);
    return () => clearInterval(interval);
  }, []);
  
  const nodes = [
    {
      id: 'browser',
      icon: '🌐',
      label: 'Browser',
      color: 'from-teal-500 to-teal-600',
      stats: { events: '2.4M/day', latency: '12ms' }
    },
    {
      id: 'server',
      icon: '⚡',
      label: 'Server',
      color: 'from-violet-600 to-indigo-600',
      stats: { sync: '99.2%', drift: '<2%' }
    },
    {
      id: 'ads',
      icon: '📢',
      label: 'Ads Platform',
      color: 'from-blue-500 to-blue-600',
      stats: { replay: 'Auto', integrity: '98%' }
    }
  ];
  
  return (
    <section className={`py-32 relative overflow-hidden ${
      isDark ? 'bg-slate-950' : 'bg-white'
    }`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.05),transparent_70%)]" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 ${
            isDark ? 'glass-morphism' : 'glass-morphism-light'
          }`}>
            <div className="w-2 h-2 bg-violet-500 rounded-full animate-pulse" />
            <span className={`text-xs font-mono uppercase tracking-wider ${
              isDark ? 'text-violet-400' : 'text-indigo-700'
            }`}>
              Hybrid Engine
            </span>
          </div>
          <h2 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-indigo-400 to-blue-400">Dual-Pipeline Sync</span>
          </h2>
          <p className={`text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}>
            Browser ↔ Server ↔ Ads. Dual pipelines capture every event twice, deduplicate, and replay into ad networks.
          </p>
        </div>
        
        {/* Visualization */}
        <div className="relative">
          {/* Connection Lines - Desktop */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 -translate-y-1/2">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
            
            {/* Animated Particles */}
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full transition-all duration-1000 ${
                  activeFlow === i ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
                }`}
                style={{
                  left: `${i * 50}%`,
                  background: i === 0 ? '#10b981' : i === 1 ? '#6366f1' : '#3b82f6',
                  boxShadow: `0 0 20px ${i === 0 ? 'rgba(16,185,129,0.8)' : i === 1 ? 'rgba(99,102,241,0.8)' : 'rgba(59,130,246,0.8)'}`
                }}
              />
            ))}
          </div>
          
          {/* Nodes */}
          <div className="grid md:grid-cols-3 gap-8 md:gap-12 relative z-10">
            {nodes.map((node, index) => (
              <div key={node.id} className="flex flex-col items-center">
                {/* Node Circle */}
                <div className={`relative w-32 h-32 md:w-40 md:h-40 rounded-3xl bg-gradient-to-br ${node.color} shadow-2xl flex items-center justify-center mb-6 transition-all duration-500 hover:scale-110 ${
                  activeFlow === index ? 'ring-4 ring-white/30 scale-110' : ''
                }`}>
                  <div className="text-6xl">{node.icon}</div>
                  
                  {/* Pulse Effect */}
                  {activeFlow === index && (
                    <div className="absolute inset-0 rounded-3xl bg-white/20 animate-ping" />
                  )}
                </div>
                
                {/* Label */}
                <h3 className="text-2xl font-bold text-white mb-4">{node.label}</h3>
                
                {/* Stats Card */}
                <div className="glass-morphism rounded-2xl p-4 w-full">
                  {Object.entries(node.stats).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between mb-2 last:mb-0">
                      <span className="text-xs text-slate-500 uppercase font-mono">{key}</span>
                      <span className="text-sm font-semibold text-teal-400 font-mono">{value}</span>
                    </div>
                  ))}
                </div>
                
                {/* Arrow - Mobile Only */}
                {index < 2 && (
                  <div className="md:hidden my-6 text-slate-600">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* Process Steps */}
          <div className="mt-16 grid md:grid-cols-3 gap-6">
            {[
              {
                step: '01',
                title: 'Capture',
                desc: 'Event → Identity → Verify',
                color: 'emerald'
              },
              {
                step: '02',
                title: 'Process',
                desc: 'Deduplicate → Normalize → Sign',
                color: 'indigo'
              },
              {
                step: '03',
                title: 'Replay',
                desc: 'Replay → Train → Optimize',
                color: 'blue'
              }
            ].map((process, i) => (
              <div 
                key={process.step}
                className={`glass-morphism rounded-2xl p-6 transition-all duration-500 ${
                  activeFlow === i ? 'bg-white/10 scale-105' : ''
                }`}
              >
                <div className={`text-sm font-mono mb-2 ${
                  process.color === 'emerald' ? 'text-teal-400' :
                  process.color === 'indigo' ? 'text-violet-400' : 'text-blue-400'
                }`}>
                  STEP {process.step}
                </div>
                <h4 className="text-xl font-bold text-white mb-2">{process.title}</h4>
                <p className="text-sm text-slate-400 font-mono">{process.desc}</p>
              </div>
            ))}
          </div>
          
          {/* Stats Banner */}
          <div className="mt-16 glass-morphism-strong rounded-3xl p-8 grid md:grid-cols-4 gap-6 border-2 border-indigo-500/20">
            {[
              { label: 'Echo Stability', value: '97%', icon: '📊' },
              { label: 'Latency', value: '42ms', icon: '⚡' },
              { label: 'Sync Rate', value: '99.2%', icon: '🔄' },
              { label: 'Auto Replay', value: 'ON', icon: '✓' }
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
                <div className="text-xs text-slate-500 uppercase tracking-wider font-mono">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
