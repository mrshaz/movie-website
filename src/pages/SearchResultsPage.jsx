import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { searchMovies } from '../services/tmdbApi.js';
import MovieGrid from '../components/MovieGrid.jsx';
import SearchBar from '../components/SearchBar.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';

export default function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const [movies, setMovies] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) return;
    setLoading(true);
    setError(null);
    searchMovies(query)
      .then(({ data }) => {
        setMovies(data.results || []);
        setTotalResults(data.total_results || 0);
      })
      .catch((err) => {
        setError(err.message || 'Search failed.');
      })
      .finally(() => setLoading(false));
  }, [query]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Link to="/" className="text-gray-400 hover:text-white text-sm mb-6 inline-block transition-colors">
        ← Back to Home
      </Link>

      <h1 className="text-2xl font-bold mb-6">
        {query ? (
          <>
            Search results for{' '}
            <span className="text-netflix-red">"{query}"</span>
            {!loading && (
              <span className="text-gray-400 text-base font-normal ml-2">
                ({totalResults.toLocaleString()} results)
              </span>
            )}
          </>
        ) : (
          'Search Movies'
        )}
      </h1>

      <div className="mb-8">
        <SearchBar initialQuery={query} />
      </div>

      {loading && <LoadingSpinner message={`Searching for "${query}"…`} />}
      {error && <ErrorMessage message={error} />}

      {!loading && !error && movies.length === 0 && query && (
        <div className="text-center py-16 text-gray-400">
          <p className="text-5xl mb-4">🔍</p>
          <p className="text-lg">No movies found for "{query}"</p>
          <p className="text-sm mt-2">Try a different search term</p>
        </div>
      )}

      {!loading && !error && (
        <MovieGrid movies={movies} />
      )}
    </div>
  );
}
