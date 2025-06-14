#!/bin/bash

# 🚀 Vinyl Gallery Deployment Script
# This script automates the manual deployment process

set -e  # Exit on any error

echo "🎵 Deploying Vinyl Gallery..."

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo "❌ Error: Not in a git repository"
    exit 1
fi

# Check if there are uncommitted changes
if [ -n "$(git status --porcelain)" ]; then
    echo "⚠️  Warning: You have uncommitted changes"
    echo "📝 Current status:"
    git status --short
    echo ""
    read -p "Continue anyway? (y/N): " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "❌ Deployment cancelled"
        exit 1
    fi
fi

# Build the project
echo "🔨 Building project (src → docs)..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

echo "✅ Build successful!"

# Get commit message
echo ""
read -p "📝 Enter commit message (or press Enter for default): " commit_message

if [ -z "$commit_message" ]; then
    commit_message="Update vinyl gallery - $(date '+%Y-%m-%d %H:%M')"
fi

# Add, commit, and push
echo "📦 Adding files to git..."
git add .

echo "💾 Committing changes..."
git commit -m "$commit_message"

echo "🚀 Pushing to GitHub..."
git push origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 Deployment successful!"
    echo "🌐 Your site will be available at:"
    echo "   https://$(git config --get remote.origin.url | sed 's/.*github.com[:/]\([^/]*\)\/\([^.]*\).*/\1.github.io\/\2/')/"
    echo ""
    echo "⏱️  It may take 1-5 minutes for changes to appear"
    echo "📊 Check deployment status: GitHub → Settings → Pages"
else
    echo "❌ Push failed!"
    exit 1
fi 