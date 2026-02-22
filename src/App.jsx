import { useEffect, useMemo, useRef, useState } from 'react';
import workUpdates from './data/work-updates.json';

const WINDOWS = [
  {
    id: 'journal-window',
    title: 'Work Journal',
    icon: '🗂️',
    label: 'Journal',
    defaultPosition: { top: 56, left: 108 },
    defaultOpen: true,
    content: (
      <>
        <h2>Current Work Journal</h2>
        <p className="subtle">Notes synthesized from `/Users/harrison/work` project files.</p>

        <section className="trio-strip" aria-label="Current planning strip">
          <article>
            <h3>Now</h3>
            <ul>
              <li>UK launch execution and cross-functional readiness</li>
              <li>Translation intelligence + quality automation</li>
              <li>International growth diagnostics</li>
            </ul>
          </article>
          <article>
            <h3>Next</h3>
            <ul>
              <li>Expand localization coverage and QA enforcement</li>
              <li>Improve launch dashboard actionability</li>
              <li>Close loop between referral and trial flow</li>
            </ul>
          </article>
          <article>
            <h3>Later</h3>
            <ul>
              <li>Operational playbooks for repeatable market launches</li>
              <li>Scale analytics and automation systems</li>
              <li>Codify decision memo framework</li>
            </ul>
          </article>
        </section>

        <article className="journal-entry">
          <div className="journal-date">2026-02-21</div>
          <h3>JCVD Slack Bot Ready for Install</h3>
          <p>Built and tested an always-on Slack bot for European expansion support.</p>
          <ul>
            <li>48 tests passing in `~/tools/jcvd/`</li>
            <li>Deployment infra and secrets configured</li>
            <li>Blocked only on Slack workspace install approval</li>
          </ul>
        </article>

        <article className="journal-entry">
          <div className="journal-date">2026-02-21</div>
          <h3>Product Analysis Synthesis (10-doc review)</h3>
          <p>Consolidated referral, trial, UK readiness, EU compliance, and tooling decisions into one operating memo.</p>
          <ul>
            <li>Found referral break at share step (not conversion quality)</li>
            <li>Positioned free trial as strongest international growth lever</li>
            <li>Flagged Swiss VAT and Norway VOEC as immediate execution risks</li>
          </ul>
        </article>

        <h3>Recent Files (Auto-Synced)</h3>
        <p className="subtle">Generated from your latest `/work` markdown updates.</p>
        {workUpdates.updates.slice(0, 8).map((item) => (
          <article className="journal-entry" key={item.path}>
            <div className="journal-date">{item.updated_at}</div>
            <h3>{item.title}</h3>
            <p>{item.summary || item.path}</p>
            <p className="subtle">{item.path}</p>
          </article>
        ))}
      </>
    )
  },
  {
    id: 'projects-window',
    title: 'Projects',
    icon: '📂',
    label: 'Projects',
    defaultPosition: { top: 82, left: 170 },
    content: (
      <>
        <h2>Active Project Resume</h2>

        <section className="project-card">
          <h3>International Expansion (UK + EU)</h3>
          <p className="project-meta"><span className="status active">Active</span><span>Owner: Harrison</span><span>Jan-Mar 2026</span></p>
          <p><strong>Problem:</strong> Launching new markets required synchronized localization, compliance, payments, and GTM execution.</p>
          <p><strong>What I did:</strong> Drove cross-functional roadmap, risk tracking, and launch sequencing for UK + EU workstreams.</p>
          <p><strong>Outcome:</strong> Soft launch execution stayed on track with clear blocker surfacing and mitigation plans.</p>
        </section>

        <section className="project-card">
          <h3>Translation Intelligence Unification</h3>
          <p className="project-meta"><span className="status active">Active</span><span>Platform + Intelligence Merge</span></p>
          <p><strong>Problem:</strong> Existing translation platform had full key coverage but low contextual intelligence.</p>
          <p><strong>What I did:</strong> Developed glossary, QA rules, locale profiles, and context mapping to improve translation quality.</p>
          <p><strong>Outcome:</strong> Defined integration plan to combine 1,383-key platform coverage with structured linguistic guardrails.</p>
        </section>

        <section className="project-card">
          <h3>Referral + Trial Growth Loop</h3>
          <p className="project-meta"><span className="status scoped">Scoped</span><span>Canada-first growth experiments</span></p>
          <p><strong>Problem:</strong> Referral taps were not converting into actual share sessions.</p>
          <p><strong>What I did:</strong> Mapped funnel drop-off and paired referral strategy with trial-led activation ideas.</p>
          <p><strong>Outcome:</strong> Identified highest-leverage fix path and experiment backlog for acquisition lift.</p>
        </section>
      </>
    )
  },
  {
    id: 'wins-window',
    title: 'Wins',
    icon: '🏆',
    label: 'Wins',
    defaultPosition: { top: 98, left: 248 },
    content: (
      <>
        <h2>Selected Wins</h2>
        <ul className="wins-list">
          <li><strong>1,383</strong> translation keys unified into a single operational platform path.</li>
          <li><strong>192</strong> curated glossary terms across 10 domains with locale guidance.</li>
          <li><strong>7</strong> translation QA rules defined (6 blockers) for quality enforcement.</li>
          <li><strong>210</strong> Figma screens mapped for UI-aware translation context.</li>
          <li><strong>48</strong> tests passing on JCVD Slack bot before workspace install.</li>
          <li><strong>10</strong> product analysis memos synthesized into one operating strategy view.</li>
          <li><strong>20+</strong> market expansion planning framework built for Q1 execution.</li>
        </ul>
      </>
    )
  },
  {
    id: 'case-window',
    title: 'Case Studies',
    icon: '📚',
    label: 'Cases',
    defaultPosition: { top: 120, left: 300 },
    content: (
      <>
        <h2>Case Studies</h2>

        <section className="project-card">
          <h3>Case 1: UK Launch Execution</h3>
          <p><strong>Context:</strong> UK soft launch targeted for February 23, 2026 with tight dependencies across legal, packaging, localization, payments, CX, and analytics.</p>
          <p><strong>Approach:</strong> Built phased roadmap with owner accountability, critical-path milestones, and blocker resolution loops.</p>
          <p><strong>Result:</strong> Converted fragmented tasks into a single launch control plane; highlighted compliance and packaging risks early enough to act.</p>
          <p className="subtle">Source: `~/work/uk-launch-Feb-23-2026.md`</p>
        </section>

        <section className="project-card">
          <h3>Case 2: Translation System Unification</h3>
          <p><strong>Context:</strong> Parallel systems existed: key management infrastructure vs. translation quality intelligence.</p>
          <p><strong>Approach:</strong> Framed merge architecture where platform remains source of truth and intelligence layer enforces context and QA.</p>
          <p><strong>Result:</strong> Clear path to combine scale (all keys) with correctness (glossary + rules + locale nuance).</p>
          <p className="subtle">Source: `~/work/fi-translations-unification.md`</p>
        </section>
      </>
    )
  },
  {
    id: 'resume-window',
    title: 'Resume',
    icon: '📄',
    label: 'Resume',
    defaultPosition: { top: 96, left: 226 },
    content: (
      <>
        <h2>Harrison Johnson</h2>
        <p>Product leader focused on international expansion, growth systems, and localization quality at scale.</p>

        <h3>Experience</h3>
        <ul>
          <li><strong>Product Lead, Chameleon.io</strong> (2024-Present)</li>
          <li><strong>Co-Founder, Driveway.app</strong> (2020-2024)</li>
          <li><strong>Operations + Product, Managed by Q</strong> (2014-2020)</li>
        </ul>

        <h3>Tooling I Use</h3>
        <div className="badge-row" role="list" aria-label="Tools and platforms">
          {['Claude', 'OpenAI', 'Databricks', 'SQL', 'GrowthBook', 'Figma', 'Slack', 'Recurly', 'Python', 'TypeScript'].map((tool) => (
            <span className="tool-badge" role="listitem" key={tool}>{tool}</span>
          ))}
        </div>

        <h3>Downloads</h3>
        <div className="cta-row">
          <a className="cta-button" href="/harrison-johnson-resume.pdf" download>Download Resume (PDF)</a>
          <a className="cta-button" href="/harrison-johnson-resume.md" download>Download Resume (MD)</a>
          <a className="cta-button" href="/harrison-johnson-portfolio-summary.md" download>Download One-Pager</a>
        </div>
      </>
    )
  },
  {
    id: 'about-window',
    title: 'About / Contact',
    icon: '✉️',
    label: 'Contact',
    defaultPosition: { top: 112, left: 128 },
    content: (
      <>
        <h2>Now</h2>
        <p>I build launch systems where product, localization, and growth operations can move fast without sacrificing quality.</p>

        <h3>Contact</h3>
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
  },
  {
    id: 'personal-window',
    title: 'Personal Projects',
    icon: '🧪',
    label: 'Personal',
    defaultPosition: { top: 128, left: 280 },
    content: (
      <>
        <h2>Personal Labs</h2>

        <section className="project-card">
          <h3>Family Tree (Local-first Genealogy)</h3>
          <p className="project-meta"><span className="status active">Active</span><span>FastAPI + React + OCR pipeline</span></p>
          <p><strong>Problem:</strong> Family history research is fragmented across scans, notes, and unverifiable claims.</p>
          <p><strong>What I built:</strong> A local-first app with source ingestion, OCR, assertion review queue, tree visualization, and GEDCOM export.</p>
          <p><strong>Outcome:</strong> Structured evidence-backed research workflow from raw document to validated person graph.</p>
          <p className="subtle">Repo: ~/projects/family-tree</p>
        </section>

        <section className="project-card">
          <h3>Onboarding LLM Specialist</h3>
          <p className="project-meta"><span className="status active">Active</span><span>AI product experimentation</span></p>
          <p><strong>Problem:</strong> Onboarding advice is generic and disconnected from team context.</p>
          <p><strong>What I built:</strong> A focused retrieval + prompt stack for practical onboarding strategy support.</p>
          <p><strong>Outcome:</strong> Faster synthesis and higher-quality onboarding decision drafts.</p>
        </section>
      </>
    )
  }
];

const MENU_ITEMS = [
  { id: 'journal-window', label: 'Journal' },
  { id: 'projects-window', label: 'Projects' },
  { id: 'wins-window', label: 'Wins' },
  { id: 'case-window', label: 'Cases' },
  { id: 'personal-window', label: 'Personal' },
  { id: 'resume-window', label: 'Resume' },
  { id: 'about-window', label: 'Contact' }
];

const DEFAULT_WINDOW_ID = 'journal-window';
const VIEW_MODES = [
  { id: 'auto', label: 'Auto' },
  { id: 'desktop', label: 'Desktop' },
  { id: 'iphone', label: 'iPhone' }
];

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
  const [viewMode, setViewMode] = useState('auto');

  const dragRef = useRef({ id: null, dx: 0, dy: 0 });

  const iphoneMode = viewMode === 'iphone' || (viewMode === 'auto' && isMobile);

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
        <div className="view-toggle" role="group" aria-label="Display mode">
          {VIEW_MODES.map((mode) => (
            <button
              key={mode.id}
              type="button"
              className={`view-button ${viewMode === mode.id ? 'is-active' : ''}`}
              onClick={() => {
                setViewMode(mode.id);
                trackEvent('mode_toggle', { mode: mode.id });
              }}
            >
              {mode.label}
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

        <div className="os-details">MacOS System 7.0.1 | Harrison Work Journal Build</div>
      </div>
    </>
  );
}
