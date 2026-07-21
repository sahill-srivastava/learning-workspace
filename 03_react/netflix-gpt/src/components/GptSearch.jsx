import GptMovieSuggestions from "./GptMovieSuggestions";
import GptSearchBar from "./GptSearchBar";
import heroBanner from "../assets/netflix-hero-banner.jpg";

const GptSearch = () => {
  return (
    <div>
      <div className="relative">
        <img
          className="w-screen h-screen  object-cover"
          src={heroBanner}
          alt="banner"
        />
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/50"></div>
        <GptSearchBar />
      </div>
      <GptMovieSuggestions />
    </div>
  );
};

export default GptSearch;
