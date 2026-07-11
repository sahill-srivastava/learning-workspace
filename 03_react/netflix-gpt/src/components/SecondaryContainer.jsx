import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const SecondaryContainer = () => {
  const movies = useSelector(store => store.movies)

  if(!movies.nowPlayingMovies) return;

  // console.log(movies.nowPlayingMovies)
  return <div>
    <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />
    <MovieList title={"Trending"} movies={movies.nowPlayingMovies} />
    <MovieList title={"Popular"} movies={movies.nowPlayingMovies} />
    <MovieList title={"Upcoming Movies"} movies={movies.nowPlayingMovies} />
    <MovieList title={"Horror Movies"} movies={movies.nowPlayingMovies} />
  </div>;
};

export default SecondaryContainer;
