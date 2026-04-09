import { useEffect, useState } from 'react';
import { getTrending, getTopRated, getUpcoming, getBackdropUrl, getPosterUrl } from '../services/tmdbApi.js';
import MovieGrid from '../components/MovieGrid.jsx';
import Section from '../components/Section.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import { Link } from 'react-router-dom';

// Stable fetch functions (defined outside component to avoid re-creation on render)
const fetchTopRated = () => getTopRated().then(({ data }) => data.results || []);
const fetchUpcoming = () => getUpcoming().then(({ data }) => data.results || []);

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [hero, setHero] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getTrending()
      .then(({ data }) => {
        const results = data.results || [];
        setMovies(results);
        setHero(results[0] || null);
      })
      .catch((err) => {
        setError(err.message || 'Failed to load trending movies.');
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner message="Loading trending movies…" />;
  if (error) return <ErrorMessage message={error} />;

  const backdropUrl = hero ? getBackdropUrl(hero.backdrop_path) : null;
  const posterUrl = hero ? getPosterUrl(hero.poster_path, 'w342') : null;

  return (
    <div className="page-transition">
      {/* ── Hero Section ───────────────────────────────── */}
      {hero && (
        <section
          className="relative h-[65vh] min-h-[400px] flex items-end overflow-hidden"
          style={{
            backgroundImage: backdropUrl ? `url(${backdropUrl})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
          }}
        >
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-netflix-dark via-netflix-dark/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-netflix-dark/60 to-transparent" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pb-10 sm:pb-14 flex gap-6 items-end w-full">
            {posterUrl && (
              <img
                src={posterUrl}
                alt={hero.title}
                className="hidden sm:block w-28 md:w-36 rounded-lg shadow-2xl shrink-0 ring-1 ring-white/10"
              />
            )}
            <div className="max-w-xl">
              <span className="inline-block text-xs uppercase tracking-widest text-netflix-red font-semibold mb-2">
                🔥 Trending this week
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold mt-1 mb-3 leading-tight drop-shadow-lg">
                {hero.title}
              </h1>
              <p className="text-gray-300 text-sm sm:text-base line-clamp-3 leading-relaxed">
                {hero.overview}
              </p>
              <div className="flex items-center gap-3 mt-5 flex-wrap">
                <Link
                  to={`/movie/${hero.id}`}
                  className="inline-block px-6 py-2.5 bg-netflix-red hover:bg-red-700
                             transition-colors duration-200 rounded-md font-semibold text-sm
                             shadow-lg shadow-netflix-red/30"
                >
                  ▶ View Details
                </Link>
                {hero.release_date && (
                  <span className="text-xs text-gray-400 bg-white/10 px-3 py-1.5 rounded-full">
                    {hero.release_date.slice(0, 4)}
                  </span>
                )}
                {hero.vote_average > 0 && (
                  <span className="text-xs text-yellow-400 bg-yellow-400/10 px-3 py-1.5 rounded-full font-bold">
                    ★ {hero.vote_average.toFixed(1)}
                  </span>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Trending section ───────────────────────────── */}
      <div className="max-w-7xl mx-auto">
        <MovieGrid movies={movies} title="Trending Movies" accent="border-netflix-red" />
      </div>

      {/* ── Scroll-triggered sections ──────────────────── */}
      <Section
        title="Top Rated"
        fetchFn={fetchTopRated}
        accent="border-yellow-500"
      />

      <Section
        title="Coming Soon"
        fetchFn={fetchUpcoming}
        accent="border-accent-cyan"
      />
    </div>
  );
}

