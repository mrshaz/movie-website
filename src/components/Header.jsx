import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
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

  return (
    <header className="sticky top-0 z-50 bg-netflix-dark/95 backdrop-blur border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <Link
          to="/"
          className="text-netflix-red font-extrabold text-2xl tracking-tight shrink-0 hover:text-red-400 transition-colors"
        >
          🎬 MovieDB
        </Link>

        <form onSubmit={handleSearch} className="flex-1 max-w-md">
          <div className="flex">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search movies…"
              className="w-full px-4 py-2 rounded-l-md bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-netflix-red"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-netflix-red rounded-r-md hover:bg-red-700 transition-colors font-semibold"
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </header>
  );
}
