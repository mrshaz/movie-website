import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
  const [query, setQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      navigate(`/search?q=${encodeURIComponent(trimmed)}`);
      setQuery('');
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300
        ${scrolled
          ? 'bg-netflix-dark/98 backdrop-blur-md shadow-lg shadow-black/40 border-b border-white/10'
          : 'bg-gradient-to-b from-black/80 to-transparent border-b border-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <Link
          to="/"
          className="text-netflix-red font-extrabold text-2xl tracking-tight shrink-0
                     hover:text-red-400 transition-colors duration-200"
        >
          🎬 MovieDB
        </Link>

        <form onSubmit={handleSearch} className="flex-1 max-w-md">
          <div className="flex rounded-md overflow-hidden ring-1 ring-white/20 focus-within:ring-2 focus-within:ring-netflix-red transition-all duration-200">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search movies…"
              className="w-full px-4 py-2 bg-white/10 text-white placeholder-gray-400
                         focus:outline-none focus:bg-white/15 transition-colors duration-200"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-netflix-red hover:bg-red-700
                         transition-colors duration-200 font-semibold shrink-0"
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </header>
  );
}

