import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const SecondaryContainer = () => {
  const movies = useSelector(store => store.movies)

  // console.log(movies)

  if(!movies.nowPlayingMovies) return;
  if(!movies.popularMovies) return;

  // console.log(movies.nowPlayingMovies)
  return <div className="-mt-[200px]">
    <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />
    <MovieList title={"Trending"} movies={movies.nowPlayingMovies} />
    <MovieList title={"Popular"} movies={movies.popularMovies} />
    <MovieList title={"Upcoming Movies"} movies={movies.nowPlayingMovies} />
    <MovieList title={"Horror Movies"} movies={movies.nowPlayingMovies} />
  </div>;
};

export default SecondaryContainer;
