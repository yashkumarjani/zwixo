const fs = require('fs');
const path = require('path');
const jimpModule = require('jimp');
const Jimp = jimpModule.Jimp || jimpModule;

async function checkOriginalColors() {
  const inputPath = path.join(__dirname, '../public/images/iphone_orange_mockup_original.png');
  const image = await Jimp.read(inputPath);
  const width = image.bitmap.width;
  const height = image.bitmap.height;
  
  console.log(`Original dimensions: ${width}x${height}`);
  
  // Inspect a horizontal line at y=0, print first 20 pixels
  console.log("y=0, first 20 pixels:");
  for (let x = 0; x < 20; x++) {
    const idx = x * 4;
    const r = image.bitmap.data[idx];
    const g = image.bitmap.data[idx + 1];
    const b = image.bitmap.data[idx + 2];
    const a = image.bitmap.data[idx + 3];
    console.log(`x=${x}, y=0: R=${r}, G=${g}, B=${b}, A=${a}`);
  }

  // Inspect the corners
  const corners = [
    [0, 0],
    [width - 1, 0],
    [0, height - 1],
    [width - 1, height - 1]
  ];
  console.log("\nCorners:");
  for (const [x, y] of corners) {
    const idx = (y * width + x) * 4;
    const r = image.bitmap.data[idx];
    const g = image.bitmap.data[idx + 1];
    const b = image.bitmap.data[idx + 2];
    const a = image.bitmap.data[idx + 3];
    console.log(`(${x}, ${y}): R=${r}, G=${g}, B=${b}, A=${a}`);
  }
}

checkOriginalColors().catch(console.error);
