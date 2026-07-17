import MovieCard from "./MovieCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css/navigation"



const MovieList = ({ title, movies }) => {
  // console.log("second: ", movies);
  // console.log(movies[0]);
  // console.log(movies.poster_path);

  return (
    <div className="p-6 bg-black">
      <h2 className="text-3xl text-white font-semibold mb-5">{title}</h2>
      <div className="">
        <div >
          <Swiper
           slidesPerView={8}
           modules={[Navigation, Autoplay]}
           navigation
           autoplay={false}
           loop
          >

          {movies.map((movie) => (
            <SwiperSlide className="carousel_slide">
              <MovieCard key={movie.id} posterPath={movie.poster_path} />
            </SwiperSlide>
          ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default MovieList;
