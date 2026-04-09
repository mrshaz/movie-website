import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getPosterUrl } from '../../services/tmdbApi.js';

/**
 * Section 1 – a responsive poster field showing trending movies.
 * Each poster zooms and tilts on hover, revealing title / rating overlay.
 */
export default function PosterField({ movies = [], isActive, reducedMotion }) {
  const visible = movies.slice(0, 15);

  return (
    <section className="relative h-screen w-full flex flex-col justify-center overflow-hidden bg-netflix-dark">
      {/* Section heading */}
      <div
        className={`px-6 sm:px-10 mb-6 transition-all duration-700 delay-100
          ${!reducedMotion
            ? isActive ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
            : ''
          }`}
      >
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white
                       border-l-4 border-netflix-red pl-4">
          Trending This Week
        </h2>
        <p className="text-gray-400 text-sm mt-1 pl-4">Hover a poster to explore</p>
      </div>

      {/* Poster grid */}
      <div
        className={`px-6 sm:px-10 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 sm:gap-4 overflow-hidden
          transition-all duration-700 delay-200
          ${!reducedMotion
            ? isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            : ''
          }`}
      >
        {visible.map((movie, idx) => (
          <PosterCard key={movie.id} movie={movie} idx={idx} reducedMotion={reducedMotion} />
        ))}
      </div>
    </section>
  );
}

function PosterCard({ movie, idx, reducedMotion }) {
  const [hovered, setHovered] = useState(false);
  const posterUrl = getPosterUrl(movie.poster_path, 'w342');
  const year = movie.release_date?.slice(0, 4);
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : null;

  /* Slight stagger delay based on position */
  const delay = reducedMotion ? 0 : idx * 40;

  return (
    <Link
      to={`/movie/${movie.id}`}
      className="relative block rounded-lg overflow-hidden shadow-xl aspect-[2/3]
                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-netflix-red"
      onMouseEnter={() => !reducedMotion && setHovered(true)}
      onMouseLeave={() => !reducedMotion && setHovered(false)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Poster image */}
      {posterUrl ? (
        <img
          src={posterUrl}
          alt={movie.title}
          loading="lazy"
          className={`w-full h-full object-cover transition-transform duration-500 ease-out
            ${!reducedMotion && hovered ? 'scale-110' : 'scale-100'}`}
        />
      ) : (
        <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-500 text-xs">
          No Image
        </div>
      )}

      {/* Hover overlay */}
      <div
        className={`absolute inset-0 flex flex-col justify-end p-3
          bg-gradient-to-t from-black/95 via-black/50 to-transparent
          transition-opacity duration-300
          ${!reducedMotion ? (hovered ? 'opacity-100' : 'opacity-0') : 'opacity-0 hover:opacity-100'}`}
      >
        <h3 className="text-white font-semibold text-xs leading-tight line-clamp-2 mb-1">
          {movie.title}
        </h3>
        <div className="flex items-center justify-between text-xs text-gray-300 mb-2">
          <span>{year}</span>
          {rating && <span className="text-yellow-400 font-bold">★ {rating}</span>}
        </div>
        <span
          aria-hidden="true"
          className="text-center text-xs font-semibold bg-netflix-red text-white rounded py-1 px-2"
        >
          Details
        </span>
      </div>
    </Link>
  );
}
