import React, {useEffect, useState} from 'react';


interface CubeSlideshowProps {
    images: string[];
    interval?: number;
    delay?: number;
    size?: 'sm' | 'md' | 'lg';
    transitionType?: 'cube' | 'fade' | 'slide' | 'flip';
    onSlideChange?: (index:number) => void; // Callback for exernal control
    autoPlay?: boolean;
}


const CubeSlideshow: React.FC<CubeSlideshowProps> = ({
    images,
    interval = 6000,
    delay = 0,
    size = 'md',
    transitionType = 'cube',
    onSlideChange,
    autoPlay = true,
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (!autoPlay) return;

        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => 
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, interval);

        return () => clearInterval(timer);
    }, [autoPlay, images.length, interval]);

    useEffect(() => {
        onSlideChange?.(currentIndex);
    }, [currentIndex, onSlideChange]);

    const sizeClasses = {
        sm: 'w-48 h-32',
        md: 'w-64 h-48',     
        lg: 'w-96 h-64'
    };

    return (
        <div className={`relative overflow-hidden rounded-lg shadow-lg ${sizeClasses[size]} perspective-1000 bg-black`}>
            {/* 3D Container for transitions */}
            <div 
                className="relative h-full w-full transform-style-preserve-3d transition-all duration-1000 transform-gpu"
                style={{
                    transform: transitionType === 'cube' 
                        ? `rotateY(${-currentIndex * 90}deg)` 
                        : 'none'
                }}
            >
                {/* Render all images for cube effect */}
                {transitionType === 'cube' ? (
                    images.map((image, index) => {
                        const angle = index * 90;
                        const isFront = index === currentIndex;
                        const isVisible = Math.abs(angle - (currentIndex * 90)) <= 90;
                        
                        return (
                            <img 
                                key={index}
                                src={image}
                                alt={`Slide ${index + 1}`}
                                className="absolute w-full h-full object-cover transition-all duration-1000 transform-gpu"
                                style={{
                                    transform: `rotateY(${angle}deg) translateZ(50px)`,
                                    backfaceVisibility: 'hidden',
                                    transformOrigin: 'center center',
                                    opacity: isVisible ? 1 : 0
                                }}
                            />
                        );
                    })
                ) : (
                    /* Single image for other transitions */
                    <img 
                        src={images[currentIndex]}
                        alt={`Slide ${currentIndex + 1}`}
                        className={`w-full h-full object-cover transition-opacity duration-1000 transform-gpu`}
                        style={{
                            transform: transitionType === 'flip'
                                ? `rotateY(${currentIndex * 180}deg)`
                                : 'none',
                            opacity: 1
                        }}
                    />
                )}

                {/* Nav Dots */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                                currentIndex === index
                                    ? 'bg-white shadow-lg'
                                    : 'bg-white/50 hover:bg-white/75'
                            }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>

                {/* Slide Counter */}
                <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-sm">
                    {currentIndex + 1} / {images.length}
                </div>
            </div>
        </div>
    ); 
};

export default CubeSlideshow;

