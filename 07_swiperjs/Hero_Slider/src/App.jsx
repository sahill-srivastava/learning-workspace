import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


//import modules
import { Navigation, Pagination } from "swiper/modules";

const App = () => {
  const SLIDER_IMG1 =
    "https://images.unsplash.com/photo-1782400026242-494ccb2cf728?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  const SLIDER_IMG2 =
    "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  const SLIDER_IMG3 =
    "https://plus.unsplash.com/premium_photo-1666855679490-0f89cf90f9b9?q=80&w=1075&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
    <div>
      <Swiper className=" h-[90vh]"
        modules={[Navigation, Pagination]}
        navigation
        pagination={{clickable: true}}
      >
        <SwiperSlide
          className="!flex justify-center items-center bg-cover bg-no-repeat"
          style={{ backgroundImage: `url(${SLIDER_IMG1})` }}
        >
          <div className="flex flex-col gap-2.5 items-center justify-center text-white w-1/2 h-fit">
            <h1 className="text-4xl mb-2.5">Slide1</h1>
            <p className="text-lg text-center mb-5">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore
              aut quia veritatis molestiae laboriosam consectetur velit labore
              numquam illo placeat?
            </p>
            <button className="px-10 py-2.5 bg-black hover:bg-black/85 text-white rounded-4xl cursor-pointer">
              Click Me
            </button>
          </div>
        </SwiperSlide>
        <SwiperSlide
          className="!flex justify-center items-center bg-cover bg-no-repeat"
          style={{ backgroundImage: `url(${SLIDER_IMG2})` }}
        >
          <div className="flex flex-col gap-2.5 items-center justify-center text-white w-1/2 h-fit">
            <h1 className="text-4xl mb-2.5">Slide2</h1>
            <p className="text-lg text-center mb-5">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore
              aut quia veritatis molestiae laboriosam consectetur velit labore
              numquam illo placeat?
            </p>
            <button className="px-10 py-2.5 bg-black hover:bg-black/85 text-white rounded-4xl cursor-pointer">
              Click Me
            </button>
          </div>
        </SwiperSlide>
        <SwiperSlide
          className="!flex justify-center items-center bg-cover bg-no-repeat"
          style={{ backgroundImage: `url(${SLIDER_IMG3})` }}
        >
          <div className="flex flex-col gap-2.5 items-center justify-center text-white w-1/2 h-fit">
            <h1 className="text-4xl mb-2.5">Slide3</h1>
            <p className="text-lg text-center mb-5">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore
              aut quia veritatis molestiae laboriosam consectetur velit labore
              numquam illo placeat?
            </p>
            <button className="px-10 py-2.5 bg-black hover:bg-black/85 text-white rounded-4xl cursor-pointer">
              Click Me
            </button>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default App;

<Swiper>
  <SwiperSlide>
    <h1>Slide1</h1>
  </SwiperSlide>
  <SwiperSlide>
    <h1>Slide2</h1>
  </SwiperSlide>
</Swiper>;
