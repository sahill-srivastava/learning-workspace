import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { Navigation } from "swiper/modules";
import "swiper/css/navigation";

import { Autoplay } from "swiper/modules";
const App = () => {
  const slidesClass = `!flex items-center justify-center rounded-2xl`;
  return (
    <div className="mt-52">
      <Swiper
        className="h-[300px] mx-20"
        modules={[Navigation, Autoplay]}
        navigation
        slidesPerView={2}
        speed={600}
        autoplay={{
          delay: 2000,
          disableOnInteraction: true,
        }}
        spaceBetween={20}
        loop
        breakpoints={{
          768: {
            slidesPerView: 4
          }
        }}
      >
        <SwiperSlide className={`${slidesClass} bg-purple-600`}>
          <h1>Slide1</h1>
        </SwiperSlide>
        <SwiperSlide className={`${slidesClass} bg-red-600`}>
          <h1>Slide2</h1>
        </SwiperSlide>
        <SwiperSlide className={`${slidesClass} bg-yellow-600`}>
          <h1>Slide3</h1>
        </SwiperSlide>
        <SwiperSlide className={`${slidesClass} bg-cyan-600`}>
          <h1>Slide4</h1>
        </SwiperSlide>
        <SwiperSlide className={`${slidesClass} bg-green-600`}>
          <h1>Slide5</h1>
        </SwiperSlide>
        <SwiperSlide className={`${slidesClass} bg-zinc-600`}>
          <h1>Slide6</h1>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default App;
