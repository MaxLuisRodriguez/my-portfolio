import React, { useEffect, useState } from "react";

interface imageSlideshowProps {
    images: string[];
    interval?: number; // this will give the time between
    // each slide
}

const ImageSlideshow: React.FC<imageSlideshowProps> = ({
    images,
    interval = 3000
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => 
                prevIndex === images.length - 1 ? 0: prevIndex + 1
            );
        }, interval);
        return () => clearInterval(timer);
    }, [images.length, interval]);

    return (
        <div className="relative w-full h-full max-w-2xl mx-auto overflow-hidden rounded-lg shadow-lg">
            <img 
                src={images[currentIndex]}
                alt={`Energy drink flavor ${currentIndex + 1}`}
                className="w-full h-64 object-cover transition-opacity duration-500"
            />
            <div className="absolute bottom-4 left-1/2 trasnform -translate-x-1/2 flex space x-2">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                            currentIndex === index ? "bg-white" : "bg-white/50" 
                        }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default ImageSlideshow;