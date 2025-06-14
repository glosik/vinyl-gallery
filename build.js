#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
const docsDir = path.join(__dirname, 'docs');

function copyRecursive(src, dest, excludeDirs = []) {
  const stats = fs.statSync(src);
  
  if (stats.isDirectory()) {
    const dirName = path.basename(src);
    
    // Skip excluded directories
    if (excludeDirs.includes(dirName)) {
      console.log(`⏭️  Skipping ${dirName}/ (preserved in docs/)`);
      return;
    }
    
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    
    const files = fs.readdirSync(src);
    files.forEach(file => {
      copyRecursive(
        path.join(src, file),
        path.join(dest, file),
        excludeDirs
      );
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

// Preserve images directory in docs/
const imagesToPreserve = path.join(docsDir, 'images');
let imagesBackup = null;

if (fs.existsSync(imagesToPreserve)) {
  // Create temporary backup of images
  imagesBackup = path.join(__dirname, '.images-backup');
  if (fs.existsSync(imagesBackup)) {
    fs.rmSync(imagesBackup, { recursive: true });
  }
  fs.renameSync(imagesToPreserve, imagesBackup);
  console.log('📦 Backed up images/');
}

// Clean docs directory (except images)
if (fs.existsSync(docsDir)) {
  fs.rmSync(docsDir, { recursive: true });
}
fs.mkdirSync(docsDir);

// Copy files from src/ to docs/ (excluding images if they exist)
copyRecursive(srcDir, docsDir, ['images']);

// Restore images if they were backed up
if (imagesBackup && fs.existsSync(imagesBackup)) {
  fs.renameSync(imagesBackup, imagesToPreserve);
  console.log('🖼️  Restored images/');
}

console.log('✅ Build complete!');
console.log('🎯 Images preserved in docs/images/');
console.log('🚀 Ready for GitHub Pages deployment');