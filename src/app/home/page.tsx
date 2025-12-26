'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'

const page = () => {
  const [displayedText, setDisplayedText] = useState('')
  const fullText = 'Transform your space into your dream home'
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + fullText[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, 50) // Adjust speed here (lower = faster)

      return () => clearTimeout(timeout)
    }
  }, [currentIndex])

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-white">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 pt-12 md:pt-20 pb-16 md:pb-32">
        {/* Banner */}
        <Link
          href="/offers"
          className="mb-6 md:mb-8 inline-flex items-center gap-2 bg-white px-4 sm:px-5 py-2 sm:py-3 rounded-full shadow-sm border border-amber-200 hover:shadow-md transition-shadow"
        >
          <span className="text-gray-700 font-medium text-sm sm:text-base">
            🎉 Limited Time Offer: 20% Off All Design Packages
          </span>
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>

        {/* Main Heading with Typewriter Effect */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-center text-gray-900 mb-4 md:mb-6 max-w-5xl leading-tight min-h-30 sm:min-h-35 md:min-h-45 lg:min-h-50 px-2">
          {displayedText}
          <span className="animate-pulse">|</span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-gray-600 text-center mb-3 md:mb-4 max-w-3xl px-4">
          Expert interior design services. Stunning transformations. Personalized solutions.
        </p>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 text-center mb-6 md:mb-10 px-4">
          From concept to completion, we bring your vision to life.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto px-4">
          <Link
            href="/consultation"
            className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-orange-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:from-amber-600 hover:to-orange-700 transition-all shadow-lg text-center"
          >
            Get Free Consultation
          </Link>
          <Link
            href="/gallery"
            className="w-full sm:w-auto bg-white text-gray-700 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-gray-50 transition-colors border border-gray-200 flex items-center justify-center gap-2"
          >
            View Gallery
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default page