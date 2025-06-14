#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
const docsDir = path.join(__dirname, 'docs');

// Simple recursive copy function
function copyRecursive(src, dest) {
  const stats = fs.statSync(src);
  
  if (stats.isDirectory()) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    
    const files = fs.readdirSync(src);
    files.forEach(file => {
      copyRecursive(
        path.join(src, file),
        path.join(dest, file)
      );
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

// Clean docs directory
if (fs.existsSync(docsDir)) {
  fs.rmSync(docsDir, { recursive: true });
}
fs.mkdirSync(docsDir);

// Copy all files from src to docs
copyRecursive(srcDir, docsDir);

console.log('✅ Build complete! Files copied from src/ to docs/');
console.log('🚀 Ready for GitHub Pages deployment'); 