const fs = require('fs');
const path = require('path');
const jimpModule = require('jimp');
const Jimp = jimpModule.Jimp || jimpModule;

async function checkAlpha() {
  const inputPath = path.join(__dirname, '../public/images/iphone_orange_mockup.png');
  const image = await Jimp.read(inputPath);
  const width = image.bitmap.width;
  const height = image.bitmap.height;
  
  let opaqueCount = 0;
  let transparentCount = 0;
  let semiTransparentCount = 0;
  
  // Also track the bounding box of non-transparent pixels (alpha > 0)
  let minX = width, maxX = 0, minY = height, maxY = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const a = image.bitmap.data[idx + 3];
      
      if (a === 255) {
        opaqueCount++;
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      } else if (a === 0) {
        transparentCount++;
      } else {
        semiTransparentCount++;
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  
  console.log(`Total pixels: ${width * height}`);
  console.log(`Transparent (A=0): ${transparentCount}`);
  console.log(`Semi-transparent (0 < A < 255): ${semiTransparentCount}`);
  console.log(`Opaque (A=255): ${opaqueCount}`);
  console.log(`Bounding box of non-transparent pixels: X [${minX}, ${maxX}], Y [${minY}, ${maxY}]`);
}

checkAlpha().catch(console.error);
