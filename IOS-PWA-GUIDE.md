# iOS PWA Troubleshooting Guide

This guide addresses common issues when setting up a Progressive Web App (PWA) for iOS devices and ensuring it properly launches in standalone mode without the Safari UI.

## Key Requirements for iOS Standalone Mode

For an iOS PWA to properly function in standalone mode (without Safari UI), you must have:

1. **Proper Meta Tags**
   ```html
   <meta name="apple-mobile-web-app-capable" content="yes">
   <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
   <meta name="apple-mobile-web-app-title" content="Pocket">
   ```

2. **Apple Touch Icon**
   ```html
   <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png">
   ```

3. **Splash Screen Images**
   - iOS requires specific splash screen images for different device sizes
   - These are defined using `apple-touch-startup-image` links
   - Each image requires specific media queries for different devices

## Common Issues & Solutions

### 1. App Opens in Safari Instead of Standalone Mode

**Issue**: When launched from home screen, the app still shows Safari UI.

**Solutions**:
- Ensure `apple-mobile-web-app-capable` meta tag is present
- Check that the start URL in your manifest is relative (e.g., `/` instead of `https://yourapp.com/`)
- Make sure you're adding to home screen through Safari's share menu
- Clear Safari cache and history, then try again

### 2. Status Bar Styling Issues

**Issue**: Status bar doesn't blend with your app's theme.

**Solutions**:
- Use `black-translucent` for a transparent status bar that your app can extend into
- Use `black` for a black status bar with white text
- For more control, ensure your app has proper content padding below the status bar

### 3. Navigation to External Links Breaks Standalone Mode

**Issue**: When users click links to external sites, it breaks out of the PWA.

**Solution**:
- Intercept external navigation with JavaScript:
  ```javascript
  // Add to your main JS file
  if (window.navigator.standalone) {
    document.addEventListener('click', function(e) {
      // Find closest anchor link
      let link = e.target.closest('a');
      if (link && link.hostname !== window.location.hostname) {
        e.preventDefault();
        // Open external links in Safari
        window.open(link.href, '_blank');
      }
    });
  }
  ```

### 4. Back Button Navigation

**Issue**: iOS PWAs don't have a built-in back button like browsers.

**Solution**:
- Implement your own back navigation UI
- Consider using a navigation framework that handles history management
- Add a visible back button in your UI when appropriate

### 5. PWA Not Installing

**Issue**: Add to Home Screen prompt not showing or not working.

**Solutions**:
- Ensure HTTPS is enabled
- Verify manifest.json is properly configured
- Make sure service worker is registered correctly
- Test with the `/pwa-test` page to verify requirements

## Testing Your PWA

1. Visit `/pwa-test` in your app to verify PWA requirements
2. Clear Safari cache and data
3. Visit your site in Safari
4. Tap share icon and select "Add to Home Screen"
5. Launch from home screen icon
6. Verify standalone mode and proper splash screen display

## iOS-Specific Limitations

- iOS doesn't fully support background sync
- Push notifications are not supported in iOS PWAs
- App may be unloaded from memory after some time in background
- Storage limitations compared to native apps

## Advanced Testing Tips

- Test in private browsing mode to verify behavior with fresh cache/cookies
- Test on multiple iOS devices with different screen sizes
- Check behavior when device is offline
- Verify splash screen appearance on different devices