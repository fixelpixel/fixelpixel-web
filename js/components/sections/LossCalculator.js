import React, { useState, useRef, useEffect } from 'react';

export const LossCalculator = ({ isDark = true }) => {
  const [spend, setSpend] = useState(50000);
  const [aov, setAov] = useState(150);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  
  useEffect(() => {
    const currentRef = sectionRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.3 }
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
  
  // Formula: (Monthly Spend * 30% data loss) * (AOV multiplier) * 12 months
  const recovered = Math.floor((spend * 0.30) * (aov / 100) * 12);
  const [displayValue, setDisplayValue] = useState(0);
  const [targetValue, setTargetValue] = useState(recovered);
  
  useEffect(() => {
    setTargetValue(recovered);
  }, [recovered]);
  
  useEffect(() => {
    if (!isVisible) return;
    
    const duration = 2000;
    const steps = 60;
    const startValue = displayValue;
    const increment = (targetValue - startValue) / steps;
    let currentStep = 0;
    
    const timer = setInterval(() => {
      currentStep++;
      if (currentStep <= steps) {
        setDisplayValue(Math.floor(startValue + (increment * currentStep)));
      } else {
        setDisplayValue(targetValue);
        clearInterval(timer);
      }
    }, duration / steps);
    
    return () => clearInterval(timer);
  }, [targetValue, isVisible]);
  
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };
  
  return (
    <section 
      ref={sectionRef}
      className={`py-32 relative overflow-hidden ${
        isDark
          ? 'bg-gradient-to-b from-slate-900 to-slate-950'
          : 'bg-gradient-to-b from-slate-50 to-white'
      }`}
    >
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(99,102,241,0.05),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(16,185,129,0.05),transparent_50%)]" />
      </div>
      
      <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 ${
            isDark ? 'glass-morphism' : 'glass-morphism-light'
          }`}>
            <span className={`text-xs font-mono uppercase tracking-wider ${
              isDark ? 'text-indigo-400' : 'text-indigo-700'
            }`}>
              ROI Calculator
            </span>
          </div>
          <h2 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            Calculate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-indigo-400">Hidden Loss</span>
          </h2>
          <p className={`text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}>
            See how much revenue traditional analytics are hiding from you
          </p>
        </div>
        
        {/* Calculator Card */}
        <div className={`rounded-3xl p-10 md:p-12 border-2 border-indigo-500/20 ${
          isDark ? 'glass-morphism-strong' : 'bg-white shadow-xl'
        }`}>
          {/* Sliders */}
          <div className="space-y-10 mb-12">
            {/* Monthly Spend Slider */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="text-lg font-semibold text-white">
                  Monthly Ad Spend
                </label>
                <span className="text-2xl font-bold text-indigo-400 font-mono">
                  {formatCurrency(spend)}
                </span>
              </div>
              <input
                type="range"
                min="10000"
                max="500000"
                step="5000"
                value={spend}
                onChange={(e) => setSpend(parseInt(e.target.value))}
                className="w-full h-3 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #6366f1 0%, #6366f1 ${((spend - 10000) / (500000 - 10000)) * 100}%, #1e293b ${((spend - 10000) / (500000 - 10000)) * 100}%, #1e293b 100%)`
                }}
              />
              <div className="flex justify-between text-xs text-slate-500 mt-2 font-mono">
                <span>$10K</span>
                <span>$500K</span>
              </div>
            </div>
            
            {/* AOV Slider */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="text-lg font-semibold text-white">
                  Average Order Value
                </label>
                <span className="text-2xl font-bold text-emerald-400 font-mono">
                  {formatCurrency(aov)}
                </span>
              </div>
              <input
                type="range"
                min="50"
                max="500"
                step="10"
                value={aov}
                onChange={(e) => setAov(parseInt(e.target.value))}
                className="w-full h-3 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #10b981 0%, #10b981 ${((aov - 50) / (500 - 50)) * 100}%, #1e293b ${((aov - 50) / (500 - 50)) * 100}%, #1e293b 100%)`
                }}
              />
              <div className="flex justify-between text-xs text-slate-500 mt-2 font-mono">
                <span>$50</span>
                <span>$500</span>
              </div>
            </div>
          </div>
          
          {/* Results Card */}
          <div className="relative overflow-hidden rounded-3xl p-10 bg-gradient-to-br from-emerald-500/10 to-indigo-500/10 border-2 border-emerald-500/30">
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-indigo-500 opacity-20 blur-2xl animate-glow" />
            
            <div className="relative">
              <div className="text-center mb-6">
                <div className="text-sm font-mono text-slate-400 uppercase tracking-wider mb-2">
                  Estimated Annual Recovered Revenue
                </div>
                <div className="text-7xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-indigo-400 to-emerald-400 mb-4 animate-[gradient-shift_3s_ease_infinite]">
                  {formatCurrency(displayValue)}
                </div>
                <p className="text-slate-400 text-sm max-w-md mx-auto">
                  This is revenue you are currently losing to attribution gaps and data loss
                </p>
              </div>
              
              {/* Breakdown */}
              <div className="grid md:grid-cols-3 gap-4 mt-8 pt-8 border-t border-slate-700/50">
                <div className="text-center">
                  <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Data Loss</div>
                  <div className="text-2xl font-bold text-red-400">30%</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Monthly Impact</div>
                  <div className="text-2xl font-bold text-indigo-400">{formatCurrency(recovered / 12)}</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">ROAS Lift</div>
                  <div className="text-2xl font-bold text-emerald-400">+2.1x</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* CTA */}
          <div className="text-center mt-10">
            <button className="px-10 py-5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-bold text-lg rounded-2xl transition-all duration-300 shadow-[0_25px_70px_rgba(16,185,129,0.4)] hover:scale-105">
              Start Recovering Revenue →
            </button>
            <p className="text-sm text-slate-500 mt-4">
              No credit card required • 14-day free trial
            </p>
          </div>
        </div>
        
        {/* Formula Explanation */}
        <div className="mt-12 text-center">
          <button 
            className="text-sm text-slate-500 hover:text-slate-400 transition-colors font-mono"
            onClick={() => alert('Formula: (Monthly Spend × 30% loss rate) × (AOV impact factor) × 12 months\n\nBased on industry average 30-40% event loss and 2.1x ROAS improvement with proper attribution.')}
          >
            How is this calculated? ↓
          </button>
        </div>
      </div>
    </section>
  );
};
