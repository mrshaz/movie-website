import MovieCard from './MovieCard.jsx';

export default function MovieGrid({ movies, title, accent = 'border-netflix-red' }) {
  if (!movies || movies.length === 0) return null;

  return (
    <section className="px-4 py-8">
      {title && (
        <div className={`flex items-center gap-3 mb-5 border-l-4 ${accent} pl-3`}>
          <h2 className="text-white text-xl sm:text-2xl font-bold tracking-tight">
            {title}
          </h2>
        </div>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}

