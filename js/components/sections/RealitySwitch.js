import React, { useState, useRef, useEffect } from 'react';

const RealitySwitchMetric = ({ label, value, suffix, mode, isAnimating, color, inverse, icon, isDark }) => {
  const [displayValue, setDisplayValue] = useState(value);
  const prevValueRef = useRef(value);
  
  useEffect(() => {
    const prevValue = prevValueRef.current;
    
    if (value !== prevValue) {
      const duration = 600;
      const steps = 30;
      const increment = (value - prevValue) / steps;
      let currentStep = 0;
      
      const timer = setInterval(() => {
        currentStep++;
        if (currentStep <= steps) {
          setDisplayValue(prevValue + (increment * currentStep));
        } else {
          setDisplayValue(value);
          clearInterval(timer);
        }
      }, duration / steps);
      
      prevValueRef.current = value;
      return () => clearInterval(timer);
    }
  }, [value]);
  
  const progressPercent = inverse ? 100 - value : value;
  const colorClass = color === 'emerald' ? 'from-emerald-500 to-emerald-600' : 'from-red-500 to-orange-500';
  
  return (
    <div className={`rounded-3xl p-8 transition-all duration-500 ${
      isDark ? 'glass-morphism' : 'glass-morphism-light'
    } ${
      isAnimating ? 'scale-95' : 'scale-100 hover:scale-105'
    }`}>
      <div className="text-4xl mb-4">{icon}</div>
      <div className={`text-sm font-mono uppercase tracking-wider mb-2 ${
        isDark ? 'text-slate-500' : 'text-slate-600'
      }`}>
        {label}
      </div>
      <div className={`text-5xl font-black mb-4 transition-colors duration-500 ${
        color === 'emerald' 
          ? (isDark ? 'text-emerald-400' : 'text-emerald-600')
          : (isDark ? 'text-red-400' : 'text-red-600')
      }`}>
        {displayValue.toFixed(1)}{suffix}
      </div>
      
      {/* Progress Bar */}
      <div className={`relative w-full h-2 rounded-full overflow-hidden ${
        isDark ? 'bg-slate-800' : 'bg-slate-200'
      }`}>
        <div 
          className={`h-full bg-gradient-to-r ${colorClass} transition-all duration-700 ease-out rounded-full`}
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
};

export const RealitySwitch = ({ isDark = true }) => {
  const [mode, setMode] = useState('illusion');
  const [isAnimating, setIsAnimating] = useState(false);
  
  const metrics = {
    illusion: {
      roas: 2.1,
      visibility: 60,
      drift: 35,
      integrity: 65
    },
    truth: {
      roas: 4.2,
      visibility: 98,
      drift: 2,
      integrity: 99
    }
  };
  
  const currentMetrics = metrics[mode];
  
  const handleToggle = () => {
    setIsAnimating(true);
    setMode(prev => prev === 'illusion' ? 'truth' : 'illusion');
    setTimeout(() => setIsAnimating(false), 600);
  };
  
  const handleKeyDown = (e) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      handleToggle();
    }
  };
  
  return (
    <section className={`py-32 relative overflow-hidden ${
      isDark ? 'bg-slate-950' : 'bg-white'
    }`}>
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute inset-0 transition-opacity duration-1000 ${
          mode === 'truth' ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1),transparent_50%)]" />
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 ${
            isDark ? 'glass-morphism' : 'glass-morphism-light'
          }`}>
            <div className={`w-2 h-2 rounded-full transition-colors duration-500 ${
              mode === 'truth' ? 'bg-emerald-500' : 'bg-red-500'
            } animate-pulse`} />
            <span className={`text-xs font-mono uppercase tracking-wider transition-colors duration-500 ${
              mode === 'truth' ? 'text-emerald-400' : 'text-red-400'
            }`}>
              {mode === 'truth' ? 'Truth Mode Active' : 'Illusion Mode'}
            </span>
          </div>
          <h2 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            Reality <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-indigo-400">Switch</span>
          </h2>
          <p className={`text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto mb-12 ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}>
            Toggle between what traditional analytics show you and what Fixel Pixel reveals
          </p>
          
          {/* Toggle Switch */}
          <div className="flex items-center justify-center gap-6 mb-16">
            <span className={`text-lg font-semibold transition-colors duration-300 ${
              mode === 'illusion' ? 'text-red-400' : 'text-slate-600'
            }`}>
              Illusion Mode
            </span>
            
            <button
              onClick={handleToggle}
              onKeyDown={handleKeyDown}
              className="relative w-24 h-12 rounded-full focus:outline-none focus:ring-4 focus:ring-emerald-500/50 transition-all duration-300"
              style={{
                background: mode === 'truth' 
                  ? 'linear-gradient(135deg, #10b981, #6366f1)' 
                  : 'linear-gradient(135deg, #ef4444, #f97316)'
              }}
              aria-label={`Switch to ${mode === 'truth' ? 'illusion' : 'truth'} mode`}
              role="switch"
              aria-checked={mode === 'truth'}
            >
              <div 
                className={`absolute top-1 w-10 h-10 bg-white rounded-full shadow-2xl transition-all duration-500 ${
                  mode === 'truth' ? 'left-[calc(100%-44px)]' : 'left-1'
                }`}
                style={{
                  transform: isAnimating ? 'scale(0.9)' : 'scale(1)'
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center text-xl">
                  {mode === 'truth' ? '✓' : '✗'}
                </div>
              </div>
            </button>
            
            <span className={`text-lg font-semibold transition-colors duration-300 ${
              mode === 'truth' ? 'text-emerald-400' : 'text-slate-600'
            }`}>
              Truth Mode
            </span>
          </div>
        </div>
        
        {/* Metrics Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <RealitySwitchMetric
            label="ROAS"
            value={currentMetrics.roas}
            suffix="x"
            mode={mode}
            isAnimating={isAnimating}
            color={mode === 'truth' ? 'emerald' : 'red'}
            icon="📈"
            isDark={isDark}
          />
          <RealitySwitchMetric
            label="Visibility"
            value={currentMetrics.visibility}
            suffix="%"
            mode={mode}
            isAnimating={isAnimating}
            color={mode === 'truth' ? 'emerald' : 'red'}
            icon="👁️"
            isDark={isDark}
          />
          <RealitySwitchMetric
            label="Signal Drift"
            value={currentMetrics.drift}
            suffix="%"
            mode={mode}
            isAnimating={isAnimating}
            color={mode === 'truth' ? 'emerald' : 'red'}
            inverse={true}
            icon="📊"
            isDark={isDark}
          />
          <RealitySwitchMetric
            label="Data Integrity"
            value={currentMetrics.integrity}
            suffix="%"
            mode={mode}
            isAnimating={isAnimating}
            color={mode === 'truth' ? 'emerald' : 'red'}
            icon="🔒"
            isDark={isDark}
          />
        </div>
        
        {/* Comparison Stats */}
        <div className="mt-16 grid md:grid-cols-2 gap-8">
          <div className={`rounded-3xl p-8 ${
            isDark ? 'glass-morphism' : 'glass-morphism-light'
          }`}>
            <h3 className={`text-2xl font-bold mb-6 flex items-center gap-3 ${
              isDark ? 'text-red-400' : 'text-red-600'
            }`}>
              <span className="text-3xl">😵‍💫</span>
              Illusion Mode Problems
            </h3>
            <ul className="space-y-4">
              {[
                'Last-click attribution bias',
                'Missing 30-40% of events',
                'Modeled conversion guesswork',
                'No cross-device tracking',
                'Platform data silos'
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className={`flex-shrink-0 w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center text-xs mt-0.5 ${
                    isDark ? 'text-red-400' : 'text-red-600'
                  }`}>✗</span>
                  <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className={`rounded-3xl p-8 border-2 border-emerald-500/20 ${
            isDark ? 'glass-morphism-strong' : 'bg-emerald-50'
          }`}>
            <h3 className={`text-2xl font-bold mb-6 flex items-center gap-3 ${
              isDark ? 'text-emerald-400' : 'text-emerald-700'
            }`}>
              <span className="text-3xl">✨</span>
              Truth Mode Advantages
            </h3>
            <ul className="space-y-4">
              {[
                'Causal attribution modeling',
                '98% event capture rate',
                'Server-side ground truth',
                'Identity lock across devices',
                'Unified data warehouse'
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className={`flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-xs mt-0.5 ${
                    isDark ? 'text-emerald-400' : 'text-emerald-700'
                  }`}>✓</span>
                  <span className={`font-medium ${
                    isDark ? 'text-slate-300' : 'text-slate-700'
                  }`}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
