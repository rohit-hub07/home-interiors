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
              <Link
                href="https://wa.me/919864919978"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2.5 rounded-lg font-medium text-base transition-colors flex items-center space-x-2"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 32 32"
                  fill="currentColor"
                >
                  <path d="M16.001 2.667C8.821 2.667 3 8.488 3 15.668c0 2.763.725 5.365 2.102 7.661L3 29l5.857-2.035a12.924 12.924 0 007.144 2.06h.001c7.18 0 13-5.821 13-13.001 0-7.179-5.82-13-13-13zm7.594 18.337c-.319.897-1.585 1.71-2.607 1.933-.699.151-1.613.271-4.687-.996-3.93-1.622-6.471-5.59-6.668-5.848-.196-.258-1.602-2.134-1.602-4.076 0-1.942 1.017-2.9 1.379-3.298.362-.398.789-.498 1.053-.498.265 0 .529.003.762.015.245.012.575-.093.9.686.319.764 1.085 2.643 1.182 2.834.098.19.163.416.032.674-.13.258-.196.417-.388.641-.195.224-.411.5-.587.673-.195.195-.398.407-.171.795.226.387 1.005 1.658 2.158 2.684 1.483 1.322 2.734 1.735 3.122 1.931.388.195.614.163.84-.098.227-.258.97-1.132 1.228-1.519.258-.387.516-.323.87-.195.356.13 2.256 1.064 2.643 1.256.387.195.646.291.742.451.098.161.098.934-.221 1.831z" />
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
                <Link
                  href="https://wa.me/919864919978"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2.5 rounded-lg font-medium text-base transition-colors flex items-center space-x-2"
                >
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 32 32"
                    fill="currentColor"
                  >
                    <path d="M16.001 2.667C8.821 2.667 3 8.488 3 15.668c0 2.763.725 5.365 2.102 7.661L3 29l5.857-2.035a12.924 12.924 0 007.144 2.06h.001c7.18 0 13-5.821 13-13.001 0-7.179-5.82-13-13-13zm7.594 18.337c-.319.897-1.585 1.71-2.607 1.933-.699.151-1.613.271-4.687-.996-3.93-1.622-6.471-5.59-6.668-5.848-.196-.258-1.602-2.134-1.602-4.076 0-1.942 1.017-2.9 1.379-3.298.362-.398.789-.498 1.053-.498.265 0 .529.003.762.015.245.012.575-.093.9.686.319.764 1.085 2.643 1.182 2.834.098.19.163.416.032.674-.13.258-.196.417-.388.641-.195.224-.411.5-.587.673-.195.195-.398.407-.171.795.226.387 1.005 1.658 2.158 2.684 1.483 1.322 2.734 1.735 3.122 1.931.388.195.614.163.84-.098.227-.258.97-1.132 1.228-1.519.258-.387.516-.323.87-.195.356.13 2.256 1.064 2.643 1.256.387.195.646.291.742.451.098.161.098.934-.221 1.831z" />
                  </svg>

                  <span>Free Consultation</span>
                </Link>

              </div>
            </div>
          </div>
        )}
      </nav>
      <div className="h-0"></div>
    </>
  )
}