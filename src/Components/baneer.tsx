"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { useAuth } from "../context/userContext";

interface BannerData {
  title: string;
  subtitle: string;
  discountText: string;
  discountSubtext: string;
  validityDate: string;
  termsText: string;
  buttonText: string;
  whatsappNumber: string;
}

const HalfOverlayImage: React.FC = () => {
  const { userId } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [bannerData, setBannerData] = useState<BannerData>({
    title: "End-to-End Home\nInteriors",
    subtitle: "For Your Taste &\nBudget",
    discountText: "FLAT 25% OFF",
    discountSubtext: "On Modular Interiors",
    validityDate: "31st December, 2025",
    termsText: "*T&Cs: Offer valid on orders above Rs. 5 Lakh.",
    buttonText: "Book A FREE\nConsultation 👋",
    whatsappNumber: "919993690392"
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch banner data on mount
  useEffect(() => {
    fetchBannerData();
  }, []);

  const fetchBannerData = async () => {
    try {
      const response = await axios.get("/api/banner");
      if (response.data.success) {
        setBannerData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching banner data:", error);
    }
  };

  const handleInputChange = (field: keyof BannerData, value: string) => {
    setBannerData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    setMessage("");
    try {
      const response = await axios.post("/api/banner/update", bannerData, {
        withCredentials: true
      });

      if (response.data.success) {
        setMessage("Banner updated successfully!");
        setIsEditing(false);
        setTimeout(() => setMessage(""), 3000);
      }
    } catch (error: any) {
      setMessage(error.response?.data?.message || "Failed to update banner");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    fetchBannerData(); // Reset to original data
  };

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
        <div className="w-full md:w-1/2 bg-[#F5EFE6] flex items-center justify-center p-4 sm:p-6 md:p-12 relative min-h-[400px]">
          {/* Edit Button - Only visible to logged in users - Moved outside inner div */}
          {userId && !isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors duration-200 shadow-md z-20"
            >
              ✏️ <span className="hidden sm:inline">Edit</span>
            </button>
          )}

          <div className="text-center max-w-md w-full">

            {/* Message Display */}
            {message && (
              <div className={`mb-3 sm:mb-4 p-2 sm:p-3 rounded-lg text-xs sm:text-sm ${message.includes("success")
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
                }`}>
                {message}
              </div>
            )}

            {/* Title */}
            {isEditing ? (
              <textarea
                value={bannerData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                className="w-full text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2 sm:mb-3 p-2 sm:p-3 border-2 border-gray-300 rounded bg-white text-center resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={2}
                placeholder="Main Title"
              />
            ) : (
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2 sm:mb-3 px-2">
                {bannerData.title.split('\n').map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    {i < bannerData.title.split('\n').length - 1 && <br />}
                  </React.Fragment>
                ))}
              </h1>
            )}

            {/* Subtitle */}
            {isEditing ? (
              <textarea
                value={bannerData.subtitle}
                onChange={(e) => handleInputChange("subtitle", e.target.value)}
                className="w-full text-base sm:text-lg text-gray-700 mb-3 sm:mb-4 p-2 sm:p-3 border-2 border-gray-300 rounded bg-white text-center resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={2}
                placeholder="Subtitle"
              />
            ) : (
              <p className="text-base sm:text-lg text-gray-700 mb-3 sm:mb-4 px-2">
                {bannerData.subtitle.split('\n').map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    {i < bannerData.subtitle.split('\n').length - 1 && <br />}
                  </React.Fragment>
                ))}
              </p>
            )}

            <div className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">— Get —</div>

            {/* Discount Section */}
            <div className="bg-white border-2 border-gray-200 rounded-lg py-3 px-4 sm:py-4 sm:px-6 mb-3 sm:mb-4 inline-block shadow-sm w-full max-w-sm">
              {isEditing ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={bannerData.discountText}
                    onChange={(e) => handleInputChange("discountText", e.target.value)}
                    className="w-full text-xl sm:text-2xl md:text-3xl font-bold text-[#00A3E0] mb-2 p-2 sm:p-2 border-2 border-gray-300 rounded text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Discount Text"
                  />
                  <input
                    type="text"
                    value={bannerData.discountSubtext}
                    onChange={(e) => handleInputChange("discountSubtext", e.target.value)}
                    className="w-full bg-[#28A745] text-white text-xs sm:text-sm font-semibold py-1.5 px-3 sm:py-1 sm:px-4 rounded text-center focus:outline-none focus:ring-2 focus:ring-green-600"
                    placeholder="Discount Subtext"
                  />
                </div>
              ) : (
                <>
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-[#00A3E0] mb-2">
                    {bannerData.discountText}
                  </div>
                  <div className="bg-[#28A745] text-white text-xs sm:text-sm font-semibold py-1 px-3 sm:px-4 rounded inline-block">
                    {bannerData.discountSubtext}
                  </div>
                </>
              )}
            </div>

            {/* Button */}
            {isEditing ? (
              <div className="mb-3 sm:mb-4 space-y-2">
                <label className="block text-xs sm:text-sm text-gray-600 mb-1">Button Text:</label>
                <textarea
                  value={bannerData.buttonText}
                  onChange={(e) => handleInputChange("buttonText", e.target.value)}
                  className="w-full p-2 sm:p-2 border-2 border-gray-300 rounded bg-white text-center text-sm sm:text-base resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={2}
                  placeholder="Button Text"
                />
                <label className="block text-xs sm:text-sm text-gray-600 mb-1">WhatsApp Number:</label>
                <input
                  type="text"
                  value={bannerData.whatsappNumber}
                  onChange={(e) => handleInputChange("whatsappNumber", e.target.value)}
                  className="w-full p-2 sm:p-2 border-2 border-gray-300 rounded bg-white text-center text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 919993690392"
                />
              </div>
            ) : (
              <Link
                href={`https://wa.me/${bannerData.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#DC3545] hover:bg-[#C82333] active:bg-[#BD2130] text-white font-bold text-base sm:text-lg py-3 px-6 sm:py-4 sm:px-10 rounded-lg shadow-lg transition-colors duration-200 mb-3 sm:mb-4 w-full sm:w-auto inline-block text-center"
              >
                {bannerData.buttonText.split('\n').map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    {i < bannerData.buttonText.split('\n').length - 1 && <br />}
                  </React.Fragment>
                ))}
              </Link>
            )}

            {/* Validity Date */}
            {isEditing ? (
              <div className="mb-2 sm:mb-1">
                <label className="block text-xs text-gray-600 mb-1">Offer Valid Until:</label>
                <input
                  type="text"
                  value={bannerData.validityDate}
                  onChange={(e) => handleInputChange("validityDate", e.target.value)}
                  className="w-full text-xs sm:text-sm text-gray-700 p-2 border-2 border-gray-300 rounded bg-white text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 31st December, 2025"
                />
              </div>
            ) : (
              <p className="text-xs sm:text-sm text-gray-700 mb-1 px-2">
                Offer valid until <strong>{bannerData.validityDate}</strong>
              </p>
            )}

            {/* Terms & Conditions */}
            {isEditing ? (
              <div className="mt-2">
                <label className="block text-xs text-gray-600 mb-1">Terms & Conditions:</label>
                <textarea
                  value={bannerData.termsText}
                  onChange={(e) => handleInputChange("termsText", e.target.value)}
                  className="w-full text-xs text-gray-500 p-2 border-2 border-gray-300 rounded bg-white text-center resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={2}
                  placeholder="Terms & Conditions"
                />
              </div>
            ) : (
              <p className="text-xs text-gray-500 mt-2 px-2">
                {bannerData.termsText}
              </p>
            )}

            {/* Save/Cancel Buttons */}
            {isEditing && (
              <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center">
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="bg-green-500 hover:bg-green-600 active:bg-green-700 text-white px-6 py-2.5 sm:py-2 rounded-lg font-semibold text-sm sm:text-base transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md w-full sm:w-auto"
                >
                  {loading ? "Saving..." : "💾 Save Changes"}
                </button>
                <button
                  onClick={handleCancel}
                  disabled={loading}
                  className="bg-gray-500 hover:bg-gray-600 active:bg-gray-700 text-white px-6 py-2.5 sm:py-2 rounded-lg font-semibold text-sm sm:text-base transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md w-full sm:w-auto"
                >
                  ❌ Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HalfOverlayImage;
