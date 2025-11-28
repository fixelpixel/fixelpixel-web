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
  
  // Slider track color based on theme
  const sliderTrackBg = isDark ? '#1e293b' : '#e2e8f0';
  
  return (
    <section 
      ref={sectionRef}
      className={`py-24 relative overflow-hidden ${
        isDark
          ? 'bg-slate-950'
          : 'bg-white'
      }`}
    >
      <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-black mb-4 ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            How Much Are You <span className={`${
              isDark ? 'text-red-400' : 'text-red-600'
            }`}>Losing</span>?
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}>
            Traditional analytics miss 30-40% of your conversions. Calculate your hidden loss.
          </p>
        </div>
        
        {/* Calculator Card */}
        <div className={`rounded-2xl p-8 md:p-10 ${
          isDark 
            ? 'bg-slate-900 border border-slate-800' 
            : 'bg-slate-50 border border-slate-200'
        }`}>
          {/* Sliders */}
          <div className="space-y-8 mb-10">
            {/* Monthly Spend Slider */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className={`text-base font-semibold ${
                  isDark ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  Monthly Ad Spend
                </label>
                <span className={`text-xl font-bold font-mono ${
                  isDark ? 'text-indigo-400' : 'text-indigo-600'
                }`}>
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
                className="w-full h-2 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #6366f1 0%, #6366f1 ${((spend - 10000) / (500000 - 10000)) * 100}%, ${sliderTrackBg} ${((spend - 10000) / (500000 - 10000)) * 100}%, ${sliderTrackBg} 100%)`
                }}
              />
              <div className={`flex justify-between text-xs mt-2 font-mono ${
                isDark ? 'text-slate-600' : 'text-slate-500'
              }`}>
                <span>$10K</span>
                <span>$500K</span>
              </div>
            </div>
            
            {/* AOV Slider */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className={`text-base font-semibold ${
                  isDark ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  Average Order Value
                </label>
                <span className={`text-xl font-bold font-mono ${
                  isDark ? 'text-teal-400' : 'text-teal-600'
                }`}>
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
                className="w-full h-2 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #10b981 0%, #10b981 ${((aov - 50) / (500 - 50)) * 100}%, ${sliderTrackBg} ${((aov - 50) / (500 - 50)) * 100}%, ${sliderTrackBg} 100%)`
                }}
              />
              <div className={`flex justify-between text-xs mt-2 font-mono ${
                isDark ? 'text-slate-600' : 'text-slate-500'
              }`}>
                <span>$50</span>
                <span>$500</span>
              </div>
            </div>
          </div>
          
          {/* Results */}
          <div className={`rounded-xl p-8 text-center ${
            isDark 
              ? 'bg-gradient-to-br from-teal-500/10 to-indigo-500/10 border border-teal-500/20' 
              : 'bg-gradient-to-br from-teal-50 to-indigo-50 border border-teal-200'
          }`}>
            <div className={`text-sm font-mono uppercase tracking-wider mb-2 ${
              isDark ? 'text-slate-500' : 'text-slate-600'
            }`}>
              Annual Revenue You're Missing
            </div>
            <div className={`text-5xl md:text-6xl font-black mb-2 ${
              isDark 
                ? 'text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-indigo-400' 
                : 'text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-indigo-600'
            }`}>
              {formatCurrency(displayValue)}
            </div>
            <p className={`text-sm ${
              isDark ? 'text-slate-500' : 'text-slate-600'
            }`}>
              Based on 30% average data loss rate
            </p>
          </div>
          
          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="text-center">
              <div className={`text-2xl font-bold ${
                isDark ? 'text-red-400' : 'text-red-600'
              }`}>30%</div>
              <div className={`text-xs ${
                isDark ? 'text-slate-600' : 'text-slate-500'
              }`}>Data Loss</div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold ${
                isDark ? 'text-indigo-400' : 'text-indigo-600'
              }`}>{formatCurrency(recovered / 12)}</div>
              <div className={`text-xs ${
                isDark ? 'text-slate-600' : 'text-slate-500'
              }`}>Monthly</div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold ${
                isDark ? 'text-teal-400' : 'text-teal-600'
              }`}>+2.1x</div>
              <div className={`text-xs ${
                isDark ? 'text-slate-600' : 'text-slate-500'
              }`}>ROAS Lift</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
