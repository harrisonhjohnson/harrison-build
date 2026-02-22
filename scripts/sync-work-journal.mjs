import fs from 'node:fs';
import path from 'node:path';

const WORK_DIR = '/Users/harrison/work';
const PERSONAL_PROJECTS_DIR = '/Users/harrison/personal/projects';
const OUT_FILE = '/Users/harrison/PARA/Projects/Active/harrison-build/src/data/work-updates.json';
const MAX_ITEMS = 20;

function readTitle(content, fallback) {
  const lines = content.split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('# ')) {
      return trimmed.replace(/^#\s+/, '').trim();
    }
  }
  return fallback;
}

function readSummary(content) {
  const lines = content.split(/\r?\n/).map((l) => l.trim());
  for (const line of lines) {
    if (!line || line.startsWith('#') || line.startsWith('**') || line.startsWith('|') || line.startsWith('- ') || line.startsWith('* ')) {
      continue;
    }
    return line.length > 220 ? `${line.slice(0, 217)}...` : line;
  }
  return '';
}

function getTopLevelMdFiles(dir) {
  const names = fs.readdirSync(dir);
  const out = [];
  for (const name of names) {
    if (!name.toLowerCase().endsWith('.md')) continue;
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (!stat.isFile()) continue;
    if (name.startsWith('TODO')) continue;
    out.push({ name, full, stat });
  }
  return out;
}

function getProjectMdFiles(dir) {
  if (!fs.existsSync(dir)) {
    return [];
  }
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const out = [];
  for (const entry of entries) {
    if (!entry.isDirectory()) {
      continue;
    }
    const full = path.join(dir, entry.name, 'PROJECT.md');
    if (!fs.existsSync(full)) {
      continue;
    }
    const stat = fs.statSync(full);
    out.push({ name: `${entry.name}/PROJECT.md`, full, stat, source: 'personal' });
  }
  return out;
}

function build() {
  const workFiles = getTopLevelMdFiles(WORK_DIR).map((f) => ({ ...f, source: 'work' }));
  const personalFiles = getProjectMdFiles(PERSONAL_PROJECTS_DIR);

  const files = [...workFiles, ...personalFiles]
    .sort((a, b) => b.stat.mtimeMs - a.stat.mtimeMs)
    .slice(0, MAX_ITEMS);

  const updates = files.map((f) => {
    const content = fs.readFileSync(f.full, 'utf8');
    const fallbackTitle = f.name.replace(/\.md$/i, '').replace(/-/g, ' ');
    return {
      file: f.name,
      path: f.source === 'work' ? `~/work/${f.name}` : `~/personal/projects/${f.name}`,
      source: f.source,
      updated_at: new Date(f.stat.mtimeMs).toISOString().slice(0, 10),
      title: readTitle(content, fallbackTitle),
      summary: readSummary(content)
    };
  });

  const payload = {
    generated_at: new Date().toISOString(),
    source_dir: WORK_DIR,
    updates
  };

  fs.writeFileSync(OUT_FILE, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
  console.log(`Wrote ${OUT_FILE} (${updates.length} entries)`);
}

build();
