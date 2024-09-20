import React from 'react'


function HomeHeading() {
  return (
    <div className="w-full flex justify-center bg-gray-100 p-4">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-6 md:p-8 lg:p-12">
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-center mb-4">
          Welcome to Ironwood!
        </h1>
        <p className="text-base md:text-lg lg:text-xl text-gray-700 text-center">
          We're glad to have you here. Explore our site to find the best restaurants, events, and services in the area.
        </p>
      </div>
    </div>
  )
}

export default HomeHeading;