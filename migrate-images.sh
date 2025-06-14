#!/bin/bash

# 🗂️ Script to reorganize images by decades
# Run this from your project root directory

echo "🗂️ Reorganizing images by decades..."

# Create decade folders for each format
formats=("vinyl" "cd" "cassette")
decades=("1980s" "1990s" "2000s")

for format in "${formats[@]}"; do
    echo "📁 Processing $format format..."
    
    # Create decade subdirectories
    for decade in "${decades[@]}"; do
        mkdir -p "docs/images/$format/$decade"
        echo "   Created docs/images/$format/$decade/"
    done
done

echo ""
echo "✅ Folder structure created!"
echo ""
echo "📋 Next steps:"
echo "1. Manually move your images to the appropriate decade folders:"
echo "   - 1980s albums → docs/images/{format}/1980s/"
echo "   - 1990s albums → docs/images/{format}/1990s/"  
echo "   - 2000s albums → docs/images/{format}/2000s/"
echo ""
echo "2. Update your JavaScript code with the changes provided"
echo ""
echo "🎯 Example moves:"
echo "   docs/images/vinyl/thriller_michael-jackson-vinyl.jpg"
echo "   → docs/images/vinyl/1980s/thriller_michael-jackson-vinyl.jpg"
echo ""
echo "   docs/images/vinyl/nevermind_nirvana-vinyl.jpg" 
echo "   → docs/images/vinyl/1990s/nevermind_nirvana-vinyl.jpg"