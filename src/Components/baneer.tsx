"use client";

import React from "react";

const HalfOverlayImage: React.FC = () => {
  return (
    <div className="relative w-full">
      <div className="relative h-[500px] md:h-[600px] flex flex-col md:flex-row">
        {/* Left Image Section */}
        <div className="w-full md:w-1/2 h-full">
          <img
            src="/hero.jpg"
            alt="Interior Design"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Content Section with cream background */}
        <div className="w-full md:w-1/2 bg-[#F5EFE6] flex items-center justify-center p-8 md:p-12">
          <div className="text-center max-w-md">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
              End-to-End Home<br />Interiors
            </h1>

            <p className="text-lg text-gray-700 mb-4">
              For Your Taste &<br />Budget
            </p>

            <div className="text-sm text-gray-600 mb-4">— Get —</div>

            <div className="bg-red-500 text-white py-3 px-6 rounded-lg mb-4 inline-block">
              <div className="text-xl font-bold">FLAT 25% OFF</div>
              <div className="text-sm">On Modular Interiors</div>
            </div>

            <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition-colors duration-200 mb-4">
              Book A FREE<br />Consultation 👋
            </button>

            <p className="text-xs text-gray-600">
              Offer valid until <strong>31st December, 2025</strong>
            </p>

            <p className="text-xs text-gray-500 mt-2">
              *T&Cs: Offer valid on orders above Rs. 5 Lakh.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HalfOverlayImage;
