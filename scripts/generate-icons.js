const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

// Ensure /public/icons exists
const iconsDir = path.join(__dirname, '../public/icons');
if (!fs.existsSync(iconsDir)) {
    fs.mkdirSync(iconsDir, { recursive: true });
}

function createIcon(size) {
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext('2d');

    // Background
    ctx.fillStyle = '#111827';
    ctx.fillRect(0, 0, size, size);

    // Text
    ctx.fillStyle = '#ffffff';
    ctx.font = `bold ${size / 2}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('OS', size / 2, size / 2);

    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(path.join(iconsDir, `icon-${size}x${size}.png`), buffer);
    console.log(`Generated icon-${size}x${size}.png`);
}

// Note: This script requires 'canvas' package.
// For simplicity in this demo, we will just use a placeholder creation if canvas is not available or just inform user.
// Attempting to run this might fail without canvas installed.
// Alternative: Just download placeholders or use simple SVG conversion if possible.
