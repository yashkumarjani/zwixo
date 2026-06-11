const fs = require('fs');
const path = require('path');
const jimpModule = require('jimp');
const Jimp = jimpModule.Jimp || jimpModule;

async function checkImage() {
  const inputPath = path.join(__dirname, '../public/images/iphone_orange_mockup.png');
  const image = await Jimp.read(inputPath);
  const width = image.bitmap.width;
  const height = image.bitmap.height;
  
  console.log(`Image dimensions: ${width}x${height}`);
  
  // Inspect corners and a few outer pixels
  const coordinates = [
    [0, 0],
    [10, 10],
    [width - 1, 0],
    [0, height - 1],
    [width - 1, height - 1],
    [Math.floor(width / 2), 5],
    [5, Math.floor(height / 2)]
  ];
  
  for (const [x, y] of coordinates) {
    const idx = (y * width + x) * 4;
    const r = image.bitmap.data[idx];
    const g = image.bitmap.data[idx + 1];
    const b = image.bitmap.data[idx + 2];
    const a = image.bitmap.data[idx + 3];
    console.log(`Pixel at (${x}, ${y}): R=${r}, G=${g}, B=${b}, A=${a}`);
  }
}

checkImage().catch(console.error);
