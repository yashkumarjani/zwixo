const fs = require('fs');
const path = require('path');
const jimpModule = require('jimp');
const Jimp = jimpModule.Jimp || jimpModule;

async function createBaby3() {
  const inputPath = path.join(__dirname, '../public/images/baby_after.png');
  const outputPath = path.join(__dirname, '../public/images/baby_after_3.png');
  
  console.log(`Reading input image from: ${inputPath}`);
  const image = await Jimp.read(inputPath);
  const width = image.bitmap.width;
  const height = image.bitmap.height;
  
  // Apply a soft rose-pink overlay tint to the image to create a pink theme card
  // Rose pink color: R=255, G=182, B=193
  const tintR = 255;
  const tintG = 182;
  const tintB = 193;
  const opacity = 0.12; // 12% tint
  
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const r = image.bitmap.data[idx];
      const g = image.bitmap.data[idx + 1];
      const b = image.bitmap.data[idx + 2];
      
      image.bitmap.data[idx] = Math.min(255, Math.floor(r * (1 - opacity) + tintR * opacity));
      image.bitmap.data[idx + 1] = Math.min(255, Math.floor(g * (1 - opacity) + tintG * opacity));
      image.bitmap.data[idx + 2] = Math.min(255, Math.floor(b * (1 - opacity) + tintB * opacity));
    }
  }
  
  await image.write(outputPath);
  console.log(`Successfully created baby_after_3.png at: ${outputPath}`);
}

createBaby3().catch(console.error);
