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
    description: 'A launch-control framework for coordinating localization, compliance, analytics, and go-to-market execution across new markets.',
    date: '2026-02-22',
    tags: ['international expansion', 'launch strategy', 'product operations'],
    techStack: ['Looker', 'Figma', 'Notion', 'Slack', 'SQL'],
    body: [
      'International launches usually fail because coordination breaks before strategy does. Teams know what to do in isolation, but sequencing, ownership, and escalation pathways are often implicit.',
      'I run launches with a control-plane model that has three layers: an execution map (every workstream), a critical path (hard blockers and deadlines), and a decision queue (open questions with named owners).',
      'This shifts planning from scattered checklists to one operating view where dependencies are explicit and risk is visible early.',
      'If launch is phased, treat each phase like a product release. Use soft launch to validate operations and identify unknowns, then scale marketing only after launch-critical risks are resolved.'
    ]
  },
  {
    slug: 'translation-quality-at-scale',
    title: 'Translation Quality at Scale: Platform vs Intelligence',
    description: 'Why localization systems need both translation coverage and context-aware intelligence to prevent silent quality regressions.',
    date: '2026-02-21',
    tags: ['localization', 'i18n', 'translation qa'],
    techStack: ['Crowdin', 'Figma', 'Linear', 'ICU MessageFormat', 'GitHub Actions'],
    body: [
      'Most localization stacks optimize for either throughput or quality assurance. Durable systems require both.',
      'A platform layer provides coverage across keys, locales, and environments. An intelligence layer enforces correctness through glossary controls, context disambiguation, UI constraints, and locale conventions.',
      'The implementation pattern is practical: enrich keys with context metadata, run QA checks before publish, and expose context directly in translator workflows.',
      'The goal is not perfect translation. The goal is fewer high-impact user-facing errors and faster review cycles with clearer quality gates.'
    ]
  },
  {
    slug: 'referral-trial-growth-loop',
    title: 'Referral + Trial: Building a Real Growth Loop',
    description: 'How to connect referral and trial systems into one measurable loop and avoid optimizing conversion in the wrong stage.',
    date: '2026-02-20',
    tags: ['growth', 'referrals', 'trial conversion'],
    techStack: ['Amplitude', 'Segment', 'Looker', 'PostHog', 'A/B testing'],
    body: [
      'Teams often jump to conversion optimization before validating referral transport quality. If share-step handoff is weak, conversion tests can produce misleading conclusions.',
      'A better sequence is: instrument share flow first, reduce handoff friction second, then test offer mechanics after transport reliability is stable.',
      'Referral and trial should be designed as one loop: activation creates value, value drives sharing, sharing creates qualified entries, and trial outcomes inform activation design.',
      'When the loop is healthy, experiments compound instead of producing isolated local gains.'
    ]
  },
  {
    slug: 'product-memo-system',
    title: 'The Product Memo System I Use to Move Faster',
    description: 'A lightweight decision memo approach for reducing meeting overhead and improving cross-functional execution quality.',
    date: '2026-02-19',
    tags: ['product management', 'decision making', 'execution systems'],
    techStack: ['Notion', 'Google Docs', 'Linear', 'Slack'],
    body: [
      'I treat memos as execution artifacts, not documentation artifacts. Strong memos narrow decisions, clarify risk, and assign accountability.',
      'My baseline structure is stable: context, facts, options, recommendation, risks, and next decisions. If one section is weak, execution slows.',
      'The long-term payoff is organizational memory: assumptions and tradeoffs are explicit, so future decisions are faster and lower-friction.',
      'If a team repeats the same debate every two weeks, the issue is usually memo quality, not meeting frequency.'
    ]
  },
  {
    slug: 'from-prototype-to-platform',
    title: 'From Prototype to Platform: Shipping Internal Tools That Last',
    description: 'Patterns for turning fast prototypes into maintainable internal platforms without rewriting everything too early.',
    date: '2026-02-18',
    tags: ['internal tools', 'platform design', 'technical strategy'],
    techStack: ['React', 'Node.js', 'Vite', 'Postgres', 'GitHub Actions'],
    body: [
      'Prototypes are valuable because they collapse uncertainty quickly. They become liabilities when teams either polish too early or never harden at all.',
      'The transition point is usually clear: more teams depend on the tool, critical decisions rely on its output, and ad-hoc fixes become routine operational cost.',
      'The right move is incremental platformization: stabilize interfaces, add baseline observability, and isolate high-change surfaces behind clear ownership.',
      'You do not need a full rewrite to gain platform reliability. You need disciplined boundaries and a roadmap that protects stability first.'
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
        techStack: Array.isArray(post.techStack) ? post.techStack.map((item) => String(item)).slice(0, 8) : [],
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
  const stackHtml = (post.techStack ?? []).map((t) => `<span class="tag stack">${esc(t)}</span>`).join('');
  const stackMeta = post.techStack?.length ? `<div class="meta">Tech stack: ${esc(post.techStack.join(' · '))}</div>` : '';
  const stackHeadMeta = post.techStack?.length ? `\n  <meta name="x-tech-stack" content="${esc(post.techStack.join(', '))}" />` : '';
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
${stackHeadMeta}
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
    publisher: { '@type': 'Person', name: 'Harrison Johnson' },
    keywords: [...(post.tags ?? []), ...(post.techStack ?? [])].join(', '),
    about: (post.techStack ?? []).map((name) => ({ '@type': 'Thing', name }))
  })}</script>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 760px; margin: 0 auto; padding: 28px 16px 48px; color: #1a1a1a; line-height: 1.65; }
    a { color: #0b4d8a; }
    .meta { color: #566; font-size: 14px; margin-bottom: 12px; }
    .tags { display: flex; flex-wrap: wrap; gap: 8px; margin: 14px 0 20px; }
    .tag { font-size: 12px; background: #eef3ff; border: 1px solid #cdd9ff; border-radius: 999px; padding: 3px 10px; }
    .tag.stack { background: #edf8ef; border-color: #b8dec0; }
    h1 { line-height: 1.25; margin-bottom: 8px; }
    p { margin: 0 0 14px; }
    nav { margin-top: 28px; font-size: 14px; }
  </style>
</head>
<body>
  <header>
    <h1>${esc(post.title)}</h1>
    <div class="meta">Published ${post.date}</div>
    ${stackMeta}
    <div class="tags">${tagHtml}</div>
    ${stackHtml ? `<div class="tags">${stackHtml}</div>` : ''}
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
      ${post.techStack?.length ? `<p class="meta">Tech stack: ${esc(post.techStack.join(' · '))}</p>` : ''}
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
