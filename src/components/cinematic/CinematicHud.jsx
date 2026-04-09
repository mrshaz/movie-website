import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SECTION_LABELS = ['INTRO', 'TRENDING', 'TOP RATED', 'SPOTLIGHT', 'ARCHIVE'];

/**
 * Fixed cinematic HUD overlay: progress bar, logo, dot-navigation, search form,
 * section counter. Pointer-events are isolated so only interactive children intercept
 * mouse/touch events.
 */
export default function CinematicHud({ activeSection, sectionCount, onNavigate }) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      navigate(`/search?q=${encodeURIComponent(trimmed)}`);
      setQuery('');
    }
  };

  const progressPct = sectionCount > 1
    ? (activeSection / (sectionCount - 1)) * 100
    : 0;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none select-none">

      {/* ── Top HUD ──────────────────────────────────────── */}
      <div className="absolute top-0 inset-x-0">
        {/* Progress bar */}
        <div className="h-[2px] bg-white/10">
          <div
            className="h-full bg-netflix-red transition-all duration-700 ease-out"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        {/* Header row */}
        <div className="pointer-events-auto flex items-center justify-between px-4 sm:px-6 py-3
                        bg-gradient-to-b from-black/80 to-transparent">
          {/* Logo */}
          <Link
            to="/"
            className="text-netflix-red font-extrabold text-xl tracking-tight
                       hover:text-red-400 transition-colors duration-200 shrink-0"
          >
            🎬 MovieDB
          </Link>

          {/* Dot nav (desktop) */}
          <nav className="hidden sm:flex items-center gap-2" aria-label="Section navigation">
            {Array.from({ length: sectionCount }).map((_, i) => (
              <button
                key={i}
                onClick={() => onNavigate(i)}
                title={SECTION_LABELS[i] ?? `Section ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  i === activeSection
                    ? 'w-7 h-2 bg-netflix-red'
                    : 'w-2 h-2 bg-white/30 hover:bg-white/60'
                }`}
                aria-current={i === activeSection ? 'true' : undefined}
              />
            ))}
          </nav>

          {/* Search */}
          <form onSubmit={handleSearch} className="flex items-center">
            <div className="flex rounded overflow-hidden ring-1 ring-white/20
                            focus-within:ring-netflix-red transition-all duration-200">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search movies…"
                aria-label="Search movies"
                className="w-28 sm:w-44 px-3 py-1.5 bg-black/40 text-white text-sm
                           placeholder-gray-400 focus:outline-none focus:bg-black/60
                           transition-colors duration-200"
              />
              <button
                type="submit"
                aria-label="Submit search"
                className="px-3 py-1.5 bg-netflix-red hover:bg-red-700
                           transition-colors duration-200 text-sm font-semibold"
              >
                ⌕
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* ── Bottom HUD ───────────────────────────────────── */}
      <div className="absolute bottom-0 inset-x-0 flex items-end justify-between
                      px-4 sm:px-6 py-4 bg-gradient-to-t from-black/60 to-transparent">
        {/* Section counter */}
        <span className="font-mono text-xs text-white/40 tracking-widest">
          {String(activeSection + 1).padStart(2, '0')} / {String(sectionCount).padStart(2, '0')}
        </span>

        {/* Section label */}
        <span className="hidden sm:block font-mono text-xs text-white/40 tracking-widest uppercase">
          {SECTION_LABELS[activeSection] ?? ''}
        </span>

        {/* Scroll hint (only on first section) */}
        {activeSection === 0 && (
          <span className="sm:hidden font-mono text-xs text-white/30 animate-bounce">
            ↓ scroll
          </span>
        )}
      </div>

      {/* ── Right-side vertical dot rail (mobile) ────────── */}
      <nav
        className="sm:hidden absolute right-4 top-1/2 -translate-y-1/2
                   flex flex-col gap-2 pointer-events-auto"
        aria-label="Section navigation"
      >
        {Array.from({ length: sectionCount }).map((_, i) => (
          <button
            key={i}
            onClick={() => onNavigate(i)}
            className={`rounded-full transition-all duration-300 ${
              i === activeSection ? 'w-2 h-6 bg-netflix-red' : 'w-2 h-2 bg-white/30'
            }`}
            aria-current={i === activeSection ? 'true' : undefined}
          />
        ))}
      </nav>
    </div>
  );
}
