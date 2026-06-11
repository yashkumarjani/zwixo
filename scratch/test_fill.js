const fs = require('fs');
const path = require('path');
const jimpModule = require('jimp');
const Jimp = jimpModule.Jimp || jimpModule;

async function testFill() {
  const inputPath = path.join(__dirname, '../public/images/iphone_orange_mockup_original.png');
  const outputPath = path.join(__dirname, '../public/images/iphone_orange_mockup_test.png');
  const image = await Jimp.read(inputPath);
  const width = image.bitmap.width;
  const height = image.bitmap.height;
  
  // Flood-fill starting from all four corners
  const queue = [];
  const visited = new Set();
  
  // Push all boundary pixels to start, or just corners
  const corners = [
    [0, 0], [width - 1, 0], [0, height - 1], [width - 1, height - 1],
    [Math.floor(width/2), 0], [Math.floor(width/2), height - 1],
    [0, Math.floor(height/2)], [width - 1, Math.floor(height/2)]
  ];
  
  for (const [x, y] of corners) {
    queue.push([x, y]);
    visited.add(`${x},${y}`);
  }
  
  // A pixel is considered background if its R, G, B are all > 215 (light grey/white)
  const isBackground = (r, g, b) => r > 215 && g > 215 && b > 215;

  console.log(`Processing ${width}x${height} image...`);
  
  let transparentCount = 0;
  while (queue.length > 0) {
    const [x, y] = queue.shift();
    const idx = (y * width + x) * 4;
    const r = image.bitmap.data[idx];
    const g = image.bitmap.data[idx + 1];
    const b = image.bitmap.data[idx + 2];
    
    if (isBackground(r, g, b)) {
      // Convert to 100% transparent
      image.bitmap.data[idx + 3] = 0;
      transparentCount++;
      
      // Check 4-connected neighbors
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
  
  console.log(`Processed. Converted ${transparentCount} pixels to transparent.`);
  
  // Let's check bounding box of remaining non-transparent pixels
  let minX = width, maxX = 0, minY = height, maxY = 0;
  let opaqueCount = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const a = image.bitmap.data[idx + 3];
      if (a > 0) {
        opaqueCount++;
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  
  console.log(`Remaining non-transparent pixels: ${opaqueCount}`);
  console.log(`New bounding box: X [${minX}, ${maxX}], Y [${minY}, ${maxY}]`);
  
  await image.write(outputPath);
  console.log(`Test image saved to ${outputPath}`);
}

testFill().catch(console.error);
