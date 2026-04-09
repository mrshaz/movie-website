import { Link } from 'react-router-dom';
import { getBackdropUrl, getPosterUrl } from '../../services/tmdbApi.js';

/**
 * Section 3 – cinematic spotlight on a single featured top-rated movie.
 * Large backdrop fills the frame; info slides in when the section becomes active.
 */
export default function SpotlightReveal({ movie, isActive, reducedMotion }) {
  if (!movie) return null;

  const backdropUrl = getBackdropUrl(movie.backdrop_path);
  const posterUrl = getPosterUrl(movie.poster_path, 'w342');
  const year = movie.release_date?.slice(0, 4);
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : null;
  const genres = movie.genres?.slice(0, 3).map((g) => g.name) ?? [];

  return (
    <section className="relative h-screen w-full flex items-center overflow-hidden">
      {/* Backdrop */}
      {backdropUrl && (
        <div
          className={`absolute inset-0 bg-cover bg-center transition-transform duration-[12s] ease-out
            ${!reducedMotion && isActive ? 'scale-105' : 'scale-100'}`}
          style={{ backgroundImage: `url(${backdropUrl})` }}
        />
      )}

      {/* Dark overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

      {/* Accent left bar */}
      <div
        className={`absolute left-0 top-0 bottom-0 w-1 bg-netflix-red transition-all duration-1000 delay-300
          ${!reducedMotion ? (isActive ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0') : ''}`}
        style={{ transformOrigin: 'top' }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 sm:px-14 flex gap-8 items-center w-full">
        {/* Poster */}
        {posterUrl && (
          <div
            className={`hidden md:block shrink-0 transition-all duration-700 delay-200
              ${!reducedMotion
                ? isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                : ''
              }`}
          >
            <img
              src={posterUrl}
              alt={movie.title}
              className="w-40 lg:w-48 rounded-xl shadow-2xl ring-1 ring-white/10"
            />
          </div>
        )}

        {/* Text */}
        <div
          className={`transition-all duration-700 delay-300
            ${!reducedMotion
              ? isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              : ''
            }`}
        >
          <span className="inline-block text-xs uppercase tracking-widest text-yellow-400 font-semibold mb-3">
            ★ Top Rated Spotlight
          </span>

          <h2 className="text-4xl sm:text-6xl font-extrabold leading-tight drop-shadow-2xl max-w-lg">
            {movie.title}
          </h2>

          {movie.tagline && (
            <p className="text-gray-300 italic mt-2 text-sm sm:text-base max-w-sm">
              "{movie.tagline}"
            </p>
          )}

          {genres.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {genres.map((g) => (
                <span
                  key={g}
                  className="border border-white/20 text-gray-300 text-xs px-3 py-1 rounded-full"
                >
                  {g}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center gap-3 mt-5 flex-wrap">
            {rating && (
              <span className="text-yellow-400 font-bold text-lg">★ {rating}</span>
            )}
            {year && (
              <span className="text-gray-400 text-sm">{year}</span>
            )}
            {movie.runtime > 0 && (
              <span className="text-gray-400 text-sm">
                {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
              </span>
            )}
          </div>

          <Link
            to={`/movie/${movie.id}`}
            className="mt-6 inline-block px-8 py-3 bg-white text-netflix-dark font-bold
                       rounded-md hover:bg-gray-200 transition-colors duration-200 text-sm shadow-xl"
          >
            Explore Film →
          </Link>
        </div>
      </div>
    </section>
  );
}
