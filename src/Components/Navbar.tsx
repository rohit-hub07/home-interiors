"use client"

import Link from "next/link"
import React, { useState } from "react"
import { useAuth } from "../context/userContext";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { userId, logout } = useAuth();

  return (
    <>
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/home" className="flex items-center space-x-2">
              <div className="w-12 h-12 bg-linear-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">CK</span>
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-orange-600 font-bold text-xl">Colours</span>
                <span className="text-orange-600 font-bold text-xl -mt-1">Kitchen</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <Link href="/interiors/bedroom" className="text-gray-700 hover:text-orange-600 font-medium text-base transition-colors">
                Bedrooms
              </Link>
              <Link href="/interiors/kitchen" className="text-gray-700 hover:text-orange-600 font-medium text-base transition-colors">
                Kitchens
              </Link>
              <Link href="/interiors/living" className="text-gray-700 hover:text-orange-600 font-medium text-base transition-colors">
                Living Rooms
              </Link>
              <Link href="/interiors/bathroom" className="text-gray-700 hover:text-orange-600 font-medium text-base transition-colors">
                Bathrooms
              </Link>
              <Link href="/interiors/gallery" className="text-gray-700 hover:text-orange-600 font-medium text-base transition-colors">
                Gallery
              </Link>
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-4">
              {userId && (
                <>
                  <Link href="/upload-design" className="flex items-center space-x-1 text-gray-700 hover:text-orange-600 font-medium text-base transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <span>Upload</span>
                  </Link>
                  <button onClick={() => logout()} className="flex items-center space-x-1 text-gray-700 hover:text-orange-600 font-medium text-base transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span>Logout</span>
                  </button>
                </>
              )}
              <Link href="/consultation" className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2.5 rounded-lg font-medium text-base transition-colors flex items-center space-x-1">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Free Consultation</span>
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100"
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
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-100">
            <div className="px-4 py-3 space-y-1">
              <Link href="/interiors/bedroom" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-orange-600 font-medium text-base">
                Bedrooms
              </Link>
              <Link href="/interiors/kitchen" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-orange-600 font-medium text-base">
                Kitchens
              </Link>
              <Link href="/interiors/living" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-orange-600 font-medium text-base">
                Living Rooms
              </Link>
              <Link href="/interiors/bathroom" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-orange-600 font-medium text-base">
                Bathrooms
              </Link>
              <Link href="/interiors/gallery" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-orange-600 font-medium text-base">
                Gallery
              </Link>

              {userId && (
                <>
                  <div className="border-t border-gray-100 my-2"></div>
                  <Link href="/upload-design" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-orange-600 font-medium text-base">
                    Upload Design
                  </Link>
                  <button onClick={() => { logout(); setIsMenuOpen(false); }} className="w-full text-left px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-orange-600 font-medium text-base">
                    Logout
                  </button>
                </>
              )}

              <div className="pt-2">
                <Link href="/consultation" onClick={() => setIsMenuOpen(false)} className="block bg-orange-600 hover:bg-orange-700 text-white px-4 py-2.5 rounded-lg font-medium text-base text-center">
                  Free Consultation
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
      {/* Spacer to prevent content from hiding under fixed navbar */}
      <div className="h-0"></div>
    </>
  )
}