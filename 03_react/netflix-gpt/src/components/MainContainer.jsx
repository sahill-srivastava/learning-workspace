import { useSelector } from "react-redux";
import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);

  // this is known as early return
  if(!movies) return;

  const mainMovie = movies[0];

  const { id, original_title, overview} = mainMovie;


  return <div>
    <VideoTitle title={original_title} description={overview} />
    <VideoBackground movieId={id} />
  </div>
};

export default MainContainer;
