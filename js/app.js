import React, { useRef, useEffect, useState } from 'react';
import { Navbar } from './components/Navbar.js';
import { TrialFormButton } from './components/forms/TrialFormButton.js';
import { DemoFormButton } from './components/forms/DemoFormButton.js';
import { Hero } from './components/sections/Hero.js';
import { ScrollytellingProblem } from './components/sections/ScrollytellingProblem.js';
import { RealitySwitch } from './components/sections/RealitySwitch.js';
import { LossCalculator } from './components/sections/LossCalculator.js';
import { EchoLoop } from './components/sections/EchoLoop.js';
import { GrowthOS } from './components/sections/GrowthOS.js';
import { Testimonials } from './components/sections/Testimonials.js';
import { FinalCTA } from './components/sections/FinalCTA.js';
import { Footer } from './components/sections/Footer.js';

// Information Gravity Graph Component
const InformationGravityGraph = ({ theme }) => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const palette = theme === 'light'
      ? {
          coreStroke: '#047857',
          text: '#0f172a',
          surface: 'rgba(255,255,255,0.9)',
          lineBase: 'rgba(16,185,129,0.45)',
        }
      : {
          coreStroke: '#10b981',
          text: '#ffffff',
          surface: 'rgba(15,23,42,0.9)',
          lineBase: 'rgba(16,185,129,0.3)',
        };

    const nodes = [
      { label: 'Meta', weight: 0.45, angle: 0, color: '#6366f1', x: 0, y: 0 },
      { label: 'TikTok', weight: 0.38, angle: Math.PI / 2, color: '#10b981', x: 0, y: 0 },
      { label: 'Google', weight: 0.31, angle: Math.PI, color: '#3b82f6', x: 0, y: 0 },
      { label: 'Email', weight: 0.27, angle: 3 * Math.PI / 2, color: '#f59e0b', x: 0, y: 0 }
    ];
    
    let frame = 0;
    
    const animate = () => {
      ctx.clearRect(0, 0, rect.width, rect.height);
      frame += 0.005;
      
      // Draw connections to center
      nodes.forEach((node, i) => {
        const radius = 120 + Math.sin(frame + i) * 10;
        const angle = node.angle + frame * 0.3;
        node.x = centerX + Math.cos(angle) * radius;
        node.y = centerY + Math.sin(angle) * radius;
        
        // Draw connection line
        const gradient = ctx.createLinearGradient(centerX, centerY, node.x, node.y);
        gradient.addColorStop(0, palette.lineBase);
        gradient.addColorStop(1, node.color + '80');
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = node.weight * 4;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(node.x, node.y);
        ctx.stroke();
        
        // Draw flow particles
        for (let j = 0; j < 3; j++) {
          const t = ((frame * 2 + j * 0.33) % 1);
          const px = centerX + (node.x - centerX) * t;
          const py = centerY + (node.y - centerY) * t;
          
          ctx.fillStyle = node.color;
          ctx.globalAlpha = 1 - t;
          ctx.beginPath();
          ctx.arc(px, py, 3, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 1;
        }
      });
      
      // Draw center core
      const coreGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 40);
      coreGradient.addColorStop(0, theme === 'light' ? 'rgba(16,185,129,0.35)' : 'rgba(16, 185, 129, 0.4)');
      coreGradient.addColorStop(0.5, theme === 'light' ? 'rgba(99, 102, 241, 0.12)' : 'rgba(99, 102, 241, 0.2)');
      coreGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.fillStyle = coreGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 40 + Math.sin(frame * 2) * 5, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw center circle
      ctx.strokeStyle = palette.coreStroke;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 30, 0, Math.PI * 2);
      ctx.stroke();
      
      // Draw nodes
      nodes.forEach(node => {
        // Node glow
        const glowGradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, 25);
        glowGradient.addColorStop(0, node.color + '60');
        glowGradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 25, 0, Math.PI * 2);
        ctx.fill();
        
        // Node circle
        ctx.fillStyle = palette.surface;
        ctx.strokeStyle = node.color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 20, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        
        // Node label
        ctx.fillStyle = palette.text;
        ctx.font = '600 12px Inter';
        ctx.textAlign = 'center';
        ctx.fillText(node.label, node.x, node.y - 35);
        
        // Weight label
        ctx.fillStyle = node.color;
        ctx.font = '500 10px JetBrains Mono';
        ctx.fillText(`${node.weight}`, node.x, node.y + 40);
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
  }, []);
  
  return (
    <div className="relative w-full h-[500px] rounded-3xl overflow-hidden bg-surface-override border border-surface-line">
      <canvas ref={canvasRef} className="w-full h-full" />
      
      {/* Legend */}
      <div className="absolute top-4 right-4 glass-morphism rounded-2xl p-4 space-y-2">
        <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">Attribution Weight</div>
        <div className="flex items-center gap-2 text-sm">
          <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
          <span className="text-slate-300">Paid Social</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
          <span className="text-slate-300">Organic</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          <span className="text-slate-300">Search</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <div className="w-3 h-3 rounded-full bg-amber-500"></div>
          <span className="text-slate-300">Retention</span>
        </div>
      </div>
      
      {/* Stats */}
      <div className="absolute bottom-4 left-4 right-4 flex justify-between">
        <StatBadge label="Causal Confidence" value="99.1%" />
        <StatBadge label="Identity Match" value="98.4%" />
        <StatBadge label="Attribution Lift" value="+18%" />
      </div>
    </div>
  );
};

const StatBadge = ({ label, value }) => (
  <div className="glass-morphism rounded-xl px-4 py-2">
    <div className="text-xs font-mono text-slate-500">{label}</div>
    <div className="text-lg font-bold text-emerald-400">{value}</div>
  </div>
);

export const App = () => {
  const [isDark, setIsDark] = useState(true);
  
  const toggleTheme = () => setIsDark(!isDark);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark ? 'bg-slate-950' : 'bg-slate-50'
    }`}>
      <Navbar isDark={isDark} toggleTheme={toggleTheme} />
      <main role="main">
        <Hero TrialFormButton={TrialFormButton} isDark={isDark} />
        <ScrollytellingProblem isDark={isDark} />
        <RealitySwitch isDark={isDark} />
        <LossCalculator isDark={isDark} />
        <EchoLoop isDark={isDark} />
        <GrowthOS isDark={isDark} />
        <Testimonials isDark={isDark} />
        
        {/* AI Attribution Engine Section */}
        <section className={`py-24 ${
          isDark ? 'bg-slate-900' : 'bg-white'
        }`} aria-label="AI Attribution Engine">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 ${
                isDark ? 'glass-morphism' : 'glass-morphism-light'
              }`}>
                <span className={`text-xs font-mono uppercase tracking-wider ${
                  isDark ? 'text-indigo-400' : 'text-indigo-700'
                }`}>
                  AI Attribution Engine
                </span>
              </div>
              <h2 className={`text-4xl sm:text-5xl font-black mb-4 ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                Information Gravity Graph
              </h2>
              <p className={`text-lg sm:text-xl max-w-2xl mx-auto ${
                isDark ? 'text-slate-400' : 'text-slate-600'
              }`}>
                Every channel becomes a node. We weigh causal pull, illuminate edges, and surface true revenue gravity.
              </p>
            </div>
            
            <InformationGravityGraph theme={isDark ? 'dark' : 'light'} />
          </div>
        </section>
        
        <FinalCTA TrialFormButton={TrialFormButton} DemoFormButton={DemoFormButton} isDark={isDark} />
      </main>
      
      <Footer isDark={isDark} />
    </div>
  );
};
