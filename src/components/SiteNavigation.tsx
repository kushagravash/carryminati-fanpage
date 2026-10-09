import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { officialChannels } from '../data/videos';

const destinations = [
  { to: '/', number: '01', title: 'The Hub', note: 'The full creator universe' },
  { to: '/vault', number: '02', title: 'Stream Vault', note: 'The curated archive' },
  { to: '/submit', number: '03', title: 'Fan Submit', note: 'Add to the conversation' },
];

export function SiteNavigation() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => setOpen(false), [location.pathname]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (event.key !== 'Tab' || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  const closeMenu = () => {
    setOpen(false);
    toggleRef.current?.focus();
  };

  return (
    <>
      <div className="floating-nav">
        <Link className="floating-nav__brand" to="/" aria-label="Carry Archive, The Hub">
          <span className="site-mark" aria-hidden="true">CA<span>·</span></span>
          <span className="floating-nav__label">CARRY ARCHIVE <small>INDEPENDENT FAN PROJECT</small></span>
        </Link>
        <button ref={toggleRef} className="menu-toggle" type="button" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="site-navigation" aria-label={open ? 'Close site navigation' : 'Open site navigation'}>
          <span>Explore</span><Menu size={17} />
        </button>
      </div>

      {open && (
        <div className="nav-overlay" onMouseDown={(event) => { if (event.target === event.currentTarget) closeMenu(); }}>
          <section ref={panelRef} id="site-navigation" className="nav-panel" role="dialog" aria-modal="true" aria-label="Site navigation">
            <div className="nav-panel__top">
              <span className="eyebrow">THREE WAYS IN</span>
              <button ref={closeRef} className="nav-close" type="button" onClick={closeMenu} aria-label="Close navigation"><X size={20} /></button>
            </div>
            <nav aria-label="Main navigation" className="nav-panel__links">
              {destinations.map((item) => (
                <NavLink key={item.to} to={item.to} end={item.to === '/'} className={({ isActive }) => `nav-destination${isActive ? ' is-active' : ''}`} onClick={closeMenu}>
                  <span className="nav-destination__number">{item.number}</span>
                  <span className="nav-destination__copy"><strong>{item.title}</strong><small>{item.note}</small></span>
                  <ArrowUpRight className="nav-destination__arrow" size={19} />
                </NavLink>
              ))}
            </nav>
            <div className="nav-panel__bottom">
              <span>Carry Archive · an independent fan project</span>
              <a href={officialChannels.main} target="_blank" rel="noreferrer noopener">Official channel <ArrowUpRight size={14} /></a>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
