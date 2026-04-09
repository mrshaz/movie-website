import { useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { getPosterUrl, getBackdropUrl } from '../../services/tmdbApi.js';

/**
 * Section 2 – horizontal draggable rail for Top Rated movies.
 * Mouse-drag and touch-scroll both work; no nested wheel capture so
 * the vertical section scroll still functions.
 */
export default function MovieRail({ movies = [], isActive, reducedMotion }) {
  const trackRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const onPointerDown = useCallback((e) => {
    if (!trackRef.current) return;
    isDragging.current = true;
    startX.current = e.pageX - trackRef.current.offsetLeft;
    scrollLeft.current = trackRef.current.scrollLeft;
    trackRef.current.style.cursor = 'grabbing';
  }, []);

  const onPointerMove = useCallback((e) => {
    if (!isDragging.current || !trackRef.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    trackRef.current.scrollLeft = scrollLeft.current - walk;
  }, []);

  const stopDrag = useCallback(() => {
    isDragging.current = false;
    if (trackRef.current) trackRef.current.style.cursor = 'grab';
  }, []);

  const visible = movies.slice(0, 12);

  return (
    <section className="relative h-screen w-full flex flex-col justify-center overflow-hidden bg-[#0d0d0d]">
      {/* Section heading */}
      <div
        className={`px-6 sm:px-10 mb-6 transition-all duration-700 delay-100
          ${!reducedMotion
            ? isActive ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
            : ''
          }`}
      >
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white
                       border-l-4 border-yellow-500 pl-4">
          Top Rated
        </h2>
        <p className="text-gray-400 text-sm mt-1 pl-4">Drag to explore</p>
      </div>

      {/* Draggable track */}
      <div
        ref={trackRef}
        className={`flex gap-4 overflow-x-auto px-6 sm:px-10 pb-4 select-none
          scrollbar-hide cursor-grab transition-all duration-700 delay-200
          ${!reducedMotion
            ? isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            : ''
          }`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={stopDrag}
        onPointerLeave={stopDrag}
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {visible.map((movie) => (
          <RailCard key={movie.id} movie={movie} reducedMotion={reducedMotion} />
        ))}
      </div>
    </section>
  );
}

function RailCard({ movie, reducedMotion }) {
  const [hovered, setHovered] = useState(false);
  const backdropUrl = getBackdropUrl(movie.backdrop_path, 'w780');
  const posterUrl = getPosterUrl(movie.poster_path, 'w185');
  const year = movie.release_date?.slice(0, 4);
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : null;

  return (
    <Link
      to={`/movie/${movie.id}`}
      className="relative shrink-0 rounded-xl overflow-hidden shadow-2xl focus-visible:outline-none
                 focus-visible:ring-2 focus-visible:ring-netflix-red"
      style={{ scrollSnapAlign: 'start', width: 'clamp(200px, 30vw, 320px)', aspectRatio: '16/9' }}
      onMouseEnter={() => !reducedMotion && setHovered(true)}
      onMouseLeave={() => !reducedMotion && setHovered(false)}
    >
      {/* Backdrop */}
      {backdropUrl ? (
        <img
          src={backdropUrl}
          alt={movie.title}
          loading="lazy"
          draggable={false}
          className={`w-full h-full object-cover transition-transform duration-500 ease-out
            ${!reducedMotion && hovered ? 'scale-110' : 'scale-100'}`}
        />
      ) : posterUrl ? (
        <img
          src={posterUrl}
          alt={movie.title}
          loading="lazy"
          draggable={false}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-500 text-xs">
          No Image
        </div>
      )}

      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

      {/* Info */}
      <div className="absolute bottom-0 inset-x-0 p-3">
        <h3 className="text-white font-bold text-sm leading-tight truncate">{movie.title}</h3>
        <div className="flex items-center gap-2 mt-1 text-xs text-gray-300">
          {year && <span>{year}</span>}
          {rating && <span className="text-yellow-400 font-bold">★ {rating}</span>}
        </div>
      </div>
    </Link>
  );
}
