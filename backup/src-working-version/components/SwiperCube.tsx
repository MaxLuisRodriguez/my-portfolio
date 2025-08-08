import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCube, Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-cube';
import 'swiper/css/pagination';

interface SwiperCubeProps {
  images: string[];
  delay?: number;
  size?: 'sm' | 'md' | 'lg';
  loop?: boolean;
}

const SwiperCube: React.FC<SwiperCubeProps> = ({
  images,
  delay = 2000,
  size = 'sm',
  loop = true,
}) => {
  const sizeClasses: Record<NonNullable<SwiperCubeProps['size']>, string> = {
    sm: 'w-10 h-10',
    md: 'w-24 h-24', 
    lg: 'w-32 h-32',
  };

  return (
    <div className="w-20 h-20 flex-none rounded-lg overflow-hidden bg-black shadow-lg" style={{ width: '80px', height: '80px', maxWidth: '80px', maxHeight: '80px', display: 'inline-block' }}>
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
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                objectFit: 'contain',
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
