#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

node scripts/sync-work-journal.mjs
node scripts/generate-daily-post.mjs
node scripts/build-blog.mjs

if [[ "${AUTO_PUSH:-0}" == "1" ]]; then
  if ! git diff --quiet -- \
    src/data/work-updates.json \
    src/data/auto-posts.json \
    public/blog \
    public/rss.xml \
    public/sitemap.xml \
    public/robots.txt; then
    git add \
      src/data/work-updates.json \
      src/data/auto-posts.json \
      public/blog \
      public/rss.xml \
      public/sitemap.xml \
      public/robots.txt
    git commit -m "chore: sync work journal $(date +%Y-%m-%d)" || true
    git push
    echo "Synced and pushed journal/blog updates."
  else
    echo "No journal/blog changes to push."
  fi
else
  echo "AUTO_PUSH=0; synced local journal/blog data only."
fi
