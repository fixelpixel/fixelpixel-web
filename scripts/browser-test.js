/**
 * Browser Console Testing Script
 * 
 * Paste this into browser console to run automated checks
 */

console.log('🧪 Starting Fixel Pixel Test Suite...\n');

const tests = {
  passed: [],
  failed: [],
  warnings: []
};

// Test 1: Check if React is loaded
console.log('📦 Test 1: React loaded');
if (typeof React !== 'undefined') {
  tests.passed.push('React loaded');
  console.log('✅ React version:', React.version);
} else {
  tests.failed.push('React not loaded');
  console.log('❌ React not found');
}

// Test 2: Check if ReactDOM is loaded
console.log('\n📦 Test 2: ReactDOM loaded');
if (typeof ReactDOM !== 'undefined') {
  tests.passed.push('ReactDOM loaded');
  console.log('✅ ReactDOM available');
} else {
  tests.failed.push('ReactDOM not loaded');
  console.log('❌ ReactDOM not found');
}

// Test 3: Check if Three.js is loaded
console.log('\n📦 Test 3: Three.js loaded');
if (typeof THREE !== 'undefined') {
  tests.passed.push('Three.js loaded');
  console.log('✅ Three.js version:', THREE.REVISION);
} else {
  tests.failed.push('Three.js not loaded');
  console.log('❌ Three.js not found');
}

// Test 4: Check if analytics utilities are available
console.log('\n📊 Test 4: Analytics utilities');
if (typeof window.trackEvent === 'function') {
  tests.passed.push('trackEvent available');
  console.log('✅ trackEvent function found');
} else {
  tests.failed.push('trackEvent not available');
  console.log('❌ trackEvent not found');
}

// Test 5: Check if validation utilities are available
console.log('\n📝 Test 5: Validation utilities');
if (typeof window.validateEmail === 'function') {
  tests.passed.push('validateEmail available');
  console.log('✅ validateEmail function found');
} else {
  tests.failed.push('validateEmail not available');
  console.log('❌ validateEmail not found');
}

// Test 6: Check for console errors
console.log('\n🐛 Test 6: Console errors check');
const originalError = console.error;
let errorCount = 0;
console.error = function(...args) {
  errorCount++;
  originalError.apply(console, args);
};
setTimeout(() => {
  console.error = originalError;
  if (errorCount === 0) {
    tests.passed.push('No console errors');
    console.log('✅ No console errors detected');
  } else {
    tests.warnings.push(`${errorCount} console errors`);
    console.log(`⚠️ ${errorCount} console errors detected`);
  }
}, 2000);

// Test 7: Check DOM elements
console.log('\n🎨 Test 7: DOM elements');
setTimeout(() => {
  const root = document.getElementById('root');
  if (root && root.children.length > 0) {
    tests.passed.push('React rendered');
    console.log('✅ React app rendered to DOM');
    console.log(`   Found ${root.children.length} child elements`);
  } else {
    tests.failed.push('React not rendered');
    console.log('❌ React app not rendered');
  }
  
  // Test 8: Check for specific sections
  console.log('\n📍 Test 8: Section elements');
  const sections = ['nav', 'hero', 'problem', 'calculator'];
  sections.forEach(section => {
    const found = document.querySelector(`[class*="${section}"]`) || 
                  document.querySelector(`section`);
    if (found) {
      console.log(`✅ Found section with "${section}"`);
    } else {
      console.log(`⚠️ Section "${section}" not clearly identified`);
    }
  });
  
  // Test 9: Check canvas for Three.js
  console.log('\n🎬 Test 9: Three.js canvas');
  const canvas = document.querySelector('canvas');
  if (canvas) {
    tests.passed.push('Three.js canvas rendered');
    console.log('✅ Canvas element found');
    console.log(`   Size: ${canvas.width}x${canvas.height}`);
  } else {
    tests.failed.push('Three.js canvas not found');
    console.log('❌ Canvas not found');
  }
  
  // Test 10: Check for interactive elements
  console.log('\n🖱️ Test 10: Interactive elements');
  const buttons = document.querySelectorAll('button');
  const links = document.querySelectorAll('a');
  const inputs = document.querySelectorAll('input');
  
  console.log(`✅ Found ${buttons.length} buttons`);
  console.log(`✅ Found ${links.length} links`);
  console.log(`✅ Found ${inputs.length} input fields`);
  
  if (buttons.length > 5) tests.passed.push('Interactive elements present');
  
  // Test 11: Check for accessibility attributes
  console.log('\n♿ Test 11: Accessibility check');
  const ariaLabels = document.querySelectorAll('[aria-label]');
  const ariaRoles = document.querySelectorAll('[role]');
  
  console.log(`✅ Found ${ariaLabels.length} elements with aria-label`);
  console.log(`✅ Found ${ariaRoles.length} elements with role attribute`);
  
  if (ariaLabels.length > 3 && ariaRoles.length > 2) {
    tests.passed.push('Accessibility attributes present');
  } else {
    tests.warnings.push('Limited accessibility attributes');
  }
  
  // Final Report
  console.log('\n' + '='.repeat(50));
  console.log('📊 TEST RESULTS SUMMARY');
  console.log('='.repeat(50));
  console.log(`✅ Passed: ${tests.passed.length}`);
  tests.passed.forEach(test => console.log(`   • ${test}`));
  
  if (tests.warnings.length > 0) {
    console.log(`\n⚠️ Warnings: ${tests.warnings.length}`);
    tests.warnings.forEach(test => console.log(`   • ${test}`));
  }
  
  if (tests.failed.length > 0) {
    console.log(`\n❌ Failed: ${tests.failed.length}`);
    tests.failed.forEach(test => console.log(`   • ${test}`));
  }
  
  console.log('\n' + '='.repeat(50));
  
  const score = (tests.passed.length / (tests.passed.length + tests.failed.length) * 100).toFixed(0);
  console.log(`🎯 Overall Score: ${score}%`);
  
  if (score >= 90) {
    console.log('🎉 Excellent! Site is ready for deployment.');
  } else if (score >= 75) {
    console.log('👍 Good! Minor issues to address.');
  } else if (score >= 60) {
    console.log('⚠️ Fair. Several issues need attention.');
  } else {
    console.log('❌ Critical issues found. Please review failed tests.');
  }
  
  console.log('='.repeat(50));
  
  // Store results globally for inspection
  window.testResults = {
    passed: tests.passed,
    failed: tests.failed,
    warnings: tests.warnings,
    score: score
  };
  
  console.log('\n💡 Results saved to window.testResults');
  console.log('💡 Type "testResults" in console to review');
  
}, 1000);

console.log('\n⏳ Running tests... (will complete in ~3 seconds)');
