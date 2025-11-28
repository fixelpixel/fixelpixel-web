import React, { useRef, useState, useEffect } from 'react';
import { trackEvent } from '../../utils/analytics.js';

// Universal Sync Hub Component
const UniversalSyncHub = ({ isDark }) => {
  const platforms = [
    { id: 'meta', label: 'Meta', color: '#1877F2', icon: 'M', angle: 0 },
    { id: 'google', label: 'Google', color: '#DB4437', icon: 'G', angle: 72 },
    { id: 'tiktok', label: 'TikTok', color: '#00F2EA', icon: 'T', angle: 144 },
    { id: 'pinterest', label: 'Pinterest', color: '#E60023', icon: 'P', angle: 216 },
    { id: 'klaviyo', label: 'Klaviyo', color: '#25D366', icon: 'K', angle: 288 },
  ];

  return (
    <div className="relative w-full max-w-[500px] aspect-square mx-auto flex items-center justify-center">
      {/* Background Glow */}
      <div className={`absolute inset-0 rounded-full blur-3xl opacity-20 animate-pulse ${
        isDark ? 'bg-teal-500' : 'bg-teal-400'
      }`} />

      {/* Connection Lines (SVG) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={isDark ? '#2DD4BF' : '#0D9488'} stopOpacity="0.1" />
            <stop offset="50%" stopColor={isDark ? '#2DD4BF' : '#0D9488'} stopOpacity="1" />
            <stop offset="100%" stopColor={isDark ? '#818CF8' : '#4F46E5'} stopOpacity="0.1" />
          </linearGradient>
        </defs>
        {platforms.map((platform, i) => {
          const angleRad = (platform.angle - 90) * (Math.PI / 180);
          const r = 160; // Radius
          const x = 250 + r * Math.cos(angleRad);
          const y = 250 + r * Math.sin(angleRad);
          
          return (
            <g key={platform.id}>
              {/* Static Line */}
              <line 
                x1="250" y1="250" x2={x} y2={y} 
                stroke={isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} 
                strokeWidth="1" 
              />
              {/* Animated Data Packet */}
              <circle r="3" fill={platform.color}>
                <animateMotion 
                  dur={`${2 + i * 0.5}s`} 
                  repeatCount="indefinite"
                  path={`M250,250 L${x},${y}`}
                  keyPoints="0;1"
                  keyTimes="0;1"
                  calcMode="linear"
                />
                <animate 
                  attributeName="opacity" 
                  values="0;1;0" 
                  dur={`${2 + i * 0.5}s`} 
                  repeatCount="indefinite" 
                />
              </circle>
            </g>
          );
        })}
      </svg>

      {/* Central Hub (Fixel) */}
      <div className={`relative z-20 w-32 h-32 rounded-full flex items-center justify-center border-4 shadow-[0_0_50px_rgba(20,184,166,0.3)] ${
        isDark 
          ? 'bg-slate-900 border-teal-500/30' 
          : 'bg-white border-teal-500/20'
      }`}>
        <div className={`absolute inset-0 rounded-full border border-dashed animate-[spin_10s_linear_infinite] ${
          isDark ? 'border-teal-500/30' : 'border-teal-500/20'
        }`} />
        <div className="text-center">
          <div className={`text-3xl font-black tracking-tighter ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>FP</div>
          <div className={`text-[10px] font-mono uppercase tracking-widest mt-1 ${
            isDark ? 'text-teal-400' : 'text-teal-600'
          }`}>Core</div>
        </div>
        
        {/* Incoming Data Particles */}
        <div className="absolute -inset-8">
           {[...Array(6)].map((_, i) => (
             <div 
               key={i}
               className={`absolute w-2 h-2 rounded-full ${
                 isDark ? 'bg-teal-400' : 'bg-teal-600'
               }`}
               style={{
                 top: '50%',
                 left: '50%',
                 transform: `rotate(${i * 60}deg) translateX(60px)`,
                 animation: `ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite ${i * 0.2}s`
               }}
             />
           ))}
        </div>
      </div>

      {/* Orbiting Platforms */}
      {platforms.map((platform) => {
        const angleRad = (platform.angle - 90) * (Math.PI / 180);
        const r = 160; // Radius
        const x = r * Math.cos(angleRad);
        const y = r * Math.sin(angleRad);

        return (
          <div
            key={platform.id}
            className={`absolute w-16 h-16 rounded-2xl flex flex-col items-center justify-center border transition-all duration-300 hover:scale-110 z-10 ${
              isDark 
                ? 'bg-slate-900/80 border-slate-700 backdrop-blur-md' 
                : 'bg-white/90 border-slate-200 shadow-lg backdrop-blur-sm'
            }`}
            style={{
              transform: `translate(${x}px, ${y}px)`,
            }}
          >
            <div 
              className="w-3 h-3 rounded-full mb-1 shadow-[0_0_10px_currentColor]"
              style={{ backgroundColor: platform.color, color: platform.color }}
            />
            <span className={`text-[10px] font-bold ${
              isDark ? 'text-slate-300' : 'text-slate-700'
            }`}>
              {platform.label}
            </span>
            
            {/* Status Indicator */}
            <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 flex items-center justify-center ${
              isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'
            }`}>
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

// ...existing code...
// Removed MetricCard and LiveChart as they are no longer used
// ...existing code...

export const Hero = ({ TrialFormButton, isDark = true }) => {
  const canvasRef = useRef(null);
  // Use useRef for mouse position to avoid re-renders and improve performance
  const mousePos = useRef({ x: 0, y: 0 });
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
      // Dark theme: bright particles (teal-400 and indigo-400)
// Внутри цикла создания частиц
const color = Math.random() > 0.5 ? 
  // Основные: Фиолетовый неон (Бренд)
  (isLight ? new THREE.Color(0x7c3aed) : new THREE.Color(0xa78bfa)) : 
  // Второстепенные: Циан (Технологии) или Эмеральд (Деньги)
  (isLight ? new THREE.Color(0x059669) : new THREE.Color(0x34d399));
      colors[i] = color.r;
      colors[i + 1] = color.g;
      colors[i + 2] = color.b;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: isLight ? 0.04 : 0.02,
      vertexColors: true,
      transparent: true,
      opacity: isLight ? 0.9 : 0.8,
      blending: isLight ? THREE.NormalBlending : THREE.AdditiveBlending,
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
      
      // Smoother Mouse parallax effect with Lerp (Linear Interpolation)
      // Reduced sensitivity (0.0002 instead of 0.0005)
      const targetX = mousePos.current.x * 0.0002;
      const targetY = -mousePos.current.y * 0.0002;
      
      // Apply smoothing (0.05 is the damping factor - lower is smoother/slower)
      camera.position.x += (targetX - camera.position.x) * 0.05;
      camera.position.y += (targetY - camera.position.y) * 0.05;
      
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
  }, [isDark]); // Removed mousePos from dependencies to prevent re-renders
  
  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      // Update ref directly
      mousePos.current = { 
        x: e.clientX - window.innerWidth / 2, 
        y: e.clientY - window.innerHeight / 2 
      };
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
                ? 'border-teal-500/20 border-t-teal-500'
                : 'border-teal-600/20 border-t-teal-600'
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
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
              </span>
              <span className={`text-xs font-mono tracking-wider uppercase ${
                isDark ? 'text-emerald-300' : 'text-emerald-700'
              }`}>
                AI Truth Layer • Live
              </span>
            </div>
            
            {/* Headline */}
            <h1 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1] tracking-tight"
              style={{ 
                fontWeight: 900,
                letterSpacing: '-0.03em'
              }}
            >
              <span className={`block ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                One Pixel.
              </span>
              <span className="block text-gradient">
                All Platforms.
              </span>
              <span className={`block ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                100% Truth.
              </span>
            </h1>
            
            {/* Subheadline */}
            <p className={`text-lg sm:text-xl lg:text-2xl leading-relaxed max-w-xl font-light ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}>
              Universal server-side tracking for <span className={`font-semibold ${
                isDark ? 'text-teal-400' : 'text-emerald-700'
              }`}>Meta, Google, TikTok, Pinterest & Klaviyo</span>. Fix your data and manage ads in one dashboard.
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
          </div>
          
          {/* Right Column - Interactive Dashboard */}
          <div className="relative flex items-center justify-center">
            <UniversalSyncHub isDark={isDark} />
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
