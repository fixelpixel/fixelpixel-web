import React, { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar.js';
import { TrialFormButton } from './components/forms/TrialFormButton.js';
import { DemoFormButton } from './components/forms/DemoFormButton.js';
import { Hero } from './components/sections/Hero.js';
import { ScrollytellingProblem } from './components/sections/ScrollytellingProblem.js';
import { RealitySwitch } from './components/sections/RealitySwitch.js';
import { LossCalculator } from './components/sections/LossCalculator.js';
import { HowItWorks } from './components/sections/HowItWorks.js';
import { Testimonials } from './components/sections/Testimonials.js';
import { FinalCTA } from './components/sections/FinalCTA.js';
import { Footer } from './components/sections/Footer.js';

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
        <HowItWorks isDark={isDark} />
        <Testimonials isDark={isDark} />
        <FinalCTA TrialFormButton={TrialFormButton} DemoFormButton={DemoFormButton} isDark={isDark} />
      </main>
      
      <Footer isDark={isDark} />
    </div>
  );
};
