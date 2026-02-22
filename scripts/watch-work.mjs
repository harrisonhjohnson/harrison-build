import fs from 'node:fs';
import { spawnSync } from 'node:child_process';

const WATCH_DIR = '/Users/harrison/work';
let timer = null;

function runSync() {
  const syncResult = spawnSync('node', ['scripts/sync-work-journal.mjs'], {
    cwd: process.cwd(),
    stdio: 'inherit'
  });

  if (syncResult.status !== 0) {
    console.error('Sync failed');
    return;
  }

  if (process.env.AUTO_PUSH === '1') {
    spawnSync('bash', ['scripts/session-start.sh'], {
      cwd: process.cwd(),
      stdio: 'inherit',
      env: { ...process.env, AUTO_PUSH: '1' }
    });
  }
}

const ac = new AbortController();

try {
  fs.watch(WATCH_DIR, { recursive: true, signal: ac.signal }, () => {
    clearTimeout(timer);
    timer = setTimeout(runSync, 1200);
  });
  console.log(`Watching ${WATCH_DIR} for changes...`);
  runSync();
} catch (err) {
  console.error(`Failed to watch ${WATCH_DIR}:`, err.message);
  process.exit(1);
}

process.on('SIGINT', () => {
  ac.abort();
  process.exit(0);
});
