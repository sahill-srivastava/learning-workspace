import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const SecondaryContainer = () => {
  const movies = useSelector(store => store.movies)

  // console.log(movies)

  if(!movies.nowPlayingMovies) return;
  if(!movies.popularMovies) return;
  if(!movies.topRatedMovies) return;
  if(!movies.upcomingMovies) return;

  // console.log(movies.nowPlayingMovies)
  return <div className="-mt-[200px]">
    <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />
    <MovieList title={"Popular"} movies={movies.popularMovies} />
    <MovieList title={"Trending"} movies={movies.topRatedMovies} />
    <MovieList title={"Upcoming Movies"} movies={movies.upcomingMovies} />
  </div>;
};

export default SecondaryContainer;
