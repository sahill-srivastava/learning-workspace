import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addTopRatedMovies } from "../utils/moviesSlice";


const useTopRatedMovies = () => {

    //Fetch Data from TMDB API and update store
    const dispatch = useDispatch();

    const getTopRatedMovies = async () => {
        const res = await fetch(
            "https://api.themoviedb.org/3/movie/top_rated?page=1",
            API_OPTIONS,
        );

        const data = await res.json();

       console.log("Top Rated: ", data.results)

        dispatch(addTopRatedMovies(data.results))
    };

    useEffect(() => {
        getTopRatedMovies();
    }, []);

}


export default useTopRatedMovies;