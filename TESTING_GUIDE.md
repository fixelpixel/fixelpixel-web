# Browser Testing Guide

## Quick Start

### 1. Open the Website
```bash
# Open built version
open index-built.html

# Or open original version
open fixel-pixel-premium.html
```

### 2. Run Automated Tests

Open browser console (F12 or Cmd+Option+I) and paste:

**Functionality Tests:**
```javascript
// Copy content from scripts/browser-test.js and paste
```

**Performance Tests:**
```javascript
// Copy content from scripts/performance-test.js and paste
```

---

## Manual Testing Checklist

### Desktop Testing

1. **Chrome**
   - Open DevTools (F12)
   - Check Console tab for errors
   - Check Network tab for failed requests
   - Check Performance tab for bottlenecks
   - Test all interactive elements
   
2. **Safari**
   - Enable Developer menu: Safari > Preferences > Advanced
   - Open Web Inspector (Cmd+Option+I)
   - Test webkit-specific features (backdrop-filter, etc.)
   
3. **Firefox**
   - Open Developer Tools (F12)
   - Check for layout differences
   - Test CSS Grid compatibility

### Mobile Testing

1. **iOS Safari (Physical Device or Simulator)**
   ```bash
   # To test on iOS Simulator:
   # - Open Xcode
   # - Window > Devices and Simulators
   # - Launch iOS Simulator
   # - Open Safari and navigate to file
   ```

2. **Android Chrome**
   - Use Chrome DevTools Device Mode (Cmd+Shift+M)
   - Or test on physical Android device
   - Enable USB debugging
   - Chrome > More Tools > Remote Devices

### Responsive Testing

Use Chrome DevTools Device Mode (Cmd+Shift+M) to test:
- iPhone SE (375px)
- iPhone 12 Pro (390px)
- iPad (768px)
- iPad Pro (1024px)
- Desktop (1440px+)

---

## Testing Scenarios

### Navigation
1. Click logo - should stay on page
2. Click nav links - should scroll to sections
3. Click "Sign In" - should track event
4. Click "Start Free" - should open trial modal
5. Open mobile menu - should slide in from right
6. Click backdrop - should close menu
7. Press Escape - should close menu

### Forms

**Trial Form:**
1. Click "Start Free" button
2. Try submitting empty form - should show errors
3. Enter invalid email - should show error
4. Enter valid data - should show loading state
5. Should show success message after 1.5s
6. Modal should close after 2s

**Demo Form:**
1. Click "Book Demo" button
2. Test validation (name, email, company required)
3. Test optional fields (website, message)
4. Submit and verify success flow

### Analytics

Open console and verify these events are tracked:
- `PageView` on load
- `click_signin` when clicking Sign In
- `click_start_trial` when opening trial form
- `click_book_demo` when opening demo form
- `trial_signup_success` on successful trial form
- `demo_request_success` on successful demo form
- Scroll depth: `scroll_25`, `scroll_50`, `scroll_75`

### Animations

**Hero Section:**
- Three.js particles should animate smoothly
- Particles should respond to mouse movement (desktop)
- Background should parallax on scroll
- Text should be readable over particles

**Scrollytelling:**
- Problem cards should fade in on scroll
- Comparison table should appear
- Intersection Observer should trigger animations

**Reality Switch:**
- Toggle should switch between states
- Metrics should animate (counter-up effect)
- Colors should change smoothly

**Loss Calculator:**
- Sliders should move smoothly
- Numbers should update in real-time
- Calculations should be accurate
- Annual/monthly toggle should work

**Dual-Pipeline Sync:**
- Particles should flow between nodes
- Animation should loop continuously
- Should be visible but not distracting

**Growth OS:**
- Bento grid should layout correctly
- Hover effects should work on cards
- Icons should be visible

### Performance

**Expected Benchmarks:**
- First Contentful Paint: < 1.5s
- DOMContentLoaded: < 2s
- Full Page Load: < 4s
- Smooth 60fps scrolling
- No layout shifts (CLS)
- No memory leaks after 5 minutes

**How to Test:**
1. Open DevTools > Performance tab
2. Click "Record" button
3. Scroll through entire page
4. Stop recording
5. Check for:
   - Long tasks (> 50ms)
   - Layout shifts
   - Memory usage spikes
   - FPS drops

---

## Common Issues & Fixes

### Issue: Particles not rendering
- **Check:** Console for Three.js errors
- **Fix:** Ensure Three.js CDN is loaded
- **Fix:** Check WebGL support: `!!document.createElement('canvas').getContext('webgl')`

### Issue: Forms not submitting
- **Check:** Console for JavaScript errors
- **Fix:** Verify validation utilities are loaded
- **Fix:** Check network tab for API call

### Issue: Mobile menu not opening
- **Check:** Click event on hamburger button
- **Fix:** Verify z-index hierarchy
- **Fix:** Check for JavaScript errors

### Issue: Animations janky
- **Check:** DevTools Performance tab
- **Fix:** Reduce particle count on mobile
- **Fix:** Use `will-change` CSS property
- **Fix:** Debounce scroll events

### Issue: Analytics not tracking
- **Check:** Console for "Analytics Event" logs
- **Fix:** Verify GA4 and FB Pixel IDs are set
- **Fix:** Check ad blockers aren't blocking scripts

---

## Browser Support Matrix

### Target Support:
- ✅ Chrome 90+
- ✅ Safari 14+
- ✅ Firefox 88+
- ✅ Edge 90+
- ✅ iOS Safari 14+
- ✅ Android Chrome 90+

### Features Requiring Polyfills:
- Intersection Observer (for older browsers)
- ResizeObserver (for older browsers)
- CSS Grid (IE11 - not supported)
- Backdrop Filter (older Firefox)

---

## Accessibility Testing

### Keyboard Navigation:
1. Tab through all interactive elements
2. Verify visible focus indicators
3. Test modal focus trap
4. Ensure Escape key works

### Screen Reader Testing:
1. **macOS VoiceOver:**
   - Enable: Cmd+F5
   - Navigate: Control+Option+Arrow keys
   
2. **What to check:**
   - Page landmarks announced
   - Button labels clear
   - Form labels associated
   - Error messages announced
   - Image alt text present

### Color Contrast:
- Use Chrome DevTools Lighthouse
- All text should pass WCAG AA (4.5:1)
- Interactive elements should pass WCAG AA (3:1)

---

## Reporting Issues

When you find a bug, document:
1. **Browser & Version:** e.g., "Chrome 119.0.6045.105"
2. **OS:** e.g., "macOS 14.1"
3. **Device:** e.g., "MacBook Pro 2021" or "iPhone 13"
4. **Steps to Reproduce:**
   - What you did
   - What you expected
   - What actually happened
5. **Screenshots/Video:** If possible
6. **Console Errors:** Copy any error messages
7. **Network Issues:** Check failed requests

Add issues to `TESTING_CHECKLIST.md` under "Known Issues".

---

## Next Steps

After completing browser testing:
1. ✅ Mark completed items in TESTING_CHECKLIST.md
2. 🐛 Fix any critical bugs
3. ⚠️ Document workarounds for known issues
4. 📊 Run Lighthouse audit (see TASK-016)
5. 🚀 Proceed to deployment prep

---

## Useful Commands

```bash
# Rebuild after changes
node scripts/build.js

# Open in default browser
open index-built.html

# Start local server (if needed)
python3 -m http.server 8000
# Then open http://localhost:8000

# Check file size
ls -lh index-built.html

# Count lines of code
wc -l index-built.html
```

---

## Questions?

Refer to:
- TESTING_CHECKLIST.md - Detailed test cases
- ROADMAP.md - Original project plan
- fixel_pixel_2_0_spec.md - Feature specifications
