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
  const sizeMap = {
    sm: { width: '80px', height: '80px' },
    md: { width: '120px', height: '120px' },
    lg: { width: '160px', height: '160px' },
  };

  const currentSize = sizeMap[size];

  // Debug logging
  console.log('SwiperCube - images:', images);
  console.log('SwiperCube - size:', size, 'currentSize:', currentSize);

  // If no images, return placeholder
  if (!images || images.length === 0) {
    return (
      <div 
        className="flex-none rounded-lg overflow-hidden bg-red-500 shadow-lg flex items-center justify-center" 
        style={{ 
          width: currentSize.width, 
          height: currentSize.height, 
          maxWidth: currentSize.width, 
          maxHeight: currentSize.height, 
          display: 'inline-block' 
        }}
      >
        <span className="text-white text-xs">No Images</span>
      </div>
    );
  }

  return (
    <div 
      className="flex-none rounded-lg overflow-hidden bg-black shadow-lg" 
      style={{ 
        width: currentSize.width, 
        height: currentSize.height, 
        maxWidth: currentSize.width, 
        maxHeight: currentSize.height, 
        display: 'inline-block' 
      }}
    >
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
              className="absolute inset-0 w-full h-full min-w-full min-h-full object-cover"
              style={{
                objectFit: 'cover',
                objectPosition: '50% 50%',
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
