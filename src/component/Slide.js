import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-google-multi-lang';

const lang = sessionStorage.getItem("lang") || 'En'; // Default to 'En' if not set

const SimpleCarousel = ({ title, slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) =>
      slides.length > 0
        ? prevIndex === slides.length - 1
          ? 0
          : prevIndex + 1
        : 0
    );
  };

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) =>
      slides.length > 0
        ? prevIndex === 0
          ? slides.length - 1
          : prevIndex - 1
        : 0
    );
  };

  if (slides.length === 0) {
    return (
      <div className="relative w-full max-w-screen-lg mx-auto overflow-hidden">
        <div className="text-3xl font-extrabold text-gray-800 bg-gradient-to-r from-gray-900 to-red-400 bg-clip-text text-transparent p-5 pl-0 relative">
          <div className="absolute inset-0 bg-gray-200 rounded-full shadow-lg -z-10"></div>
          {title}
        </div>
        <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-xl">
          <p className="text-lg font-semibold text-gray-600">No slides to show</p>
        </div>
      </div>
    );
  }

  const currentSlide = slides[currentIndex][lang];

  if (!currentSlide) {
    return (
      <div className="text-center text-red-500">
        <p>Error: Slide data is not available for the selected language.</p>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-screen-lg mx-auto overflow-hidden">
      <div className="text-3xl font-extrabold text-gray-800 bg-gradient-to-r from-gray-900 to-red-400 bg-clip-text text-transparent p-5 pl-0 relative">
        <div className="absolute inset-0 bg-gray-200 rounded-full shadow-lg -z-10"></div>
        {title}
      </div>
      <div
        className="relative w-full h-64 bg-gray-200 rounded-xl"
        style={{
          backgroundImage: `url(${currentSlide.Image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 flex items-center justify-between px-4">
          <button
            onClick={goToPrevSlide}
            className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 text-gray-800"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.25l-7.5-7.5 7.5-7.5"
              />
            </svg>
          </button>
          <button
            onClick={goToNextSlide}
            className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 text-gray-800"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.75l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>
      </div>
      <Link to={`/place/${slides[currentIndex]._id}`}>
        <div className="text-center mt-2 pb-8">
          <p className="text-xl hover:text-amber-300 font-semibold text-white bg-gray-800 p-4 rounded-xl shadow-lg opacity-90">
            {currentSlide.Name}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default SimpleCarousel;
