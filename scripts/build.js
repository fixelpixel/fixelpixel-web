#!/usr/bin/env node

/**
 * Build script for Fixel Pixel website
 * Combines all modular components into a single production HTML file
 */

const fs = require('fs');
const path = require('path');

const BASE_DIR = path.join(__dirname, '..');
const OUTPUT_FILE = path.join(BASE_DIR, 'index-built.html');

// Read all component files
const readFile = (filePath) => {
  const fullPath = path.join(BASE_DIR, filePath);
  return fs.readFileSync(fullPath, 'utf8');
};

// Extract component code (remove imports/exports)
const extractComponent = (content) => {
  // Remove import statements
  content = content.replace(/^import .*$/gm, '');
  // Remove export statements, keep the const declaration
  content = content.replace(/^export /gm, '');
  return content.trim();
};

console.log('🔨 Building Fixel Pixel website...\n');

// Read utilities
console.log('📦 Reading utilities...');
const analytics = extractComponent(readFile('js/utils/analytics.js'));
const validation = extractComponent(readFile('js/utils/validation.js'));

// Read components
console.log('📦 Reading components...');
const logo = extractComponent(readFile('js/components/FixelDynamicLogo.js'));
const navbar = extractComponent(readFile('js/components/Navbar.js'));
const trialForm = extractComponent(readFile('js/components/forms/TrialFormButton.js'));
const demoForm = extractComponent(readFile('js/components/forms/DemoFormButton.js'));

// Read sections
console.log('📦 Reading sections...');
const hero = extractComponent(readFile('js/components/sections/Hero.js'));
const problem = extractComponent(readFile('js/components/sections/ScrollytellingProblem.js'));
const reality = extractComponent(readFile('js/components/sections/RealitySwitch.js'));
const calculator = extractComponent(readFile('js/components/sections/LossCalculator.js'));
const howItWorks = extractComponent(readFile('js/components/sections/HowItWorks.js'));
const testimonials = extractComponent(readFile('js/components/sections/Testimonials.js'));
const finalCTA = extractComponent(readFile('js/components/sections/FinalCTA.js'));
const footer = extractComponent(readFile('js/components/sections/Footer.js'));

// Read app
console.log('📦 Reading app...');
const app = extractComponent(readFile('js/app.js'));

// Build the complete HTML
console.log('🔨 Building HTML...');

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- SEO Meta Tags -->
  <title>Fixel Pixel 2.0 - AI Truth Layer for Attribution | Stop Wasting Ad Spend</title>
  <meta name="description" content="Transform your attribution with AI-powered truth layer. See exactly what drives growth. No more guesswork. Start free in 5 minutes.">
  <meta name="keywords" content="attribution software, marketing analytics, AI attribution, ad tracking, ROI optimization, customer journey">
  <meta name="author" content="Fixel">
  <link rel="canonical" href="https://fixelpixel.com">
  
  <!-- Open Graph -->
  <meta property="og:title" content="Fixel Pixel 2.0 - AI Truth Layer for Attribution">
  <meta property="og:description" content="Stop wasting ad spend on guesswork. See exactly what drives growth with AI-powered attribution.">
  <meta property="og:image" content="https://fixelpixel.com/og-image.jpg">
  <meta property="og:url" content="https://fixelpixel.com">
  <meta property="og:type" content="website">
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Fixel Pixel 2.0 - AI Truth Layer for Attribution">
  <meta name="twitter:description" content="Stop wasting ad spend on guesswork. See exactly what drives growth with AI-powered attribution.">
  <meta name="twitter:image" content="https://fixelpixel.com/twitter-card.jpg">
  
  <!-- Favicon -->
  <link rel="icon" type="image/x-icon" href="/favicon.ico">
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
  
  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
  
  <!-- Tailwind CSS -->
  <script src="https://cdn.tailwindcss.com"></script>
  
  <!-- Three.js for 3D effects -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
  
  <!-- React -->
  <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
  
  <!-- Babel for JSX -->
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  
  <!-- Google Analytics 4 -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  </script>
  
  <!-- Facebook Pixel -->
  <script>
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', 'YOUR_PIXEL_ID');
    fbq('track', 'PageView');
  </script>
  <noscript>
    <img height="1" width="1" style="display:none"
      src="https://www.facebook.com/tr?id=YOUR_PIXEL_ID&ev=PageView&noscript=1"/>
  </noscript>
  
  <style>
${readFile('css/styles.css')}
    
    /* Additional glass morphism styles */
    .glass-morphism-strong {
      background: rgba(15, 23, 42, 0.8);
      backdrop-filter: blur(20px) saturate(180%);
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    /* Reduce motion for users who prefer it */
    @media (prefers-reduced-motion: reduce) {
      *,
      *::before,
      *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
    }
  </style>
</head>
<body>
  <div class="grain"></div>
  <div id="root"></div>

  <script type="text/babel">
    const { useState, useEffect, useRef, useMemo } = React;

    // ==================== UTILITIES ====================
    ${analytics}
    ${validation}

    // ==================== COMPONENTS ====================
    ${logo}
    ${navbar}
    ${trialForm}
    ${demoForm}

    // ==================== SECTIONS ====================
    ${hero}
    ${problem}
    ${reality}
    ${calculator}
    ${howItWorks}
    ${testimonials}
    ${finalCTA}
    ${footer}

    // ==================== APP ====================
    ${app}

    // ==================== RENDER ====================
    const { createRoot } = ReactDOM;
    const root = createRoot(document.getElementById('root'));
    root.render(<App />);
  </script>
</body>
</html>`;

// Write output
fs.writeFileSync(OUTPUT_FILE, html, 'utf8');

console.log(`\n✅ Build complete!`);
console.log(`📄 Output: ${OUTPUT_FILE}`);
console.log(`📦 File size: ${(fs.statSync(OUTPUT_FILE).size / 1024).toFixed(2)} KB`);
console.log('\n🚀 Open in browser to test!');
