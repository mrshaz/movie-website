import { Link } from 'react-router-dom';
import { getBackdropUrl, getPosterUrl } from '../../services/tmdbApi.js';

/**
 * Section 0 – full-viewport hero with the featured trending movie.
 * Backdrop fills the screen; gradient fades to dark at bottom.
 */
export default function HeroSection({ movie, isActive, reducedMotion }) {
  if (!movie) return null;

  const backdropUrl = getBackdropUrl(movie.backdrop_path);
  const posterUrl = getPosterUrl(movie.poster_path, 'w342');
  const year = movie.release_date?.slice(0, 4);
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : null;

  return (
    <section className="relative h-screen w-full flex items-end overflow-hidden">
      {/* Backdrop */}
      {backdropUrl && (
        <div
          className={`absolute inset-0 bg-cover bg-center transition-transform duration-[10s] ease-out
            ${!reducedMotion && isActive ? 'scale-105' : 'scale-100'}`}
          style={{ backgroundImage: `url(${backdropUrl})` }}
        />
      )}

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-netflix-dark via-netflix-dark/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-netflix-dark/70 to-transparent" />

      {/* Content */}
      <div
        className={`relative z-10 max-w-7xl mx-auto px-6 pb-20 sm:pb-24 flex gap-6 items-end w-full
          transition-all duration-700 ease-out
          ${!reducedMotion
            ? isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            : ''
          }`}
      >
        {posterUrl && (
          <img
            src={posterUrl}
            alt={movie.title}
            className="hidden sm:block w-28 md:w-36 rounded-lg shadow-2xl shrink-0 ring-1 ring-white/10"
          />
        )}

        <div className="max-w-xl">
          <span className="inline-block text-xs uppercase tracking-widest text-netflix-red font-semibold mb-2">
            🔥 Trending this week
          </span>

          <h1 className="text-4xl sm:text-6xl font-extrabold mt-1 mb-3 leading-tight drop-shadow-lg">
            {movie.title}
          </h1>

          {movie.overview && (
            <p className="text-gray-300 text-sm sm:text-base line-clamp-3 leading-relaxed">
              {movie.overview}
            </p>
          )}

          <div className="flex items-center gap-3 mt-5 flex-wrap">
            <Link
              to={`/movie/${movie.id}`}
              className="inline-block px-6 py-2.5 bg-netflix-red hover:bg-red-700
                         transition-colors duration-200 rounded-md font-semibold text-sm
                         shadow-lg shadow-netflix-red/30"
            >
              ▶ View Details
            </Link>

            {year && (
              <span className="text-xs text-gray-400 bg-white/10 px-3 py-1.5 rounded-full">
                {year}
              </span>
            )}

            {rating && (
              <span className="text-xs text-yellow-400 bg-yellow-400/10 px-3 py-1.5 rounded-full font-bold">
                ★ {rating}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1
          transition-opacity duration-500 ${isActive ? 'opacity-60' : 'opacity-0'}`}
      >
        <span className="text-xs uppercase tracking-widest text-white/50 font-mono">scroll</span>
        <span
          className={`text-white/50 text-lg ${!reducedMotion ? 'animate-bounce' : ''}`}
          aria-hidden="true"
        >
          ↓
        </span>
      </div>
    </section>
  );
}
