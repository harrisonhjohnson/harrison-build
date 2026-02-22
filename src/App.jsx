import { useEffect, useMemo, useRef, useState } from 'react';

const WINDOWS = [
  {
    id: 'about-window',
    title: 'About Me',
    icon: '👤',
    label: 'About Me',
    defaultPosition: { top: 56, left: 100 },
    content: (
      <>
        <div className="profile-img" aria-hidden="true" />
        <h2>Hello, I&apos;m Harrison</h2>
        <p>
          Welcome to my personal website! I&apos;m an early-stage Product leader based in New
          York City. I&apos;m passionate about yoga, dogs, and travel.
        </p>
        <p>
          My background includes Operations and Product at Managed by Q from 2014-2020
          (acquired by WeWork), and being a Co-Founder of Driveway.app from 2020-2024
          (acquired by Chameleon.io, where I&apos;m currently a Product Lead).
        </p>
        <p>Feel free to explore my work desktop to learn more about me and what I&apos;m building.</p>
      </>
    )
  },
  {
    id: 'projects-window',
    title: 'Projects',
    icon: '📂',
    label: 'Projects',
    defaultPosition: { top: 78, left: 154 },
    content: (
      <>
        <h2>My Projects</h2>
        <div className="project-item">
          <h3>Project 1: Onboarding LLM Specialist (active)</h3>
          <p>
            Building a focused model for user onboarding strategy and execution. Stack:
            Anthropic, OpenAI, Pinecone, and lightweight tooling for iteration speed.
          </p>
        </div>
        <div className="project-item">
          <h3>Project 2</h3>
          <p>In progress.</p>
        </div>
        <div className="project-item">
          <h3>Project 3</h3>
          <p>In progress.</p>
        </div>
      </>
    )
  },
  {
    id: 'contact-window',
    title: 'Contact',
    icon: '✉️',
    label: 'Contact',
    defaultPosition: { top: 92, left: 210 },
    content: (
      <>
        <h2>Get In Touch</h2>
        <p>Email: hello@harrison.build</p>
        <p>LinkedIn: linkedin.com/in/harrison-johnson/</p>
        <p>GitHub: github.com/hjohns36</p>
        <p>X: @harrisonjohnson</p>
      </>
    )
  },
  {
    id: 'resume-window',
    title: 'Resume',
    icon: '📄',
    label: 'Resume',
    defaultPosition: { top: 84, left: 126 },
    content: (
      <>
        <h2>Professional Experience</h2>
        <h3>Product Lead, Chameleon.io</h3>
        <p>Leading product initiatives after Driveway.app acquisition.</p>
        <h3>Co-Founder, Driveway.app</h3>
        <p>Built and scaled the product from 2020-2024.</p>
        <h3>Managed by Q</h3>
        <p>Operations and Product, 2014-2020.</p>
        <h2>Education</h2>
        <p>History &amp; Economics, Johns Hopkins University, 2013</p>
      </>
    )
  }
];

const MENU_ITEMS = ['File', 'Edit', 'View', 'Special'];

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
    open[w.id] = false;
    z[w.id] = 1;
    pos[w.id] = w.defaultPosition;
  });

  return { open, z, pos };
}

export default function App() {
  const defaults = useMemo(() => getDefaultState(), []);
  const [openStates, setOpenStates] = useState(defaults.open);
  const [zIndices, setZIndices] = useState(defaults.z);
  const [positions, setPositions] = useState(defaults.pos);
  const [activeWindow, setActiveWindow] = useState(null);
  const [time, setTime] = useState(formatClock(new Date()));

  const dragRef = useRef({ id: null, dx: 0, dy: 0 });

  const bringToFront = (id) => {
    setZIndices((prev) => {
      const max = Math.max(...Object.values(prev));
      return { ...prev, [id]: max + 1 };
    });
    setActiveWindow(id);
  };

  const openWindow = (id) => {
    setOpenStates((prev) => ({ ...prev, [id]: true }));
    bringToFront(id);
  };

  const closeWindow = (id) => {
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
    const onMove = (e) => {
      const { id, dx, dy } = dragRef.current;
      if (!id) {
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
  }, []);

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
          <button type="button" key={item} className="menu-item">
            {item}
          </button>
        ))}
        <div className="clock" aria-live="polite">
          {time}
        </div>
      </div>

      <div className="desktop">
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

          return (
            <section
              className="window"
              key={w.id}
              style={{
                zIndex: zIndices[w.id],
                top: positions[w.id].top,
                left: positions[w.id].left
              }}
              onPointerDown={() => bringToFront(w.id)}
              aria-label={`${w.title} window`}
            >
              <header
                className="window-header"
                onPointerDown={(e) => onHeaderPointerDown(e, w.id)}
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

        <div className="os-details">MacOS System 7.0.1 | 8MB RAM | 80MB Hard Disk</div>
      </div>
    </>
  );
}
