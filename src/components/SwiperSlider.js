import React from 'react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Image } from 'antd';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const SwiperSlider = ({ films }) => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      slidesPerView={4}
      spaceBetween={20}
      navigation
      pagination={{
        type: 'fraction',
      }}
      scrollbar={{ draggable: true }}
      onSwiper={swiper => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
    >
      {films.map((item, index) => {
        return (
          <SwiperSlide key={index}>
            <Image width={250} height={350} src={item.imageUrl} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default SwiperSlider;
