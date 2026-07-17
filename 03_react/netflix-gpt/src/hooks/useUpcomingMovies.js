import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUpcomingMovies } from "../utils/moviesSlice";


const useUpcomingMovies = () => {

    //Fetch Data from TMDB API and update store
    const dispatch = useDispatch();

    const getUpcomingMovies = async () => {
        const res = await fetch(
            "https://api.themoviedb.org/3/movie/top_rated?page=2",
            API_OPTIONS,
        );

        const data = await res.json();

       console.log("Upcoming: ", data.results)

        dispatch(addUpcomingMovies(data.results))
    };

    useEffect(() => {
        getUpcomingMovies();
    }, []);

}


export default useUpcomingMovies;