import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";

const VideoBackground = ({ movieId }) => {
  //fetch trailer video
  const getMoviesVideos = async (movieId) => {
    const res = await fetch(
      "https://api.themoviedb.org/3/movie/" +
        movieId +
        "/videos?language=en-US",
      API_OPTIONS,
    );

    // console.log(res);

    const data = await res.json();

    // console.log(data);

    const filterData = data.results.filter(video => video.type === "Trailer")

    const trailer = filterData.length ? filterData[[0]] : data.results[0];


    console.log(trailer)
  };

  useEffect(() => {
    getMoviesVideos(movieId);
  }, []);
  return <div>VideoBackground</div>;
};

export default VideoBackground;
