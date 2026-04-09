import { useEffect, useState } from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver.js';
import MovieCard from './MovieCard.jsx';
import SkeletonCard from './SkeletonCard.jsx';

const SKELETON_COUNT = 6;

/**
 * A section that triggers a data-fetch only once the sentinel element
 * enters the viewport (IntersectionObserver). Shows skeleton cards while
 * loading, then fades in the real cards.
 *
 * Props:
 *   title     – section heading string
 *   fetchFn   – async fn () => array of movie objects
 *   accent    – optional Tailwind color class for the left-border accent (default red)
 */
export default function Section({ title, fetchFn, accent = 'border-netflix-red' }) {
  const [ref, visible] = useIntersectionObserver();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    if (!visible || fetched) return;
    setLoading(true);
    setFetched(true);
    fetchFn()
      .then((results) => setMovies(results))
      .catch(() => setMovies([]))
      .finally(() => setLoading(false));
  }, [visible, fetched, fetchFn]);

  return (
    <section ref={ref} className="px-4 py-8 max-w-7xl mx-auto">
      {/* Section heading */}
      <div className={`flex items-center gap-3 mb-5 border-l-4 ${accent} pl-3`}>
        <h2 className="text-white text-xl sm:text-2xl font-bold tracking-tight">
          {title}
        </h2>
      </div>

      {/* Skeleton or movie grid */}
      {loading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}

      {!loading && movies.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 animate-fadeIn">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}

      {/* Sentinel – keeps the ref visible even if movies is empty */}
      {!visible && <div className="h-1" />}
    </section>
  );
}
