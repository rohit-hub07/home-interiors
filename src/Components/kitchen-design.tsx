"use client";

import { useState, useEffect } from "react";

const slides = [
  { img: "/colours-kitchen-img/colours-kitchen.jpg", title: "Skirting Drawers To Utilise The Dead Space" },
  { img: "/colours-kitchen-img/colours-kitchen1.jpg", title: "A TV Unit With Hidden Storage Behind" },
  { img: "/colours-kitchen-img/colours-kitchen2.jpg", title: "A Magic Pull-Out To Store Your Daily Utensils" },
  { img: "/colours-kitchen-img/colours-kitchen3.jpg", title: "Maximise Your Modular Kitchen Storage" },
  { img: "/colours-kitchen-img/colours-kitchen4.jpg", title: "Smart Interior Solutions For Your Home" }
];

export default function KitchenDesign() {
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

  const next = () => setStartIndex((prev) => (prev + 1) % slides.length);
  const prev = () => setStartIndex((prev) => (prev - 1 + slides.length) % slides.length);

  const visibleSlides = Array.from({ length: visibleCount }).map(
    (_, i) => slides[(startIndex + i) % slides.length]
  );

  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">Smart Modular Kitchen Designs</h2>
        <div className="relative">
          <button onClick={prev} className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-100 rounded-full w-10 h-10 shadow-lg items-center justify-center text-gray-600">
            ❮
          </button>
          <div className="flex justify-center gap-4 md:gap-6">
            {visibleSlides.map((item, i) => (
              <div key={i} className={`${visibleCount === 1 ? 'w-[90%]' : 'w-full md:w-1/3'} cursor-pointer`}>
                <img src={item.img} alt={item.title} className="w-full h-56 object-cover rounded-xl shadow-md" />
                <p className="mt-3 font-semibold text-sm text-gray-700">{item.title}</p>
              </div>
            ))}
          </div>
          <button onClick={next} className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-100 rounded-full w-10 h-10 shadow-lg items-center justify-center text-gray-600">
            ❯
          </button>
        </div>
        {visibleCount === 1 && (
          <div className="flex justify-center mt-4 gap-2">
            {slides.map((_, i) => (
              <div key={i} onClick={() => setStartIndex(i)} className={`rounded-full cursor-pointer transition-all ${i === startIndex ? 'w-3 h-3 bg-red-600' : 'w-2.5 h-2.5 bg-gray-300'}`} />
            ))}
          </div>
        )}
        <div className="mt-8">
          <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition-colors duration-200">Book Your Dream Kitchen</button>
        </div>
      </div>
    </div>
  );
}
