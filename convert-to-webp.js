#!/usr/bin/env node

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const QUALITY = 85; // WebP quality (0-100, recommended: 80-90)
const KEEP_ORIGINALS = false; // Set to true to keep .jpg files

async function convertToWebP(inputPath, outputPath) {
  try {
    const info = await sharp(inputPath)
      .webp({ quality: QUALITY })
      .toFile(outputPath);
    
    const inputSize = fs.statSync(inputPath).size;
    const outputSize = info.size;
    const savings = ((inputSize - outputSize) / inputSize * 100).toFixed(1);
    
    console.log(`✅ ${path.basename(inputPath)} → ${path.basename(outputPath)} (${savings}% smaller)`);
    
    // Delete original if configured to do so
    if (!KEEP_ORIGINALS) {
      fs.unlinkSync(inputPath);
    }
    
    return { inputSize, outputSize, savings: parseFloat(savings) };
  } catch (error) {
    console.error(`❌ Failed to convert ${inputPath}:`, error.message);
    return null;
  }
}

async function processDirectory(dirPath) {
  const files = fs.readdirSync(dirPath);
  const stats = { totalFiles: 0, converted: 0, totalSavings: 0, originalSize: 0, newSize: 0 };
  
  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // Recursively process subdirectories
      const subStats = await processDirectory(filePath);
      stats.totalFiles += subStats.totalFiles;
      stats.converted += subStats.converted;
      stats.originalSize += subStats.originalSize;
      stats.newSize += subStats.newSize;
    } else if (file.toLowerCase().match(/\.(jpg|jpeg|png)$/)) {
      stats.totalFiles++;
      const webpPath = filePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
      
      const result = await convertToWebP(filePath, webpPath);
      if (result) {
        stats.converted++;
        stats.originalSize += result.inputSize;
        stats.newSize += result.outputSize;
      }
    }
  }
  
  return stats;
}

async function main() {
  const imagesDir = path.join(__dirname, 'docs', 'images');
  
  if (!fs.existsSync(imagesDir)) {
    console.error('❌ docs/images directory not found!');
    process.exit(1);
  }
  
  console.log('🎯 Converting images to WebP format...');
  console.log(`📊 Quality setting: ${QUALITY}%`);
  console.log(`🗂️ Keep originals: ${KEEP_ORIGINALS}\n`);
  
  const startTime = Date.now();
  const stats = await processDirectory(imagesDir);
  const duration = ((Date.now() - startTime) / 1000).toFixed(1);
  
  console.log('\n📈 Conversion Summary:');
  console.log(`   Files processed: ${stats.converted}/${stats.totalFiles}`);
  console.log(`   Original size: ${(stats.originalSize / 1024 / 1024).toFixed(1)} MB`);
  console.log(`   New size: ${(stats.newSize / 1024 / 1024).toFixed(1)} MB`);
  console.log(`   Total savings: ${((stats.originalSize - stats.newSize) / stats.originalSize * 100).toFixed(1)}%`);
  console.log(`   Duration: ${duration}s`);
  
  console.log('\n🔧 Next steps:');
  console.log('1. Update your code to use .webp extensions');
  console.log('2. Test locally with npm run dev');
  console.log('3. Deploy with git add . && git commit && git push');
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { convertToWebP, processDirectory };