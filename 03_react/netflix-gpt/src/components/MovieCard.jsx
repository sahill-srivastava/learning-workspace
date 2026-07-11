import { IMG_CDN_URL } from "../utils/constants"

const MovieCard = ({posterPath}) => {
    console.log(posterPath)
  return (
    <div className="w-48">
        <img className="rounded" src={IMG_CDN_URL + posterPath} alt="movie-poster" />
    </div>
  )
}

export default MovieCard