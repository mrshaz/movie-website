import { useEffect, useState } from 'react';
import { getTrending, getBackdropUrl, getPosterUrl } from '../services/tmdbApi.js';
import MovieGrid from '../components/MovieGrid.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import { Link } from 'react-router-dom';

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
    <div>
      {/* Hero Section */}
      {hero && (
        <section
          className="relative h-[60vh] min-h-[380px] flex items-end overflow-hidden"
          style={{
            backgroundImage: backdropUrl ? `url(${backdropUrl})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-netflix-dark via-netflix-dark/50 to-transparent" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 pb-10 flex gap-6 items-end">
            {posterUrl && (
              <img
                src={posterUrl}
                alt={hero.title}
                className="hidden sm:block w-28 rounded-md shadow-2xl shrink-0"
              />
            )}
            <div className="max-w-xl">
              <span className="text-xs uppercase tracking-widest text-netflix-red font-semibold">
                Trending this week
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold mt-1 mb-2 leading-tight">
                {hero.title}
              </h1>
              <p className="text-gray-300 text-sm line-clamp-3">{hero.overview}</p>
              <Link
                to={`/movie/${hero.id}`}
                className="inline-block mt-4 px-6 py-2.5 bg-netflix-red hover:bg-red-700 transition-colors rounded-md font-semibold text-sm"
              >
                View Details →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Grid */}
      <div className="max-w-7xl mx-auto">
        <MovieGrid movies={movies} title="Trending Movies" />
      </div>
    </div>
  );
}
