import { useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import { useRef } from "react";
import client from "../utils/openai";
import { API_OPTIONS } from "../utils/constants";

const GptSearchBar = () => {
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
    console.log(searchText.current.value);

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

    console.log(gptResults.output_text); //refactor it

    const gptMovies = gptResults.output_text;

    //for each movie i will search tmdb api
    const promiseArray = gptMovies.localeCompare((movie) =>
      searchMovieTMDB(movie),
    );
    // [Promise, Promise, Promise, Promise]

    const tmdbResults = await Promise.all(promiseArray);

    console.log(tmdbResults)
  };

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 z-20 pt-40 flex justify-center">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-1/2 h-[80px] bg-black p-5 rounded flex gap-2.5"
      >
        <input
          ref={searchText}
          className="flex-1  bg-white p-2 px-3 rounded mr-2"
          type="text"
          placeholder={lang[langKey].searchPlaceholder}
        />
        <button
          onClick={handleGptSearchClick}
          className="w-[20%] text-white bg-red-600 rounded py-2 px-5 cursor-pointer"
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
