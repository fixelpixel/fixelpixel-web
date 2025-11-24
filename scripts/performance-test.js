/**
 * Performance Testing Script
 * 
 * Paste this into browser console after page load to measure performance
 */

console.log('⚡ Starting Performance Analysis...\n');

// Get Performance Timing
const perf = performance.timing;
const now = Date.now();

console.log('📊 PAGE LOAD METRICS');
console.log('='.repeat(50));

// DNS Lookup
const dnsTime = perf.domainLookupEnd - perf.domainLookupStart;
console.log(`🌐 DNS Lookup: ${dnsTime}ms`);

// TCP Connection
const tcpTime = perf.connectEnd - perf.connectStart;
console.log(`🔌 TCP Connection: ${tcpTime}ms`);

// Server Response
const responseTime = perf.responseEnd - perf.requestStart;
console.log(`📡 Server Response: ${responseTime}ms`);

// DOM Processing
const domTime = perf.domComplete - perf.domLoading;
console.log(`🏗️ DOM Processing: ${domTime}ms`);

// Page Load
const loadTime = perf.loadEventEnd - perf.navigationStart;
console.log(`⏱️ Total Load Time: ${loadTime}ms`);

// DOMContentLoaded
const domContentLoaded = perf.domContentLoadedEventEnd - perf.navigationStart;
console.log(`📄 DOMContentLoaded: ${domContentLoaded}ms`);

console.log('\n📊 PAINT METRICS');
console.log('='.repeat(50));

// Get Paint Timing
const paintEntries = performance.getEntriesByType('paint');
paintEntries.forEach(entry => {
  console.log(`🎨 ${entry.name}: ${entry.startTime.toFixed(2)}ms`);
});

console.log('\n📊 RESOURCE TIMING');
console.log('='.repeat(50));

// Get all resources
const resources = performance.getEntriesByType('resource');
const resourceStats = {
  script: [],
  stylesheet: [],
  img: [],
  other: []
};

resources.forEach(resource => {
  const type = resource.initiatorType;
  const duration = resource.duration.toFixed(2);
  const size = resource.transferSize || 0;
  
  const stat = {
    name: resource.name.split('/').pop(),
    duration: parseFloat(duration),
    size: size
  };
  
  if (type === 'script') resourceStats.script.push(stat);
  else if (type === 'link') resourceStats.stylesheet.push(stat);
  else if (type === 'img') resourceStats.img.push(stat);
  else resourceStats.other.push(stat);
});

console.log(`📜 Scripts: ${resourceStats.script.length}`);
const scriptTime = resourceStats.script.reduce((sum, s) => sum + s.duration, 0);
console.log(`   Total load time: ${scriptTime.toFixed(2)}ms`);
resourceStats.script.forEach(s => {
  console.log(`   • ${s.name}: ${s.duration}ms (${(s.size/1024).toFixed(2)}KB)`);
});

console.log(`\n🎨 Stylesheets: ${resourceStats.stylesheet.length}`);
const styleTime = resourceStats.stylesheet.reduce((sum, s) => sum + s.duration, 0);
console.log(`   Total load time: ${styleTime.toFixed(2)}ms`);
resourceStats.stylesheet.forEach(s => {
  console.log(`   • ${s.name}: ${s.duration}ms (${(s.size/1024).toFixed(2)}KB)`);
});

console.log('\n📊 MEMORY USAGE');
console.log('='.repeat(50));

if (performance.memory) {
  const memory = performance.memory;
  console.log(`💾 Used JS Heap: ${(memory.usedJSHeapSize / 1048576).toFixed(2)} MB`);
  console.log(`📦 Total JS Heap: ${(memory.totalJSHeapSize / 1048576).toFixed(2)} MB`);
  console.log(`🎯 Heap Limit: ${(memory.jsHeapSizeLimit / 1048576).toFixed(2)} MB`);
  console.log(`📊 Usage: ${((memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100).toFixed(2)}%`);
} else {
  console.log('⚠️ Memory API not available (Chrome only)');
}

console.log('\n📊 PERFORMANCE SCORE');
console.log('='.repeat(50));

const scores = {
  excellent: 0,
  good: 0,
  needsWork: 0
};

// FCP Score (First Contentful Paint)
const fcp = paintEntries.find(e => e.name === 'first-contentful-paint');
if (fcp) {
  if (fcp.startTime < 1500) {
    console.log('✅ First Contentful Paint: EXCELLENT');
    scores.excellent++;
  } else if (fcp.startTime < 3000) {
    console.log('👍 First Contentful Paint: GOOD');
    scores.good++;
  } else {
    console.log('⚠️ First Contentful Paint: NEEDS WORK');
    scores.needsWork++;
  }
}

// DOMContentLoaded Score
if (domContentLoaded < 2000) {
  console.log('✅ DOMContentLoaded: EXCELLENT');
  scores.excellent++;
} else if (domContentLoaded < 4000) {
  console.log('👍 DOMContentLoaded: GOOD');
  scores.good++;
} else {
  console.log('⚠️ DOMContentLoaded: NEEDS WORK');
  scores.needsWork++;
}

// Total Load Time Score
if (loadTime < 3000) {
  console.log('✅ Total Load Time: EXCELLENT');
  scores.excellent++;
} else if (loadTime < 5000) {
  console.log('👍 Total Load Time: GOOD');
  scores.good++;
} else {
  console.log('⚠️ Total Load Time: NEEDS WORK');
  scores.needsWork++;
}

console.log('\n📊 RECOMMENDATIONS');
console.log('='.repeat(50));

// Recommendations based on metrics
const recommendations = [];

if (loadTime > 3000) {
  recommendations.push('Consider minifying JavaScript and CSS');
  recommendations.push('Enable compression (gzip/brotli)');
}

if (resourceStats.script.length > 5) {
  recommendations.push('Consider bundling JavaScript files');
}

if (scriptTime > 2000) {
  recommendations.push('Defer non-critical JavaScript');
  recommendations.push('Use async/defer attributes on script tags');
}

if (recommendations.length > 0) {
  recommendations.forEach(rec => console.log(`💡 ${rec}`));
} else {
  console.log('🎉 No immediate recommendations - performance looks good!');
}

console.log('\n' + '='.repeat(50));
console.log('✅ Performance analysis complete!');
console.log('='.repeat(50));

// Store results
window.performanceResults = {
  loadTime,
  domContentLoaded,
  fcp: fcp ? fcp.startTime : null,
  resources: resourceStats,
  scores
};

console.log('\n💡 Results saved to window.performanceResults');
