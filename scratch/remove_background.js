// FILE: scratch/remove_background.js
const fs = require('fs');
const path = require('path');
const jimpModule = require('jimp');

// Support both Jimp structures (newer vs older versions)
const Jimp = jimpModule.Jimp || jimpModule;

async function main() {
  const inputPath = path.join(__dirname, '../public/images/iphone_orange_mockup.png');
  console.log('Reading image from:', inputPath);
  
  const image = await Jimp.read(inputPath);
  const width = image.bitmap.width;
  const height = image.bitmap.height;
  
  // Flood-fill starting from the four corners
  const queue = [[0, 0], [width - 1, 0], [0, height - 1], [width - 1, height - 1]];
  const visited = new Set();
  
  for (const [x, y] of queue) {
    visited.add(`${x},${y}`);
  }
  
  // Define "white" background color threshold
  const isWhite = (r, g, b) => r > 242 && g > 242 && b > 242;

  console.log(`Processing ${width}x${height} image...`);
  
  let transparentCount = 0;
  while (queue.length > 0) {
    const [x, y] = queue.shift();
    const idx = (y * width + x) * 4;
    const r = image.bitmap.data[idx];
    const g = image.bitmap.data[idx + 1];
    const b = image.bitmap.data[idx + 2];
    
    if (isWhite(r, g, b)) {
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
  
  console.log(`Processed successfully. Converted ${transparentCount} pixels to transparent.`);
  console.log('Saving image back to:', inputPath);
  
  if (typeof image.writeAsync === 'function') {
    await image.writeAsync(inputPath);
  } else {
    await image.write(inputPath);
  }
  console.log('Background removal complete!');
}

main().catch(console.error);
