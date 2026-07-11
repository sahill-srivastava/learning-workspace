import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  console.log(movies);
  console.log(movies[0]);
  console.log(movies.poster_path);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold mb-5">{title}</h2>
      <div className="flex overflow-x-scroll">
        <div className="flex  gap-4 items-center">
          {movies.map((movie) => (
            <MovieCard key={movie.id} posterPath={movie.poster_path} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
