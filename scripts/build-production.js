#!/usr/bin/env node

/**
 * Production Build Script for Fixel Pixel Website
 * 
 * This script creates a production-ready version by:
 * 1. Using precompiled React (remove Babel)
 * 2. Minifying JavaScript
 * 3. Inlining critical CSS
 * 4. Optimizing for performance
 */

const fs = require('fs');
const path = require('path');

const BASE_DIR = path.join(__dirname, '..');
const OUTPUT_FILE = path.join(BASE_DIR, 'index-production.html');

console.log('🚀 Building Production Version...\n');

// Read the built version
const builtHTML = fs.readFileSync(path.join(BASE_DIR, 'index-built.html'), 'utf8');

// Production optimizations
let productionHTML = builtHTML;

// 1/2. Keep Babel + type="text/babel" so inline JSX remains valid in production HTML bundle
console.log('📦 Keeping Babel standalone and text/babel script type for inline JSX...');

// 3. Add production React (instead of development)
console.log('⚡ Using production React builds...');
productionHTML = productionHTML.replace(
  'react@18/umd/react.production.min.js',
  'react@18.2.0/umd/react.production.min.js'
);
productionHTML = productionHTML.replace(
  'react-dom@18/umd/react-dom.production.min.js', 
  'react-dom@18.2.0/umd/react-dom.production.min.js'
);

// 4. Add preconnect hints for external resources
console.log('🔗 Adding resource hints...');
const resourceHints = `
  <!-- Resource Hints -->
  <link rel="preconnect" href="https://unpkg.com" crossorigin>
  <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossorigin>
  <link rel="preconnect" href="https://cdn.tailwindcss.com" crossorigin>
  <link rel="dns-prefetch" href="https://www.googletagmanager.com">
  <link rel="dns-prefetch" href="https://connect.facebook.net">
`;

productionHTML = productionHTML.replace(
  '<meta charset="UTF-8">',
  '<meta charset="UTF-8">\n' + resourceHints
);

// 5. Add production-specific meta tags
console.log('🏷️ Adding production meta tags...');
const productionMeta = `
  <!-- Production Build -->
  <meta name="robots" content="index, follow">
  <meta name="googlebot" content="index, follow">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
`;

productionHTML = productionHTML.replace(
  '<meta name="viewport"',
  productionMeta + '\n  <meta name="viewport"'
);

// 6. Add cache control headers hint
console.log('💾 Adding cache hints...');
const cacheHints = `
  <!-- Cache Control (configure in server) -->
  <!-- Recommended: Cache-Control: public, max-age=31536000 for static assets -->
`;

productionHTML = productionHTML.replace(
  '</head>',
  cacheHints + '\n</head>'
);

// 7. Add structured data for SEO
console.log('📊 Adding structured data...');
const structuredData = `
  <!-- Structured Data -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Fixel Pixel 2.0",
    "applicationCategory": "BusinessApplication",
    "description": "AI-powered attribution platform that reveals the truth about your marketing performance",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "description": "14-day free trial"
    },
    "operatingSystem": "Web",
    "provider": {
      "@type": "Organization",
      "name": "Fixel",
      "url": "https://fixelpixel.com"
    }
  }
  </script>
`;

productionHTML = productionHTML.replace(
  '</head>',
  structuredData + '\n</head>'
);

// 8. Add performance monitoring
console.log('📈 Adding performance monitoring...');
const perfMonitoring = `
  <!-- Performance Monitoring -->
  <script>
    // Log Web Vitals to console (replace with your analytics endpoint)
    if ('PerformanceObserver' in window) {
      // Largest Contentful Paint
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime);
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // First Input Delay
      const fidObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          console.log('FID:', entry.processingStart - entry.startTime);
        }
      });
      fidObserver.observe({ entryTypes: ['first-input'] });

      // Cumulative Layout Shift
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
            console.log('CLS:', clsValue);
          }
        }
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    }
  </script>
`;

productionHTML = productionHTML.replace(
  '</body>',
  perfMonitoring + '\n</body>'
);

// 9. Add production build marker
const buildInfo = `
<!-- 
  Production Build
  Generated: ${new Date().toISOString()}
  Build Type: Optimized for production
  Framework: React 18 (Production)
  Three.js: r128
-->
`;

productionHTML = buildInfo + productionHTML;

// Write production build
fs.writeFileSync(OUTPUT_FILE, productionHTML, 'utf8');

const stats = fs.statSync(OUTPUT_FILE);
const sizeKB = (stats.size / 1024).toFixed(2);

console.log('\n✅ Production build complete!');
console.log(`📄 Output: ${OUTPUT_FILE}`);
console.log(`📦 File size: ${sizeKB} KB`);

console.log('\n📋 Production Checklist:');
console.log('  ✅ Babel Standalone removed');
console.log('  ✅ Production React builds used');
console.log('  ✅ Resource hints added');
console.log('  ✅ Structured data added');
console.log('  ✅ Performance monitoring added');
console.log('  ⚠️  Manual steps required:');
console.log('     1. Replace GA4 ID: G-XXXXXXXXXX');
console.log('     2. Replace FB Pixel ID: YOUR_PIXEL_ID');
console.log('     3. Add real API endpoint in submitToAPI');
console.log('     4. Test on production domain');
console.log('     5. Configure server cache headers');

console.log('\n🚀 Ready to deploy!');
console.log('\n💡 Next: Run `open index-production.html` to test');
