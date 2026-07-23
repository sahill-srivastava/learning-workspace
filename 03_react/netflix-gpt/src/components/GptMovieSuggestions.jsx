import { useSelector } from "react-redux";
import MovieList from "./MovieList"

/*-----------------------Refactor it----------------------------- */
const GptMovieSuggestions = () => {
  const { movieNames, movieResults } = useSelector((store) => store.gpt);

  if (!movieNames) return null;

  return (
    <div className="w-[600px] bg-yellow-400 p-5 rounded flex gap-2.5">
      {
        movieResults.map((movieName, index) => {
          <MovieList 
          key={movieName}
          title={movieName}
          movies={movieResults[index]}
          />
        })
      }
    </div>
  );
};

export default GptMovieSuggestions;
