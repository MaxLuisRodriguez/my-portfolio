import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCube, Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-cube';
import 'swiper/css/pagination';

interface SwiperCubeProps {
  images: string[];
  delay?: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loop?: boolean;
}

const SwiperCube: React.FC<SwiperCubeProps> = ({
  images,
  delay = 2000,
  size = 'xl',
  loop = true,
}) => {
  const sizeClasses: Record<NonNullable<SwiperCubeProps['size']>, string> = {
    sm: 'w-40 h-40',
    md: 'w-64 h-64', 
    lg: 'w-96 h-96',
    xl: 'w-[448px] h-[448px]',
  };

  const currentSize = sizeClasses[size];

  return (
    <div className={`${currentSize} flex-none rounded-lg overflow-hidden bg-black shadow-lg`}>
      <Swiper
        direction="horizontal"
        className="h-full w-full"
        modules={[EffectCube, Autoplay, Pagination]}
        effect="cube"
        grabCursor
        autoplay={{ delay, disableOnInteraction: false }}
        loop={loop}
        pagination={{ clickable: true }}
        cubeEffect={{ 
          shadow: true, 
          slideShadows: true, 
          shadowOffset: 20, 
          shadowScale: 0.94
        }}
      >
        {images.map((src, idx) => (
          <SwiperSlide key={idx} className="relative h-full w-full overflow-hidden">
            <img
              src={src}
              alt={`Slide ${idx + 1}`}
              className="absolute inset-0"
              style={{
                objectFit: 'cover',
                objectPosition: 'center',
                width: '100%',
                height: '100%'
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SwiperCube;
