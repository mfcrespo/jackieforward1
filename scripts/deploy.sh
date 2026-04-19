#!/bin/bash

set -e

echo "🔄 Pulling latest changes..."
git pull --rebase origin main

echo "⚙️ Building ALL data..."
node scripts/build-all.mjs

echo "📦 Adding changes..."
git add .

if git diff --cached --quiet; then
  echo "⚠️ No changes to commit"
else
  echo "📝 Committing..."
  git commit -m "Auto deploy: rebuild data + content"
  echo "🚀 Pushing..."
  git push
fi

echo "✅ Done!"