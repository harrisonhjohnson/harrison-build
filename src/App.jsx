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
        <p className="subtle">
          Notes synthesized from `/Users/harrison/work` project files.
        </p>

        <article className="journal-entry">
          <div className="journal-date">2026-02-21</div>
          <h3>JCVD Slack Bot Ready for Install</h3>
          <p>
            Built and tested an always-on Slack bot for European expansion support.
            Stack: Python 3.12, Slack Bolt, Claude Sonnet, Cloud Run.
          </p>
          <ul>
            <li>48 tests passing in `~/tools/jcvd/`</li>
            <li>Deployment infra and secrets configured</li>
            <li>Blocked only on Slack workspace install approval</li>
          </ul>
        </article>

        <article className="journal-entry">
          <div className="journal-date">2026-02-21</div>
          <h3>Product Analysis Synthesis (10-doc review)</h3>
          <p>
            Consolidated referral, trial, UK readiness, EU compliance, and tooling
            decisions into one operating memo.
          </p>
          <ul>
            <li>Found referral break at share step (not conversion quality)</li>
            <li>Positioned free trial as strongest international growth lever</li>
            <li>Flagged Swiss VAT and Norway VOEC as immediate execution risks</li>
          </ul>
        </article>

        <article className="journal-entry">
          <div className="journal-date">2026-02-16</div>
          <h3>UK Launch Plan Updated</h3>
          <p>
            Launch date moved to February 23, 2026 (soft launch) with cross-functional
            workback by legal, localization, ecom, analytics, and CX.
          </p>
          <ul>
            <li>Soft launch target confirmed</li>
            <li>Critical-path risks centered on packaging/compliance timing</li>
            <li>Created launch timeline tracker + owner accountability list</li>
          </ul>
        </article>

        <article className="journal-entry">
          <div className="journal-date">2026-01-30</div>
          <h3>Q1 Initiatives Operating Review</h3>
          <p>
            Mapped staffing and delivery coverage across Ultra launch, International
            expansion, and quality/retention workstreams.
          </p>
          <ul>
            <li>International expansion scoped to UK in Feb, 20+ markets by EOQ1</li>
            <li>Tracked backend/mobile ownership gaps early</li>
            <li>Used roadmap + staffing reconciliation to preempt execution drift</li>
          </ul>
        </article>

        <h3>Recent Files (Auto-Synced)</h3>
        <p className="subtle">
          Generated from your latest `/work` markdown updates.
        </p>
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
          <p className="project-meta">
            <span className="status active">Active</span>
            <span>Owner: Harrison</span>
            <span>Window: Jan-Mar 2026</span>
          </p>
          <p>
            Leading multi-market launch execution across localization, payments,
            compliance, analytics, and GTM operations.
          </p>
        </section>

        <section className="project-card">
          <h3>Translation Intelligence Unification</h3>
          <p className="project-meta">
            <span className="status active">Active</span>
            <span>Platform + Intelligence Merge</span>
          </p>
          <p>
            Merging translation platform infrastructure (1,383 keys) with deep
            linguistic context (192 curated glossary terms, QA rules, UI limits,
            locale profiles, and Figma mappings).
          </p>
        </section>

        <section className="project-card">
          <h3>Referral + Trial Growth Loop</h3>
          <p className="project-meta">
            <span className="status scoped">Scoped</span>
            <span>Canada-first growth experiments</span>
          </p>
          <p>
            Built strategy around fixing referral share drop-off, then pairing
            referrals with free-trial incentives to create a repeatable activation loop.
          </p>
        </section>

        <section className="project-card">
          <h3>Europe Dashboard Actionability</h3>
          <p className="project-meta">
            <span className="status active">Active</span>
            <span>Decision-support tooling</span>
          </p>
          <p>
            Improving launch-readiness dashboards without expensive rewrites by focusing
            on go/no-go clarity and operational next-step recommendations.
          </p>
        </section>

        <section className="project-card">
          <h3>JCVD Slack Bot</h3>
          <p className="project-meta">
            <span className="status blocked">Awaiting Approval</span>
            <span>Slack + Claude + Cloud Run</span>
          </p>
          <p>
            Built production-ready assistant for international strategy Q&amp;A in Slack;
            deployment complete aside from workspace install approval.
          </p>
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
        <p>
          Product leader focused on international expansion, growth systems, and
          translation/localization quality at scale.
        </p>

        <h3>Experience</h3>
        <ul>
          <li>
            <strong>Product Lead, Chameleon.io</strong> (2024-Present)
            <br />
            Leading product strategy and execution post-acquisition.
          </li>
          <li>
            <strong>Co-Founder, Driveway.app</strong> (2020-2024)
            <br />
            Built and scaled product through acquisition.
          </li>
          <li>
            <strong>Operations + Product, Managed by Q</strong> (2014-2020)
            <br />
            Cross-functional operations and product leadership through acquisition.
          </li>
        </ul>

        <h3>Core Strengths</h3>
        <ul>
          <li>0-to-1 product strategy and execution</li>
          <li>International launch operations and localization systems</li>
          <li>Cross-functional program leadership (Product, Eng, Ops, Marketing)</li>
          <li>AI-enabled workflow design and automation</li>
        </ul>

        <h3>Education</h3>
        <p>History &amp; Economics, Johns Hopkins University (2013)</p>
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
        <p>
          I build launch systems where product, localization, and growth operations can
          move fast without sacrificing quality.
        </p>

        <h3>Contact</h3>
        <p>Email: hello@harrison.build</p>
        <p>LinkedIn: linkedin.com/in/harrison-johnson/</p>
        <p>GitHub: github.com/harrisonhjohnson</p>

        <h3>Current Repository</h3>
        <p>
          <a href="https://github.com/harrisonhjohnson/harrison-build" target="_blank" rel="noreferrer">
            github.com/harrisonhjohnson/harrison-build
          </a>
        </p>
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
        <p>
          Outside core product work, I run smaller projects focused on tooling,
          analysis, and writing systems.
        </p>

        <section className="project-card">
          <h3>Family Tree (Local-first Genealogy)</h3>
          <p className="project-meta">
            <span className="status active">Active</span>
            <span>FastAPI + React + OCR pipeline</span>
          </p>
          <p>
            Building a genealogy app for colonial records with evidence-based provenance:
            source ingestion, OCR extraction, review queue, interactive tree visualization,
            and GEDCOM export.
          </p>
          <p className="subtle">Repo: ~/projects/family-tree</p>
        </section>

        <section className="project-card">
          <h3>Onboarding LLM Specialist</h3>
          <p className="project-meta">
            <span className="status active">Active</span>
            <span>AI product experimentation</span>
          </p>
          <p>
            Building a focused assistant for user onboarding strategy, with a
            retrieval layer tuned to real onboarding frameworks and teardown data.
          </p>
        </section>

        <section className="project-card">
          <h3>Factor Graph Explainer</h3>
          <p className="project-meta">
            <span className="status scoped">Research</span>
            <span>Technical storytelling</span>
          </p>
          <p>
            Developing explainers that translate probabilistic modeling concepts
            into practical product and analytics use cases.
          </p>
        </section>

        <section className="project-card">
          <h3>Translation QA Expert Toolkit</h3>
          <p className="project-meta">
            <span className="status active">Active</span>
            <span>Localization quality tooling</span>
          </p>
          <p>
            Building reusable QA checks and workflows to reduce localization regressions
            across mobile, web, and vendor handoff pipelines.
          </p>
        </section>

        <section className="project-card">
          <h3>Writing + Decision Memos</h3>
          <p className="project-meta">
            <span className="status scoped">Ongoing</span>
            <span>Ops and strategy publishing</span>
          </p>
          <p>
            Producing concise strategy briefs and launch postmortems to improve
            decision quality and cross-team alignment.
          </p>
        </section>
      </>
    )
  }
];

const MENU_ITEMS = [
  { id: 'journal-window', label: 'Journal' },
  { id: 'projects-window', label: 'Projects' },
  { id: 'personal-window', label: 'Personal' },
  { id: 'resume-window', label: 'Resume' },
  { id: 'about-window', label: 'Contact' }
];

const DEFAULT_WINDOW_ID = 'journal-window';

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

export default function App() {
  const defaults = useMemo(() => getDefaultState(), []);
  const [openStates, setOpenStates] = useState(defaults.open);
  const [zIndices, setZIndices] = useState(defaults.z);
  const [positions, setPositions] = useState(defaults.pos);
  const [activeWindow, setActiveWindow] = useState(DEFAULT_WINDOW_ID);
  const [time, setTime] = useState(formatClock(new Date()));
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 780);

  const dragRef = useRef({ id: null, dx: 0, dy: 0 });

  const bringToFront = (id) => {
    setZIndices((prev) => {
      const max = Math.max(...Object.values(prev));
      return { ...prev, [id]: max + 1 };
    });
    setActiveWindow(id);
  };

  const openWindow = (id) => {
    if (isMobile) {
      const next = {};
      WINDOWS.forEach((w) => {
        next[w.id] = w.id === id;
      });
      setOpenStates(next);
      bringToFront(id);
      return;
    }
    setOpenStates((prev) => ({ ...prev, [id]: true }));
    bringToFront(id);
  };

  const closeWindow = (id) => {
    if (isMobile) {
      const fallbackId = DEFAULT_WINDOW_ID;
      const next = {};
      WINDOWS.forEach((w) => {
        next[w.id] = w.id === fallbackId;
      });
      setOpenStates(next);
      bringToFront(fallbackId);
      return;
    }
    setOpenStates((prev) => ({ ...prev, [id]: false }));
    setActiveWindow((prev) => (prev === id ? null : prev));
  };

  const onHeaderPointerDown = (e, id) => {
    const rect = e.currentTarget.parentElement.getBoundingClientRect();
    dragRef.current = {
      id,
      dx: e.clientX - rect.left,
      dy: e.clientY - rect.top
    };
    bringToFront(id);
  };

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  useEffect(() => {
    const onResize = () => {
      const mobile = window.innerWidth <= 780;
      setIsMobile(mobile);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      return;
    }
    const focused = activeWindow || DEFAULT_WINDOW_ID;
    const next = {};
    WINDOWS.forEach((w) => {
      next[w.id] = w.id === focused;
    });
    setOpenStates(next);
  }, [isMobile, activeWindow]);

  useEffect(() => {
    const onMove = (e) => {
      const { id, dx, dy } = dragRef.current;
      if (!id || isMobile) {
        return;
      }

      const safeTop = clamp(e.clientY - dy, 32, window.innerHeight - 96);
      const safeLeft = clamp(e.clientX - dx, 0, window.innerWidth - 280);

      setPositions((prev) => ({
        ...prev,
        [id]: { top: safeTop, left: safeLeft }
      }));
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
  }, [isMobile]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(formatClock(new Date()));
    }, 60_000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const onEsc = (e) => {
      if (e.key === 'Escape' && activeWindow) {
        closeWindow(activeWindow);
      }
    };

    window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, [activeWindow]);

  return (
    <>
      <div className="menu-bar" role="navigation" aria-label="Classic menu bar">
        <div className="apple-logo" aria-hidden="true">
          🍎
        </div>
        {MENU_ITEMS.map((item) => (
          <button
            type="button"
            key={item.id}
            className={`menu-item ${activeWindow === item.id ? 'is-active' : ''}`}
            onClick={() => openWindow(item.id)}
          >
            {item.label}
          </button>
        ))}
        <div className="clock" aria-live="polite">
          {time}
        </div>
      </div>

      <div className={`desktop ${isMobile ? 'mobile-mode' : ''}`}>
        <div className="icon-column" role="list" aria-label="Desktop icons">
          {WINDOWS.map((windowConfig) => (
            <button
              type="button"
              className="icon"
              key={windowConfig.id}
              role="listitem"
              onClick={() => openWindow(windowConfig.id)}
            >
              <div className="icon-img" aria-hidden="true">
                {windowConfig.icon}
              </div>
              <div className="icon-label">{windowConfig.label}</div>
            </button>
          ))}
        </div>

        {WINDOWS.map((w) => {
          if (!openStates[w.id]) {
            return null;
          }
          if (isMobile && w.id !== activeWindow) {
            return null;
          }

          return (
            <section
              className="window"
              key={w.id}
              style={{
                zIndex: zIndices[w.id],
                top: isMobile ? undefined : positions[w.id].top,
                left: isMobile ? undefined : positions[w.id].left
              }}
              onPointerDown={() => bringToFront(w.id)}
              aria-label={`${w.title} window`}
            >
              <header
                className="window-header"
                onPointerDown={isMobile ? undefined : (e) => onHeaderPointerDown(e, w.id)}
              >
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
