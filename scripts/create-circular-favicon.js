const sharp = require('sharp');
const path = require('path');

async function createCircularFavicon() {
  try {
    const inputPath = path.join(__dirname, '../public/logo-small.png');
    const outputPath = path.join(__dirname, '../public/logo-small-circular.png');
    
    // Get image dimensions
    const metadata = await sharp(inputPath).metadata();
    const size = Math.min(metadata.width, metadata.height);
    
    // Create circular mask
    const mask = Buffer.from(
      `<svg width="${size}" height="${size}">
        <circle cx="${size/2}" cy="${size/2}" r="${size/2}" fill="white"/>
      </svg>`
    );
    
    // Process image to be circular
    await sharp(inputPath)
      .resize(size, size, { fit: 'cover', position: 'center' })
      .composite([
        {
          input: mask,
          blend: 'dest-in'
        }
      ])
      .png()
      .toFile(outputPath);
    
    console.log('✅ Favicon circolare creato con successo:', outputPath);
    
    // Also create smaller sizes for better favicon compatibility
    const sizes = [16, 32, 48, 64];
    
    for (const faviconSize of sizes) {
      const faviconOutputPath = path.join(__dirname, `../public/favicon-${faviconSize}x${faviconSize}.png`);
      
      const smallMask = Buffer.from(
        `<svg width="${faviconSize}" height="${faviconSize}">
          <circle cx="${faviconSize/2}" cy="${faviconSize/2}" r="${faviconSize/2}" fill="white"/>
        </svg>`
      );
      
      await sharp(inputPath)
        .resize(faviconSize, faviconSize, { fit: 'cover', position: 'center' })
        .composite([
          {
            input: smallMask,
            blend: 'dest-in'
          }
        ])
        .png()
        .toFile(faviconOutputPath);
      
      console.log(`✅ Favicon ${faviconSize}x${faviconSize} creato`);
    }
    
  } catch (error) {
    console.error('❌ Errore nella creazione del favicon circolare:', error);
  }
}

createCircularFavicon();
