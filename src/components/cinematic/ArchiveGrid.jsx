import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getPosterUrl } from '../../services/tmdbApi.js';

/**
 * Section 4 – archive grid showing upcoming / more movies.
 * Cards fade-stagger in when the section becomes active.
 */
export default function ArchiveGrid({ movies = [], isActive, reducedMotion }) {
  const visible = movies.slice(0, 12);

  return (
    <section className="relative h-screen w-full flex flex-col justify-center overflow-hidden bg-[#111]">
      {/* Section heading */}
      <div
        className={`px-6 sm:px-10 mb-6 transition-all duration-700 delay-100
          ${!reducedMotion
            ? isActive ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
            : ''
          }`}
      >
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white
                       border-l-4 border-accent-cyan pl-4">
          Coming Soon
        </h2>
        <p className="text-gray-400 text-sm mt-1 pl-4">Upcoming releases</p>
      </div>

      {/* Grid */}
      <div
        className={`px-6 sm:px-10 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 overflow-hidden
          transition-all duration-700 delay-200
          ${!reducedMotion
            ? isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            : ''
          }`}
      >
        {visible.map((movie, idx) => (
          <ArchiveCard
            key={movie.id}
            movie={movie}
            idx={idx}
            reducedMotion={reducedMotion}
          />
        ))}
      </div>
    </section>
  );
}

function ArchiveCard({ movie, idx, reducedMotion }) {
  const [hovered, setHovered] = useState(false);
  const posterUrl = getPosterUrl(movie.poster_path, 'w342');
  const year = movie.release_date?.slice(0, 4);
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : null;
  const delay = reducedMotion ? 0 : idx * 35;

  return (
    <Link
      to={`/movie/${movie.id}`}
      className="relative block rounded-lg overflow-hidden aspect-[2/3] shadow-lg
                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan"
      onMouseEnter={() => !reducedMotion && setHovered(true)}
      onMouseLeave={() => !reducedMotion && setHovered(false)}
      style={{ transitionDelay: `${delay}ms` }}
    >
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
        className={`absolute inset-0 flex flex-col justify-end p-2
          bg-gradient-to-t from-black/95 via-black/40 to-transparent
          transition-opacity duration-300
          ${!reducedMotion ? (hovered ? 'opacity-100' : 'opacity-0') : 'opacity-0 hover:opacity-100'}`}
      >
        <h3 className="text-white font-semibold text-xs leading-tight line-clamp-2 mb-1">
          {movie.title}
        </h3>
        <div className="flex items-center justify-between text-xs text-gray-300">
          <span>{year}</span>
          {rating && <span className="text-yellow-400 font-bold">★ {rating}</span>}
        </div>
      </div>

      {/* Cyan top border on hover */}
      <div
        className={`absolute top-0 inset-x-0 h-0.5 bg-accent-cyan transition-opacity duration-300
          ${!reducedMotion && hovered ? 'opacity-100' : 'opacity-0'}`}
      />
    </Link>
  );
}
