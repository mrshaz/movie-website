import MovieCard from './MovieCard.jsx';

export default function MovieGrid({ movies, title }) {
  if (!movies || movies.length === 0) return null;

  return (
    <section className="px-4 py-6">
      {title && (
        <h2 className="text-white text-xl font-bold mb-4">{title}</h2>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}
