import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  getMovieDetails,
  getMovieCredits,
  getPosterUrl,
  getBackdropUrl,
} from '../services/tmdbApi.js';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';

export default function MovieDetailPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    Promise.all([getMovieDetails(id), getMovieCredits(id)])
      .then(([detailRes, creditsRes]) => {
        setMovie(detailRes.data);
        setCredits(creditsRes.data);
      })
      .catch((err) => {
        setError(err.message || 'Failed to load movie details.');
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <LoadingSpinner message="Loading movie details…" />;
  if (error) return <ErrorMessage message={error} />;
  if (!movie) return null;

  const posterUrl = getPosterUrl(movie.poster_path);
  const backdropUrl = getBackdropUrl(movie.backdrop_path);
  const director = credits?.crew?.find((c) => c.job === 'Director');
  const cast = credits?.cast?.slice(0, 8) ?? [];
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : '—';

  return (
    <div>
      {/* Backdrop */}
      {backdropUrl && (
        <div
          className="h-72 sm:h-96 w-full relative overflow-hidden"
          style={{
            backgroundImage: `url(${backdropUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-netflix-dark to-transparent" />
        </div>
      )}

      <div className="max-w-5xl mx-auto px-4 py-8">
        <Link
          to="/"
          className="text-gray-400 hover:text-white text-sm mb-6 inline-block transition-colors"
        >
          ← Back to Home
        </Link>

        <div className="flex flex-col sm:flex-row gap-8">
          {/* Poster */}
          {posterUrl ? (
            <img
              src={posterUrl}
              alt={movie.title}
              className="w-48 sm:w-56 rounded-lg shadow-2xl shrink-0 self-start"
            />
          ) : (
            <div className="w-48 sm:w-56 aspect-[2/3] bg-gray-800 rounded-lg flex items-center justify-center text-gray-500">
              No Poster
            </div>
          )}

          {/* Info */}
          <div className="flex-1">
            <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight">
              {movie.title}
            </h1>

            {movie.tagline && (
              <p className="text-gray-400 italic mt-1 text-sm">{movie.tagline}</p>
            )}

            <div className="flex flex-wrap gap-3 mt-4 text-sm">
              <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full font-bold">
                ★ {rating}
              </span>
              {movie.release_date && (
                <span className="bg-white/10 px-3 py-1 rounded-full">
                  {movie.release_date.slice(0, 4)}
                </span>
              )}
              {movie.runtime > 0 && (
                <span className="bg-white/10 px-3 py-1 rounded-full">
                  {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
                </span>
              )}
            </div>

            {/* Genres */}
            {movie.genres?.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {movie.genres.map((g) => (
                  <span
                    key={g.id}
                    className="border border-netflix-red text-netflix-red text-xs px-2 py-0.5 rounded-full"
                  >
                    {g.name}
                  </span>
                ))}
              </div>
            )}

            {/* Overview */}
            <h2 className="text-lg font-semibold mt-6 mb-2">Overview</h2>
            <p className="text-gray-300 leading-relaxed text-sm">{movie.overview || '—'}</p>

            {/* Director */}
            {director && (
              <p className="mt-4 text-sm text-gray-400">
                <span className="text-white font-semibold">Director: </span>
                {director.name}
              </p>
            )}

            {/* Cast */}
            {cast.length > 0 && (
              <div className="mt-6">
                <h2 className="text-lg font-semibold mb-3">Top Cast</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {cast.map((actor) => (
                    <div key={actor.id} className="text-center">
                      {actor.profile_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                          alt={actor.name}
                          className="w-full aspect-square object-cover object-top rounded-md mb-1"
                        />
                      ) : (
                        <div className="w-full aspect-square bg-gray-800 rounded-md mb-1 flex items-center justify-center text-gray-500 text-3xl">
                          👤
                        </div>
                      )}
                      <p className="text-xs font-semibold text-white truncate">{actor.name}</p>
                      <p className="text-xs text-gray-500 truncate">{actor.character}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
