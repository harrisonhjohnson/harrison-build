import { useEffect, useMemo, useRef, useState } from 'react';

const WINDOWS = [
  {
    id: 'home-window',
    title: 'Home',
    icon: '🏠',
    label: 'Home',
    defaultPosition: { top: 56, left: 108 },
    defaultOpen: true,
    content: (
      <>
        <h2>Harrison Johnson</h2>
        <p>I lead product initiatives at the intersection of international expansion, localization quality, and growth execution.</p>
        <p className="subtle">Product Lead at Chameleon.io | Based in New York</p>

        <section className="trio-strip" aria-label="Snapshot of impact">
          <article>
            <h3>Expansion</h3>
            <ul>
              <li>Led UK launch planning across legal, localization, CX, payments, and operations.</li>
              <li>Built repeatable planning artifacts for next EU market decisions.</li>
            </ul>
          </article>
          <article>
            <h3>Localization</h3>
            <ul>
              <li>Defined translation intelligence layer across glossary, QA, and locale context.</li>
              <li>Scoped integration path for 1,383-key translation platform.</li>
            </ul>
          </article>
          <article>
            <h3>Growth</h3>
            <ul>
              <li>Diagnosed referral funnel friction and trial-led activation opportunities.</li>
              <li>Translated analysis into prioritized experiment recommendations.</li>
            </ul>
          </article>
        </section>

        <h3>Proof Points</h3>
        <ul className="wins-list">
          <li><strong>1,383</strong> translation keys aligned into a single operational platform direction.</li>
          <li><strong>192</strong> glossary terms curated across 10 product and domain areas.</li>
          <li><strong>210</strong> Figma screens mapped for translation context and UI fit.</li>
          <li><strong>7</strong> translation QA rules defined, including 6 launch-blocking checks.</li>
        </ul>
      </>
    )
  },
  {
    id: 'work-window',
    title: 'Work',
    icon: '💼',
    label: 'Work',
    defaultPosition: { top: 82, left: 170 },
    content: (
      <>
        <h2>Selected Work</h2>

        <section className="project-card">
          <h3>International Expansion (UK + EU)</h3>
          <p className="project-meta"><span className="status active">Flagship</span><span>Product Leadership</span></p>
          <p>Drove cross-functional launch sequencing across legal, packaging, localization, CX, analytics, and fulfillment.</p>
          <p><strong>Impact:</strong> Created an actionable launch control plan and translated launch learnings into reusable EU playbooks.</p>
        </section>

        <section className="project-card">
          <h3>Translation Intelligence Unification</h3>
          <p className="project-meta"><span className="status active">Flagship</span><span>Localization Systems</span></p>
          <p>Built quality infrastructure: glossary, QA rules, locale conventions, and UI context mapping.</p>
          <p><strong>Impact:</strong> Defined a practical architecture to combine platform scale with linguistic correctness.</p>
        </section>

        <section className="project-card">
          <h3>Referral + Trial Growth Loop</h3>
          <p className="project-meta"><span className="status scoped">In Development</span><span>Growth Diagnostics</span></p>
          <p>Analyzed acquisition and referral behavior to isolate the highest-leverage friction points.</p>
          <p><strong>Impact:</strong> Reframed efforts from top-funnel volume toward share-mechanic and trial-conversion improvements.</p>
        </section>
      </>
    )
  },
  {
    id: 'case-window',
    title: 'Case Studies',
    icon: '📚',
    label: 'Cases',
    defaultPosition: { top: 98, left: 248 },
    content: (
      <>
        <h2>Case Studies</h2>

        <section className="project-card">
          <h3>UK Launch Execution</h3>
          <p><strong>Problem:</strong> Launch readiness was distributed across many teams and dependencies, increasing risk of missed launch-critical work.</p>
          <p><strong>What I did:</strong> Built phased roadmap, tightened owner accountability, and created blocker escalation loops tied to launch date.</p>
          <p><strong>Outcome:</strong> Turned fragmented planning into a single operating view for launch decisions and next-market readiness.</p>
        </section>

        <section className="project-card">
          <h3>Translation Quality at Scale</h3>
          <p><strong>Problem:</strong> Platform coverage existed, but translation quality and contextual consistency were uneven.</p>
          <p><strong>What I did:</strong> Designed intelligence layer with glossary terms, QA gates, locale profiles, and UI-aware context mapping.</p>
          <p><strong>Outcome:</strong> Established a concrete integration path from basic key management to quality-enforced localization operations.</p>
        </section>

        <section className="project-card">
          <h3>Referral + Trial Funnel Diagnosis</h3>
          <p><strong>Problem:</strong> High referral interaction volume did not translate into meaningful share sessions and conversions.</p>
          <p><strong>What I did:</strong> Mapped funnel drop-off points and framed trial + referral changes as a combined growth experiment set.</p>
          <p><strong>Outcome:</strong> Clarified where to intervene first and what to test next for measurable acquisition lift.</p>
        </section>
      </>
    )
  },
  {
    id: 'writing-window',
    title: 'Writing',
    icon: '📝',
    label: 'Writing',
    defaultPosition: { top: 120, left: 300 },
    content: (
      <>
        <h2>Writing</h2>
        <p>
          Essays and working notes on product execution, international expansion,
          localization systems, and growth strategy.
        </p>
        <div className="cta-row">
          <a className="cta-button" href="/blog/index.html" target="_blank" rel="noreferrer">Open Blog Index</a>
          <a className="cta-button" href="/rss.xml" target="_blank" rel="noreferrer">RSS Feed</a>
          <a className="cta-button" href="/sitemap.xml" target="_blank" rel="noreferrer">Sitemap</a>
        </div>

        <section className="project-card">
          <h3><a href="/blog/international-launch-control-plane.html" target="_blank" rel="noreferrer">How to Run an International Launch Without Losing the Plot</a></h3>
          <p className="subtle">Operations design for multi-market rollouts.</p>
        </section>

        <section className="project-card">
          <h3><a href="/blog/translation-quality-at-scale.html" target="_blank" rel="noreferrer">Translation Quality at Scale: Platform vs Intelligence</a></h3>
          <p className="subtle">System design tradeoffs for i18n and QA.</p>
        </section>

        <section className="project-card">
          <h3><a href="/blog/referral-trial-growth-loop.html" target="_blank" rel="noreferrer">Referral + Trial: Building a Real Growth Loop</a></h3>
          <p className="subtle">Acquisition mechanics and instrumentation sequencing.</p>
        </section>
      </>
    )
  },
  {
    id: 'about-window',
    title: 'About',
    icon: '👋',
    label: 'About',
    defaultPosition: { top: 136, left: 338 },
    content: (
      <>
        <h2>About</h2>
        <p>I am a product leader focused on turning complex cross-functional initiatives into clear, executable systems.</p>
        <p>I work best at the intersection of international launch operations, localization quality, and growth execution.</p>

        <h3>Experience</h3>
        <ul>
          <li><strong>Product Lead, Chameleon.io</strong> (2024-Present)</li>
          <li><strong>Co-Founder, Driveway.app</strong> (2020-2024)</li>
          <li><strong>Operations + Product, Managed by Q</strong> (2014-2020)</li>
        </ul>

        <h3>How I Work</h3>
        <ul>
          <li>Lead with decisions, not status updates.</li>
          <li>Use lightweight systems to keep teams aligned and moving.</li>
          <li>Translate analysis into practical next actions.</li>
        </ul>
      </>
    )
  },
  {
    id: 'contact-window',
    title: 'Contact',
    icon: '✉️',
    label: 'Contact',
    defaultPosition: { top: 112, left: 128 },
    content: (
      <>
        <h2>Contact</h2>
        <p>If you are building products across markets and need strong execution at the intersection of product, localization, and growth, I would love to connect.</p>

        <p>Email: hello@harrison.build</p>
        <p>LinkedIn: linkedin.com/in/harrison-johnson/</p>
        <p>GitHub: github.com/harrisonhjohnson</p>

        <div className="cta-row">
          <a className="cta-button" href="mailto:hello@harrison.build">Email Me</a>
          <a className="cta-button" href="https://calendly.com/harrisonhjohnson" target="_blank" rel="noreferrer">Book 20 Min</a>
          <a className="cta-button" href="https://github.com/harrisonhjohnson/harrison-build" target="_blank" rel="noreferrer">View GitHub</a>
        </div>
      </>
    )
  }
];

const MENU_ITEMS = [
  { id: 'home-window', label: 'Home' },
  { id: 'work-window', label: 'Work' },
  { id: 'case-window', label: 'Cases' },
  { id: 'writing-window', label: 'Writing' },
  { id: 'about-window', label: 'About' },
  { id: 'contact-window', label: 'Contact' }
];

const DEFAULT_WINDOW_ID = 'home-window';

function formatClock(now) {
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = String(minutes).padStart(2, '0');
  return `${formattedHours}:${formattedMinutes} ${ampm}`;
}

function getDefaultState() {
  const open = {};
  const z = {};
  const pos = {};

  WINDOWS.forEach((w) => {
    open[w.id] = Boolean(w.defaultOpen);
    z[w.id] = w.defaultOpen ? 2 : 1;
    pos[w.id] = w.defaultPosition;
  });

  return { open, z, pos };
}

function trackEvent(name, props = {}) {
  const payload = { name, props, at: new Date().toISOString() };
  try {
    const raw = localStorage.getItem('hb_events');
    const events = raw ? JSON.parse(raw) : [];
    events.push(payload);
    localStorage.setItem('hb_events', JSON.stringify(events.slice(-200)));
  } catch {
    // ignore local storage failures
  }

  if (typeof window !== 'undefined' && typeof window.plausible === 'function') {
    window.plausible(name, { props });
  }
}

export default function App() {
  const defaults = useMemo(() => getDefaultState(), []);
  const [openStates, setOpenStates] = useState(defaults.open);
  const [zIndices, setZIndices] = useState(defaults.z);
  const [positions, setPositions] = useState(defaults.pos);
  const [activeWindow, setActiveWindow] = useState(DEFAULT_WINDOW_ID);
  const [time, setTime] = useState(formatClock(new Date()));
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 780);

  const dragRef = useRef({ id: null, dx: 0, dy: 0 });

  const iphoneMode = isMobile;

  const bringToFront = (id) => {
    setZIndices((prev) => {
      const max = Math.max(...Object.values(prev));
      return { ...prev, [id]: max + 1 };
    });
    setActiveWindow(id);
  };

  const openWindow = (id) => {
    if (iphoneMode) {
      const next = {};
      WINDOWS.forEach((w) => {
        next[w.id] = w.id === id;
      });
      setOpenStates(next);
      bringToFront(id);
      trackEvent('nav_open', { id, mode: 'iphone' });
      return;
    }
    setOpenStates((prev) => ({ ...prev, [id]: true }));
    bringToFront(id);
    trackEvent('nav_open', { id, mode: 'desktop' });
  };

  const closeWindow = (id) => {
    if (iphoneMode) {
      const fallbackId = DEFAULT_WINDOW_ID;
      const next = {};
      WINDOWS.forEach((w) => {
        next[w.id] = w.id === fallbackId;
      });
      setOpenStates(next);
      bringToFront(fallbackId);
      trackEvent('nav_close', { id, fallbackId, mode: 'iphone' });
      return;
    }
    setOpenStates((prev) => ({ ...prev, [id]: false }));
    setActiveWindow((prev) => (prev === id ? null : prev));
    trackEvent('nav_close', { id, mode: 'desktop' });
  };

  const onHeaderPointerDown = (e, id) => {
    const rect = e.currentTarget.parentElement.getBoundingClientRect();
    dragRef.current = { id, dx: e.clientX - rect.left, dy: e.clientY - rect.top };
    bringToFront(id);
  };

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  useEffect(() => {
    const onResize = () => {
      setIsMobile(window.innerWidth <= 780);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    if (!iphoneMode) return;
    const focused = activeWindow || DEFAULT_WINDOW_ID;
    const next = {};
    WINDOWS.forEach((w) => {
      next[w.id] = w.id === focused;
    });
    setOpenStates(next);
  }, [iphoneMode, activeWindow]);

  useEffect(() => {
    const onMove = (e) => {
      const { id, dx, dy } = dragRef.current;
      if (!id || iphoneMode) return;

      const safeTop = clamp(e.clientY - dy, 32, window.innerHeight - 96);
      const safeLeft = clamp(e.clientX - dx, 0, window.innerWidth - 280);

      setPositions((prev) => ({ ...prev, [id]: { top: safeTop, left: safeLeft } }));
    };

    const onUp = () => {
      dragRef.current = { id: null, dx: 0, dy: 0 };
    };

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
  }, [iphoneMode]);

  useEffect(() => {
    const timer = setInterval(() => setTime(formatClock(new Date())), 60_000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const onEsc = (e) => {
      if (e.key === 'Escape' && activeWindow) closeWindow(activeWindow);
    };
    window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, [activeWindow, iphoneMode]);

  return (
    <>
      <div className="menu-bar" role="navigation" aria-label="Primary navigation">
        <div className="apple-logo" aria-hidden="true">🍎</div>
        <div className="menu-group" role="tablist" aria-label="Sections">
          {MENU_ITEMS.map((item) => (
            <button
              type="button"
              key={item.id}
              className={`menu-item ${activeWindow === item.id ? 'is-active' : ''}`}
              role="tab"
              aria-selected={activeWindow === item.id}
              onClick={() => openWindow(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="clock" aria-live="polite">{time}</div>
      </div>

      <div className={`desktop ${iphoneMode ? 'mobile-mode' : ''}`}>
        <div className="icon-column" role="list" aria-label="Desktop icons">
          {WINDOWS.map((windowConfig) => (
            <button
              type="button"
              className="icon"
              key={windowConfig.id}
              role="listitem"
              onClick={() => openWindow(windowConfig.id)}
            >
              <div className="icon-img" aria-hidden="true">{windowConfig.icon}</div>
              <div className="icon-label">{windowConfig.label}</div>
            </button>
          ))}
        </div>

        {WINDOWS.map((w) => {
          if (!openStates[w.id]) return null;
          if (iphoneMode && w.id !== activeWindow) return null;

          return (
            <section
              className="window"
              key={w.id}
              style={{
                zIndex: zIndices[w.id],
                top: iphoneMode ? undefined : positions[w.id].top,
                left: iphoneMode ? undefined : positions[w.id].left
              }}
              onPointerDown={() => bringToFront(w.id)}
              aria-label={`${w.title} window`}
            >
              <header className="window-header" onPointerDown={iphoneMode ? undefined : (e) => onHeaderPointerDown(e, w.id)}>
                <button
                  type="button"
                  className="window-close"
                  aria-label={`Close ${w.title}`}
                  onClick={() => closeWindow(w.id)}
                >
                  ✕
                </button>
                <div className="window-title">{w.title}</div>
              </header>
              <div className="window-content">{w.content}</div>
            </section>
          );
        })}

        <div className="os-details">MacOS System 7.0.1 | harrison.build</div>
      </div>
    </>
  );
}
