import fs from 'node:fs';
import path from 'node:path';

const SITE_URL = 'https://harrison.build';
const BLOG_DIR = '/Users/harrison/PARA/Projects/Active/harrison-build/public/blog';
const PUBLIC_DIR = '/Users/harrison/PARA/Projects/Active/harrison-build/public';
const AUTO_POSTS_FILE = '/Users/harrison/PARA/Projects/Active/harrison-build/src/data/auto-posts.json';

const curatedPosts = [
  {
    slug: 'international-launch-control-plane',
    title: 'How to Run an International Launch Without Losing the Plot',
    description: 'A practical launch-control framework for coordinating localization, compliance, payments, marketing, and CX across new markets.',
    date: '2026-02-22',
    tags: ['international expansion', 'launch strategy', 'product operations'],
    body: [
      'International launches usually fail from coordination debt, not ambition debt. The work is technically known; what breaks is sequencing, ownership, and risk visibility.',
      'My default operating model is a launch control plane with three layers: execution map (all workstreams), critical path (hard blockers and deadlines), and decision queue (open questions with clear owners).',
      'The objective is simple: move from scattered checklists to one shared operating surface where dependencies are explicit and escalation is fast.',
      'If you are launching in stages, treat each stage like a product release. A soft launch should validate systems and uncover operational unknowns; the full marketing launch should scale only after those unknowns are resolved.'
    ]
  },
  {
    slug: 'translation-quality-at-scale',
    title: 'Translation Quality at Scale: Platform vs Intelligence',
    description: 'Why translation systems need both key coverage infrastructure and context-aware intelligence to prevent silent localization regressions.',
    date: '2026-02-21',
    tags: ['localization', 'i18n', 'translation qa'],
    body: [
      'Most localization stacks are either excellent at throughput or excellent at quality controls. You need both.',
      'A platform layer gives coverage: every key, every locale, every environment. An intelligence layer gives correctness: glossary rules, context disambiguation, UI constraints, and locale nuance.',
      'The integration pattern that works is straightforward: enrich key records with context metadata, run QA middleware before write, and expose context to translators at generation time.',
      'The result is not "perfect translations". The result is fewer high-impact errors in user-facing flows and much faster review cycles.'
    ]
  },
  {
    slug: 'referral-trial-growth-loop',
    title: 'Referral + Trial: Building a Real Growth Loop',
    description: 'How to connect referral and trial systems into one measurable loop and avoid optimizing conversion in the wrong stage.',
    date: '2026-02-20',
    tags: ['growth', 'referrals', 'trial conversion'],
    body: [
      'A common mistake is focusing on conversion rate before diagnosing traffic handoff quality. In referral systems, share-step drop-off can hide the true channel value.',
      'A practical sequence is: instrument share flow first, simplify handoff mechanics second, then test offer mechanics (for example trial incentives) once transport is reliable.',
      'Trial and referral should be architected as one loop: activation creates value, value drives sharing, sharing creates qualified trial entries, and trial outcomes feed back into activation design.',
      'When the loop is healthy, your experiments become compounding rather than isolated.'
    ]
  },
  {
    slug: 'product-memo-system',
    title: 'The Product Memo System I Use to Move Faster',
    description: 'A lightweight decision memo approach for reducing meeting overhead and improving cross-functional execution quality.',
    date: '2026-02-19',
    tags: ['product management', 'decision making', 'execution systems'],
    body: [
      'I treat memos as execution artifacts, not documentation artifacts. A useful memo narrows decisions, clarifies risks, and forces owner accountability.',
      'The template is stable: context, facts, options, recommendation, risks, and next decisions. If any section is weak, the team does not move faster.',
      'The major benefit is organizational memory. Future decisions become cheaper because assumptions and tradeoffs are explicit and reviewable.',
      'If your team is repeating the same argument every two weeks, you probably need better memo hygiene, not another recurring meeting.'
    ]
  },
  {
    slug: 'from-prototype-to-platform',
    title: 'From Prototype to Platform: Shipping Internal Tools That Last',
    description: 'Patterns for turning fast prototypes into maintainable internal platforms without rewriting everything too early.',
    date: '2026-02-18',
    tags: ['internal tools', 'platform design', 'technical strategy'],
    body: [
      'Fast prototypes are useful because they collapse uncertainty quickly. They become dangerous when teams either over-invest in polishing too early or never invest in hardening at all.',
      'The transition point is usually visible: multiple teams rely on the tool, critical decisions depend on it, and ad-hoc fixes become daily operational cost.',
      'At that point, the right move is incremental platformization: stabilize interfaces, add basic observability, and isolate high-change surfaces behind clear ownership.',
      'You do not need a rewrite to get platform benefits. You need disciplined boundaries and a roadmap that protects reliability first.'
    ]
  }
];

function esc(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function cdata(value) {
  return String(value).replace(/]]>/g, ']]]]><![CDATA[>');
}

function loadAutoPosts() {
  if (!fs.existsSync(AUTO_POSTS_FILE)) {
    return [];
  }

  try {
    const parsed = JSON.parse(fs.readFileSync(AUTO_POSTS_FILE, 'utf8'));
    if (!Array.isArray(parsed.posts)) {
      return [];
    }

    return parsed.posts
      .filter((post) => post && typeof post === 'object')
      .map((post) => ({
        slug: String(post.slug ?? '').trim(),
        title: String(post.title ?? '').trim(),
        description: String(post.description ?? '').trim(),
        date: String(post.date ?? '').trim(),
        tags: Array.isArray(post.tags) ? post.tags.map((tag) => String(tag)).slice(0, 6) : [],
        body: Array.isArray(post.body) ? post.body.map((line) => String(line)).filter(Boolean) : []
      }))
      .filter((post) => post.slug && post.title && post.description && post.date && post.body.length > 0);
  } catch (err) {
    console.warn(`Failed to load auto posts: ${err.message}`);
    return [];
  }
}

function mergePosts(posts) {
  const seen = new Set();
  return posts
    .sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug))
    .filter((post) => {
      if (seen.has(post.slug)) {
        return false;
      }
      seen.add(post.slug);
      return true;
    });
}

function renderPost(post) {
  const tagHtml = post.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join('');
  const bodyHtml = post.body.map((p) => `<p>${esc(p)}</p>`).join('\n');
  const url = `${SITE_URL}/blog/${post.slug}.html`;
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${esc(post.title)} | Harrison Johnson</title>
  <meta name="description" content="${esc(post.description)}" />
  <meta name="keywords" content="${esc(post.tags.join(', '))}" />
  <link rel="canonical" href="${url}" />
  <meta property="og:type" content="article" />
  <meta property="og:title" content="${esc(post.title)}" />
  <meta property="og:description" content="${esc(post.description)}" />
  <meta property="og:url" content="${url}" />
  <meta property="og:site_name" content="Harrison Build" />
  <meta name="twitter:card" content="summary_large_image" />
  <script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: { '@type': 'Person', name: 'Harrison Johnson' },
    mainEntityOfPage: url,
    publisher: { '@type': 'Person', name: 'Harrison Johnson' }
  })}</script>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 760px; margin: 0 auto; padding: 28px 16px 48px; color: #1a1a1a; line-height: 1.65; }
    a { color: #0b4d8a; }
    .meta { color: #566; font-size: 14px; margin-bottom: 12px; }
    .tags { display: flex; flex-wrap: wrap; gap: 8px; margin: 14px 0 20px; }
    .tag { font-size: 12px; background: #eef3ff; border: 1px solid #cdd9ff; border-radius: 999px; padding: 3px 10px; }
    h1 { line-height: 1.25; margin-bottom: 8px; }
    p { margin: 0 0 14px; }
    nav { margin-top: 28px; font-size: 14px; }
  </style>
</head>
<body>
  <header>
    <h1>${esc(post.title)}</h1>
    <div class="meta">Published ${post.date}</div>
    <div class="tags">${tagHtml}</div>
  </header>
  <main>
    ${bodyHtml}
  </main>
  <nav>
    <a href="/blog/index.html">← Back to Blog Index</a> · <a href="/">Home</a>
  </nav>
</body>
</html>`;
}

function renderIndex(items) {
  const rows = items.map((post) => `
    <article>
      <h2><a href="/blog/${post.slug}.html">${esc(post.title)}</a></h2>
      <p class="meta">${post.date} · ${esc(post.tags.join(' · '))}</p>
      <p>${esc(post.description)}</p>
    </article>
  `).join('\n');

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Blog | Harrison Johnson</title>
  <meta name="description" content="Essays on product strategy, international expansion, localization systems, and growth execution." />
  <link rel="canonical" href="${SITE_URL}/blog/index.html" />
  <link rel="alternate" type="application/rss+xml" title="Harrison Build RSS" href="${SITE_URL}/rss.xml" />
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 820px; margin: 0 auto; padding: 28px 16px 48px; color: #1a1a1a; }
    h1 { margin-bottom: 8px; }
    .lead { color: #465; margin-bottom: 22px; }
    article { border-top: 1px solid #e2e6f0; padding-top: 16px; margin-top: 16px; }
    h2 { margin: 0 0 6px; font-size: 22px; }
    h2 a { color: #0b4d8a; text-decoration: none; }
    h2 a:hover { text-decoration: underline; }
    .meta { font-size: 13px; color: #556; margin: 0 0 8px; }
  </style>
</head>
<body>
  <h1>Blog</h1>
  <p class="lead">Writing on product systems, launch execution, localization quality, and growth operations.</p>
  ${rows}
  <p><a href="/">← Home</a></p>
</body>
</html>`;
}

function renderSitemap(items) {
  const urls = [
    `${SITE_URL}/`,
    `${SITE_URL}/blog/index.html`,
    ...items.map((p) => `${SITE_URL}/blog/${p.slug}.html`)
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u}</loc></url>`).join('\n')}
</urlset>\n`;
}

function renderRss(items) {
  const feedItems = items.map((p) => `
    <item>
      <title><![CDATA[${cdata(p.title)}]]></title>
      <link>${SITE_URL}/blog/${p.slug}.html</link>
      <guid>${SITE_URL}/blog/${p.slug}.html</guid>
      <pubDate>${new Date(`${p.date}T12:00:00Z`).toUTCString()}</pubDate>
      <description><![CDATA[${cdata(p.description)}]]></description>
    </item>
  `).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Harrison Build</title>
    <link>${SITE_URL}/blog/index.html</link>
    <description>Product, launch, and localization strategy writing.</description>
    ${feedItems}
  </channel>
</rss>\n`;
}

const posts = mergePosts([...loadAutoPosts(), ...curatedPosts]);

fs.mkdirSync(BLOG_DIR, { recursive: true });
for (const post of posts) {
  fs.writeFileSync(path.join(BLOG_DIR, `${post.slug}.html`), renderPost(post), 'utf8');
}
fs.writeFileSync(path.join(BLOG_DIR, 'index.html'), renderIndex(posts), 'utf8');
fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), renderSitemap(posts), 'utf8');
fs.writeFileSync(path.join(PUBLIC_DIR, 'rss.xml'), renderRss(posts), 'utf8');
fs.writeFileSync(path.join(PUBLIC_DIR, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${SITE_URL}/sitemap.xml\n`, 'utf8');

console.log(`Built blog with ${posts.length} posts`);
