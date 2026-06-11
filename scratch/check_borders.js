const fs = require('fs');
const path = require('path');
const jimpModule = require('jimp');
const Jimp = jimpModule.Jimp || jimpModule;

async function checkBorders() {
  const inputPath = path.join(__dirname, '../public/images/iphone_orange_mockup.png');
  const image = await Jimp.read(inputPath);
  const width = image.bitmap.width;
  const height = image.bitmap.height;
  
  console.log("Checking top border (y=0):");
  for (let x = 0; x < width; x++) {
    const a = image.bitmap.data[x * 4 + 3];
    if (a !== 0) console.log(`x=${x}, y=0 has A=${a}`);
  }

  console.log("Checking bottom border (y=height-1):");
  for (let x = 0; x < width; x++) {
    const a = image.bitmap.data[((height - 1) * width + x) * 4 + 3];
    if (a !== 0) console.log(`x=${x}, y=${height-1} has A=${a}`);
  }

  console.log("Checking left border (x=0):");
  for (let y = 0; y < height; y++) {
    const a = image.bitmap.data[(y * width) * 4 + 3];
    if (a !== 0) console.log(`x=0, y=${y} has A=${a}`);
  }

  console.log("Checking right border (x=width-1):");
  for (let y = 0; y < height; y++) {
    const a = image.bitmap.data[(y * width + (width - 1)) * 4 + 3];
    if (a !== 0) console.log(`x=${width-1}, y=${y} has A=${a}`);
  }
}

checkBorders().catch(console.error);
