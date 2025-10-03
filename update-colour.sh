#!/bin/bash

# Update colour script for illumination request
# Usage: ./update-colour.sh "#FF0000"

if [ $# -eq 0 ]; then
    echo "Usage: ./update-colour.sh \"#FF0000\""
    echo "Example: ./update-colour.sh \"#00FF00\""
    exit 1
fi

NEW_COLOUR="$1"

echo "🎨 Updating colour to: $NEW_COLOUR"

# Update all size pages
for file in 2184x600.html 1920x1080.html 9120x112.html 4800x72.html; do
    if [ -f "$file" ]; then
        echo "Updating $file..."
        # Replace the colour variable in each file
        sed -i '' "s/window\.ILLUMINATION_COLOUR = '[^']*'/window.ILLUMINATION_COLOUR = '$NEW_COLOUR'/g" "$file"
    fi
done

echo "✅ All files updated!"

# Commit and push changes
echo "📝 Committing changes..."
git add .
git commit -m "Update global colour to $NEW_COLOUR

- Updated colour in all size pages
- New colour: $NEW_COLOUR
- All pages now display this colour"

echo "🚀 Pushing to GitHub..."
git push origin main

echo "🎉 Done! The colour has been updated globally."
echo "Your pages will now show: $NEW_COLOUR"
echo ""
echo "Updated URLs:"
echo "- https://rossclarkcodes.github.io/illumination-request/2184x600.html"
echo "- https://rossclarkcodes.github.io/illumination-request/1920x1080.html"
echo "- https://rossclarkcodes.github.io/illumination-request/9120x112.html"
echo "- https://rossclarkcodes.github.io/illumination-request/4800x72.html"
