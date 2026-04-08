import { Link } from 'react-router-dom';
import { getPosterUrl } from '../services/tmdbApi.js';

export default function MovieCard({ movie }) {
  const posterUrl = getPosterUrl(movie.poster_path);
  const year = movie.release_date ? movie.release_date.slice(0, 4) : 'N/A';
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : '—';

  return (
    <Link
      to={`/movie/${movie.id}`}
      className="group relative block bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-200 hover:ring-2 hover:ring-netflix-red"
    >
      {posterUrl ? (
        <img
          src={posterUrl}
          alt={movie.title}
          className="w-full aspect-[2/3] object-cover"
          loading="lazy"
        />
      ) : (
        <div className="w-full aspect-[2/3] bg-gray-800 flex items-center justify-center text-gray-500 text-sm">
          No Image
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
        <h3 className="text-white font-semibold text-sm leading-tight line-clamp-2">
          {movie.title}
        </h3>
        <div className="flex items-center justify-between mt-1 text-xs text-gray-300">
          <span>{year}</span>
          <span className="text-yellow-400 font-bold">★ {rating}</span>
        </div>
      </div>

      <div className="p-2">
        <h3 className="text-white text-xs font-medium truncate">{movie.title}</h3>
        <div className="flex items-center justify-between text-xs text-gray-400 mt-0.5">
          <span>{year}</span>
          <span className="text-yellow-400">★ {rating}</span>
        </div>
      </div>
    </Link>
  );
}
