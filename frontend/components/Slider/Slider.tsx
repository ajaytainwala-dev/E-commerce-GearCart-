"use client"
import React, { useState, useEffect } from "react";

interface CarouselProps {
  items: string[];
  interval?: number;
}

const Carousel: React.FC<CarouselProps> = ({ items, interval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, interval);
    return () => clearInterval(timer);
  }, [items.length, interval]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative w-full h-[20rem] overflow-hidden">
      <div
        className="absolute inset-0 flex transition-transform ease-in-out duration-700"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {items.map((item, index) => (
            <div
            key={index}
            className="flex-shrink-0 w-full  bg-cover bg-center"
            style={{ backgroundImage: `url(${item})` }}
            >
            
            </div>
        ))}
      </div>
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
      >
        <span className="m-2 font-extrabold">{"<"}</span>
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
      >
        <span className="m-2 font-extrabold">{">"}</span>
      </button>
      <div className="absolute bottom-0 left-0 w-full flex justify-center space-x-2 p-2">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-gray-800 w-8" : "bg-gray-400 w-3"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
