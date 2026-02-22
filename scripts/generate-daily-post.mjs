import fs from 'node:fs';
import path from 'node:path';

const WORK_DIR = '/Users/harrison/work';
const AUTO_POSTS_FILE = '/Users/harrison/PARA/Projects/Active/harrison-build/src/data/auto-posts.json';
const MAX_AUTO_POSTS = 30;

const EXCLUDE = [
  /^TODO/i,
  /^2026-\d{2}-\d{2}-slack-drafts/i,
  /^slack-drafts/i,
  /^email-drafts/i,
  /^newsletters\//i
];

const NAME_REDACTIONS = [
  'Darrell', 'Shyam', 'Aaron', 'Bobby', 'Kevin', 'Tom', 'Bryce', 'Sabrina', 'Phil', 'Van', 'Bob', 'Dylan', 'Patrick', 'Nick', 'Juan', 'Alex'
];

function ensureFile() {
  if (!fs.existsSync(AUTO_POSTS_FILE)) {
    fs.mkdirSync(path.dirname(AUTO_POSTS_FILE), { recursive: true });
    fs.writeFileSync(AUTO_POSTS_FILE, JSON.stringify({ posts: [] }, null, 2) + '\n', 'utf8');
  }
}

function isEligible(name) {
  if (!name.toLowerCase().endsWith('.md')) return false;
  return !EXCLUDE.some((re) => re.test(name));
}

function redact(text) {
  let out = text;
  for (const name of NAME_REDACTIONS) {
    const re = new RegExp(`\\b${name}\\b`, 'g');
    out = out.replace(re, 'a team member');
  }
  out = out.replace(/\b[A-Z][a-z]+\s+[A-Z][a-z]+\b/g, 'a team member');
  return out;
}

function firstTitle(content, fallback) {
  for (const raw of content.split(/\r?\n/)) {
    const line = raw.trim();
    if (line.startsWith('# ')) return line.slice(2).trim();
  }
  return fallback;
}

function extractParagraphs(content, max = 5) {
  const lines = content.split(/\r?\n/).map((l) => l.trim());
  const out = [];
  for (const line of lines) {
    if (!line || line.startsWith('#') || line.startsWith('|') || line.startsWith('```')) continue;
    if (line.startsWith('- ') || line.startsWith('* ') || /^\d+\./.test(line)) continue;
    const cleaned = redact(line);
    if (cleaned.length < 30) continue;
    out.push(cleaned.length > 260 ? `${cleaned.slice(0, 257)}...` : cleaned);
    if (out.length >= max) break;
  }
  return out;
}

function deriveTags(name, title) {
  const text = `${name} ${title}`.toLowerCase();
  const tags = [];
  if (/launch|international|uk|europe|market/.test(text)) tags.push('international expansion');
  if (/translation|localization|i18n|l10n/.test(text)) tags.push('localization');
  if (/trial|referral|conversion|growth/.test(text)) tags.push('growth');
  if (/dashboard|analytics|data|forecast/.test(text)) tags.push('analytics');
  if (/strategy|roadmap|memo|review/.test(text)) tags.push('strategy');
  if (tags.length === 0) tags.push('product operations');
  return tags.slice(0, 4);
}

function latestDoc() {
  const names = fs.readdirSync(WORK_DIR);
  const eligible = [];
  for (const name of names) {
    if (!isEligible(name)) continue;
    const full = path.join(WORK_DIR, name);
    const stat = fs.statSync(full);
    if (!stat.isFile()) continue;
    eligible.push({ name, full, stat });
  }
  eligible.sort((a, b) => b.stat.mtimeMs - a.stat.mtimeMs);
  return eligible[0] ?? null;
}

function main() {
  ensureFile();
  const data = JSON.parse(fs.readFileSync(AUTO_POSTS_FILE, 'utf8'));
  const posts = Array.isArray(data.posts) ? data.posts : [];

  const today = new Date().toISOString().slice(0, 10);
  if (posts.some((p) => p.date === today)) {
    console.log('Daily post already exists for today.');
    return;
  }

  const doc = latestDoc();
  if (!doc) {
    console.log('No eligible work doc found.');
    return;
  }

  const content = fs.readFileSync(doc.full, 'utf8');
  const fallbackTitle = doc.name.replace(/\.md$/i, '').replace(/-/g, ' ');
  const titleBase = firstTitle(content, fallbackTitle);
  const title = redact(titleBase);
  const body = extractParagraphs(content, 5);

  if (body.length === 0) {
    console.log('No usable body paragraphs found for daily post.');
    return;
  }

  const slugBase = doc.name.replace(/\.md$/i, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  const slug = `daily-${today}-${slugBase}`;
  const description = body[0].slice(0, 180);

  posts.unshift({
    slug,
    title: `Daily Note: ${title}`,
    description,
    date: today,
    tags: deriveTags(doc.name, title),
    body,
    source_path: `~/work/${doc.name}`
  });

  const trimmed = posts.slice(0, MAX_AUTO_POSTS);
  fs.writeFileSync(AUTO_POSTS_FILE, JSON.stringify({ posts: trimmed }, null, 2) + '\n', 'utf8');
  console.log(`Generated daily post from ${doc.name}`);
}

main();
