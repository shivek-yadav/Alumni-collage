import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

function ImageSlider() {
  return (
    <div className="max-w-4xl mx-auto my-8">
      <Swiper
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
        spaceBetween={30}
        slidesPerView={1}
      >
        <SwiperSlide>
          <img src="/assets/slide1.jpg" alt="Slide 1" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/assets/slide2.jpg" alt="Slide 2" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/assets/slide3.jpg" alt="Slide 3" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default ImageSlider;
