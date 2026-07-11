import MovieCard from "./MovieCard"

const MovieList = ({title, movies}) => {

    console.log(movies)
  return (
    <div>
        <h2>{title}</h2>
        <div>
            <MovieCard />
        </div>
    </div>
  )
}

export default MovieList