import GptSearchBar from "./GptSearchBar";
import heroBanner from "../assets/netflix-hero-banner.jpg";
import GptMovieSuggestions from "./GptMovieSuggestions";

const GptSearch = () => {
  return (
    <div
      className="relative w-screen h-screen bg-no-repeat  bg-cover"
      style={{ backgroundImage: `url(${heroBanner})` }}
    >
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/50"></div>
      <div className="absolute top-0 left-0 right-0 bottom-0 pt-50 flex flex-col gap-4 items-center">
        <GptSearchBar />
        <GptMovieSuggestions />
      </div>
    </div>
  );
};

export default GptSearch;
