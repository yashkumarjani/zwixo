const path = require('path');
const jimpModule = require('jimp');
const Jimp = jimpModule.Jimp || jimpModule;

async function processImages() {
  const imagesDir = path.join(__dirname, '../public/images');
  
  // Crop parameters for 1024x1024 to 9:16 (576x1024)
  const cropX = 224;
  const cropY = 0;
  const cropW = 576;
  const cropH = 1024;

  // --- 1. WEDDING COUNTDOWN EXAMPLE 3 ---
  console.log("Processing Wedding Countdown Example 3...");
  const wBeforeSrc = path.join(imagesDir, 'restoration_before_3.png');
  const wAfterSrc = path.join(imagesDir, 'restoration_after_3.png');
  
  const wBeforeDest = path.join(imagesDir, 'wedding_before_3.png');
  const wAfterDest = path.join(imagesDir, 'wedding_after_3.png');

  // Read and crop before
  const wBefore = await Jimp.read(wBeforeSrc);
  wBefore.crop({ x: cropX, y: cropY, w: cropW, h: cropH });
  await wBefore.write(wBeforeDest);
  console.log(`Saved: ${wBeforeDest}`);

  // Read, crop and style after (Gold Frame)
  const wAfter = await Jimp.read(wAfterSrc);
  wAfter.crop({ x: cropX, y: cropY, w: cropW, h: cropH });
  
  // Draw gold border (inset)
  // Gold color: R=245, G=166, B=35
  const goldR = 245, goldG = 166, goldB = 35;
  const borderInset = 24;
  const borderThickness = 6;
  
  // Draw outer gold border
  drawFrame(wAfter, borderInset, borderThickness, goldR, goldG, goldB);
  // Draw inner thin white border
  drawFrame(wAfter, borderInset + borderThickness + 4, 2, 255, 255, 255);
  
  await wAfter.write(wAfterDest);
  console.log(`Saved: ${wAfterDest}`);

  // --- 2. BABY MILESTONES EXAMPLE 3 ---
  console.log("Processing Baby Milestones Example 3...");
  const bBeforeSrc = path.join(imagesDir, 'restoration_before_2.png');
  const bAfterSrc = path.join(imagesDir, 'restoration_after_2.png');
  
  const bBeforeDest = path.join(imagesDir, 'baby_before_3.png');
  const bAfterDest = path.join(imagesDir, 'baby_after_2.png');

  // Read and crop before
  const bBefore = await Jimp.read(bBeforeSrc);
  bBefore.crop({ x: cropX, y: cropY, w: cropW, h: cropH });
  await bBefore.write(bBeforeDest);
  console.log(`Saved: ${bBeforeDest}`);

  // Read, crop and style after (Pastel Blue Frame)
  const bAfter = await Jimp.read(bAfterSrc);
  bAfter.crop({ x: cropX, y: cropY, w: cropW, h: cropH });
  
  // Draw pastel blue border (inset)
  // Baby blue: R=160, G=196, B=255
  const blueR = 160, blueG = 196, blueB = 255;
  const babyInset = 24;
  const babyThickness = 8;
  
  drawFrame(bAfter, babyInset, babyThickness, blueR, blueG, blueB);
  drawFrame(bAfter, babyInset + babyThickness + 4, 2, 255, 255, 255);

  await bAfter.write(bAfterDest);
  console.log(`Saved: ${bAfterDest}`);
}

function drawFrame(image, inset, thickness, r, g, b) {
  const width = image.bitmap.width;
  const height = image.bitmap.height;
  
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const isHorizontalBorder = (y >= inset && y < inset + thickness) || (y >= height - inset - thickness && y < height - inset);
      const isVerticalBorder = (x >= inset && x < inset + thickness) || (x >= width - inset - thickness && x < width - inset);
      
      const inXBounds = x >= inset && x < width - inset;
      const inYBounds = y >= inset && y < height - inset;

      if ((isHorizontalBorder && inXBounds) || (isVerticalBorder && inYBounds)) {
        const idx = (y * width + x) * 4;
        image.bitmap.data[idx] = r;
        image.bitmap.data[idx + 1] = g;
        image.bitmap.data[idx + 2] = b;
        image.bitmap.data[idx + 3] = 255; // Solid opacity
      }
    }
  }
}

processImages().catch(console.error);
