import { useEffect, useRef, useState } from 'react';
import { Icon } from './Icon';
import { contact } from '../data';
const sections = [
  ['home', 'Home'],
  ['projects', 'Projects'],
  ['about', 'About'],
  ['education', 'Education'],
  ['skills', 'Skills'],
  ['experience', 'Experience'],
  ['certifications', 'Certifications'],
  ['contact', 'Contact'],
];
export function Navigation() {
  const [open, setOpen] = useState(false),
    [active, setActive] = useState('home'),
    [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      return typeof window !== 'undefined' &&
        window.localStorage.getItem('portfolio-theme') === 'light'
        ? 'light'
        : 'dark';
    } catch {
      return 'dark';
    }
  });
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem('portfolio-theme', theme);
    } catch {
      /* Theme still works when browser storage is unavailable. */
    }
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', theme === 'dark' ? '#030712' : '#f8fafc');
  }, [theme]);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      setScrolled(window.scrollY > 35);
      let id = 'home';
      for (const [name] of sections) {
        const element = document.getElementById(name);
        if (element && element.offsetTop <= window.scrollY + 200) id = name;
      }
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 15)
        id = 'contact';
      setActive(id);
      frame = 0;
    };
    const scroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', scroll, { passive: true });
    window.addEventListener('resize', scroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', scroll);
      window.removeEventListener('resize', scroll);
    };
  }, []);
  useEffect(() => {
    const media = window.matchMedia('(min-width:1024px)');
    const close = () => {
      if (media.matches) setOpen(false);
    };
    media.addEventListener('change', close);
    return () => media.removeEventListener('change', close);
  }, []);
  return (
    <header
      className={`navigation ${scrolled ? 'is-scrolled' : ''}`}
      onKeyDown={(e) => {
        if (e.key === 'Escape' && open) {
          setOpen(false);
          toggle.current?.focus();
        }
      }}
    >
      <div className="nav-inner">
        <a className="wordmark" href="#home" onClick={() => setOpen(false)}>
          <b className="brand-mark" aria-hidden="true">
            ME
          </b>
          <span className="brand-name">
            Mohamed<span>Elshaboury</span>
          </span>
        </a>
        <nav
          id="navigation"
          className={open ? 'nav-links open' : 'nav-links'}
          aria-label="Main navigation"
        >
          {sections.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={active === id ? 'location' : undefined}
              onClick={() => setOpen(false)}
            >
              {label}
            </a>
          ))}
          <a className="nav-email" href={`mailto:${contact.email}`}>
            Email
          </a>
        </nav>
        <div className="nav-controls">
          <button
            className="theme-toggle"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          >
            <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={18} />
          </button>
          <button
            ref={toggle}
            className="menu-toggle"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close navigation' : 'Open navigation'}
            aria-expanded={open}
            aria-controls="navigation"
          >
            <Icon name={open ? 'close' : 'menu'} size={23} />
          </button>
        </div>
      </div>
    </header>
  );
}
