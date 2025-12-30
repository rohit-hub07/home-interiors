"use client";

import React from "react";
import Link from "next/link";

const HalfOverlayImage: React.FC = () => {
  return (
    <div className="relative w-full mb-8 md:mb-12">
      <div className="relative min-h-auto md:h-150 flex flex-col md:flex-row">
        {/* Left Image Section with fade effect */}
        <div className="relative w-full md:w-1/2 h-75 md:h-full">
          <img
            src="/hero.jpg"
            alt="Interior Design"
            className="w-full h-full object-cover"
          />
          {/* Fade overlay - only visible on desktop */}
          <div className="hidden md:block absolute inset-0 bg-linear-to-r from-transparent via-transparent to-[#F5EFE6]"></div>
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

            {/* Updated FLAT 25% OFF banner */}
            <div className="bg-white border-2 border-gray-200 rounded-lg py-4 px-6 mb-4 inline-block shadow-sm">
              <div className="text-2xl md:text-3xl font-bold text-[#00A3E0] mb-2">
                FLAT 25% OFF
              </div>
              <div className="bg-[#28A745] text-white text-sm font-semibold py-1 px-4 rounded inline-block">
                On Modular Interiors
              </div>
            </div>

            <Link
              href="https://wa.me/919864919978"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#DC3545] hover:bg-[#C82333] text-white font-bold text-lg py-4 px-10 rounded-lg shadow-lg transition-colors duration-200 mb-4 w-full md:w-auto inline-block text-center"
            >
              Book A FREE<br />Consultation 👋
            </Link>


            <p className="text-sm text-gray-700 mb-1">
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
