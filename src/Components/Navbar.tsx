"use client"

import Link from "next/link"
import React, { useState } from "react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-white shadow-sm">
      <div className="flex items-center justify-between px-4 md:px-8 py-4 md:py-6">
        {/* Logo */}
        <Link href="/home" className="flex items-center z-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-linear-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl md:text-2xl">H</span>
            </div>
            <span className="text-xl md:text-2xl font-bold bg-linear-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">HomeDesign</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          <Link
            href="/interiors/bedroom"
            className="text-gray-700 hover:text-amber-600 font-medium transition-colors"
          >
            Bedrooms
          </Link>
          <Link
            href="/interiors/kitchen"
            className="text-gray-700 hover:text-amber-600 font-medium transition-colors"
          >
            Kitchens
          </Link>
          <Link
            href="/interiors/livingroom"
            className="text-gray-700 hover:text-amber-600 font-medium transition-colors"
          >
            Living Rooms
          </Link>
          <Link
            href="/interiors/bathroom"
            className="text-gray-700 hover:text-amber-600 font-medium transition-colors"
          >
            Bathrooms
          </Link>
          <Link
            href="/interiors/gallery"
            className="text-gray-700 hover:text-amber-600 font-medium transition-colors"
          >
            Gallery
          </Link>
        </div>

        {/* Desktop CTA Button */}
        <Link
          href="/consultation"
          className="hidden lg:block bg-linear-to-r from-amber-500 to-orange-600 text-white px-4 xl:px-6 py-2 xl:py-3 rounded-lg font-semibold hover:from-amber-600 hover:to-orange-700 transition-all shadow-md text-sm xl:text-base"
        >
          Free Consultation
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden z-50 p-2 text-gray-700 hover:text-amber-600 transition-colors"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100">
          <div className="flex flex-col px-4 py-4 space-y-3">
            <Link
              href="/interiors/bedroom"
              onClick={() => setIsMenuOpen(false)}
              className="text-gray-700 hover:text-amber-600 font-medium transition-colors py-2"
            >
              Bedrooms
            </Link>
            <Link
              href="/interiors/kitchen"
              onClick={() => setIsMenuOpen(false)}
              className="text-gray-700 hover:text-amber-600 font-medium transition-colors py-2"
            >
              Kitchens
            </Link>
            <Link
              href="/interiors/livingroom"
              onClick={() => setIsMenuOpen(false)}
              className="text-gray-700 hover:text-amber-600 font-medium transition-colors py-2"
            >
              Living Rooms
            </Link>
            <Link
              href="/interiors/bathroom"
              onClick={() => setIsMenuOpen(false)}
              className="text-gray-700 hover:text-amber-600 font-medium transition-colors py-2"
            >
              Bathrooms
            </Link>
            <Link
              href="/interiors/gallery"
              onClick={() => setIsMenuOpen(false)}
              className="text-gray-700 hover:text-amber-600 font-medium transition-colors py-2"
            >
              Gallery
            </Link>
            <Link
              href="/consultation"
              onClick={() => setIsMenuOpen(false)}
              className="bg-linear-to-r from-amber-500 to-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-amber-600 hover:to-orange-700 transition-all shadow-md text-center mt-2"
            >
              Free Consultation
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}