# Apple Splash Screen Images

This directory should contain splash screen images for iOS devices. These images are displayed when your PWA launches from the home screen on iOS devices.

## Required Splash Screen Images

For the best iOS PWA experience, you should include these splash screen images:

| Filename | Size | Device Target |
|----------|------|---------------|
| `apple-splash-2048-2732.png` | 2048×2732 | iPad Pro 12.9" |
| `apple-splash-1668-2388.png` | 1668×2388 | iPad Pro 11" |
| `apple-splash-1536-2048.png` | 1536×2048 | iPad 9.7" |
| `apple-splash-1125-2436.png` | 1125×2436 | iPhone X/XS/11 Pro |
| `apple-splash-828-1792.png` | 828×1792 | iPhone XR/11 |
| `apple-splash-750-1334.png` | 750×1334 | iPhone 8/SE |
| `apple-splash-1242-2688.png` | 1242×2688 | iPhone XS Max/11 Pro Max |
| `apple-touch-icon.png` | 180×180 | Apple Touch Icon |

## Creating Splash Screens

For the best results:
- Create a simple splash screen with your app logo centered
- Use the same background color as your app (#ffffff or theme color #2563eb)
- Make sure the images are in PNG format
- Ensure images have the correct dimensions for each device

## Auto-generating Splash Screens

You can generate these images using tools like:

1. [PWA Asset Generator](https://github.com/onderceylan/pwa-asset-generator)
   ```
   npx pwa-asset-generator ./source-icon.png ./icons --splash-only
   ```

2. [Apple Splash Screen Generator](https://appsco.pe/developer/splash-screens)

## Testing

To test if your splash screens are working:
1. Add your PWA to the iOS home screen
2. Close all Safari instances
3. Launch the app from the home screen icon
4. You should see your splash screen briefly before the app loads