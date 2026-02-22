#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

node scripts/sync-work-journal.mjs

if [[ "${AUTO_PUSH:-0}" == "1" ]]; then
  if ! git diff --quiet -- src/data/work-updates.json; then
    git add src/data/work-updates.json
    git commit -m "chore: sync work journal $(date +%Y-%m-%d)" || true
    git push
    echo "Synced and pushed work journal updates."
  else
    echo "No work journal changes to push."
  fi
else
  echo "AUTO_PUSH=0; synced local data only."
fi
