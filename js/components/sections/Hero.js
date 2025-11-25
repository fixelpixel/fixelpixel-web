import React, { useRef, useState, useEffect } from 'react';
import { trackEvent } from '../../utils/analytics.js';

// Floating Dashboard Component
const FloatingDashboard = ({ isDark }) => {
  const [metrics, setMetrics] = useState({
    revenue: 42392,
    roas: 4.2,
    integrity: 99.1,
    ltv: 185
  });
  
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        revenue: prev.revenue + Math.floor(Math.random() * 100),
        roas: Number((prev.roas + (Math.random() * 0.1 - 0.05)).toFixed(1)),
        integrity: Math.min(99.9, prev.integrity + Math.random() * 0.1),
        ltv: prev.ltv + Math.floor(Math.random() * 2)
      }));
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="card-3d relative">
      {/* Glow effect */}
      <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 via-indigo-500/20 to-emerald-500/20 rounded-3xl blur-3xl animate-glow"></div>
      
      {/* Main card */}
      <div className={`relative rounded-3xl p-8 space-y-6 ${
        isDark
          ? 'glass-morphism'
          : 'glass-morphism-light'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className={`text-xs font-mono uppercase tracking-wider ${
              isDark ? 'text-emerald-400' : 'text-emerald-600'
            }`}>Reality Sync</div>
            <div className={`text-sm ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}>Causal Attribution Engine</div>
          </div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className={`text-xs font-mono ${
              isDark ? 'text-emerald-400' : 'text-emerald-600'
            }`}>Live</span>
          </div>
        </div>
        
        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-4">
          <MetricCard 
            label="Recovered Revenue" 
            value={`$${metrics.revenue.toLocaleString()}`}
            color="emerald"
            trend="+18%"
            isDark={isDark}
          />
          <MetricCard 
            label="Real ROAS" 
            value={`${metrics.roas}x`}
            color="indigo"
            trend="+0.8x"
            isDark={isDark}
          />
          <MetricCard 
            label="Signal Integrity" 
            value={`${metrics.integrity.toFixed(1)}%`}
            color="emerald"
            trend="Stable"
            isDark={isDark}
          />
          <MetricCard 
            label="LTV 90d" 
            value={`$${metrics.ltv}`}
            color="indigo"
            trend="+12%"
            isDark={isDark}
          />
        </div>
        
        {/* Live Chart */}
        <div className={`relative h-32 rounded-2xl overflow-hidden p-4 ${
          isDark ? 'bg-slate-950/50' : 'bg-slate-100'
        }`}>
          <LiveChart />
        </div>
      </div>
    </div>
  );
};

const MetricCard = ({ label, value, color, trend, isDark }) => (
  <div className={`group relative p-4 rounded-2xl border transition-all duration-300 ${
    isDark
      ? 'bg-slate-950/50 border-slate-800 hover:border-slate-700'
      : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-md'
  }`}>
    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
    <div className="relative">
      <div className={`text-xs font-mono uppercase tracking-wide mb-1 ${
        isDark ? 'text-slate-500' : 'text-slate-600'
      }`}>{label}</div>
      <div className={`text-2xl font-bold ${
        color === 'emerald' 
          ? (isDark ? 'text-emerald-400' : 'text-emerald-600') 
          : (isDark ? 'text-indigo-400' : 'text-indigo-600')
      }`}>
        {value}
      </div>
      <div className={`text-xs mt-1 ${
        isDark ? 'text-slate-600' : 'text-slate-500'
      }`}>{trend}</div>
    </div>
  </div>
);

const LiveChart = () => {
  const [data, setData] = useState(Array.from({ length: 12 }, () => Math.random() * 100));
  
  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => [...prev.slice(1), Math.random() * 100]);
    }, 1500);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="relative w-full h-full flex items-end gap-1.5">
      {data.map((height, i) => (
        <div key={i} className="flex-1 relative group">
          <div 
            className="absolute bottom-0 left-0 right-0 rounded-t-sm bg-gradient-to-t from-emerald-500 to-indigo-400 transition-all duration-500 ease-out"
            style={{ height: `${height}%` }}
          >
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const Hero = ({ TrialFormButton, isDark = true }) => {
  const canvasRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  // Three.js scene setup for 3D background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, canvas.offsetWidth / canvas.offsetHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    
    renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Create particle system
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = window.innerWidth < 768 ? 500 : 2000;
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);
    
    // Detect theme for particle colors
    const isLight = !isDark;
    
    for (let i = 0; i < particlesCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 10;
      positions[i + 1] = (Math.random() - 0.5) * 10;
      positions[i + 2] = (Math.random() - 0.5) * 10;
      
      // Light theme: darker particles (emerald-700 and indigo-700)
      // Dark theme: bright particles (emerald-400 and indigo-400)
      const color = Math.random() > 0.5 ? 
        (isLight ? new THREE.Color(0x047857) : new THREE.Color(0x10b981)) : 
        (isLight ? new THREE.Color(0x4338ca) : new THREE.Color(0x6366f1));
      colors[i] = color.r;
      colors[i + 1] = color.g;
      colors[i + 2] = color.b;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });
    
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
    
    camera.position.z = 3;
    
    // Mark as loaded after first render
    setTimeout(() => setIsLoading(false), 100);
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      particles.rotation.y += 0.0005;
      particles.rotation.x += 0.0002;
      
      // Mouse parallax effect
      camera.position.x = mousePos.x * 0.0005;
      camera.position.y = -mousePos.y * 0.0005;
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle resize
    const handleResize = () => {
      camera.aspect = canvas.offsetWidth / canvas.offsetHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, [mousePos, isDark]);
  
  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX - window.innerWidth / 2, y: e.clientY - window.innerHeight / 2 });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  // Scroll tracking with throttle
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <section className={`relative min-h-screen overflow-hidden ${
      isDark
        ? 'bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950'
        : 'bg-gradient-to-b from-slate-50 via-white to-slate-50'
    }`}>
      {/* Loading Skeleton */}
      {isLoading && (
        <div className={`absolute inset-0 flex items-center justify-center z-20 ${
          isDark ? 'bg-slate-950' : 'bg-white'
        }`}>
          <div className="flex flex-col items-center gap-4">
            <div className={`w-16 h-16 border-4 rounded-full animate-spin ${
              isDark
                ? 'border-emerald-500/20 border-t-emerald-500'
                : 'border-emerald-600/20 border-t-emerald-600'
            }`} />
            <p className={`font-mono text-sm ${
              isDark ? 'text-slate-500' : 'text-slate-600'
            }`}>Initializing Truth Layer...</p>
          </div>
        </div>
      )}
      
      {/* 3D Background Canvas */}
      <canvas 
        ref={canvasRef}
        className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        style={{ transform: `translateY(${scrollY * 0.5}px)` }}
      />
      
      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(99,102,241,0.15),transparent_50%)]" />
      
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          transform: `translateY(${scrollY * 0.3}px)`
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Text */}
          <div className="space-y-8">
            {/* Badge */}
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
              isDark ? 'glass-morphism' : 'glass-morphism-light'
            }`}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className={`text-xs font-mono tracking-wider uppercase ${
                isDark ? 'text-emerald-300' : 'text-emerald-700'
              }`}>
                AI Truth Layer • Live
              </span>
            </div>
            
            {/* Headline */}
            <h1 
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tight"
              style={{ 
                fontWeight: 900,
                letterSpacing: '-0.04em'
              }}
            >
              <span className={`block ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                The Truth
              </span>
              <span className="block text-gradient">
                Layer.
              </span>
            </h1>
            
            {/* Subheadline with typewriter effect */}
            <p className={`text-lg sm:text-xl lg:text-2xl leading-relaxed max-w-xl font-light ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}>
              AI-driven attribution that captures{' '}
              <span className={`font-semibold ${
                isDark ? 'text-emerald-400' : 'text-emerald-700'
              }`}>everything</span>,
              understands{' '}
              <span className={`font-semibold ${
                isDark ? 'text-indigo-400' : 'text-indigo-700'
              }`}>causality</span>,
              and reveals{' '}
              <span className={`font-semibold ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>real ROAS</span>.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-4">
              <TrialFormButton location="hero" />
              <button
                onClick={() => trackEvent('click_watch_demo', { location: 'hero' })}
                aria-label="Watch product demo"
                className={`px-8 py-4 min-h-[44px] min-w-[44px] font-semibold rounded-2xl transition-all duration-300 group focus:outline-none focus:ring-4 ${
                  isDark
                    ? 'glass-morphism hover:bg-white/10 text-white focus:ring-indigo-500/50'
                    : 'glass-morphism-light hover:bg-white text-slate-700 focus:ring-indigo-500/30'
                }`}>
                <span className="flex items-center gap-3">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                  Watch Demo
                </span>
              </button>
            </div>
            
            {/* Social Proof */}
            <div className="flex flex-wrap items-center gap-6 sm:gap-8 pt-4">
              <div className="text-sm">
                <div className={`text-xl sm:text-2xl font-bold ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>2,000+</div>
                <div className={isDark ? 'text-slate-500' : 'text-slate-600'}>Brands Trust Us</div>
              </div>
              <div className="text-sm">
                <div className={`text-xl sm:text-2xl font-bold ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>$240M+</div>
                <div className={isDark ? 'text-slate-500' : 'text-slate-600'}>Revenue Recovered</div>
              </div>
            </div>
                <div className="text-slate-500 font-mono">Shopify Stores</div>
              </div>
              <div className="w-px h-12 bg-slate-800"></div>
              <div className="text-sm">
                <div className="text-xl sm:text-2xl font-bold text-emerald-400">$1B+</div>
                <div className="text-slate-500 font-mono">Tracked Revenue</div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Interactive Dashboard */}
          <div className="relative">
            <FloatingDashboard isDark={isDark} />
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-xs text-slate-500 font-mono uppercase tracking-wider">Scroll to explore</span>
        <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};
