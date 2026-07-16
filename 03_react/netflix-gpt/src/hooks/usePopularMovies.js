import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import {  addPopularMovies } from "../utils/moviesSlice";


const usePopularMovies = () => {

    //Fetch Data from TMDB API and update store
    const dispatch = useDispatch();

    const getPopularMovies = async () => {
        const res = await fetch(
            "https://api.themoviedb.org/3/movie/popular?page=1",
            API_OPTIONS,
        );

        const data = await res.json();

        console.log(data.results)

        dispatch(addPopularMovies(data.results))
    };

    useEffect(() => {
        getPopularMovies();
    }, []);

}


export default usePopularMovies;