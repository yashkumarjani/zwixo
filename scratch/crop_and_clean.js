const fs = require('fs');
const path = require('path');
const jimpModule = require('jimp');
const Jimp = jimpModule.Jimp || jimpModule;

async function cropAndCleanImage() {
  const inputPath = path.join(__dirname, '../public/images/iphone_orange_mockup_original.png');
  const outputPath = path.join(__dirname, '../public/images/iphone_orange_mockup.png');
  const image = await Jimp.read(inputPath);
  const width = image.bitmap.width;
  const height = image.bitmap.height;
  
  // Flood-fill starting from corners & sides
  const queue = [];
  const visited = new Set();
  
  const seedPoints = [
    [0, 0], [width - 1, 0], [0, height - 1], [width - 1, height - 1],
    [Math.floor(width/2), 0], [Math.floor(width/2), height - 1],
    [0, Math.floor(height/2)], [width - 1, Math.floor(height/2)]
  ];
  
  for (const [x, y] of seedPoints) {
    queue.push([x, y]);
    visited.add(`${x},${y}`);
  }
  
  const isBackground = (r, g, b) => r > 215 && g > 215 && b > 215;

  console.log(`Processing background removal on ${width}x${height} image...`);
  
  let transparentCount = 0;
  while (queue.length > 0) {
    const [x, y] = queue.shift();
    const idx = (y * width + x) * 4;
    const r = image.bitmap.data[idx];
    const g = image.bitmap.data[idx + 1];
    const b = image.bitmap.data[idx + 2];
    
    if (isBackground(r, g, b)) {
      image.bitmap.data[idx + 3] = 0; // Set alpha to 0
      transparentCount++;
      
      const neighbors = [
        [x + 1, y],
        [x - 1, y],
        [x, y + 1],
        [x, y - 1]
      ];
      
      for (const [nx, ny] of neighbors) {
        if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
          const key = `${nx},${ny}`;
          if (!visited.has(key)) {
            visited.add(key);
            queue.push([nx, ny]);
          }
        }
      }
    }
  }
  
  console.log(`Converted ${transparentCount} pixels to transparent.`);
  
  // Find bounding box of remaining content
  let minX = width, maxX = 0, minY = height, maxY = 0;
  let nonTransparentCount = 0;
  
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const a = image.bitmap.data[idx + 3];
      if (a > 0) {
        nonTransparentCount++;
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  
  console.log(`Bounding box: X [${minX}, ${maxX}], Y [${minY}, ${maxY}]`);
  
  if (nonTransparentCount === 0) {
    console.error("Error: All pixels became transparent! Not saving.");
    return;
  }
  
  // Crop the image to the bounding box
  const cropX = minX;
  const cropY = minY;
  const cropWidth = maxX - minX + 1;
  const cropHeight = maxY - minY + 1;
  
  console.log(`Cropping image to: x=${cropX}, y=${cropY}, w=${cropWidth}, h=${cropHeight}`);
  
  image.crop({ x: cropX, y: cropY, w: cropWidth, h: cropHeight });
  
  await image.write(outputPath);
  console.log(`Successfully saved cropped transparent mockup to: ${outputPath}`);
}

cropAndCleanImage().catch(console.error);
