#!/bin/bash
# Build script for GitHub Pages deployment
# This script creates a static version with relative paths

set -e

echo "🔨 Building static version for GitHub Pages..."

# Clean docs directory
rm -rf docs
mkdir -p docs

# Get HTML from local server
echo "📥 Fetching HTML from local server..."
curl -s http://localhost:3000 > docs/index.html

# Copy static files
echo "📦 Copying static files..."
cp -r public/static docs/

# Fix paths for GitHub Pages (change absolute to relative)
echo "🔧 Converting absolute paths to relative paths..."
sed -i 's|src="/static/|src="./static/|g' docs/index.html
sed -i 's|href="/static/|href="./static/|g' docs/index.html

echo "✅ Static build complete!"
echo ""
echo "📊 Generated files:"
ls -lh docs/
echo ""
echo "🔍 Checking paths:"
grep -E "src=\"\./static|href=\"\./static" docs/index.html || echo "No static file references found"
echo ""
echo "✨ Ready to commit and push to GitHub!"
