#!/bin/bash

echo "🔄 Pulling latest changes..."
git pull --rebase origin main

echo "⚙️ Building data..."
node scripts/build-events.mjs
node scripts/build-news.mjs 2>/dev/null

echo "📦 Adding changes..."
git add .

if git diff --cached --quiet; then
  echo "⚠️ No changes to commit"
else
  echo "📝 Committing..."
  git commit -m "Auto deploy: updates"
  echo "🚀 Pushing..."
  git push
fi

echo "✅ Done!"