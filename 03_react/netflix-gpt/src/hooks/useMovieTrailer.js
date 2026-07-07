import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { addTrailerVideo } from "../utils/moviesSlice";
import { useDispatch } from "react-redux";



const useMovieTrailer = (movieId) => {
    const dispatch = useDispatch()


    //fetch trailer video
    const getMoviesVideos = async (movieId) => {

        const res = await fetch(
            "https://api.themoviedb.org/3/movie/" +
            movieId +
            "/videos?language=en-US",
            API_OPTIONS,
        );


        const data = await res.json();


        const filterData = data.results.filter((video) => video.type === "Trailer");

        const trailer = filterData.length ? filterData[[0]] : data.results[0];


        dispatch(addTrailerVideo(trailer))

    };

    useEffect(() => {
        getMoviesVideos(movieId);
    }, []);

}


export default useMovieTrailer;
