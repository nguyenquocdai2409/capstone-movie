import React, { useEffect, useState } from "react";
import { getListMovie } from "../../../Services/api";

import { NavLink } from "react-router-dom";

import moment from "moment/moment";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";

import "./detailMovie.scss";

// import required modules
import { EffectCoverflow, Navigation, FreeMode } from "swiper/modules";

export default function DetailMovie() {
  const [movieArr, setMovieArr] = useState([]);
  useEffect(() => {
    let fetchData = async () => {
      try {
        let res = await getListMovie();
        setMovieArr(res.data.content);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div id='showtimes' className='listMovie relative overflow-x-hidden'>
      <div>
        <p className='text-orange-400 text-center text-4xl font-bold '>Top movies in theatres</p>
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          rewind={true}
          navigation={true}
          freeMode={true}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          modules={[EffectCoverflow, Navigation, FreeMode]}
          className='mySwiper'>
          {movieArr?.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <div className='carousel__img  border-2 border-black h-full'>
                  <img src={item.hinhAnh} loading='lazy' alt='...' />
                </div>
                <div className='carousel__content text-white w-[65%] py-2 md:w-full md:py-3'>
                  <h3 className='font-bold text-base md:text-2xl'>{item.tenPhim}</h3>
                  <p className='text-sm'>
                    Khởi chiếu:
                    <span> {moment(item.ngayKhoiChieu).format("ll")}</span>
                  </p>
                  <NavLink to={`/detail/${item.maPhim}`}>
                    <button className='mt-3 sm:mt-3 px-4 py-2 border border-white rounded font-bold hover:bg-white duration-300 hover:text-orange-500'>
                      Chi tiết
                    </button>
                  </NavLink>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}
