import { useState, useEffect } from "react";

// Images import
import img1 from "../images/home-img01.png";
import img2 from "../images/home-img02.png";

function Slider() {

  const images = [img1, img2];

  const [current, setCurrent] = useState(0);

  // Auto Slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-[95%] md:w-[85%] mx-auto mt-4 aspect-[16/7] bg-gray-100 flex items-center justify-center overflow-hidden rounded-lg">

      {/* Image */}
      <img
        src={images[current]}
        alt="slider"
        className="w-full h-full object-contain transition-all duration-700"
      />

      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white px-2 md:px-3 py-1 md:py-2 rounded-full hover:bg-black"
      >
        ◀
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white px-2 md:px-3 py-1 md:py-2 rounded-full hover:bg-black"
      >
        ▶
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 md:bottom-4 flex gap-2">
        {images.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-2 md:w-3 h-2 md:h-3 rounded-full cursor-pointer ${
              current === index ? "bg-black" : "bg-gray-400"
            }`}
          ></div>
        ))}
      </div>

    </div>
  );
}

export default Slider;