"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "../context/userContext";

const defaultSlides = [
  { img: "/colours-kitchen-img/colours-kitchen.jpg", title: "Skirting Drawers To Utilise The Dead Space" },
  { img: "/colours-kitchen-img/colours-kitchen1.jpg", title: "A TV Unit With Hidden Storage Behind" },
  { img: "/colours-kitchen-img/colours-kitchen2.jpg", title: "A Magic Pull-Out To Store Your Daily Utensils" },
  { img: "/colours-kitchen-img/colours-kitchen3.jpg", title: "Maximise Your Modular Kitchen Storage" },
  { img: "/colours-kitchen-img/colours-kitchen4.jpg", title: "Smart Interior Solutions For Your Home" }
];

const COMPONENT_NAME = 'kitchen-design';

export default function KitchenDesign() {
  const [slides, setSlides] = useState(defaultSlides);
  const [startIndex, setStartIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { userId } = useAuth();

  // Load slides from API
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await fetch(`/api/slider/${COMPONENT_NAME}`);
        const data = await response.json();
        if (data.success && data.data) {
          setSlides(data.data);
        }
      } catch (error) {
        console.error('Error loading slides:', error);
      }
    };
    fetchSlides();
  }, []);

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

  const handleTouchStart = (e: React.TouchEvent) => {
    if (isEditing) return;
    setTouchStart(e.targetTouches[0].clientX);
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    if (isEditing) return;
    setTouchEnd(e.targetTouches[0].clientX);
  };
  const handleTouchEnd = () => {
    if (isEditing) return;
    if (touchStart - touchEnd > 75) next();
    if (touchStart - touchEnd < -75) prev();
  };

  const visibleSlides = Array.from({ length: visibleCount }).map(
    (_, i) => slides[(startIndex + i) % slides.length]
  );

  const handleImageSelect = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result as string);
      setPreviewIndex(index);
      setSelectedFile(file);
    };
    reader.readAsDataURL(file);
  };

  const confirmImageUpload = async () => {
    if (!selectedFile || previewIndex === null) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("/api/post/upload-media", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.mediaUrl) {
        const newSlides = [...slides];
        newSlides[previewIndex].img = data.mediaUrl;
        setSlides(newSlides);
        await fetch(`/api/slider/${COMPONENT_NAME}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ slides: newSlides })
        });
        cancelPreview();
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const cancelPreview = () => {
    setPreviewImage(null);
    setPreviewIndex(null);
    setSelectedFile(null);
  };

  const handleTitleChange = async (index: number, newTitle: string) => {
    const newSlides = [...slides];
    newSlides[index].title = newTitle;
    setSlides(newSlides);
    await fetch(`/api/slider/${COMPONENT_NAME}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slides: newSlides })
    });
  };

  const resetToDefault = async () => {
    try {
      const response = await fetch(`/api/slider/${COMPONENT_NAME}`);
      const data = await response.json();
      if (data.success && data.data) {
        setSlides(data.data);
      } else {
        setSlides(defaultSlides);
      }
    } catch (error) {
      setSlides(defaultSlides);
    }
    setIsEditing(false);
    cancelPreview();
  };

  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 md:mb-8 gap-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 md:flex-1">Smart Modular Kitchen Designs</h2>
          {userId && (
            <div className="flex gap-2 w-full md:w-auto">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-3 md:px-4 rounded-lg shadow transition-colors text-xs md:text-sm flex-1 md:flex-none"
              >
                {isEditing ? "Done Editing" : "Change Images"}
              </button>
              {isEditing && (
                <button
                  onClick={resetToDefault}
                  className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-3 md:px-4 rounded-lg shadow transition-colors text-xs md:text-sm flex-1 md:flex-none whitespace-nowrap"
                >
                  Reset
                </button>
              )}
            </div>
          )}
        </div>
        <div className="relative">
          <button onClick={prev} className="absolute left-2 md:left-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-100 rounded-full w-10 h-10 shadow-lg flex items-center justify-center text-gray-600">
            ❮
          </button>
          <div className="flex justify-center gap-4 md:gap-6" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
            {visibleSlides.map((item, i) => {
              const actualIndex = (startIndex + i) % slides.length;
              return (
                <div key={i} className={`${visibleCount === 1 ? 'w-[90%]' : 'w-full md:w-1/3'} relative`}>
                  <div className="relative">
                    <img src={item.img} alt={item.title} className="w-full h-56 object-cover rounded-xl shadow-md" />

                    {userId && isEditing && previewIndex !== actualIndex && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 rounded-xl flex items-center justify-center">
                        <label className="cursor-pointer">
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleImageSelect(actualIndex, e)}
                            disabled={uploading}
                          />
                          <div className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 rounded-lg shadow-lg transition-colors">
                            Change Image
                          </div>
                        </label>
                      </div>
                    )}

                    {userId && isEditing && previewIndex === actualIndex && previewImage && (
                      <div className="absolute inset-0 bg-black bg-opacity-90 rounded-xl flex flex-col items-center justify-center p-4">
                        <img
                          src={previewImage}
                          alt="Preview"
                          className="max-w-full max-h-40 object-contain rounded mb-3"
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={confirmImageUpload}
                            disabled={uploading}
                            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition-colors text-sm disabled:opacity-50"
                          >
                            {uploading ? "Uploading..." : "Confirm"}
                          </button>
                          <button
                            onClick={cancelPreview}
                            disabled={uploading}
                            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition-colors text-sm disabled:opacity-50"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  {isEditing && userId ? (
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => handleTitleChange(actualIndex, e.target.value)}
                      className="mt-3 w-full font-semibold text-sm text-gray-700 border border-gray-300 rounded px-2 py-1 text-center"
                    />
                  ) : (
                    <p className="mt-3 font-semibold text-sm text-gray-700">{item.title}</p>
                  )}
                </div>
              );
            })}
          </div>
          <button onClick={next} className="absolute right-2 md:right-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-100 rounded-full w-10 h-10 shadow-lg flex items-center justify-center text-gray-600">
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
          <Link
            href="https://wa.me/919864919978"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#DC3545] hover:bg-[#C82333] text-white font-bold text-lg py-4 px-10 rounded-lg shadow-lg transition-colors duration-200 inline-block text-center"
          >
            Book Your Dream Kitchen
          </Link>
        </div>
      </div>
    </div>
  );
}
