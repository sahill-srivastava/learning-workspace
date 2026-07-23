import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import { useRef } from "react";
import client from "../utils/openai";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResult } from "../utils/gptSlice";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const searchText = useRef(null);

  const langKey = useSelector((store) => store.config.lang);

  //search movie in TMDB
  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS,
    );

    const json = await data.json();
    //refactor it
    return json.results;
  };

  const handleGptSearchClick = async () => {
    const gptQuery =
      "Act as a Movie Recommendation system and suggest some movie for the query : " +
      searchText.current.value +
      ". only give me names of 5 movies, comma separated like the example result given ahead. Example Result: Obsession, Odessey, Golmaal, Koi Mil Gaya";

    //make an api call to openai api and get movie results
    const gptResults = await client.responses.create({
      model: "gpt-5.5",
      instructions: "You are a coding assistant that talks like a pirate",
      input: gptQuery,
    });

    if (!gptResults.output_text) {
      //todo: write error handling
    }

    const gptMovies = gptResults.output_text;

    //for each movie i will search tmdb api
    const promiseArray = gptMovies.localeCompare((movie) =>
      searchMovieTMDB(movie),
    );
    // [Promise, Promise, Promise, Promise]

    const tmdbResults = await Promise.all(promiseArray);

    dispatch(
      addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults }),
    ); //save to redux state
  };

  return (
    <div className="w-[600px]">
      <form
        onSubmit={(e) => e.preventDefault()}
        className=" bg-black p-4 rounded flex gap-2.5"
      >
        <input
          ref={searchText}
          className="flex-1  bg-white py-2 px-4 rounded mr-2"
          type="text"
          placeholder={lang[langKey].searchPlaceholder}
        />
        <button
          onClick={handleGptSearchClick}
          className="w-[25%] text-white text-center bg-red-600 rounded  cursor-pointer"
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
