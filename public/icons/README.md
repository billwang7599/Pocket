# Pocket PWA Icons

This directory contains the icon files for Pocket's Progressive Web App functionality.

## Required Icon Files

Please add the following icon files to this directory:

### Standard PWA Icons
- `icon-192x192.png` (192px × 192px)
- `icon-256x256.png` (256px × 256px)
- `icon-384x384.png` (384px × 384px)
- `icon-512x512.png` (512px × 512px)

### iOS Specific Icons
- `apple-touch-icon.png` (180px × 180px)

## Icon Guidelines

- All icons should be in PNG format
- Use the blue-600 color (#2563eb) as the primary color to match the app's theme
- Ensure icons have transparent backgrounds
- For the maskable icon (icon-512x512.png), ensure the main content is within the safe area (central 80% of the image)

## Testing Your Icons

After adding these icons:
1. Build the application
2. Test on iOS devices by accessing the site in Safari and adding to home screen
3. Test on Android devices by visiting the site and using "Add to Home Screen"
4. Verify icons display correctly on the home screen

If you need to generate icons from a source image, consider using tools like:
- [PWA Asset Generator](https://github.com/onderceylan/pwa-asset-generator)
- [Favicon Generator](https://realfavicongenerator.net/)
