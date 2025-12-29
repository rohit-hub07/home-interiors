"use client";

import { useState, useEffect } from "react";

const images = [
  "/colours-kitchen-img/colours-kitchen.jpg",
  "/colours-kitchen-img/colours-kitchen1.jpg",
  "/colours-kitchen-img/colours-kitchen2.jpg",
  "/colours-kitchen-img/colours-kitchen3.jpg",
  "/colours-kitchen-img/colours-kitchen4.jpg"
];

export default function Home7() {
  const [startIndex, setStartIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const updateView = () => {
      if (window.innerWidth < 768) setVisibleCount(1);
      else setVisibleCount(3);
    };
    updateView();
    window.addEventListener("resize", updateView);
    return () => window.removeEventListener("resize", updateView);
  }, []);

  const next = () => setStartIndex((prev) => (prev + 1) % images.length);
  const prev = () => setStartIndex((prev) => (prev - 1 + images.length) % images.length);

  const visibleImages = Array.from({ length: visibleCount }).map(
    (_, i) => images[(startIndex + i) % images.length]
  );

  const goToSlide = (i: number) => setStartIndex(i);

  return (
    <div className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">51040 Design Possibilities In Our Experience Centres</h2>
        <p className="text-gray-500 mb-8">1 Cities | 10 Experience Centres</p>

        <div className="relative">
          <button onClick={prev} className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-100 rounded-full w-10 h-10 shadow-lg items-center justify-center text-gray-600">
            ❮
          </button>
          <div className="flex justify-center gap-4 md:gap-6">
            {visibleImages.map((src, i) => (
              <div key={i} className={visibleCount === 1 ? 'w-[90%]' : 'w-full md:w-1/3'}>
                <img src={src} alt="Design Possibility" className="w-full h-56 object-cover rounded-xl shadow-md" />
              </div>
            ))}
          </div>
          <button onClick={next} className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-100 rounded-full w-10 h-10 shadow-lg items-center justify-center text-gray-600">
            ❯
          </button>
        </div>

        {visibleCount === 1 && (
          <div className="flex justify-center mt-4 gap-2">
            {images.map((_, i) => (
              <div key={i} onClick={() => goToSlide(i)} className={`rounded-full cursor-pointer transition-all ${i === startIndex ? 'w-3 h-3 bg-red-600' : 'w-2.5 h-2.5 bg-gray-300'}`} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
