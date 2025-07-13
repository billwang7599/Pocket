const fs = require('fs');
const path = require('path');
const { createCanvas, loadImage } = require('canvas');

const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'icons');

// iOS splash screen sizes for all current devices
const splashSizes = [
    // iPhone
    { name: 'apple-splash-640-1136', width: 640, height: 1136 }, // iPhone 5/SE
    { name: 'apple-splash-750-1334', width: 750, height: 1334 }, // iPhone 6/7/8
    { name: 'apple-splash-828-1792', width: 828, height: 1792 }, // iPhone 11/XR
    { name: 'apple-splash-1125-2436', width: 1125, height: 2436 }, // iPhone X/XS
    { name: 'apple-splash-1170-2532', width: 1170, height: 2532 }, // iPhone 12/12 Pro
    { name: 'apple-splash-1179-2556', width: 1179, height: 2556 }, // iPhone 14 Pro/15 Pro
    { name: 'apple-splash-1242-2208', width: 1242, height: 2208 }, // iPhone 6/7/8 Plus
    { name: 'apple-splash-1284-2778', width: 1284, height: 2778 }, // iPhone 12 Pro Max/13/14 Plus
    { name: 'apple-splash-1290-2796', width: 1290, height: 2796 }, // iPhone 14 Pro Max/15 Pro Max

    // iPad
    { name: 'apple-splash-1536-2048', width: 1536, height: 2048 }, // iPad 9.7"
    { name: 'apple-splash-1668-2224', width: 1668, height: 2224 }, // iPad 10.5"
    { name: 'apple-splash-1668-2388', width: 1668, height: 2388 }, // iPad 11"
    { name: 'apple-splash-2048-2732', width: 2048, height: 2732 }, // iPad 12.9"

    // Landscape versions
    { name: 'apple-splash-1136-640', width: 1136, height: 640 },
    { name: 'apple-splash-1334-750', width: 1334, height: 750 },
    { name: 'apple-splash-1792-828', width: 1792, height: 828 },
    { name: 'apple-splash-2436-1125', width: 2436, height: 1125 },
    { name: 'apple-splash-2532-1170', width: 2532, height: 1170 },
    { name: 'apple-splash-2556-1179', width: 2556, height: 1179 },
    { name: 'apple-splash-2208-1242', width: 2208, height: 1242 },
    { name: 'apple-splash-2778-1284', width: 2778, height: 1284 },
    { name: 'apple-splash-2796-1290', width: 2796, height: 1290 },
    { name: 'apple-splash-2048-1536', width: 2048, height: 1536 },
    { name: 'apple-splash-2224-1668', width: 2224, height: 1668 },
    { name: 'apple-splash-2388-1668', width: 2388, height: 1668 },
    { name: 'apple-splash-2732-2048', width: 2732, height: 2048 },
];

// Icon sizes needed for iOS
const iconSizes = [
    { name: 'apple-touch-icon-57x57', size: 57 },
    { name: 'apple-touch-icon-60x60', size: 60 },
    { name: 'apple-touch-icon-72x72', size: 72 },
    { name: 'apple-touch-icon-76x76', size: 76 },
    { name: 'apple-touch-icon-114x114', size: 114 },
    { name: 'apple-touch-icon-120x120', size: 120 },
    { name: 'apple-touch-icon-144x144', size: 144 },
    { name: 'apple-touch-icon-152x152', size: 152 },
    { name: 'apple-touch-icon-180x180', size: 180 },
];

const APP_NAME = 'Pocket';
const THEME_COLOR = '#2563eb';
const BACKGROUND_COLOR = '#ffffff';

async function generateSplashScreen(config) {
    const canvas = createCanvas(config.width, config.height);
    const ctx = canvas.getContext('2d');

    // Fill background
    ctx.fillStyle = BACKGROUND_COLOR;
    ctx.fillRect(0, 0, config.width, config.height);

    // Calculate sizes
    const centerX = config.width / 2;
    const centerY = config.height / 2;
    const iconSize = Math.min(config.width, config.height) * 0.15;

    // Draw icon circle background
    ctx.fillStyle = THEME_COLOR;
    ctx.beginPath();
    ctx.arc(centerX, centerY - iconSize * 0.5, iconSize / 2, 0, 2 * Math.PI);
    ctx.fill();

    // Draw simplified "P" for Pocket
    ctx.fillStyle = '#ffffff';
    ctx.font = `bold ${iconSize * 0.6}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('P', centerX, centerY - iconSize * 0.5);

    // Draw app name
    ctx.fillStyle = '#333333';
    ctx.font = `${iconSize * 0.2}px Arial`;
    ctx.fillText(APP_NAME, centerX, centerY + iconSize * 0.8);

    // Draw subtitle
    ctx.fillStyle = '#666666';
    ctx.font = `${iconSize * 0.15}px Arial`;
    ctx.fillText('Budget App', centerX, centerY + iconSize * 1.2);

    return canvas.toBuffer('image/png');
}

async function generateIcon(size) {
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext('2d');

    // Draw background circle
    ctx.fillStyle = THEME_COLOR;
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, 2 * Math.PI);
    ctx.fill();

    // Draw "P" letter
    ctx.fillStyle = '#ffffff';
    ctx.font = `bold ${size * 0.6}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('P', size / 2, size / 2);

    return canvas.toBuffer('image/png');
}

async function generateAssets() {
    console.log('Generating iOS assets...');

    // Ensure output directory exists
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    // Generate splash screens
    console.log('Generating splash screens...');
    for (const config of splashSizes) {
        try {
            const buffer = await generateSplashScreen(config);
            const filePath = path.join(OUTPUT_DIR, `${config.name}.png`);
            fs.writeFileSync(filePath, buffer);
            console.log(`Created: ${config.name}.png`);
        } catch (error) {
            console.error(`Error generating ${config.name}:`, error);
        }
    }

    // Generate icons
    console.log('Generating icons...');
    for (const config of iconSizes) {
        try {
            const buffer = await generateIcon(config.size);
            const filePath = path.join(OUTPUT_DIR, `${config.name}.png`);
            fs.writeFileSync(filePath, buffer);
            console.log(`Created: ${config.name}.png`);
        } catch (error) {
            console.error(`Error generating ${config.name}:`, error);
        }
    }

    // Generate favicon
    try {
        const faviconBuffer = await generateIcon(32);
        const faviconPath = path.join(OUTPUT_DIR, '..', 'favicon.ico');
        fs.writeFileSync(faviconPath, faviconBuffer);
        console.log('Created: favicon.ico');
    } catch (error) {
        console.error('Error generating favicon:', error);
    }

    console.log('iOS assets generation complete!');
}

if (require.main === module) {
    generateAssets().catch(console.error);
}

module.exports = { generateAssets };
